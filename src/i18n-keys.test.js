// Guards against a class of bug that no other test catches: code calling
// _t("some.key", "hard-coded fallback") for a key that does not exist in the
// translation files. translate() then silently returns the fallback, so the UI
// shows the fallback text (e.g. French) in every language.
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(resolve(root, p), "utf8");

const en = JSON.parse(read("translations/en.json"));
const fr = JSON.parse(read("translations/fr.json"));

const hasKey = (obj, key) => {
  let cur = obj;
  for (const part of key.split(".")) {
    if (!cur || typeof cur !== "object" || !(part in cur)) return false;
    cur = cur[part];
  }
  return typeof cur === "string";
};

// Matches _t("a.b", ...), this._t("a.b", ...) and t("a.b", ...) with a literal key.
const KEY_RE = /(?<![\w$])_?t\(\s*["']([a-z_]+\.[a-z_0-9.]+)["']/g;

const SOURCES = ["src/ha-ffbb-tracker-card.js", "src/card-editor.js", "src/pure.js"];

describe("translation keys used in the code exist in en.json and fr.json", () => {
  it.each(SOURCES)("%s", (file) => {
    const keys = [...new Set([...read(file).matchAll(KEY_RE)].map((m) => m[1]))];
    expect(keys.length, `expected to find literal t() keys in ${file}`).toBeGreaterThan(0);

    const missingEn = keys.filter((k) => !hasKey(en, k));
    const missingFr = keys.filter((k) => !hasKey(fr, k));
    expect(missingEn, `keys missing from en.json (${file})`).toEqual([]);
    expect(missingFr, `keys missing from fr.json (${file})`).toEqual([]);
  });

  it("detects a missing key (sanity check of this guard)", () => {
    expect(hasKey(en, "editor.ranking_section")).toBe(true);
    expect(hasKey(en, "editor.ranking")).toBe(false);
  });
});
