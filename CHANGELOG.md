# FFBB Tracker Card - Changelog

All notable changes to this project are documented in this file.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.7.2] — 2026-11-27

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### ✨ Enhancements
- **Responsive team logos & centre column:** `ha-card` now uses CSS container queries (`container-type: inline-size`) so `small`, `medium`, `large`, and `extra_large` team logo boxes automatically scale down on narrow multi-column cards without overlapping the navigation chevrons, while keeping their full configured size on wider cards.
- **Single-row form details popup:** the 1–5 match tiles in the "Recent form details" modal now stay aligned on a single responsive row (`flex-wrap: nowrap` with fluid sizing and typography) instead of wrapping the 5th tile onto a second line on narrow cards.
- **Colour-coded form letters on the card:** each letter in the footer `Form` sequence is now individually coloured by outcome (green for wins, red for losses, neutral grey for draws, with light/dark theme contrast adaptation) while keeping the `Form:` label and active streak counter neutral.

### 🐛 Fixes
- **Bye rounds ("Exempt") in schedule & card:** schedule popup rows now display the standard fallback crest (`DEFAULT_FALLBACK_LOGO`) instead of a pause icon to stay consistent with the FFBB website and the standings table; bye detection and logo click guards now also recognise `"Exempt"` by name so clicking the bye side's logo never opens `more-info` even when `is_exempt` is omitted.
- **Team names ending with a department number (`- 1`) & numeric YAML values:** clubs whose bare name ends with a number (e.g. `"ENTENTE BASKET 40"`) now match their FFBB first-team entry (`"ENTENTE BASKET 40 - 1"`) while still rejecting `"ENTENTE BASKET 40 - 2"` and `"ENTENTE BASKET 401"`; unquoted numeric YAML strings (`custom_team_name: 40`, `title: 2026`) no longer throw a `TypeError`.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.7.1] — 2026-11-27

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- **Form letters (`instanceLanguage`):** removed `.slice(0, 2)` truncation when reading `hass.config.language` (keeping only case/whitespace normalization) so the card always selects the exact same `FORM_LETTERS` table as the FFBB Tracker integration.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.7.0] — 2026-11-27

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- **Form letters (`fr-FR`, `en-GB`…):** regional or uppercase Home Assistant instance language tags are now normalized before reading the form table, so a French instance (`fr-FR`, `fr-BE`…) no longer turns losses (`D`) into draws (`N`).
- **Team name matching:** word and number boundaries are preserved so club or city names ending in `-U`, `-NM`, `-RM`… followed by a team number (for example "ELAN BEARNAIS PAU - 2", "ELAN BEARNAIS PAU - 13", "ANGERS ANJOU - 2", "BCNM - 2") are no longer mistaken for youth or senior categories (`U2`, `U13`, `NM2`) and merged with the first team.
- **Light & dark theme rank badges:** rank pills now use Home Assistant theme text/surface variables and contrast-adapted podium colours instead of hardcoded white-on-white styles, staying clearly readable in both light and dark themes.
- **Bye rounds ("Exempt"):** when the standings include an "Exempt" row, a bye week no longer shows a fake rank badge under "Exempt", no longer highlights the "Exempt" line in the standings popup, and disables logo clicks on the bye slot.
- **Visual editor:** clearing `standings_icon` now properly saves an empty icon instead of reverting to the default one.
- **Season navigation & round-sorted schedules:** at the end of the season with "Always upcoming match" (or the manual "next" toggle), the card now lands on the chronologically latest match even when a postponed early round was played after the last round; `findRecentUnplayedIndex` picks the latest unplayed match by date (including `datetime`) and respects `default_match_view: "next"` and manual toggles.
- **Pending results & carousel consistency:** the "Result pending" badge remains visible past D+2 before any chevron navigation; carousel home/away detection without an explicit boolean `is_home` now uses `calendarRowSides`; score, result, logo and URL fallbacks check the exact row described by `lastDate`/`nextDate` and support `home_score`/`away_score` pairs without rendering `"null - null"`.
- **Popups, CSS, accessibility & hardening:** `"unknown"` / `"unavailable"` competition subtitles are hidden in the standings and schedule popups; disabled chevrons expose `aria-disabled="true"` and `tabindex="-1"`; standalone standings cards (`display_mode: "standings"`) no longer carry an extra `12px` top margin; the schedule round/venue column fits `"HOME"` / `"AWAY"` (`42px`); `.card-header` fixes its `var()` fallback; `.badge-gameday` follows `--ffbb-accent-color`; `resolveEntities` handles unknown `binary_sensor.*` suffixes; `findOpponentRank` falls back to `rank`; `formatDate` tolerates malformed locale tags; and all remaining logo URL paths pass through `sanitizeUrl`.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.24] — 2026-11-26

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- **Last match:** only the most recent played match is called "Last match". An older played match, browsed with the chevrons, is now a "Played match".
- **Team names:** a category after the club name ("BASKET LANDES U13", "UJSBP U13M", "… NM3") no longer hides your team, and a number that only extends a longer one ("US DAX 2" / "US DAX 21", "BC LYON 1" / "BC LYON 11", "BASKET 40" / "BASKET 401") is no longer taken for the same team.
- **Standings (detailed table):** "BC LYON" no longer highlights, and takes the custom name of, "BC LYON 2" as well; a short name such as "ANGERS" is found in "ETOILE ANGERS BASKET - 1", like in the simple table.
- **Live match:** a match selected before kick-off, or from the calendar popup, no longer replaces the live match (the title said "Live match" on the wrong match).
- **End of the season** with "Always the next match": the card stays at the end of the season, so the "previous" chevron still works.
- **Header:** "unknown" and "unavailable" are no longer shown as the competition or the pool, and a pool without a competition has no orphan "•".
- **Editor:** changing the entity, or the default view, forgets the match and the toggle of the previous settings; switching to the standings-only mode closes an open match popup; an empty configuration gives the explicit error message.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.23] — 2026-11-26

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- Navigation chevrons: they now walk through the season by date, while the season schedule keeps the official round order (J1, J2, J3, J4…). From a J4 played on 24 Nov., "previous" goes to the J13 of 20 Nov. and "next" to the J14 of 4 Dec. (0.6.22 followed the order of the list, which led to the J5).

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.22] — 2026-11-26

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- Season schedule: the matches are now shown in the federation's official order, by round (J1, J2, J3, J4, J5…), as on the FFBB site. The integration lists them by date, so a postponed match played late (a J4 played on 24 Nov.) used to appear between J13 and J14. The chevrons follow the same order. The order is kept as the integration sends it when a round number is missing or repeated (a calendar with several phases).
- Last and next match: they still follow the DATE, not the round. The last match played is the most recent one (J4 played on 24 Nov. comes after J13 played on 20 Nov.), and the next match is the earliest one left to play.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.21] — 2026-11-26

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- Rank badge: when the match data gives the opponent's team page address (`opponent_url`), the rank is now looked up by that address, which is unique per team. A club with several teams in the standings ("BC LYON" and "BC LYON - 3") no longer leaves the badge empty or risks the wrong rank. Without an address, the name matching of 0.6.20 is used as before.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.20] — 2026-11-26

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- Rank badge: the opponent's rank is now shown for a numbered team (for example "LOUS MAROUS BASKET - 2") that the standings list under the club's bare name ("LOUS MAROUS BASKET"). This is only done when exactly one team of that club is in the standings, so "BC LYON" and "BC LYON - 3" together stay ambiguous and get no rank rather than a wrong one.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.19] — 2026-11-26

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- Match time: the ":" is back to the normal text colour (the orange colon added in 0.6.18 is removed). The 144 px centre column and the chevron offset of 0.6.18 are kept.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.18] — 2026-11-26

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- Team names in the match card: the fixed centre column goes from 160 px (0.6.16/0.6.17) to 144 px, so each name gets 8 px back and long names are no longer cut off with "…". The navigation chevrons are offset 26 px outside that column (6 px further out than in 0.6.15).

