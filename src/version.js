// Single source of truth for the card's version.
//
// ha-ffbb-tracker-card.js and card-editor.js both import CARD_VERSION from
// here instead of each hardcoding their own copy, so a release only needs
// to bump this one value for the console banner, the registered card
// name, and the editor's version footer to all agree.
//
// card-editor.js is loaded via a static import in ha-ffbb-tracker-card.js
// and bundled together with it by build.mjs (esbuild), so both files
// always ship as a single dist/ha-ffbb-tracker-card.js -- there is no
// separate cache-busting concern for card-editor.js, or for the
// translation JSON files (also statically imported and inlined into the
// same bundle by translations.js).
export const CARD_VERSION = "0.6.1";
