// @vitest-environment happy-dom
//
// The card finds every entity of a team from the one the user picked. It used
// to do that by guessing entity_ids (French and English slugs after a shared
// prefix), which broke as soon as an entity was renamed -- something the
// integration now carries through a team switch -- and whenever a team or
// competition name contained a word such as "poule", "rank" or "form".
// resolveEntities() now asks the entity registry first (every entity of the
// same device, recognised by the translation key the integration gives it) and
// only then falls back to the names, which it also splits more carefully.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  BINARY_SENSOR_SUFFIXES,
  CARD_KEY_BY_TRANSLATION_KEY,
  INTEGRATION_PLATFORM,
  SENSOR_SUFFIXES,
  TRANSLATION_KEYS,
} from "./entity-names.js";
import { resolveEntities } from "./pure.js";
import "./ha-ffbb-tracker-card.js";

// The `_attr_translation_key` of every entity of the integration (sensor.py and
// binary_sensor.py in ha-ffbb-tracker). The card must only ever expect keys
// that exist there: a typo here would silently never match in a real instance.
const INTEGRATION_TRANSLATION_KEYS = [
  "next_match_date", "next_match_opponent", "next_match_venue_type", "next_match_location",
  "last_match_date", "last_match_opponent", "last_match_result", "last_match_score",
  "rank", "rank_evolution", "poule", "form", "game_day", "match_in_progress",
];
const CARD_KEYS = Object.keys(TRANSLATION_KEYS);

const entityState = (state) => ({ state, attributes: {} });

/**
 * One team: its entities (card key -> entity_id, whatever the ids are), the
 * matching `states` and the registry entries the integration would create.
 */
function team(ids, deviceId = "device_1") {
  const states = {};
  const registry = {};
  for (const [key, entityId] of Object.entries(ids)) {
    states[entityId] = entityState(key);
    registry[entityId] = {
      entity_id: entityId,
      device_id: deviceId,
      platform: INTEGRATION_PLATFORM,
      translation_key: TRANSLATION_KEYS[key],
    };
  }
  return { states, registry };
}
const sensorOrBinary = (key) => (key === "matchInProgress" ? "binary_sensor" : "sensor");
/** Entity ids that follow no naming convention at all. */
const unrelatedIds = (tag = "x") =>
  Object.fromEntries(CARD_KEYS.map((key, n) => [key, `${sensorOrBinary(key)}.${tag}_${n}`]));
/** Entity ids as Home Assistant generates them under a given prefix. */
const conventionalIds = (prefix) =>
  Object.fromEntries([
    ...Object.entries(SENSOR_SUFFIXES).map(([key, slugs]) => [key, `sensor.${prefix}_${slugs[0]}`]),
    ...Object.entries(BINARY_SENSOR_SUFFIXES).map(([key, slugs]) => [key, `binary_sensor.${prefix}_${slugs[0]}`]),
  ]);
const stateOf = (resolved, key) => resolved[key]?.state;
const resolvedKeys = (resolved) => Object.entries(resolved).filter(([, v]) => v).map(([k]) => k).sort();

