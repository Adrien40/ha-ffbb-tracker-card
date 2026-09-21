// "Standings below the card" -- a second <ha-card> rendered right under the
// main match card (config: show_standings_below).
//
// Everything specific to this feature lives in this file: the row-highlight
// helper, the template, and the styles. ha-ffbb-tracker-card.js only imports
// renderStandingsBlock / standingsBlockStyles and calls them, so the existing
// card code stays untouched apart from those few hook lines.
//
// Unlike the standings modal, this block shows the WHOLE table: there is
// deliberately no max-height, so it never gets a vertical scrollbar -- the
// card simply grows to fit every team of the pool.
//
// The table has the same columns as the official FFBB standings page
// (Pts, Rencontres J G P N, I, Pén., For., Déf., Pénalités Arb/Ent,
// Points M/E/D). The simple standings (# / team / Pts / J G P N) is NOT
// rendered here: it stays in the popup opened from the rank badges.
//
// The table is wide, so it may scroll HORIZONTALLY on a narrow screen (the
// position and team columns stay pinned on the left).

import { html, css, nothing } from "lit";
import { cleanForMatch, sortStandings } from "./pure.js";

const INVALID_STATES = ["unknown", "unavailable"];

/**
 * True when a standings row belongs to the user's team or to the opponent
 * (same fuzzy name matching as the standings modal), so the row can be
 * highlighted.
 */
export function isHighlightedRow(item, teamName, opponentName) {
  const itemClean = cleanForMatch(item?.team_name || item?.name || "");
  const teamClean = cleanForMatch(teamName);
  const oppClean = cleanForMatch(opponentName);
  // A row without any name must never match (`"x".includes("")` is true).
  if (!itemClean) return false;
  const isTeam = Boolean(teamClean && (itemClean.includes(teamClean) || teamClean.includes(itemClean)));
  const isOpponent = Boolean(oppClean && (itemClean.includes(oppClean) || oppClean.includes(itemClean)));
  return isTeam || isOpponent;
}

// Cell display: a missing value (null/undefined/"") is shown as "-", a real 0
// stays "0".
function cell(value) {
  return value === null || value === undefined || value === "" ? "-" : value;
}

// Points difference with an explicit sign (+77 / -10 / 0), like a scoreboard.
function signedCell(value) {
  if (value === null || value === undefined || value === "") return "-";
  const n = Number(value);
  if (!Number.isFinite(n)) return value;
  return n > 0 ? `+${n}` : String(n);
}

function diffClass(value) {
  const n = Number(value);
  if (value === null || value === undefined || value === "" || !Number.isFinite(n) || n === 0) return "";
  return n > 0 ? "diff-pos" : "diff-neg";
}

// [translation key, English fallback, long label used as tooltip/aria].
// One entry per column, in display order, so header and body can
// never drift apart.
export const DETAILED_COLUMNS = {
  matches: [
    { key: "table_played", fb: "J", full: "table_played_full", fullFb: "Games played", get: (i) => i.played },
    { key: "table_wins", fb: "G", full: "table_wins_full", fullFb: "Wins", get: (i) => i.wins ?? i.won },
    { key: "table_losses", fb: "P", full: "table_losses_full", fullFb: "Losses", get: (i) => i.losses ?? i.lost },
    { key: "table_draws", fb: "N", full: "table_draws_full", fullFb: "Draws", get: (i) => i.draws },
  ],
  singles: [
    { key: "table_irregularities", fb: "I", full: "table_irregularities_full", fullFb: "Irregularities", get: (i) => i.irregularities },
    { key: "table_penalties", fb: "Pén.", full: "table_penalties_full", fullFb: "Penalties", get: (i) => i.total_penalties },
    { key: "table_forfeits", fb: "For.", full: "table_forfeits_full", fullFb: "Forfeits", get: (i) => i.forfeits },
    { key: "table_defaults", fb: "Déf.", full: "table_defaults_full", fullFb: "Defaults", get: (i) => i.defaults },
  ],
  penalties: [
    { key: "table_referee", fb: "Arb", full: "table_referee_full", fullFb: "Referee penalties", get: (i) => i.referee_penalties },
    { key: "table_coach", fb: "Ent", full: "table_coach_full", fullFb: "Coach penalties", get: (i) => i.coach_penalties },
  ],
  points: [
    { key: "table_scored", fb: "M", full: "table_scored_full", fullFb: "Points scored", get: (i) => i.points_for },
    { key: "table_conceded", fb: "E", full: "table_conceded_full", fullFb: "Points conceded", get: (i) => i.points_against },
    { key: "table_diff", fb: "D", full: "table_diff_full", fullFb: "Points difference", get: (i) => i.points_diff, signed: true },
  ],
};

