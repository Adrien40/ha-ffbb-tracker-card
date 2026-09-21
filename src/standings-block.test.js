// @vitest-environment happy-dom
//
// Tests for the "standings below the card" feature (show_standings_below).
// The feature lives in standings-block.js; ha-ffbb-tracker-card.js only calls
// it, so the tests are split the same way: the module on its own first, then
// the card with the option on and off.
import { describe, it, expect, afterEach } from "vitest";
import { render } from "lit";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderStandingsBlock, standingsBlockStyles, isHighlightedRow, DETAILED_COLUMNS } from "./standings-block.js";
import "./ha-ffbb-tracker-card.js";

const t = (_key, fallback) => fallback;

// 14 teams, deliberately out of order, to prove nothing is cut or scrolled.
function makeStandings(n = 14) {
  const rows = Array.from({ length: n }, (_, i) => ({
    position: i + 1,
    team_name: `Equipe ${i + 1}`,
    points: 40 - i,
    played: 10,
    wins: 10 - i,
    losses: i,
  }));
  return [...rows].reverse();
}

function renderBlock(overrides = {}) {
  const host = document.createElement("div");
  const result = renderStandingsBlock({
    standings: makeStandings(),
    poule: "Poule B",
    competition: "Wonderligue",
    teamName: "Equipe 3",
    opponentName: "Equipe 9",
    accentColor: "#ff6b00",
    t,
    ...overrides,
  });
  render(result, host);
  return host;
}

describe("standings-block.js isHighlightedRow()", () => {
  it("matches the user's team, ignoring case, accents and punctuation", () => {
    expect(isHighlightedRow({ team_name: "US Mont-de-Marsan" }, "us mont de marsan", "")).toBe(true);
  });

  it("matches the opponent", () => {
    expect(isHighlightedRow({ team_name: "AS Dax" }, "Basket Landes", "AS Dax")).toBe(true);
  });

  it("does not match unrelated teams", () => {
    expect(isHighlightedRow({ team_name: "AS Dax" }, "Basket Landes", "US Mont-de-Marsan")).toBe(false);
  });

  it("reads the name from `name` when `team_name` is missing", () => {
    expect(isHighlightedRow({ name: "AS Dax" }, "AS Dax", "")).toBe(true);
  });

  it("never highlights when both names are empty", () => {
    expect(isHighlightedRow({ team_name: "AS Dax" }, "", "")).toBe(false);
  });
});

describe("standings-block.js renderStandingsBlock()", () => {
  it("renders nothing when there is no standings data", () => {
    for (const standings of [undefined, null, [], "not-an-array"]) {
      const host = renderBlock({ standings });
      expect(host.querySelector("ha-card"), String(standings)).toBeNull();
    }
  });

  it("renders every team -- the table is never truncated", () => {
    const host = renderBlock({ standings: makeStandings(14) });
    expect(host.querySelectorAll("tbody tr")).toHaveLength(14);
  });

  it("sorts rows by position even when the data arrives unordered", () => {
    const host = renderBlock();
    const positions = [...host.querySelectorAll("tbody .pos-cell")].map((c) => c.textContent.trim());
    expect(positions).toEqual(Array.from({ length: 14 }, (_, i) => String(i + 1)));
  });

  it("highlights exactly the team and the opponent rows", () => {
    const host = renderBlock();
    const highlighted = [...host.querySelectorAll("tr.highlight-row .col-team")].map((c) => c.textContent.trim());
    expect(highlighted).toEqual(["Equipe 3", "Equipe 9"]);
  });

  it("shows the pool and the competition in the header", () => {
    const host = renderBlock();
    expect(host.querySelector(".standings-card-header").textContent).toContain("Poule B");
    expect(host.querySelector(".standings-card-subtitle").textContent).toContain("Wonderligue");
  });

  it("hides the pool and competition when the sensor is unknown/unavailable", () => {
    const host = renderBlock({ poule: "unknown", competition: "unavailable" });
    expect(host.querySelector(".standings-card-header").textContent).not.toContain("unknown");
    expect(host.querySelector(".standings-card-subtitle")).toBeNull();
  });

  it("passes the accent colour to the card", () => {
    const host = renderBlock({ accentColor: "#123456" });
    expect(host.querySelector("ha-card").getAttribute("style")).toContain("#123456");
  });

  it("shows \"-\" for every missing value", () => {
    const host = renderBlock({ standings: [{ position: 1, team_name: "Equipe 1" }] });
    const cells = [...host.querySelectorAll("tbody td")].map((c) => c.textContent.trim());
    expect(cells).toEqual(["1", "Equipe 1", ...Array(14).fill("-")]);
  });
});

