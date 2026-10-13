// @vitest-environment happy-dom
//
// card-editor.js had zero dedicated coverage before this file:
// components.test.js only smoke-tests registration, setConfig(), and _t().
// The two things that actually break silently when this file regresses are:
//   1. the visual-editor schema -- fields appearing/disappearing based on
//      other field values (accent_color, show_rank) -- since a wrong schema
//      still "renders" without throwing;
//   2. _valueChanged() -- the bridge that turns ha-form's raw value-changed
//      event into the config-changed event Lovelace listens for.
//
// Lit property bindings (.schema=${schema}) are plain JS property
// assignments on the DOM node -- they don't require <ha-form> itself to be
// a registered custom element. So mounting the editor and reading
// `shadowRoot.querySelector("ha-form").schema` gives the *real* schema
// array the user's form would receive, without needing to stub or import
// Home Assistant's ha-form implementation.
import { describe, it, expect, vi } from "vitest";
import "./card-editor.js";

function mountEditor(configOverrides = {}, hassOverrides = {}) {
  const Editor = customElements.get("ffbb-tracker-card-editor");
  const el = new Editor();
  el.setConfig({ entity: "sensor.basket_landes_prochain_match_adversaire", ...configOverrides });
  el.hass = { locale: { language: "fr-FR" }, ...hassOverrides };
  document.body.appendChild(el);
  return el.updateComplete.then(() => el);
}

function schemaOf(el) {
  return el.shadowRoot.querySelector("ha-form").schema;
}

function fieldNames(el) {
  return schemaOf(el).map((f) => f.name);
}

// Reads the inner `schema` array of a top-level expandable group (e.g.
// "logo", "ranking") by its group name, so tests can assert on what's
// nested inside without hardcoding array indices.
function groupSchema(el, groupName) {
  const group = schemaOf(el).find((f) => f.name === groupName);
  return group ? group.schema : undefined;
}

describe("card-editor.js render()", () => {
  it("returns an empty template before hass/_config are set (no crash)", () => {
    const Editor = customElements.get("ffbb-tracker-card-editor");
    const el = new Editor();
    expect(() => el.render()).not.toThrow();
  });

  it("renders an <ha-form> once hass and _config are both set", async () => {
    const el = await mountEditor();
    expect(el.shadowRoot.querySelector("ha-form")).not.toBeNull();
  });

  it("passes the current config as ha-form's .data", async () => {
    const el = await mountEditor({ show_venue: false });
    const form = el.shadowRoot.querySelector("ha-form");
    expect(form.data).toBe(el._config);
    expect(form.data.show_venue).toBe(false);
  });
});

describe("card-editor.js schema -- base fields", () => {
  it("includes every top-level field exactly once, in a stable order (logo, ranking and standings_card are expandable groups)", async () => {
    const el = await mountEditor();
    expect(fieldNames(el)).toEqual([
      "entity",
      "show_title",
      "title",
      "icon",
      "show_header",
      "logo",
      "default_match_view",
      "custom_team_name",
      "accent_color",
      "ranking",
      "show_form",
      "show_venue",
      "standings_card",
    ]);
  });

  it("gives every top-level boolean show_* field default: true", async () => {
    const el = await mountEditor();
    const schema = schemaOf(el);
    const boolFields = ["show_title", "show_header", "show_form", "show_venue"];
    for (const name of boolFields) {
      const field = schema.find((f) => f.name === name);
      expect(field, `expected a "${name}" field in the schema`).toBeDefined();
      expect(field.default).toBe(true);
    }
  });

  it("tells the user the title is dynamic by default when left blank", async () => {
    const el = await mountEditor();
    const field = schemaOf(el).find((f) => f.name === "title");
    expect(field.helper).toBeTruthy();
    expect(field.helper.toLowerCase()).toContain("prochain match");
  });
});

