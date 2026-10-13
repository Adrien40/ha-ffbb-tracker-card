// The entities of the FFBB Tracker integration, as the integration defines
// them (ha-ffbb-tracker 0.9.0): the translation key of each entity and its
// display name in each language (strings.json and translations/fr.json,
// `entity.sensor.<key>.name` / `entity.binary_sensor.<key>.name`).
//
// Home Assistant builds an entity_id from "<device name> <entity name>", so the
// part the card has to recognise is slugify(<entity name>). This file is a copy
// kept in sync by hand: when the integration renames an entity or adds one,
// update it here, and the tests in entity-names.integration.test.js tell what
// the card then needs.
//
// `cardKey` is the key the card uses for the entity (null when it doesn't use it).
export const INTEGRATION_ENTITIES = [
  { translationKey: "next_match_date", cardKey: "nextDate", domain: "sensor", fr: "Prochain match : Date", en: "Next match: Date" },
  { translationKey: "next_match_opponent", cardKey: "nextOpponent", domain: "sensor", fr: "Prochain match : Adversaire", en: "Next match: Opponent" },
  { translationKey: "next_match_venue_type", cardKey: "nextVenue", domain: "sensor", fr: "Prochain match : Terrain", en: "Next match: Venue" },
  { translationKey: "next_match_location", cardKey: "nextLocation", domain: "sensor", fr: "Prochain match : Lieu", en: "Next match: Location" },
  { translationKey: "last_match_date", cardKey: "lastDate", domain: "sensor", fr: "Dernier match : Date", en: "Last match: Date" },
  { translationKey: "last_match_opponent", cardKey: "lastOpponent", domain: "sensor", fr: "Dernier match : Adversaire", en: "Last match: Opponent" },
  { translationKey: "last_match_result", cardKey: "lastResult", domain: "sensor", fr: "Dernier match : Résultat", en: "Last match: Result" },
  { translationKey: "last_match_score", cardKey: "lastScore", domain: "sensor", fr: "Dernier match : Score", en: "Last match: Score" },
  { translationKey: "rank", cardKey: "rank", domain: "sensor", fr: "Classement", en: "Rank" },
  { translationKey: "rank_evolution", cardKey: "rankEvolution", domain: "sensor", fr: "Classement : Évolution", en: "Rank evolution" },
  { translationKey: "poule", cardKey: "poule", domain: "sensor", fr: "Poule", en: "Pool" },
  { translationKey: "form", cardKey: "form", domain: "sensor", fr: "Forme récente", en: "Recent form" },
  { translationKey: "game_day", cardKey: null, domain: "binary_sensor", fr: "Jour de match", en: "Game day" },
  { translationKey: "match_in_progress", cardKey: "matchInProgress", domain: "binary_sensor", fr: "Match en cours", en: "Match in progress" },
];

/** Home Assistant's slugify, as far as these names need it. */
export function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}
