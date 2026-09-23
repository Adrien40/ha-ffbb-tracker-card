// @vitest-environment happy-dom
//
// Tests for the second, standalone standings card (config: display_mode).
// The feature lives in standings-block.js; ha-ffbb-tracker-card.js only calls
// it, so the tests are split the same way: the module on its own first, then
// the card with the option on and off.
import { describe, it, expect, afterEach } from "vitest";
import { render } from "lit";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderStandingsBlock, standingsBlockStyles, isHighlightedRow, renderDetailedTable, DETAILED_COLUMNS } from "./standings-block.js";
import { cardStyles } from "./styles.js";
import { DEFAULT_FALLBACK_LOGO } from "./pure.js";
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
    accentColor: "#ff6b00",
    t,
    ...overrides,
  });
  render(result, host);
  return host;
}

describe("standings-block.js isHighlightedRow()", () => {
  it("matches the user's team, ignoring case, accents and punctuation", () => {
    expect(isHighlightedRow({ team_name: "US Mont-de-Marsan" }, "us mont de marsan")).toBe(true);
  });

  it("does NOT match the opponent -- only the user's own team is highlighted here", () => {
    expect(isHighlightedRow({ team_name: "AS Dax" }, "Basket Landes")).toBe(false);
  });

  it("does not match unrelated teams", () => {
    expect(isHighlightedRow({ team_name: "AS Dax" }, "Basket Landes")).toBe(false);
  });

  it("reads the name from `name` when `team_name` is missing", () => {
    expect(isHighlightedRow({ name: "AS Dax" }, "AS Dax")).toBe(true);
  });

  it("never highlights when the team name is empty", () => {
    expect(isHighlightedRow({ team_name: "AS Dax" }, "")).toBe(false);
  });
});

