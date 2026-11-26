// @vitest-environment happy-dom
//
// Lightweight smoke tests for the two custom-element modules
// (ha-ffbb-tracker-card.js, card-editor.js). Unlike pure.test.js and
// translations.test.js, these don't exercise rendering or user
// interaction -- their whole job is to guarantee that *importing* these
// files does not throw, and that their config-handling entry points
// (setConfig, getStubConfig, _t) behave correctly without needing a real
// `hass` object or a mounted DOM tree.
//
// Both regressions found in this repo on 2026-09-17 would have failed
// `npm test` instantly with a test like this one, instead of only
// surfacing in `npm run build` (or, worse, in a user's browser console):
//   1. `import { LitElement, ... } from "lit"` with no "lit" dependency
//      declared and no vendored src/lit.js -- module resolution failure.
//   2. card-editor.js importing `fetchTranslations` /
//      `shouldLoadTranslations` from translations.js, which never
//      exported them -- a SyntaxError at import time ("The requested
//      module './translations.js' does not provide an export named
//      ...").
//
// A DOM environment (happy-dom) is required because both modules extend
// LitElement (which extends HTMLElement) and call
// `customElements.define(...)` as a module-level side effect the moment
// they're imported -- plain Node has neither HTMLElement nor
// customElements.
import { describe, it, expect } from "vitest";
import { DEFAULT_CONFIG } from "./config-defaults.js";
import "./ha-ffbb-tracker-card.js";
import "./card-editor.js";

describe("ha-ffbb-tracker-card.js", () => {
  it("registers the ffbb-tracker-card custom element", () => {
    expect(customElements.get("ffbb-tracker-card")).toBeTypeOf("function");
  });

  it("getCardSize() returns 3", () => {
    const Card = customElements.get("ffbb-tracker-card");
    expect(new Card().getCardSize()).toBe(3);
  });

  it("getStubConfig() merges DEFAULT_CONFIG with an empty entity", () => {
    const Card = customElements.get("ffbb-tracker-card");
    expect(Card.getStubConfig()).toEqual({ entity: "", ...DEFAULT_CONFIG });
  });

  it("setConfig() throws without an entity", () => {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    expect(() => el.setConfig({})).toThrow();
    expect(() => el.setConfig({ entity: "" })).toThrow();
  });

  it("setConfig() merges DEFAULT_CONFIG under the given entity and config overrides", () => {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: "sensor.my_team_next_match", show_venue: false });
    expect(el._config).toEqual({
      ...DEFAULT_CONFIG,
      entity: "sensor.my_team_next_match",
      show_venue: false,
    });
  });

  it("render() returns an empty template before hass/_config are set (no crash)", () => {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    expect(() => el.render()).not.toThrow();
  });
});

describe("card-editor.js", () => {
  it("registers the ffbb-tracker-card-editor custom element", () => {
    expect(customElements.get("ffbb-tracker-card-editor")).toBeTypeOf("function");
  });

  it("setConfig() defaults entity to \"\" and merges DEFAULT_CONFIG", () => {
    const Editor = customElements.get("ffbb-tracker-card-editor");
    const el = new Editor();
    el.setConfig({});
    expect(el._config).toEqual({ entity: "", ...DEFAULT_CONFIG });
  });

  it("setConfig() keeps an explicitly provided entity", () => {
    const Editor = customElements.get("ffbb-tracker-card-editor");
    const el = new Editor();
    el.setConfig({ entity: "sensor.my_team_next_match" });
    expect(el._config.entity).toBe("sensor.my_team_next_match");
  });

  // This is the exact assertion that would have failed on the
  // fetchTranslations()/shouldLoadTranslations() bug: those functions
  // don't exist, so _translations would never have been populated and
  // every label in the visual editor would have silently fallen back to
  // English/blank instead of the French seeded by the constructor.
  it("_t() resolves a French key synchronously right after construction, with no hass yet", () => {
    const Editor = customElements.get("ffbb-tracker-card-editor");
    const el = new Editor();
    expect(el._t("card.round", "MISSING")).toBe("Journée");
  });

  it("willUpdate() switches translations when hass reports a different language", () => {
    const Editor = customElements.get("ffbb-tracker-card-editor");
    const el = new Editor();
    expect(el._t("card.round")).toBe("Journée");

    el.hass = { locale: { language: "en-US" } };
    el.willUpdate(new Map([["hass", undefined]]));

    expect(el._t("card.round")).toBe("Round");
  });
});
