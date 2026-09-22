// Single source of truth for the card's default configuration values.
//
// ha-ffbb-tracker-card.js (setConfig + getStubConfig) and card-editor.js
// (setConfig) all import DEFAULT_CONFIG from here instead of each keeping
// their own copy of the same object, so adding, renaming, or removing a
// config option only needs to happen in one place. Before this file
// existed, the three copies could silently drift apart -- exactly the kind
// of regression the CARD_VERSION check in validate.yml already guards
// against for a different value.
//
// NOTE: `entity` is intentionally NOT included here. It has no sensible
// default (setConfig() throws if it's missing) and getStubConfig() needs
// it present as "" for the card picker UI, so it's still set explicitly
// at each call site.
export const DEFAULT_CONFIG = {
  custom_team_name: "",
  logo_size: "medium",
  logo_click_action: "team_url",
  default_match_view: "auto",
  accent_color: "default",
  custom_accent_color: "",
  show_title: true,
  title: "",
  icon: "mdi:basketball",
  show_header: true,
  show_rank: true,
  rank_badge_style: "outline",
  display_mode: "match",
  standings_title: "",
  standings_icon: "mdi:format-list-numbered",
  standings_popup_detailed: false,
  show_form: true,
  show_venue: true,
  show_watermark: true,
};