### ✨ Improvements
- The ":" of the match time (upcoming matches) is now shown in the accent colour (orange by default); the digits keep the normal text colour.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.17] — 2026-11-26

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### ✨ Improvements
- Standings (popup and standings blocks): my own team's position and name are now shown in the accent colour (orange by default), like in the calendar. The opponent's row in the popup keeps the grey highlight only, and the other columns keep the normal text colour.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.16] — 2026-11-26

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- Navigation chevrons: moved further outwards, as in 0.6.11 (same size as before). The fixed centre column is wider (128 px → 160 px) and the chevrons are offset 24 px outside it, so they stay clear of the score. As a consequence the team logos and names move slightly outwards (about 16 px each side for the column); they still stay at the same place from one match to the next.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.15] — 2026-11-26

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- Navigation chevrons: moved 4 px outwards (same size as before). Since the centre column became fixed, they had come closer to the score of a played match; the space between a chevron and the score is back to what it was before 0.6.12.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.14] — 2026-11-25

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- The score is shown on a single line again (0.6.13 could split it over two lines). It can no longer wrap, whatever its length ("105 - 98" included), and the logos still stay at the same place from one match to the next.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.13] — 2026-11-25

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- Long team names (for example "BISCARROSSE OLYMPIQUE BASKET - 1") are no longer cut off: the fixed centre column of 0.6.12 was wider than the old one and took room from the names. It is back to the width of the old layout, and the logos still stay at the same place from one match to the next.
- Navigation chevrons: they keep their bigger size and wider touch area, and are moved outwards so they stay clear of the match block.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.12] — 2026-11-25

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- Team logos no longer move sideways from one match to the next (a played match, an upcoming one, a bye round...): the centre column of the match area now has a fixed width instead of following its content.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.11] — 2026-11-25

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### ✨ Improvements
- Navigation chevrons are bigger (32 px instead of 22 px) and their clickable area is wider (48 × 48 px), which makes them easier to hit, especially on a phone.