function renderDetailedTable({ rows, teamName, opponentName, t }) {
  const { matches, singles, penalties, points } = DETAILED_COLUMNS;
  const label = (col) => t(`card.${col.key}`, col.fb);
  const title = (col) => t(`card.${col.full}`, col.fullFb);
  const subHeader = (col) => html`<th class="sub-head" scope="col"><abbr title=${title(col)}>${label(col)}</abbr></th>`;
  const body = (col, item) => {
    const value = col.get(item);
    return col.signed
      ? html`<td class="num ${diffClass(value)}">${signedCell(value)}</td>`
      : html`<td class="num">${cell(value)}</td>`;
  };

  return html`
    <div class="standings-scroll">
      <table class="standings-table standings-table-detailed">
        <thead>
          <tr class="group-row">
            <th class="col-pos" rowspan="2" scope="col">#</th>
            <th class="col-team" rowspan="2" scope="col">${t("card.table_team", "Team")}</th>
            <th class="single-head" rowspan="2" scope="col">${t("card.table_pts", "Pts")}</th>
            <th class="group-head" colspan=${matches.length} scope="colgroup">${t("card.table_group_matches", "Games")}</th>
            ${singles.map((col) => html`<th class="single-head" rowspan="2" scope="col" title=${title(col)}><abbr title=${title(col)}>${label(col)}</abbr></th>`)}
            <th class="group-head" colspan=${penalties.length} scope="colgroup">${t("card.table_group_penalties", "Penalties")}</th>
            <th class="group-head" colspan=${points.length} scope="colgroup">${t("card.table_group_points", "Points")}</th>
          </tr>
          <tr class="sub-row">
            ${matches.map(subHeader)}
            ${penalties.map(subHeader)}
            ${points.map(subHeader)}
          </tr>
        </thead>
        <tbody>
          ${rows.map(
            (item) => html`
              <tr class=${isHighlightedRow(item, teamName, opponentName) ? "highlight-row" : ""}>
                <td class="pos-cell col-pos">${item.position || item.rank || "-"}</td>
                <td class="col-team">${item.team_name || item.name || "-"}</td>
                <td class="pts-cell">${cell(item.points ?? item.pts)}</td>
                ${matches.map((col) => body(col, item))}
                ${singles.map((col) => body(col, item))}
                ${penalties.map((col) => body(col, item))}
                ${points.map((col) => body(col, item))}
              </tr>
            `
          )}
        </tbody>
      </table>
    </div>
  `;
}

/**
 * Renders the full standings as its own <ha-card>. Returns `nothing` when
 * there is no standings data, so an empty card never appears under the main
 * one.
 */
export function renderStandingsBlock({
  standings,
  poule,
  competition,
  teamName,
  opponentName,
  accentColor,
  t,
}) {
  const rows = sortStandings(standings);
  if (rows.length === 0) return nothing;

  const pouleText = poule && !INVALID_STATES.includes(poule) ? poule : "";
  const competitionText = competition && !INVALID_STATES.includes(competition) ? competition : "";

  return html`
    <ha-card class="standings-card" style="--ffbb-accent-color: ${accentColor};">
      <div class="standings-card-header">
        <ha-icon icon="mdi:format-list-numbered"></ha-icon>
        <span>${t("card.standings_title", "Standings")}${pouleText ? ` • ${pouleText}` : ""}</span>
      </div>
      ${competitionText ? html`<div class="standings-card-subtitle">${competitionText}</div>` : nothing}
      <div class="standings-card-body">
        ${renderDetailedTable({ rows, teamName, opponentName, t })}
      </div>
    </ha-card>
  `;
}

