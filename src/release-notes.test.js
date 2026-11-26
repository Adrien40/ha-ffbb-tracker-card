// Tests for scripts/release-notes.mjs, which backs the Release workflow.
//
// A tag pushed without a matching changelog entry or version must fail the
// release rather than publish empty or mismatched notes, so every failure mode
// is covered, plus an end-to-end run on the repository's own files (the command
// release.yaml runs).
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  ReleaseNotesError,
  baseVersion,
  buildReleaseNotes,
  extractSection,
  main,
  readCardVersion,
} from "../scripts/release-notes.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPT = join(ROOT, "scripts", "release-notes.mjs");
const SEP = "🏀".repeat(10);

const CHANGELOG = `# Project - Changelog

## 0.9.0

${SEP}

### ✨ New features
- Newer thing.

${SEP}

## 0.7.3

${SEP}

Intro sentence.

### 🐛 Bug fixes
- Fixed thing.

---

${SEP}

## 0.7.30

### 🐛 Bug fixes
- Must never be picked for 0.7.3.
`;

const CHANGELOG_FR = `# Projet - Journal

## 0.7.3

${SEP}

### 🐛 Corrections
- Chose corrigée.

${SEP}
`;

function workspace({ english = CHANGELOG, french = CHANGELOG_FR, version = "0.7.3" } = {}) {
  const dir = mkdtempSync(join(tmpdir(), "release-notes-"));
  const files = {
    changelog: join(dir, "CHANGELOG.md"),
    changelogFr: join(dir, "CHANGELOG.fr.md"),
    versionFile: join(dir, "version.js"),
  };
  writeFileSync(files.changelog, english);
  if (french !== null) {
    writeFileSync(files.changelogFr, french);
  }
  writeFileSync(files.versionFile, `export const CARD_VERSION = "${version}";\n`);
  return files;
}

const collect = () => {
  const out = { text: "" };
  return { out, stream: { write: (chunk) => { out.text += chunk; } } };
};

describe("baseVersion() / readCardVersion()", () => {
  it.each([["0.7.3", "0.7.3"], ["1.2.0-rc1", "1.2.0"], ["1.2.0b2", "1.2.0"]])("%s -> %s", (version, expected) => {
    expect(baseVersion(version)).toBe(expected);
  });

  it.each(["", "v0.7.3", "0.7", "latest"])("rejects %j", (version) => {
    expect(() => baseVersion(version)).toThrow(ReleaseNotesError);
  });

  it("reads CARD_VERSION whatever the quotes", () => {
    expect(readCardVersion('export const CARD_VERSION = "0.7.3";')).toBe("0.7.3");
    expect(readCardVersion("export const CARD_VERSION = '0.7.3'")).toBe("0.7.3");
  });

  it("fails without a CARD_VERSION", () => {
    expect(() => readCardVersion("export const OTHER = 1;")).toThrow(ReleaseNotesError);
  });
});

describe("extractSection()", () => {
  it("returns only the requested version", () => {
    const section = extractSection(CHANGELOG, "0.7.3");

    expect(section.startsWith("Intro sentence.")).toBe(true);
    expect(section).toContain("Fixed thing.");
    expect(section).not.toContain("Newer thing.");
  });

  it("does not mistake a longer version number for the requested one", () => {
    expect(extractSection(CHANGELOG, "0.7.3")).not.toContain("Must never be picked");
    expect(extractSection(CHANGELOG, "0.7.30")).toContain("Must never be picked");
  });

  it("strips decorative separators and rules", () => {
    const section = extractSection(CHANGELOG, "0.7.3");

    expect(section).not.toContain("🏀");
    expect(section).not.toContain("---");
    expect(section).toBe(section.trim());
  });

  it.each(["## [0.7.3]", "## [0.7.3] - 2026-10-02", "## 0.7.3 "])("accepts the heading %j", (heading) => {
    expect(extractSection(`${heading}\n\n- Item.\n\n## 0.7.2\n\n- Old.\n`, "0.7.3")).toBe("- Item.");
  });

  it("accepts Windows line endings", () => {
    expect(extractSection("## 0.7.3\r\n\r\n- Item.\r\n\r\n## 0.7.2\r\n", "0.7.3")).toBe("- Item.");
  });

  it("returns null when the section is missing or empty", () => {
    expect(extractSection(CHANGELOG, "9.9.9")).toBeNull();
    expect(extractSection(`## 0.7.3\n\n${SEP}\n\n## 0.7.2\n`, "0.7.3")).toBeNull();
  });
});

