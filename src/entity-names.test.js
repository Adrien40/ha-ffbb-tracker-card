import { describe, it, expect } from "vitest";
import {
  SENSOR_SUFFIXES,
  BINARY_SENSOR_SUFFIXES,
  ENTITY_ROOTS,
  ENTITY_ID_PATTERN,
} from "./entity-names.js";
import { resolveEntities } from "./pure.js";

describe("entity-names: the tables stay consistent with each other", () => {
  const allSuffixes = [
    ...Object.values(SENSOR_SUFFIXES).flat(),
    ...Object.values(BINARY_SENSOR_SUFFIXES).flat(),
  ];

  it("every suffix starts with one of the ENTITY_ROOTS (otherwise the prefix can't be derived from it)", () => {
    for (const suffix of allSuffixes) {
      const covered = ENTITY_ROOTS.some((root) => suffix === root || suffix.startsWith(`${root}_`));
      expect(covered, `${suffix} is not covered by ENTITY_ROOTS`).toBe(true);
    }
  });

  it("every ENTITY_ROOT is the start of at least one known suffix (no dead root)", () => {
    // game_day is accepted as an entry point even though no sensor uses it.
    const tolerated = new Set(["game_day", "jour_de_match"]);
    for (const root of ENTITY_ROOTS) {
      if (tolerated.has(root)) continue;
      const used = allSuffixes.some((suffix) => suffix === root || suffix.startsWith(`${root}_`));
      expect(used, `${root} matches no suffix`).toBe(true);
    }
  });

  it("lists French then English for every sensor that exists in both languages", () => {
    for (const [key, suffixes] of Object.entries(SENSOR_SUFFIXES)) {
      if (key === "poule") {
        expect(suffixes).toEqual(["poule"]);
        continue;
      }
      expect(suffixes, key).toHaveLength(2);
      expect(suffixes[0]).not.toBe(suffixes[1]);
    }
  });

  it("has no duplicate suffix across sensors", () => {
    expect(new Set(allSuffixes).size).toBe(allSuffixes.length);
  });

  it("only uses lowercase letters, digits and underscores (valid entity_id fragments)", () => {
    for (const suffix of allSuffixes) {
      expect(suffix).toMatch(/^[a-z0-9_]+$/);
    }
  });
});

describe("ENTITY_ID_PATTERN", () => {
  it.each(ENTITY_ROOTS)("splits '%s' into <domain>, <shared prefix> and <root>", (root) => {
    const m = `sensor.ujsbp_u13m_${root}_something`.match(ENTITY_ID_PATTERN);
    expect(m).not.toBeNull();
    expect(m[1]).toBe("sensor");
    expect(m[2]).toBe("ujsbp_u13m");
    expect(m[3]).toBe(root);
  });

  it("accepts binary_sensor as a domain", () => {
    const m = "binary_sensor.basket_landes_match_en_cours".match(ENTITY_ID_PATTERN);
    expect(m[1]).toBe("binary_sensor");
    expect(m[2]).toBe("basket_landes");
  });

  it("does not match another domain or an unknown entity", () => {
    expect("light.basket_landes_prochain_match".match(ENTITY_ID_PATTERN)).toBeNull();
    expect("sensor.basket_landes_temperature".match(ENTITY_ID_PATTERN)).toBeNull();
  });

  it("keeps a multi-word team prefix intact", () => {
    const m = "sensor.union_jeun_sp_buglose_pontonx_prochain_match_date".match(ENTITY_ID_PATTERN);
    expect(m[2]).toBe("union_jeun_sp_buglose_pontonx");
  });
});

describe("resolveEntities driven by entity-names.js", () => {
  const stateFor = (id) => ({ state: id });

  it("finds every French sensor from any one of them", () => {
    const prefix = "ujsbp_u13m";
    const states = {};
    for (const suffixes of Object.values(SENSOR_SUFFIXES)) {
      states[`sensor.${prefix}_${suffixes[0]}`] = stateFor(suffixes[0]);
    }
    for (const suffixes of Object.values(BINARY_SENSOR_SUFFIXES)) {
      states[`binary_sensor.${prefix}_${suffixes[0]}`] = stateFor(suffixes[0]);
    }
    for (const entry of ["sensor.ujsbp_u13m_classement", "sensor.ujsbp_u13m_poule", "binary_sensor.ujsbp_u13m_match_en_cours"]) {
      const entities = resolveEntities(entry, states);
      for (const [key, suffixes] of [...Object.entries(SENSOR_SUFFIXES), ...Object.entries(BINARY_SENSOR_SUFFIXES)]) {
        expect(entities[key]?.state, `${key} from ${entry}`).toBe(suffixes[0]);
      }
    }
  });

  it("finds every English sensor from any one of them", () => {
    const prefix = "my_team";
    const states = {};
    for (const suffixes of Object.values(SENSOR_SUFFIXES)) {
      const s = suffixes[suffixes.length - 1];
      states[`sensor.${prefix}_${s}`] = stateFor(s);
    }
    for (const suffixes of Object.values(BINARY_SENSOR_SUFFIXES)) {
      const s = suffixes[suffixes.length - 1];
      states[`binary_sensor.${prefix}_${s}`] = stateFor(s);
    }
    const entities = resolveEntities("sensor.my_team_next_match_opponent", states);
    for (const [key, suffixes] of [...Object.entries(SENSOR_SUFFIXES), ...Object.entries(BINARY_SENSOR_SUFFIXES)]) {
      expect(entities[key]?.state, key).toBe(suffixes[suffixes.length - 1]);
    }
  });

  it("returns null for a sensor that does not exist rather than throwing", () => {
    const entities = resolveEntities("sensor.ghost_prochain_match_adversaire", {});
    expect(entities.nextOpponent).toBeNull();
    expect(entities.matchInProgress).toBeNull();
  });

  it("prefers the French entity when both languages exist for the same team", () => {
    const states = {
      "sensor.t_prochain_match_adversaire": { state: "FR" },
      "sensor.t_next_match_opponent": { state: "EN" },
    };
    expect(resolveEntities("sensor.t_prochain_match_adversaire", states).nextOpponent.state).toBe("FR");
  });

  it("returns null when nothing is selected or there are no states", () => {
    expect(resolveEntities("", {})).toBeNull();
    expect(resolveEntities("sensor.x_prochain_match", null)).toBeNull();
  });
});
