# FFBB Tracker Card - Changelog

All notable changes to this project are documented in this file.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
