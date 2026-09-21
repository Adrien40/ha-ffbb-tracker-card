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
      show_standings_below: false,
      show_form: true,
      show_venue: true,
      show_watermark: true,
    });
  });

  // show_standings_below adds a whole second card, so it is opt-in: existing
  // dashboards must look exactly the same after an upgrade.
  const OPT_IN_TOGGLES = ["show_standings_below"];

  it("opt-in toggles default to false", () => {
    for (const key of OPT_IN_TOGGLES) {
      expect(DEFAULT_CONFIG[key]).toBe(false);
    }
  });

  it("every show_* toggle defaults to true, except the opt-in ones", () => {
    const showKeys = Object.keys(DEFAULT_CONFIG).filter(
      (k) => k.startsWith("show_") && !OPT_IN_TOGGLES.includes(k)
    );
    expect(showKeys.length).toBeGreaterThan(0);
    for (const key of showKeys) {
      expect(DEFAULT_CONFIG[key]).toBe(true);
    }
  });
});