### 🐛 Fixes
- Standings: the bye line ("EXEMPT" on the FFBB site) is shown as a translated "Exempt" ("Bye" in English) instead of "N/A", with the FFBB logo, like on the official ranking.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.10] — 2026-11-24

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- Form: the letters (and the current streak) now follow the card's language instead of the Home Assistant instance's. An English card over a French instance shows "L-W-W-W (1L)" instead of "D-V-V-V (1D)".
- Form popup: a "D" is read with the instance's own letters, so an English instance's "D" (draw) is no longer shown as a loss.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.9] — 2026-11-24

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- Your team was no longer recognised when the name of its pool sensor is shorter than the name written on its matches (for example "ANGERS" and "ETOILE ANGERS BASKET - 1"): nothing was orange in the season schedule popup, and the team's row was not highlighted in the standings. A trailing "- 1" no longer counts as another team's number; "BC LYON" and "BC LYON 2" are still told apart.
- Season schedule popup: which score and which name are yours is now read from the `is_home` flag of each row, which does not depend on how the names are spelled. Names are only compared when a row has no such flag.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.8] — 2026-11-24

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- Form popup: the green / red / grey pills (W / L / D) are visible again. They were all stacked on one point and clipped, because they inherited the absolute positioning of the centre result badge.
- Team names: a team is no longer matched to a numbered sibling (for example "BC LYON" and "BC LYON 2") when looking up its link, its logo or its row in the standings, including the fallback used when no exact name exists.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.7] — 2026-11-24

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- Result badge: a played match no longer shows the result of another match. The badge now only appears with a real result (win, loss or draw), and is hidden when none is known, instead of showing an empty badge or a made-up "Draw".
- Score: a played match without a score in the schedule (a forfeit, for example) no longer shows the score of the last match. It shows "-" instead.
- Opponent links: a team is no longer linked to another team whose name only differs by a number (for example "BC LYON" and "BC LYON 2"), in the links and in the standings lookup.
- Season schedule popup: the "HOME" / "AWAY" tags are now translated (DOM / EXT in French).

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.6] — 2026-11-24

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- Season schedule popup: the date is now bold and the kick-off time a little larger. Row height is unchanged.
- Season schedule popup: the disc behind the pause icon of a bye round is a much darker grey.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.5] — 2026-11-24

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- Season schedule popup: the date and the kick-off time are now the same size as the team names, and the date sits slightly lower, closer to the time. Row height is unchanged.
- Season schedule popup: the disc behind the pause icon of a bye round is a darker grey, so the white icon stands out more.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.4] — 2026-11-24

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- Season schedule popup: the date is no longer glued to the top edge of the row and the score no longer to the bottom edge. Both move slightly towards the middle, and the score is a little larger. Row height is unchanged.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.3] — 2026-11-24

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- Season schedule popup: the date now sits at the top of every row and the score (or the kick-off time) at the bottom, so the date is in the same place whether or not the match has a score, and the two are no longer squeezed together. Row height is unchanged.
- Season schedule popup: the pause icon on a bye round is now white on a solid grey disc, readable in both light and dark themes.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.2] — 2026-11-24

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- Season schedule popup: a bye round row now has the same height as the other rows. A pause icon, the same size as the team logos, stands in for the opponent's logo, and the "Bye" label uses the regular team-name colour in semi-bold instead of a faded italic.

### ✨ Improvements
- Season schedule popup: a match already played now shows its date above the score. Rows keep the same height.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.1] — 2026-11-24

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- Season schedule popup: a bye round now shows the translated "Bye" (or "Exempt" in French) instead of the federation's raw "Exempt", with no opponent logo, no home/away badge, no kick-off time and no "Pending" badge.
- A bye round is never reported as waiting for a result any more.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.6.0] — 2026-11-23

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### 🐛 Fixes
- Card: the date, the time/score and the status badges (Win, Loss, Draw, Bye…) are now aligned the same way in every match state.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## [0.5.0] — 2026-11-23

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

### ✨ New features
- First public release.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀
