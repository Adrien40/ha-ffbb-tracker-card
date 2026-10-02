#!/usr/bin/env node
// Builds the GitHub release notes from the changelogs.
//
// Used by .github/workflows/release.yaml when a version tag is pushed:
//
//   node scripts/release-notes.mjs 0.7.3 > release_notes.md
//
// - The version must match CARD_VERSION in src/version.js (a pre-release
//   suffix such as 0.8.0-rc1 is compared on its 0.8.0 base).
// - CHANGELOG.md must contain a "## 0.7.3" section; it is required.
// - CHANGELOG.fr.md is appended, folded in a collapsible block, when it has a
//   section for the same version too.
//
// Exits with status 1 and a message on stderr when a requirement isn't met, so
// a tag pushed without a changelog entry fails the release instead of
// publishing empty or mismatched notes.
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_VERSION_FILE = join(ROOT, "src", "version.js");
const DEFAULT_CHANGELOG = join(ROOT, "CHANGELOG.md");
const DEFAULT_CHANGELOG_FR = join(ROOT, "CHANGELOG.fr.md");

// A line made only of symbols/emoji (the decorative separators around each
// version block, horizontal rules): no letter, digit, underscore or space.
const DECORATION = /^[^\p{L}\p{N}_\s]+$/u;

export class ReleaseNotesError extends Error {}

/** The X.Y.Z part of a version, dropping any pre-release suffix. */
export function baseVersion(version) {
  const match = /^\d+\.\d+\.\d+/.exec(version);
  if (!match) {
    throw new ReleaseNotesError(`'${version}' is not a valid X.Y.Z version`);
  }
  return match[0];
}

/** The value of CARD_VERSION in the source of src/version.js. */
export function readCardVersion(source) {
  const match = /CARD_VERSION\s*=\s*["']([^"']+)["']/.exec(source);
  if (!match) {
    throw new ReleaseNotesError("no CARD_VERSION found in the version file");
  }
  return match[1];
}

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * The body of the "## <version>" section, or null if absent or empty.
 *
 * The heading may be bare ("## 0.7.3") or Keep-a-Changelog style
 * ("## [0.7.3] - 2026-10-02"). The body runs to the next "## " heading;
 * decorative separator lines and surrounding blank lines are removed.
 */
export function extractSection(changelog, version) {
  const heading = new RegExp(`^##\\s+\\[?${escapeRegExp(version)}\\]?(?:\\s.*)?$`);
  const body = [];
  let inside = false;
  for (const line of changelog.split(/\r?\n/)) {
    if (inside) {
      if (line.startsWith("## ")) {
        break;
      }
      body.push(line);
    } else if (heading.test(line)) {
      inside = true;
    }
  }
  if (!inside) {
    return null;
  }
  const text = body.filter((line) => !DECORATION.test(line.trim())).join("\n").trim();
  return text || null;
}

/** The markdown body of the release for `version`. */
export function buildReleaseNotes(
  version,
  { versionFile = DEFAULT_VERSION_FILE, changelog = DEFAULT_CHANGELOG, changelogFr = DEFAULT_CHANGELOG_FR } = {},
) {
  const base = baseVersion(version);

  if (versionFile) {
    const declared = readCardVersion(readFileSync(versionFile, "utf-8"));
    if (declared !== version && declared !== base) {
      throw new ReleaseNotesError(`tag ${version} does not match CARD_VERSION ${declared} in ${versionFile}`);
    }
  }

  if (!existsSync(changelog)) {
    throw new ReleaseNotesError(`${changelog} not found`);
  }
  const english = extractSection(readFileSync(changelog, "utf-8"), base);
  if (english === null) {
    throw new ReleaseNotesError(`${changelog} has no '## ${base}' section`);
  }

  let notes = english;
  if (existsSync(changelogFr)) {
    const french = extractSection(readFileSync(changelogFr, "utf-8"), base);
    if (french !== null) {
      notes += `\n\n---\n\n<details>\n<summary>🇫🇷 Version française</summary>\n\n${french}\n\n</details>`;
    }
  }
  return `${notes}\n`;
}

/** Command line entry point. Returns the exit status. */
export function main(argv, { stdout = process.stdout, stderr = process.stderr } = {}) {
  const options = { versionFile: DEFAULT_VERSION_FILE, changelog: DEFAULT_CHANGELOG, changelogFr: DEFAULT_CHANGELOG_FR };
  const flags = { "--version-file": "versionFile", "--changelog": "changelog", "--changelog-fr": "changelogFr" };
  let version = null;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] in flags) {
      options[flags[argv[i]]] = argv[++i];
    } else if (version === null) {
      version = argv[i];
    }
  }
  if (version === null) {
    stderr.write("error: missing version (e.g. 0.7.3, without a leading v)\n");
    return 1;
  }
  try {
    stdout.write(buildReleaseNotes(version, options));
  } catch (error) {
    if (error instanceof ReleaseNotesError) {
      stderr.write(`error: ${error.message}\n`);
      return 1;
    }
    throw error;
  }
  return 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = main(process.argv.slice(2));
}