describe("card-editor.js schema -- \"logo\" expandable section", () => {
  it("is an expandable group with a title and icon", async () => {
    const el = await mountEditor();
    const group = schemaOf(el).find((f) => f.name === "logo");
    expect(group.type).toBe("expandable");
    expect(group.title).toBe("Logos");
    expect(group.icon).toBeTruthy();
  });

  // Regression check: without flatten: true, ha-form reads/writes this
  // group's fields under a nested config.logo sub-object instead of the
  // flat config.logo_size / config.logo_click_action keys every other
  // part of the card reads -- so the fields would silently show no
  // selected value and editing them would have no visible effect at all.
  it("sets flatten: true so its fields stay flat top-level config keys", async () => {
    const el = await mountEditor();
    const group = schemaOf(el).find((f) => f.name === "logo");
    expect(group.flatten).toBe(true);
  });

  it("nests logo_size, logo_click_action, show_watermark, show_calendar_logos and show_standings_logos inside, and nothing else", async () => {
    const el = await mountEditor();
    const names = groupSchema(el, "logo").map((f) => f.name);
    expect(names).toEqual(["logo_size", "logo_click_action", "show_watermark", "show_calendar_logos", "show_standings_logos"]);
  });

  it("puts the two logo-visibility toggles last in the section, after show_watermark", async () => {
    const el = await mountEditor();
    const names = groupSchema(el, "logo").map((f) => f.name);
    expect(names.at(-1)).toBe("show_standings_logos");
    expect(names.at(-2)).toBe("show_calendar_logos");
    expect(names.at(-3)).toBe("show_watermark");
  });

  it("show_standings_logos is duplicated into the \"Standalone standings card\" section too, once that card is in use -- someone configuring display_mode: standings shouldn't have to go hunting in the Logo section for it", async () => {
    const matchOnly = await mountEditor({ display_mode: "match" });
    // Not shown at all while only the match card is in play -- nothing to
    // toggle it for yet, matches standings_title/standings_icon's own
    // conditional visibility right above it.
    expect(groupSchema(matchOnly, "standings_card").map((f) => f.name)).not.toContain("show_standings_logos");

    const withStandings = await mountEditor({ display_mode: "standings" });
    const names = groupSchema(withStandings, "standings_card").map((f) => f.name);
    expect(names).toContain("show_standings_logos");
    // Both fields read/write the exact same config key, so ha-form keeps
    // them in sync automatically -- no separate state to fall out of sync.
    expect(groupSchema(withStandings, "logo").map((f) => f.name)).toContain("show_standings_logos");
  });

  it("no longer lists show_watermark as a top-level field, and keeps its default: true", async () => {
    const el = await mountEditor();
    expect(schemaOf(el).some((f) => f.name === "show_watermark")).toBe(false);
    const field = groupSchema(el, "logo").find((f) => f.name === "show_watermark");
    expect(field.default).toBe(true);
    expect(field.selector).toEqual({ boolean: {} });
  });
});

describe("card-editor.js schema -- accent_color / custom_accent_color", () => {
  it("omits custom_accent_color when accent_color is \"default\"", async () => {
    const el = await mountEditor({ accent_color: "default" });
    expect(fieldNames(el)).not.toContain("custom_accent_color");
  });

  it("omits custom_accent_color when accent_color is \"theme\"", async () => {
    const el = await mountEditor({ accent_color: "theme" });
    expect(fieldNames(el)).not.toContain("custom_accent_color");
  });

  it("includes custom_accent_color, right after accent_color, when accent_color is \"custom\"", async () => {
    const el = await mountEditor({ accent_color: "custom" });
    const names = fieldNames(el);
    expect(names).toContain("custom_accent_color");
    expect(names.indexOf("custom_accent_color")).toBe(names.indexOf("accent_color") + 1);
  });
});

