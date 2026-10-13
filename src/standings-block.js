// "Standings below the card" -- a second <ha-card> rendered right under the
// main match card (config: display_mode).
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
import { cleanForMatch, sortStandings, DEFAULT_FALLBACK_LOGO } from "./pure.js";

const INVALID_STATES = ["unknown", "unavailable"];

/**
 * True when a standings row belongs to the user's own team (same fuzzy name
 * matching as the standings modal), so the row can be highlighted. Unlike
 * the standings modal, the opponent is deliberately NOT highlighted here:
 * this table shows the whole pool, and the opponent is just one more row
 * among many, not a second "me".
 */
export function isHighlightedRow(item, teamName) {
  const itemClean = cleanForMatch(item?.team_name || item?.name || "");
  const teamClean = cleanForMatch(teamName);
  // A row without any name must never match (`"x".includes("")` is true).
  if (!itemClean || !teamClean) return false;
  return itemClean.includes(teamClean) || teamClean.includes(itemClean);
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

// A small team logo for a standings row, shared by the detailed table
// below and the simple popup table (ha-ffbb-tracker-card.js), so both use
// the exact same markup, fallback, and error handling instead of two
// copies that could drift. Deliberately tiny (see .col-team-logo further
// down in this file's own css`...`): sized to fit inside the existing row
// height, not to grow it -- the whole point was adding logos without
// taller rows.
export function renderStandingsLogo(logoUrl, show = true) {
  if (!show) return nothing;
  return html`
    <img
      class="col-team-logo"
      src=${logoUrl || DEFAULT_FALLBACK_LOGO}
      alt=""
      @error=${(e) => {
        if (!e.target.src.endsWith(DEFAULT_FALLBACK_LOGO)) {
          e.target.src = DEFAULT_FALLBACK_LOGO;
        }
      }}
    />
  `;
}

// Exported so the standings popup (opened from the rank badges, in
// ha-ffbb-tracker-card.js) can render the exact same detailed table when
// the user turns on "standings_popup_detailed" -- one table implementation,
// used in two places, instead of a second copy that could drift.
export function renderDetailedTable({ rows, teamName, displayTeamName, t, showLogos = true }) {
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
          ${rows.map((item) => {
            const highlighted = isHighlightedRow(item, teamName);
            // On my own row, show the name I picked in the card config
            // instead of the federation's official name -- everywhere
            // else the real, official team name is kept so the table
            // still matches the FFBB page.
            const rowTeamLabel = highlighted && displayTeamName ? displayTeamName : item.team_name || item.name || "-";
            return html`
              <tr class=${highlighted ? "highlight-row" : ""}>
                <td class="pos-cell col-pos">${item.position || item.rank || "-"}</td>
                <td class="col-team">${renderStandingsLogo(item.logo_url, showLogos)}<span>${rowTeamLabel}</span></td>
                <td class="pts-cell">${cell(item.points ?? item.pts)}</td>
                ${matches.map((col) => body(col, item))}
                ${singles.map((col) => body(col, item))}
                ${penalties.map((col) => body(col, item))}
                ${points.map((col) => body(col, item))}
              </tr>
            `;
          })}
        </tbody>
      </table>
    </div>
  `;
}

/**
 * Renders the full standings as its own <ha-card>. Unlike before, this never
 * returns `nothing`: when this card is explicitly requested (display_mode
 * "standings" or "both") but there is no standings data yet -- e.g. early
 * season, or the FFBB sensor is briefly unavailable -- it still renders the
 * card with its header, showing "no standings available" instead of
 * disappearing silently. A vanished card with no explanation looks like a
 * bug; an empty state does not.
 *
 * `compact` sets the table's font scale: true (display_mode "both", the
 * card sits right under the match card) keeps it aligned with the popup's
 * simple standings table (0.85em); false (display_mode "standings", this is
 * the only card on the dashboard) lets it read at a normal card's text
 * size, like any other standalone HA card.
 */
export function renderStandingsBlock({
  standings,
  poule,
  competition,
  teamName,
  displayTeamName,
  accentColor,
  title,
  icon,
  compact,
  showLogos = true,
  t,
}) {
  const rows = sortStandings(standings);
  const pouleText = poule && !INVALID_STATES.includes(poule) ? poule : "";
  const competitionText = competition && !INVALID_STATES.includes(competition) ? competition : "";
  const cardTitle = title || t("card.standings_title", "Standings");
  const cardIcon = icon !== undefined ? icon : "mdi:format-list-numbered";

  return html`
    <ha-card class="standings-card ${compact ? "standings-compact" : ""}" style="--ffbb-accent-color: ${accentColor};">
      <div class="standings-card-header">
        ${cardIcon ? html`<ha-icon icon=${cardIcon}></ha-icon>` : nothing}
        <span>${cardTitle}${pouleText ? ` • ${pouleText}` : ""}</span>
      </div>
      ${competitionText ? html`<div class="standings-card-subtitle">${competitionText}</div>` : nothing}
      <div class="standings-card-body">
        ${rows.length > 0
          ? renderDetailedTable({ rows, teamName, displayTeamName, t, showLogos })
          : html`<div class="standings-empty-text">${t("card.no_standings", "No standings data available.")}</div>`}
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
  /* Standing alone as the only card on the dashboard (display_mode
     "standings", compact === false), the title reads at the exact same
     size/weight as the match card's own header (.card-header in styles.js:
     1.7em, weight 600, 28px icon) instead of the smaller size used when
     this card sits under the match card ("both", compact === true). */
  .standings-card:not(.standings-compact) .standings-card-header {
    padding: 16px 16px 0 16px;
    font-size: 1.7em;
    font-weight: 600;
  }
  .standings-card:not(.standings-compact) .standings-card-header ha-icon {
    --mdc-icon-size: 28px;
  }
  .standings-card-subtitle {
    padding: 0 16px 6px;
    font-size: 0.82em;
    color: var(--secondary-text-color);
  }
  .standings-card-body {
    padding: 6px 8px 14px;
  }
  .standings-empty-text {
    text-align: center;
    padding: 16px;
    color: var(--secondary-text-color);
    font-style: italic;
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
  /* Only when the card sits right under the match card (display_mode
     "both") do we shrink the table to match the popup's simple standings
     table (0.85em). Standing alone as the only card on the dashboard, it
     keeps a normal card's text size instead -- see the "compact" doc
     comment on renderStandingsBlock. */
  .standings-compact .standings-table-detailed {
    font-size: 0.85em;
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
  /* Not scoped to .standings-card: this must un-truncate the team name
     wherever the detailed table renders -- the standalone standings card
     AND the popup opened from the rank badges (standings_popup_detailed) --
     so both look and behave identically (horizontal scroll via
     .standings-scroll, never wrapped, never an ellipsis).

     The compound selector (.standings-table.standings-table-detailed, both
     classes on the same <table>) is deliberate, not just
     ".standings-table-detailed .col-team": that has the SAME specificity
     (0,0,2,0) as the truncating base rule (.standings-table .col-team in
     styles.js), so it depends entirely on source order to win -- which, in
     practice, it did not (regression: this broke the standalone card too,
     which the old .standings-card .standings-table .col-team selector,
     3 classes, had safely beaten on specificity alone regardless of order).
     Three class components here (.standings-table + .standings-table-detailed
     + .col-team) gives (0,0,3,0), reliably higher than the base rule's
     (0,0,2,0), independent of stylesheet order. */
  .standings-table.standings-table-detailed .col-team {
    text-align: left;
    min-width: 110px;
    max-width: none;
    white-space: nowrap;
    overflow: visible;
    text-overflow: clip;
  }
  /* Deliberately tiny and inline (not a flex layout on .col-team, which
     would fight the sticky/scroll positioning rules above and below this
     block): a 16px circle plus a small margin adds only ~2px to a
     ~29-31px detailed-table row, and 0px to a table using this same class
     elsewhere (styles.js's simple popup table) -- the point was adding
     logos without growing any row. Shared with that simple table via
     renderStandingsLogo() so both use one rule, not two that could drift. */
  /* Measured against real screenshots (popup: 27px row / 8px padding;
     detailed table: 31px row / 12px padding), both landed on ~19px of
     already-reserved text content height regardless of table -- 18px
     stays safely under that in both, so this grows the logo without
     growing either row. */
  .col-team-logo {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    object-fit: contain;
    vertical-align: middle;
    margin-right: 4px;
    background: #ffffff;
    padding: 1px;
    box-sizing: border-box;
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
    padding: 6px 4px;
    white-space: nowrap;
  }
  .standings-table-detailed .diff-pos {
    color: var(--success-color, #43a047);
  }
  .standings-table-detailed .diff-neg {
    color: var(--error-color, #e53935);
  }

  /* Narrow screens: keep team names on a single line, let the table scroll
     horizontally instead of shrinking/wrapping the column. */
  @media (max-width: 600px) {
    .standings-card-body {
      padding-left: 4px;
      padding-right: 4px;
    }
    .standings-table-detailed .col-team {
      font-size: 0.92em;
    }
  }
`;
