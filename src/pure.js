// Pure, side-effect-free helpers extracted from FFBBCard.
//
// These don't touch `this`, `hass`, or the DOM, so they're plain functions
// that can be unit-tested directly (see pure.test.js) instead of only being
// exercised indirectly through render(). Anything that needs `this.hass` or
// `this._config` takes it as an explicit argument instead.

import {
  BINARY_SENSOR_SUFFIXES,
  CARD_KEY_BY_TRANSLATION_KEY,
  ENTITY_ROOTS,
  INTEGRATION_PLATFORM,
  SENSOR_SUFFIXES,
} from "./entity-names.js";

// Crest shown when a team logo fails to load.
//
// This path is intentional and correct -- it is NOT a missing asset. Do not
// replace it with an inline data URI or flag it as fragile:
//   - build.mjs copies brand/ to dist/brand/ (see copyStaticAssets there);
//   - HACS ships that folder next to the JS bundle, and Home Assistant serves
//     /config/www/community/<repository-name>/ as /local/community/<repository-name>/.
//     Verified by the maintainer on a real HACS install.
//   - "ha-ffbb-tracker-card" is the GitHub repository name (HACS uses it as the
//     folder name). If the repository is ever renamed, update it here too.
// The <img> error handler only swaps to this URL once (it checks the current
// src first), so even if the file were missing there is no infinite error loop.
const RESULT_VALUES = ["win", "loss", "draw"];

export const DEFAULT_FALLBACK_LOGO = "/local/community/ha-ffbb-tracker-card/brand/icon.png";