describe("card-editor.js schema -- \"ranking\" expandable section", () => {
  it("is an expandable group with a title and icon", async () => {
    const el = await mountEditor();
    const group = schemaOf(el).find((f) => f.name === "ranking");
    expect(group.type).toBe("expandable");
    expect(group.title).toBe("Classement");
    expect(group.icon).toBeTruthy();
  });

  // Regression check: without flatten: true, ha-form reads/writes this
  // group's fields under a nested config.ranking sub-object instead of the
  // flat config.show_rank / config.rank_badge_style keys _getRankClass()
  // and the render template actually read -- so toggling the checkbox or
  // changing the style dropdown would silently have no effect on the card.
  it("sets flatten: true so its fields stay flat top-level config keys", async () => {
    const el = await mountEditor();
    const group = schemaOf(el).find((f) => f.name === "ranking");
    expect(group.flatten).toBe(true);
  });

  // This section is only about the rank badges shown ON the match card
  // (podium colors, etc.) -- it must not be mixed with the separate
  // "standings_card" section below, which is about the second, standalone
  // card. Two different concepts, two different expandable groups.
  it("only ever contains show_rank, rank_badge_style and standings_popup_detailed -- never the standings-card fields", async () => {
    for (const overrides of [{}, { show_rank: false }, { display_mode: "both" }]) {
      const el = await mountEditor(overrides);
      const names = groupSchema(el, "ranking").map((f) => f.name);
      expect(names, JSON.stringify(overrides)).not.toContain("display_mode");
      expect(names, JSON.stringify(overrides)).not.toContain("standings_title");
      expect(names, JSON.stringify(overrides)).not.toContain("standings_icon");
    }
  });

  it("nests show_rank, rank_badge_style and standings_popup_detailed when show_rank is true (the default)", async () => {
    const el = await mountEditor();
    const names = groupSchema(el, "ranking").map((f) => f.name);
    expect(names).toEqual(["show_rank", "rank_badge_style", "standings_popup_detailed"]);
  });

  it("omits rank_badge_style and standings_popup_detailed (but keeps show_rank) when show_rank is false", async () => {
    const el = await mountEditor({ show_rank: false });
    const names = groupSchema(el, "ranking").map((f) => f.name);
    expect(names).toEqual(["show_rank"]);
  });

  it("gives show_rank default: true and rank_badge_style default: \"outline\"", async () => {
    const el = await mountEditor();
    const group = groupSchema(el, "ranking");
    expect(group.find((f) => f.name === "show_rank").default).toBe(true);
    expect(group.find((f) => f.name === "rank_badge_style").default).toBe("outline");
  });

  it("offers exactly the three none/outline/solid options for rank_badge_style", async () => {
    const el = await mountEditor();
    const field = groupSchema(el, "ranking").find((f) => f.name === "rank_badge_style");
    const values = field.selector.select.options.map((o) => o.value);
    expect(values).toEqual(["none", "outline", "solid"]);
  });

  // The popup opened from the rank badges normally shows the simple table
  // (#, team, Pts, J G P N). This toggle swaps it for the same detailed
  // table (all FFBB columns) used by the standalone standings card, for
  // people who never add that second card but still want the full detail.
  it("gives standings_popup_detailed a boolean selector defaulting to false", async () => {
    const el = await mountEditor();
    const field = groupSchema(el, "ranking").find((f) => f.name === "standings_popup_detailed");
    expect(field.default).toBe(false);
    expect(field.selector).toEqual({ boolean: {} });
  });
});

describe("card-editor.js schema -- \"standings_card\" expandable section", () => {
  it("is its own expandable group, separate from \"ranking\"", async () => {
    const el = await mountEditor();
    const group = schemaOf(el).find((f) => f.name === "standings_card");
    expect(group.type).toBe("expandable");
    expect(group.title).toBe("Carte classement indépendante");
    expect(group.icon).toBeTruthy();
    expect(group.flatten).toBe(true);
    expect(group.name).not.toBe("ranking");
  });

  it("sits last in the top-level schema, after show_form and show_venue", async () => {
    const el = await mountEditor();
    const names = fieldNames(el);
    expect(names[names.length - 1]).toBe("standings_card");
  });

  it("never contains show_rank or rank_badge_style -- those live in \"ranking\"", async () => {
    for (const display_mode of ["match", "standings", "both"]) {
      const el = await mountEditor({ display_mode });
      const names = groupSchema(el, "standings_card").map((f) => f.name);
      expect(names, display_mode).not.toContain("show_rank");
      expect(names, display_mode).not.toContain("rank_badge_style");
    }
  });

  it('gives display_mode default: "match" (opt-in, so existing cards are unchanged)', async () => {
    const el = await mountEditor();
    const field = groupSchema(el, "standings_card").find((f) => f.name === "display_mode");
    expect(field.default).toBe("match");
    const values = field.selector.select.options.map((o) => o.value);
    expect(values).toEqual(["match", "standings", "both"]);
  });

  it("hides standings_title and standings_icon when display_mode is \"match\" (the default)", async () => {
    const el = await mountEditor();
    const names = groupSchema(el, "standings_card").map((f) => f.name);
    expect(names).not.toContain("standings_title");
    expect(names).not.toContain("standings_icon");
  });

  it("shows standings_title and standings_icon once a standings card is requested", async () => {
    for (const display_mode of ["standings", "both"]) {
      const el = await mountEditor({ display_mode });
      const names = groupSchema(el, "standings_card").map((f) => f.name);
      expect(names, display_mode).toContain("standings_title");
      expect(names, display_mode).toContain("standings_icon");
      const iconField = groupSchema(el, "standings_card").find((f) => f.name === "standings_icon");
      expect(iconField.selector).toEqual({ icon: {} });
    }
  });
});


