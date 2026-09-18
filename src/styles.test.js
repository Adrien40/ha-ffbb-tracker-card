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
