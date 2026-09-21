// @vitest-environment happy-dom
//
// Tests for the "standings below the card" feature (show_standings_below).
// The feature lives in standings-block.js; ha-ffbb-tracker-card.js only calls
// it, so the tests are split the same way: the module on its own first, then
// the card with the option on and off.
import { describe, it, expect, afterEach } from "vitest";
import { render } from "lit";
import { renderStandingsBlock, standingsBlockStyles, isHighlightedRow } from "./standings-block.js";
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

  it("falls back to 0 for a missing draws column and \"-\" for other missing values", () => {
    const host = renderBlock({ standings: [{ position: 1, team_name: "Equipe 1" }] });
    const cells = [...host.querySelectorAll("tbody td")].map((c) => c.textContent.trim());
    expect(cells).toEqual(["1", "Equipe 1", "-", "-", "-", "-", "0"]);
  });
});

describe("standings-block.js styles -- no scrollbar", () => {
  const css = standingsBlockStyles.cssText;

  it("never sets a max-height or a scrolling overflow on the standings card", () => {
    expect(css).not.toMatch(/max-height/);
    expect(css).not.toMatch(/overflow(-y)?\s*:\s*(auto|scroll)/);
  });

  it("lets long team names wrap instead of being cut with an ellipsis", () => {
    expect(css).toMatch(/\.standings-card \.standings-table \.col-team\s*{[^}]*white-space:\s*normal/);
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
    expect(cells).toEqual(["1", "UJSBP", "2", "1", "1", "0", "0"]);
  });

  it("shows a 0 for wins/losses instead of a dash", () => {
    const host = renderBlock({ standings: [{ position: 5, team_name: "X", points: 0, played: 0, won: 0, lost: 0 }] });
    const cells = [...host.querySelectorAll("tbody td")].map((c) => c.textContent.trim());
    expect(cells.slice(2)).toEqual(["0", "0", "0", "0", "0"]);
  });

  it("does not highlight a row that has no name", () => {
    expect(isHighlightedRow({ position: 3 }, "Basket Landes", "AS Dax")).toBe(false);
  });

  it("shows the real number of draws when the data has one, in the block", () => {
    const host = renderBlock({
      standings: [{ position: 1, team_name: "UJSBP", points: 4, played: 3, won: 1, lost: 0, draws: 2 }],
    });
    const cells = [...host.querySelectorAll("tbody td")].map((c) => c.textContent.trim());
    expect(cells[cells.length - 1]).toBe("2");
  });
});