// The table itself reuses the .standings-table rules from styles.js so it
// looks exactly like the popup. Only what is specific to the standalone card
// is defined here.
export const standingsBlockStyles = css`
  .standings-card {
    display: block;
    margin-top: 12px;
    overflow: hidden;
  }
  .standings-card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 16px 4px;
    font-weight: 700;
    font-size: 1.05em;
    color: var(--primary-text-color);
  }
  .standings-card-header ha-icon {
    color: var(--ffbb-accent-color, #ff6b00);
    --mdc-icon-size: 20px;
  }
  .standings-card-subtitle {
    padding: 0 16px 6px;
    font-size: 0.82em;
    color: var(--secondary-text-color);
  }
  .standings-card-body {
    padding: 6px 16px 14px;
  }
  .standings-card .standings-table .col-team {
    max-width: none;
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
  }

  /* ---- table layout --------------------------------------------------- */
  .standings-scroll {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .standings-table-detailed {
    min-width: 560px;
    font-variant-numeric: tabular-nums;
  }
  .standings-table-detailed th {
    padding: 8px 6px 4px;
    color: var(--primary-text-color);
    font-weight: 700;
    font-size: 0.78em;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    white-space: nowrap;
    border-bottom: none;
  }
  .standings-table-detailed .col-team {
    text-align: left;
    min-width: 110px;
  }
  .standings-table-detailed .col-team,
  .standings-table-detailed .col-pos {
    position: sticky;
    background: var(--card-background-color, var(--ha-card-background, #fff));
    z-index: 1;
  }
  .standings-table-detailed .col-pos {
    left: 0;
    width: 28px;
    min-width: 28px;
    box-sizing: border-box;
  }
  .standings-table-detailed .col-team {
    left: 28px;
  }
  .standings-table-detailed tr.highlight-row .col-pos,
  .standings-table-detailed tr.highlight-row .col-team {
    background: var(--secondary-background-color, rgba(255, 255, 255, 0.08));
  }
  .standings-table-detailed .group-row th {
    border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
  }
  .standings-table-detailed .group-row th.group-head {
    border-bottom: 2px solid var(--ffbb-accent-color, #ff6b00);
  }
  .standings-table-detailed .group-head + .single-head,
  .standings-table-detailed .single-head + .group-head,
  .standings-table-detailed .group-head + .group-head {
    padding-left: 10px;
  }
  .standings-table-detailed .sub-row th {
    padding: 3px 6px 6px;
    font-size: 0.72em;
    font-weight: 600;
    color: var(--secondary-text-color);
    border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
  }
  .standings-table-detailed .sub-row abbr,
  .standings-table-detailed .single-head abbr {
    text-decoration: none;
    cursor: help;
  }
  .standings-table-detailed td {
    padding: 6px;
    white-space: nowrap;
  }
  .standings-table-detailed .col-team {
    white-space: normal;
  }
  .standings-table-detailed .diff-pos {
    color: var(--success-color, #43a047);
  }
  .standings-table-detailed .diff-neg {
    color: var(--error-color, #e53935);
  }

  /* Narrow screens: cap the pinned team column so the numbers get the room. */
  @media (max-width: 600px) {
    .standings-card-body {
      padding-left: 8px;
      padding-right: 8px;
    }
    .standings-table-detailed .col-team {
      width: 104px;
      min-width: 104px;
      max-width: 104px;
      font-size: 0.92em;
      overflow-wrap: anywhere;
    }
  }
`;