/** Normalize a string for fuzzy team-name matching: lowercase, diacritics removed, letters/digits only. */
export function cleanForMatch(s) {
  return (s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

/**
 * Normalize a raw team name while keeping an underscore between a word and a
 * separated number ("PAU - 2" -> "pau_2", "PAU - 13" -> "pau_13") so a trailing
 * letter of the club/city cannot fuse with a team number to mimic a category
 * such as "U2" or "U13", while real categories ("U13", "U13M", "NM3") and
 * competition phases ("Phase 2" -> "phase2") stay intact.
 */
function cleanForTeamTokens(s) {
  return (s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\bphase\s*(\d+)\b/g, "phase$1")
    .replace(/([a-z])[^a-z0-9]+(\d)/g, "$1_$2")
    .replace(/[^a-z0-9_]/g, "");
}

/**
 * Loose team-name comparison on two already-cleaned names (cleanForMatch).
 * Equal names match. A name merely contained in another also matches (spelling
 * variants), unless the extra part holds a digit other than a lone "1" (the FFBB's
 * "- 1" suffix): "BC LYON" and "BC LYON 2" are two different teams of the
 * same poule.
 */
export function cleanNamesMatch(x, y) {
  if (!x || !y) {
    return false;
  }
  if (x === y) {
    return true;
  }
  const [short, long] = x.length <= y.length ? [x, y] : [y, x];
  const shortEndsWithDigit = /\d$/.test(short.replace(/_/g, ""));
  // The short name can occur more than once in the long one: any occurrence
  // that leaves nothing but harmless words around it is enough.
  for (let from = long.indexOf(short); from !== -1; from = long.indexOf(short, from + 1)) {
    if (isSameTeamAround(long.slice(0, from), long.slice(from + short.length), shortEndsWithDigit)) {
      return true;
    }
  }
  return false;
}

/**
 * Loose comparison on two raw (uncleaned) team names, preserving word/number
 * boundaries before running cleanNamesMatch so "ELAN PAU - 2", "ELAN PAU - 13"
 * or "BCNM - 2" never fuse into "U2", "U13" or "NM2".
 */
export function teamNamesMatch(rawX, rawY) {
  const cleanX = cleanForMatch(rawX);
  const cleanY = cleanForMatch(rawY);
  if (!cleanX || !cleanY) {
    return false;
  }
  if (cleanX === cleanY) {
    return true;
  }
  return cleanNamesMatch(cleanForTeamTokens(rawX), cleanForTeamTokens(rawY));
}

// FFBB youth categories (U7 to U21, never U1..U6) and senior divisions carrying
// a digit (NM3, NF2, RM2, DM2...) plus competition phases ("- Phase 2"). They
// name a competition, not another team of the club.
const CATEGORY_WITH_DIGIT = /u(?:7|8|9|1\d|20|21)[mf]?|(?:nm|nf|rm|rf|dm|df|pm|pf)\d|phase\d+/g;

// What surrounds a name found inside a longer one decides whether both are the
// same team. FFBB writes the first team of a club as "BC LYON - 1": that
// trailing lone "1" is the bare name ("ANGERS" is "ETOILE ANGERS BASKET - 1"),
// and a category ("BASKET LANDES U13", "UJSBP U13M") is no other team either.
// Any other number is a different team: "BC LYON 2", "BC LYON 12" or "ANGERS
// BASKET 11" are not "BC LYON" / "ANGERS". A "1" that ends a longer number is
// no suffix ("US DAX 2" is not "US DAX 21", "BASKET 40" is not "BASKET 401").
function isSameTeamAround(prefix, suffix, shortEndsWithDigit) {
  const before = prefix.replace(CATEGORY_WITH_DIGIT, "").replace(/_/g, "");
  let after = suffix.replace(CATEGORY_WITH_DIGIT, "").replace(/_/g, "");
  const loneOne = /(^|\D)1$/.test(after) && !(after === "1" && shortEndsWithDigit);
  if (loneOne) {
    after = after.slice(0, -1);
  }
  return !/\d/.test(before) && !/\d/.test(after);
}

/**
 * Win / loss / draw letters of the form sensor, by the language of the Home
 * Assistant INSTANCE (the integration writes them with `hass.config.language`,
 * English for any language it has no table for). Mirrors `_FORM_LETTERS` in the
 * integration's sensor.py.
 *
 * The two languages differ ON PURPOSE, and this was checked on a real English
 * instance: a win is "W", a loss is "L" and a DRAW is "D" (in French a win is
 * "V", a loss is "D" for "défaite" and a draw is "N" for "nul"). So the letter
 * "D" means "loss" in French and "draw" in English: it can only be read with
 * the language of the instance, never on its own.
 */
export const FORM_LETTERS = {
  fr: { win: "V", loss: "D", draw: "N" },
  en: { win: "W", loss: "L", draw: "D" },
};

function normalizeInstanceLang(instanceLanguage) {
  return String(instanceLanguage ?? "").trim().toLowerCase();
}

function formResultOrNull(char, instanceLanguage) {
  const c = String(char ?? "").trim().toUpperCase();
  if (!c) {
    return null;
  }
  const lang = normalizeInstanceLang(instanceLanguage);
  if (lang) {
    // "D" is a loss in French but a draw in English: only the instance's own
    // table can tell. Match the integration's exact language key (trimmed and
    // lowercased) so both sides always pick the same table.
    const table = FORM_LETTERS[lang] || FORM_LETTERS.en;
    const hit = Object.keys(table).find((result) => table[result] === c);
    if (hit) {
      return hit;
    }
  }
  if (c === "V" || c === "W") {
    return "win";
  }
  if (c === "L") {
    return "loss";
  }
  if (c === "N") {
    return "draw";
  }
  if (c === "D") {
    // Instance language unknown: the card's historical reading.
    return lang ? null : "loss";
  }
  return null;
}

/** "win" | "loss" | "draw" for one letter of the form sensor (draw if unknown). */
export function formResultOf(char, instanceLanguage) {
  return formResultOrNull(char, instanceLanguage) ?? "draw";
}

/**
 * Rewrite the form sensor's sequence ("D-V-V-V") with the card's own letters,
 * so a card in English over a French instance shows "L-W-W-W". Without the
 * instance language the letters cannot be read reliably: left as they are.
 */
export function localizeFormSequence(sequence, instanceLanguage, cardLetters) {
  const lang = normalizeInstanceLang(instanceLanguage);
  if (!lang || typeof sequence !== "string" || !cardLetters) {
    return sequence;
  }
  return sequence
    .split("-")
    .map((token) => {
      const result = formResultOrNull(token, lang);
      return result ? cardLetters[result] || token : token;
    })
    .join("-");
}

/** Same for the current streak: "1D" becomes "1L". */
export function localizeFormStreak(streak, instanceLanguage, cardLetters) {
  const lang = normalizeInstanceLang(instanceLanguage);
  if (!lang || typeof streak !== "string" || !cardLetters) {
    return streak;
  }
  const match = /^(\d+)\s*([A-Za-z])$/.exec(streak.trim());
  if (!match) {
    return streak;
  }
  const result = formResultOrNull(match[2], lang);
  return result ? `${match[1]}${cardLetters[result] || match[2]}` : streak;
}

/**
 * Which side of a season-schedule row is our team.
 *
 * The integration tells it for every row (`is_home`), which is exact whatever
 * the spelling of the names: the team's own name (the pool sensor's "ANGERS")
 * and the names written on each match ("ETOILE ANGERS BASKET - 1") are two
 * different strings of the FFBB. Only a row without `is_home` falls back to
 * comparing names with `matchesMyTeam`.
 */
export function calendarRowSides(row, matchesMyTeam) {
  if (typeof row?.is_home === "boolean") {
    return { isHomeMyTeam: row.is_home, isAwayMyTeam: !row.is_home };
  }
  return {
    isHomeMyTeam: Boolean(matchesMyTeam(row?.home_team || "")),
    isAwayMyTeam: Boolean(matchesMyTeam(row?.away_team || "")),
  };
}

/**
 * Resolve every FFBB Tracker entity belonging to one team from a single
 * configured entity_id. Two ways, the first one preferred:
 *
 * 1. The entity registry (`hass.entities`): every entity the integration
 *    created on the same device as the configured one, recognised by its
 *    translation key. It doesn't depend on what the entities are called, so
 *    renaming an entity, a team or competition name containing a word such as
 *    "poule", or the language Home Assistant runs in make no difference.
 * 2. The entity_id itself: derive the shared prefix and probe the French and
 *    English suffixes listed in entity-names.js. It fills in whatever the
 *    registry didn't give, and does all the work when no registry is available
 *    (an older Home Assistant, or an entity that isn't in it).
 *
 * Returns null if `selected` or `states` is falsy.
 *
 * `states` is `hass.states` and `registry` is `hass.entities`, both resolved by
 * the caller; this stays pure by taking them as plain objects instead of
 * reading `this.hass`.
 */
export function resolveEntities(selected, states, registry = null) {
  if (!selected || !states) {
    return null;
  }

  const bySlug = resolveBySlug(selected, states);
  const byRegistry = resolveByRegistry(selected, states, registry);
  if (!byRegistry) {
    return bySlug;
  }

  const resolved = {};
  for (const key of Object.keys(bySlug)) {
    resolved[key] = byRegistry[key] ?? bySlug[key];
  }
  return resolved;
}

/**
 * The integration's entities on the same device as `selected`, by card key, or
 * null when the registry can't say (no registry, `selected` not in it or not
 * on a device, or an entity of another integration).
 */
function resolveByRegistry(selected, states, registry) {
  const own = registry?.[selected];
  if (!own?.device_id || (own.platform && own.platform !== INTEGRATION_PLATFORM)) {
    return null;
  }

  const resolved = {};
  let found = false;
  for (const [entityId, entry] of Object.entries(registry)) {
    if (entry?.device_id !== own.device_id) {
      continue;
    }
    if (entry.platform && entry.platform !== INTEGRATION_PLATFORM) {
      continue;
    }
    const key = CARD_KEY_BY_TRANSLATION_KEY.get(entry.translation_key);
    if (key && states[entityId]) {
      resolved[key] = states[entityId];
      found = true;
    }
  }
  return found ? resolved : null;
}

/** Probe `<prefix><suffix>` for every entity of the card, French slug first. */
function resolveWithPrefixes(prefix, binPrefix, states) {
  const findState = (keys) => {
    for (const k of keys) {
      if (states[k]) {
        return states[k];
      }
    }
    return null;
  };

  const resolved = {};
  for (const [key, suffixes] of Object.entries(SENSOR_SUFFIXES)) {
    resolved[key] = findState(suffixes.map((suffix) => `${prefix}${suffix}`));
  }
  for (const [key, suffixes] of Object.entries(BINARY_SENSOR_SUFFIXES)) {
    resolved[key] = findState(suffixes.map((suffix) => `${binPrefix}${suffix}`));
  }
  return resolved;
}

/**
 * Resolve by name. The entity name is "<shared prefix>_<entity name>", and the
 * prefix (team and competition) can itself contain a word that starts an entity
 * name, such as "poule", "rank" or "form": splitting at the first one would cut
 * the prefix short and find nothing. Every possible split is tried, and the one
 * that finds the most entities wins (the first one on a tie, which is what a
 * plain left-to-right search would pick).
 */
function resolveBySlug(selected, states) {
  const objectId = selected.slice(selected.indexOf(".") + 1);

  const prefixes = [];
  for (let i = 1; i < objectId.length; i++) {
    if (objectId[i] === "_" && ENTITY_ROOTS.some((root) => objectId.startsWith(root, i + 1))) {
      const name = objectId.slice(0, i);
      prefixes.push([`sensor.${name}_`, `binary_sensor.${name}_`]);
    }
  }
  if (prefixes.length === 0) {
    // No known entity name in it: assume the last word is the entity name.
    const lastUnderscore = objectId.lastIndexOf("_");
    const name = lastUnderscore > 0 ? objectId.slice(0, lastUnderscore) : objectId;
    prefixes.push([`sensor.${name}_`, `binary_sensor.${name}_`]);
  }

  let best = null;
  let bestCount = -1;
  for (const [prefix, binPrefix] of prefixes) {
    const resolved = resolveWithPrefixes(prefix, binPrefix, states);
    const count = Object.values(resolved).filter(Boolean).length;
    if (count > bestCount) {
      best = resolved;
      bestCount = count;
    }
  }
  return best;
}

/**
 * Build a predicate telling whether a team name refers to `targetName`,
 * given every name that appears in the same list (a standings table, a
 * calendar...).
 *
 * If at least one name in the list matches the target EXACTLY (ignoring case,
 * accents and punctuation), only exact matches count. That is what stops
 * "US Dax" from also highlighting "US Dax 2". Only when nothing matches
 * exactly does it fall back to substring matching, in either direction.
 * Empty / "-" names never match.
 */
function isByeTeamName(name) {
  const raw = String(name ?? "").trim().toLowerCase();
  return raw === "exempt" || raw === "n/a";
}

export function createTeamMatcher(names, targetName) {
  const targetClean = cleanForMatch(targetName || "");
  if (!targetClean || isByeTeamName(targetName)) {
    return () => false;
  }
  const hasExact = (Array.isArray(names) ? names : []).some((n) => {
    if (isByeTeamName(n)) return false;
    const c = cleanForMatch(n || "");
    return Boolean(c) && c === targetClean;
  });
  return (name) => {
    if (isByeTeamName(name)) {
      return false;
    }
    const c = cleanForMatch(name || "");
    if (!c) {
      return false;
    }
    if (hasExact) {
      return c === targetClean;
    }
    return teamNamesMatch(name, targetName);
  };
}

/**
 * Find an opponent's position in a standings table.
 * Strictly prioritizes an exact match before falling back to substring inclusion.
 * Returns null if there's no name, no standings array, or no valid match.
 */
// Team page addresses compared without query string, fragment or trailing slash.
function normalizeTeamUrl(u) {
  if (!u || typeof u !== "string") {
    return null;
  }
  const clean = u.trim().split(/[?#]/)[0].replace(/\/+$/, "").toLowerCase();
  return clean || null;
}

export function findOpponentRank(opponentName, standings, { opponentUrl = null } = {}) {
  if (Array.isArray(standings) && opponentUrl) {
    // The team page address is unique per team (it ends with the team's id),
    // so it settles the cases the name cannot ("BC LYON" / "BC LYON - 3").
    const wanted = normalizeTeamUrl(opponentUrl);
    const byUrl = wanted
      ? standings.find((item) => {
          if (!item || isByeTeamName(item.team_name || item.name)) return false;
          return [item.team_url, item.url, item.link].some((u) => normalizeTeamUrl(u) === wanted);
        })
      : null;
    if (byUrl) {
      return byUrl.position ?? byUrl.rank;
    }
  }
  if (!opponentName || isByeTeamName(opponentName) || !Array.isArray(standings)) {
    return null;
  }
  const oppClean = cleanForMatch(opponentName);
  if (!oppClean) {
    return null;
  }

  let found = standings.find((item) => {
    if (!item) return false;
    const team = item.team_name || item.name;
    if (isByeTeamName(team)) return false;
    const itemClean = cleanForMatch(team);
    return Boolean(itemClean && itemClean === oppClean);
  });

  if (!found) {
    found = standings.find((item) => {
      if (!item) return false;
      const team = item.team_name || item.name;
      if (isByeTeamName(team)) return false;
      return teamNamesMatch(team, opponentName);
    });
  }

  // Last resort for a numbered team ("LOUS MAROUS BASKET - 2") that the
  // standings list under the club's bare name ("LOUS MAROUS BASKET"): cleanNamesMatch
  // rightly refuses to treat "BC LYON 2" as "BC LYON" in general, but when the
  // standings hold exactly ONE team starting with that base name, there is no
  // other team it could be, so its rank is used. Several teams sharing the base
  // ("BC LYON" + "BC LYON 3"...) stay ambiguous and give no rank.
  if (!found) {
    const base = oppClean.replace(/\d+$/, "");
    if (base && base !== oppClean) {
      const sameClub = standings.filter((item) => {
        if (!item) return false;
        const team = item.team_name || item.name;
        if (isByeTeamName(team)) return false;
        const itemClean = cleanForMatch(team);
        return Boolean(itemClean) && itemClean.startsWith(base);
      });
      if (sameClub.length === 1 && cleanForMatch(sameClub[0].team_name || sameClub[0].name) === base) {
        found = sameClub[0];
      }
    }
  }

  return found ? (found.position ?? found.rank) : null;
}

/**
 * Format a numeric rank as an ordinal string in the given language.
 * `lang` is the already-resolved 2-letter language code (e.g. from
 * `(hass.locale.language || hass.language || "en").substring(0, 2)`).
 * Returns null for anything that isn't a positive integer.
 */
export function formatRank(rank, lang) {
  if (rank === null || rank === undefined || rank === "" || isNaN(Number(rank))) {
    return null;
  }
  const num = parseInt(rank, 10);
  if (num <= 0) {
    return null;
  }

  if (lang === "fr") {
    return num === 1 ? "1er" : `${num}e`;
  }

  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) {
    return `${num}st`;
  }
  if (j === 2 && k !== 12) {
    return `${num}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${num}rd`;
  }
  return `${num}th`;
}

/**
 * Split a post-match score string ("51 - 46") into { my, opponent }, so the
 * card can style its own team's number distinctly from the opponent's
 * (quick "am I winning?" reading, instead of two identical-looking numbers).
 *
 * `score` must be formatted "home - away", like the calendar rows' `score`
 * (is_home true + "51 - 46" means the home team, ours, scored 51). The "last
 * match score" sensor is NOT in that order ("ours - theirs"): convert it with
 * sensorScoreToHomeAway() first. `isHome` is the same flag already used
 * everywhere else in this file to order left/right.
 *
 * The returned `mineFirst` flag tells the renderer in which order to draw the
 * two numbers so they match the home - away order of the score and of the
 * left / right team columns (our score goes on the right for away matches).
 *
 * Returns null (never guesses) when the string isn't a clean "NN - NN" pair
 * -- forfeits, walkovers, or a missing score ("-") all fall back to plain
 * text in the caller.
 */
export function splitScore(score, isHome) {
  if (typeof score !== "string") return null;
  const match = score.match(/^\s*(\d+)\s*-\s*(\d+)\s*$/);
  if (!match) return null;
  const [, first, second] = match;
  // `mineFirst` is true when our team is the home side, i.e. our number comes
  // first in the "home - away" reading order. Away from home it is false and
  // the display must put the opponent's (home) number on the left.
  return isHome
    ? { my: first, opponent: second, mineFirst: true }
    : { my: second, opponent: first, mineFirst: false };
}

/**
 * Turn the "last match score" sensor into the "home - away" string that
 * splitScore() and the calendar rows use.
 *
 * That sensor is NOT written "home - away": the integration always writes
 * "<our score> - <opponent score>" (sensor.py, FFBBLastMatchScoreSensor),
 * whereas the calendar rows' `score` is "home - away". Reading the sensor as
 * "home - away" swapped the two numbers for every away match (a 43-42 win
 * away showed up as 43 - 42 with our 42 highlighted). The team_score /
 * opponent_score attributes are preferred when present; otherwise the state
 * is read as "ours - theirs". Anything that is not a clean pair is returned
 * unchanged, so forfeits and "-" still fall back to plain text.
 */
export function sensorScoreToHomeAway(state, attributes, isHome) {
  const toInt = (value) => (/^\d+$/.test(String(value ?? "").trim()) ? Number(value) : null);
  let mine = toInt(attributes?.team_score);
  let theirs = toInt(attributes?.opponent_score);
  if (mine === null || theirs === null) {
    const pair = typeof state === "string" ? state.match(/^\s*(\d+)\s*-\s*(\d+)\s*$/) : null;
    if (!pair) return state;
    mine = Number(pair[1]);
    theirs = Number(pair[2]);
  }
  return isHome ? `${mine} - ${theirs}` : `${theirs} - ${mine}`;
}

/**
 * Find a team's url-ish attribute by fuzzy name match against a standings
 * array, trying each key in `urlKeys` in order on the matched row.
 * Strictly prioritizes exact match before substring inclusion.
 * Returns null if there's no standings array, no match, or none of
 * urlKeys resolves to a safe URL (see sanitizeUrl).
 */
export function findUrlInStandings(teamName, standings, urlKeys) {
  if (!Array.isArray(standings) || isByeTeamName(teamName)) {
    return null;
  }
  const targetClean = cleanForMatch(teamName);
  if (!targetClean) {
    return null;
  }

  let match = standings.find((item) => {
    const raw = item?.team_name || item?.name || "";
    if (isByeTeamName(raw)) return false;
    const itemClean = cleanForMatch(raw);
    return Boolean(itemClean && itemClean === targetClean);
  });

  if (!match) {
    match = standings.find((item) => {
      const raw = item?.team_name || item?.name || "";
      if (isByeTeamName(raw)) return false;
      return teamNamesMatch(raw, teamName);
    });
  }

  if (!match) {
    return null;
  }

  for (const key of urlKeys) {
    if (match[key]) {
      const url = sanitizeUrl(match[key]);
      if (url) {
        return url;
      }
    }
  }
  return null;
}

/**
 * Pick the first non-empty match list among the poule sensor, the next-match
 * sensor, the rank sensor, and (as a last resort) the configured entity
 * itself.
 */
/**
 * Put the calendar in the federation's official order, by round number
 * (J1, J2, J3, J4...). The integration lists the matches by date, so a match
 * played late (postponed J4 played on 24 Nov.) sits between J13 and J14 there,
 * whereas the FFBB site shows it between J3 and J5.
 *
 * Only done when it is safe: every row has a round number and no round
 * appears twice (a calendar with several phases, whose rounds start over,
 * keeps the integration's order). The input is never modified.
 */
export function sortCalendarByRound(matches) {
  if (!Array.isArray(matches) || matches.length < 2) {
    return matches;
  }
  const rounds = matches.map((m) => {
    const n = parseInt(String(m?.round ?? "").trim(), 10);
    return Number.isFinite(n) ? n : null;
  });
  if (rounds.some((r) => r === null) || new Set(rounds).size !== rounds.length) {
    return matches;
  }
  return matches
    .map((m, i) => ({ m, r: rounds[i] }))
    .sort((a, b) => a.r - b.r)
    .map((x) => x.m);
}

export function extractCalendarMatches(entities, configuredEntity) {
  return sortCalendarByRound(pickCalendarMatches(entities, configuredEntity));
}

function pickCalendarMatches(entities, configuredEntity) {
  const fromPoule =
    entities?.poule?.attributes?.calendar ||
    entities?.poule?.attributes?.matches ||
    entities?.poule?.attributes?.schedule;
  if (Array.isArray(fromPoule) && fromPoule.length > 0) {
    return fromPoule;
  }
  const fromNextDate =
    entities?.nextDate?.attributes?.calendar || entities?.nextDate?.attributes?.matches;
  if (Array.isArray(fromNextDate) && fromNextDate.length > 0) {
    return fromNextDate;
  }
  const fromRank =
    entities?.rank?.attributes?.calendar || entities?.rank?.attributes?.matches;
  if (Array.isArray(fromRank) && fromRank.length > 0) {
    return fromRank;
  }
  const fromConfigured =
    configuredEntity?.attributes?.calendar || configuredEntity?.attributes?.matches;
  if (Array.isArray(fromConfigured) && fromConfigured.length > 0) {
    return fromConfigured;
  }
  return [];
}

/**
 * Resolve a raw URL-ish attribute value into a safe absolute http(s) URL or local path.
 */
export function sanitizeUrl(u) {
  if (!u || typeof u !== "string") {
    return null;
  }
  const trimmed = u.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  if (trimmed.startsWith("/local/") || trimmed.startsWith("/api/")) {
    return trimmed;
  }
  if (trimmed.startsWith("/")) {
    return `https://competitions.ffbb.com${trimmed}`;
  }
  return null;
}

/**
 * Check if dateStr corresponds to the same calendar day as now (in local time).
 */
export function isToday(dateStr, now = new Date()) {
  if (!dateStr || dateStr === "unknown" || dateStr === "unavailable") {
    return false;
  }
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    return false;
  }
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

/**
 * Check if `now` falls within the match day or the following calendar day (up to 23:59:59 of D+1).
 */
export function isWithinDPlusOne(lastDateStr, now = new Date()) {
  if (!lastDateStr || lastDateStr === "unknown" || lastDateStr === "unavailable") {
    return false;
  }
  const matchDate = new Date(lastDateStr);
  if (isNaN(matchDate.getTime())) {
    return false;
  }
  const startOfMatchDay = new Date(matchDate.getFullYear(), matchDate.getMonth(), matchDate.getDate());
  const endOfDPlusOne = new Date(startOfMatchDay);
  endOfDPlusOne.setDate(endOfDPlusOne.getDate() + 2);

  const currentTime = now.getTime();
  return currentTime >= matchDate.getTime() && currentTime < endOfDPlusOne.getTime();
}

/**
 * Check if `now` is at or past midnight of D-1 (calendar day before upcoming match).
 */
export function isAtOrAfterDMinusOne(nextDateStr, now = new Date()) {
  if (!nextDateStr || nextDateStr === "unknown" || nextDateStr === "unavailable") {
    return false;
  }
  const matchDate = new Date(nextDateStr);
  if (isNaN(matchDate.getTime())) {
    return false;
  }
  const startOfMatchDay = new Date(matchDate.getFullYear(), matchDate.getMonth(), matchDate.getDate());
  const startOfDMinusOne = new Date(startOfMatchDay);
  startOfDMinusOne.setDate(startOfDMinusOne.getDate() - 1);

  return now.getTime() >= startOfDMinusOne.getTime();
}

/**
 * A match counts as "result pending" once it started more than this many
 * hours ago and still has no score. This is the FFBB Tracker integration's own
 * grace period for its next-match sensors, so the card and the entities agree
 * on which match is "next": a match that just ended stays "next" for this
 * long, then is waiting for its result rather than still to come.
 */
export const PENDING_RESULT_GRACE_HOURS = 3;

/**
 * The grace period the integration actually applies: it is never shorter than
 * the above, but grows with the user's "live window after the match" option
 * (up to 6 h) and the integration publishes it as `result_grace_hours` on the
 * next match date sensor. Falls back to PENDING_RESULT_GRACE_HOURS for an
 * older integration, a missing sensor, or a value that is not a positive number.
 */
export function resolveGraceHours(entities) {
  const published = Number(entities?.nextDate?.attributes?.result_grace_hours);
  return Number.isFinite(published) && published > 0
    ? published
    : PENDING_RESULT_GRACE_HOURS;
}

// A calendar row has a score when `score` is non-empty or both numeric side scores exist.
const formatRowScore = (match) => {
  if (!match) return "";
  if (match.score) return String(match.score);
  if (match.home_score != null && match.away_score != null) {
    return `${match.home_score} - ${match.away_score}`;
  }
  return "";
};

// A calendar row has a result when it is flagged as played or carries a score.
const hasResult = (match) => Boolean(match && (match.is_played || formatRowScore(match)));

// Start time of a calendar row in ms, NaN when it has no usable date.
const matchTime = (match) => Date.parse(match?.date ?? match?.datetime);

/**
 * True for a calendar row that started more than `graceHours` ago (by default
 * PENDING_RESULT_GRACE_HOURS, see resolveGraceHours) and has neither a score
 * nor the "played" flag: it is over, its result just isn't known yet (the club
 * hasn't entered it, or it is delayed).
 */
export function isPendingResult(
  match,
  now = new Date(),
  graceHours = PENDING_RESULT_GRACE_HOURS,
) {
  // A bye round has no opponent and no game: it never waits for a result.
  if (!match || match.is_exempt || hasResult(match)) {
    return false;
  }
  const started = matchTime(match);
  if (Number.isNaN(started)) {
    return false;
  }
  return now.getTime() - started > graceHours * 3_600_000;
}

/**
 * Index of the calendar row that has no result yet while its planned date is
 * still inside the "D+1" window (the same two days a played match stays on
 * screen). Such a match stays displayed -- postponed or simply without a score
 * -- instead of jumping to the following match a few hours after its start.
 * -1 when there is none.
 *
 * Bye rounds (`is_exempt`) are deliberately NOT excluded here, unlike in
 * findNextMatchIndex() and isPendingResult(): a bye is a row of the calendar
 * like any other, so it stays on screen for the same two days, shown as
 * "Bye", before the card moves on. Without it the card would jump to the
 * following match the morning after a bye round. This is intended and covered
 * by calendar-navigation.test.js ("when the bye round is the last row of the
 * calendar"). Not a bug: do not add an `is_exempt` filter.
 */
export function findRecentUnplayedIndex(matches, now = new Date()) {
  if (!Array.isArray(matches)) {
    return -1;
  }
  let best = -1;
  let bestTime = -Infinity;
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const d = m?.date ?? m?.datetime;
    // No is_exempt check on purpose: see the note above.
    if (m && !hasResult(m) && d && isWithinDPlusOne(d, now)) {
      const t = matchTime(m);
      const time = Number.isFinite(t) ? t : -Infinity;
      if (best === -1 || time >= bestTime) {
        best = i;
        bestTime = time;
      }
    }
  }
  return best;
}

/**
 * Index of the chronologically latest row in `matches` (falling back to the
 * last slot when no row carries a usable date). Needed because
 * `sortCalendarByRound` orders rows by round (J1..Jn), so a postponed early
 * round played after the final round sits earlier in the array.
 */
function findLatestCalendarIndex(matches) {
  if (!Array.isArray(matches) || matches.length === 0) {
    return 0;
  }
  let best = -1;
  let bestTime = -Infinity;
  for (let i = 0; i < matches.length; i++) {
    const t = matchTime(matches[i]);
    if (Number.isFinite(t) && (best === -1 || t >= bestTime)) {
      best = i;
      bestTime = t;
    }
  }
  return best !== -1 ? best : matches.length - 1;
}

/**
 * Index of the most recent calendar row that has a result, by DATE (not by
 * round number or position: a postponed J4 played on 24 Nov. is more recent
 * than J13 played on 20 Nov.). Rows without a date lose against dated ones;
 * on equal dates the later row wins. -1 if none.
 */
export function findLastPlayedIndex(matches) {
  if (!Array.isArray(matches)) {
    return -1;
  }
  let best = -1;
  let bestTime = -Infinity;
  for (let i = 0; i < matches.length; i++) {
    if (!hasResult(matches[i])) {
      continue;
    }
    const t = matchTime(matches[i]);
    const time = Number.isFinite(t) ? t : -Infinity;
    if (best === -1 || time >= bestTime) {
      best = i;
      bestTime = time;
    }
  }
  return best;
}

/**
 * Index of the next match of the calendar: the first row without a result
 * that is not already waiting for one. Rows waiting for a result are skipped
 * (they are neither upcoming nor finished); only when nothing else is left
 * does the first of them stand in, like the integration's own fallback.
 * A bye round (`is_exempt`) is never a next match: it has no opponent and is
 * never played, so it would otherwise stay "next" for ever once the real
 * matches are all done.
 */
export function findNextMatchIndex(
  matches,
  now = new Date(),
  graceHours = PENDING_RESULT_GRACE_HOURS,
) {
  if (!Array.isArray(matches)) {
    return -1;
  }
  const isBye = (m) => Boolean(m?.is_exempt);
  // The earliest by DATE among the candidates (the list is in round order, so
  // its first candidate is not necessarily the next one played). Rows without
  // a date come after dated ones; on equal dates the first row wins.
  const earliest = (isCandidate) => {
    let best = -1;
    let bestTime = Infinity;
    matches.forEach((m, i) => {
      if (!isCandidate(m)) {
        return;
      }
      const t = matchTime(m);
      const time = Number.isFinite(t) ? t : Infinity;
      if (best === -1 || time < bestTime) {
        best = i;
        bestTime = time;
      }
    });
    return best;
  };
  const upcoming = earliest(
    (m) => !isBye(m) && !hasResult(m) && !isPendingResult(m, now, graceHours),
  );
  if (upcoming !== -1) {
    return upcoming;
  }
  return earliest((m) => !isBye(m) && !hasResult(m));
}

/**
 * Index of the row that comes just before ("prev") or just after ("next") the
 * given one IN TIME, whatever its position in the list. The list is in the
 * official round order, but the chevrons walk through the season by date: from
 * the J4 played on 24 Nov. "previous" is the J13 of 20 Nov., not the J3.
 * A row without a date keeps its place in the list; only the dated rows are
 * put in date order, among the places they occupy. -1 when there is no such
 * row.
 */
export function chronologicalNeighbourIndex(matches, index, direction) {
  if (!Array.isArray(matches) || !Number.isInteger(index) || index < 0 || index >= matches.length) {
    return -1;
  }
  const order = matches.map((_, i) => i);
  const datedSlots = order.filter((i) => Number.isFinite(matchTime(matches[i])));
  const datedByTime = [...datedSlots].sort(
    (a, b) => matchTime(matches[a]) - matchTime(matches[b]) || a - b,
  );
  datedSlots.forEach((slot, k) => {
    order[slot] = datedByTime[k];
  });
  const target = order.indexOf(index) + (direction === "prev" ? -1 : 1);
  return target >= 0 && target < order.length ? order[target] : -1;
}

/**
 * Index of the calendar row an entity describes: by match number when both
 * sides have one, otherwise by start time. -1 when nothing matches, so callers
 * can fall back to their own rule.
 */
export function findCalendarIndex(matches, { matchNumber, dateStr } = {}) {
  if (!Array.isArray(matches)) {
    return -1;
  }
  const wanted = String(matchNumber ?? "").trim();
  if (wanted) {
    const byNumber = matches.findIndex((m) => String(m?.match_number ?? "").trim() === wanted);
    if (byNumber !== -1) {
      return byNumber;
    }
  }
  const time = Date.parse(dateStr);
  if (Number.isNaN(time)) {
    return -1;
  }
  return matches.findIndex((m) => matchTime(m) === time);
}

/**
 * Resolve whether the card should display the last match (post-match / score view)
 * or the upcoming match view.
 */
export function computeIsPostMatch({
  defaultView = "auto",
  manualView = null,
  isLive = false,
  lastDate = null,
  hasLastScore = false,
  hasLastMatch = true,
  nextDate = null,
  hasNextMatch = false,
  nextIsStale = false,
  now = new Date(),
} = {}) {
  if (isLive || !hasLastMatch) {
    return false;
  }
  if (manualView !== null) {
    return manualView === "last";
  }
  if (defaultView === "next") {
    return false;
  }
  // `nextIsStale` is true only for a postponed/unplayed next match that is OLDER
  // than the last played match: it is not really upcoming, so it must not hide
  // that last match (it stays reachable with the chevrons). A postponed match
  // that is the most recent one keeps being displayed as before.
  if (defaultView === "last") {
    if (!hasLastScore) {
      return false;
    }
    if (hasNextMatch && !nextIsStale && isAtOrAfterDMinusOne(nextDate, now)) {
      return false;
    }
    return true;
  }

  if (hasLastScore && (nextIsStale || isWithinDPlusOne(lastDate, now))) {
    return true;
  }
  return false;
}

/**
 * Sort standings array numerically by position (or rank) ascending.
 */
// Which card(s) the person wants to see: the match card, the standings
// card, or both. Falls back to "match" for anything unset or invalid, since
// that is the card's original, single-card behaviour.
export const DISPLAY_MODES = ["match", "standings", "both"];

/** A sensor value, or "" when it is empty, "unknown" or "unavailable". */
export function validStateOrEmpty(value) {
  return value && value !== "unknown" && value !== "unavailable" ? value : "";
}

export function resolveDisplayMode(config) {
  return DISPLAY_MODES.includes(config?.display_mode) ? config.display_mode : "match";
}

// getCardSize() units for Home Assistant's masonry view, where 1 unit is
// roughly 50 pixels (see https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/#sizing-in-masonry-view).
//
// The match card's own layout does not depend on live data -- the two team
// panels, the timer and the footer are always roughly the same height -- so
// it keeps the flat estimate the card has always used.
//
// The standings card, on the other hand, grows with the size of the pool: a
// table for a 20-team pool is nowhere near the same height as an 8-team
// one, so a single flat constant left it badly undersized in masonry view
// once display_mode could show it (alone, or under the match card).
const MATCH_CARD_SIZE = 3;
// Card header + optional subtitle + the two-row FFBB column group header.
const STANDINGS_HEADER_SIZE = 3;
// A body row is roughly half a size unit tall, so every 2 teams add 1 unit.
const TEAMS_PER_SIZE_UNIT = 2;

export function estimateStandingsCardSize(teamCount) {
  const rows = Number.isFinite(teamCount) && teamCount > 0 ? teamCount : 0;
  return STANDINGS_HEADER_SIZE + Math.ceil(rows / TEAMS_PER_SIZE_UNIT);
}


/**
 * Estimates getCardSize() for the whole card, given the config (for
 * display_mode) and the standings array the standings card would render
 * (entities.rank?.attributes?.standings) -- the exact same source of truth
 * render() uses, so the estimate never drifts from what is actually shown.
 */
export function estimateCardSize({ config, standings } = {}) {
  const mode = resolveDisplayMode(config);
  const teamCount = Array.isArray(standings) ? standings.length : 0;
  if (mode === "match") return MATCH_CARD_SIZE;
  if (mode === "standings") return estimateStandingsCardSize(teamCount);
  return MATCH_CARD_SIZE + estimateStandingsCardSize(teamCount);
}

export function sortStandings(standings) {
  if (!Array.isArray(standings)) {
    return [];
  }
  return [...standings].sort((a, b) => {
    const parsePos = (item) => {
      const num = parseInt(item?.position ?? item?.rank, 10);
      return isNaN(num) ? 999 : num;
    };
    return parsePos(a) - parsePos(b);
  });
}

function browserCssSupports(property, value) {
  if (typeof CSS !== "undefined" && typeof CSS.supports === "function") {
    return CSS.supports(property, value);
  }
  return null;
}

const COLOR_PATTERN =
  /^(#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|(rgb|rgba|hsl|hsla)\(\s*[\d.]+%?(deg)?\s*[,\s]\s*[\d.]+%?\s*[,\s]\s*[\d.]+%?(\s*[,/]\s*[\d.]+%?)?\s*\))$/i;

/**
 * Whether `value` is a usable CSS color (hex, rgb(), hsl(), a named color,
 * var(--x)...). The browser's own CSS parser decides when available; anything
 * that could break out of the style declaration is always rejected.
 * `supports` is injectable so the logic can be tested without a browser.
 */
export function isValidCssColor(value, supports = browserCssSupports) {
  if (typeof value !== "string") {
    return false;
  }
  const v = value.trim();
  if (!v || /[;{}<>\\"']/.test(v)) {
    return false;
  }
  const verdict = supports("color", v);
  if (typeof verdict === "boolean") {
    return verdict;
  }
  return COLOR_PATTERN.test(v);
}

/**
 * Resolve theme, custom color, or default basketball accent color from configuration.
 * An invalid custom color (e.g. "bleu" instead of "#1e88e5") falls back to the
 * default orange instead of silently producing no accent at all.
 */
export function resolveAccentColor(config) {
  const mode = config?.accent_color || "default";
  if (mode === "theme") {
    return "var(--primary-color)";
  }
  if (mode === "custom" && isValidCssColor(config?.custom_accent_color)) {
    return config.custom_accent_color.trim();
  }
  return "#ff6b00";
}

/**
 * Decide whether times should be shown in 12-hour (AM/PM) or 24-hour format,
 * following the same rules as Home Assistant's own frontend.
 *
 * `timeFormat` is the user's profile setting, `hass.locale.time_format`:
 *   - "12"     -> always 12-hour   ("am_pm" is accepted as an alias)
 *   - "24"     -> always 24-hour   ("twenty_four" is accepted as an alias)
 *   - "language" (default) -> whatever `language` uses by convention
 *     (en-US -> 12-hour, en-GB / fr -> 24-hour)
 *   - "system" -> whatever the browser / operating system prefers
 * Anything unknown behaves like "language". Never throws; returns a boolean
 * (true = 12-hour).
 */
export function resolveHour12(timeFormat, language) {
  if (timeFormat === "12" || timeFormat === "am_pm") {
    return true;
  }
  if (timeFormat === "24" || timeFormat === "twenty_four") {
    return false;
  }
  const locale = timeFormat === "system" ? undefined : language;
  try {
    const resolved = new Intl.DateTimeFormat(locale, { hour: "numeric" }).resolvedOptions();
    if (typeof resolved.hour12 === "boolean") {
      return resolved.hour12;
    }
    return resolved.hourCycle === "h12" || resolved.hourCycle === "h11";
  } catch {
    return false;
  }
}

/**
 * Format a match date string into weekday, day/month and time parts.
 *
 * `options.hour12` (see resolveHour12) forces 12-hour (true) or 24-hour
 * (false) time. It is applied through `hourCycle` ("h12" / "h23") rather than
 * the `hour12` flag, because `hour12: false` makes some browsers print
 * midnight as "24:00". When omitted, the locale's own default is used.
 */
export function formatDate(dateStr, lang = "en-US", { hour12 } = {}) {
  if (!dateStr || dateStr === "unknown" || dateStr === "unavailable") {
    return null;
  }
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    return null;
  }

  const timeOptions =
    typeof hour12 === "boolean"
      ? { hour: hour12 ? "numeric" : "2-digit", minute: "2-digit", hourCycle: hour12 ? "h12" : "h23" }
      : { hour: "2-digit", minute: "2-digit" };

  const formatWith = (locale) => ({
    weekday: d.toLocaleDateString(locale, { weekday: "short" }),
    day: d.toLocaleDateString(locale, { day: "numeric", month: "short" }),
    time: d.toLocaleTimeString(locale, timeOptions),
  });

  try {
    return formatWith(lang || "en-US");
  } catch {
    return formatWith("en-US");
  }
}

/**
 * Find the official or external team page URL from sensor attributes or standings.
 * Prioritizes direct match sensor attributes (team_url / opponent_url) before scanning standings.
 * Never falls back to competition/poule URLs.
 */
export function findTeamUrl({
  isHome = true,
  isMyTeam = isHome,
  teamName = "",
  entities = {},
  opponentSensor = null,
  selectedEntity = null,
} = {}) {
  const searchAttrs = (obj, keys) => {
    if (!obj || typeof obj !== "object") return null;
    for (const k of keys) {
      if (obj[k]) {
        const url = sanitizeUrl(obj[k]);
        if (url) return url;
      }
    }
    return null;
  };

  if (isMyTeam) {
    const directTeamUrl = searchAttrs(opponentSensor?.attributes, [
      "team_url",
      "team_link",
    ]);
    if (directTeamUrl) return directTeamUrl;

    const entitiesToCheck = [
      selectedEntity,
      entities?.nextDate,
      entities?.lastDate,
      entities?.rank,
    ];
    for (const ent of entitiesToCheck) {
      const found = searchAttrs(ent?.attributes, ["team_url", "team_link"]);
      if (found) return found;
    }

    const standings = entities?.rank?.attributes?.standings || selectedEntity?.attributes?.standings;
    const foundInStandings = findUrlInStandings(teamName, standings, ["team_url", "url", "link"]);
    if (foundInStandings) return foundInStandings;
  } else {
    const directOppUrl = searchAttrs(opponentSensor?.attributes, [
      "opponent_url",
      "opponent_team_url",
      "opponent_link",
    ]);
    if (directOppUrl) return directOppUrl;

    const standings = entities?.rank?.attributes?.standings || selectedEntity?.attributes?.standings;
    const foundInStandings = findUrlInStandings(teamName, standings, ["team_url", "url", "link"]);
    if (foundInStandings) return foundInStandings;
  }

  return null;
}

/**
 * Resolve a team logo for a calendar match row.
 * Prioritizes direct match object logo, then team sensor logo (if my team),
 * then opponent sensor logo (if matching next/last opponent),
 * then standings table lookup, and falls back to DEFAULT_FALLBACK_LOGO.
 */
export function resolveCalendarTeamLogo({
  teamName = "",
  matchLogo = null,
  isMyTeam = false,
  myTeamLogo = null,
  nextOpponentState = null,
  nextOpponentLogo = null,
  lastOpponentState = null,
  lastOpponentLogo = null,
  standings = null,
} = {}) {
  const safeDirect = sanitizeUrl(matchLogo);
  if (safeDirect) {
    return safeDirect;
  }

  const safeMyTeamLogo = sanitizeUrl(myTeamLogo);
  if (isMyTeam && safeMyTeamLogo && safeMyTeamLogo !== DEFAULT_FALLBACK_LOGO) {
    return safeMyTeamLogo;
  }

  const targetClean = cleanForMatch(teamName);

  // With no usable team name we can't match anything by name, but that must
  // not skip the "my team" fallback below. A bye slot ("Exempt") never
  // resolves an opponent logo from sensors or standings.
  if (targetClean && !isByeTeamName(teamName)) {
    if (nextOpponentState && !isByeTeamName(nextOpponentState) && teamNamesMatch(nextOpponentState, teamName)) {
      const safeOpp = sanitizeUrl(nextOpponentLogo);
      if (safeOpp) {
        return safeOpp;
      }
    }

    if (lastOpponentState && !isByeTeamName(lastOpponentState) && teamNamesMatch(lastOpponentState, teamName)) {
      const safeLastOpp = sanitizeUrl(lastOpponentLogo);
      if (safeLastOpp) {
        return safeLastOpp;
      }
    }

    if (Array.isArray(standings) && standings.length > 0) {
      const foundInStandings = findUrlInStandings(teamName, standings, [
        "team_logo_url",
        "opponent_logo_url",
        "logo_url",
        "logo",
        "team_logo",
        "club_logo",
        "crest",
        "image",
        "image_url",
        "badge",
      ]);
      if (foundInStandings) {
        return foundInStandings;
      }
    }
  }

  if (isMyTeam && safeMyTeamLogo) {
    return safeMyTeamLogo;
  }

  return DEFAULT_FALLBACK_LOGO;
}

/**
 * Pure view-model derivation: turns raw entity state + configuration into the
 * flat set of structured values the template requires.
 */
export function computeViewModel({
  entities = {},
  config = {},
  manualView = null,
  matchIndex = null,
  states = {},
  lang = "fr",
  locale = null,
  hour12 = undefined,
  t = (k, fallback = "") => fallback,
  isPreview = false,
  now = new Date(),
  instanceLanguage = "",
} = {}) {
  const isValidState = (s) => Boolean(s && s !== "unknown" && s !== "unavailable");

  const isLive = Boolean(entities.matchInProgress && entities.matchInProgress.state === "on");
  const lastScoreState = entities.lastScore?.state;
  const hasLastScore = isValidState(lastScoreState);
  const nextDateState = entities.nextDate?.state;
  const hasNextMatch = isValidState(nextDateState);

  const hasLastMatchData =
    hasLastScore ||
    isValidState(entities.lastOpponent?.state) ||
    isValidState(entities.lastDate?.state);
  const hasNextMatchData = hasNextMatch || isValidState(entities.nextOpponent?.state);

  const selectedEntity = config.entity && states ? states[config.entity] : null;
  const calendarMatches = extractCalendarMatches(entities, selectedEntity);
  const hasCalendar = Array.isArray(calendarMatches) && calendarMatches.length > 0;

  const lastPlayedIndex = hasCalendar ? findLastPlayedIndex(calendarMatches) : -1;
  const graceHours = resolveGraceHours(entities);
  const nextMatchIndex = hasCalendar
    ? findNextMatchIndex(calendarMatches, now, graceHours)
    : -1;

  // Nothing left to play (the sensors and the calendar both say so): show the
  // last match rather than an empty "next match" with a placeholder opponent.
  // An explicit choice -- "next" in the config, or the toggle -- still wins, and
  // so does a row inside its two-day window (a bye round that is the last row
  // stays on screen like any match, see recentUnplayedIndex below).
  const nothingLeftToPlay =
    hasCalendar &&
    nextMatchIndex === -1 &&
    findRecentUnplayedIndex(calendarMatches, now) === -1 &&
    !hasNextMatch &&
    hasLastScore &&
    !isLive &&
    manualView === null &&
    config.default_match_view !== "next";

  const defaultIsPostMatch = nothingLeftToPlay || computeIsPostMatch({
    defaultView: config.default_match_view || "auto",
    manualView,
    isLive,
    lastDate: entities.lastDate?.state,
    hasLastScore,
    hasLastMatch: hasLastMatchData,
    nextDate: nextDateState,
    hasNextMatch,
    nextIsStale:
      Boolean(entities.nextDate?.attributes?.is_stale) &&
      Date.parse(nextDateState) < Date.parse(entities.lastDate?.state),
    now,
  });

  // An unplayed match keeps the screen for two days after its planned date
  // (postponed or just without a score), unless a result is being shown or the
  // user explicitly requested "next" (via config or manual toggle).
  const recentUnplayedIndex =
    hasCalendar &&
    !isLive &&
    !defaultIsPostMatch &&
    manualView === null &&
    config.default_match_view !== "next" &&
    typeof matchIndex !== "number"
      ? findRecentUnplayedIndex(calendarMatches, now)
      : -1;
  // During a live match the card shows THAT match (the title, the badge and the
  // timer say so, and the toggle chevrons are hidden): a carousel selection
  // made before kick-off, or from the calendar popup, must not replace it.
  const effectiveMatchIndex =
    typeof matchIndex === "number" && !isLive
      ? matchIndex
      : recentUnplayedIndex !== -1
        ? recentUnplayedIndex
        : null;

  // Until the user steps through the carousel, the card shows the match the
  // last/next sensors describe -- which the integration picks by date. The
  // chevrons navigate from currentIndex, so it has to be that very match:
  // taking the calendar's first row without a score instead made "previous"
  // skip a past match whose result was missing, and "next" land on it.
  // Entities without a match number or a date matching a row (an older
  // integration) fall back to the calendar-only rule.
  const shownIndex = (sensorId) =>
    hasCalendar
      ? findCalendarIndex(calendarMatches, {
          matchNumber: entities[sensorId]?.attributes?.match_number,
          dateStr: entities[sensorId]?.state,
        })
      : -1;
  const pickIndex = (preferred, fallback) => (preferred !== -1 ? preferred : fallback);
  const shownLastIndex = shownIndex("lastDate");
  const shownNextIndex = shownIndex("nextDate");
  const lastSensorIndex = pickIndex(shownLastIndex, lastPlayedIndex);
  const nextSensorIndex = pickIndex(shownNextIndex, nextMatchIndex);
  const endOfSeasonIndex = hasCalendar ? findLatestCalendarIndex(calendarMatches) : 0;

  let currentIndex;
  if (typeof effectiveMatchIndex === "number" && hasCalendar) {
    currentIndex = Math.max(0, Math.min(effectiveMatchIndex, calendarMatches.length - 1));
  } else if (manualView === "last") {
    currentIndex = lastSensorIndex !== -1 ? lastSensorIndex : 0;
  } else if (manualView === "next") {
    currentIndex = nextSensorIndex !== -1 ? nextSensorIndex : endOfSeasonIndex;
  } else if (defaultIsPostMatch) {
    currentIndex = lastSensorIndex !== -1 ? lastSensorIndex : 0;
  } else {
    // Nothing left to play: stay at the chronological end of the season, like
    // the "next" toggle does, so "previous" still has somewhere to go.
    currentIndex = nextSensorIndex !== -1 ? nextSensorIndex : endOfSeasonIndex;
  }

  const isCarouselMatch = typeof effectiveMatchIndex === "number" && hasCalendar && Boolean(calendarMatches[currentIndex]);
  const currentCalMatch = isCarouselMatch ? calendarMatches[currentIndex] : null;

  const isPostMatch = currentCalMatch
    ? hasResult(currentCalMatch)
    : defaultIsPostMatch;

  const canToggleView = !isLive && (
    (hasCalendar && calendarMatches.length > 1) ||
    (hasLastMatchData && hasNextMatchData)
  );

  // The chevrons walk through the calendar by date (the list itself is in
  // round order), so the neighbours are looked up in time.
  const hasCalendarNav = hasCalendar && calendarMatches.length > 1;
  const chevronPrevIndex = hasCalendarNav
    ? chronologicalNeighbourIndex(calendarMatches, currentIndex, "prev")
    : -1;
  const chevronNextIndex = hasCalendarNav
    ? chronologicalNeighbourIndex(calendarMatches, currentIndex, "next")
    : -1;

  const canGoPrev = hasCalendarNav ? chevronPrevIndex !== -1 : !isPostMatch;

  const canGoNext = hasCalendarNav ? chevronNextIndex !== -1 : isPostMatch;

  const isGameDay = !isPostMatch && !isLive && (
    currentCalMatch
      ? Boolean(currentCalMatch.date && isToday(currentCalMatch.date, now))
      : (hasNextMatch && isToday(nextDateState, now))
  );

  const officialTeamName = entities.poule?.attributes?.team || "";
  const configuredTeamName = config.custom_team_name?.trim();
  const teamName = configuredTeamName || officialTeamName || t("card.unknown_team", "My team");

  let isHome;
  let opponentName;
  let opponentSearchName;
  let teamLogoUrl;
  let opponentLogoUrl;
  let leftUrl;
  let rightUrl;
  // The opponent's team page address when the match data itself gives it
  // (never taken from the standings by name): used to find its rank.
  let opponentDirectUrl;
  let gymName;
  let gymCity;
  let gymAddress;
  let targetDateStr;
  let roundNumber;
  let isStale;
  let isExempt;

  const currentOpponentSensor = isPostMatch ? entities.lastOpponent : entities.nextOpponent;
  const rawOpponent = currentOpponentSensor?.state;

  if (currentCalMatch) {
    const homeName = currentCalMatch.home_team || "";
    const awayName = currentCalMatch.away_team || "";
    const rowTeamMatcher = createTeamMatcher([homeName, awayName], officialTeamName || teamName);
    const { isHomeMyTeam } = calendarRowSides(currentCalMatch, rowTeamMatcher);

    isHome = isHomeMyTeam;
    opponentName = isHome ? awayName : homeName;
    opponentSearchName = opponentName;

    // The next/last opponent sensors describe the *next/last* match, not
    // necessarily the one the carousel is showing. Resolve each side by team
    // name (match logo -> sensor if the name matches -> standings) so a
    // carousel row never inherits another opponent's logo.
    const sensorAttrs = (id) => entities[id]?.attributes;
    const myTeamSensorLogo =
      sensorAttrs("nextOpponent")?.team_logo_url ||
      sensorAttrs("lastOpponent")?.team_logo_url ||
      sensorAttrs("nextDate")?.team_logo_url ||
      sensorAttrs("lastDate")?.team_logo_url ||
      null;
    const standingsForLogos = entities.rank?.attributes?.standings;
    // When the carousel is showing exactly the match the opponent sensor
    // describes (the next one, or the last played one), that sensor's
    // opponent logo is authoritative even if the team names are spelled
    // differently between the calendar and the sensor.
    const sensorIsThisMatch = isPostMatch
      ? currentIndex === lastSensorIndex
      : currentIndex === nextSensorIndex;
    const sensorOpponentLogo = sensorIsThisMatch
      ? sanitizeUrl(currentOpponentSensor?.attributes?.opponent_logo_url)
      : null;
    const resolveSide = (name, matchLogo, isMyTeam) => {
      const resolved = resolveCalendarTeamLogo({
        teamName: name,
        matchLogo,
        isMyTeam,
        myTeamLogo: myTeamSensorLogo,
        nextOpponentState: entities.nextOpponent?.state,
        nextOpponentLogo: sensorAttrs("nextOpponent")?.opponent_logo_url,
        lastOpponentState: entities.lastOpponent?.state,
        lastOpponentLogo: sensorAttrs("lastOpponent")?.opponent_logo_url,
        standings: standingsForLogos,
      });
      if (resolved === DEFAULT_FALLBACK_LOGO && !isMyTeam && !isByeTeamName(name) && sensorOpponentLogo) {
        return sensorOpponentLogo;
      }
      return resolved;
    };

    const homeCalLogo = resolveSide(
      homeName,
      currentCalMatch.home_logo || currentCalMatch.home_team_logo,
      isHome,
    );
    const awayCalLogo = resolveSide(
      awayName,
      currentCalMatch.away_logo || currentCalMatch.away_team_logo,
      !isHome,
    );

    teamLogoUrl = isHome ? homeCalLogo : awayCalLogo;
    opponentLogoUrl = isHome ? awayCalLogo : homeCalLogo;

    // Calendar rows carry no team URLs, so resolve each side like the logos:
    // explicit row URL -> my team's sensor URL -> the opponent sensor URL
    // (only when it describes this very match, or its name matches) ->
    // standings lookup by team name.
    const sameTeam = (a, b) => !isByeTeamName(a) && !isByeTeamName(b) && teamNamesMatch(a, b);
    const resolveSideUrl = (name, rowUrl, isMyTeam) => {
      if (!isMyTeam && isByeTeamName(name)) {
        return null;
      }
      const direct = sanitizeUrl(rowUrl);
      if (direct) {
        return direct;
      }
      if (isMyTeam) {
        return findTeamUrl({
          isHome: true,
          teamName: officialTeamName || teamName,
          entities,
          opponentSensor: currentOpponentSensor,
          selectedEntity,
        });
      }
      if (sensorIsThisMatch) {
        const fromSensor = sanitizeUrl(currentOpponentSensor?.attributes?.opponent_url);
        if (fromSensor) {
          return fromSensor;
        }
      }
      for (const sensor of [entities.nextOpponent, entities.lastOpponent]) {
        if (sameTeam(sensor?.state, name)) {
          const u = sanitizeUrl(sensor?.attributes?.opponent_url);
          if (u) {
            return u;
          }
        }
      }
      return findUrlInStandings(name, standingsForLogos, ["team_url", "url", "link"]);
    };

    leftUrl = resolveSideUrl(homeName, currentCalMatch.home_url, isHome);
    rightUrl = resolveSideUrl(awayName, currentCalMatch.away_url, !isHome);

    opponentDirectUrl =
      sanitizeUrl(isHome ? currentCalMatch.away_url : currentCalMatch.home_url) ||
      (sensorIsThisMatch ? sanitizeUrl(currentOpponentSensor?.attributes?.opponent_url) : null) ||
      [entities.nextOpponent, entities.lastOpponent]
        .map((sensor) => (sameTeam(sensor?.state, opponentName) ? sanitizeUrl(sensor?.attributes?.opponent_url) : null))
        .find(Boolean) ||
      null;

    gymName = currentCalMatch.gym_name || "";
    gymCity = currentCalMatch.gym_city || "";
    gymAddress = currentCalMatch.formatted_address || "";
    targetDateStr = currentCalMatch.date ?? currentCalMatch.datetime ?? null;
    roundNumber = String(currentCalMatch.round ?? "");
    isStale = Boolean(currentCalMatch.is_stale);
    isExempt = Boolean(currentCalMatch.is_exempt);
  } else {
    opponentName = isValidState(rawOpponent) ? rawOpponent : t("card.unknown_opponent", "Opponent");
    opponentSearchName = isValidState(rawOpponent) ? rawOpponent : "";

    isHome = isPostMatch
      ? (entities.lastScore?.attributes?.is_home ?? entities.lastDate?.attributes?.is_home ?? true)
      : (entities.nextVenue?.state === "home" || entities.nextOpponent?.attributes?.is_home === true);

    teamLogoUrl = sanitizeUrl(currentOpponentSensor?.attributes?.team_logo_url) || DEFAULT_FALLBACK_LOGO;
    opponentLogoUrl = sanitizeUrl(currentOpponentSensor?.attributes?.opponent_logo_url) || DEFAULT_FALLBACK_LOGO;

    const searchTeamName = officialTeamName || teamName;
    const leftMatchName = isHome ? searchTeamName : opponentSearchName;
    const rightMatchName = isHome ? opponentSearchName : searchTeamName;

    leftUrl = findTeamUrl({
      isHome,
      teamName: leftMatchName,
      entities,
      opponentSensor: currentOpponentSensor,
      selectedEntity,
    });
    rightUrl = findTeamUrl({
      isHome: !isHome,
      teamName: rightMatchName,
      entities,
      opponentSensor: currentOpponentSensor,
      selectedEntity,
    });

    opponentDirectUrl =
      sanitizeUrl(currentOpponentSensor?.attributes?.opponent_url) ||
      sanitizeUrl(currentOpponentSensor?.attributes?.opponent_team_url) ||
      null;

    roundNumber = isPostMatch
      ? (entities.lastDate?.attributes?.round || "")
      : (entities.nextDate?.attributes?.round || "");

    // The venue must belong to the match on screen: a "last match" card used
    // to show the venue of the NEXT match (it always read the next-match
    // sensors), e.g. a home win drawn next to an away gym.
    if (isPostMatch) {
      gymName = entities.lastDate?.attributes?.gym_name || "";
      gymCity = entities.lastDate?.attributes?.gym_city || "";
      gymAddress = entities.lastDate?.attributes?.formatted_address || "";
    } else {
      gymName = entities.nextLocation?.attributes?.gym_name || entities.nextOpponent?.attributes?.gym_name || "";
      gymCity = entities.nextLocation?.attributes?.gym_city || entities.nextOpponent?.attributes?.gym_city || "";
      gymAddress =
        entities.nextLocation?.attributes?.formatted_address ||
        entities.nextOpponent?.attributes?.formatted_address ||
        "";
    }
    targetDateStr = isPostMatch ? entities.lastDate?.state : entities.nextDate?.state;
    isStale = Boolean(entities.nextDate?.attributes?.is_stale);
    isExempt = !isPostMatch && Boolean(entities.nextDate?.attributes?.is_exempt);
  }

  // A bye round has no opposing team: show a translated "Exempt" instead of
  // the integration's placeholder name, and strip any rank/link/entity tied to
  // the placeholder opponent.
  if (isExempt) {
    opponentName = t("card.exempt", "Bye");
    opponentSearchName = "";
    opponentDirectUrl = null;
    if (isHome) {
      rightUrl = null;
    } else {
      leftUrl = null;
    }
  }

  const leftName = isHome ? teamName : opponentName;
  const rightName = isHome ? opponentName : teamName;
  const leftLogo = isHome ? teamLogoUrl : opponentLogoUrl;
  const rightLogo = isHome ? opponentLogoUrl : teamLogoUrl;
  const searchTeamName = officialTeamName || teamName;
  const leftMatchName = isHome ? searchTeamName : opponentSearchName;
  const rightMatchName = isHome ? opponentSearchName : searchTeamName;

  const opponentEntityId = isExempt ? null : currentOpponentSensor?.entity_id;
  const leftEntityId = isHome ? config.entity : opponentEntityId;
  const rightEntityId = isHome ? opponentEntityId : config.entity;

  const competition = validStateOrEmpty(entities.poule?.attributes?.competition);
  const pouleName = validStateOrEmpty(entities.poule?.state);

  const dateFormatted = formatDate(targetDateStr, locale || lang, { hour12 });
  // The sensor writes its letters in the instance's language; show them in the
  // card's (a French "D-V-V-V" reads "L-W-W-W" in an English card).
  const cardFormLetters = {
    win: t("card.form_letter_win", "W"),
    loss: t("card.form_letter_loss", "L"),
    draw: t("card.form_letter_draw", "D"),
  };
  const formStreak = localizeFormStreak(
    entities.form?.attributes?.current_streak || "",
    instanceLanguage,
    cardFormLetters,
  );
  const rawFormSequence = entities.form?.state;
  const formSequence = isValidState(rawFormSequence)
    ? localizeFormSequence(rawFormSequence, instanceLanguage, cardFormLetters)
    : rawFormSequence;
  const hasValidForm = isValidState(formSequence);

  const displayFormSequence = hasValidForm
    ? formSequence
    : (isPreview ? localizeFormSequence("V-V-D-V-N", "fr", cardFormLetters) : "");
  const displayFormStreak = hasValidForm
    ? formStreak
    : (isPreview ? localizeFormStreak("2V", "fr", cardFormLetters) : "");
  const showFormBlock = config.show_form && (hasValidForm || isPreview);

  // The venue row exists only for matches whose gym is known, which made the
  // card grow and shrink as the matches changed. When the calendar knows a gym
  // for any match, the row keeps its place (empty) for the others, so the card
  // keeps one height. With no gym anywhere there is nothing to hold a place for.
  const reserveVenueRow =
    Boolean(config.show_venue) &&
    hasCalendar &&
    calendarMatches.some((m) => m && (m.gym_name || m.gym_city));

  const showTitle = config.show_title !== false;
  const configuredTitle = config.title?.trim();
  let defaultTitle = t("card.default_title", "Next match");
  if (isLive) {
    defaultTitle = t("card.live_title", "Live match");
  } else if (isPostMatch) {
    // Only the most recent played match is "the last match"; any older one
    // browsed with the chevrons is just a played match.
    const isOlderPlayedMatch =
      Boolean(currentCalMatch) && lastPlayedIndex !== -1 && currentIndex !== lastPlayedIndex;
    defaultTitle = isOlderPlayedMatch
      ? t("card.played_title", "Played match")
      : t("card.last_title", "Last match");
  } else if (isExempt) {
    defaultTitle = t("card.exempt_title", "Bye week");
  } else if (isStale) {
    defaultTitle = t("card.postponed_title", "Postponed match");
  }
  // A custom title is shown as a PREFIX in front of the dynamic status
  // ("Next match" / "Live match" / "Last match"), the same way a custom
  // standings_title is a prefix in front of the pool name below -- instead
  // of replacing it outright and losing that live-status information.
  const titleText = configuredTitle ? `${configuredTitle} • ${defaultTitle}` : defaultTitle;
  const titleIcon = config.icon !== undefined ? config.icon : "mdi:basketball";
  const logoSizeClass = `logo-box-${config.logo_size || "medium"}`;

  // Which card(s) the person wants to see: the match card, the standings
  // card, or both (default). Each card keeps its own title/icon below --
  // this only decides whether it is rendered at all.
  const displayMode = resolveDisplayMode(config);
  const configuredStandingsTitle = config.standings_title?.trim();
  const standingsTitle = configuredStandingsTitle || t("card.standings_title", "Standings");
  const standingsIcon = config.standings_icon !== undefined ? config.standings_icon : "mdi:format-list-numbered";

  const showRank = config.show_rank !== false;
  const rawUserRank = entities.rank?.state;
  const userRankNum = isValidState(rawUserRank) ? rawUserRank : null;
  const opponentRankNum = isExempt
    ? null
    : findOpponentRank(opponentSearchName, entities.rank?.attributes?.standings, {
        opponentUrl: opponentDirectUrl,
      });

  const userRankFormatted = formatRank(userRankNum, lang);
  const opponentRankFormatted = formatRank(opponentRankNum, lang);

  let leftRank = isHome ? userRankFormatted : opponentRankFormatted;
  let rightRank = isHome ? opponentRankFormatted : userRankFormatted;

  if (isPreview && showRank) {
    if (!leftRank && (isHome || !isExempt)) {
      leftRank = isHome ? formatRank(2, lang) : formatRank(5, lang);
    }
    if (!rightRank && (!isHome || !isExempt)) {
      rightRank = isHome ? formatRank(5, lang) : formatRank(2, lang);
    }
  }

  // A past match still waiting for its result is shown with a "result
  // pending" badge instead of as an upcoming one (including past D+2 before
  // any carousel navigation, when nextDate still points to that calendar row).
  // A match the integration already flags as stale keeps its existing
  // "postponed" badge.
  const pendingCandidate =
    currentCalMatch ||
    (!isPostMatch && shownNextIndex !== -1 ? calendarMatches[shownNextIndex] : null);
  const isResultPending =
    Boolean(pendingCandidate) &&
    !isPostMatch &&
    !isLive &&
    !isStale &&
    !isExempt &&
    isPendingResult(pendingCandidate, now, graceHours);

  const isCalendarClickable = !isLive && !isPostMatch && !isResultPending && !isExempt && Boolean(targetDateStr);
  const isLogoClickable = config.logo_click_action && config.logo_click_action !== "none";
  const hasStandingsData = Array.isArray(entities.rank?.attributes?.standings) && entities.rank.attributes.standings.length > 0;
  const accentColor = resolveAccentColor(config);

  // Calendar rows carry "home - away"; the sensor carries "ours - theirs".
  // The last score / last result sensors describe the LAST played match. They
  // are only trusted when no calendar row is shown (legacy setups) or when the
  // row on screen is the exact match those sensors describe, never for another
  // match of the carousel.
  const sensorDescribesShownMatch =
    !currentCalMatch || (isPostMatch && currentIndex === lastSensorIndex);
  const sensorScore = sensorDescribesShownMatch && isValidState(entities.lastScore?.state)
    ? sensorScoreToHomeAway(entities.lastScore.state, entities.lastScore.attributes, isHome)
    : null;
  const displayedScore = formatRowScore(currentCalMatch) || sensorScore || "-";
  const asResult = (v) => (RESULT_VALUES.includes(v) ? v : null);
  const displayedResult =
    asResult(currentCalMatch?.result) ||
    (sensorDescribesShownMatch ? asResult(entities.lastResult?.state) : null);
  const scoreParts = splitScore(displayedScore, isHome);

  return {
    isValidState,
    isLive,
    lastScoreState,
    hasLastScore,
    nextDateState,
    hasNextMatch,
    hasLastMatchData,
    hasNextMatchData,
    canToggleView,
    canGoPrev,
    canGoNext,
    chevronPrevIndex,
    chevronNextIndex,
    currentIndex,
    hasCalendar,
    calendarMatches,
    displayedScore,
    displayedResult,
    scoreParts,
    isPostMatch,
    isGameDay,
    currentOpponentSensor,
    officialTeamName,
    configuredTeamName,
    teamName,
    rawOpponent,
    opponentName,
    opponentSearchName,
    isHome,
    teamLogoUrl,
    opponentLogoUrl,
    leftName,
    rightName,
    leftLogo,
    rightLogo,
    searchTeamName,
    leftMatchName,
    rightMatchName,
    leftUrl,
    rightUrl,
    leftEntityId,
    rightEntityId,
    competition,
    pouleName,
    roundNumber,
    gymName,
    gymCity,
    gymAddress,
    targetDateStr,
    dateFormatted,
    formStreak,
    formSequence,
    hasValidForm,
    isPreview,
    displayFormSequence,
    displayFormStreak,
    showFormBlock,
    reserveVenueRow,
    showTitle,
    configuredTitle,
    titleText,
    titleIcon,
    displayMode,
    standingsTitle,
    standingsIcon,
    logoSizeClass,
    showRank,
    rawUserRank,
    userRankNum,
    opponentRankNum,
    userRankFormatted,
    opponentRankFormatted,
    leftRank,
    rightRank,
    isCalendarClickable,
    isLogoClickable,
    hasStandingsData,
    accentColor,
    isStale,
    isExempt,
    isResultPending,
  };
}