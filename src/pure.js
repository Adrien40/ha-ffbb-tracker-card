// Pure, side-effect-free helpers extracted from FFBBCard.
//
// These don't touch `this`, `hass`, or the DOM, so they're plain functions
// that can be unit-tested directly (see pure.test.js) instead of only being
// exercised indirectly through render(). Anything that needs `this.hass` or
// `this._config` takes it as an explicit argument instead.

export const DEFAULT_FALLBACK_LOGO =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23ff6b00'/><circle cx='50' cy='50' r='46' stroke='%23ffffff' stroke-width='4' fill='none'/><line x1='50' y1='4' x2='50' y2='96' stroke='%23ffffff' stroke-width='4'/><line x1='4' y1='50' x2='96' y2='50' stroke='%23ffffff' stroke-width='4'/><path d='M17,17 Q50,50 17,83' stroke='%23ffffff' stroke-width='4' fill='none'/><path d='M83,17 Q50,50 83,83' stroke='%23ffffff' stroke-width='4' fill='none'/></svg>";

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

/**
 * Resolve theme, custom HEX, or default basketball accent color from configuration.
 */
export function resolveAccentColor(config) {
  const mode = config?.accent_color || "default";
  if (mode === "theme") {
    return "var(--primary-color)";
  }
  if (mode === "custom" && config?.custom_accent_color?.trim()) {
    return config.custom_accent_color.trim();
  }
  return "#ff6b00";
}

/**
 * Format a match date string into weekday, day/month, and 24h time parts.
 */
export function formatDate(dateStr, lang = "en-US") {
  if (!dateStr || dateStr === "unknown" || dateStr === "unavailable") {
    return null;
  }
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    return null;
  }

  const weekday = d.toLocaleDateString(lang, { weekday: "short" });
  const day = d.toLocaleDateString(lang, { day: "numeric", month: "short" });
  const time = d.toLocaleTimeString(lang, { hour: "2-digit", minute: "2-digit" });

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
  states = {},
  lang = "fr",
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
  const canToggleView = !isLive && hasLastMatchData && hasNextMatchData;

  const isPostMatch = computeIsPostMatch({
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

  const isGameDay = !isPostMatch && !isLive && hasNextMatch && isToday(nextDateState, now);

  const currentOpponentSensor = isPostMatch ? entities.lastOpponent : entities.nextOpponent;
  const officialTeamName = entities.poule?.attributes?.team || "";
  const configuredTeamName = config.custom_team_name?.trim();
  const teamName = configuredTeamName || officialTeamName || t("card.unknown_team", "My team");

  const rawOpponent = currentOpponentSensor?.state;
  const opponentName = isValidState(rawOpponent) ? rawOpponent : t("card.unknown_opponent", "Opponent");
  const opponentSearchName = isValidState(rawOpponent) ? rawOpponent : "";

  const isHome = isPostMatch
    ? (entities.lastScore?.attributes?.is_home ?? entities.lastDate?.attributes?.is_home ?? true)
    : (entities.nextVenue?.state === "home" || entities.nextOpponent?.attributes?.is_home === true);

  const teamLogoUrl = currentOpponentSensor?.attributes?.team_logo_url || DEFAULT_FALLBACK_LOGO;
  const opponentLogoUrl = currentOpponentSensor?.attributes?.opponent_logo_url || DEFAULT_FALLBACK_LOGO;

  const leftName = isHome ? teamName : opponentName;
  const rightName = isHome ? opponentName : teamName;
  const leftLogo = isHome ? teamLogoUrl : opponentLogoUrl;
  const rightLogo = isHome ? opponentLogoUrl : teamLogoUrl;

  const searchTeamName = officialTeamName || teamName;
  const leftMatchName = isHome ? searchTeamName : opponentSearchName;
  const rightMatchName = isHome ? opponentSearchName : searchTeamName;

  const selectedEntity = config.entity && states ? states[config.entity] : null;
  const leftUrl = findTeamUrl({
    isHome,
    teamName: leftMatchName,
    entities,
    opponentSensor: currentOpponentSensor,
    selectedEntity,
  });
  const rightUrl = findTeamUrl({
    isHome: !isHome,
    teamName: rightMatchName,
    entities,
    opponentSensor: currentOpponentSensor,
    selectedEntity,
  });

  const leftEntityId = isHome ? config.entity : currentOpponentSensor?.entity_id;
  const rightEntityId = isHome ? currentOpponentSensor?.entity_id : config.entity;

  const competition = entities.poule?.attributes?.competition || "";
  const pouleName = entities.poule?.state || "";
  const roundNumber = isPostMatch
    ? (entities.lastDate?.attributes?.round || "")
    : (entities.nextDate?.attributes?.round || "");

  const gymName = entities.nextLocation?.attributes?.gym_name || entities.nextOpponent?.attributes?.gym_name || "";
  const gymCity = entities.nextLocation?.attributes?.gym_city || entities.nextOpponent?.attributes?.gym_city || "";

  const targetDateStr = isPostMatch ? entities.lastDate?.state : entities.nextDate?.state;
  const dateFormatted = formatDate(targetDateStr, lang);
  const formStreak = entities.form?.attributes?.current_streak || "";
  const formSequence = entities.form?.state;
  const hasValidForm = isValidState(formSequence);

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

  const isCalendarClickable = !isLive && !isPostMatch && hasNextMatch;
  const isLogoClickable = config.logo_click_action && config.logo_click_action !== "none";
  const hasStandingsData = Array.isArray(entities.rank?.attributes?.standings) && entities.rank.attributes.standings.length > 0;
  const accentColor = resolveAccentColor(config);

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
  };
}
