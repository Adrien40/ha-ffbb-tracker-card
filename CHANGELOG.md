# FFBB Tracker Card - Changelog

## 0.8.2

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

This release fixes the English entity names the card looks for, and checks every name it guesses against the integration's real ones.

### 🐛 Bug fixes
- **On a Home Assistant in English, the card could not find the pool, the recent form or the venue sensors by name.** When the entity registry isn't available (and for anything it doesn't provide), the card guesses entity IDs from the name of the one you picked. Three of its English guesses were wrong: the pool sensor is called `pool` (not `poule`), the recent form sensor `recent_form` (not `form`) and the next match venue sensor `next_match_venue` (not `next_match_venue_type`). The pool sensor carries the season schedule and the team and competition names, so a card in English could find no schedule to step through. The French names (13 out of 13) were right. The real names are now looked for first, and the old guesses are kept after them. Since 0.8.0 the entity registry finds these entities too when Home Assistant provides it.

### 🧰 Maintenance
- The translation keys the card uses to recognise entities through the entity registry are now written out in a table instead of being derived from the entity names. They are two different things, defined separately by the integration (the pool is called "Pool" in English but its key is `poule`, the form is "Recent form" but its key is `form`). Deriving one from the other, as 0.8.0 did, is how the wrong English guesses went unnoticed.
- New tests compare every name and key the card expects with the integration's real ones, in French and in English, and resolve a whole team in each language from each of its entities. The names are a copy of the integration's (`src/integration-entity-names.fixture.js`), to update when the integration changes them. The previous tests only used French names, or used the translation keys as if they were English names. Test suite grown from 723 to 797 tests.

### 📋 Upgrade notes
- Nothing to do. French installations are unaffected. On an English installation the card now also finds the pool sensor, and with it the schedule, by name.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## 0.8.1

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

This release makes the card's editor say so when the card's entity no longer exists, which is what happens when that entity is renamed.

### ✨ New features
- **The editor warns when the card's entity no longer exists, and suggests the one to pick.** Home Assistant doesn't update the entity IDs written in dashboards when an entity is renamed, so the entity picker only showed "Unknown entity" while the card kept working. A card configured on an entity that no longer exists can't ask the entity registry about it: it carries on by guessing the team's other entities from the old name, which works until that name no longer gives anything away. The text under the entity field now names the missing entity and suggests a sensor of the same team (the pool sensor first, sensors only). It goes back to the normal text as soon as the entity exists again, and says nothing for a new card or while Home Assistant's states aren't loaded yet.

### 🧰 Maintenance
- Test suite grown from 707 to 723 tests: the warning in both languages, the suggestion (pool sensor first, next match date otherwise, sensors only, none when nothing of the team is found), the return to the normal text once the entity exists again, a new card, states not loaded yet, and an entity ID that happens to be the name of an object property.

### 📋 Upgrade notes
- If a card's options show "Unknown entity" after you renamed an entity, open them and select the entity again (the editor now suggests which one). The card may look fine without that, but it then relies on guessing from the old name: an entity renamed to something unrelated would leave it showing nothing.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## 0.8.0

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

This release makes the card find a team's entities through Home Assistant's entity registry instead of guessing their names, so renaming an entity no longer breaks it.

### 🐛 Bug fixes
- **Renaming an entity broke the card.** The card found a team's entities by guessing entity IDs from the one you picked (French and English names after a shared prefix). Renaming one entity made it silently disappear from the card (rename the next match date and that date is gone), and choosing a renamed entity as the card's entity left the card with nothing at all. The card now asks Home Assistant's entity registry for every entity of the same device that the integration created, recognised by the translation key the integration gives each of them, so what they are called no longer matters. The names are only used for what the registry doesn't provide. This matters more since FFBB Tracker 0.9.0, which keeps renamed entity IDs when a team is switched to its new IDs.
- **A team or competition name containing "poule", "rank" or "form" made the card find nothing.** An entity ID reads "<team and competition>_<entity name>" and the card cut it at the first such word, which could be inside the team name. It now tries every possible cut and keeps the one that finds the most entities. This also applies when the registry isn't available.

### 🧰 Maintenance
- Test suite grown from 672 to 707 tests. The resolution is tested with the five renaming cases (a renamed entity, a card configured on a renamed entity, a different prefix, an entity without a recognisable word, and names with a word in the prefix), with two teams on different devices, with another integration's entities on the same device, with an incomplete or junk registry, and through the rendered card. The translation keys the card expects are checked against the list of keys the integration defines.

### 📚 Documentation
- README: the automatic entity resolution bullet now says how entities are found, and that renaming them is fine.

### 📋 Upgrade notes
- Nothing to do. If your Home Assistant doesn't provide the entity registry to cards (`hass.entities`, with each entity's device and translation key), the card finds entities by name as before, only better for names containing the words above.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

## 0.7.3

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀

This release fixes the previous/next chevrons when a past match has no result yet, and says so on the card: such a match is now shown as "Result pending" instead of as an upcoming match.

### 🐛 Bug fixes
- **The previous/next chevrons could skip a match, or seem to do nothing.** The card shows the match that the next/last match sensors describe, which the integration picks by date, but the chevrons stepped from the first match of the schedule that had no score. As soon as a past match had no result yet (the club hasn't entered it, or the FFBB data is late), the two disagreed: "previous" jumped over that match and "next" landed on it. The chevrons now start from the match actually on screen, found through its match number (or its date, for an older integration). With the real schedule that exposed it, "previous" from the next match now goes to the past match without a result, then to the one before it.
- **A past match without a result looked like an upcoming one.** Once a match started more than 3 hours ago (the integration's own grace period) without a score, the card shows a "Result pending" badge instead of the upcoming-match layout, in place of "Game day", and tapping its date no longer offers to add it to your calendar. In the season schedule its time is replaced by "Pending".
- **The season schedule highlighted the wrong row as the next match** when a past match had no result: it now skips matches waiting for their result, like the card does.

### 🧰 Maintenance
- Test suite grown from 555 to 672 tests. The navigation is tested in the pure logic and in the rendered card, replaying the sequence of clicks that went wrong on a real season schedule, including the case where the integration's live window keeps a finished match as the next one for longer than the card's 3 hours.
- CI: the Validate badge in the README pointed at `validate.yml` while the workflow is `validate.yaml`, so it never displayed a status. Fixed, and a HACS validation badge added. A test now fails if a README badge points at a workflow that doesn't exist, or if a file still names an old workflow file.
- `build-dist.yaml` installs with `npm ci`, like the other workflows, instead of `npm install`: the bundle is built from the locked dependency versions.
- New `release.yaml`: pushing a version tag publishes the GitHub release from this changelog (`scripts/release-notes.mjs`). It fails if the tag doesn't match `CARD_VERSION`, if this changelog has no entry for the version, or if the `dist/` committed at that tag isn't what its sources build: tag the commit made by the *Build dist* workflow, not the source commit before it, or HACS users would receive a stale bundle. No file is attached to the release, so HACS keeps installing `dist/` as a whole, including the `brand/` icon the card uses as its fallback logo.

### 📚 Documentation
- README: Validate badge fixed and HACS badge added, in both languages.
- Added `CHANGELOG.md` and `CHANGELOG.fr.md`.

### 📋 Upgrade notes
- Nothing to do. A card whose scores are all up to date looks and behaves exactly as before.
- The existing "Postponed" badge is unchanged. It is shown when the integration flags the next match as stale, which in fact means that a past match with no result is the only one left to show. "Result pending" covers the other past matches without a result.

🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀
