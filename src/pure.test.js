import { describe, it, expect } from "vitest";
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
} from "./pure.js";

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