describe("standings-block.js styles -- no scrollbar", () => {
  const css = standingsBlockStyles.cssText;

  it("never sets a max-height or a scrolling overflow on the standings card", () => {
    expect(css).not.toMatch(/max-height/);
    expect(css).not.toMatch(/overflow(-y)?\s*:\s*(auto|scroll)/);
  });

  it("keeps team names on a single line instead of wrapping", () => {
    expect(css).toMatch(/\.standings-card \.standings-table \.col-team\s*{[^}]*white-space:\s*nowrap/);
  });

  it("keeps a gap between the match card and the standings card", () => {
    expect(css).toMatch(/\.standings-card\s*{[^}]*margin-top:\s*\d+px/);
  });
});

describe("ffbb-tracker-card with show_standings_below", () => {
  const ENTITY = "sensor.basket_landes_prochain_match_adversaire";
  const STATES = {
    [ENTITY]: { state: "US Mont-de-Marsan", attributes: {} },
    "sensor.basket_landes_prochain_match_date": { state: "2026-09-19T20:00:00", attributes: { round: "2" } },
    "sensor.basket_landes_prochain_match_terrain": { state: "home" },
    "sensor.basket_landes_poule": { state: "Poule B", attributes: { team: "Basket Landes", competition: "Wonderligue" } },
    "sensor.basket_landes_classement": { state: "1", attributes: { standings: makeStandings(14) } },
  };

  async function mountCard(configOverrides = {}, states = STATES) {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: ENTITY, ...configOverrides });
    el.hass = { states, locale: { language: "fr-FR" } };
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("is off by default: no second card is rendered", async () => {
    const el = await mountCard();
    expect(el.shadowRoot.querySelector(".standings-card")).toBeNull();
    expect(el.shadowRoot.querySelectorAll("ha-card")).toHaveLength(1);
  });

  it("renders a second ha-card with the whole table when enabled", async () => {
    const el = await mountCard({ show_standings_below: true });
    expect(el.shadowRoot.querySelectorAll("ha-card")).toHaveLength(2);
    expect(el.shadowRoot.querySelectorAll(".standings-card tbody tr")).toHaveLength(14);
  });

  it("places the standings card after the match card", async () => {
    const el = await mountCard({ show_standings_below: true });
    const cards = el.shadowRoot.querySelectorAll("ha-card");
    expect(cards[0].classList.contains("standings-card")).toBe(false);
    expect(cards[1].classList.contains("standings-card")).toBe(true);
  });

  it("does not render an empty second card when the pool has no standings data", async () => {
    const states = { ...STATES, "sensor.basket_landes_classement": { state: "1", attributes: {} } };
    const el = await mountCard({ show_standings_below: true }, states);
    expect(el.shadowRoot.querySelector(".standings-card")).toBeNull();
  });

  it("works independently of show_rank (badges hidden, table still shown)", async () => {
    const el = await mountCard({ show_standings_below: true, show_rank: false });
    expect(el.shadowRoot.querySelectorAll(".standings-card tbody tr")).toHaveLength(14);
  });

  it("does not disturb the existing popup: the rank badge still opens the modal", async () => {
    const el = await mountCard({ show_standings_below: true });
    el._openModal("standings");
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".modal-card")).not.toBeNull();
  });

  it("registers the standings styles alongside the card styles", () => {
    const Card = customElements.get("ffbb-tracker-card");
    const styles = [Card.styles].flat(Infinity).map((s) => s.cssText).join("\n");
    expect(styles).toContain(".standings-card");
    expect(styles).toContain(".match-area");
  });

  it("reads the won / lost keys the integration really sends", () => {
    const host = renderBlock({
      standings: [{ position: 1, team_name: "UJSBP", points: 2, played: 1, won: 1, lost: 0, draws: 0 }],
    });
    const cells = [...host.querySelectorAll("tbody td")].map((c) => c.textContent.trim());
    expect(cells.slice(0, 7)).toEqual(["1", "UJSBP", "2", "1", "1", "0", "0"]);
  });

  it("shows a 0 for wins/losses instead of a dash", () => {
    const host = renderBlock({ standings: [{ position: 5, team_name: "X", points: 0, played: 0, won: 0, lost: 0 }] });
    const cells = [...host.querySelectorAll("tbody td")].map((c) => c.textContent.trim());
    expect(cells.slice(2, 6)).toEqual(["0", "0", "0", "0"]);
  });

  it("does not highlight a row that has no name", () => {
    expect(isHighlightedRow({ position: 3 }, "Basket Landes", "AS Dax")).toBe(false);
  });

  it("shows the real number of draws when the data has one, in the block", () => {
    const host = renderBlock({
      standings: [{ position: 1, team_name: "UJSBP", points: 4, played: 3, won: 1, lost: 0, draws: 2 }],
    });
    const cells = [...host.querySelectorAll("tbody td")].map((c) => c.textContent.trim());
    expect(cells[6]).toBe("2");
  });
});


