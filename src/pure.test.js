import { describe, it, expect, vi } from "vitest";
import {
  findOpponentRank,
  formatRank,
  extractCalendarMatches,
  sanitizeUrl,
  isToday,
  isWithinDPlusOne,
  isAtOrAfterDMinusOne,
  computeIsPostMatch,
  cleanForMatch,
  findUrlInStandings,
  resolveEntities,
  sortStandings,
  resolveAccentColor,
  formatDate,
  findTeamUrl,
  computeViewModel,
  createTeamMatcher,
  resolveHour12,
  isValidCssColor,
  resolveCalendarTeamLogo,
  DEFAULT_FALLBACK_LOGO,
  resolveDisplayMode,
  estimateCardSize,
  splitScore,
} from "./pure.js";
import { getTranslations, translate } from "./translations.js";

describe("findUrlInStandings", () => {
  const standings = [
    { team_name: "Basket Landes", team_url: "https://ffbb.com/basket-landes" },
    { team_name: "US Mont-de-Marsan", url: "https://ffbb.com/umdm" },
    { team_name: "AS Dax" },
  ];

  it("returns null when standings isn't an array", () => {
    expect(findUrlInStandings("AS Dax", null, ["url"])).toBeNull();
    expect(findUrlInStandings("AS Dax", undefined, ["url"])).toBeNull();
  });

  it("finds a fuzzy-matched row's url via the first key that resolves", () => {
    expect(findUrlInStandings("basket landes", standings, ["team_url", "url"])).toBe(
      "https://ffbb.com/basket-landes"
    );
  });

  it("falls through to the next key when the first is absent", () => {
    expect(findUrlInStandings("US Mont-de-Marsan", standings, ["team_url", "url"])).toBe(
      "https://ffbb.com/umdm"
    );
  });

  it("returns null when the matched row has none of the requested keys", () => {
    expect(findUrlInStandings("AS Dax", standings, ["team_url", "url"])).toBeNull();
  });

  it("returns null when nothing matches the team name", () => {
    expect(findUrlInStandings("Some Other Team", standings, ["url"])).toBeNull();
  });

  it("rejects an unsafe URL value even if the key is present", () => {
    const unsafe = [{ team_name: "AS Dax", url: "javascript:alert(1)" }];
    expect(findUrlInStandings("AS Dax", unsafe, ["url"])).toBeNull();
  });

  it("skips malformed rows instead of throwing", () => {
    const messy = [null, {}, { team_name: "AS Dax", url: "https://ffbb.com/dax" }];
    expect(findUrlInStandings("AS Dax", messy, ["url"])).toBe("https://ffbb.com/dax");
  });

  it("returns null when teamName is null, empty or punctuation only", () => {
    expect(findUrlInStandings(null, standings, ["team_url", "url"])).toBeNull();
    expect(findUrlInStandings("", standings, ["team_url", "url"])).toBeNull();
    expect(findUrlInStandings("---", standings, ["team_url", "url"])).toBeNull();
  });
});

describe("resolveEntities", () => {
  it("returns null without a selected entity or without states", () => {
    expect(resolveEntities(null, { "sensor.x_next_match_date": {} })).toBeNull();
    expect(resolveEntities("sensor.x_next_match_date", null)).toBeNull();
  });

  it("derives the prefix from a recognized French suffix and resolves siblings", () => {
    const states = {
      "sensor.basket_landes_prochain_match_adversaire": { state: "US Mont-de-Marsan" },
      "sensor.basket_landes_classement": { state: "3" },
      "binary_sensor.basket_landes_match_en_cours": { state: "off" },
    };
    const entities = resolveEntities("sensor.basket_landes_prochain_match_adversaire", states);
    expect(entities.nextOpponent.state).toBe("US Mont-de-Marsan");
    expect(entities.rank.state).toBe("3");
    expect(entities.matchInProgress.state).toBe("off");
  });

  it("derives the prefix from a recognized English suffix", () => {
    const states = {
      "sensor.basket_landes_next_match_opponent": { state: "US Mont-de-Marsan" },
      "sensor.basket_landes_rank": { state: "3" },
    };
    const entities = resolveEntities("sensor.basket_landes_next_match_opponent", states);
    expect(entities.nextOpponent.state).toBe("US Mont-de-Marsan");
    expect(entities.rank.state).toBe("3");
  });

  it("returns nulls for sensors that don't exist in states, without throwing", () => {
    const entities = resolveEntities("sensor.basket_landes_next_match_opponent", {});
    expect(entities.nextOpponent).toBeNull();
    expect(entities.poule).toBeNull();
  });

  it("falls back to a generic last-underscore split for an unrecognized suffix", () => {
    const states = {
      "sensor.basket_landes_something_weird": {},
      "sensor.basket_landes_classement": { state: "5" },
    };
    const entities = resolveEntities("sensor.basket_landes_something_weird", states);
    expect(entities.rank).toBeNull();
  });
});

describe("cleanForMatch", () => {
  it("strips diacritics, lowercase and punctuation", () => {
    expect(cleanForMatch("Élan Béarnais")).toBe("elanbearnais");
    expect(cleanForMatch("Saint-Médard Basket")).toBe("saintmedardbasket");
  });
});

describe("formatRank", () => {
  it("returns null for missing, empty, or non-numeric input", () => {
    expect(formatRank(null, "en")).toBeNull();
    expect(formatRank(undefined, "en")).toBeNull();
    expect(formatRank("", "en")).toBeNull();
    expect(formatRank("abc", "en")).toBeNull();
  });

  it("returns null for zero or negative ranks", () => {
    expect(formatRank(0, "en")).toBeNull();
    expect(formatRank(-3, "en")).toBeNull();
  });

  it("formats French ordinals", () => {
    expect(formatRank(1, "fr")).toBe("1er");
    expect(formatRank(2, "fr")).toBe("2e");
    expect(formatRank(11, "fr")).toBe("11e");
    expect(formatRank(21, "fr")).toBe("21e");
  });

  it("formats English ordinals, including 11th/12th/13th exceptions", () => {
    expect(formatRank(1, "en")).toBe("1st");
    expect(formatRank(2, "en")).toBe("2nd");
    expect(formatRank(3, "en")).toBe("3rd");
    expect(formatRank(4, "en")).toBe("4th");
    expect(formatRank(11, "en")).toBe("11th");
    expect(formatRank(12, "en")).toBe("12th");
    expect(formatRank(13, "en")).toBe("13th");
    expect(formatRank(21, "en")).toBe("21st");
    expect(formatRank(22, "en")).toBe("22nd");
    expect(formatRank(23, "en")).toBe("23rd");
    expect(formatRank(111, "en")).toBe("111th");
  });

  it("accepts numeric strings, same as sensor state", () => {
    expect(formatRank("5", "en")).toBe("5th");
  });
});

describe("splitScore", () => {
  it("puts the home number first as 'my' when isHome is true", () => {
    expect(splitScore("51 - 46", true)).toEqual({ my: "51", opponent: "46" });
  });

  it("puts the away number first as 'my' when isHome is false (the home number is the opponent's)", () => {
    expect(splitScore("51 - 46", false)).toEqual({ my: "46", opponent: "51" });
  });

  it("tolerates extra/missing whitespace around the dash", () => {
    expect(splitScore("80-75", true)).toEqual({ my: "80", opponent: "75" });
    expect(splitScore("80   -   75", true)).toEqual({ my: "80", opponent: "75" });
  });

  it("returns null for anything that isn't a clean 'NN - NN' score (walkover, missing score, non-string)", () => {
    expect(splitScore("-", true)).toBeNull();
    expect(splitScore("", true)).toBeNull();
    expect(splitScore(undefined, true)).toBeNull();
    expect(splitScore(null, true)).toBeNull();
    expect(splitScore("Forfeit", true)).toBeNull();
    expect(splitScore("20 - 0 (forfait)", true)).toBeNull();
  });
});

