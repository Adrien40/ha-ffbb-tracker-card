import { LitElement, html, nothing } from "lit";
import { CARD_VERSION } from "./version.js";
import { DEFAULT_CONFIG } from "./config-defaults.js";
import {
  extractCalendarMatches,
  resolveEntities,
  sortStandings,
  formatDate,
  computeViewModel,
  DEFAULT_FALLBACK_LOGO,
  cleanForMatch,
} from "./pure.js";
import { resolveLang, getTranslations, translate } from "./translations.js";
import { cardStyles } from "./styles.js";
import "./card-editor.js";

class FFBBCard extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
      _activeModal: { state: true },
      _manualView: { state: true },
    };
  }

  constructor() {
    super();
    this._translationsLang = "fr";
    this._translations = getTranslations("fr");
    this._activeModal = null;
    this._manualView = null;
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

  setConfig(config) {
    if (!config.entity) {
      throw new Error("Please define an entity from the FFBB Tracker integration.");
    }
    this._config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
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

  _colon() {
    return this._translationsLang === "fr" ? "\u00a0:" : ":";
  }

  _getRankClass(rank) {
    if (!rank) return "";
    if (this._config?.disable_podium_colors) return "";
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

  _formatDate(dateStr) {
    const lang = this.hass?.locale?.language || this.hass?.language || "en-US";
    return formatDate(dateStr, lang);
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
    this._activeModal = type;
  }

  _closeModal() {
    this._activeModal = null;
  }

  _setManualView(view) {
    this._manualView = view;
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

  _renderModal(entities, teamName, opponentName) {
    if (!this._activeModal) {
      return html``;
    }

    if (this._activeModal === "standings") {
      const rawStandings = entities.rank?.attributes?.standings || [];
      const standings = sortStandings(rawStandings);
      const competition = entities.poule?.attributes?.competition || "";
      const poule = entities.poule?.state || "";

      return html`
        <div
          class="modal-backdrop"
          @click=${this._closeModal}
          @keydown=${(e) => {
            if (e.key === "Escape") this._closeModal();
          }}
        >
          <div class="modal-card" @click=${(e) => e.stopPropagation()}>
            <div class="modal-header">
              <div class="modal-title">
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
            <div class="modal-body">
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
                          const itemClean = cleanForMatch(item.team_name || item.name || "");
                          const teamClean = cleanForMatch(teamName);
                          const oppClean = cleanForMatch(opponentName);
                          const isHomeHighlight = Boolean(
                            itemClean && teamClean && (itemClean === teamClean || itemClean.includes(teamClean) || teamClean.includes(itemClean))
                          );
                          const isOppHighlight = Boolean(
                            itemClean && oppClean && (itemClean === oppClean || itemClean.includes(oppClean) || oppClean.includes(itemClean))
                          );
                          const isRowHighlighted = isHomeHighlight || isOppHighlight;

                          return html`
                            <tr class=${isRowHighlighted ? "highlight-row" : ""}>
                              <td class="pos-cell">${item.position || item.rank || "-"}</td>
                              <td class="col-team">${item.team_name || item.name || "-"}</td>
                              <td class="pts-cell">${item.points ?? item.pts ?? "-"}</td>
                              <td>${item.played ?? item.joues ?? "-"}</td>
                              <td>${item.wins ?? item.gagnes ?? "-"}</td>
                              <td>${item.losses ?? item.perdus ?? "-"}</td>
                              <td>${item.draws ?? item.nuls ?? item.nul ?? item.n ?? "0"}</td>
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
          @keydown=${(e) => {
            if (e.key === "Escape") this._closeModal();
          }}
        >
          <div class="modal-card" @click=${(e) => e.stopPropagation()}>
            <div class="modal-header">
              <div class="modal-title">
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
            <div class="modal-body form-modal-content">
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

      return html`
        <div
          class="modal-backdrop"
          @click=${this._closeModal}
          @keydown=${(e) => {
            if (e.key === "Escape") this._closeModal();
          }}
        >
          <div class="modal-card" @click=${(e) => e.stopPropagation()}>
            <div class="modal-header">
              <div class="modal-title">
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
            <div class="modal-body">
              ${matches.length > 0
                ? html`
                    <div class="calendar-list">
                      ${matches.map((m) => {
                        const home = m.home_team || m.equipe_domicile || "-";
                        const away = m.away_team || m.equipe_exterieur || "-";
                        const score = m.score || (m.home_score !== undefined ? `${m.home_score} - ${m.away_score}` : "");
                        const dateFormatted = this._formatDate(m.date || m.datetime);
                        const homeClean = cleanForMatch(home);
                        const awayClean = cleanForMatch(away);
                        const teamClean = cleanForMatch(teamName);
                        const isHomeMyTeam = Boolean(homeClean && teamClean && (homeClean === teamClean || homeClean.includes(teamClean) || teamClean.includes(homeClean)));
                        const isAwayMyTeam = Boolean(awayClean && teamClean && (awayClean === teamClean || awayClean.includes(teamClean) || teamClean.includes(awayClean)));
                        const isMyTeamInvolved = isHomeMyTeam || isAwayMyTeam;

                        return html`
                          <div class="calendar-row ${isMyTeamInvolved ? "highlight-row" : ""}">
                            <div class="calendar-col-round">
                              <span class="cal-round-tag">J${m.round || m.journee || "-"}</span>
                            </div>
                            <div class="calendar-col-teams">
                              <div class="cal-team ${isHomeMyTeam ? "my-team-text" : ""}">${home}</div>
                              <div class="cal-team ${isAwayMyTeam ? "my-team-text" : ""}">${away}</div>
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
    return computeViewModel({
      entities,
      config: this._config,
      manualView: this._manualView,
      states: this.hass?.states,
      lang: this._translationsLang,
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
      <ha-card style="--ffbb-accent-color: ${vm.accentColor};">
        ${this._renderHeader(vm)}

        <div class="container">
          ${this._renderWatermark(vm)}
          ${this._renderMatchHeader(vm)}
          ${this._renderMatchArea(vm, entities)}
          ${this._renderFooter(vm)}
        </div>

        ${this._renderModal(entities, vm.searchTeamName, vm.opponentSearchName)}
      </ha-card>
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
            />
            <img
              class="watermark watermark-right"
              src=${rightLogo}
              alt=""
              aria-hidden="true"
              @error=${(e) => (e.target.style.display = "none")}
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

  _renderMatchArea(vm, entities) {
    const {
      isValidState,
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

    const solidRankClass = this._config?.solid_rank_badges ? "rank-solid" : "";

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
                if (e.target.src !== DEFAULT_FALLBACK_LOGO) {
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
                  class="nav-chevron nav-chevron-left ${isPostMatch ? "disabled" : ""}"
                  @click=${() => this._setManualView("last")}
                  @keydown=${this._onKeyActivate(() => this._setManualView("last"))}
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
                this._openCalendar(entities.nextDate?.state, leftName, rightName, gymName, gymCity);
              }
            }}
            @keydown=${
              isCalendarClickable
                ? this._onKeyActivate(() => this._openCalendar(entities.nextDate?.state, leftName, rightName, gymName, gymCity))
                : nothing
            }
            role=${isCalendarClickable ? "button" : nothing}
            tabindex=${isCalendarClickable ? "0" : nothing}
            aria-label=${isCalendarClickable ? this._t("card.add_to_calendar", "Add to Google Calendar") : nothing}
            title=${isCalendarClickable ? this._t("card.add_to_calendar", "Add to Google Calendar") : ""}
          >
            ${isLive
              ? html`
                  <div class="badge badge-live">${this._t("card.live", "Live")}</div>
                  <div class="live-clock">${dateFormatted ? dateFormatted.time : ""}</div>
                `
              : isPostMatch
              ? html`
                  <div class="score-display">
                    ${isValidState(entities.lastScore?.state) ? entities.lastScore.state : "-"}
                  </div>
                  <div class="badge badge-${isValidState(entities.lastResult?.state) ? entities.lastResult.state : "draw"}">
                    ${this._t(`card.${isValidState(entities.lastResult?.state) ? entities.lastResult.state : "draw"}`)}
                  </div>
                `
              : html`
                  ${dateFormatted
                    ? html`
                        <div class="match-day">${dateFormatted.weekday} ${dateFormatted.day}</div>
                        <div class="match-time">${dateFormatted.time}</div>
                      `
                    : html`<div class="match-time">-</div>`}
                  ${isGameDay && !entities.nextDate?.attributes?.is_stale
                    ? html`<div class="badge badge-gameday">${this._t("card.gameday", "Game day")}</div>`
                    : ""}
                  ${entities.nextDate?.attributes?.is_stale
                    ? html`<div class="badge badge-postponed">${this._t("card.postponed", "Postponed")}</div>`
                    : ""}
                `}
          </div>

          ${canToggleView
            ? html`
                <ha-icon
                  icon="mdi:chevron-right"
                  class="nav-chevron nav-chevron-right ${!isPostMatch ? "disabled" : ""}"
                  @click=${() => this._setManualView("next")}
                  @keydown=${this._onKeyActivate(() => this._setManualView("next"))}
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
                if (e.target.src !== DEFAULT_FALLBACK_LOGO) {
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
    return cardStyles;
  }
}

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