// ---------------------------------------------------------------------------
// Second card (show_standings_below): always the detailed table, same columns as the official FFBB page
//   EQUIPES | PTS | RENCONTRES (J G P N) | I | PEN. | FOR. | DEF. |
//   PENALITES (ARB ENT) | POINTS (M E D)
// ---------------------------------------------------------------------------
const FULL_ROW = {
  position: 1,
  team_name: "TOULOUGES BA",
  points: 6,
  played: 3,
  won: 3,
  lost: 0,
  draws: 0,
  irregularities: 0,
  total_penalties: 1,
  forfeits: 2,
  defaults: 4,
  referee_penalties: 5,
  coach_penalties: 6,
  points_for: 269,
  points_against: 192,
  points_diff: 77,
};

const text = (nodes) => [...nodes].map((n) => n.textContent.trim());

describe("standings-block.js detailed table", () => {
  it("always renders the detailed table (the simple one only lives in the popup)", () => {
    const host = renderBlock();
    expect(host.querySelectorAll("table")).toHaveLength(1);
    expect(host.querySelector("table").classList.contains("standings-table-detailed")).toBe(true);
    expect(host.querySelector(".standings-scroll")).not.toBeNull();
  });

  it("renders the FFBB header: main columns then the three column groups", () => {
    const host = renderBlock({ standings: [FULL_ROW] });
    const top = text(host.querySelectorAll("thead tr.group-row th"));
    expect(top).toEqual(["#", "Team", "Pts", "Games", "I", "Pén.", "For.", "Déf.", "Penalties", "Points"]);
    const sub = text(host.querySelectorAll("thead tr.sub-row th"));
    expect(sub).toEqual(["J", "G", "P", "N", "Arb", "Ent", "M", "E", "D"]);
  });

  it("spans each group over its own sub-columns (4 / 2 / 3)", () => {
    const host = renderBlock({ standings: [FULL_ROW] });
    const spans = [...host.querySelectorAll("th.group-head")].map((th) => Number(th.getAttribute("colspan")));
    expect(spans).toEqual([4, 2, 3]);
    // body has one cell per leaf column: #, team, Pts + J G P N + I Pén. For. Déf. + Arb Ent + M E D
    expect(host.querySelectorAll("tbody td")).toHaveLength(3 + 4 + 4 + 2 + 3);
  });

  it("puts every value in the right column", () => {
    const host = renderBlock({ standings: [FULL_ROW] });
    expect(text(host.querySelectorAll("tbody td"))).toEqual([
      "1", "TOULOUGES BA", "6",
      "3", "3", "0", "0", // J G P N
      "0", "1", "2", "4", // I Pén. For. Déf.
      "5", "6", // Arb Ent
      "269", "192", "+77", // M E D
    ]);
  });

  it("shows the whole pool with no row limit", () => {
    const host = renderBlock({ detailed: true });
    expect(host.querySelectorAll("tbody tr")).toHaveLength(14);
  });

  it("highlights the team and the opponent", () => {
    const host = renderBlock({ detailed: true });
    const highlighted = text([...host.querySelectorAll("tr.highlight-row")].map((tr) => tr.querySelector(".col-team")));
    expect(highlighted).toEqual(["Equipe 3", "Equipe 9"]);
  });

  it("shows a dash for missing values but keeps a real 0", () => {
    const host = renderBlock({
      standings: [{ position: 2, team_name: "X", points: 0, played: 0, won: 0, lost: 0, draws: 0, forfeits: 0 }],
      
    });
    const cells = text(host.querySelectorAll("tbody td"));
    expect(cells.slice(0, 10)).toEqual(["2", "X", "0", "0", "0", "0", "0", "-", "-", "0"]);
    expect(cells.slice(10)).toEqual(["-", "-", "-", "-", "-", "-"]);
  });

  it("formats the points difference with a sign and colour class", () => {
    const host = renderBlock({
      standings: [
        { position: 1, team_name: "A", points_diff: 12 },
        { position: 2, team_name: "B", points_diff: 0 },
        { position: 3, team_name: "C", points_diff: -10 },
      ],
      
    });
    const diffs = [...host.querySelectorAll("tbody tr")].map((tr) => tr.lastElementChild);
    expect(text(diffs)).toEqual(["+12", "0", "-10"]);
    expect(diffs[0].classList.contains("diff-pos")).toBe(true);
    expect(diffs[1].classList.contains("diff-pos") || diffs[1].classList.contains("diff-neg")).toBe(false);
    expect(diffs[2].classList.contains("diff-neg")).toBe(true);
  });

  it("gives each abbreviation a full-length tooltip", () => {
    const host = renderBlock({ standings: [FULL_ROW] });
    const titles = [...host.querySelectorAll("thead abbr")].map((a) => a.getAttribute("title"));
    expect(titles).toHaveLength(13);
    expect(titles.every(Boolean)).toBe(true);
    expect(new Set(titles).size).toBe(13);
  });

  it("still returns nothing when there is no standings data", () => {
    const host = renderBlock({ standings: [] });
    expect(host.querySelector("ha-card")).toBeNull();
  });

  it("keeps the wide table scrollable horizontally only, with position and team pinned", () => {
    const css = standingsBlockStyles.cssText;
    expect(css).toMatch(/\.standings-scroll\s*{[^}]*overflow-x:\s*auto/);
    expect(css).toMatch(/\.standings-table-detailed \.col-team,\s*\.standings-table-detailed \.col-pos\s*{[^}]*position:\s*sticky/);
    expect(css).not.toMatch(/max-height/);
    expect(css).not.toMatch(/overflow-y\s*:\s*(auto|scroll)/);
  });
});