describe("findOpponentRank", () => {
  const standings = [
    { team_name: "Basket Landes", position: 1 },
    { team_name: "US Mont-de-Marsan", position: 4 },
    { team_name: "AS Dax", position: 7 },
  ];

  it("returns null when there's no name or no standings array", () => {
    expect(findOpponentRank(null, standings)).toBeNull();
    expect(findOpponentRank("AS Dax", null)).toBeNull();
    expect(findOpponentRank("AS Dax", undefined)).toBeNull();
  });

  it("finds an exact match", () => {
    expect(findOpponentRank("AS Dax", standings)).toBe(7);
  });

  it("matches fuzzily, ignoring case, accents and punctuation", () => {
    expect(findOpponentRank("us mont-de-marsan", standings)).toBe(4);
    expect(findOpponentRank("US MONT DE MARSAN", standings)).toBe(4);
  });

  it("returns null when nothing matches", () => {
    expect(findOpponentRank("Some Other Team", standings)).toBeNull();
  });

  it("skips malformed standings entries without throwing", () => {
    const messy = [null, {}, { team_name: "AS Dax", position: 7 }];
    expect(findOpponentRank("AS Dax", messy)).toBe(7);
  });

  it("returns null when opponentName cleans to an empty string", () => {
    expect(findOpponentRank("---", standings)).toBeNull();
  });
});

describe("extractCalendarMatches", () => {
  const match1 = { round: 1 };
  const match2 = { round: 2 };

  it("prefers the poule sensor's calendar attribute", () => {
    const entities = { poule: { attributes: { calendar: [match1] } } };
    expect(extractCalendarMatches(entities, null)).toEqual([match1]);
  });

  it("falls back to the next-match sensor", () => {
    const entities = { poule: {}, nextDate: { attributes: { matches: [match2] } } };
    expect(extractCalendarMatches(entities, null)).toEqual([match2]);
  });

  it("falls back to the rank sensor", () => {
    const entities = { rank: { attributes: { calendar: [match1] } } };
    expect(extractCalendarMatches(entities, null)).toEqual([match1]);
  });

  it("falls back to the configured entity itself as a last resort", () => {
    const configuredEntity = { attributes: { calendar: [match1, match2] } };
    expect(extractCalendarMatches({}, configuredEntity)).toEqual([match1, match2]);
  });

  it("skips empty arrays and keeps looking", () => {
    const entities = { poule: { attributes: { calendar: [] } }, rank: { attributes: { matches: [match1] } } };
    expect(extractCalendarMatches(entities, null)).toEqual([match1]);
  });

  it("returns an empty array when nothing has calendar data", () => {
    expect(extractCalendarMatches({}, null)).toEqual([]);
  });
});

describe("sanitizeUrl", () => {
  it("accepts absolute http(s) URLs", () => {
    expect(sanitizeUrl("https://competitions.ffbb.com/equipes/123")).toBe(
      "https://competitions.ffbb.com/equipes/123"
    );
    expect(sanitizeUrl("http://example.com")).toBe("http://example.com");
  });

  it("resolves site-relative paths against competitions.ffbb.com", () => {
    expect(sanitizeUrl("/equipes/123")).toBe("https://competitions.ffbb.com/equipes/123");
  });

  it("trims surrounding whitespace", () => {
    expect(sanitizeUrl("  https://example.com  ")).toBe("https://example.com");
  });

  it("rejects unsafe or unrecognized schemes", () => {
    expect(sanitizeUrl("javascript:alert(1)")).toBeNull();
    expect(sanitizeUrl("data:text/html,<script>alert(1)</script>")).toBeNull();
    expect(sanitizeUrl("ftp://example.com")).toBeNull();
  });

  it("rejects non-string or empty input", () => {
    expect(sanitizeUrl(null)).toBeNull();
    expect(sanitizeUrl(undefined)).toBeNull();
    expect(sanitizeUrl("")).toBeNull();
    expect(sanitizeUrl(42)).toBeNull();
  });
});

describe("isToday", () => {
  it("returns true when date is today in local time", () => {
    const now = new Date("2026-09-18T14:30:00");
    expect(isToday("2026-09-18T20:00:00", now)).toBe(true);
  });

  it("returns false for yesterday or tomorrow", () => {
    const now = new Date("2026-09-18T14:30:00");
    expect(isToday("2026-09-17T20:00:00", now)).toBe(false);
    expect(isToday("2026-09-19T20:00:00", now)).toBe(false);
  });

  it("returns false for missing, invalid, or unavailable dates", () => {
    expect(isToday(null)).toBe(false);
    expect(isToday("unavailable")).toBe(false);
    expect(isToday("not-a-real-date")).toBe(false);
  });
});

describe("isWithinDPlusOne", () => {
  const matchDate = "2026-09-12T20:00:00";

  it("returns true on game day after start", () => {
    const now = new Date("2026-09-12T22:30:00");
    expect(isWithinDPlusOne(matchDate, now)).toBe(true);
  });

  it("returns true throughout D+1", () => {
    const nowMid = new Date("2026-09-13T14:00:00");
    const nowEnd = new Date("2026-09-13T23:59:59");
    expect(isWithinDPlusOne(matchDate, nowMid)).toBe(true);
    expect(isWithinDPlusOne(matchDate, nowEnd)).toBe(true);
  });

  it("returns false as soon as D+2 starts at midnight", () => {
    const nowD2 = new Date("2026-09-14T00:00:00");
    expect(isWithinDPlusOne(matchDate, nowD2)).toBe(false);
  });

  it("returns false for invalid or missing dates", () => {
    expect(isWithinDPlusOne(null)).toBe(false);
    expect(isWithinDPlusOne("unavailable")).toBe(false);
    expect(isWithinDPlusOne("not-a-real-date")).toBe(false);
  });
});

describe("isAtOrAfterDMinusOne", () => {
  const nextMatchDate = "2026-09-19T20:00:00";

  it("returns false prior to D-1 midnight", () => {
    const nowThu = new Date("2026-09-17T23:59:59");
    expect(isAtOrAfterDMinusOne(nextMatchDate, nowThu)).toBe(false);
  });

  it("returns true from D-1 midnight onward", () => {
    const nowFriStart = new Date("2026-09-18T00:00:00");
    const nowFriNoon = new Date("2026-09-18T12:00:00");
    const nowSatGame = new Date("2026-09-19T18:00:00");
    expect(isAtOrAfterDMinusOne(nextMatchDate, nowFriStart)).toBe(true);
    expect(isAtOrAfterDMinusOne(nextMatchDate, nowFriNoon)).toBe(true);
    expect(isAtOrAfterDMinusOne(nextMatchDate, nowSatGame)).toBe(true);
  });

  it("returns false for a truthy but unparseable date, same guard as isWithinDPlusOne", () => {
    expect(isAtOrAfterDMinusOne("not-a-real-date")).toBe(false);
  });
});

describe("computeIsPostMatch", () => {
  const lastDate = "2026-09-12T20:00:00";
  const nextDate = "2026-09-19T20:00:00";

  it("returns false if match is in progress regardless of mode", () => {
    expect(
      computeIsPostMatch({
        isLive: true,
        defaultView: "last",
        hasLastScore: true,
      })
    ).toBe(false);
  });

  it("returns false if hasLastMatch is explicitly false", () => {
    expect(
      computeIsPostMatch({
        defaultView: "last",
        hasLastScore: true,
        hasLastMatch: false,
      })
    ).toBe(false);
  });

  it("returns false for defaultView = 'last' when there's no last score to show", () => {
    expect(
      computeIsPostMatch({
        defaultView: "last",
        hasLastScore: false,
        lastDate,
      })
    ).toBe(false);
  });

  it("prioritizes manualView when provided", () => {
    expect(computeIsPostMatch({ manualView: "last" })).toBe(true);
    expect(computeIsPostMatch({ manualView: "next" })).toBe(false);
  });

  it("handles defaultView = 'next'", () => {
    expect(
      computeIsPostMatch({
        defaultView: "next",
        hasLastScore: true,
        lastDate,
        now: new Date("2026-09-13T10:00:00"),
      })
    ).toBe(false);
  });

  it("handles defaultView = 'auto' across D+1 boundary", () => {
    expect(
      computeIsPostMatch({
        defaultView: "auto",
        hasLastScore: true,
        lastDate,
        now: new Date("2026-09-13T18:00:00"),
      })
    ).toBe(true);

    expect(
      computeIsPostMatch({
        defaultView: "auto",
        hasLastScore: true,
        lastDate,
        now: new Date("2026-09-14T08:00:00"),
      })
    ).toBe(false);
  });

  it("handles defaultView = 'last' with switch at D-1", () => {
    expect(
      computeIsPostMatch({
        defaultView: "last",
        hasLastScore: true,
        lastDate,
        nextDate,
        hasNextMatch: true,
        now: new Date("2026-09-16T15:00:00"),
      })
    ).toBe(true);

    expect(
      computeIsPostMatch({
        defaultView: "last",
        hasLastScore: true,
        lastDate,
        nextDate,
        hasNextMatch: true,
        now: new Date("2026-09-18T00:05:00"),
      })
    ).toBe(false);

    expect(
      computeIsPostMatch({
        defaultView: "last",
        hasLastScore: true,
        lastDate,
        nextDate: null,
        hasNextMatch: false,
        now: new Date("2026-09-18T10:00:00"),
      })
    ).toBe(true);
  });
});

