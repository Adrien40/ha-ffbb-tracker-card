// Entity-id suffixes created by the FFBB Tracker integration.
//
// Home Assistant builds an entity_id from the entity's *name*, and the
// integration names its entities in the language Home Assistant runs in. The
// same sensor is therefore `..._prochain_match_adversaire` on a French install
// and `..._next_match_opponent` on an English one. The card has to find both,
// so every entity lists its French slug first and its English slug second.
//
// This is not UI text (that lives in translations/fr.json and en.json): these
// are identifiers dictated by the integration. To support another language,
// add its slug to the relevant lists here, and to ENTITY_ROOTS below.
//
// Each list is: the French slug, then the English slug, then (for a few) older
// guesses kept in case an install has them. A slug is the integration's entity
// *name* run through Home Assistant's slugify -- "Pool" gives "pool", "Recent
// form" gives "recent_form" -- NOT its translation key, which is a different
// thing (see TRANSLATION_KEYS below). The two coincide for most entities, which
// is how the English guesses for the pool, the recent form and the venue were
// once wrong. src/entity-names.integration.test.js checks every slug here
// against the integration's real names.

// Suffixes appended to the shared prefix, e.g. `sensor.ujsbp_u13m_` + suffix.
export const SENSOR_SUFFIXES = {
  nextOpponent: ["prochain_match_adversaire", "next_match_opponent"],
  nextDate: ["prochain_match_date", "next_match_date"],
  nextLocation: ["prochain_match_lieu", "next_match_location"],
  nextVenue: ["prochain_match_terrain", "next_match_venue", "next_match_venue_type"],
  lastScore: ["dernier_match_score", "last_match_score"],
  lastOpponent: ["dernier_match_adversaire", "last_match_opponent"],
  lastResult: ["dernier_match_resultat", "last_match_result"],
  lastDate: ["dernier_match_date", "last_match_date"],
  poule: ["poule", "pool"],
  rank: ["classement", "rank"],
  rankEvolution: ["classement_evolution", "rank_evolution"],
  form: ["forme_recente", "recent_form", "form"],
};

// Same idea for the binary_sensor domain.
export const BINARY_SENSOR_SUFFIXES = {
  matchInProgress: ["match_en_cours", "match_in_progress"],
};

// First words of an entity name, used to split a configured entity_id into
// `<shared prefix>` + `<entity name>`. Order matters: it is the alternation
// order of the regex built from it.
export const ENTITY_ROOTS = [
  "prochain_match",
  "next_match",
  "dernier_match",
  "last_match",
  "classement",
  "rank",
  "poule",
  "pool",
  "forme_recente",
  "recent_form",
  "form",
  "game_day",
  "jour_de_match",
  "match_en_cours",
  "match_in_progress",
];

export const ENTITY_ID_PATTERN = new RegExp(
  `^(sensor|binary_sensor)\\.([a-z0-9_]+?)_(${ENTITY_ROOTS.join("|")})`
);

// Name of the integration in the entity registry (an entity's `platform`).
export const INTEGRATION_PLATFORM = "ffbb_tracker";

// The translation key the integration gives each entity (its
// `_attr_translation_key` in sensor.py / binary_sensor.py), by the key the card
// uses for it. It is how an entity is recognised through the entity registry,
// and unlike the entity_id it doesn't depend on the language or on renaming.
//
// Written out, not derived from the slugs above: a translation key is an
// identifier chosen by the integration's code, a slug comes from the entity's
// translated *name*, and nothing makes them equal ("poule" is called "Pool" in
// English, "form" is "Recent form"). src/entity-names.integration.test.js
// compares this table with the integration's real keys.
export const TRANSLATION_KEYS = {
  nextOpponent: "next_match_opponent",
  nextDate: "next_match_date",
  nextLocation: "next_match_location",
  nextVenue: "next_match_venue_type",
  lastScore: "last_match_score",
  lastOpponent: "last_match_opponent",
  lastResult: "last_match_result",
  lastDate: "last_match_date",
  poule: "poule",
  rank: "rank",
  rankEvolution: "rank_evolution",
  form: "form",
  matchInProgress: "match_in_progress",
};

// The same, the other way round. A Map, so a registry entry whose translation
// key happens to be "constructor" or "toString" can't match an object property.
export const CARD_KEY_BY_TRANSLATION_KEY = new Map(
  Object.entries(TRANSLATION_KEYS).map(([key, translationKey]) => [translationKey, key]),
);
