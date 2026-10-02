# FFBB Tracker Card - Changelog

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