describe("sortStandings", () => {
  it("sorts string positions numerically rather than alphabetically", () => {
    const raw = [
      { position: "1", team_name: "Team A" },
      { position: "10", team_name: "Team J" },
      { position: "11", team_name: "Team K" },
      { position: "12", team_name: "Team L" },
      { position: "2", team_name: "Team B" },
      { position: "3", team_name: "Team C" },
    ];

    const sorted = sortStandings(raw);

    expect(sorted.map((item) => item.position)).toEqual(["1", "2", "3", "10", "11", "12"]);
  });

  it("falls back to the rank property when position is absent", () => {
    const raw = [
      { rank: "9", team_name: "Team 9" },
      { rank: "2", team_name: "Team 2" },
      { rank: "10", team_name: "Team 10" },
    ];

    const sorted = sortStandings(raw);
    expect(sorted.map((item) => item.rank)).toEqual(["2", "9", "10"]);
  });

  it("pushes unranked or invalid rows to the bottom", () => {
    const raw = [
      { position: "5", team_name: "Team 5" },
      { team_name: "Unranked Team" },
      { position: "1", team_name: "Team 1" },
      { position: "invalid", team_name: "Invalid Pos" },
    ];

    const sorted = sortStandings(raw);
    expect(sorted[0].team_name).toBe("Team 1");
    expect(sorted[1].team_name).toBe("Team 5");
  });

  it("returns an empty array when given null, undefined or non-array", () => {
    expect(sortStandings(null)).toEqual([]);
    expect(sortStandings(undefined)).toEqual([]);
    expect(sortStandings([])).toEqual([]);
  });
});

describe("resolveAccentColor", () => {
  it("returns default basketball orange when mode is default or missing", () => {
    expect(resolveAccentColor({})).toBe("#ff6b00");
    expect(resolveAccentColor({ accent_color: "default" })).toBe("#ff6b00");
  });

  it("returns theme CSS variable when mode is theme", () => {
    expect(resolveAccentColor({ accent_color: "theme" })).toBe("var(--primary-color)");
  });

  it("returns custom color when mode is custom and color is provided", () => {
    expect(resolveAccentColor({ accent_color: "custom", custom_accent_color: " #03a9f4 " })).toBe("#03a9f4");
  });

  it("falls back to orange if custom mode has empty string", () => {
    expect(resolveAccentColor({ accent_color: "custom", custom_accent_color: "   " })).toBe("#ff6b00");
  });
});

describe("formatDate", () => {
  it("returns null for missing, unknown or unavailable date", () => {
    expect(formatDate(null)).toBeNull();
    expect(formatDate("unknown")).toBeNull();
    expect(formatDate("unavailable")).toBeNull();
    expect(formatDate("not-a-real-date")).toBeNull();
  });

  it("formats valid ISO dates", () => {
    const formatted = formatDate("2026-09-12T20:00:00", "fr");
    expect(formatted).not.toBeNull();
    expect(formatted.weekday).toBeDefined();
    expect(formatted.day).toBeDefined();
    expect(formatted.time).toBeDefined();
  });
});

describe("findTeamUrl", () => {
  const selectedEntity = {
    attributes: { team_url: "https://ffbb.com/selected-team" },
  };
  const opponentSensor = {
    attributes: {
      team_url: "https://ffbb.com/my-club-team",
      opponent_url: "https://ffbb.com/opponent-team",
    },
  };
  const pouleEntity = {
    attributes: { url: "https://competitions.ffbb.com/poule/200000003060032" },
  };

  it("resolves home team url from opponent sensor first", () => {
    const url = findTeamUrl({
      isHome: true,
      opponentSensor,
      entities: { poule: pouleEntity },
    });
    expect(url).toBe("https://ffbb.com/my-club-team");
  });

  it("never returns poule url for my team even if opponent sensor lacks team_url", () => {
    const url = findTeamUrl({
      isHome: true,
      entities: { poule: pouleEntity },
    });
    expect(url).toBeNull();
  });

  it("resolves home team url from selected entity when opponent sensor lacks it", () => {
    const url = findTeamUrl({ isHome: true, selectedEntity });
    expect(url).toBe("https://ffbb.com/selected-team");
  });

  it("resolves away team url from opponent sensor", () => {
    const url = findTeamUrl({ isHome: false, opponentSensor });
    expect(url).toBe("https://ffbb.com/opponent-team");
  });

  it("falls back to a fuzzy standings-table match for the home team when no direct attribute has a url", () => {
    const standings = [{ team_name: "Basket Landes", team_url: "https://ffbb.com/from-standings-home" }];
    const url = findTeamUrl({
      isHome: true,
      teamName: "Basket Landes",
      entities: { rank: { attributes: { standings } } },
    });
    expect(url).toBe("https://ffbb.com/from-standings-home");
  });

  it("falls back to a fuzzy standings-table match for the away team when no direct attribute has a url", () => {
    const standings = [{ team_name: "AS Dax", url: "https://ffbb.com/from-standings-away" }];
    const url = findTeamUrl({
      isHome: false,
      teamName: "AS Dax",
      entities: { rank: { attributes: { standings } } },
    });
    expect(url).toBe("https://ffbb.com/from-standings-away");
  });
});

