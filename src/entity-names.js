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

// Suffixes appended to the shared prefix, e.g. `sensor.ujsbp_u13m_` + suffix.
export const SENSOR_SUFFIXES = {
  nextOpponent: ["prochain_match_adversaire", "next_match_opponent"],
  nextDate: ["prochain_match_date", "next_match_date"],
  nextLocation: ["prochain_match_lieu", "next_match_location"],
  nextVenue: ["prochain_match_terrain", "next_match_venue_type"],
  lastScore: ["dernier_match_score", "last_match_score"],
  lastOpponent: ["dernier_match_adversaire", "last_match_opponent"],
  lastResult: ["dernier_match_resultat", "last_match_result"],
  lastDate: ["dernier_match_date", "last_match_date"],
  poule: ["poule"],
  rank: ["classement", "rank"],
  rankEvolution: ["classement_evolution", "rank_evolution"],
  form: ["forme_recente", "form"],
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
  "forme_recente",
  "form",
  "game_day",
  "jour_de_match",
  "match_en_cours",
  "match_in_progress",
];

export const ENTITY_ID_PATTERN = new RegExp(
  `^(sensor|binary_sensor)\\.([a-z0-9_]+?)_(${ENTITY_ROOTS.join("|")})`
);
