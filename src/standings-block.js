// "Standings below the card" -- a second <ha-card> rendered right under the
// main match card (config: show_standings_below).
//
// Everything specific to this feature lives in this file: the row-highlight
// helper, the template, and the styles. ha-ffbb-tracker-card.js only imports
// renderStandingsBlock / standingsBlockStyles and calls them, so the existing
// card code stays untouched apart from those few hook lines.
//
// Unlike the standings modal, this block shows the WHOLE table: there is
// deliberately no max-height and no overflow rule, so it never gets a
// scrollbar -- the card simply grows to fit every team of the pool.
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
        <table class="standings-table">
          <thead>
            <tr>
              <th>#</th>
              <th class="col-team">${t("card.table_team", "Team")}</th>
              <th>${t("card.table_pts", "Pts")}</th>
              <th>${t("card.table_played", "J")}</th>
              <th>${t("card.table_wins", "G")}</th>
              <th>${t("card.table_losses", "P")}</th>
              <th>${t("card.table_draws", "N")}</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map(
              (item) => html`
                <tr class=${isHighlightedRow(item, teamName, opponentName) ? "highlight-row" : ""}>
                  <td class="pos-cell">${item.position || item.rank || "-"}</td>
                  <td class="col-team">${item.team_name || item.name || "-"}</td>
                  <td class="pts-cell">${item.points ?? item.pts ?? "-"}</td>
                  <td>${item.played ?? "-"}</td>
                  <td>${item.wins ?? item.won ?? "-"}</td>
                  <td>${item.losses ?? item.lost ?? "-"}</td>
                  <td>${item.draws ?? "0"}</td>
                </tr>
              `
            )}
          </tbody>
        </table>
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
`;