describe("computeViewModel", () => {
  const baseEntities = {
    nextOpponent: { state: "US Mont-de-Marsan", attributes: { team_logo_url: "/logo1.png", opponent_logo_url: "/logo2.png" } },
    nextDate: { state: "2026-09-19T20:00:00", attributes: { round: "2" } },
    nextLocation: { attributes: { gym_name: "Gymnase A", gym_city: "Dax" } },
    nextVenue: { state: "home" },
    lastScore: { state: "80 - 75" },
    lastResult: { state: "win" },
    lastOpponent: { state: "AS Dax" },
    lastDate: { state: "2026-09-12T20:00:00", attributes: { round: "1" } },
    poule: { state: "Poule B", attributes: { team: "Basket Landes", competition: "Wonderligue" } },
    rank: { state: "1", attributes: { standings: [{ team_name: "Basket Landes", position: 1 }] } },
    form: { state: "V-V-D-V-N", attributes: { current_streak: "2V" } },
    matchInProgress: { state: "off" },
  };

  const baseConfig = {
    entity: "sensor.basket_landes_prochain_match_adversaire",
    show_title: true,
    show_header: true,
    show_rank: true,
    show_form: true,
    show_venue: true,
    show_watermark: true,
    default_match_view: "next",
  };

  it("computes pre-match view model accurately", () => {
    const vm = computeViewModel({
      entities: baseEntities,
      config: baseConfig,
      lang: "fr",
      now: new Date("2026-09-15T10:00:00"),
    });

    expect(vm.isPostMatch).toBe(false);
    expect(vm.isLive).toBe(false);
    expect(vm.isGameDay).toBe(false);
    expect(vm.teamName).toBe("Basket Landes");
    expect(vm.opponentName).toBe("US Mont-de-Marsan");
    expect(vm.leftName).toBe("Basket Landes");
    expect(vm.rightName).toBe("US Mont-de-Marsan");
    expect(vm.roundNumber).toBe("2");
    expect(vm.leftRank).toBe("1er");
  });

  it("flags isGameDay as true when upcoming match is scheduled today", () => {
    const vm = computeViewModel({
      entities: baseEntities,
      config: baseConfig,
      lang: "fr",
      now: new Date("2026-09-19T08:00:00"),
    });

    expect(vm.isGameDay).toBe(true);
  });

  it("computes post-match score and outcome when forced or active", () => {
    const vm = computeViewModel({
      entities: baseEntities,
      config: { ...baseConfig, default_match_view: "last" },
      lang: "fr",
      now: new Date("2026-09-13T10:00:00"),
    });

    expect(vm.isPostMatch).toBe(true);
    expect(vm.roundNumber).toBe("1");
    expect(vm.canToggleView).toBe(true);
  });

  it("handles live match state overriding other views", () => {
    const liveEntities = {
      ...baseEntities,
      matchInProgress: { state: "on" },
    };

    const vm = computeViewModel({
      entities: liveEntities,
      config: baseConfig,
      lang: "fr",
    });

    expect(vm.isLive).toBe(true);
    expect(vm.isPostMatch).toBe(false);
    expect(vm.canToggleView).toBe(false);
  });

  it("applies preview fallbacks when isPreview is enabled", () => {
    const minimalEntities = {
      poule: { attributes: { team: "Custom Team" } },
      nextVenue: { state: "home" },
    };

    const vm = computeViewModel({
      entities: minimalEntities,
      config: baseConfig,
      isPreview: true,
      lang: "fr",
    });

    expect(vm.displayFormSequence).toBe("V-V-D-V-N");
    expect(vm.leftRank).toBe("2e");
    expect(vm.rightRank).toBe("5e");
  });

  it("respects custom team name override", () => {
    const vm = computeViewModel({
      entities: baseEntities,
      config: { ...baseConfig, custom_team_name: "Équipe 1" },
      lang: "fr",
    });

    expect(vm.teamName).toBe("Équipe 1");
  });
});


// ---------------------------------------------------------------------------
// Regression tests added with the v0.1.5 fixes. Everything above this line is
// the original v0.1.0 suite, kept intact.
// ---------------------------------------------------------------------------

describe("exact team-name match takes precedence over substring match", () => {
  const standings = [
    { team_name: "US Dax 2", position: 1, url: "https://ffbb.example/dax2" },
    { team_name: "US Dax", position: 4, url: "https://ffbb.example/dax" },
    { team_name: "Basket Landes", position: 7, url: "https://ffbb.example/landes" },
    { team_name: "-", position: 9, url: "https://ffbb.example/dash" },
    { position: 10, url: "https://ffbb.example/noname" },
  ];

  it("findOpponentRank picks the exact row even when a longer name comes first", () => {
    expect(findOpponentRank("US Dax", standings)).toBe(4);
    expect(findOpponentRank("US Dax 2", standings)).toBe(1);
  });

  it("findOpponentRank still falls back to a substring match when no exact row exists", () => {
    expect(findOpponentRank("Basket Landes Senior", standings)).toBe(7);
  });

  it("findOpponentRank never matches rows with an empty or '-' name", () => {
    const onlyEmpty = [{ team_name: "-", position: 7 }, { position: 8 }];
    expect(findOpponentRank("Foo", onlyEmpty)).toBeNull();
  });

  it("findUrlInStandings picks the exact row even when a longer name comes first", () => {
    expect(findUrlInStandings("US Dax", standings, ["url"])).toBe("https://ffbb.example/dax");
    expect(findUrlInStandings("US Dax 2", standings, ["url"])).toBe("https://ffbb.example/dax2");
  });

  it("findUrlInStandings never matches rows with an empty or '-' name", () => {
    const onlyEmpty = [{ team_name: "-", url: "https://ffbb.example/dash" }, { url: "https://ffbb.example/x" }];
    expect(findUrlInStandings("Foo", onlyEmpty, ["url"])).toBeNull();
  });
});

describe("computeViewModel default title", () => {
  const entities = {
    nextOpponent: { state: "US Mont-de-Marsan", attributes: {} },
    nextDate: { state: "2099-01-10T20:00:00", attributes: {} },
    lastScore: { state: "80 - 75", attributes: {} },
    lastOpponent: { state: "AS Dax", attributes: {} },
    lastDate: { state: "2026-09-12T20:00:00", attributes: {} },
    poule: { state: "Poule B", attributes: { team: "Basket Landes" } },
    matchInProgress: { state: "off" },
  };
  const now = new Date("2026-09-19T10:00:00");
  const run = (over = {}, t = undefined) =>
    computeViewModel({ entities, config: { entity: "sensor.x" }, lang: "en", now, ...(t ? { t } : {}), ...over });

  it("is 'Next match' on the upcoming-match view", () => {
    expect(run({ manualView: "next" }).titleText).toBe("Next match");
  });

  it("is 'Last match' on the last-match view", () => {
    expect(run({ manualView: "last" }).titleText).toBe("Last match");
  });

  it("is 'Live match' when a match is in progress", () => {
    const live = { ...entities, matchInProgress: { state: "on" } };
    expect(run({ entities: live }).titleText).toBe("Live match");
  });

  it("a configured title is shown as a prefix in front of the dynamic status, in every view", () => {
    expect(run({ manualView: "last", config: { entity: "sensor.x", title: "  Mon titre " } }).titleText).toBe("Mon titre • Last match");
    expect(run({ manualView: "next", config: { entity: "sensor.x", title: "Mon titre" } }).titleText).toBe("Mon titre • Next match");
    const live = { ...entities, matchInProgress: { state: "on" } };
    expect(run({ entities: live, config: { entity: "sensor.x", title: "Mon titre" } }).titleText).toBe("Mon titre • Live match");
  });

  it("with no configured title, is just the dynamic status (unchanged, no dangling separator)", () => {
    expect(run({ manualView: "last" }).titleText).toBe("Last match");
  });

  it("uses real translations: fr.json defines live_title / last_title", () => {
    const fr = getTranslations("fr");
    const t = (k, f = "") => translate(fr, k, f);
    expect(run({ manualView: "last", lang: "fr" }, t).titleText).toBe("Dernier match");
    const live = { ...entities, matchInProgress: { state: "on" } };
    expect(run({ entities: live, lang: "fr" }, t).titleText).toBe("Match en direct");
  });
});

describe("createTeamMatcher", () => {
  it("only matches exact names when one exists in the list", () => {
    const names = ["US Dax 2", "Basket Landes", "US Dax"];
    const isDax = createTeamMatcher(names, "US Dax");
    expect(names.filter(isDax)).toEqual(["US Dax"]);
  });

  it("ignores case, accents and punctuation when comparing", () => {
    const isTeam = createTeamMatcher(["Élan Béarnais Pau-Lacq"], "elan bearnais PAU LACQ");
    expect(isTeam("Élan Béarnais Pau-Lacq")).toBe(true);
  });

  it("falls back to substring matching, in both directions, when nothing matches exactly", () => {
    const names = ["Basket Landes", "US Dax"];
    const longer = createTeamMatcher(names, "US Dax Senior"); // target contains a row name
    expect(names.filter(longer)).toEqual(["US Dax"]);
    const shorter = createTeamMatcher(["Basket Landes 2"], "Basket Landes"); // row contains target
    expect(shorter("Basket Landes 2")).toBe(true);
  });

  it("never matches an empty, '-' or missing name", () => {
    const isTeam = createTeamMatcher(["-", "", null], "Foo");
    expect(isTeam("-")).toBe(false);
    expect(isTeam("")).toBe(false);
    expect(isTeam(null)).toBe(false);
    expect(isTeam(undefined)).toBe(false);
  });

  it("matches nothing when the target is empty or '-'", () => {
    expect(createTeamMatcher(["A", "B"], "")("A")).toBe(false);
    expect(createTeamMatcher(["A", "B"], null)("A")).toBe(false);
    expect(createTeamMatcher(["A", "B"], "---")("A")).toBe(false);
  });

  it("tolerates a non-array list of names", () => {
    expect(createTeamMatcher(undefined, "Foo")("Foo bar")).toBe(true);
  });
});

