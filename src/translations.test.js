import { describe, it, expect } from "vitest";
import { resolveLang, getTranslations, translate } from "./translations.js";
import frTranslations from "../translations/fr.json";
import enTranslations from "../translations/en.json";

describe("resolveLang", () => {
  it("resolves from hass.locale.language", () => {
    expect(resolveLang({ locale: { language: "fr-FR" } })).toBe("fr");
  });

  it("resolves from hass.language", () => {
    expect(resolveLang({ language: "en-US" })).toBe("en");
  });

  it("falls back to en when missing", () => {
    expect(resolveLang(null)).toBe("en");
    expect(resolveLang({})).toBe("en");
  });
});

describe("getTranslations", () => {
  it("returns french dictionary", () => {
    const t = getTranslations("fr");
    expect(t.card.round).toBe("Journée");
  });

  it("returns english dictionary", () => {
    const t = getTranslations("en");
    expect(t.card.round).toBe("Round");
  });

  it("falls back to english for unsupported language", () => {
    const t = getTranslations("es");
    expect(t.card.round).toBe("Round");
  });
});

describe("translate", () => {
  const dict = {
    card: {
      title: "Match",
    },
  };

  it("resolves nested key", () => {
    expect(translate(dict, "card.title")).toBe("Match");
  });

  it("returns fallback if key missing", () => {
    expect(translate(dict, "card.unknown", "Fallback")).toBe("Fallback");
  });

  it("returns fallback if translations map is null", () => {
    expect(translate(null, "card.title", "Fallback")).toBe("Fallback");
  });
});

describe("fr.json / en.json key parity", () => {
  // Local mirror of the CI check in validate.yml ("Translation JSON
  // validity + parity"), which only runs on GitHub. Same comparison,
  // runnable with `npm test` (including watch mode) without needing a
  // Python environment or a push -- deliberate overlap with the CI check,
  // kept because it's near-zero maintenance and gives instant local
  // feedback on a forgotten key, while CI stays the final gate before merge.
  function flattenKeys(obj, prefix = "") {
    return Object.entries(obj).flatMap(([key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      return value && typeof value === "object" && !Array.isArray(value)
        ? flattenKeys(value, path)
        : [path];
    });
  }

  it("has exactly the same set of keys in both languages", () => {
    const frKeys = new Set(flattenKeys(frTranslations));
    const enKeys = new Set(flattenKeys(enTranslations));

    const missingInFr = [...enKeys].filter((k) => !frKeys.has(k));
    const missingInEn = [...frKeys].filter((k) => !enKeys.has(k));

    expect(missingInFr, `keys in en.json missing from fr.json: ${missingInFr}`).toEqual([]);
    expect(missingInEn, `keys in fr.json missing from en.json: ${missingInEn}`).toEqual([]);
  });
});
