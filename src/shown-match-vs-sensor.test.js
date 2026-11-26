// The "last score" / "last result" sensors describe the LAST played match.
// When the carousel shows another played match, the card must not borrow
// those sensors (C1, C2), and a team link must not go to a team whose name
// merely contains the opponent's name (C3).
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { computeViewModel } from "./pure.js";

const NOW = new Date("2026-11-20T12:00:00+00:00");
const ME = "UNION JEUN SP BUGLOSE PONTONX";
const row = (round, over = {}) => ({
  round,
  match_number: `m${round}`,
  home_team: ME,
  away_team: `ADVERSAIRE ${round}`,
  date: `2026-10-${String(round * 3).padStart(2, "0")}T12:00:00+00:00`,
  score: null,
  result: null,
  is_played: true,
  is_home: true,
  is_stale: false,
  ...over,
});
const st = (state, attributes = {}) => ({ state, attributes });

// Round 1: played, no score/result (forfeit). Round 2: played, 70 - 60 win.
const CAL = [
  row(1),
  row(2, { score: "70 - 60", result: "win" }),
];
const entities = (over = {}) => ({
  poule: st("Poule", { team: ME, calendar: CAL }),
  lastScore: st("70 - 60", { is_home: true }),
  lastResult: st("win"),
  lastDate: st(CAL[1].date, { round: "2", match_number: "m2" }),
  lastOpponent: st("ADVERSAIRE 2"),
  nextDate: st("unknown"),
  nextOpponent: st("unknown"),
  ...over,
});
const vm = (matchIndex, ents = entities()) =>
  computeViewModel({
    entities: ents,
    config: { entity: "sensor.x_poule" },
    lang: "fr",
    now: NOW,
    states: {},
    matchIndex,
  });

describe("C2: score of the match on screen", () => {
  it("does not show the last match's score on an older match without score", () => {
    expect(vm(0).displayedScore).toBe("-");
  });
  it("still uses the sensor for the last played match when the calendar has no score yet", () => {
    const cal = [row(1, { score: "50 - 40", result: "win" }), row(2)];
    const ents = entities({ poule: st("Poule", { team: ME, calendar: cal }) });
    expect(vm(1, ents).displayedScore).toBe("70 - 60");
  });
  it("keeps the calendar score when there is one", () => {
    expect(vm(1).displayedScore).toBe("70 - 60");
  });
});

describe("C1: result badge of the match on screen", () => {
  it("shows no badge on an older match without result", () => {
    expect(vm(0).displayedResult).toBeNull();
  });
  it("ignores an unavailable sensor", () => {
    const ents = entities({ lastResult: st("unavailable") });
    expect(vm(0, ents).displayedResult).toBeNull();
    const cal = [row(1, { score: "50 - 40", result: "win" }), row(2)];
    const ents2 = entities({
      poule: st("Poule", { team: ME, calendar: cal }),
      lastResult: st("unavailable"),
    });
    expect(vm(1, ents2).displayedResult).toBeNull();
  });
  it("falls back on the sensor only for the last played match", () => {
    const cal = [row(1, { score: "50 - 40", result: "win" }), row(2)];
    const ents = entities({
      poule: st("Poule", { team: ME, calendar: cal }),
      lastResult: st("loss"),
    });
    expect(vm(1, ents).displayedResult).toBe("loss");
  });
  it("rejects values that are not win/loss/draw", () => {
    const ents = entities({ lastResult: st("banana") });
    expect(vm(1, entities({ poule: st("Poule", { team: ME, calendar: [row(1), row(2)] }), lastResult: st("banana") })).displayedResult).toBeNull();
    expect(ents).toBeTruthy();
  });
  it("keeps the calendar result", () => {
    expect(vm(1).displayedResult).toBe("win");
  });
});

describe("C3: team link by name", () => {
  const cal = [
    row(1, { away_team: "BC LYON", score: "50 - 40", result: "win" }),
    row(2, { away_team: "BC LYON 2", score: "70 - 60", result: "win" }),
  ];
  const ents = {
    poule: st("Poule", { team: ME, calendar: cal }),
    lastOpponent: st("BC LYON 2", { opponent_url: "https://ffbb.example/equipes/222" }),
    nextOpponent: st("unknown"),
    nextDate: st("unknown"),
    lastDate: st(cal[1].date),
    lastScore: st("70 - 60", { is_home: true }),
    lastResult: st("win"),
  };
  const at = (matchIndex) =>
    computeViewModel({ entities: ents, config: { entity: "sensor.x_poule" }, lang: "fr", now: NOW, states: {}, matchIndex });

  it("does not link 'BC LYON' to the URL of 'BC LYON 2'", () => {
    expect(at(0).rightUrl || "").not.toContain("/equipes/222");
  });
  it("still links 'BC LYON 2' to its own URL", () => {
    expect(at(1).rightUrl).toBe("https://ffbb.example/equipes/222");
  });
});

describe("C5: venue pills follow the card language", () => {
  it("has the translation keys in both languages", () => {
    const read = (l) => JSON.parse(readFileSync(new URL(`../translations/${l}.json`, import.meta.url), "utf8"));
    const fr = read("fr");
    const en = read("en");
    expect([fr.card.home_short, fr.card.away_short]).toEqual(["DOM", "EXT"]);
    expect([en.card.home_short, en.card.away_short]).toEqual(["HOME", "AWAY"]);
  });
});
