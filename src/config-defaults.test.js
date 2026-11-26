import { describe, it, expect } from "vitest";
import { DEFAULT_CONFIG } from "./config-defaults.js";

// This file is the single source of truth ha-ffbb-tracker-card.js,
// card-editor.js and getStubConfig() all read from (see the comment at
// the top of config-defaults.js). Locking its exact shape here means a
// typo'd key, an accidentally dropped option, or a flipped boolean
// default gets caught as a one-line diff in a failing test instead of
// silently changing behavior for every install.
describe("DEFAULT_CONFIG", () => {
  it("does not include entity (no sensible default -- setConfig() must require it explicitly)", () => {
    expect(DEFAULT_CONFIG).not.toHaveProperty("entity");
  });

  it("matches the exact documented default shape", () => {
    expect(DEFAULT_CONFIG).toEqual({
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
      show_calendar_logos: true,
      show_standings_logos: true,
    });
  });

  // display_mode adds a whole second card (or replaces the match card
  // entirely), so it defaults to "match": existing dashboards must look
  // exactly the same after an upgrade.
  it('display_mode defaults to "match" (opt-in, so existing dashboards are unchanged)', () => {
    expect(DEFAULT_CONFIG.display_mode).toBe("match");
  });

  it("every show_* toggle defaults to true", () => {
    const showKeys = Object.keys(DEFAULT_CONFIG).filter((k) => k.startsWith("show_"));
    expect(showKeys.length).toBeGreaterThan(0);
    for (const key of showKeys) {
      expect(DEFAULT_CONFIG[key]).toBe(true);
    }
  });
});