// ---------------------------------------------------------------------------
describe("the translation key table", () => {
  it("has one entry per entity the card uses", () => {
    expect(CARD_KEYS.sort()).toEqual([...Object.keys(SENSOR_SUFFIXES), ...Object.keys(BINARY_SENSOR_SUFFIXES)].sort());
    expect(TRANSLATION_KEYS.nextOpponent).toBe("next_match_opponent");
    expect(TRANSLATION_KEYS.poule).toBe("poule");
    expect(TRANSLATION_KEYS.matchInProgress).toBe("match_in_progress");
  });

  it("only holds translation keys the integration really defines", () => {
    for (const translationKey of Object.values(TRANSLATION_KEYS)) {
      expect(INTEGRATION_TRANSLATION_KEYS).toContain(translationKey);
    }
  });

  it("is reversible one to one", () => {
    expect(CARD_KEY_BY_TRANSLATION_KEY.size).toBe(CARD_KEYS.length);
    for (const [key, translationKey] of Object.entries(TRANSLATION_KEYS)) {
      expect(CARD_KEY_BY_TRANSLATION_KEY.get(translationKey)).toBe(key);
    }
  });

  it("does not answer for object properties", () => {
    expect(CARD_KEY_BY_TRANSLATION_KEY.get("constructor")).toBeUndefined();
    expect(CARD_KEY_BY_TRANSLATION_KEY.get("__proto__")).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
describe("resolveEntities() through the entity registry", () => {
  it("finds every entity whatever the entities are called", () => {
    const ids = unrelatedIds();
    const { states, registry } = team(ids);

    const resolved = resolveEntities(ids.nextOpponent, states, registry);

    expect(resolvedKeys(resolved)).toEqual(CARD_KEYS.sort());
    for (const key of CARD_KEYS) {
      expect(stateOf(resolved, key), key).toBe(key); // the right entity under each key
    }
  });

  it("works when the card is configured on a renamed entity (it found nothing before)", () => {
    const ids = { ...conventionalIds("ujsbp_u13m"), nextDate: "sensor.mon_prochain_match_perso" };
    const { states, registry } = team(ids);

    expect(resolvedKeys(resolveEntities("sensor.mon_prochain_match_perso", states))).not.toContain("poule");
    const resolved = resolveEntities("sensor.mon_prochain_match_perso", states, registry);

    expect(resolvedKeys(resolved)).toEqual(CARD_KEYS.sort());
  });

  it("keeps a team's entities apart from another team's", () => {
    const a = team(unrelatedIds("a"), "device_a");
    const b = team(unrelatedIds("b"), "device_b");
    const states = { ...a.states, ...b.states };
    const registry = { ...a.registry, ...b.registry };

    const resolved = resolveEntities("sensor.a_1", states, registry);

    for (const key of CARD_KEYS) {
      expect(resolved[key]).toBe(a.states[unrelatedIds("a")[key]]);
    }
  });

  it("ignores another integration's entities that share the device", () => {
    const ids = unrelatedIds();
    const { states, registry } = team(ids);
    states["sensor.intruder"] = entityState("not ours");
    registry["sensor.intruder"] = { device_id: "device_1", platform: "other_integration", translation_key: "rank" };

    const resolved = resolveEntities(ids.rank, states, registry);

    expect(stateOf(resolved, "rank")).toBe("rank");
  });

  it("does not trust the registry for an entity of another integration", () => {
    // The user picked something that isn't ours: don't bind that integration's
    // device to the card through the registry. The ids follow no convention, so
    // by name nothing is found: any result at all would have come from the
    // registry.
    const ids = unrelatedIds();
    const { states, registry } = team(ids);
    registry[ids.rank].platform = "other_integration";

    expect(resolvedKeys(resolveEntities(ids.rank, states, registry))).toEqual([]);
  });

  it("prefers the registry over a conflicting name", () => {
    const ids = conventionalIds("team");
    const { states, registry } = team(ids);
    const real = "sensor.some_other_name";
    states[real] = entityState("the real next date");
    registry[real] = { device_id: "device_1", platform: INTEGRATION_PLATFORM, translation_key: "next_match_date" };
    registry[ids.nextDate].translation_key = "something_else"; // the name-matching entity isn't the next date

    const resolved = resolveEntities(ids.nextOpponent, states, registry);

    expect(stateOf(resolved, "nextDate")).toBe("the real next date");
  });

  it("fills in by name what the registry doesn't know about", () => {
    const ids = conventionalIds("team");
    const { states, registry } = team(ids);
    for (const entityId of Object.keys(registry)) {
      if (entityId !== ids.nextDate) {
        delete registry[entityId].translation_key; // only the next date is known to the registry
      }
    }
    registry[ids.nextDate] = { ...registry[ids.nextDate], device_id: "device_1" };
    registry[ids.nextOpponent] = { device_id: "device_1", platform: INTEGRATION_PLATFORM };

    const resolved = resolveEntities(ids.nextOpponent, states, registry);

    expect(resolvedKeys(resolved)).toEqual(CARD_KEYS.sort());
  });

  it("skips a registry entity that has no state yet, without failing", () => {
    const ids = unrelatedIds();
    const { states, registry } = team(ids);
    delete states[ids.rank];

    const resolved = resolveEntities(ids.nextOpponent, states, registry);

    expect(resolved.rank).toBeNull();
    expect(resolvedKeys(resolved)).toHaveLength(CARD_KEYS.length - 1);
  });

  it("ignores translation keys that are object properties", () => {
    const ids = unrelatedIds();
    const { states, registry } = team(ids);
    for (const [n, name] of ["constructor", "__proto__", "toString"].entries()) {
      states[`sensor.bad_${n}`] = entityState("bad");
      registry[`sensor.bad_${n}`] = { device_id: "device_1", platform: INTEGRATION_PLATFORM, translation_key: name };
    }

    expect(resolvedKeys(resolveEntities(ids.nextOpponent, states, registry))).toEqual(CARD_KEYS.sort());
  });

  it("copes with a registry holding junk entries", () => {
    const ids = unrelatedIds();
    const { states, registry } = team(ids);
    Object.assign(registry, { "sensor.null": null, "sensor.number": 3, "sensor.empty": {} });

    expect(resolvedKeys(resolveEntities(ids.nextOpponent, states, registry))).toEqual(CARD_KEYS.sort());
  });

  it("does not modify the states or the registry", () => {
    const ids = unrelatedIds();
    const { states, registry } = team(ids);
    const before = JSON.stringify([states, registry]);

    resolveEntities(ids.nextOpponent, states, registry);

    expect(JSON.stringify([states, registry])).toBe(before);
  });
});

// ---------------------------------------------------------------------------
describe("resolveEntities() without a usable registry behaves as before", () => {
  const ids = conventionalIds("ujsbp_u13m");
  const { states, registry } = team(ids);
  const byName = resolveEntities(ids.nextOpponent, states);

  it.each([
    ["no registry", undefined],
    ["a null registry", null],
    ["an empty registry", {}],
  ])("%s", (_label, value) => {
    expect(resolveEntities(ids.nextOpponent, states, value)).toEqual(byName);
    expect(resolvedKeys(byName)).toEqual(CARD_KEYS.sort());
  });

  it("an entity the registry doesn't list", () => {
    const partial = { ...registry };
    delete partial[ids.nextOpponent];

    expect(resolveEntities(ids.nextOpponent, states, partial)).toEqual(byName);
  });

  it("an entity that isn't on a device", () => {
    const noDevice = { ...registry, [ids.nextOpponent]: { platform: INTEGRATION_PLATFORM, translation_key: "next_match_opponent" } };

    expect(resolveEntities(ids.nextOpponent, states, noDevice)).toEqual(byName);
  });

  it("still returns null without a selected entity or states", () => {
    expect(resolveEntities(null, states, registry)).toBeNull();
    expect(resolveEntities(ids.nextOpponent, null, registry)).toBeNull();
  });
});

// ---------------------------------------------------------------------------
describe("resolveEntities() by name: prefixes containing a word that starts an entity name", () => {
  // The prefix is "<team>_<competition>" (the device name), which can contain
  // "poule", "rank" or "form". Splitting at the first such word found nothing.
  it.each([
    "ujsbp_u13m",
    "us_dax_poule_haute",
    "top_rank_u13m",
    "basket_form_u13m",
    "regionale_poule_a_u15m",
    "union_next_match_club_prochain_match_x",
  ])("%s", (prefix) => {
    const { states } = team(conventionalIds(prefix));

    const resolved = resolveEntities(`sensor.${prefix}_prochain_match_adversaire`, states);

    expect(resolvedKeys(resolved)).toEqual(CARD_KEYS.sort());
  });

  it("works with the English entity names too, whichever entity is configured", () => {
    // The real English entity names (the second slug of each list), not the
    // translation keys, which differ for the pool, the form and the venue.
    const english = (key) => (SENSOR_SUFFIXES[key] ?? BINARY_SENSOR_SUFFIXES[key])[1];
    const ids = Object.fromEntries(
      CARD_KEYS.map((key) => [key, `${sensorOrBinary(key)}.top_rank_u13m_${english(key)}`]),
    );
    const { states } = team(ids);

    for (const key of ["nextOpponent", "rank", "form"]) {
      expect(resolvedKeys(resolveEntities(ids[key], states)), key).toEqual(CARD_KEYS.sort());
    }
  });

  it("finds a lone entity at its real split, not at an earlier word", () => {
    const only = "sensor.top_rank_u13m_prochain_match_adversaire";

    const resolved = resolveEntities(only, { [only]: entityState("alone") });

    expect(stateOf(resolved, "nextOpponent")).toBe("alone");
  });

  it("answers with nothing found, not an error, when no split finds anything", () => {
    const resolved = resolveEntities("sensor.top_rank_u13m_poule_next_match_x", {});

    expect(resolvedKeys(resolved)).toEqual([]);
    expect(Object.keys(resolved)).toHaveLength(CARD_KEYS.length);
  });

  it("falls back to 'the last word is the entity name' when it knows none", () => {
    const states = { "sensor.team_foo": entityState("x"), "sensor.team_classement": entityState("3") };

    expect(stateOf(resolveEntities("sensor.team_foo", states), "rank")).toBe("3");
  });

  it("accepts a binary sensor as the configured entity", () => {
    const ids = conventionalIds("team");
    const { states } = team(ids);

    expect(stateOf(resolveEntities(ids.matchInProgress, states), "nextOpponent")).toBe("nextOpponent");
  });
});

// ---------------------------------------------------------------------------
describe("the rendered card", () => {
  const CONFIGURED = "sensor.mon_prochain_match_perso";
  const ids = {
    ...unrelatedIds("renamed"),
    nextDate: CONFIGURED,
    poule: "sensor.ma_poule_custom",
    nextOpponent: "sensor.adversaire_custom",
  };
  const { states, registry } = team(ids);
  states[ids.nextDate] = { state: "2026-10-10T11:30:00+00:00", attributes: { round: "3", match_number: "11549" } };
  states[ids.nextOpponent] = { state: "BISCARROSSE OLYMPIQUE BASKET - 1", attributes: { is_home: false } };
  states[ids.poule] = { state: "D2 Poule B", attributes: { team: "UNION JEUN SP BUGLOSE PONTONX", calendar: [] } };
  states[ids.lastScore] = entityState("unknown");
  states[ids.matchInProgress] = entityState("off");

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"], now: new Date("2026-10-02T12:00:00+00:00") });
  });
  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = "";
  });

  async function mount(hass) {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: CONFIGURED });
    el.hass = { states, locale: { language: "fr-FR" }, ...hass };
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  it("shows the team when every entity was renamed, once the registry is available", async () => {
    const el = await mount({ entities: registry });

    expect(el.shadowRoot.textContent).toContain("BISCARROSSE");
    expect(el.shadowRoot.textContent).toContain("UNION JEUN SP BUGLOSE PONTONX");
  });

  it("cannot find the team by names alone, as before (the registry is what changed)", async () => {
    const el = await mount({});

    expect(el.shadowRoot.textContent).not.toContain("BISCARROSSE");
  });
});