describe("resolveHour12 (follows the Home Assistant profile setting)", () => {
  it('"12" and "24" force the format whatever the language', () => {
    expect(resolveHour12("12", "fr")).toBe(true);
    expect(resolveHour12("24", "en-US")).toBe(false);
  });

  it("accepts the enum-style aliases am_pm / twenty_four", () => {
    expect(resolveHour12("am_pm", "fr")).toBe(true);
    expect(resolveHour12("twenty_four", "en-US")).toBe(false);
  });

  it('"language" (and a missing setting) follow the convention of the language', () => {
    expect(resolveHour12("language", "en-US")).toBe(true);
    expect(resolveHour12("language", "en-GB")).toBe(false);
    expect(resolveHour12("language", "fr")).toBe(false);
    expect(resolveHour12(undefined, "en")).toBe(true);
    expect(resolveHour12(undefined, "fr")).toBe(false);
  });

  it('"system" returns a boolean without throwing', () => {
    expect(typeof resolveHour12("system", "fr")).toBe("boolean");
  });

  it("never throws on an invalid language tag", () => {
    expect(typeof resolveHour12("language", "not a locale!!")).toBe("boolean");
  });
});

describe("formatDate with an explicit 12/24h choice", () => {
  const evening = "2026-09-19T20:00:00"; // no offset: local time, so the test is timezone-proof

  it("hour12: false gives 24-hour time even in English", () => {
    expect(formatDate(evening, "en", { hour12: false }).time).toBe("20:00");
  });

  it("hour12: true gives 12-hour time with AM/PM", () => {
    expect(formatDate(evening, "en", { hour12: true }).time).toMatch(/^8:00\s?PM$/);
  });

  it("prints just after midnight as 00:30, never 24:30", () => {
    expect(formatDate("2026-09-19T00:30:00", "en", { hour12: false }).time).toBe("00:30");
  });

  it("without options the locale default is unchanged (French stays 24-hour)", () => {
    expect(formatDate(evening, "fr").time).toBe("20:00");
  });

  it("computeViewModel formats dates with the full locale and the 12/24h choice", () => {
    const vm = computeViewModel({
      entities: {
        nextOpponent: { state: "US Dax", attributes: {} },
        nextDate: { state: evening, attributes: {} },
        matchInProgress: { state: "off" },
      },
      config: { entity: "sensor.x" },
      lang: "en",
      locale: "en-GB",
      hour12: false,
      now: new Date("2026-09-10T10:00:00"),
    });
    expect(vm.dateFormatted.time).toBe("20:00");
  });
});

describe("isValidCssColor / custom accent color", () => {
  it("accepts hex and rgb()/hsl() colors when no CSS engine is available", () => {
    for (const ok of ["#1e88e5", "#FFF", "#ff6b00cc", "rgb(30, 136, 229)", "rgba(30,136,229,0.5)", "hsl(207 90% 54%)", " #03a9f4 "]) {
      expect(isValidCssColor(ok), ok).toBe(true);
    }
  });

  it("rejects text that is not a color, and non-strings", () => {
    for (const bad of ["bleu", "1e88e5", "#12", "#gggggg", "", "   ", null, undefined, 42]) {
      expect(isValidCssColor(bad), String(bad)).toBe(false);
    }
  });

  it("defers to the browser's CSS parser when one is available (named colors, var())", () => {
    const supports = (prop, value) => prop === "color" && ["red", "var(--primary-color)"].includes(value);
    expect(isValidCssColor("red", supports)).toBe(true);
    expect(isValidCssColor("var(--primary-color)", supports)).toBe(true);
    expect(isValidCssColor("bleu", supports)).toBe(false);
  });

  it("always rejects anything that could break out of the style declaration", () => {
    const yesToEverything = () => true;
    for (const evil of ["red; background:url(x)", "#fff}", "red\\", 'red"', "red'", "<red>"]) {
      expect(isValidCssColor(evil, yesToEverything), evil).toBe(false);
    }
  });

  it("resolveAccentColor falls back to the default orange for an invalid custom color", () => {
    expect(resolveAccentColor({ accent_color: "custom", custom_accent_color: "bleu" })).toBe("#ff6b00");
    expect(resolveAccentColor({ accent_color: "custom", custom_accent_color: "red; x:y" })).toBe("#ff6b00");
  });

  it("resolveAccentColor keeps a valid custom color (trimmed)", () => {
    expect(resolveAccentColor({ accent_color: "custom", custom_accent_color: " #1e88e5 " })).toBe("#1e88e5");
    expect(resolveAccentColor({ accent_color: "custom", custom_accent_color: "rgb(30, 136, 229)" })).toBe("rgb(30, 136, 229)");
  });
});

describe("computeViewModel carousel logos", () => {
  const entities = {
    nextOpponent: { state: "US Dax", attributes: { team_logo_url: "https://x.test/my.png", opponent_logo_url: "https://x.test/dax.png" } },
    nextDate: { state: "2099-01-10T20:00:00", attributes: {} },
    lastOpponent: { state: "AS Pau", attributes: { opponent_logo_url: "https://x.test/pau.png" } },
    poule: {
      state: "Poule B",
      attributes: {
        team: "Basket Landes",
        calendar: [
          { home_team: "Basket Landes", away_team: "BC Orthez", is_home: true, date: "2099-01-03T20:00:00" },
          { home_team: "US Dax", away_team: "Basket Landes", is_home: false, date: "2099-01-10T20:00:00" },
        ],
      },
    },
    rank: { state: "1", attributes: { standings: [{ team_name: "BC Orthez", team_logo_url: "https://x.test/orthez.png" }] } },
    matchInProgress: { state: "off" },
  };
  const run = (matchIndex) =>
    computeViewModel({ entities, config: { entity: "sensor.x" }, lang: "en", now: new Date("2098-12-01T10:00:00"), matchIndex });

  it("does not reuse the next-opponent sensor logo for another opponent", () => {
    const vm = run(0);
    expect(vm.leftLogo).toBe("https://x.test/my.png");
    expect(vm.rightLogo).toBe("https://x.test/orthez.png");
  });

  it("uses the sensor opponent logo when the opponent name matches", () => {
    const vm = run(1);
    expect(vm.leftLogo).toBe("https://x.test/dax.png");
    expect(vm.rightLogo).toBe("https://x.test/my.png");
  });
});

describe("computeViewModel carousel logos: robustness", () => {
  const base = {
    nextOpponent: { state: "Dax", attributes: { team_logo_url: "https://x.test/my.png", opponent_logo_url: "https://x.test/dax.png" } },
    nextDate: { state: "2099-01-10T20:00:00", attributes: {} },
    poule: { state: "Poule B", attributes: { team: "Basket Landes" } },
    matchInProgress: { state: "off" },
  };
  const run = (calendar) =>
    computeViewModel({
      entities: { ...base, poule: { ...base.poule, attributes: { ...base.poule.attributes, calendar } } },
      config: { entity: "sensor.x" },
      lang: "en",
      now: new Date("2098-12-01T10:00:00"),
      matchIndex: 0,
    });

  it("keeps the sensor logo for the next match when names are spelled differently", () => {
    const vm = run([{ home_team: "Basket Landes", away_team: "Union Sportive Dax Gamarde", is_home: true, date: "2099-01-10T20:00:00" }]);
    expect(vm.rightLogo).toBe("https://x.test/dax.png");
  });
});

