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
  it("includes every top-level field exactly once, in a stable order (logo and ranking are expandable groups)", async () => {
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

  it("nests logo_size, logo_click_action and show_watermark inside, and nothing else", async () => {
    const el = await mountEditor();
    const names = groupSchema(el, "logo").map((f) => f.name);
    expect(names).toEqual(["logo_size", "logo_click_action", "show_watermark"]);
  });

  it("puts the transparent background logos toggle (show_watermark) last in the section", async () => {
    const el = await mountEditor();
    const names = groupSchema(el, "logo").map((f) => f.name);
    expect(names.at(-1)).toBe("show_watermark");
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

  it("nests show_rank and rank_badge_style when show_rank is true (the default)", async () => {
    const el = await mountEditor();
    const names = groupSchema(el, "ranking").map((f) => f.name);
    expect(names).toEqual(["show_rank", "rank_badge_style"]);
  });

  it("omits rank_badge_style (but keeps show_rank) when show_rank is false", async () => {
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
