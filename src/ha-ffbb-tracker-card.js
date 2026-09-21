import { LitElement, html, nothing } from "lit";
import { CARD_VERSION } from "./version.js";
import { DEFAULT_CONFIG } from "./config-defaults.js";
import {
  extractCalendarMatches,
  resolveEntities,
  sortStandings,
  formatDate,
  resolveHour12,
  isValidCssColor,
  computeViewModel,
  DEFAULT_FALLBACK_LOGO,
  createTeamMatcher,
  resolveCalendarTeamLogo,
} from "./pure.js";
import { resolveLang, getTranslations, translate } from "./translations.js";
import { cardStyles } from "./styles.js";
import { renderStandingsBlock, standingsBlockStyles } from "./standings-block.js";
import "./card-editor.js";

class FFBBCard extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
      _activeModal: { state: true },
      _manualView: { state: true },
      _matchIndex: { state: true },
    };
  }

  constructor() {
    super();
    this._translationsLang = "en";
    this._translations = getTranslations("en");
    this._activeModal = null;
    this._manualView = null;
    this._matchIndex = null;
    this._modalTrigger = null;
  }

  static async getConfigElement() {
    return document.createElement("ffbb-tracker-card-editor");
  }

  static getStubConfig() {
    return {
      entity: "",
      ...DEFAULT_CONFIG,
    };
  }

  getCardSize() {
    return 3;
  }

  getGridOptions() {
    return {
      columns: 12,
      min_columns: 9,
    };
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("Please define an entity from the FFBB Tracker integration.");
    }
    this._config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
    this._warnIfInvalidAccentColor();
  }

  // Silent no-op for every mode except "custom" -- a bad value there falls
  // back to the default orange in computeViewModel, so this only exists to
  // surface *why* the color didn't apply, once per distinct bad value (not
  // once per render), instead of failing silently.
  _warnIfInvalidAccentColor() {
    const { accent_color: mode, custom_accent_color: color } = this._config;
    const value = String(color ?? "").trim();
    if (mode !== "custom" || !value || isValidCssColor(value)) {
      return;
    }
    if (this._warnedAccentColor !== value) {
      this._warnedAccentColor = value;
      console.warn(
        `[FFBB Tracker Card] custom_accent_color "${value}" is not a valid CSS color (use e.g. #1e88e5 or "blue"): the default orange is used.`
      );
    }
  }

  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (changedProperties.has("hass") && this.hass) {
      const lang = resolveLang(this.hass);
      if (lang !== this._translationsLang) {
        this._translationsLang = lang;
        this._translations = getTranslations(lang);
      }
    }
  }

  _t(key, fallback = "") {
    return translate(this._translations, key, fallback);
  }

  // A no-break space before ":" is the French typographic convention
  // (avoids the colon starting a new line); English just wants ":".
  _colon() {
    return this._translationsLang === "fr" ? "\u00a0:" : ":";
  }

  _getRankClass(rank) {
    if (!rank) return "";
    const style = this._config?.rank_badge_style;
    // "none" means "no medal colors".
    if (style === "none") return "";
    const match = String(rank).trim().match(/^(\d+)/);
    if (!match) return "";
    const pos = parseInt(match[1], 10);
    if (pos === 1) return "rank-gold";
    if (pos === 2) return "rank-silver";
    if (pos === 3) return "rank-bronze";
    return "";
  }

  _resolveEntities() {
    return resolveEntities(this._config.entity, this.hass?.states);
  }

  _localeInfo() {
    const language = this.hass?.locale?.language || this.hass?.language || "en-US";
    return { language, hour12: resolveHour12(this.hass?.locale?.time_format, language) };
  }

  _formatDate(dateStr) {
    const { language, hour12 } = this._localeInfo();
    return formatDate(dateStr, language, { hour12 });
  }

  _openMaps(gymName, gymCity) {
    const query = encodeURIComponent(`${gymName} ${gymCity}`.trim());
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank", "noreferrer");
  }

  _openCalendar(matchDateStr, homeTeam, awayTeam, gymName, gymCity) {
    if (!matchDateStr || matchDateStr === "unknown" || matchDateStr === "unavailable") {
      return;
    }
    const start = new Date(matchDateStr);
    if (isNaN(start.getTime())) {
      return;
    }
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    const toGCalIso = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
    const title = `${homeTeam} vs ${awayTeam}`;
    const location = `${gymName} ${gymCity}`.trim();
    const details = `FFBB match: ${homeTeam} vs ${awayTeam}`;
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${toGCalIso(start)}/${toGCalIso(end)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    window.open(url, "_blank", "noreferrer");
  }

  _handleLogoClick(entityId, teamUrl, teamName) {
    const action = this._config.logo_click_action || "team_url";
    if (action === "team_url") {
      if (teamUrl) {
        window.open(teamUrl, "_blank", "noreferrer");
      } else {
        console.warn(`[FFBB Tracker Card] No URL found for team: "${teamName}".`);
        if (entityId) {
          this._fireMoreInfo(entityId);
        }
      }
    } else if (action === "more-info" && entityId) {
      this._fireMoreInfo(entityId);
    }
  }

  _fireMoreInfo(entityId) {
    const event = new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId },
    });
    this.dispatchEvent(event);
  }

  _openModal(type) {
    // Remember what had focus before opening, so closing can put it back
    // (see `updated()` below) instead of dropping focus to <body>.
    this._modalTrigger = this.shadowRoot?.activeElement ?? null;
    this._activeModal = type;
  }

  _closeModal() {
    this._activeModal = null;
  }

  // Focus management for the modal, driven off _activeModal's transitions
  // rather than the click/keydown handlers themselves, so it fires no
  // matter how a modal opened or closed (click, Escape, or a future
  // caller). Opening moves focus into the dialog (required for
  // role="dialog" to be usable via keyboard); closing restores it to
  // whatever triggered the open, completing the round-trip.
  updated(changedProperties) {
    super.updated(changedProperties);
    if (!changedProperties.has("_activeModal")) {
      return;
    }
    const previous = changedProperties.get("_activeModal");
    if (this._activeModal && !previous) {
      this.shadowRoot?.querySelector(".modal-card")?.focus();
    } else if (!this._activeModal && previous) {
      const trigger = this._modalTrigger;
      this._modalTrigger = null;
      if (trigger && trigger.isConnected && typeof trigger.focus === "function") {
        trigger.focus();
      }
    }
  }

  // Escape closes the modal from anywhere inside it. Tab/Shift+Tab are
  // trapped within the dialog's focusable elements so keyboard focus can't
  // escape to the page behind it while the modal is open -- standard
  // modal-dialog accessibility behavior.
  _onModalKeydown(e) {
    if (e.key === "Escape") {
      e.stopPropagation();
      this._closeModal();
      return;
    }
    if (e.key !== "Tab") {
      return;
    }
    const card = e.currentTarget.querySelector(".modal-card");
    if (!card) {
      return;
    }
    const focusables = [...card.querySelectorAll('[tabindex]:not([tabindex="-1"])')];
    if (focusables.length === 0) {
      // Nothing focusable inside (e.g. an empty-state modal): keep focus
      // on the dialog itself rather than letting Tab leave it.
      e.preventDefault();
      card.focus();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = this.shadowRoot?.activeElement;
    if (e.shiftKey && (active === first || active === card)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }

  _setManualView(view) {
    this._manualView = view;
    this._matchIndex = null;
  }

  // Two navigation modes depending on what's available: with a real
  // calendar (multiple matches), the chevrons step through it match by
  // match via _matchIndex, and _manualView just follows whether the
  // landed-on match has been played. Without one, there's only "last" vs
  // "next" to toggle between, same as before the calendar existed.
  _handleChevronClick(direction, vm) {
    if (vm.hasCalendar && vm.calendarMatches.length > 1) {
      const nextIdx = direction === "prev" ? vm.currentIndex - 1 : vm.currentIndex + 1;
      if (nextIdx >= 0 && nextIdx < vm.calendarMatches.length) {
        this._matchIndex = nextIdx;
        const targetMatch = vm.calendarMatches[nextIdx];
        this._manualView = (targetMatch.is_played || targetMatch.score) ? "last" : "next";
      }
    } else {
      this._setManualView(direction === "prev" ? "last" : "next");
    }
  }

  _selectCalendarMatch(index, isPlayed) {
    this._matchIndex = index;
    this._manualView = isPlayed ? "last" : "next";
    this._closeModal();
  }

  _onKeyActivate(handler) {
    return (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        handler();
      }
    };
  }

  _extractCalendarMatches(entities) {
    const configuredEntity = this._config.entity ? this.hass?.states[this._config.entity] : null;
    return extractCalendarMatches(entities, configuredEntity);
  }

  _renderModal(entities, teamName, opponentName, displayTeamName) {
    if (!this._activeModal) {
      return html``;
    }

    if (this._activeModal === "standings") {
      const rawStandings = entities.rank?.attributes?.standings || [];
      const standings = sortStandings(rawStandings);
      const competition = entities.poule?.attributes?.competition || "";
      const poule = entities.poule?.state || "";
      const standingNames = standings.map((item) => item.team_name || item.name || "");
      const isMyTeamRow = createTeamMatcher(standingNames, teamName);
      const isOpponentRow = createTeamMatcher(standingNames, opponentName);

      return html`
        <div
          class="modal-backdrop"
          @click=${this._closeModal}
          @keydown=${this._onModalKeydown}
        >
          <div
            class="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ffbb-modal-title"
            tabindex="-1"
            @click=${(e) => e.stopPropagation()}
          >
            <div class="modal-header">
              <div class="modal-title" id="ffbb-modal-title">
                <ha-icon icon="mdi:format-list-numbered"></ha-icon>
                <span>${this._t("card.standings_title", "Standings")} ${poule ? `• ${poule}` : ""}</span>
              </div>
              <ha-icon
                class="modal-close-btn"
                icon="mdi:close"
                @click=${this._closeModal}
                @keydown=${this._onKeyActivate(this._closeModal)}
                role="button"
                tabindex="0"
                aria-label=${this._t("card.close", "Close")}
              ></ha-icon>
            </div>
            ${competition ? html`<div class="modal-subtitle">${competition}</div>` : ""}
            <div class="modal-body" tabindex="0">
              ${standings.length > 0
                ? html`
                    <table class="standings-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th class="col-team">${this._t("card.table_team", "Team")}</th>
                          <th>${this._t("card.table_pts", "Pts")}</th>
                          <th>${this._t("card.table_played", "J")}</th>
                          <th>${this._t("card.table_wins", "G")}</th>
                          <th>${this._t("card.table_losses", "P")}</th>
                          <th>${this._t("card.table_draws", "N")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${standings.map((item) => {
                          const rowName = item.team_name || item.name || "";
                          const isOwnRow = isMyTeamRow(rowName);
                          const isRowHighlighted = isOwnRow || isOpponentRow(rowName);
                          // My own row shows the name from the card config,
                          // never the opponent's -- their row keeps the
                          // official federation name.
                          const displayedTeamLabel = isOwnRow && displayTeamName ? displayTeamName : (item.team_name || item.name || "-");

                          return html`
                            <tr class=${isRowHighlighted ? "highlight-row" : ""}>
                              <td class="pos-cell">${item.position || item.rank || "-"}</td>
                              <td class="col-team">${displayedTeamLabel}</td>
                              <td class="pts-cell">${item.points ?? item.pts ?? "-"}</td>
                              <td>${item.played ?? "-"}</td>
                              <td>${item.wins ?? item.won ?? "-"}</td>
                              <td>${item.losses ?? item.lost ?? "-"}</td>
                              <td>${item.draws ?? "0"}</td>
                            </tr>
                          `;
                        })}
                      </tbody>
                    </table>
                  `
                : html`
                    <div class="modal-empty-text">
                      ${this._t("card.no_standings", "No standings data available.")}
                    </div>
                  `}
            </div>
          </div>
        </div>
      `;
    }

    if (this._activeModal === "form") {
      const rawForm = entities.form?.state;
      const isValidForm = rawForm && rawForm !== "unknown" && rawForm !== "unavailable";
      const formSequence = isValidForm ? rawForm : "";
      const streak = isValidForm ? (entities.form?.attributes?.current_streak || "") : "";
      const tokens = formSequence.split("-").filter(Boolean);

      return html`
        <div
          class="modal-backdrop"
          @click=${this._closeModal}
          @keydown=${this._onModalKeydown}
        >
          <div
            class="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ffbb-modal-title"
            tabindex="-1"
            @click=${(e) => e.stopPropagation()}
          >
            <div class="modal-header">
              <div class="modal-title" id="ffbb-modal-title">
                <ha-icon icon="mdi:chart-timeline-variant"></ha-icon>
                <span>${this._t("card.form_title", "Recent form details")}</span>
              </div>
              <ha-icon
                class="modal-close-btn"
                icon="mdi:close"
                @click=${this._closeModal}
                @keydown=${this._onKeyActivate(this._closeModal)}
                role="button"
                tabindex="0"
                aria-label=${this._t("card.close", "Close")}
              ></ha-icon>
            </div>
            <div class="modal-body form-modal-content" tabindex="0">
              ${tokens.length > 0
                ? html`
                    <div class="form-badges-container">
                      ${tokens.map((char) => {
                        let badgeClass = "badge-draw";
                        let label = this._t("card.draw", "Draw");
                        if (char === "V" || char === "W") {
                          badgeClass = "badge-win";
                          label = this._t("card.win", "Win");
                        } else if (char === "D" || char === "L") {
                          badgeClass = "badge-loss";
                          label = this._t("card.loss", "Loss");
                        }
                        return html`
                          <div class="form-badge-pill ${badgeClass}">
                            <span class="pill-char">${char}</span>
                            <span class="pill-label">${label}</span>
                          </div>
                        `;
                      })}
                    </div>
                    ${streak
                      ? html`
                          <div class="form-streak-box">
                            <span class="streak-label">${this._t("card.current_streak", "Current streak")}${this._colon()}</span>
                            <strong class="streak-val">${streak}</strong>
                          </div>
                        `
                      : ""}
                  `
                : html`
                    <div class="modal-empty-text">
                      ${this._t("card.no_form", "No recent form data available.")}
                    </div>
                  `}
            </div>
          </div>
        </div>
      `;
    }

    if (this._activeModal === "calendar") {
      const matches = this._extractCalendarMatches(entities);
      const competition = entities.poule?.attributes?.competition || "";
      const poule = entities.poule?.state || "";
      const calendarNames = matches.flatMap((m) => [
        m.home_team || "",
        m.away_team || "",
      ]);
      const isMyCalendarTeam = createTeamMatcher(calendarNames, teamName);
      // First row with neither a score nor is_played: assumes the calendar
      // is in chronological order, same assumption the API itself makes.
      const nextMatchIndex = matches.findIndex((m) => !m.is_played && !m.score);
      const myTeamLogo =
        entities.nextOpponent?.attributes?.team_logo_url ||
        entities.lastOpponent?.attributes?.team_logo_url ||
        entities.nextDate?.attributes?.team_logo_url ||
        DEFAULT_FALLBACK_LOGO;
      const standings = entities.rank?.attributes?.standings;

      return html`
        <div
          class="modal-backdrop"
          @click=${this._closeModal}
          @keydown=${this._onModalKeydown}
        >
          <div
            class="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ffbb-modal-title"
            tabindex="-1"
            @click=${(e) => e.stopPropagation()}
          >
            <div class="modal-header">
              <div class="modal-title" id="ffbb-modal-title">
                <ha-icon icon="mdi:calendar-month-outline"></ha-icon>
                <span>${this._t("card.calendar_title", "Season schedule")} ${poule ? `• ${poule}` : ""}</span>
              </div>
              <ha-icon
                class="modal-close-btn"
                icon="mdi:close"
                @click=${this._closeModal}
                @keydown=${this._onKeyActivate(this._closeModal)}
                role="button"
                tabindex="0"
                aria-label=${this._t("card.close", "Close")}
              ></ha-icon>
            </div>
            ${competition ? html`<div class="modal-subtitle">${competition}</div>` : ""}
            <div class="modal-body" tabindex="0">
              ${matches.length > 0
                ? html`
                    <div class="calendar-list">
                      ${matches.map((m, index) => {
                        const home = m.home_team || "-";
                        const away = m.away_team || "-";
                        const score = m.score || (m.home_score !== undefined ? `${m.home_score} - ${m.away_score}` : "");
                        const dateFormatted = this._formatDate(m.date || m.datetime);
                        const isHomeMyTeam = isMyCalendarTeam(home);
                        const isAwayMyTeam = isMyCalendarTeam(away);
                        const isMyTeamInvolved = isHomeMyTeam || isAwayMyTeam;
                        const isPlayed = Boolean(m.is_played || score);
                        const isNextMatch = index === nextMatchIndex;

                        const homeLogo = resolveCalendarTeamLogo({
                          teamName: home,
                          matchLogo: m.home_logo || m.home_team_logo,
                          isMyTeam: isHomeMyTeam,
                          myTeamLogo,
                          nextOpponentState: entities.nextOpponent?.state,
                          nextOpponentLogo: entities.nextOpponent?.attributes?.opponent_logo_url,
                          lastOpponentState: entities.lastOpponent?.state,
                          lastOpponentLogo: entities.lastOpponent?.attributes?.opponent_logo_url,
                          standings,
                        });

                        const awayLogo = resolveCalendarTeamLogo({
                          teamName: away,
                          matchLogo: m.away_logo || m.away_team_logo,
                          isMyTeam: isAwayMyTeam,
                          myTeamLogo,
                          nextOpponentState: entities.nextOpponent?.state,
                          nextOpponentLogo: entities.nextOpponent?.attributes?.opponent_logo_url,
                          lastOpponentState: entities.lastOpponent?.state,
                          lastOpponentLogo: entities.lastOpponent?.attributes?.opponent_logo_url,
                          standings,
                        });

                        let venueBadge = "";
                        if (isHomeMyTeam) {
                          venueBadge = "DOM";
                        } else if (isAwayMyTeam) {
                          venueBadge = "EXT";
                        }

                        return html`
                          <div
                            class="calendar-row ${isMyTeamInvolved ? "highlight-row" : ""} ${isNextMatch ? "next-match-row" : ""}"
                            @click=${() => this._selectCalendarMatch(index, isPlayed)}
                            @keydown=${this._onKeyActivate(() => this._selectCalendarMatch(index, isPlayed))}
                            role="button"
                            tabindex="0"
                            aria-label="${isHomeMyTeam && displayTeamName ? displayTeamName : home} vs ${isAwayMyTeam && displayTeamName ? displayTeamName : away}"
                          >
                            <div class="calendar-col-round">
                              <span class="cal-round-tag">${this._t("card.round_short", "R")}${m.round || "-"}</span>
                              ${venueBadge
                                ? html`<span class="cal-venue-pill ${venueBadge === "DOM" ? "pill-dom" : "pill-ext"}">${venueBadge}</span>`
                                : ""}
                            </div>
                            <div class="calendar-col-teams">
                              <div class="cal-team-line">
                                <img
                                  class="cal-mini-logo"
                                  src=${homeLogo}
                                  alt=""
                                  @error=${(e) => {
                                    if (!e.target.src.endsWith(DEFAULT_FALLBACK_LOGO)) {
                                      e.target.src = DEFAULT_FALLBACK_LOGO;
                                    }
                                  }}
                                />
                                <span class="cal-team ${isHomeMyTeam ? "my-team-text" : ""}">${isHomeMyTeam && displayTeamName ? displayTeamName : home}</span>
                              </div>
                              <div class="cal-team-line">
                                <img
                                  class="cal-mini-logo"
                                  src=${awayLogo}
                                  alt=""
                                  @error=${(e) => {
                                    if (!e.target.src.endsWith(DEFAULT_FALLBACK_LOGO)) {
                                      e.target.src = DEFAULT_FALLBACK_LOGO;
                                    }
                                  }}
                                />
                                <span class="cal-team ${isAwayMyTeam ? "my-team-text" : ""}">${isAwayMyTeam && displayTeamName ? displayTeamName : away}</span>
                              </div>
                            </div>
                            <div class="calendar-col-meta">
                              ${score
                                ? html`<div class="cal-score">${score}</div>`
                                : dateFormatted
                                ? html`
                                    <div class="cal-date">${dateFormatted.day}</div>
                                    <div class="cal-time">${dateFormatted.time}</div>
                                  `
                                : html`<div class="cal-date">-</div>`}
                            </div>
                          </div>
                        `;
                      })}
                    </div>
                  `
                : html`
                    <div class="modal-empty-text">
                      ${this._t("card.no_calendar", "No schedule available.")}
                    </div>
                  `}
            </div>
          </div>
        </div>
      `;
    }

    return html``;
  }

  _computeViewModel(entities) {
    const { language, hour12 } = this._localeInfo();
    return computeViewModel({
      entities,
      config: this._config,
      manualView: this._manualView,
      matchIndex: this._matchIndex,
      states: this.hass?.states,
      lang: this._translationsLang,
      locale: language,
      hour12,
      t: (key, fallback) => this._t(key, fallback),
      isPreview: Boolean(
        this.preview ||
        this.parentElement?.tagName === "HUI-CARD-PREVIEW" ||
        (this.closest && this.closest("hui-card-preview"))
      ),
    });
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const entities = this._resolveEntities();
    if (!entities) {
      return html`
        <ha-card class="card-warning">
          ${this._t("card.not_configured", "Card not configured")}
        </ha-card>
      `;
    }

    const vm = this._computeViewModel(entities);

    return html`
      ${vm.displayMode !== "standings"
        ? html`
            <ha-card style="--ffbb-accent-color: ${vm.accentColor};">
              ${this._renderHeader(vm)}

              <div class="container">
                ${this._renderWatermark(vm)}
                ${this._renderMatchHeader(vm)}
                ${this._renderMatchArea(vm)}
                ${this._renderFooter(vm)}
              </div>

              ${this._renderModal(entities, vm.searchTeamName, vm.opponentSearchName, vm.configuredTeamName)}
            </ha-card>
          `
        : nothing}

      ${vm.displayMode !== "match"
        ? renderStandingsBlock({
            standings: entities.rank?.attributes?.standings,
            poule: entities.poule?.state,
            competition: entities.poule?.attributes?.competition,
            teamName: vm.searchTeamName,
            displayTeamName: vm.configuredTeamName,
            accentColor: vm.accentColor,
            title: vm.standingsTitle,
            icon: vm.standingsIcon,
            t: (key, fallback) => this._t(key, fallback),
          })
        : nothing}
    `;
  }

  _renderHeader(vm) {
    const { showTitle, titleText, titleIcon } = vm;
    return html`
      ${showTitle && (titleText || titleIcon)
        ? html`
            <div class="card-header">
              ${titleIcon ? html`<ha-icon .icon=${titleIcon}></ha-icon>` : ""}
              ${titleText ? html`<span class="card-header-title">${titleText}</span>` : ""}
            </div>
          `
        : ""}
    `;
  }

  _renderWatermark(vm) {
    const { leftLogo, rightLogo } = vm;
    return html`
      ${this._config.show_watermark
        ? html`
            <img
              class="watermark watermark-left"
              src=${leftLogo}
              alt=""
              aria-hidden="true"
              @error=${(e) => (e.target.style.display = "none")}
              @load=${(e) => (e.target.style.display = "")}
            />
            <img
              class="watermark watermark-right"
              src=${rightLogo}
              alt=""
              aria-hidden="true"
              @error=${(e) => (e.target.style.display = "none")}
              @load=${(e) => (e.target.style.display = "")}
            />
          `
        : ""}
    `;
  }

  _renderMatchHeader(vm) {
    const { competition, pouleName, roundNumber } = vm;
    return html`
      ${this._config.show_header
        ? html`
            <div class="header">
              ${competition || pouleName
                ? html`
                    <div class="header-main">
                      <span class="competition">${competition}</span>
                      ${pouleName ? html`<span class="poule">• ${pouleName}</span>` : ""}
                    </div>
                  `
                : ""}
              <div
                class="header-round clickable-round"
                @click=${() => this._openModal("calendar")}
                @keydown=${this._onKeyActivate(() => this._openModal("calendar"))}
                role="button"
                tabindex="0"
                aria-label=${this._t("card.view_calendar", "View full season schedule")}
                title=${this._t("card.view_calendar", "View full season schedule")}
              >
                <span>${roundNumber ? `${this._t("card.round", "Round")} ${roundNumber}` : this._t("card.calendar_title", "Schedule")}</span>
                <ha-icon icon="mdi:calendar-month-outline" class="round-cal-icon"></ha-icon>
              </div>
            </div>
          `
        : ""}
    `;
  }

  _renderMatchArea(vm) {
    const {
      isLive,
      canToggleView,
      isPostMatch,
      isGameDay,
      leftName,
      rightName,
      leftLogo,
      rightLogo,
      leftUrl,
      rightUrl,
      leftEntityId,
      rightEntityId,
      gymName,
      gymCity,
      dateFormatted,
      logoSizeClass,
      showRank,
      leftRank,
      rightRank,
      isCalendarClickable,
      isLogoClickable,
      hasStandingsData,
    } = vm;

    const isSolid = this._config?.rank_badge_style === "solid";
    const solidRankClass = isSolid ? "rank-solid" : "";

    return html`
      <div class="match-area">
        <div class="team-logo-cell cell-left">
          <div
            class="logo-box ${logoSizeClass} ${isLogoClickable ? "clickable" : ""}"
            @click=${() => this._handleLogoClick(leftEntityId, leftUrl, leftName)}
            @keydown=${isLogoClickable ? this._onKeyActivate(() => this._handleLogoClick(leftEntityId, leftUrl, leftName)) : nothing}
            role=${isLogoClickable ? "button" : nothing}
            tabindex=${isLogoClickable ? "0" : nothing}
            aria-label=${isLogoClickable ? this._t("card.view_team", "View {team}").replace("{team}", leftName) : nothing}
          >
            <img
              class="logo"
              src=${leftLogo}
              alt=""
              @error=${(e) => {
                if (!e.target.src.endsWith(DEFAULT_FALLBACK_LOGO)) {
                  e.target.src = DEFAULT_FALLBACK_LOGO;
                }
              }}
            />
          </div>
        </div>

        <div class="center-meta-wrapper">
          ${canToggleView
            ? html`
                <ha-icon
                  icon="mdi:chevron-left"
                  class="nav-chevron nav-chevron-left ${!vm.canGoPrev ? "disabled" : ""}"
                  @click=${() => this._handleChevronClick("prev", vm)}
                  @keydown=${this._onKeyActivate(() => this._handleChevronClick("prev", vm))}
                  role="button"
                  tabindex="0"
                  aria-label=${this._t("card.view_last_match", "Show last played match")}
                  title=${this._t("card.view_last_match", "Show last played match")}
                ></ha-icon>
              `
            : ""}

          <div
            class="center-meta ${isCalendarClickable ? "clickable" : ""}"
            @click=${() => {
              if (isCalendarClickable) {
                this._openCalendar(vm.targetDateStr, leftName, rightName, gymName, gymCity);
              }
            }}
            @keydown=${
              isCalendarClickable
                ? this._onKeyActivate(() => this._openCalendar(vm.targetDateStr, leftName, rightName, gymName, gymCity))
                : nothing
            }
            role=${isCalendarClickable ? "button" : nothing}
            tabindex=${isCalendarClickable ? "0" : nothing}
            aria-label=${isCalendarClickable ? this._t("card.add_to_calendar", "Add to Google Calendar") : nothing}
            title=${isCalendarClickable ? this._t("card.add_to_calendar", "Add to Google Calendar") : ""}
          >
            ${isLive
              ? html`
                  <div class="badge badge-live">
                    <span class="live-dot"></span>
                    <span>${this._t("card.live", "Live")}</span>
                  </div>
                  <div class="live-clock">
                    ${dateFormatted ? `${this._t("card.kickoff", "Kick-off")} ${dateFormatted.time}` : ""}
                  </div>
                `
              : isPostMatch
              ? html`
                  <div class="score-display">
                    ${vm.displayedScore}
                  </div>
                  <div class="badge badge-${vm.displayedResult}">
                    ${this._t(`card.${vm.displayedResult}`)}
                  </div>
                `
              : html`
                  ${dateFormatted
                    ? html`
                        <div class="match-day">${dateFormatted.weekday} ${dateFormatted.day}</div>
                        <div class="match-time">${dateFormatted.time}</div>
                      `
                    : html`<div class="match-time">-</div>`}
                  ${isGameDay && !vm.isStale
                    ? html`<div class="badge badge-gameday">${this._t("card.gameday", "Game day")}</div>`
                    : ""}
                  ${vm.isStale
                    ? html`<div class="badge badge-postponed">${this._t("card.postponed", "Postponed")}</div>`
                    : ""}
                `}
          </div>

          ${canToggleView
            ? html`
                <ha-icon
                  icon="mdi:chevron-right"
                  class="nav-chevron nav-chevron-right ${!vm.canGoNext ? "disabled" : ""}"
                  @click=${() => this._handleChevronClick("next", vm)}
                  @keydown=${this._onKeyActivate(() => this._handleChevronClick("next", vm))}
                  role="button"
                  tabindex="0"
                  aria-label=${this._t("card.view_next_match", "Show upcoming match")}
                  title=${this._t("card.view_next_match", "Show upcoming match")}
                ></ha-icon>
              `
            : ""}
        </div>

        <div class="team-logo-cell cell-right">
          <div
            class="logo-box ${logoSizeClass} ${isLogoClickable ? "clickable" : ""}"
            @click=${() => this._handleLogoClick(rightEntityId, rightUrl, rightName)}
            @keydown=${isLogoClickable ? this._onKeyActivate(() => this._handleLogoClick(rightEntityId, rightUrl, rightName)) : nothing}
            role=${isLogoClickable ? "button" : nothing}
            tabindex=${isLogoClickable ? "0" : nothing}
            aria-label=${isLogoClickable ? this._t("card.view_team", "View {team}").replace("{team}", rightName) : nothing}
          >
            <img
              class="logo"
              src=${rightLogo}
              alt=""
              @error=${(e) => {
                if (!e.target.src.endsWith(DEFAULT_FALLBACK_LOGO)) {
                  e.target.src = DEFAULT_FALLBACK_LOGO;
                }
              }}
            />
          </div>
        </div>

        <div class="team-name-cell name-left">
          <div class="team-title">${leftName}</div>
        </div>

        <div class="team-name-cell name-right">
          <div class="team-title">${rightName}</div>
        </div>

        ${showRank && (leftRank || rightRank)
          ? html`
              <div class="team-rank-cell rank-left">
                ${leftRank
                  ? html`
                      <span
                        class="rank-badge ${this._getRankClass(leftRank)} ${solidRankClass} ${hasStandingsData ? "clickable-badge" : ""}"
                        @click=${() => {
                          if (hasStandingsData) this._openModal("standings");
                        }}
                        @keydown=${hasStandingsData ? this._onKeyActivate(() => this._openModal("standings")) : nothing}
                        role=${hasStandingsData ? "button" : nothing}
                        tabindex=${hasStandingsData ? "0" : nothing}
                        aria-label=${hasStandingsData ? this._t("card.view_standings", "View league standings") : nothing}
                        title=${hasStandingsData ? this._t("card.view_standings", "View league standings") : ""}
                      >${leftRank}</span>
                    `
                  : ""}
              </div>
              <div class="team-rank-cell rank-right">
                ${rightRank
                  ? html`
                      <span
                        class="rank-badge ${this._getRankClass(rightRank)} ${solidRankClass} ${hasStandingsData ? "clickable-badge" : ""}"
                        @click=${() => {
                          if (hasStandingsData) this._openModal("standings");
                        }}
                        @keydown=${hasStandingsData ? this._onKeyActivate(() => this._openModal("standings")) : nothing}
                        role=${hasStandingsData ? "button" : nothing}
                        tabindex=${hasStandingsData ? "0" : nothing}
                        aria-label=${hasStandingsData ? this._t("card.view_standings", "View league standings") : nothing}
                        title=${hasStandingsData ? this._t("card.view_standings", "View league standings") : ""}
                      >${rightRank}</span>
                    `
                  : ""}
              </div>
            `
          : ""}
      </div>
    `;
  }

  _renderFooter(vm) {
    const {
      gymName,
      gymCity,
      hasValidForm,
      isPreview,
      displayFormSequence,
      displayFormStreak,
      showFormBlock,
    } = vm;

    return html`
      ${showFormBlock
        ? html`
            <div
              class="footer-form clickable"
              @click=${() => this._openModal("form")}
              @keydown=${this._onKeyActivate(() => this._openModal("form"))}
              role="button"
              tabindex="0"
              aria-label=${this._t("card.view_form_details", "View form details")}
              title=${this._t("card.view_form_details", "View form details")}
            >
              <span class="form-label">${this._t("card.form", "Form")}${this._colon()}</span>
              <span class="form-sequence">${displayFormSequence}</span>${displayFormStreak ? html`<span class="form-streak">(${displayFormStreak})</span>` : ""}
              ${!hasValidForm && isPreview
                ? html`<span class="form-preview-tag">(${this._t("card.preview_example", "example")})</span>`
                : ""}
            </div>
          `
        : ""}

      ${this._config.show_venue && (gymName || gymCity)
        ? html`
            <div
              class="footer-venue clickable"
              @click=${() => this._openMaps(gymName, gymCity)}
              @keydown=${this._onKeyActivate(() => this._openMaps(gymName, gymCity))}
              role="button"
              tabindex="0"
              aria-label=${this._t("card.open_maps", "Open in Google Maps")}
              title=${this._t("card.open_maps", "Open in Google Maps")}
            >
              <div class="venue-info">
                <ha-icon icon="mdi:map-marker-radius"></ha-icon>
                <span class="venue-text">${gymName}${gymCity ? ` (${gymCity})` : ""}</span>
              </div>
            </div>
          `
        : ""}
    `;
  }

  static get styles() {
    return [cardStyles, standingsBlockStyles];
  }
}

// Defensive: avoids a "this name has already been used" crash if the
// module is ever evaluated twice (e.g. HA re-registering resources after
// a dashboard reload without a full page refresh).
if (!customElements.get("ffbb-tracker-card")) {
  customElements.define("ffbb-tracker-card", FFBBCard);
}

console.info(
  `%c FFBB Tracker Card %c v${CARD_VERSION} `,
  "color: white; background: #e02424; font-weight: 700; border-radius: 3px 0 0 3px;",
  "color: #e02424; background: white; font-weight: 700; border-radius: 0 3px 3px 0;"
);

window.customCards = window.customCards || [];
const existingIndex = window.customCards.findIndex((c) => c.type === "ffbb-tracker-card");
const cardDefinition = {
  type: "ffbb-tracker-card",
  name: `FFBB Tracker v${CARD_VERSION}`,
  preview: true,
  description: "Display French Basketball Federation match schedules, live scores, and gym venue.",
};
if (existingIndex !== -1) {
  window.customCards[existingIndex] = cardDefinition;
} else {
  window.customCards.push(cardDefinition);
}