describe("computeViewModel carousel team URLs", () => {
  const T = "Basket Landes";
  const entities = {
    nextOpponent: { state: "US Dax", attributes: { team_url: "https://x.test/me", opponent_url: "https://x.test/dax" } },
    nextDate: { state: "2099-01-10T20:00:00", attributes: {} },
    poule: {
      state: "Poule B",
      attributes: {
        team: T,
        calendar: [
          { home_team: T, away_team: "US Dax", date: "2099-01-10T20:00:00" },
          { home_team: "BC Orthez - 1", away_team: T, date: "2099-01-17T20:00:00" },
        ],
      },
    },
    rank: { state: "1", attributes: { standings: [{ team_name: "BC Orthez", team_url: "https://x.test/orthez" }] } },
    matchInProgress: { state: "off" },
  };
  const run = (matchIndex) =>
    computeViewModel({ entities, config: { entity: "sensor.x" }, lang: "en", now: new Date("2098-12-01T10:00:00"), matchIndex });

  it("resolves both URLs for the match the opponent sensor describes", () => {
    const vm = run(0);
    expect(vm.leftUrl).toBe("https://x.test/me");
    expect(vm.rightUrl).toBe("https://x.test/dax");
  });

  it("looks other opponents up in the standings instead of reusing the sensor URL", () => {
    const vm = run(1);
    expect(vm.leftUrl).toBe("https://x.test/orthez");
    expect(vm.rightUrl).toBe("https://x.test/me");
  });
});

describe("resolveCalendarTeamLogo", () => {
  const MY = "https://x.test/my.png";
  const OPP_NEXT = "https://x.test/next.png";
  const OPP_LAST = "https://x.test/last.png";
  const base = {
    teamName: "US Dax",
    nextOpponentState: "US Dax",
    nextOpponentLogo: OPP_NEXT,
    lastOpponentState: "AS Pau",
    lastOpponentLogo: OPP_LAST,
    myTeamLogo: MY,
  };

  it("returns the logo carried by the match row first, over every sensor", () => {
    expect(resolveCalendarTeamLogo({ ...base, matchLogo: "https://x.test/row.png" })).toBe("https://x.test/row.png");
  });

  it("ignores an unsafe or malformed row logo and keeps resolving", () => {
    for (const bad of ["javascript:alert(1)", "data:text/html,x", "logo.png", "", null, 42]) {
      expect(resolveCalendarTeamLogo({ ...base, matchLogo: bad }), String(bad)).toBe(OPP_NEXT);
    }
  });

  it("uses the next-opponent sensor logo only when the team name matches it", () => {
    expect(resolveCalendarTeamLogo(base)).toBe(OPP_NEXT);
    expect(resolveCalendarTeamLogo({ ...base, teamName: "BC Orthez" })).toBe(DEFAULT_FALLBACK_LOGO);
  });

  it("matches the sensor name loosely (case, accents, punctuation, suffix)", () => {
    expect(resolveCalendarTeamLogo({ ...base, teamName: "us  DAX - 1" })).toBe(OPP_NEXT);
    expect(resolveCalendarTeamLogo({ ...base, teamName: "Union Sportive Dax", nextOpponentState: "Dax" })).toBe(OPP_NEXT);
  });

  it("falls back to the last-opponent sensor when only that one matches", () => {
    expect(resolveCalendarTeamLogo({ ...base, teamName: "AS Pau" })).toBe(OPP_LAST);
  });

  it("does not use a sensor logo that is missing or unsafe", () => {
    expect(resolveCalendarTeamLogo({ ...base, nextOpponentLogo: null })).toBe(DEFAULT_FALLBACK_LOGO);
    expect(resolveCalendarTeamLogo({ ...base, nextOpponentLogo: "javascript:x" })).toBe(DEFAULT_FALLBACK_LOGO);
  });

  it("returns my team's logo for my own row, without needing a name", () => {
    expect(resolveCalendarTeamLogo({ ...base, teamName: "", isMyTeam: true })).toBe(MY);
    expect(resolveCalendarTeamLogo({ ...base, teamName: "Basket Landes", isMyTeam: true })).toBe(MY);
  });

  it("never returns my team's logo for an opponent row", () => {
    expect(resolveCalendarTeamLogo({ ...base, teamName: "BC Orthez", isMyTeam: false })).not.toBe(MY);
  });

  it("returns the default crest when there is nothing to show", () => {
    expect(resolveCalendarTeamLogo()).toBe(DEFAULT_FALLBACK_LOGO);
    expect(resolveCalendarTeamLogo({ teamName: "" })).toBe(DEFAULT_FALLBACK_LOGO);
    expect(resolveCalendarTeamLogo({ teamName: "X", isMyTeam: true, myTeamLogo: DEFAULT_FALLBACK_LOGO })).toBe(DEFAULT_FALLBACK_LOGO);
  });

  it("looks the team up in the standings when the sensors do not know it", () => {
    const standings = [{ team_name: "BC Orthez", team_logo_url: "https://x.test/orthez.png" }];
    expect(resolveCalendarTeamLogo({ ...base, teamName: "BC Orthez - 1", standings })).toBe("https://x.test/orthez.png");
  });

  it("tries the standings logo keys in order and skips rows without a usable one", () => {
    const standings = [{ team_name: "BC Orthez", logo: "https://x.test/logo-key.png", crest: "https://x.test/crest.png" }];
    expect(resolveCalendarTeamLogo({ ...base, teamName: "BC Orthez", standings })).toBe("https://x.test/logo-key.png");
    expect(resolveCalendarTeamLogo({ ...base, teamName: "BC Orthez", standings: [{ team_name: "BC Orthez" }] })).toBe(DEFAULT_FALLBACK_LOGO);
    expect(resolveCalendarTeamLogo({ ...base, teamName: "BC Orthez", standings: "nope" })).toBe(DEFAULT_FALLBACK_LOGO);
  });
});

