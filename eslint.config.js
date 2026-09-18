import js from "@eslint/js";
import globals from "globals";

// Flat config (ESLint 9+/10). Kept intentionally minimal: this repo has no
// build step and no framework-specific plugin (Lit ships no official
// eslint-plugin as of writing), so this catches real bugs -- unused vars,
// undefined globals, accidental reassignment of consts, etc. -- without
// imposing a style opinion the project didn't already have (formatting is
// left alone; there's no Prettier step here, unlike ruff on the Python
// integration repo).
export default [
  {
    // node_modules/** excludes the real npm `lit` package (installed as a
    // dependency, not vendored by hand anymore -- see package.json).
    // dist/** is the esbuild output (see build.mjs), generated from src/ --
    // linting it would just re-report, on a minified bundle, every issue
    // (or non-issue) already checked against the real source in src/.
    ignores: ["node_modules/**", "dist/**"],
  },
  js.configs.recommended,
  {
    // Same "**/" requirement here: this block is what supplies browser
    // globals (window, document, fetch, CustomEvent, ...) and the
    // no-unused-vars rule. A bare "*.js" only matches the repo root, so
    // every file under dist/ silently fell back to zero configured
    // globals and failed with dozens of false "'window' is not defined"
    // errors.
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["**/*.test.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    // Placed after the generic "**/*.js" block above so these Node
    // globals (process, console, ...) win over that block's browser
    // globals for this one file: build.mjs runs under Node (via
    // `node build.mjs`), not in the browser.
    files: ["build.mjs"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
  },
];
