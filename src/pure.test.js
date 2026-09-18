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
    { team_name: "US Dax 2", url: "https://ffbb.com/dax2" },
    { team_name: "US Dax", url: "https://ffbb.com/dax" },
    { team_name: "Basket Landes", team_url: "https://ffbb.com/basket-landes" },
    { team_name: "-" },
  ];

  it("returns null when standings isn't an array", () => {
    expect(findUrlInStandings("US Dax", null, ["url"])).toBeNull();
    expect(findUrlInStandings("US Dax", undefined, ["url"])).toBeNull();
  });

  it("strictly prefers exact name match over substring match", () => {
    expect(findUrlInStandings("US Dax", standings, ["url"])).toBe("https://ffbb.com/dax");
  });

  it("finds a fuzzy-matched row's url via the first key that resolves", () => {
    expect(findUrlInStandings("basket landes", standings, ["team_url", "url"])).toBe(
      "https://ffbb.com/basket-landes"
    );
  });

  it("returns null when matched row has none of requested keys or cleans to empty", () => {
    expect(findUrlInStandings("---", standings, ["url"])).toBeNull();
    expect(findUrlInStandings(null, standings, ["url"])).toBeNull();
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

  it("formats French ordinals", () => {
    expect(formatRank(1, "fr")).toBe("1er");
    expect(formatRank(2, "fr")).toBe("2e");
  });

  it("formats English ordinals, including 11th/12th/13th exceptions", () => {
    expect(formatRank(1, "en")).toBe("1st");
    expect(formatRank(2, "en")).toBe("2nd");
    expect(formatRank(3, "en")).toBe("3rd");
    expect(formatRank(11, "en")).toBe("11th");
    expect(formatRank(21, "en")).toBe("21st");
  });
});

describe("findOpponentRank", () => {
  const standings = [
    { team_name: "US Dax 2", position: 1 },
    { team_name: "US Dax", position: 4 },
    { team_name: "Basket Landes", position: 7 },
    { team_name: "-" },
  ];

  it("strictly prefers exact match over substring match", () => {
    expect(findOpponentRank("US Dax", standings)).toBe(4);
    expect(findOpponentRank("US Dax 2", standings)).toBe(1);
  });

  it("returns null for non-matching or empty inputs and ignores empty row names", () => {
    expect(findOpponentRank("Other Team", standings)).toBeNull();
    expect(findOpponentRank("---", standings)).toBeNull();
    expect(findOpponentRank(null, standings)).toBeNull();
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
});

describe("sanitizeUrl", () => {
  it("accepts absolute http(s) URLs", () => {
    expect(sanitizeUrl("https://competitions.ffbb.com/equipes/123")).toBe(
      "https://competitions.ffbb.com/equipes/123"
    );
  });

  it("rejects unsafe or unrecognized schemes", () => {
    expect(sanitizeUrl("javascript:alert(1)")).toBeNull();
    expect(sanitizeUrl("data:text/html,<script>alert(1)</script>")).toBeNull();
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
});

describe("isWithinDPlusOne", () => {
  const matchDate = "2026-09-12T20:00:00";

  it("returns true on game day after start and throughout D+1", () => {
    const nowMid = new Date("2026-09-13T14:00:00");
    expect(isWithinDPlusOne(matchDate, nowMid)).toBe(true);
  });

  it("returns false as soon as D+2 starts at midnight", () => {
    const nowD2 = new Date("2026-09-14T00:00:00");
    expect(isWithinDPlusOne(matchDate, nowD2)).toBe(false);
  });
});

describe("isAtOrAfterDMinusOne", () => {
  const nextMatchDate = "2026-09-19T20:00:00";

  it("returns false prior to D-1 midnight and true from D-1 midnight onward", () => {
    const nowThu = new Date("2026-09-17T23:59:59");
    const nowFriStart = new Date("2026-09-18T00:00:00");
    expect(isAtOrAfterDMinusOne(nextMatchDate, nowThu)).toBe(false);
    expect(isAtOrAfterDMinusOne(nextMatchDate, nowFriStart)).toBe(true);
  });
});

describe("computeIsPostMatch", () => {
  const lastDate = "2026-09-12T20:00:00";

  it("prioritizes manualView when provided", () => {
    expect(computeIsPostMatch({ manualView: "last" })).toBe(true);
    expect(computeIsPostMatch({ manualView: "next" })).toBe(false);
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
  });
});

describe("sortStandings", () => {
  it("sorts string positions numerically rather than alphabetically", () => {
    const raw = [
      { position: "1", team_name: "Team A" },
      { position: "10", team_name: "Team J" },
      { position: "2", team_name: "Team B" },
    ];
    const sorted = sortStandings(raw);
    expect(sorted.map((item) => item.position)).toEqual(["1", "2", "10"]);
  });
});

describe("resolveAccentColor", () => {
  it("returns default basketball orange when mode is default or missing", () => {
    expect(resolveAccentColor({})).toBe("#ff6b00");
  });
});

describe("formatDate", () => {
  it("formats valid ISO dates", () => {
    const formatted = formatDate("2026-09-12T20:00:00", "fr");
    expect(formatted).not.toBeNull();
    expect(formatted.weekday).toBeDefined();
  });
});

describe("findTeamUrl", () => {
  it("resolves home team url from opponent sensor first", () => {
    const opponentSensor = { attributes: { team_url: "https://ffbb.com/team" } };
    const url = findTeamUrl({ isHome: true, opponentSensor });
    expect(url).toBe("https://ffbb.com/team");
  });
});

describe("computeViewModel", () => {
  const baseEntities = {
    nextOpponent: { state: "US Mont-de-Marsan", attributes: { team_logo_url: "/logo1.png" } },
    nextDate: { state: "2026-09-19T20:00:00", attributes: { round: "2" } },
    poule: { state: "Poule B", attributes: { team: "Basket Landes" } },
    rank: { state: "1", attributes: { standings: [{ team_name: "Basket Landes", position: 1 }] } },
    matchInProgress: { state: "off" },
  };

  it("computes pre-match view model and flags isGameDay when matching current date", () => {
    const vm = computeViewModel({
      entities: baseEntities,
      config: { entity: "sensor.test" },
      lang: "fr",
      now: new Date("2026-09-19T10:00:00"),
    });

    expect(vm.isGameDay).toBe(true);
    expect(vm.teamName).toBe("Basket Landes");
  });
});