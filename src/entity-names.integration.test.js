// The card finds a team's entities by their entity_ids (as a fallback to the
// entity registry), so the slugs it guesses must be what Home Assistant really
// generates from the integration's entity names. They were checked against
// nothing: the English guesses for the pool ("poule" instead of "pool"), the
// recent form ("form" instead of "recent_form") and the venue ("..._venue_type"
// instead of "..._venue") were wrong, and no test used a real English name.
// The names live in integration-entity-names.fixture.js.
import { describe, expect, it } from "vitest";
import {
  BINARY_SENSOR_SUFFIXES,
  ENTITY_ROOTS,
  SENSOR_SUFFIXES,
  TRANSLATION_KEYS,
} from "./entity-names.js";
import { INTEGRATION_ENTITIES, slugify } from "./integration-entity-names.fixture.js";
import { resolveEntities } from "./pure.js";

const USED = INTEGRATION_ENTITIES.filter((entity) => entity.cardKey);
const suffixesOf = (cardKey) => SENSOR_SUFFIXES[cardKey] ?? BINARY_SENSOR_SUFFIXES[cardKey];
const CARD_KEYS = Object.keys(TRANSLATION_KEYS);

describe("the slugs the card guesses are the ones the integration's names produce", () => {
  it.each(USED.map((entity) => [entity.cardKey, entity]))("%s: French", (_key, entity) => {
    expect(suffixesOf(entity.cardKey)).toContain(slugify(entity.fr));
  });

  it.each(USED.map((entity) => [entity.cardKey, entity]))("%s: English", (_key, entity) => {
    expect(suffixesOf(entity.cardKey)).toContain(slugify(entity.en));
  });

  it("lists the French slug first, then the English one", () => {
    for (const { cardKey, fr, en } of USED) {
      expect(suffixesOf(cardKey).slice(0, 2), cardKey).toEqual([slugify(fr), slugify(en)]);
    }
  });

  it("knows a root for every entity name, so the prefix can be derived from any of them", () => {
    for (const { fr, en } of INTEGRATION_ENTITIES) {
      for (const slug of [slugify(fr), slugify(en)]) {
        const covered = ENTITY_ROOTS.some((root) => slug === root || slug.startsWith(`${root}_`));
        expect(covered, `${slug} is not covered by ENTITY_ROOTS`).toBe(true);
      }
    }
  });
});

describe("the translation key table matches the integration's", () => {
  it.each(USED.map((entity) => [entity.cardKey, entity]))("%s", (_key, entity) => {
    expect(TRANSLATION_KEYS[entity.cardKey]).toBe(entity.translationKey);
  });

  it("has an entry for exactly the entities the card uses", () => {
    expect(CARD_KEYS.sort()).toEqual(USED.map((entity) => entity.cardKey).sort());
  });
});

describe.each([
  ["French", "fr"],
  ["English", "en"],
])("a team whose entities were created in %s", (_label, language) => {
  const prefix = "ujsbp_u13m";
  const idOf = (entity) => `${entity.domain}.${prefix}_${slugify(entity[language])}`;
  const states = Object.fromEntries(INTEGRATION_ENTITIES.map((entity) => [idOf(entity), { state: entity.translationKey }]));

  it.each(INTEGRATION_ENTITIES.map((entity) => [entity.translationKey, entity]))(
    "is fully resolved by name from %s",
    (_key, entity) => {
      const resolved = resolveEntities(idOf(entity), states);

      for (const { cardKey, translationKey } of USED) {
        expect(resolved[cardKey]?.state, `${cardKey} from ${idOf(entity)}`).toBe(translationKey);
      }
    },
  );
});