describe("buildReleaseNotes()", () => {
  it("appends the French section in a collapsible block", () => {
    const notes = buildReleaseNotes("0.7.3", workspace());

    expect(notes).toContain("Fixed thing.");
    expect(notes).toContain("<details>");
    expect(notes).toContain("Chose corrigée.");
    expect(notes.indexOf("Fixed thing.")).toBeLessThan(notes.indexOf("Chose corrigée."));
    expect(notes.endsWith("</details>\n")).toBe(true);
  });

  it("is English only when the French changelog has no entry, or doesn't exist", () => {
    expect(buildReleaseNotes("0.7.3", workspace({ french: "# Projet\n\n## 0.7.2\n\n- Ancien.\n" }))).not.toContain("<details>");
    expect(buildReleaseNotes("0.7.3", workspace({ french: null }))).not.toContain("<details>");
  });

  it("compares a pre-release tag on its base version", () => {
    expect(buildReleaseNotes("0.7.3-rc1", workspace())).toContain("Fixed thing.");
  });

  it("fails when the tag doesn't match CARD_VERSION", () => {
    expect(() => buildReleaseNotes("0.9.0", workspace())).toThrow(/does not match CARD_VERSION 0\.7\.3/);
  });

  it("fails when the changelog has no entry for the version", () => {
    const files = workspace({ english: "# Project\n\n## 0.7.2\n\n- Old.\n" });

    expect(() => buildReleaseNotes("0.7.3", files)).toThrow(/no '## 0\.7\.3' section/);
  });

  it("fails when the changelog file is missing", () => {
    expect(() => buildReleaseNotes("0.7.3", { versionFile: null, changelog: "/nope/CHANGELOG.md", changelogFr: "/nope/fr.md" })).toThrow(/not found/);
  });

  it("skips the version check without a version file", () => {
    const files = { ...workspace(), versionFile: null };

    expect(buildReleaseNotes("0.7.3", files)).toContain("Fixed thing.");
  });
});

describe("main()", () => {
  const argsFor = (files) => ["--version-file", files.versionFile, "--changelog", files.changelog, "--changelog-fr", files.changelogFr];

  it("prints the notes and returns 0", () => {
    const { out, stream } = collect();

    const status = main(["0.7.3", ...argsFor(workspace())], { stdout: stream, stderr: collect().stream });

    expect(status).toBe(0);
    expect(out.text).toContain("Fixed thing.");
  });

  it("reports errors on stderr and returns 1", () => {
    const stdout = collect();
    const stderr = collect();

    const status = main(["0.9.0", ...argsFor(workspace())], { stdout: stdout.stream, stderr: stderr.stream });

    expect(status).toBe(1);
    expect(stdout.out.text).toBe("");
    expect(stderr.out.text.startsWith("error:")).toBe(true);
  });

  it("asks for a version when none is given", () => {
    const stderr = collect();

    expect(main([], { stdout: collect().stream, stderr: stderr.stream })).toBe(1);
    expect(stderr.out.text).toContain("missing version");
  });
});

describe("the command release.yaml runs, on this repository", () => {
  const cardVersion = readCardVersion(readFileSync(join(ROOT, "src", "version.js"), "utf-8"));
  const run = (version) => spawnSync(process.execPath, [SCRIPT, version], { cwd: ROOT, encoding: "utf-8" });

  it("produces the notes of the current version", () => {
    const result = run(cardVersion);

    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout.trim()).not.toBe("");
    expect(result.stdout).not.toContain("🏀🏀🏀");
    expect(result.stdout).toContain("<details>");
  });

  it("refuses a tag that isn't the current version", () => {
    const result = run("9.9.9");

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("does not match CARD_VERSION");
  });
});
