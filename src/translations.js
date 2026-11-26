import frTranslations from "../translations/fr.json";
import enTranslations from "../translations/en.json";

const TRANSLATIONS = {
  fr: frTranslations,
  en: enTranslations,
};

/**
 * Resolve a 2-letter language code from Home Assistant's hass object.
 */
export function resolveLang(hass) {
  const raw = hass?.locale?.language || hass?.language || "en";
  return raw.substring(0, 2).toLowerCase();
}

/**
 * Return dictionary for the given language code, falling back to English.
 */
export function getTranslations(lang) {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}

/**
 * Look up a dot-separated translation key in the provided translation map.
 */
export function translate(translations, key, fallback = "") {
  if (!translations || !key) {
    return fallback;
  }
  const parts = key.split(".");
  let current = translations;
  for (const part of parts) {
    if (!current || typeof current !== "object" || !(part in current)) {
      return fallback;
    }
    current = current[part];
  }
  return typeof current === "string" ? current : fallback;
}