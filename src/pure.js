// Pure, side-effect-free helpers extracted from FFBBCard.
//
// These don't touch `this`, `hass`, or the DOM, so they're plain functions
// that can be unit-tested directly (see pure.test.js) instead of only being
// exercised indirectly through render(). Anything that needs `this.hass` or
// `this._config` takes it as an explicit argument instead.

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
 * Resolve every FFBB Tracker sensor belonging to one team from a single
 * configured entity_id, by deriving the shared entity-id prefix and
 * probing both French and English suffix variants (the integration's
 * entity_id slugs follow the language the entities were created under).
 * Returns null if `selected` or `states` is falsy.
 *
 * `states` is `hass.states` resolved by the caller; this stays pure by
 * taking it as a plain object instead of reading `this.hass`.
 */
export function resolveEntities(selected, states) {
  if (!selected || !states) {
    return null;
  }

  const matched = selected.match(
    /^(sensor|binary_sensor)\.([a-z0-9_]+?)_(prochain_match|next_match|dernier_match|last_match|classement|rank|poule|forme_recente|form|game_day|jour_de_match|match_en_cours|match_in_progress)/
  );
  const prefix = matched ? `sensor.${matched[2]}_` : selected.substring(0, selected.lastIndexOf("_") + 1);
  const binPrefix = matched ? `binary_sensor.${matched[2]}_` : prefix.replace("sensor.", "binary_sensor.");

  const findState = (keys) => {
    for (const k of keys) {
      if (states[k]) {
        return states[k];
      }
    }
    return null;
  };

  return {
    nextOpponent: findState([`${prefix}prochain_match_adversaire`, `${prefix}next_match_opponent`]),
    nextDate: findState([`${prefix}prochain_match_date`, `${prefix}next_match_date`]),
    nextLocation: findState([`${prefix}prochain_match_lieu`, `${prefix}next_match_location`]),
    nextVenue: findState([`${prefix}prochain_match_terrain`, `${prefix}next_match_venue_type`]),
    lastScore: findState([`${prefix}dernier_match_score`, `${prefix}last_match_score`]),
    lastOpponent: findState([`${prefix}dernier_match_adversaire`, `${prefix}last_match_opponent`]),
    lastResult: findState([`${prefix}dernier_match_resultat`, `${prefix}last_match_result`]),
    lastDate: findState([`${prefix}dernier_match_date`, `${prefix}last_match_date`]),
    poule: findState([`${prefix}poule`]),
    rank: findState([`${prefix}classement`, `${prefix}rank`]),
    rankEvolution: findState([`${prefix}classement_evolution`, `${prefix}rank_evolution`]),
    form: findState([`${prefix}forme_recente`, `${prefix}form`]),
    matchInProgress: findState([`${binPrefix}match_en_cours`, `${binPrefix}match_in_progress`]),
  };
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
export function createTeamMatcher(names, targetName) {
  const targetClean = cleanForMatch(targetName || "");
  if (!targetClean) {
    return () => false;
  }
  const hasExact = (Array.isArray(names) ? names : []).some((n) => {
    const c = cleanForMatch(n || "");
    return Boolean(c) && c === targetClean;
  });
  return (name) => {
    const c = cleanForMatch(name || "");
    if (!c) {
      return false;
    }
    if (hasExact) {
      return c === targetClean;
    }
    return c.includes(targetClean) || targetClean.includes(c);
  };
}

/**
 * Find an opponent's position in a standings table.
 * Strictly prioritizes an exact match before falling back to substring inclusion.
 * Returns null if there's no name, no standings array, or no valid match.
 */
export function findOpponentRank(opponentName, standings) {
  if (!opponentName || !Array.isArray(standings)) {
    return null;
  }
  const oppClean = cleanForMatch(opponentName);
  if (!oppClean) {
    return null;
  }

  // 1. Strict exact equality pass
  let found = standings.find((item) => {
    if (!item) return false;
    const team = item.team_name || item.name;
    const itemClean = cleanForMatch(team);
    return Boolean(itemClean && itemClean === oppClean);
  });

  // 2. Substring fallback pass
  if (!found) {
    found = standings.find((item) => {
      if (!item) return false;
      const team = item.team_name || item.name;
      const itemClean = cleanForMatch(team);
      return Boolean(itemClean && (itemClean.includes(oppClean) || oppClean.includes(itemClean)));
    });
  }

  return found ? found.position : null;
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
 * Find a team's url-ish attribute by fuzzy name match against a standings
 * array, trying each key in `urlKeys` in order on the matched row.
 * Strictly prioritizes exact match before substring inclusion.
 * Returns null if there's no standings array, no match, or none of
 * urlKeys resolves to a safe URL (see sanitizeUrl).
 */
export function findUrlInStandings(teamName, standings, urlKeys) {
  if (!Array.isArray(standings)) {
    return null;
  }
  const targetClean = cleanForMatch(teamName);
  if (!targetClean) {
    return null;
  }

  // 1. Strict exact equality pass
  let match = standings.find((item) => {
    const itemClean = cleanForMatch(item?.team_name || item?.name || "");
    return Boolean(itemClean && itemClean === targetClean);
  });

  // 2. Substring fallback pass
  if (!match) {
    match = standings.find((item) => {
      const itemClean = cleanForMatch(item?.team_name || item?.name || "");
      return Boolean(itemClean && (itemClean.includes(targetClean) || targetClean.includes(itemClean)));
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
export function extractCalendarMatches(entities, configuredEntity) {
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
 * Resolve a raw URL-ish attribute value into a safe absolute http(s) URL.
 */
export function sanitizeUrl(u) {
  if (!u || typeof u !== "string") {
    return null;
  }
  const trimmed = u.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
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
  if (defaultView === "last") {
    if (!hasLastScore) {
      return false;
    }
    if (hasNextMatch && isAtOrAfterDMinusOne(nextDate, now)) {
      return false;
    }
    return true;
  }

  if (hasLastScore && isWithinDPlusOne(lastDate, now)) {
    return true;
  }
  return false;
}

/**
 * Sort standings array numerically by position (or rank) ascending.
 */
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
  return null; // no CSS engine available (e.g. plain Node): caller falls back to a pattern
}

const COLOR_PATTERN =
  /^(#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|(rgb|rgba|hsl|hsla)\(\s*[\d.]+\%?(deg)?\s*[,\s]\s*[\d.]+\%?\s*[,\s]\s*[\d.]+\%?(\s*[,/]\s*[\d.]+\%?)?\s*\))$/i;

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
    // Invalid language tag: fall back to 24-hour, the least ambiguous format.
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

  const weekday = d.toLocaleDateString(lang, { weekday: "short" });
  const day = d.toLocaleDateString(lang, { day: "numeric", month: "short" });
  const timeOptions =
    typeof hour12 === "boolean"
      ? { hour: hour12 ? "numeric" : "2-digit", minute: "2-digit", hourCycle: hour12 ? "h12" : "h23" }
      : { hour: "2-digit", minute: "2-digit" };
  const time = d.toLocaleTimeString(lang, timeOptions);

  return { weekday, day, time };
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
      "url_equipe",
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
      const found = searchAttrs(ent?.attributes, ["team_url", "url_equipe", "team_link"]);
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
      "url_adversaire",
    ]);
    if (directOppUrl) return directOppUrl;

    const standings = entities?.rank?.attributes?.standings || selectedEntity?.attributes?.standings;
    const foundInStandings = findUrlInStandings(teamName, standings, ["team_url", "url", "link"]);
    if (foundInStandings) return foundInStandings;
  }

  return null;
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
  // Full locale (e.g. "en-GB") and 12/24h choice used ONLY for dates and times;
  // `lang` (2 letters) keeps driving translations and ordinals.
  locale = null,
  hour12 = undefined,
  t = (k, fallback = "") => fallback,
  isPreview = false,
  now = new Date(),
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

  let lastPlayedIndex = -1;
  let nextMatchIndex = -1;
  if (hasCalendar) {
    for (let i = calendarMatches.length - 1; i >= 0; i--) {
      if (calendarMatches[i].is_played || calendarMatches[i].score) {
        lastPlayedIndex = i;
        break;
      }
    }
    nextMatchIndex = calendarMatches.findIndex((m) => !m.is_played && !m.score);
  }

  const defaultIsPostMatch = computeIsPostMatch({
    defaultView: config.default_match_view || "auto",
    manualView,
    isLive,
    lastDate: entities.lastDate?.state,
    hasLastScore,
    hasLastMatch: hasLastMatchData,
    nextDate: nextDateState,
    hasNextMatch,
    now,
  });

  let currentIndex = 0;
  if (typeof matchIndex === "number" && hasCalendar) {
    currentIndex = Math.max(0, Math.min(matchIndex, calendarMatches.length - 1));
  } else if (manualView === "last") {
    currentIndex = lastPlayedIndex !== -1 ? lastPlayedIndex : 0;
  } else if (manualView === "next") {
    currentIndex = nextMatchIndex !== -1 ? nextMatchIndex : Math.max(0, calendarMatches.length - 1);
  } else {
    if (defaultIsPostMatch) {
      currentIndex = lastPlayedIndex !== -1 ? lastPlayedIndex : 0;
    } else {
      currentIndex = nextMatchIndex !== -1 ? nextMatchIndex : 0;
    }
  }

  const isCarouselMatch = typeof matchIndex === "number" && hasCalendar && Boolean(calendarMatches[currentIndex]);
  const currentCalMatch = isCarouselMatch ? calendarMatches[currentIndex] : null;

  const isPostMatch = currentCalMatch
    ? Boolean(currentCalMatch.is_played || currentCalMatch.score)
    : defaultIsPostMatch;

  const canToggleView = !isLive && (
    (hasCalendar && calendarMatches.length > 1) ||
    (hasLastMatchData && hasNextMatchData)
  );

  const canGoPrev = hasCalendar && calendarMatches.length > 1
    ? currentIndex > 0
    : !isPostMatch;

  const canGoNext = hasCalendar && calendarMatches.length > 1
    ? currentIndex < calendarMatches.length - 1
    : isPostMatch;

  const isGameDay = !isPostMatch && !isLive && (
    currentCalMatch
      ? Boolean(currentCalMatch.date && isToday(currentCalMatch.date, now))
      : (hasNextMatch && isToday(nextDateState, now))
  );

  const officialTeamName = entities.poule?.attributes?.team || "";
  const configuredTeamName = config.custom_team_name?.trim();
  const teamName = configuredTeamName || officialTeamName || t("card.unknown_team", "My team");

  let isHome = true;
  let opponentName = t("card.unknown_opponent", "Opponent");
  let opponentSearchName = "";
  let teamLogoUrl = DEFAULT_FALLBACK_LOGO;
  let opponentLogoUrl = DEFAULT_FALLBACK_LOGO;
  let leftUrl = null;
  let rightUrl = null;
  let gymName = "";
  let gymCity = "";
  let targetDateStr = null;
  let roundNumber = "";
  let isStale = false;

  const currentOpponentSensor = isPostMatch ? entities.lastOpponent : entities.nextOpponent;
  const rawOpponent = currentOpponentSensor?.state;

  if (currentCalMatch) {
    const homeName = currentCalMatch.home_team || "";
    const awayName = currentCalMatch.away_team || "";
    const isOfficialHome = currentCalMatch.is_home !== undefined
      ? currentCalMatch.is_home
      : (cleanForMatch(homeName) === cleanForMatch(officialTeamName || teamName));

    isHome = isOfficialHome;
    opponentName = isHome ? awayName : homeName;
    opponentSearchName = opponentName;

    teamLogoUrl = isHome
      ? (currentCalMatch.home_logo || currentOpponentSensor?.attributes?.team_logo_url || DEFAULT_FALLBACK_LOGO)
      : (currentCalMatch.away_logo || currentOpponentSensor?.attributes?.team_logo_url || DEFAULT_FALLBACK_LOGO);

    opponentLogoUrl = isHome
      ? (currentCalMatch.away_logo || currentOpponentSensor?.attributes?.opponent_logo_url || DEFAULT_FALLBACK_LOGO)
      : (currentCalMatch.home_logo || currentOpponentSensor?.attributes?.opponent_logo_url || DEFAULT_FALLBACK_LOGO);

    // Left is always the home team and Right is always the away team.
    leftUrl = sanitizeUrl(currentCalMatch.home_url);
    rightUrl = sanitizeUrl(currentCalMatch.away_url);

    gymName = currentCalMatch.gym_name || "";
    gymCity = currentCalMatch.gym_city || "";
    targetDateStr = currentCalMatch.date || null;
    roundNumber = String(currentCalMatch.round ?? currentCalMatch.journee ?? "");
    isStale = Boolean(currentCalMatch.is_stale);
  } else {
    opponentName = isValidState(rawOpponent) ? rawOpponent : t("card.unknown_opponent", "Opponent");
    opponentSearchName = isValidState(rawOpponent) ? rawOpponent : "";

    isHome = isPostMatch
      ? (entities.lastScore?.attributes?.is_home ?? entities.lastDate?.attributes?.is_home ?? true)
      : (entities.nextVenue?.state === "home" || entities.nextOpponent?.attributes?.is_home === true);

    teamLogoUrl = currentOpponentSensor?.attributes?.team_logo_url || DEFAULT_FALLBACK_LOGO;
    opponentLogoUrl = currentOpponentSensor?.attributes?.opponent_logo_url || DEFAULT_FALLBACK_LOGO;

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

    roundNumber = isPostMatch
      ? (entities.lastDate?.attributes?.round || "")
      : (entities.nextDate?.attributes?.round || "");

    gymName = entities.nextLocation?.attributes?.gym_name || entities.nextOpponent?.attributes?.gym_name || "";
    gymCity = entities.nextLocation?.attributes?.gym_city || entities.nextOpponent?.attributes?.gym_city || "";
    targetDateStr = isPostMatch ? entities.lastDate?.state : entities.nextDate?.state;
    isStale = Boolean(entities.nextDate?.attributes?.is_stale);
  }

  const leftName = isHome ? teamName : opponentName;
  const rightName = isHome ? opponentName : teamName;
  const leftLogo = isHome ? teamLogoUrl : opponentLogoUrl;
  const rightLogo = isHome ? opponentLogoUrl : teamLogoUrl;
  const searchTeamName = officialTeamName || teamName;
  const leftMatchName = isHome ? searchTeamName : opponentSearchName;
  const rightMatchName = isHome ? opponentSearchName : searchTeamName;

  const leftEntityId = isHome ? config.entity : currentOpponentSensor?.entity_id;
  const rightEntityId = isHome ? currentOpponentSensor?.entity_id : config.entity;

  const competition = entities.poule?.attributes?.competition || "";
  const pouleName = entities.poule?.state || "";

  const dateFormatted = formatDate(targetDateStr, locale || lang, { hour12 });
  const formStreak = entities.form?.attributes?.current_streak || "";
  const formSequence = entities.form?.state;
  const hasValidForm = isValidState(formSequence);

  // Form letters are always French (V = win, D = loss, N = draw), see the form modal.
  const displayFormSequence = hasValidForm ? formSequence : (isPreview ? "V-V-D-V-N" : "");
  const displayFormStreak = hasValidForm ? formStreak : (isPreview ? "2V" : "");
  const showFormBlock = config.show_form && (hasValidForm || isPreview);

  const showTitle = config.show_title !== false;
  const configuredTitle = config.title?.trim();
  let defaultTitle = t("card.default_title", "Next match");
  if (isLive) {
    defaultTitle = t("card.live_title", "Live match");
  } else if (isPostMatch) {
    defaultTitle = t("card.last_title", "Last match");
  }
  const titleText = configuredTitle || defaultTitle;
  const titleIcon = config.icon !== undefined ? config.icon : "mdi:basketball";
  const logoSizeClass = `logo-box-${config.logo_size || "medium"}`;

  const showRank = config.show_rank !== false;
  const rawUserRank = entities.rank?.state;
  const userRankNum = isValidState(rawUserRank) ? rawUserRank : null;
  const opponentRankNum = findOpponentRank(opponentSearchName, entities.rank?.attributes?.standings);

  const userRankFormatted = formatRank(userRankNum, lang);
  const opponentRankFormatted = formatRank(opponentRankNum, lang);

  let leftRank = isHome ? userRankFormatted : opponentRankFormatted;
  let rightRank = isHome ? opponentRankFormatted : userRankFormatted;

  if (isPreview && showRank) {
    if (!leftRank) {
      leftRank = isHome ? formatRank(2, lang) : formatRank(5, lang);
    }
    if (!rightRank) {
      rightRank = isHome ? formatRank(5, lang) : formatRank(2, lang);
    }
  }

  const isCalendarClickable = !isLive && !isPostMatch && Boolean(targetDateStr);
  const isLogoClickable = config.logo_click_action && config.logo_click_action !== "none";
  const hasStandingsData = Array.isArray(entities.rank?.attributes?.standings) && entities.rank.attributes.standings.length > 0;
  const accentColor = resolveAccentColor(config);

  const displayedScore = currentCalMatch?.score || entities.lastScore?.state || "-";
  const displayedResult = currentCalMatch?.result || entities.lastResult?.state || "draw";

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
    currentIndex,
    hasCalendar,
    calendarMatches,
    displayedScore,
    displayedResult,
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
    targetDateStr,
    dateFormatted,
    formStreak,
    formSequence,
    hasValidForm,
    isPreview,
    displayFormSequence,
    displayFormStreak,
    showFormBlock,
    showTitle,
    configuredTitle,
    titleText,
    titleIcon,
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
  };
}