describe("standings-block.js detailed table -- translations", () => {
  const load = (l) => JSON.parse(readFileSync(resolve(process.cwd(), "translations", `${l}.json`), "utf8"));
  const all = Object.values(DETAILED_COLUMNS).flat();
  const keys = [
    ...all.flatMap((c) => [c.key, c.full]),
    "table_group_matches",
    "table_group_penalties",
    "table_group_points",
  ];

  it.each(["fr", "en"])("%s.json defines every key the detailed table uses", (lang) => {
    const card = load(lang).card;
    expect(keys.filter((k) => typeof card[k] !== "string")).toEqual([]);
  });

  it("fr.json carries the labels used on the FFBB site", () => {
    const card = load("fr").card;
    expect([card.table_group_matches, card.table_penalties, card.table_forfeits, card.table_defaults]).toEqual([
      "Rencontres",
      "Pén.",
      "For.",
      "Déf.",
    ]);
    expect([card.table_group_penalties, card.table_referee, card.table_coach, card.table_group_points]).toEqual([
      "Pénalités",
      "Arb",
      "Ent",
      "Points",
    ]);
  });
});

describe("ffbb-tracker-card second card = detailed standings", () => {
  const ENTITY = "sensor.basket_landes_prochain_match_adversaire";
  const detailedRows = Array.from({ length: 4 }, (_, i) => ({ ...FULL_ROW, position: i + 1, team_name: `Equipe ${i + 1}` }));
  const STATES = {
    [ENTITY]: { state: "Equipe 2", attributes: {} },
    "sensor.basket_landes_prochain_match_date": { state: "2026-09-19T20:00:00", attributes: { round: "2" } },
    "sensor.basket_landes_prochain_match_terrain": { state: "home" },
    "sensor.basket_landes_poule": { state: "Poule B", attributes: { team: "Equipe 1", competition: "NM3" } },
    "sensor.basket_landes_classement": { state: "1", attributes: { standings: detailedRows } },
  };

  async function mountCard(cfg) {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: ENTITY, ...cfg });
    el.hass = { states: STATES, locale: { language: "fr-FR" } };
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("shows the detailed table in the second card, with French labels", async () => {
    const el = await mountCard({ show_standings_below: true });
    expect(el.shadowRoot.querySelectorAll("ha-card")).toHaveLength(2);
    expect(el.shadowRoot.querySelector(".standings-table-detailed")).not.toBeNull();
    expect(text(el.shadowRoot.querySelectorAll("th.group-head"))).toEqual(["Rencontres", "Pénalités", "Points"]);
  });

  it("renders no second card without show_standings_below", async () => {
    const el = await mountCard({});
    expect(el.shadowRoot.querySelectorAll("ha-card")).toHaveLength(1);
  });

  it("keeps the simple standings in the popup, opened from the rank badges", async () => {
    const el = await mountCard({ show_standings_below: true });
    el._openModal("standings");
    await el.updateComplete;
    expect(el.shadowRoot.querySelectorAll(".modal-card thead th")).toHaveLength(7);
    expect(el.shadowRoot.querySelector(".modal-card .standings-table-detailed")).toBeNull();
  });
});
