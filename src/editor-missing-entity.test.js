// @vitest-environment happy-dom
//
// Home Assistant doesn't update the entity ids written in dashboards when an
// entity is renamed. The editor's picker then just says "Unknown entity", while
// the card keeps working -- on the strength of a guess from the old name, which
// stops working the day the name no longer gives anything away. The editor now
// says so under the entity field, and suggests the entity to pick instead.
import { afterEach, describe, expect, it } from "vitest";
import "./card-editor.js";

const TEAM = "sensor.ujsbp_u13m_";
const state = (entityId) => [entityId, { entity_id: entityId, state: "x", attributes: {} }];
const statesOf = (...ids) => Object.fromEntries(ids.map(state));

// The team's entities, as they exist now (the date was renamed back).
const TEAM_STATES = statesOf(
  `${TEAM}poule`,
  `${TEAM}prochain_match_date`,
  `${TEAM}prochain_match_adversaire`,
  `${TEAM}classement`,
  "binary_sensor.ujsbp_u13m_match_en_cours",
  "sensor.something_unrelated",
);
const RENAMED = `${TEAM}prochain_match_date_ok`; // what the card was configured on

// `states` is only defaulted when the option is absent: passing undefined
// explicitly means "Home Assistant has not provided any states".
async function mount(options) {
  const { entity, entities, language = "en-US" } = options;
  const states = "states" in options ? options.states : TEAM_STATES;
  const Editor = customElements.get("ffbb-tracker-card-editor");
  const el = new Editor();
  el.setConfig({ entity });
  el.hass = { states, entities, locale: { language } };
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}
const entityField = (el) => el.shadowRoot.querySelector("ha-form").schema.find((f) => f.name === "entity");
const helperOf = (el) => entityField(el).helper;

afterEach(() => {
  document.body.innerHTML = "";
});

describe("the entity field's helper text", () => {
  it("is the plain helper while the configured entity exists", async () => {
    const el = await mount({ entity: `${TEAM}prochain_match_date` });

    expect(helperOf(el)).toBe("Select any sensor belonging to the team");
  });

  it("warns, naming the entity, once it no longer exists", async () => {
    const el = await mount({ entity: RENAMED });

    expect(helperOf(el)).toContain("⚠");
    expect(helperOf(el)).toContain(RENAMED);
    expect(helperOf(el)).toContain("select it again");
  });

  it("speaks French when Home Assistant does", async () => {
    const el = await mount({ entity: RENAMED, language: "fr-FR" });

    expect(helperOf(el)).toContain("n'existe plus");
    expect(helperOf(el)).toContain("Suggestion :");
  });

  it("suggests the team's pool sensor", async () => {
    const el = await mount({ entity: RENAMED });

    expect(helperOf(el)).toContain(`Suggestion: ${TEAM}poule`);
  });

  it("suggests the next match date when there is no pool sensor", async () => {
    const states = statesOf(`${TEAM}prochain_match_date`, `${TEAM}classement`);

    const el = await mount({ entity: RENAMED.replace("_date_ok", "_adversaire_ok"), states });

    expect(helperOf(el)).toContain(`Suggestion: ${TEAM}prochain_match_date`);
  });

  it("only suggests sensors, like the picker's own filter", async () => {
    const states = statesOf("binary_sensor.ujsbp_u13m_match_en_cours");

    const el = await mount({ entity: RENAMED, states: { ...states, ...statesOf("sensor.other_thing") } });

    expect(helperOf(el)).toContain("⚠");
    expect(helperOf(el)).not.toContain("Suggestion");
  });

  it("still warns, without a suggestion, when nothing of the team can be found", async () => {
    const el = await mount({ entity: "sensor.mon_match_perso_ok", states: statesOf("sensor.something_unrelated") });

    expect(helperOf(el)).toContain("⚠");
    expect(helperOf(el)).toContain("sensor.mon_match_perso_ok");
    expect(helperOf(el)).not.toContain("Suggestion");
  });

  it("suggests nothing it cannot name (a state without an entity_id)", async () => {
    const states = { [`${TEAM}poule`]: { state: "x", attributes: {} } };

    const el = await mount({ entity: RENAMED, states });

    expect(helperOf(el)).not.toContain("Suggestion");
  });

  it("goes back to the plain helper once the entity exists again (renamed back)", async () => {
    const el = await mount({ entity: RENAMED });
    expect(helperOf(el)).toContain("⚠");

    el.setConfig({ entity: `${TEAM}prochain_match_date` });
    await el.updateComplete;

    expect(helperOf(el)).toBe("Select any sensor belonging to the team");
  });

  it("does not warn when no entity is configured yet (a new card)", async () => {
    const el = await mount({ entity: "" });

    expect(helperOf(el)).toBe("Select any sensor belonging to the team");
  });

  it.each([
    ["undefined", undefined],
    ["empty (not loaded yet)", {}],
  ])("does not judge while the states are %s", async (_label, states) => {
    const el = await mount({ entity: RENAMED, states });

    expect(helperOf(el)).not.toContain("⚠");
  });

  it("does not mistake an object property for an existing entity", async () => {
    const el = await mount({ entity: "constructor" });

    expect(helperOf(el)).toContain("⚠");
  });

  it("does not warn about a whole-text entity that exists, whatever its name", async () => {
    const states = { ...TEAM_STATES, ...statesOf("sensor.mon_match_perso") };

    const el = await mount({ entity: "sensor.mon_match_perso", states });

    expect(helperOf(el)).not.toContain("⚠");
  });

  it("can be called before a config exists", () => {
    const Editor = customElements.get("ffbb-tracker-card-editor");
    const el = new Editor();

    expect(() => el._entityHelper()).not.toThrow();
    expect(el._entityHelper()).not.toContain("⚠");
  });
});
