// @vitest-environment happy-dom
//
// Regression tests for the "Game day" / "Postponed" badge layout.
//
// The centre column (.center-meta) shares grid row 1 with the team logos.
// When the badge was in the normal flow, it made that row taller than the
// logo and pushed the team names and ranks down -- very visible with the
// small logo size. The fix takes the badge out of the flow
// (position: absolute) and anchors it below the date/time block.
//
// jsdom/happy-dom do not compute layout, so these tests read the CSS text
// itself and check the declarations that make the fix work.
import { describe, it, expect } from "vitest";
import { cardStyles } from "./styles.js";

// Merge every declaration that applies to `selector`, in source order (a
// later rule overrides an earlier one, as in the browser). Selector lists
// such as ".a, .b { ... }" count for each of their selectors.
function declarationsFor(selector) {
  const css = cardStyles.cssText.replace(/\/\*[\s\S]*?\*\//g, "");
  const merged = {};
  for (const [, selectors, body] of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const list = selectors.split(",").map((s) => s.trim());
    if (!list.includes(selector)) continue;
    for (const decl of body.split(";")) {
      const idx = decl.indexOf(":");
      if (idx === -1) continue;
      merged[decl.slice(0, idx).trim()] = decl.slice(idx + 1).trim();
    }
  }
  return merged;
}

describe("styles.js -- game day / postponed badge layout", () => {
  it("makes .center-meta the positioning context for the badge", () => {
    expect(declarationsFor(".center-meta").position).toBe("relative");
  });

  // Result badges (win / loss / draw) are anchored exactly like the others, so
  // "Win", "Loss", "Bye", "Postponed"... all sit at the same place.
  for (const selector of [
    ".badge-gameday",
    ".badge-postponed",
    ".badge-win",
    ".badge-loss",
    ".badge-draw",
  ]) {
    describe(selector, () => {
      it("is taken out of the flow so it cannot stretch the logo row", () => {
        expect(declarationsFor(selector).position).toBe("absolute");
      });

      it("is anchored just below the date/time block", () => {
        expect(declarationsFor(selector).top).toBe("100%");
      });

      it("is horizontally centred on the column", () => {
        const decl = declarationsFor(selector);
        expect(decl.left).toBe("50%");
        expect(decl.transform).toBe("translateX(-50%)");
      });

      it("never wraps onto two lines", () => {
        expect(declarationsFor(selector)["white-space"]).toBe("nowrap");
      });

      it("has a small gap under the block, not the old in-flow 18px margin", () => {
        const gap = declarationsFor(selector)["margin-top"];
        expect(gap).toMatch(/^\d+px$/);
        expect(parseInt(gap, 10)).toBeGreaterThan(0);
        expect(parseInt(gap, 10)).toBeLessThan(18);
      });
    });
  }

  it("leaves the live badge in the normal flow", () => {
    expect(declarationsFor(".badge-live").position).toBeUndefined();
  });

  it("gives the time and the score the same fixed-height row, so the date never moves", () => {
    const row = declarationsFor(".match-main");
    expect(row.display).toBe("flex");
    expect(row.height).toBe("2.2em");
    expect(declarationsFor(".score-display")["margin-bottom"]).toBe("0");
  });
});

// .match-area's own align-items is "start", shared by every row of that
// grid (row 1: logos + center column; row 2: team names; row 3: rank
// badges). It must stay "start" for row 2 -- when one team name wraps onto
// 2 lines and the other doesn't, both should start reading at the same y,
// not have the shorter one float mid-row. So the center column (row 1
// only) needs its own override rather than a grid-wide change.
describe("styles.js -- center column (date/time/status) is vertically centred against the logos", () => {
  it(".center-meta-wrapper overrides the grid's align-items: start with its own align-self: center", () => {
    expect(declarationsFor(".center-meta-wrapper")["align-self"]).toBe("center");
  });

  it(".match-area itself is untouched (still align-items: start, for the team-name row)", () => {
    expect(declarationsFor(".match-area")["align-items"]).toBe("start");
  });
});

// A one-line team name (e.g. "UJSBP") next to a two-line one (e.g. "BASKET
// BIAUDOS ST MARTIN DE SEIG") share grid-row 2, whose height is set by the
// taller (two-line) side. .team-name-cell's own align-items controls where
// the shorter name sits within that shared height -- "center" (not the grid's
// "flex-start" default) is what makes the one-line name sit level with the
// middle of the two-line one instead of clinging to the top with dead space
// below it before the rank badge row.
describe("styles.js -- a one-line team name is vertically centred against a two-line one on the other side", () => {
  it(".team-name-cell overrides the grid's default top alignment with align-self: center", () => {
    expect(declarationsFor(".team-name-cell")["align-self"]).toBe("center");
  });

  it(".team-name-cell also centres a one-line name within its own now-2-line-tall box", () => {
    expect(declarationsFor(".team-name-cell")["align-items"]).toBe("center");
  });
});

// Without a minimum, a one-line team name only reserves 1 line of height
// while a two-line one reserves 2 -- so grid-row 2 (and the whole card's
// vertical size) changed height match to match depending on how long the
// two team names happened to be. Reserving 2 lines (line-height 1.25 x 2)
// at all times keeps the card's height constant regardless of content.
describe("styles.js -- team name always reserves 2 lines of height, so card height doesn't jump match to match", () => {
  it(".team-title has a min-height of 2 lines (line-height 1.25 x 2 = 2.5em)", () => {
    expect(declarationsFor(".team-title")["min-height"]).toBe("2.5em");
  });

  it("the 2-line cap (-webkit-line-clamp) is still in place, so a long name is still truncated, not just reserved-for", () => {
    expect(declarationsFor(".team-title")["-webkit-line-clamp"]).toBe("2");
  });
});

// The season-schedule modal's per-row team logos and date/time were small
// enough to be barely legible (16px logos, 0.76em text) -- both bumped up a
// notch. The date/time column has a fixed min-width (58px) independent of
// font-size, so this doesn't risk wrapping or reflowing the row.
describe("styles.js -- calendar modal rows: bigger logos and date/time", () => {
  it(".cal-mini-logo grew from 16px to 22px", () => {
    const decl = declarationsFor(".cal-mini-logo");
    expect(decl.width).toBe("22px");
    expect(decl.height).toBe("22px");
  });

  it(".cal-date grew from 0.76em to 0.84em and .cal-time to 0.9em", () => {
    expect(declarationsFor(".cal-date")["font-size"]).toBe("0.84em");
    expect(declarationsFor(".cal-time")["font-size"]).toBe("0.9em");
  });
});

describe("styles.js -- calendar modal: a bye row is styled like any other row with the fallback crest", () => {
  it("uses .cal-mini-logo directly (no special .cal-bye-icon disc)", () => {
    expect(declarationsFor(".cal-bye-icon").width).toBeUndefined();
    const logo = declarationsFor(".cal-mini-logo");
    expect(logo.width).toBe("22px");
    expect(logo.height).toBe("22px");
  });

  it("the bye label is semi-bold and in the normal text colour, not faded or italic", () => {
    const decl = declarationsFor(".cal-team.bye-text");

    expect(decl["font-weight"]).toBe("600");
    expect(decl["font-style"]).toBeUndefined();
    expect(decl.color).toBe("var(--primary-text-color)");
    expect(declarationsFor(".calendar-row.bye-row").opacity).toBeUndefined();
  });
});

describe("styles.js -- calendar modal: date at the top, score / time at the bottom", () => {
  // Anchoring (not centring) the two lines is what puts the date at the same
  // height with or without a score, and spreads it away from the score without
  // making the row taller: the column stretches over the height the team
  // lines already give the row.
  it("the meta column stretches over the row and spreads its two lines", () => {
    const decl = declarationsFor(".calendar-col-meta");

    expect(decl["justify-content"]).toBe("space-between");
    expect(decl["align-self"]).toBe("stretch");
  });

  it("keeps the two lines off the row's edges, and the score larger than the date", () => {
    const meta = declarationsFor(".calendar-col-meta");
    const score = parseFloat(declarationsFor(".cal-score")["font-size"]);
    const date = parseFloat(declarationsFor(".cal-date")["font-size"]);

    expect(meta.padding).toBe("4px 0");
    expect(score).toBeGreaterThan(1.15);
    expect(score).toBeLessThanOrEqual(1.4);
    expect(score).toBeGreaterThan(date);
  });

  it("the date is as large as the team names, and bold; the time is a bit larger", () => {
    const team = parseFloat(declarationsFor(".cal-team")["font-size"]);

    expect(parseFloat(declarationsFor(".cal-date")["font-size"])).toBe(team);
    expect(declarationsFor(".cal-date")["font-weight"]).toBe("700");
    expect(parseFloat(declarationsFor(".cal-time")["font-size"])).toBeGreaterThan(team);
    // The score stays the largest line of the column.
    expect(parseFloat(declarationsFor(".cal-score")["font-size"])).toBeGreaterThan(
      parseFloat(declarationsFor(".cal-time")["font-size"]),
    );
  });

  it("the date sits slightly lower than the column's edge", () => {
    expect(declarationsFor(".cal-date")["margin-top"]).toBe("2px");
  });

  it("a lone line (score only, or a dash) stays centred", () => {
    expect(declarationsFor(".calendar-col-meta > :only-child").margin).toBe("auto 0");
  });

  it("adds no height of its own: no min-height, and the row's min-height is untouched", () => {
    expect(declarationsFor(".calendar-col-meta")["min-height"]).toBeUndefined();
    expect(declarationsFor(".calendar-row")["min-height"]).toBe("44px");
  });
});

describe("styles.js -- one card height from match to match", () => {
  it("gives .center-meta the height of its tallest content (day + score + badge)", () => {
    // Upcoming, bye and live states are shorter than a played match; without
    // a minimum the whole card shrank by about 15px for them.
    expect(declarationsFor(".center-meta")["min-height"]).toBe("calc(4.3em + 28px)");
    expect(declarationsFor(".center-meta")["box-sizing"]).toBe("border-box");
  });

  it("holds the venue row's place without showing anything", () => {
    const empty = declarationsFor(".footer-venue-empty");

    expect(empty["border-top-color"]).toBe("transparent");
    expect(empty["pointer-events"]).toBe("none");
    expect(declarationsFor(".footer-venue-empty .venue-info").visibility).toBe("hidden");
  });
});

describe("styles.js -- form popup pills", () => {
  // The pills reuse .badge-win / .badge-loss / .badge-draw for their colours.
  // Those classes are absolutely positioned for the centre badge, so the pills
  // must cancel it or they stack on one point and get clipped.
  for (const kind of ["win", "loss", "draw"]) {
    it(`.form-badge-pill.badge-${kind} stays in the normal flow`, () => {
      const decl = declarationsFor(`.form-badge-pill.badge-${kind}`);
      expect(decl.position).toBe("static");
      expect(decl.transform).toBe("none");
      expect(decl["margin-top"]).toBe("0");
    });
  }
});

describe("styles.js -- v0.7.0 theme, CSS fallback, and layout hardening", () => {
  it(".card-header wraps its fallback CSS variable in var()", () => {
    expect(declarationsFor(".card-header").color).toBe("var(--ha-card-header-color, var(--primary-text-color))");
  });

  it(".rank-badge and .rank-badge.rank-solid use theme variables instead of hardcoded white", () => {
    expect(declarationsFor(".rank-badge").color).toBe("var(--primary-text-color)");
    expect(declarationsFor(".rank-badge.rank-solid").color).toBe("var(--primary-text-color)");
  });

  it(".badge-gameday follows --ffbb-accent-color and dead @keyframes pulse is removed", () => {
    expect(declarationsFor(".badge-gameday")["background-color"]).toContain("--ffbb-accent-color");
    expect(cardStyles.cssText).not.toMatch(/@keyframes\s+pulse\b/);
  });

  it(".calendar-row reserves 42px for the round/venue pill column (fits HOME / AWAY)", () => {
    expect(declarationsFor(".calendar-row")["grid-template-columns"]).toBe("42px 1fr auto");
  });

  it("v0.7.2 / v0.7.3: ha-card uses @supports-guarded --ffbb-logo-cap, form popup stays on one line, and footer form stays plain text", () => {
    expect(declarationsFor("ha-card")["container-type"]).toBe("inline-size");
    expect(declarationsFor("ha-card")["--ffbb-logo-cap"]).toContain("100cqw");
    expect(cardStyles.cssText).toMatch(/@supports\s*\(width:\s*1cqw\)\s*\{\s*ha-card\s*\{[^}]*--ffbb-logo-cap/);
    for (const size of ["small", "medium", "large", "extra_large"]) {
      expect(declarationsFor(`.logo-box-${size}`).width).toContain("--ffbb-logo-cap");
      expect(declarationsFor(`.logo-box-${size}`).height).toContain("--ffbb-logo-cap");
    }
    expect(declarationsFor(".form-badges-container")["flex-wrap"]).toBe("nowrap");
    expect(declarationsFor(".form-badge-pill")["min-width"]).toBe("0");
    expect(declarationsFor(".footer-form").display).toBeUndefined();
    expect(declarationsFor(".form-sequence")["letter-spacing"]).toBe("3px");
    expect(declarationsFor(".form-streak")["margin-left"]).toBe("0.25em");
    expect(declarationsFor(".form-char")).toEqual({});
    expect(declarationsFor(".form-char-win")).toEqual({});
  });
});

// The centre column of the match area has a fixed width (so the logos stay
// put from one match to the next). The score must therefore never be able to
// wrap onto two lines when it is wider than that column.
describe("styles.js -- the score never wraps", () => {
  it(".score-display and .score-sep are on a single line", () => {
    expect(declarationsFor(".score-display")["white-space"]).toBe("nowrap");
  });

  it(".center-meta keeps its content width instead of shrinking to the fixed column", () => {
    expect(declarationsFor(".center-meta").flex).toBe("none");
  });

  it("the centre column is container-sized (up to 144px), never content-sized", () => {
    const cols = declarationsFor(".match-area")["grid-template-columns"];
    expect(cols).toBe("minmax(0, 1fr) clamp(118px, 38cqw, 144px) minmax(0, 1fr)");
    expect(cols).not.toMatch(/\b(auto|min-content|max-content)\b/);
  });
});

// The chevrons sit further out than in 0.6.15, as in 0.6.11 (where the centre
// column followed a played match's wide score): the centre column is 144px and
// the chevrons are offset 26px outside of it (each team name gets 8px back
// compared to 0.6.17's 160px column).
describe("styles.js -- navigation chevrons are kept outwards", () => {
  it("the chevrons are offset 26px outside the centre column", () => {
    expect(declarationsFor(".nav-chevron-left").left).toBe("-26px");
    expect(declarationsFor(".nav-chevron-right").right).toBe("-26px");
  });
});

// My own team's row in every standings table (popup + standings blocks):
// position and name in the accent colour. The opponent's row is not tagged
// my-team-row, so it only gets the grey highlight.
describe("styles.js -- my team's standings row is orange", () => {
  it("colours the position and the team name with the accent colour", () => {
    expect(declarationsFor(".standings-table tr.my-team-row .pos-cell").color).toBe("var(--ffbb-accent-color, #ff6b00)");
    expect(declarationsFor(".standings-table tr.my-team-row .col-team").color).toBe("var(--ffbb-accent-color, #ff6b00)");
  });

  it("does not recolour the other columns (the points column is already accent-coloured)", () => {
    expect(declarationsFor(".standings-table tr.my-team-row td")).toEqual({});
  });
});