describe("card-editor.js _valueChanged()", () => {
  it("does nothing when _config is not set yet", () => {
    const Editor = customElements.get("ffbb-tracker-card-editor");
    const el = new Editor();
    el.hass = { locale: { language: "fr-FR" } };
    const listener = vi.fn();
    el.addEventListener("config-changed", listener);

    el._valueChanged({ detail: { value: { show_venue: false } } });

    expect(listener).not.toHaveBeenCalled();
  });

  it("does nothing when hass is not set yet", () => {
    const Editor = customElements.get("ffbb-tracker-card-editor");
    const el = new Editor();
    el.setConfig({ entity: "sensor.x" });
    const listener = vi.fn();
    el.addEventListener("config-changed", listener);

    el._valueChanged({ detail: { value: { show_venue: false } } });

    expect(listener).not.toHaveBeenCalled();
  });

  it("does nothing when the event carries no detail.value", async () => {
    const el = await mountEditor();
    const listener = vi.fn();
    el.addEventListener("config-changed", listener);

    el._valueChanged({});
    el._valueChanged({ detail: {} });

    expect(listener).not.toHaveBeenCalled();
  });

  it("dispatches config-changed with the config merged on top of the current one", async () => {
    const el = await mountEditor({ show_venue: true });
    let receivedConfig = null;
    el.addEventListener("config-changed", (ev) => {
      receivedConfig = ev.detail.config;
    });

    el._valueChanged({ detail: { value: { ...el._config, show_venue: false } } });

    expect(receivedConfig).not.toBeNull();
    expect(receivedConfig.show_venue).toBe(false);
    expect(receivedConfig.entity).toBe("sensor.basket_landes_prochain_match_adversaire");
  });

  it("defaults missing text fields (entity, custom_team_name, title, icon, custom_accent_color) to \"\"", async () => {
    const el = await mountEditor();
    let receivedConfig = null;
    el.addEventListener("config-changed", (ev) => {
      receivedConfig = ev.detail.config;
    });

    // Simulate ha-form reporting a value object that omits these fields
    // entirely (e.g. the user cleared a text input, which ha-form may
    // report by omitting the key rather than sending "").
    el._valueChanged({ detail: { value: { show_rank: true } } });

    expect(receivedConfig.entity).toBe("");
    expect(receivedConfig.custom_team_name).toBe("");
    expect(receivedConfig.title).toBe("");
    expect(receivedConfig.icon).toBe("");
    expect(receivedConfig.custom_accent_color).toBe("");
  });

  it("does not overwrite text fields that ARE present in the event value", async () => {
    const el = await mountEditor();
    let receivedConfig = null;
    el.addEventListener("config-changed", (ev) => {
      receivedConfig = ev.detail.config;
    });

    el._valueChanged({ detail: { value: { entity: "sensor.other_next_match", title: "Mon titre" } } });

    expect(receivedConfig.entity).toBe("sensor.other_next_match");
    expect(receivedConfig.title).toBe("Mon titre");
  });

  it("dispatches a bubbling, composed event so it crosses the shadow boundary", async () => {
    const el = await mountEditor();
    const listener = vi.fn();
    el.addEventListener("config-changed", listener);

    el._valueChanged({ detail: { value: { show_rank: true } } });

    expect(listener).toHaveBeenCalledTimes(1);
    const event = listener.mock.calls[0][0];
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(true);
  });
});

