// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { DEFAULT_FALLBACK_LOGO } from "./pure.js";
import "./ha-ffbb-tracker-card.js";

function makeCard(config = { entity: "sensor.my_team_next_match" }) {
  const Card = customElements.get("ffbb-tracker-card");
  const el = new Card();
  el.setConfig(config);
  return el;
}

describe("i18n on initial render", () => {
  it("renders in English on the first cycle when hass.language is 'en'", async () => {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: "sensor.basket_landes_prochain_match_adversaire" });
    el.hass = {
      language: "en",
      locale: { language: "en" },
      states: {
        "sensor.basket_landes_prochain_match_adversaire": { state: "Dax" },
        "sensor.basket_landes_prochain_match_date": { state: "2026-09-19T20:00:00", attributes: { round: "2" } },
      },
    };
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot.textContent).toContain("Next match");
    expect(el.shadowRoot.textContent).not.toContain("Prochain match");
    document.body.innerHTML = "";
  });
});

describe("_getRankClass()", () => {
  const el = makeCard();

  it.each([
    ["1", "rank-gold"],
    ["1er", "rank-gold"],
    ["2", "rank-silver"],
    ["3", "rank-bronze"],
    ["4", ""],
  ])("rank %s -> %s", (rank, expected) => {
    expect(el._getRankClass(rank)).toBe(expected);
  });

  it("returns \"\" when disable_podium_colors is true", () => {
    const elDisabled = makeCard({ entity: "sensor.x", disable_podium_colors: true });
    expect(elDisabled._getRankClass("1")).toBe("");
  });

  it("returns \"\" when rank_badge_style is 'none'", () => {
    const elNone = makeCard({ entity: "sensor.x", rank_badge_style: "none" });
    expect(elNone._getRankClass("1")).toBe("");
  });
});

describe("_onKeyActivate()", () => {
  let el, handler, listener;

  beforeEach(() => {
    el = makeCard();
    handler = vi.fn();
    listener = el._onKeyActivate(handler);
  });

  it.each(["Enter", " ", "Spacebar"])("calls handler on %j", (key) => {
    const event = { key, preventDefault: vi.fn() };
    listener(event);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});

describe("modal / manual-view state setters", () => {
  it("_openModal() / _closeModal() toggle _activeModal", () => {
    const el = makeCard();
    el._openModal("standings");
    expect(el._activeModal).toBe("standings");
    el._closeModal();
    expect(el._activeModal).toBeNull();
  });
});

describe("card-editor.js _valueChanged()", () => {
  it("dispatches config-changed on valid update", () => {
    const Editor = customElements.get("ffbb-tracker-card-editor");
    const el = new Editor();
    el.hass = { locale: { language: "en-US" } };
    el.setConfig({ entity: "sensor.x" });

    const spy = vi.fn();
    el.addEventListener("config-changed", spy);
    el._valueChanged({ detail: { value: { show_rank: false } } });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.config.show_rank).toBe(false);
  });
});

describe("rank_badge_style DOM rendering", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const baseHass = {
    language: "fr",
    locale: { language: "fr" },
    states: {
      "sensor.basket_landes_prochain_match_adversaire": { state: "Dax" },
      "sensor.basket_landes_classement": { state: "1" },
    },
  };

  it("renders solid metallic badge class when rank_badge_style is 'solid'", async () => {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({
      entity: "sensor.basket_landes_prochain_match_adversaire",
      rank_badge_style: "solid",
    });
    el.hass = baseHass;
    document.body.appendChild(el);
    await el.updateComplete;

    const badge = el.shadowRoot.querySelector(".rank-badge");
    expect(badge).not.toBeNull();
    expect(badge.classList.contains("rank-solid")).toBe(true);
    expect(badge.classList.contains("rank-gold")).toBe(true);
  });

  it("omits podium medal colors when rank_badge_style is 'none'", async () => {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({
      entity: "sensor.basket_landes_prochain_match_adversaire",
      rank_badge_style: "none",
    });
    el.hass = baseHass;
    document.body.appendChild(el);
    await el.updateComplete;

    const badge = el.shadowRoot.querySelector(".rank-badge");
    expect(badge).not.toBeNull();
    expect(badge.classList.contains("rank-solid")).toBe(false);
    expect(badge.classList.contains("rank-gold")).toBe(false);
  });

  it("renders outline podium badge by default or when set to 'outline'", async () => {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({
      entity: "sensor.basket_landes_prochain_match_adversaire",
      rank_badge_style: "outline",
    });
    el.hass = baseHass;
    document.body.appendChild(el);
    await el.updateComplete;

    const badge = el.shadowRoot.querySelector(".rank-badge");
    expect(badge).not.toBeNull();
    expect(badge.classList.contains("rank-solid")).toBe(false);
    expect(badge.classList.contains("rank-gold")).toBe(true);
  });
});

describe("live match DOM rendering", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders live badge, pulsing dot, and kickoff time when match is in progress", async () => {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: "sensor.basket_landes_prochain_match_adversaire" });
    el.hass = {
      language: "fr",
      locale: { language: "fr" },
      states: {
        "sensor.basket_landes_prochain_match_adversaire": { state: "Dax" },
        "sensor.basket_landes_prochain_match_date": { state: "2026-09-19T20:00:00" },
        "binary_sensor.basket_landes_match_en_cours": { state: "on" },
      },
    };
    document.body.appendChild(el);
    await el.updateComplete;

    const liveBadge = el.shadowRoot.querySelector(".badge-live");
    expect(liveBadge).not.toBeNull();

    const liveDot = el.shadowRoot.querySelector(".live-dot");
    expect(liveDot).not.toBeNull();

    const liveClock = el.shadowRoot.querySelector(".live-clock");
    expect(liveClock).not.toBeNull();
    expect(liveClock.textContent).toContain("20:00");
  });
});

describe("full render image fallback", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("falls back to the default brand logo and avoids infinite error loops", async () => {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: "sensor.test_match" });
    el.hass = {
      states: {
        "sensor.test_match": {
          state: "Team B",
          attributes: { team_logo_url: "https://invalid.example/nonexistent.png" },
        },
      },
    };
    document.body.appendChild(el);
    await el.updateComplete;

    const img = el.shadowRoot.querySelector(".logo");
    expect(img).not.toBeNull();

    img.dispatchEvent(new Event("error"));
    expect(img.src).toContain(DEFAULT_FALLBACK_LOGO);
  });
});