describe("carousel with a real FFBB dataset (UJSBP U13M)", () => {
  const T = "UNION JEUN SP BUGLOSE PONTONX";
  const asset = (id) => `https://api.ffbb.app/assets/${id}?height=220&fit=contain&format=avif`;
  const MY = asset("c6d1d2fc");
  const MAGESCQ = asset("4777cdef");
  const BIAUDOS = asset("3b1c5eb8");
  const team = (n) => `https://competitions.ffbb.com/equipes/${n}`;

  const entities = {
    nextOpponent: {
      state: "BASKET BIAUDOS ST MARTIN DE SEIG",
      attributes: { is_home: false, team_url: team(1), opponent_url: team(5), team_logo_url: MY, opponent_logo_url: BIAUDOS },
    },
    nextDate: { state: "2026-09-26T14:00:00+00:00", attributes: { round: 2, team_logo_url: MY, opponent_logo_url: BIAUDOS } },
    nextVenue: { state: "away", attributes: { is_home: false } },
    lastOpponent: {
      state: "MAGESCQ BASKET",
      attributes: { team_url: team(1), opponent_url: team(4), team_logo_url: MY, opponent_logo_url: MAGESCQ },
    },
    lastDate: { state: "2026-09-19T11:00:00+00:00", attributes: { round: 1, is_home: true } },
    lastScore: { state: "51 - 46", attributes: { is_home: true } },
    poule: {
      state: "D2 Poule B",
      attributes: {
        team: T,
        competition: "Départementale masculine U13 - Division 2",
        calendar: [
          { round: 1, home_team: T, away_team: "MAGESCQ BASKET", date: "2026-09-19T11:00:00+00:00", score: "51 - 46", is_played: true },
          { round: 2, home_team: "BASKET BIAUDOS ST MARTIN DE SEIG", away_team: T, date: "2026-09-26T14:00:00+00:00", score: null, is_played: false },
          { round: 3, home_team: "BISCARROSSE OLYMPIQUE BASKET - 1", away_team: T, date: "2026-10-10T11:30:00+00:00", score: null, is_played: false },
          { round: 5, home_team: T, away_team: "BASKET OCEAN COTE SUD - 1", date: "2026-11-07T12:30:00+00:00", score: null, is_played: false },
        ],
      },
    },
    rank: {
      state: "1",
      attributes: {
        standings: [
          { position: 1, team_name: T, team_url: team(1), url: team(1) },
          { position: 2, team_name: "BISCARROSSE OLYMPIQUE BASKET", team_url: team(2), url: team(2) },
          { position: 3, team_name: "BASKET OCEAN COTE SUD", team_url: team(3), url: team(3) },
          { position: 4, team_name: "MAGESCQ BASKET", team_url: team(4), url: team(4) },
          { position: 5, team_name: "BASKET BIAUDOS ST MARTIN DE SEIG", team_url: team(5), url: team(5) },
        ],
      },
    },
    matchInProgress: { state: "off" },
  };

  const at = (matchIndex) =>
    computeViewModel({
      entities,
      config: { entity: "sensor.ujsbp_u13m_poule" },
      lang: "fr",
      now: new Date("2026-09-21T10:00:00"),
      matchIndex,
    });

  it("J1 (played, home): both crests and both links resolve", () => {
    const vm = at(0);
    expect([vm.leftName, vm.rightName]).toEqual([T, "MAGESCQ BASKET"]);
    expect([vm.leftLogo, vm.rightLogo]).toEqual([MY, MAGESCQ]);
    expect([vm.leftUrl, vm.rightUrl]).toEqual([team(1), team(4)]);
    expect(vm.isPostMatch).toBe(true);
  });

  it("J1: scoreParts puts our own 51 first (home) as 'my', MAGESCQ's 46 as 'opponent'", () => {
    const vm = at(0);
    expect(vm.displayedScore).toBe("51 - 46");
    expect(vm.scoreParts).toEqual({ my: "51", opponent: "46" });
  });

  it("J2 (next match, away): the opponent sits on the left with its own crest", () => {
    const vm = at(1);
    expect([vm.leftName, vm.rightName]).toEqual(["BASKET BIAUDOS ST MARTIN DE SEIG", T]);
    expect([vm.leftLogo, vm.rightLogo]).toEqual([BIAUDOS, MY]);
    expect([vm.leftUrl, vm.rightUrl]).toEqual([team(5), team(1)]);
    expect(vm.isPostMatch).toBe(false);
  });

  it("J3: never shows the next opponent's crest for a different club, but still links to it", () => {
    const vm = at(2);
    expect(vm.leftLogo).not.toBe(BIAUDOS);
    expect(vm.leftLogo).toBe(DEFAULT_FALLBACK_LOGO);
    expect(vm.rightLogo).toBe(MY);
    expect(vm.leftUrl).toBe(team(2));
    expect(vm.rightUrl).toBe(team(1));
  });

  it("J5 (later home match): my crest on the left, default crest and standings link for the opponent", () => {
    const vm = at(3);
    expect(vm.leftLogo).toBe(MY);
    expect(vm.rightLogo).toBe(DEFAULT_FALLBACK_LOGO);
    expect([vm.leftUrl, vm.rightUrl]).toEqual([team(1), team(3)]);
  });

  it("never returns a nullish crest or an empty href on any match", () => {
    for (let i = 0; i < 4; i++) {
      const vm = at(i);
      expect(vm.leftLogo).toBeTruthy();
      expect(vm.rightLogo).toBeTruthy();
      expect(vm.leftUrl).toBeTruthy();
      expect(vm.rightUrl).toBeTruthy();
    }
  });

  it("keeps the round and venue consistent with the match shown", () => {
    expect(at(0).roundNumber).toBe("1");
    expect(at(2).roundNumber).toBe("3");
    expect(at(1).isHome).toBe(false);
    expect(at(3).isHome).toBe(true);
  });

  it("clamps an out-of-range index instead of crashing", () => {
    expect(at(99).leftName).toBe(T);
    expect(at(-5).rightName).toBe("MAGESCQ BASKET");
  });

  it("without an index (no carousel), falls back to the sensors' own crests", () => {
    const vm = computeViewModel({
      entities,
      config: { entity: "sensor.ujsbp_u13m_poule" },
      lang: "fr",
      now: new Date("2026-09-21T10:00:00"),
      manualView: "next",
    });
    expect([vm.leftLogo, vm.rightLogo]).toEqual([BIAUDOS, MY]);
  });

  it("a row-level logo or link, when the integration provides one, wins over every fallback", () => {
    const withLogos = {
      ...entities,
      poule: {
        ...entities.poule,
        attributes: {
          ...entities.poule.attributes,
          calendar: entities.poule.attributes.calendar.map((m) =>
            m.round === 3
              ? { ...m, home_logo: "https://x.test/bisc.png", home_url: "https://x.test/bisc" }
              : m
          ),
        },
      },
    };
    const vm = computeViewModel({
      entities: withLogos,
      config: { entity: "sensor.ujsbp_u13m_poule" },
      lang: "fr",
      now: new Date("2026-09-21T10:00:00"),
      matchIndex: 2,
    });
    expect(vm.leftLogo).toBe("https://x.test/bisc.png");
    expect(vm.leftUrl).toBe("https://x.test/bisc");
  });
});

describe("findTeamUrl: opponent and own-team resolution", () => {
  const entities = {
    rank: {
      attributes: {
        standings: [
          { team_name: "US Dax", team_url: "https://x.test/dax" },
          { team_name: "Basket Landes", url: "https://x.test/landes" },
        ],
      },
    },
  };

  it("uses the opponent sensor's opponent_url for the opponent side", () => {
    const url = findTeamUrl({
      isHome: false,
      teamName: "US Dax",
      entities,
      opponentSensor: { attributes: { opponent_url: "https://x.test/sensor-dax" } },
    });
    expect(url).toBe("https://x.test/sensor-dax");
  });

  it("uses the sensor's team_url for my own side, then the standings", () => {
    expect(
      findTeamUrl({ isHome: true, teamName: "Basket Landes", entities, opponentSensor: { attributes: { team_url: "https://x.test/me" } } })
    ).toBe("https://x.test/me");
    expect(findTeamUrl({ isHome: true, teamName: "Basket Landes", entities, opponentSensor: null })).toBe("https://x.test/landes");
  });

  it("falls back to the standings by team name for the opponent", () => {
    expect(findTeamUrl({ isHome: false, teamName: "US Dax", entities, opponentSensor: null })).toBe("https://x.test/dax");
  });

  it("returns null rather than a competition URL when nothing matches", () => {
    expect(findTeamUrl({ isHome: false, teamName: "Nobody", entities, opponentSensor: null })).toBeNull();
    expect(findTeamUrl()).toBeNull();
  });

  it("rejects an unsafe URL coming from a sensor", () => {
    const url = findTeamUrl({
      isHome: false,
      teamName: "Nobody",
      entities: {},
      opponentSensor: { attributes: { opponent_url: "javascript:alert(1)" } },
    });
    expect(url).toBeNull();
  });
});

describe("carousel with the calendar rows as the integration really sends them (UJSBP U13M)", () => {
  const T = "UNION JEUN SP BUGLOSE PONTONX";
  const logo = (id) => `https://api.ffbb.app/assets/${id}?height=220&fit=contain&format=avif`;
  const url = (club, team) => `https://competitions.ffbb.com/ligues/naq/comites/0040/clubs/${club}/equipes/${team}`;
  const L = {
    me: logo("c6d1d2fc-e612-42ae-a1bd-2474cc12fbc8"),
    magescq: logo("4777cdef-c834-4f79-92c4-176e99247033"),
    biaudos: logo("3b1c5eb8-88c2-4654-b3d3-536de26120a2"),
    biscarrosse: logo("38eaa9cb-9fba-4ded-b473-81e143170dcc"),
    ocean: logo("a9ef59d4-7cdf-4393-af36-230c2703eb8b"),
  };
  const U = {
    me: url("naq0040116", "200000005374157"),
    magescq: url("naq0040061", "200000005374156"),
    biaudos: url("naq0040127", "200000005374154"),
    biscarrosse: url("naq0040013", "200000005374158"),
    ocean: url("naq0040135", "200000005374155"),
  };
  const row = (round, home, away, homeKey, awayKey, isHome, played) => ({
    round,
    home_team: home,
    away_team: away,
    home_logo: L[homeKey],
    away_logo: L[awayKey],
    home_url: U[homeKey],
    away_url: U[awayKey],
    date: "2026-09-19T11:00:00+00:00",
    score: played ? "51 - 46" : null,
    is_played: played,
    is_home: isHome,
  });
  const entities = {
    nextOpponent: { state: "BASKET BIAUDOS ST MARTIN DE SEIG", attributes: { is_home: false, team_logo_url: L.me, opponent_logo_url: L.biaudos } },
    nextDate: { state: "2026-09-26T14:00:00+00:00", attributes: { round: 2 } },
    lastOpponent: { state: "MAGESCQ BASKET", attributes: { team_logo_url: L.me, opponent_logo_url: L.magescq } },
    poule: {
      state: "D2 Poule B",
      attributes: {
        team: T,
        calendar: [
          row(1, T, "MAGESCQ BASKET", "me", "magescq", true, true),
          row(2, "BASKET BIAUDOS ST MARTIN DE SEIG", T, "biaudos", "me", false, false),
          row(3, "BISCARROSSE OLYMPIQUE BASKET - 1", T, "biscarrosse", "me", false, false),
          row(5, T, "BASKET OCEAN COTE SUD - 1", "me", "ocean", true, false),
        ],
      },
    },
    matchInProgress: { state: "off" },
  };
  const at = (matchIndex) =>
    computeViewModel({ entities, config: { entity: "sensor.ujsbp_u13m_poule" }, lang: "fr", now: new Date("2026-09-21T10:00:00"), matchIndex });

  it.each([
    [0, "me", "magescq"],
    [1, "biaudos", "me"],
    [2, "biscarrosse", "me"],
    [3, "me", "ocean"],
  ])("match %i shows the crest and link carried by its own row on each side", (i, left, right) => {
    const vm = at(i);
    expect([vm.leftLogo, vm.rightLogo]).toEqual([L[left], L[right]]);
    expect([vm.leftUrl, vm.rightUrl]).toEqual([U[left], U[right]]);
  });

  it("never falls back to the default crest when every row carries its logos", () => {
    for (let i = 0; i < 4; i++) {
      const vm = at(i);
      expect(vm.leftLogo).not.toBe(DEFAULT_FALLBACK_LOGO);
      expect(vm.rightLogo).not.toBe(DEFAULT_FALLBACK_LOGO);
    }
  });
});