describe("targeted coverage: rare branches", () => {
  it("ha-form's computeLabel falls back to the schema's title when there is no label", async () => {
    const el = await mountEditor();
    const form = el.shadowRoot.querySelector("ha-form");
    expect(form.computeLabel({ label: "Explicit label", title: "Title" })).toBe("Explicit label");
    expect(form.computeLabel({ title: "Title only" })).toBe("Title only");
  });

  it("ha-form's computeHelper reads a field's helper text", async () => {
    const el = await mountEditor();
    const form = el.shadowRoot.querySelector("ha-form");
    expect(form.computeHelper({ helper: "Some helper text" })).toBe("Some helper text");
    expect(form.computeHelper({})).toBeUndefined();
  });

  it("willUpdate() re-resolves translations when hass changes to a new language", async () => {
    const el = await mountEditor();
    const before = el._t("editor.display_mode", "Display");

    el.hass = { ...el.hass, locale: { language: "en" } };
    await el.updateComplete;
    const after = el._t("editor.display_mode", "Display");

    // French and English labels for this field genuinely differ, so this
    // also proves willUpdate() picked up the new hass and re-resolved.
    expect(after).not.toBe(before);
  });

  it("willUpdate() is a no-op when hass is set but the language hasn't changed", async () => {
    const el = await mountEditor();
    const before = el._t("editor.display_mode", "Display");

    // Same language, just a new hass object reference -- must not crash or
    // change anything.
    el.hass = { ...el.hass };
    await el.updateComplete;

    expect(el._t("editor.display_mode", "Display")).toBe(before);
  });

  it("willUpdate() skips the hass/language check entirely on an update that doesn't touch hass", async () => {
    const el = await mountEditor();
    const before = el._t("editor.display_mode", "Display");

    // setConfig() alone (no hass reassignment) still triggers an update via
    // _config, but changedProperties.has("hass") must be false for that
    // update -- confirms the outer guard, not just the inner language check.
    el.setConfig({ entity: "sensor.basket_landes_prochain_match_adversaire", logo_size: "large" });
    await el.updateComplete;

    expect(el._t("editor.display_mode", "Display")).toBe(before);
    expect(el._config.logo_size).toBe("large");
  });

  it("_customColorHelper() falls back cleanly when called before setConfig() (no _config yet)", () => {
    const Editor = customElements.get("ffbb-tracker-card-editor");
    const el = new Editor();
    // this._config is undefined here -- exercises the `?? ""` fallback in
    // `this._config?.custom_accent_color ?? ""`, never hit once setConfig()
    // has run since DEFAULT_CONFIG always provides that key.
    expect(() => el._customColorHelper()).not.toThrow();
    expect(el._customColorHelper()).not.toContain("⚠");
  });

  it("the accent_color helper only warns about an invalid custom color, not a valid or empty one", async () => {
    // happy-dom's CSS.supports() is too lenient to reject "bleu" on its
    // own, so use the same regex-fallback path pure.test.js relies on by
    // temporarily removing the CSS engine.
    const realCSS = globalThis.CSS;
    vi.stubGlobal("CSS", undefined);
    const invalid = await mountEditor({ accent_color: "custom", custom_accent_color: "bleu" });
    vi.stubGlobal("CSS", realCSS);

    const valid = await mountEditor({ accent_color: "custom", custom_accent_color: "#ff6b00" });
    const empty = await mountEditor({ accent_color: "custom", custom_accent_color: "" });

    const helperOf = (el) => fieldNames(el).includes("custom_accent_color")
      ? schemaOf(el).find((f) => f.name === "custom_accent_color").helper
      : undefined;
    expect(helperOf(invalid)).toContain("⚠");
    expect(helperOf(valid)).not.toContain("⚠");
    expect(helperOf(empty)).not.toContain("⚠");
  });
});