describe("standings-block.js renderStandingsBlock()", () => {
  it("still renders the card, with an empty-state message, when there is no standings data", () => {
    for (const standings of [undefined, null, [], "not-an-array"]) {
      const host = renderBlock({ standings });
      expect(host.querySelector("ha-card"), String(standings)).not.toBeNull();
      expect(host.querySelector(".standings-table"), String(standings)).toBeNull();
      expect(host.querySelector(".standings-empty-text"), String(standings)).not.toBeNull();
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

  it("highlights only the user's own team row, not the opponent", () => {
    const host = renderBlock();
    const highlighted = [...host.querySelectorAll("tr.highlight-row .col-team")].map((c) => c.textContent.trim());
    expect(highlighted).toEqual(["Equipe 3"]);
  });

  it("shows the custom team name on my own row instead of the official one, and leaves every other row untouched", () => {
    const host = renderBlock({ displayTeamName: "Les Panthères" });
    const names = [...host.querySelectorAll("tbody .col-team")].map((c) => c.textContent.trim());
    expect(names).toContain("Les Panthères");
    expect(names).not.toContain("Equipe 3");
    // Everyone else keeps their real, official name.
    expect(names).toContain("Equipe 9");
  });

  it("keeps the official name when no custom team name is configured", () => {
    const host = renderBlock({ displayTeamName: undefined });
    const names = [...host.querySelectorAll("tbody .col-team")].map((c) => c.textContent.trim());
    expect(names).toContain("Equipe 3");
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

  it("keeps team names on a single line instead of wrapping (not scoped to .standings-card, so the popup gets the same behavior)", () => {
    expect(css).toMatch(/\.standings-table\.standings-table-detailed \.col-team\s*{[^}]*white-space:\s*nowrap/);
  });

  it("the un-truncating rule outranks the base truncating rule on specificity alone, not source order", () => {
    // 3 class components (.standings-table + .standings-table-detailed +
    // .col-team, the first two compounded on the same element) vs the base
    // rule's 2 (.standings-table .col-team in styles.js) -- must never
    // regress back to equal specificity, which depends on a source order
    // that turned out not to hold in practice (see the comment in
    // standings-block.js above this rule).
    const match = css.match(/\.standings-table\.standings-table-detailed \.col-team\s*{[^}]*max-width:\s*none/);
    expect(match, "expected a compound .standings-table.standings-table-detailed selector").not.toBeNull();
  });

  it("keeps a gap between the match card and the standings card", () => {
    expect(css).toMatch(/\.standings-card\s*{[^}]*margin-top:\s*\d+px/);
  });

  it("the team crest is small enough to add to a row without growing it (16px)", () => {
    expect(css).toMatch(/\.col-team-logo\s*{[^}]*width:\s*16px/);
    expect(css).toMatch(/\.col-team-logo\s*{[^}]*height:\s*16px/);
  });
});

// The two regex-based tests above check the CSS *text*, not what a real
// browser actually resolves -- they would NOT have caught either of the two
// real bugs this rule went through: (1) two selectors tied on specificity,
// where the "later wins" assumption did not hold in practice, and (2) a
// JS-style `//` comment accidentally placed inside the raw CSS of a css`...`
// template (invalid CSS, silently drops the whole rule) -- both looked fine
// as plain text. This mounts the real combined stylesheet in a shadow root
// and asks the browser engine itself (via getComputedStyle) who actually
// wins, which is the only check that would have caught either regression.
describe("standings-block.js + styles.js combined: getComputedStyle (not just CSS text) confirms the popup's team name is not truncated", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("a long team name in the detailed table resolves to no max-width, visible overflow, no ellipsis", () => {
    const host = document.createElement("div");
    const shadow = host.attachShadow({ mode: "open" });
    for (const sheet of [cardStyles, standingsBlockStyles]) {
      const styleEl = document.createElement("style");
      styleEl.textContent = sheet.cssText;
      shadow.appendChild(styleEl);
    }

    const table = document.createElement("table");
    table.className = "standings-table standings-table-detailed";
    const td = document.createElement("td");
    td.className = "col-team";
    td.textContent = "BISCARROSSE OLYMPIQUE BASKET";
    const tr = document.createElement("tr");
    tr.appendChild(td);
    table.appendChild(tr);
    shadow.appendChild(table);
    document.body.appendChild(host);

    const computed = getComputedStyle(td);
    expect(computed.maxWidth).not.toBe("140px");
    expect(computed.overflow).not.toBe("hidden");
    expect(computed.textOverflow).not.toBe("ellipsis");
  });

  it("the SIMPLE (non-detailed) popup table is untouched and still truncates -- only the detailed table changed", () => {
    const host = document.createElement("div");
    const shadow = host.attachShadow({ mode: "open" });
    for (const sheet of [cardStyles, standingsBlockStyles]) {
      const styleEl = document.createElement("style");
      styleEl.textContent = sheet.cssText;
      shadow.appendChild(styleEl);
    }

    // No "standings-table-detailed" class here -- the simple 7-column popup
    // table, which is deliberately left truncating (see the previous
    // conversation with the user: only the detailed table was reported and
    // fixed).
    const table = document.createElement("table");
    table.className = "standings-table";
    const td = document.createElement("td");
    td.className = "col-team";
    const tr = document.createElement("tr");
    tr.appendChild(td);
    table.appendChild(tr);
    shadow.appendChild(table);
    document.body.appendChild(host);

    expect(getComputedStyle(td).maxWidth).toBe("140px");
  });
});

// Both cardStyles (styles.js) and standingsBlockStyles (standings-block.js)
// are raw CSS inside a `css\`...\`` tagged template -- a `//` there is not a
// comment, it is invalid CSS text. This exact mistake silently dropped a
// real rule earlier (see the two tests above); guard against it recurring
// in either file, in any future edit.
describe("css`...` templates never contain a JS-style // comment (invalid CSS, silently drops the rule)", () => {
  it.each([
    ["cardStyles (styles.js)", cardStyles],
    ["standingsBlockStyles (standings-block.js)", standingsBlockStyles],
  ])("%s", (_label, sheet) => {
    const offendingLines = sheet.cssText
      .split("\n")
      .filter((line) => /(^|[^:])\/\//.test(line)); // allow "://" (e.g. a URL), not a bare "//"
    expect(offendingLines).toEqual([]);
  });
});

describe("ffbb-tracker-card with display_mode", () => {
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

  it('defaults to "match": no second card is rendered', async () => {
    const el = await mountCard();
    expect(el.shadowRoot.querySelector(".standings-card")).toBeNull();
    expect(el.shadowRoot.querySelectorAll("ha-card")).toHaveLength(1);
  });

  it('renders a second ha-card with the whole table when display_mode is "both"', async () => {
    const el = await mountCard({ display_mode: "both" });
    expect(el.shadowRoot.querySelectorAll("ha-card")).toHaveLength(2);
    expect(el.shadowRoot.querySelectorAll(".standings-card tbody tr")).toHaveLength(14);
  });

  it("places the standings card after the match card", async () => {
    const el = await mountCard({ display_mode: "both" });
    const cards = el.shadowRoot.querySelectorAll("ha-card");
    expect(cards[0].classList.contains("standings-card")).toBe(false);
    expect(cards[1].classList.contains("standings-card")).toBe(true);
  });

  it('renders only the standings card when display_mode is "standings"', async () => {
    const el = await mountCard({ display_mode: "standings" });
    const cards = el.shadowRoot.querySelectorAll("ha-card");
    expect(cards).toHaveLength(1);
    expect(cards[0].classList.contains("standings-card")).toBe(true);
  });

  it('gets the "standings-compact" class (smaller, popup-aligned font) when shown alongside the match card', async () => {
    const el = await mountCard({ display_mode: "both" });
    const card = el.shadowRoot.querySelector(".standings-card");
    expect(card.classList.contains("standings-compact")).toBe(true);
  });

  it('does NOT get the "standings-compact" class (normal card font size) when it is the only card', async () => {
    const el = await mountCard({ display_mode: "standings" });
    const card = el.shadowRoot.querySelector(".standings-card");
    expect(card.classList.contains("standings-compact")).toBe(false);
  });

  // Regression test for the standalone header size (previously always
  // 1.05em/700 like the compact "both" mode, even with display_mode
  // "standings" alone). jsdom/happy-dom don't compute layout, so this reads
  // the CSS text directly rather than getComputedStyle -- same approach as
  // styles.test.js.
  describe("standalone header size matches the match card's own .card-header", () => {
    function declarationsFor(selector) {
      const css = standingsBlockStyles.cssText.replace(/\/\*[\s\S]*?\*\//g, "");
      const merged = {};
      for (const [, selectors, body] of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
        const list = selectors.split(",").map((s) => s.trim());
        if (!list.includes(selector)) continue;
        for (const decl of body.split(";")) {
          const idx = decl.indexOf(":");
          if (idx === -1) continue;
          merged[decl.slice(0, idx).trim()] = decl.slice(idx + 1).trim();
        }
      }
      return merged;
    }

    it("bumps the header to the match card's 1.7em / weight 600 when NOT compact", () => {
      const decl = declarationsFor(".standings-card:not(.standings-compact) .standings-card-header");
      expect(decl["font-size"]).toBe("1.7em");
      expect(decl["font-weight"]).toBe("600");
    });

    it("bumps the header icon to the match card's 28px when NOT compact", () => {
      const decl = declarationsFor(".standings-card:not(.standings-compact) .standings-card-header ha-icon");
      expect(decl["--mdc-icon-size"]).toBe("28px");
    });

    it("leaves the smaller 1.05em header alone for the compact (\"both\") case", () => {
      const decl = declarationsFor(".standings-card-header");
      expect(decl["font-size"]).toBe("1.05em");
    });
  });

  it("shows an empty-state message (not a vanished card) when the pool has no standings data", async () => {
    const states = { ...STATES, "sensor.basket_landes_classement": { state: "1", attributes: {} } };
    const el = await mountCard({ display_mode: "both" }, states);
    expect(el.shadowRoot.querySelector(".standings-card")).not.toBeNull();
    expect(el.shadowRoot.querySelector(".standings-table")).toBeNull();
    expect(el.shadowRoot.querySelector(".standings-empty-text").textContent.trim()).toBe(
      "Aucune donnée de classement disponible."
    );
  });

  it("works independently of show_rank (badges hidden, table still shown)", async () => {
    const el = await mountCard({ display_mode: "both", show_rank: false });
    expect(el.shadowRoot.querySelectorAll(".standings-card tbody tr")).toHaveLength(14);
  });

  it("does not disturb the existing popup: the rank badge still opens the modal", async () => {
    const el = await mountCard({ display_mode: "both" });
    el._openModal("standings");
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".modal-card")).not.toBeNull();
  });

  it("uses the official standings title and icon by default", async () => {
    const el = await mountCard({ display_mode: "both" });
    const header = el.shadowRoot.querySelector(".standings-card-header");
    expect(header.textContent).toContain("Classement");
    expect(header.querySelector("ha-icon").getAttribute("icon")).toBe("mdi:format-list-numbered");
  });

  it("uses a custom standings title and icon when configured", async () => {
    const el = await mountCard({ display_mode: "both", standings_title: "Notre poule", standings_icon: "mdi:trophy" });
    const header = el.shadowRoot.querySelector(".standings-card-header");
    expect(header.textContent).toContain("Notre poule");
    expect(header.querySelector("ha-icon").getAttribute("icon")).toBe("mdi:trophy");
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
    expect(isHighlightedRow({ position: 3 }, "Basket Landes")).toBe(false);
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
// Second card (display_mode "both" or "standings"): always the detailed table, same columns as the official FFBB page
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

  it("highlights only the user's own team, not the opponent", () => {
    const host = renderBlock({ detailed: true });
    const highlighted = text([...host.querySelectorAll("tr.highlight-row")].map((tr) => tr.querySelector(".col-team")));
    expect(highlighted).toEqual(["Equipe 3"]);
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

  it("still renders the card, with an empty-state message, when there is no standings data", () => {
    const host = renderBlock({ standings: [] });
    expect(host.querySelector("ha-card")).not.toBeNull();
    expect(host.querySelector(".standings-empty-text")).not.toBeNull();
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
    const el = await mountCard({ display_mode: "both" });
    expect(el.shadowRoot.querySelectorAll("ha-card")).toHaveLength(2);
    expect(el.shadowRoot.querySelector(".standings-table-detailed")).not.toBeNull();
    expect(text(el.shadowRoot.querySelectorAll("th.group-head"))).toEqual(["Rencontres", "Pénalités", "Points"]);
  });

  it('renders no second card with the default display_mode ("match")', async () => {
    const el = await mountCard({});
    expect(el.shadowRoot.querySelectorAll("ha-card")).toHaveLength(1);
  });

  it("keeps the simple standings in the popup, opened from the rank badges", async () => {
    const el = await mountCard({ display_mode: "both" });
    el._openModal("standings");
    await el.updateComplete;
    expect(el.shadowRoot.querySelectorAll(".modal-card thead th")).toHaveLength(7);
    expect(el.shadowRoot.querySelector(".modal-card .standings-table-detailed")).toBeNull();
  });
});

describe("targeted coverage: rare branches", () => {
  it("signedCell(): a non-finite value (not a real number) is shown as-is, not coerced to \"-\"", () => {
    const host = renderBlock({
      standings: [{ position: 1, team_name: "X", points_diff: "N/A" }],
    });
    const diffCell = host.querySelector("tbody tr td:last-child");
    expect(diffCell.textContent.trim()).toBe("N/A");
  });

  it("a non-highlighted row keeps its official name even when displayTeamName is set for someone else", () => {
    const host = renderBlock({
      teamName: "Nowhere Team", // matches no row -> nothing is highlighted
      displayTeamName: "Les Panthères",
    });
    expect(host.querySelector(".highlight-row")).toBeNull();
    expect(host.textContent).not.toContain("Les Panthères");
    expect(host.textContent).toContain("Equipe 3");
  });

  it("hides the header icon entirely when icon is explicitly empty", () => {
    const host = renderBlock({ icon: "" });
    expect(host.querySelector(".standings-card-header ha-icon")).toBeNull();
  });

  it("renderDetailedTable(): falls back from team_name to name to \"-\", and from position to rank to \"-\"", () => {
    const host = document.createElement("div");
    render(
      renderDetailedTable({
        rows: [
          { position: 1, team_name: "Equipe A" }, // normal case
          { rank: 2, name: "Equipe B" }, // team_name missing -> name; position missing -> rank
          {}, // both missing -> "-" for both
        ],
        teamName: "Equipe A",
        t,
      }),
      host
    );
    const rows = [...host.querySelectorAll("tbody tr")];
    expect(rows.map((r) => r.querySelector(".col-team").textContent.trim())).toEqual(["Equipe A", "Equipe B", "-"]);
    expect(rows.map((r) => r.querySelector(".pos-cell").textContent.trim())).toEqual(["1", "2", "-"]);
  });

  it("renderDetailedTable(): each row's crest uses that row's own logo_url, from the FFBB Tracker integration's standings data", () => {
    const host = document.createElement("div");
    render(
      renderDetailedTable({
        rows: [
          { position: 1, team_name: "Equipe A", logo_url: "https://api.ffbb.app/assets/team-a-uuid" },
          { position: 2, team_name: "Equipe B", logo_url: null }, // no logo registered with the federation
        ],
        teamName: "Equipe A",
        t,
      }),
      host
    );
    const logos = [...host.querySelectorAll("tbody .col-team-logo")];
    expect(logos).toHaveLength(2);
    expect(logos[0].getAttribute("src")).toBe("https://api.ffbb.app/assets/team-a-uuid");
    // No logo_url -> the same default crest used everywhere else in the
    // card, not a broken image or a missing <img>.
    expect(logos[1].getAttribute("src")).toBe(DEFAULT_FALLBACK_LOGO);
  });

  it("renderDetailedTable(): a broken crest URL (404, CORS...) falls back to the default crest via @error, same as the match-area logos", () => {
    const host = document.createElement("div");
    render(
      renderDetailedTable({
        rows: [{ position: 1, team_name: "Equipe A", logo_url: "https://api.ffbb.app/assets/broken-uuid" }],
        teamName: "Equipe A",
        t,
      }),
      host
    );
    const img = host.querySelector(".col-team-logo");
    img.dispatchEvent(new Event("error"));
    expect(img.src).toContain(DEFAULT_FALLBACK_LOGO);
  });

  it("renderDetailedTable(): the highlighted row still shows displayTeamName over the fallback chain", () => {
    const host = document.createElement("div");
    render(
      renderDetailedTable({
        rows: [{ position: 1, team_name: "Officiel FC" }],
        teamName: "Officiel FC",
        displayTeamName: "Mon Équipe",
        t,
      }),
      host
    );
    expect(host.querySelector("tbody .col-team").textContent.trim()).toBe("Mon Équipe");
    expect(host.querySelector("tbody tr").classList.contains("highlight-row")).toBe(true);
  });
});
