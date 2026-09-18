import { LitElement, html, css } from "lit";
import { CARD_VERSION } from "./version.js";
import { DEFAULT_CONFIG } from "./config-defaults.js";
import { resolveLang, getTranslations, translate } from "./translations.js";

class FFBBCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
      _translations: { state: true },
    };
  }

  static get styles() {
    return css`
      .card-version {
        text-align: right;
        font-size: 0.75em;
        font-weight: 500;
        color: var(--secondary-text-color);
        margin-top: 16px;
        opacity: 0.6;
      }
    `;
  }

  constructor() {
    super();
    this._translationsLang = "fr";
    this._translations = getTranslations("fr");
  }

  setConfig(config) {
    this._config = {
      entity: "",
      ...DEFAULT_CONFIG,
      ...config,
    };
  }

  updated(changedProperties) {
    super.updated(changedProperties);
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

  _valueChanged(ev) {
    if (!this._config || !this.hass) {
      return;
    }
    if (!ev.detail || ev.detail.value === undefined) {
      return;
    }

    const updatedValue = { ...ev.detail.value };
    const textFields = ["entity", "custom_team_name", "title", "icon", "custom_accent_color"];
    for (const field of textFields) {
      if (!(field in updatedValue)) {
        updatedValue[field] = "";
      }
    }

    const newConfig = { ...this._config, ...updatedValue };

    const event = new CustomEvent("config-changed", {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const schema = [
      {
        name: "entity",
        label: this._t("editor.entity", "FFBB team (sensor)"),
        helper: this._t("editor.entity_helper", "Select any sensor belonging to the team"),
        selector: {
          entity: {
            filter: {
              integration: "ffbb_tracker",
              domain: "sensor",
            },
          },
        },
      },
      {
        name: "show_title",
        label: this._t("editor.show_title", "Show title"),
        default: true,
        selector: { boolean: {} },
      },
      {
        name: "title",
        label: this._t("editor.title", "Title"),
        selector: { text: {} },
      },
      {
        name: "icon",
        label: this._t("editor.icon", "Icon"),
        selector: { icon: {} },
      },
      {
        name: "show_header",
        label: this._t("editor.show_header", "Show header / Round"),
        default: true,
        selector: { boolean: {} },
      },
      {
        name: "logo",
        type: "expandable",
        flatten: true,
        title: this._t("editor.logo_section", "Logo"),
        icon: "mdi:basketball",
        schema: [
          {
            name: "logo_size",
            label: this._t("editor.logo_size", "Team crest size"),
            default: "medium",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "small", label: this._t("editor.logo_size_small", "Small") },
                  { value: "medium", label: this._t("editor.logo_size_medium", "Medium (default)") },
                  { value: "large", label: this._t("editor.logo_size_large", "Large") },
                ],
              },
            },
          },
          {
            name: "logo_click_action",
            label: this._t("editor.logo_click_action", "Action on logo click"),
            default: "team_url",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "none", label: this._t("editor.logo_action_none", "No action") },
                  { value: "team_url", label: this._t("editor.logo_action_team_url", "Official FFBB team page") },
                  { value: "more-info", label: this._t("editor.logo_action_more_info", "Detailed view (more-info)") },
                ],
              },
            },
          },
          {
            name: "show_watermark",
            label: this._t("editor.show_watermark", "Transparent background logos"),
            default: true,
            selector: { boolean: {} },
          },
        ],
      },
      {
        name: "default_match_view",
        label: this._t("editor.default_match_view", "Initial view"),
        default: "auto",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "auto", label: this._t("editor.view_auto", "Last match played until D+1") },
              { value: "next", label: this._t("editor.view_next", "Always upcoming match") },
              { value: "last", label: this._t("editor.view_last", "Last match (upcoming match at D-1)") },
            ],
          },
        },
      },
      {
        name: "custom_team_name",
        label: this._t("editor.custom_team_name", "Custom name for my team"),
        helper: this._t("editor.custom_team_name_helper", "Leave blank to keep official FFBB team name"),
        selector: { text: {} },
      },
      {
        name: "accent_color",
        label: this._t("editor.accent_color", "Accent color"),
        default: "default",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "default", label: this._t("editor.accent_color_default", "Basketball orange (default)") },
              { value: "theme", label: this._t("editor.accent_color_theme", "Home Assistant theme") },
              { value: "custom", label: this._t("editor.accent_color_custom", "Custom color") },
            ],
          },
        },
      },
      ...(this._config.accent_color === "custom"
        ? [
            {
              name: "custom_accent_color",
              label: this._t("editor.custom_accent_color", "Custom color code (HEX)"),
              helper: this._t("editor.custom_accent_color_helper", "Example: #1e88e5 or #ff6b00"),
              selector: { text: {} },
            },
          ]
        : []),
      {
        name: "ranking",
        type: "expandable",
        flatten: true,
        title: this._t("editor.ranking_section", "Ranking"),
        icon: "mdi:podium",
        schema: [
          {
            name: "show_rank",
            label: this._t("editor.show_rank", "Show team ranking"),
            default: true,
            selector: { boolean: {} },
          },
          ...(this._config.show_rank !== false
            ? [
                {
                  name: "rank_badge_style",
                  label: this._t("editor.rank_badge_style", "Rank badge style"),
                  default: "outline",
                  selector: {
                    select: {
                      mode: "dropdown",
                      options: [
                        { value: "none", label: this._t("editor.rank_badge_style_none", "Neutral (no color)") },
                        { value: "outline", label: this._t("editor.rank_badge_style_outline", "Colored outline (gold, silver, bronze)") },
                        { value: "solid", label: this._t("editor.rank_badge_style_solid", "Solid color (gold, silver, bronze)") },
                      ],
                    },
                  },
                },
              ]
            : []),
        ],
      },
      {
        name: "show_form",
        label: this._t("editor.show_form", "Show recent form"),
        default: true,
        selector: { boolean: {} },
      },
      {
        name: "show_venue",
        label: this._t("editor.show_venue", "Show venue"),
        default: true,
        selector: { boolean: {} },
      },
    ];

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${schema}
        .computeLabel=${(s) => s.label}
        .computeHelper=${(s) => s.helper}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="card-version">FFBB Tracker Card v${CARD_VERSION}</div>
    `;
  }
}

customElements.define("ffbb-tracker-card-editor", FFBBCardEditor);