describe("resolveDisplayMode()", () => {
  it.each([
    [{ display_mode: "match" }, "match"],
    [{ display_mode: "standings" }, "standings"],
    [{ display_mode: "both" }, "both"],
  ])("keeps a valid display_mode: %o -> %s", (config, expected) => {
    expect(resolveDisplayMode(config)).toBe(expected);
  });

  it.each([undefined, {}, { display_mode: undefined }, { display_mode: "bogus" }, { display_mode: 3 }])(
    "falls back to \"match\" for anything else: %o",
    (config) => {
      expect(resolveDisplayMode(config)).toBe("match");
    }
  );
});

describe("estimateCardSize() -- getCardSize() units for the masonry view (1 unit = 50px)", () => {
  it("match mode always returns the flat estimate, regardless of standings data", () => {
    expect(estimateCardSize({ config: { display_mode: "match" }, standings: Array(20).fill({}) })).toBe(3);
    expect(estimateCardSize({ config: { display_mode: "match" } })).toBe(3);
    expect(estimateCardSize({})).toBe(3);
    expect(estimateCardSize()).toBe(3);
  });

  it("standings mode grows with the pool size, and shrinks back down with it", () => {
    const sizeFor = (teamCount) =>
      estimateCardSize({ config: { display_mode: "standings" }, standings: Array(teamCount).fill({}) });
    expect(sizeFor(0)).toBe(3);
    expect(sizeFor(8)).toBe(7);
    expect(sizeFor(14)).toBe(10);
    expect(sizeFor(20)).toBe(13);
    // never gets smaller as more teams are added
    const sizes = [0, 4, 8, 12, 16, 20].map(sizeFor);
    expect(sizes).toEqual([...sizes].sort((a, b) => a - b));
  });

  it("missing or malformed standings data counts as an empty pool, not a crash", () => {
    const size = (standings) => estimateCardSize({ config: { display_mode: "standings" }, standings });
    expect(size(undefined)).toBe(3);
    expect(size(null)).toBe(3);
    expect(size("not an array")).toBe(3);
    expect(size([])).toBe(3);
  });

  it("both mode is the match card size plus the standings card size, not a separate flat guess", () => {
    const teamCount = 12;
    const standings = Array(teamCount).fill({});
    const matchOnly = estimateCardSize({ config: { display_mode: "match" }, standings });
    const standingsOnly = estimateCardSize({ config: { display_mode: "standings" }, standings });
    const both = estimateCardSize({ config: { display_mode: "both" }, standings });
    expect(both).toBe(matchOnly + standingsOnly);
  });

  it("an invalid display_mode is estimated exactly like \"match\"", () => {
    expect(estimateCardSize({ config: { display_mode: "nope" }, standings: Array(20).fill({}) })).toBe(3);
  });
});

describe("targeted coverage: rare branches", () => {
  it("findOpponentRank(): the substring-fallback loop skips a null/falsy entry before finding the match", () => {
    const standings = [null, undefined, { team_name: "Alpha Basket Club" }, { team_name: "Beta" }];
    // "Alpha" has no exact match in the list, so it only succeeds via the
    // substring fallback -- which itself has to walk past the two falsy
    // entries first.
    expect(findOpponentRank("Alpha", standings)).toBeUndefined();
  });

  it("sanitizeUrl(): keeps a same-origin /local/ or /api/ path as-is, without prefixing the FFBB domain", () => {
    expect(sanitizeUrl("/local/community/logo.png")).toBe("/local/community/logo.png");
    expect(sanitizeUrl("/api/image_proxy/camera.front_door")).toBe("/api/image_proxy/camera.front_door");
  });

  it("isAtOrAfterDMinusOne(): a missing/unknown/unavailable/empty date is never at or after D-1", () => {
    expect(isAtOrAfterDMinusOne(null)).toBe(false);
    expect(isAtOrAfterDMinusOne(undefined)).toBe(false);
    expect(isAtOrAfterDMinusOne("")).toBe(false);
    expect(isAtOrAfterDMinusOne("unknown")).toBe(false);
    expect(isAtOrAfterDMinusOne("unavailable")).toBe(false);
  });

  it("resolveHour12(): an invalid locale tag falls back to false via the catch branch", () => {
    // Intl.DateTimeFormat throws a RangeError for a malformed BCP-47 tag.
    expect(resolveHour12(undefined, "not a valid locale!!")).toBe(false);
  });

  it("resolveHour12(): falls back to hourCycle when the runtime's Intl does not expose hour12", () => {
    const RealDateTimeFormat = Intl.DateTimeFormat;
    class FakeDateTimeFormat {
      resolvedOptions() {
        // A hypothetical Intl implementation that only reports hourCycle,
        // not the newer hour12 boolean.
        return { hourCycle: "h12" };
      }
    }
    vi.stubGlobal("Intl", { ...Intl, DateTimeFormat: FakeDateTimeFormat });
    try {
      expect(resolveHour12(undefined, "en-US")).toBe(true);
    } finally {
      vi.stubGlobal("Intl", { ...Intl, DateTimeFormat: RealDateTimeFormat });
    }
  });

  it("computeViewModel(): resolves an opponent's URL from the OTHER sensor (lastOpponent) when its name matches a different calendar row", () => {
    const T = "Basket Landes";
    const entities = {
      nextOpponent: { state: "US Dax", attributes: { team_url: "https://x.test/me", opponent_url: "https://x.test/dax" } },
      lastOpponent: { state: "AS Pau", attributes: { opponent_url: "https://x.test/pau-sensor" } },
      nextDate: { state: "2099-01-10T20:00:00", attributes: {} },
      poule: {
        state: "Poule B",
        attributes: {
          team: T,
          calendar: [
            { home_team: T, away_team: "US Dax", date: "2099-01-10T20:00:00" },
            { home_team: T, away_team: "AS Pau", date: "2099-01-24T20:00:00" },
          ],
        },
      },
      rank: {
        state: "1",
        attributes: {
          standings: [{ team_name: "AS Pau", team_url: "https://x.test/pau-standings" }],
        },
      },
      matchInProgress: { state: "off" },
    };
    const vm = computeViewModel({
      entities,
      config: { entity: "sensor.x" },
      lang: "en",
      now: new Date("2098-12-01T10:00:00"),
      matchIndex: 1,
    });
    // Proves the sensor loop (nextOpponent/lastOpponent) won, not the
    // standings fallback -- the two would disagree if it had used standings.
    expect(vm.rightUrl).toBe("https://x.test/pau-sensor");
  });
});
