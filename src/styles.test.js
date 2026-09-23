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

  for (const selector of [".badge-gameday", ".badge-postponed"]) {
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

  it("leaves the live and result badges in the normal flow", () => {
    for (const selector of [".badge-live", ".badge-win", ".badge-loss", ".badge-draw"]) {
      expect(declarationsFor(selector).position, selector).toBeUndefined();
    }
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
});
