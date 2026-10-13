// Consistency tests for the repository's release, CI and documentation
// metadata. None of this affects the card at runtime, but each item breaks
// silently when it drifts: a README badge shows "no status" (the Validate badge
// had the wrong file extension for its workflow), a release has no notes, a
// comment sends a maintainer to a workflow file that was renamed.
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { CARD_VERSION } from "./version.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const WORKFLOWS = join(ROOT, ".github", "workflows");
const REPO = "Adrien40/ha-ffbb-tracker-card";
const READMES = ["README.md", "README.fr.md"];
const CHANGELOGS = ["CHANGELOG.md", "CHANGELOG.fr.md"];

const text = (path) => readFileSync(join(ROOT, path), "utf-8");
const workflowFiles = () => readdirSync(WORKFLOWS).filter((name) => /\.ya?ml$/.test(name));
const matches = (source, pattern) => [...source.matchAll(pattern)].map((m) => m.slice(1));

const BADGE_IMAGE = /github\.com\/([^/]+\/[^/]+)\/actions\/workflows\/([\w.-]+\.ya?ml)\/badge\.svg/g;
const BADGE_LINK = /\]\(https:\/\/github\.com\/([^/]+\/[^/]+)\/actions\/workflows\/([\w.-]+\.ya?ml)\)/g;

describe.each(READMES)("%s badges", (readme) => {
  const source = text(readme);

  it("target this repository", () => {
    const repos = new Set([...matches(source, BADGE_IMAGE), ...matches(source, BADGE_LINK)].map(([repo]) => repo));

    expect([...repos]).toEqual([REPO]);
  });

  it("point at workflow files that exist", () => {
    const named = new Set([...matches(source, BADGE_IMAGE), ...matches(source, BADGE_LINK)].map(([, file]) => file));

    expect(named.size).toBeGreaterThan(0);
    for (const file of named) {
      expect(existsSync(join(WORKFLOWS, file)), `${readme}: no workflow named ${file}`).toBe(true);
    }
  });

  it("use the same workflow for the image and the link of each badge", () => {
    const images = matches(source, BADGE_IMAGE).map(([, file]) => file).sort();
    const links = matches(source, BADGE_LINK).map(([, file]) => file).sort();

    expect(images).toEqual(links);
  });

  it.each(["validate.yaml", "hacs.yaml"])("include a badge for %s", (file) => {
    expect(matches(source, BADGE_IMAGE).map(([, name]) => name)).toContain(file);
  });
});

it("both READMEs show the same workflow badges", () => {
  const files = (readme) => matches(text(readme), BADGE_IMAGE).map(([, file]) => file).sort();

  expect(files("README.md")).toEqual(files("README.fr.md"));
});

describe("no stale workflow file names", () => {
  // `.yml` names of workflows that exist as `.yaml`.
  const stale = new Set(workflowFiles().filter((name) => name.endsWith(".yaml")).map((name) => name.replace(/\.yaml$/, ".yml")));
  const sources = [
    ...READMES,
    ...readdirSync(join(ROOT, "src")).filter((name) => name.endsWith(".js")).map((name) => join("src", name)),
    ...workflowFiles().map((name) => join(".github", "workflows", name)),
  ];

  it.each(sources)("%s", (path) => {
    const named = new Set(matches(text(path), /\b([\w-]+\.yml)\b/g).map(([name]) => name));

    for (const name of named) {
      expect(stale.has(name), `${path} mentions ${name}, but the workflow is ${name.replace(/\.yml$/, ".yaml")}`).toBe(false);
    }
  });
});

describe("changelogs", () => {
  const versions = (changelog) =>
    matches(text(changelog), /^##\s+\[?(\d+\.\d+\.\d+)\]?/gm).map(([v]) => v.split(".").map(Number));
  const dotted = (list) => list.map((parts) => parts.join("."));

  it.each(CHANGELOGS)("%s has an entry for CARD_VERSION", (changelog) => {
    expect(dotted(versions(changelog))).toContain(CARD_VERSION);
  });

  it.each(CHANGELOGS)("%s lists unique versions, newest first", (changelog) => {
    const list = versions(changelog);
    const sorted = [...list].sort((a, b) => b[0] - a[0] || b[1] - a[1] || b[2] - a[2]);

    expect(list).toEqual(sorted);
    expect(new Set(dotted(list)).size).toBe(list.length);
  });

  it("the newest entry is CARD_VERSION (no entry written for an unreleased version)", () => {
    expect(dotted(versions("CHANGELOG.md"))[0]).toBe(CARD_VERSION);
  });

  it("both languages cover the same versions", () => {
    expect(dotted(versions("CHANGELOG.md"))).toEqual(dotted(versions("CHANGELOG.fr.md")));
  });
});

describe("workflows", () => {
  it("release.yaml runs the release notes script, which exists", () => {
    const release = text(".github/workflows/release.yaml");

    expect(release).toContain("scripts/release-notes.mjs");
    expect(existsSync(join(ROOT, "scripts", "release-notes.mjs"))).toBe(true);
  });

  it("release.yaml refuses a stale dist/ and attaches no file", () => {
    const release = text(".github/workflows/release.yaml");

    expect(release).toContain("git status --porcelain -- dist");
    expect(release).not.toMatch(/--attach|\bgh release upload\b|\sdist\/ha-ffbb-tracker-card\.js\s/);
  });

  it.each(["build-dist.yaml", "release.yaml"])("%s installs with npm ci, not npm install", (file) => {
    const source = text(join(".github", "workflows", file));

    expect(source).toContain("npm ci");
    expect(source).not.toMatch(/npm install/);
  });
});
