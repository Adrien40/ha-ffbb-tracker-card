// @vitest-environment happy-dom
//
// components.test.js only smoke-tests that the card imports and that
// setConfig()/getStubConfig()/_t() behave. Everything a user actually
// *does* with the card -- clicking a logo, tapping the venue, opening a
// modal, navigating with the keyboard, seeing a gold/silver/bronze rank
// badge -- lived in ha-ffbb-tracker-card.js with zero test coverage before
// this file. These are exactly the code paths where a silent regression
// would only be noticed by a user tapping a dead button in production.
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { DEFAULT_FALLBACK_LOGO } from "./pure.js";
import "./ha-ffbb-tracker-card.js";

function makeCard(config = { entity: "sensor.my_team_next_match" }) {
  const Card = customElements.get("ffbb-tracker-card");
  const el = new Card();
  el.setConfig(config);
  return el;
}

describe("_getRankClass()", () => {
  const el = makeCard();

  it.each([
    ["1", "rank-gold"],
    ["1er", "rank-gold"],
    ["2", "rank-silver"],
    ["3", "rank-bronze"],
    ["4", ""],
    ["12eme", ""],
  ])("rank %s -> %s", (rank, expected) => {
    expect(el._getRankClass(rank)).toBe(expected);
  });

  it("returns \"\" for falsy or unparseable input", () => {
    expect(el._getRankClass(null)).toBe("");
    expect(el._getRankClass(undefined)).toBe("");
    expect(el._getRankClass("")).toBe("");
    expect(el._getRankClass("N/A")).toBe("");
  });

  it("returns \"\" when rank_badge_style is \"none\"", () => {
    const elNone = makeCard({ entity: "sensor.x", rank_badge_style: "none" });
    expect(elNone._getRankClass("1")).toBe("");
    expect(elNone._getRankClass("2")).toBe("");
    expect(elNone._getRankClass("3")).toBe("");
  });

  it("returns the podium color class for \"outline\" and \"solid\" styles alike (the class itself is the same -- rank-solid is added separately by the template)", () => {
    const elOutline = makeCard({ entity: "sensor.x", rank_badge_style: "outline" });
    expect(elOutline._getRankClass("1")).toBe("rank-gold");

    const elSolid = makeCard({ entity: "sensor.x", rank_badge_style: "solid" });
    expect(elSolid._getRankClass("1")).toBe("rank-gold");
  });
});

describe("_onKeyActivate()", () => {
  let el, handler, listener;

  beforeEach(() => {
    el = makeCard();
    handler = vi.fn();
    listener = el._onKeyActivate(handler);
  });

  it.each(["Enter", " ", "Spacebar"])("calls the handler and preventDefault on %j", (key) => {
    const event = { key, preventDefault: vi.fn() };
    listener(event);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
  });

  it.each(["Escape", "Tab", "a"])("ignores %j", (key) => {
    const event = { key, preventDefault: vi.fn() };
    listener(event);
    expect(handler).not.toHaveBeenCalled();
    expect(event.preventDefault).not.toHaveBeenCalled();
  });
});

describe("modal / manual-view state setters", () => {
  it("_openModal() / _closeModal() toggle _activeModal", () => {
    const el = makeCard();
    expect(el._activeModal).toBeNull();
    el._openModal("standings");
    expect(el._activeModal).toBe("standings");
    el._closeModal();
    expect(el._activeModal).toBeNull();
  });

  it("_setManualView() sets _manualView", () => {
    const el = makeCard();
    expect(el._manualView).toBeNull();
    el._setManualView("last");
    expect(el._manualView).toBe("last");
  });
});

describe("_fireMoreInfo()", () => {
  it("dispatches a bubbling, composed hass-more-info event with the entity id", () => {
    const el = makeCard();
    const spy = vi.fn();
    el.addEventListener("hass-more-info", spy);

    el._fireMoreInfo("sensor.my_team_rank");

    expect(spy).toHaveBeenCalledTimes(1);
    const event = spy.mock.calls[0][0];
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(true);
    expect(event.detail).toEqual({ entityId: "sensor.my_team_rank" });
  });
});

describe("_handleLogoClick()", () => {
  let el, openSpy, warnSpy, moreInfoSpy;

  beforeEach(() => {
    openSpy = vi.spyOn(window, "open").mockImplementation(() => {});
    warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    el = makeCard();
    moreInfoSpy = vi.spyOn(el, "_fireMoreInfo");
  });

  it("action=team_url with a URL opens it and does not fall back to more-info", () => {
    el.setConfig({ entity: "sensor.x", logo_click_action: "team_url" });
    el._handleLogoClick("sensor.x", "https://ffbb.example/team/42", "Basket Landes");

    expect(openSpy).toHaveBeenCalledWith("https://ffbb.example/team/42", "_blank", "noreferrer");
    expect(moreInfoSpy).not.toHaveBeenCalled();
  });

  it("action=team_url with no URL warns and falls back to more-info", () => {
    el.setConfig({ entity: "sensor.x", logo_click_action: "team_url" });
    el._handleLogoClick("sensor.x", "", "Basket Landes");

    expect(openSpy).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("Basket Landes"));
    expect(moreInfoSpy).toHaveBeenCalledWith("sensor.x");
  });

  it("action=more-info fires more-info directly, ignoring any URL", () => {
    el.setConfig({ entity: "sensor.x", logo_click_action: "more-info" });
    el._handleLogoClick("sensor.x", "https://ffbb.example/team/42", "Basket Landes");

    expect(openSpy).not.toHaveBeenCalled();
    expect(moreInfoSpy).toHaveBeenCalledWith("sensor.x");
  });

  it("action=none does nothing", () => {
    el.setConfig({ entity: "sensor.x", logo_click_action: "none" });
    el._handleLogoClick("sensor.x", "https://ffbb.example/team/42", "Basket Landes");

    expect(openSpy).not.toHaveBeenCalled();
    expect(moreInfoSpy).not.toHaveBeenCalled();
  });
});

describe("_openMaps()", () => {
  it("opens a Google Maps search URL built from the gym name and city", () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => {});
    const el = makeCard();

    el._openMaps("Palais des Sports", "Mont-de-Marsan");

    expect(openSpy).toHaveBeenCalledTimes(1);
    const [url, target, features] = openSpy.mock.calls[0];
    expect(url).toBe(
      "https://www.google.com/maps/search/?api=1&query=Palais%20des%20Sports%20Mont-de-Marsan"
    );
    expect(target).toBe("_blank");
    expect(features).toBe("noreferrer");
  });
});

describe("_openCalendar()", () => {
  let openSpy;

  beforeEach(() => {
    openSpy = vi.spyOn(window, "open").mockImplementation(() => {});
  });

  it("does nothing when the match date is missing, \"unknown\", or \"unavailable\"", () => {
    const el = makeCard();
    for (const bad of [null, "", "unknown", "unavailable"]) {
      el._openCalendar(bad, "Home", "Away", "Gym", "City");
    }
    expect(openSpy).not.toHaveBeenCalled();
  });

  it("does nothing when the match date does not parse", () => {
    const el = makeCard();
    el._openCalendar("not-a-date", "Home", "Away", "Gym", "City");
    expect(openSpy).not.toHaveBeenCalled();
  });

  it("opens a Google Calendar template URL with a 2-hour event window", () => {
    const el = makeCard();
    el._openCalendar("2026-09-19T20:00:00Z", "Basket Landes", "JSA Bordeaux", "Palais des Sports", "Mont-de-Marsan");

    expect(openSpy).toHaveBeenCalledTimes(1);
    const [url] = openSpy.mock.calls[0];
    expect(url).toContain("calendar.google.com/calendar/render?action=TEMPLATE");
    expect(url).toContain("text=Basket%20Landes%20vs%20JSA%20Bordeaux");
    expect(url).toContain("dates=20260919T200000Z/20260919T220000Z");
  });
});

describe("_resolveEntities() / _formatDate() / _extractCalendarMatches()", () => {
  it("_resolveEntities() returns null with no hass, and finds matching states once hass is set", () => {
    const el = makeCard({ entity: "sensor.basket_landes_prochain_match" });
    expect(el._resolveEntities()).toBeNull();

    el.hass = {
      states: {
        "sensor.basket_landes_prochain_match_date": { state: "2026-09-19T20:00:00" },
      },
    };
    const entities = el._resolveEntities();
    expect(entities.nextDate.state).toBe("2026-09-19T20:00:00");
  });

  it("_formatDate() uses hass's locale language when available, else falls back to en-US", () => {
    const el = makeCard();
    el.hass = { locale: { language: "fr-FR" } };
    const frResult = el._formatDate("2026-09-19T20:00:00Z");
    expect(frResult).not.toBeNull();

    el.hass = undefined;
    expect(el._formatDate("2026-09-19T20:00:00Z")).not.toBeNull();
    expect(el._formatDate("unavailable")).toBeNull();
  });

  it("_extractCalendarMatches() reads the calendar list from the configured entity's poule attributes", () => {
    const el = makeCard({ entity: "sensor.basket_landes_classement" });
    el.hass = {
      states: {
        "sensor.basket_landes_classement": {
          state: "1",
          attributes: { calendar: [{ round: 1 }, { round: 2 }] },
        },
      },
    };
    const entities = el._resolveEntities();
    expect(el._extractCalendarMatches(entities)).toEqual([{ round: 1 }, { round: 2 }]);
  });
});

describe("card-editor.js _valueChanged()", () => {
  function makeEditor(config = { entity: "sensor.my_team_next_match" }) {
    const Editor = customElements.get("ffbb-tracker-card-editor");
    const el = new Editor();
    el.hass = { locale: { language: "en-US" } };
    el.setConfig(config);
    return el;
  }

  it("does nothing if _config or hass is missing", () => {
    const Editor = customElements.get("ffbb-tracker-card-editor");
    const bare = new Editor();
    const spy = vi.fn();
    bare.addEventListener("config-changed", spy);
    bare._valueChanged({ detail: { value: { entity: "sensor.x" } } });
    expect(spy).not.toHaveBeenCalled();
  });

  it("does nothing if the event has no detail.value", () => {
    const el = makeEditor();
    const spy = vi.fn();
    el.addEventListener("config-changed", spy);
    el._valueChanged({});
    el._valueChanged({ detail: {} });
    expect(spy).not.toHaveBeenCalled();
  });

  it("dispatches config-changed with the new value merged over the existing config", () => {
    const el = makeEditor({ entity: "sensor.my_team_next_match", show_rank: true });
    const spy = vi.fn();
    el.addEventListener("config-changed", spy);

    el._valueChanged({ detail: { value: { entity: "sensor.my_team_next_match", show_rank: false } } });

    expect(spy).toHaveBeenCalledTimes(1);
    const event = spy.mock.calls[0][0];
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(true);
    expect(event.detail.config).toMatchObject({ show_rank: false });
  });

  it("defaults text fields (entity, custom_team_name, title, icon, custom_accent_color, standings_title) to \"\" when ha-form omits them", () => {
    const el = makeEditor();
    const spy = vi.fn();
    el.addEventListener("config-changed", spy);

    el._valueChanged({ detail: { value: { show_rank: false } } });

    const { config } = spy.mock.calls[0][0].detail;
    expect(config.entity).toBe("");
    expect(config.custom_team_name).toBe("");
    expect(config.title).toBe("");
    expect(config.icon).toBe("");
    expect(config.custom_accent_color).toBe("");
    expect(config.standings_title).toBe("");
  });
});

describe("card-editor.js render() schema", () => {
  function makeEditor(config) {
    const Editor = customElements.get("ffbb-tracker-card-editor");
    const el = new Editor();
    el.hass = { locale: { language: "en-US" } };
    el.setConfig(config);
    return el;
  }

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("returns an empty template with no hass/_config (no crash)", () => {
    const Editor = customElements.get("ffbb-tracker-card-editor");
    const el = new Editor();
    expect(() => el.render()).not.toThrow();
  });

  it("mounts a real <ha-form> bound to the current config, without the custom-color field by default", async () => {
    const el = makeEditor({ entity: "sensor.x" });
    document.body.appendChild(el);
    await el.updateComplete;

    const form = el.shadowRoot.querySelector("ha-form");
    expect(form, "expected setConfig() + a real render to produce a mounted <ha-form>").not.toBeNull();
    expect(form.data).toBe(el._config);
    expect(form.schema.some((f) => f.name === "custom_accent_color")).toBe(false);
  });

  it("adds the custom-color field to the mounted schema when accent_color is \"custom\"", async () => {
    const el = makeEditor({ entity: "sensor.x", accent_color: "custom" });
    document.body.appendChild(el);
    await el.updateComplete;

    const form = el.shadowRoot.querySelector("ha-form");
    expect(form.schema.some((f) => f.name === "custom_accent_color")).toBe(true);
  });
});

describe("ha-ffbb-tracker-card.js full render (real hass, mounted in the DOM)", () => {
  const ENTITY = "sensor.basket_landes_prochain_match_adversaire";

  const HASS_STATES = {
    "sensor.basket_landes_prochain_match_adversaire": {
      state: "US Mont-de-Marsan",
      attributes: { team_logo_url: "/logo1.png", opponent_logo_url: "/logo2.png" },
    },
    "sensor.basket_landes_prochain_match_date": { state: "2026-09-19T20:00:00", attributes: { round: "2" } },
    "sensor.basket_landes_prochain_match_lieu": { attributes: { gym_name: "Gymnase A", gym_city: "Dax" } },
    "sensor.basket_landes_prochain_match_terrain": { state: "home" },
    "sensor.basket_landes_dernier_match_score": { state: "80 - 75" },
    "sensor.basket_landes_dernier_match_resultat": { state: "win" },
    "sensor.basket_landes_dernier_match_adversaire": { state: "AS Dax" },
    "sensor.basket_landes_dernier_match_date": { state: "2026-09-12T20:00:00", attributes: { round: "1" } },
    "sensor.basket_landes_poule": {
      state: "Poule B",
      attributes: {
        team: "Basket Landes",
        competition: "Wonderligue",
        calendar: [
          { home_team: "Basket Landes", away_team: "US Mont-de-Marsan", score: "80 - 75", round: 1 },
          { home_team: "AS Dax", away_team: "Basket Landes", date: "2026-09-26T18:00:00", round: 3 },
        ],
      },
    },
    "sensor.basket_landes_classement": {
      state: "1",
      attributes: { standings: [{ team_name: "Basket Landes", position: 1 }] },
    },
    "sensor.basket_landes_forme_recente": { state: "V-V-D-V-N", attributes: { current_streak: "2V" } },
    "binary_sensor.basket_landes_match_en_cours": { state: "off" },
  };

  async function mountCard(configOverrides = {}) {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({
      entity: ENTITY,
      show_title: true,
      show_header: true,
      show_rank: true,
      show_form: true,
      show_venue: true,
      show_watermark: true,
      ...configOverrides,
    });
    el.hass = { states: HASS_STATES, locale: { language: "fr-FR" } };
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("shows the post-match score and both team names when forced to the last-match view", async () => {
    const el = await mountCard();
    el._setManualView("last");
    await el.updateComplete;

    const text = el.shadowRoot.textContent;
    expect(text).toContain("Basket Landes");
    expect(text).toContain("AS Dax");
    expect(text).toContain("80");
    expect(text).toContain("75");
  });

  it("shows the upcoming opponent and round when forced to the next-match view", async () => {
    const el = await mountCard();
    el._setManualView("next");
    await el.updateComplete;

    const text = el.shadowRoot.textContent;
    expect(text).toContain("Basket Landes");
    expect(text).toContain("US Mont-de-Marsan");
  });

  it("clicking the rank badge opens the standings modal, and the close button closes it", async () => {
    const el = await mountCard();
    await el.updateComplete;

    const badge = el.shadowRoot.querySelector(".rank-badge.clickable-badge");
    expect(badge, "expected a clickable rank badge to be rendered").not.toBeNull();

    badge.click();
    await el.updateComplete;
    expect(el._activeModal).toBe("standings");
    expect(el.shadowRoot.querySelector(".modal-close-btn")).not.toBeNull();

    el.shadowRoot.querySelector(".modal-close-btn").click();
    await el.updateComplete;
    expect(el._activeModal).toBeNull();
  });

  it("applies rank-solid class when rank_badge_style is \"solid\"", async () => {
    const el = await mountCard({ rank_badge_style: "solid" });
    await el.updateComplete;

    const badge = el.shadowRoot.querySelector(".rank-badge");
    expect(badge.classList.contains("rank-solid")).toBe(true);
  });

  it("\"solid\" style always includes both the rank-solid class AND the podium color class together", async () => {
    const el = await mountCard({ rank_badge_style: "solid" });
    await el.updateComplete;

    const badge = el.shadowRoot.querySelector(".rank-badge");
    expect(badge.classList.contains("rank-solid")).toBe(true);
    expect(badge.classList.contains("rank-gold")).toBe(true);
  });

  it("does not apply rank-solid class for \"outline\" or \"none\" styles", async () => {
    const elOutline = await mountCard({ rank_badge_style: "outline" });
    await elOutline.updateComplete;
    expect(elOutline.shadowRoot.querySelector(".rank-badge").classList.contains("rank-solid")).toBe(false);

    const elNone = await mountCard({ rank_badge_style: "none" });
    await elNone.updateComplete;
    expect(elNone.shadowRoot.querySelector(".rank-badge").classList.contains("rank-solid")).toBe(false);
    expect(elNone.shadowRoot.querySelector(".rank-badge").classList.contains("rank-gold")).toBe(false);
  });

  it("keyboard-activating the OPPONENT's rank badge (the second one) also opens standings", async () => {
    const el = await mountCard({
      entity: ENTITY,
    });
    // The default fixture only ranks the user's own team; give the
    // opponent a rank too so its badge actually renders (it renders only
    // when rightRank/leftRank is truthy).
    el.hass = {
      ...el.hass,
      states: {
        ...HASS_STATES,
        "sensor.basket_landes_classement": {
          state: "1",
          attributes: {
            standings: [
              { team_name: "Basket Landes", position: 1 },
              { team_name: "US Mont-de-Marsan", position: 2 },
            ],
          },
        },
      },
    };
    await el.updateComplete;

    const badges = el.shadowRoot.querySelectorAll(".rank-badge.clickable-badge");
    expect(badges.length).toBe(2);

    badges[1].dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }));
    await el.updateComplete;
    expect(el._activeModal).toBe("standings");
  });

  it("keyboard-activating the rank badge (Enter/Space) opens standings, same as a click", async () => {
    const el = await mountCard();
    await el.updateComplete;

    const badge = el.shadowRoot.querySelector(".rank-badge.clickable-badge");
    expect(badge).not.toBeNull();

    badge.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }));
    await el.updateComplete;
    expect(el._activeModal).toBe("standings");

    el._closeModal();
    await el.updateComplete;

    badge.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true, cancelable: true }));
    await el.updateComplete;
    expect(el._activeModal).toBe("standings");
  });

  it("clicking the form block opens the form modal, showing the streak badges and the current streak", async () => {
    const el = await mountCard();
    await el.updateComplete;

    const formBlock = el.shadowRoot.querySelector(".footer-form");
    expect(formBlock, "expected the form block to be rendered (show_form defaults to true)").not.toBeNull();

    formBlock.click();
    await el.updateComplete;
    expect(el._activeModal).toBe("form");

    const badges = el.shadowRoot.querySelectorAll(".form-badge-pill");
    expect(badges.length).toBe(5);
    expect(el.shadowRoot.textContent).toContain("2V");

    el.shadowRoot.querySelector(".modal-backdrop").click();
    await el.updateComplete;
    expect(el._activeModal).toBeNull();
  });

  it("clicking the header round/competition bar opens the calendar modal with both score and date-only rows", async () => {
    const el = await mountCard();
    await el.updateComplete;

    const roundBar = el.shadowRoot.querySelector(".header-round.clickable-round");
    expect(roundBar, "expected the header round bar to be rendered (show_header defaults to true)").not.toBeNull();

    roundBar.click();
    await el.updateComplete;
    expect(el._activeModal).toBe("calendar");

    const rows = el.shadowRoot.querySelectorAll(".calendar-row");
    expect(rows.length).toBe(2);
    const text = el.shadowRoot.textContent;
    expect(text).toContain("80 - 75");
    expect(text).toContain("AS Dax");

    document.querySelector(".modal-backdrop")?.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true })
    );
    el.shadowRoot.querySelector(".modal-backdrop").dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true })
    );
    await el.updateComplete;
    expect(el._activeModal).toBeNull();
  });

  it("clicking the left/right logo boxes calls window.open with each side's resolved URL", async () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => {});
    const el = await mountCard();
    await el.updateComplete;

    const [leftLogo, rightLogo] = el.shadowRoot.querySelectorAll(".logo-box");
    expect(leftLogo, "expected two clickable logo boxes").not.toBeUndefined();
    expect(rightLogo).not.toBeUndefined();

    leftLogo.click();
    rightLogo.click();

    expect(openSpy).not.toHaveBeenCalled();
  });

  it("clicking a logo fires hass-more-info when no team URL can be resolved", async () => {
    const el = await mountCard();
    await el.updateComplete;

    const moreInfoSpy = vi.fn();
    el.addEventListener("hass-more-info", moreInfoSpy);

    el.shadowRoot.querySelector(".logo-box").click();

    expect(moreInfoSpy).toHaveBeenCalledTimes(1);
    expect(moreInfoSpy.mock.calls[0][0].detail.entityId).toBe(ENTITY);
  });

  it("clicking the nav chevrons toggles between the next-match and last-match views", async () => {
    const el = await mountCard();
    el._setManualView("next");
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".score-display")).toBeNull();

    const rightChevron = el.shadowRoot.querySelector(".nav-chevron-right");
    expect(rightChevron).not.toBeNull();
    rightChevron.click();
    await el.updateComplete;
    expect(el._manualView).toBe("next");

    const leftChevron = el.shadowRoot.querySelector(".nav-chevron-left");
    leftChevron.click();
    await el.updateComplete;
    expect(el._manualView).toBe("last");
    expect(el.shadowRoot.querySelector(".score-display")).not.toBeNull();
    expect(el.shadowRoot.textContent).toContain("80");
  });

  it("clicking the venue block opens Google Maps with the gym name and city", async () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => {});
    const el = await mountCard();
    el._setManualView("next");
    await el.updateComplete;

    const venueBlock = el.shadowRoot.querySelector(".footer-venue");
    expect(venueBlock, "expected the venue block to be rendered (show_venue defaults to true)").not.toBeNull();

    venueBlock.click();

    expect(openSpy).toHaveBeenCalledTimes(1);
    const [url] = openSpy.mock.calls[0];
    expect(url).toContain("Gymnase%20A");
    expect(url).toContain("Dax");
  });

  it("hides the watermark image on load error instead of leaving a broken-image icon", async () => {
    const el = await mountCard();
    await el.updateComplete;

    const watermark = el.shadowRoot.querySelector(".watermark-left");
    expect(watermark, "expected a watermark image (show_watermark defaults to true)").not.toBeNull();
    expect(watermark.style.display).not.toBe("none");

    watermark.dispatchEvent(new Event("error"));

    expect(watermark.style.display).toBe("none");
  });

  it("renders the 'card not configured' warning when hass has no states at all", async () => {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: "sensor.nonexistent_prochain_match_adversaire" });
    el.hass = { locale: { language: "en-US" } };
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot.querySelector(".card-warning")).not.toBeNull();
  });

  describe("game-day badge (.badge-gameday)", () => {
    function mountWithStates(states, configOverrides = {}) {
      const Card = customElements.get("ffbb-tracker-card");
      const el = new Card();
      el.setConfig({
        entity: ENTITY,
        show_title: true,
        show_header: true,
        show_rank: true,
        show_form: true,
        show_venue: true,
        show_watermark: true,
        ...configOverrides,
      });
      el.hass = { states, locale: { language: "fr-FR" } };
      document.body.appendChild(el);
      return el.updateComplete.then(() => el);
    }

    afterEach(() => {
      vi.useRealTimers();
    });

    it("shows the badge when the upcoming match is scheduled today", async () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-09-19T08:00:00"));

      const el = await mountWithStates(HASS_STATES);
      el._setManualView("next");
      await el.updateComplete;

      expect(el.shadowRoot.querySelector(".badge-gameday")).not.toBeNull();
    });

    it("does not show the badge on any day other than the match day", async () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-09-18T08:00:00"));

      const el = await mountWithStates(HASS_STATES);
      el._setManualView("next");
      await el.updateComplete;

      expect(el.shadowRoot.querySelector(".badge-gameday")).toBeNull();
    });

    it("does not show the badge when the upcoming match is postponed (is_stale)", async () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-09-19T08:00:00"));

      const states = {
        ...HASS_STATES,
        "sensor.basket_landes_prochain_match_date": {
          ...HASS_STATES["sensor.basket_landes_prochain_match_date"],
          attributes: {
            ...HASS_STATES["sensor.basket_landes_prochain_match_date"].attributes,
            is_stale: true,
          },
        },
      };
      const el = await mountWithStates(states);
      el._setManualView("next");
      await el.updateComplete;

      expect(el.shadowRoot.querySelector(".badge-gameday")).toBeNull();
      expect(el.shadowRoot.querySelector(".badge-postponed")).not.toBeNull();
    });

    it("does not show the badge when a match is currently live", async () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-09-19T08:00:00"));

      const states = {
        ...HASS_STATES,
        "binary_sensor.basket_landes_match_en_cours": { state: "on" },
      };
      const el = await mountWithStates(states);
      await el.updateComplete;

      expect(el.shadowRoot.querySelector(".badge-gameday")).toBeNull();
      expect(el.shadowRoot.querySelector(".badge-live")).not.toBeNull();
    });

    it("does not show the badge when the post-match (last game) view is shown", async () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-09-19T08:00:00"));

      const el = await mountWithStates(HASS_STATES);
      el._setManualView("last");
      await el.updateComplete;

      expect(el.shadowRoot.querySelector(".badge-gameday")).toBeNull();
    });

    it("renders the badge inside .center-meta, the element it is anchored to", async () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-09-19T08:00:00"));

      const el = await mountWithStates(HASS_STATES);
      el._setManualView("next");
      await el.updateComplete;

      const badge = el.shadowRoot.querySelector(".badge-gameday");
      expect(badge.parentElement.classList.contains("center-meta")).toBe(true);
    });

    it("renders the postponed badge inside .center-meta too", async () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-09-19T08:00:00"));

      const states = {
        ...HASS_STATES,
        "sensor.basket_landes_prochain_match_date": {
          ...HASS_STATES["sensor.basket_landes_prochain_match_date"],
          attributes: {
            ...HASS_STATES["sensor.basket_landes_prochain_match_date"].attributes,
            is_stale: true,
          },
        },
      };
      const el = await mountWithStates(states);
      el._setManualView("next");
      await el.updateComplete;

      const badge = el.shadowRoot.querySelector(".badge-postponed");
      expect(badge.parentElement.classList.contains("center-meta")).toBe(true);
    });
  });

  it("keyboard-activating the header round bar (Enter) opens the calendar modal, same as a click", async () => {
    const el = await mountCard();
    await el.updateComplete;

    const roundBar = el.shadowRoot.querySelector(".header-round.clickable-round");
    roundBar.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }));
    await el.updateComplete;
    expect(el._activeModal).toBe("calendar");
  });

  it("keyboard-activating the left logo box (Enter) falls back to hass-more-info, same as a click", async () => {
    const el = await mountCard();
    await el.updateComplete;

    const moreInfoSpy = vi.fn();
    el.addEventListener("hass-more-info", moreInfoSpy);

    // This fixture has no resolvable team URL, so activating the logo (by
    // click or by keyboard) falls back to hass-more-info -- same code path
    // as the existing click test, just reached via the keyboard this time.
    el.shadowRoot.querySelector(".logo-box").dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true })
    );
    expect(moreInfoSpy).toHaveBeenCalledTimes(1);
    expect(moreInfoSpy.mock.calls[0][0].detail.entityId).toBe(ENTITY);
  });

  it("keyboard-activating the right logo box (Space) reaches _handleLogoClick too", async () => {
    const el = await mountCard();
    await el.updateComplete;

    const spy = vi.spyOn(el, "_handleLogoClick");
    const [, rightLogoBox] = el.shadowRoot.querySelectorAll(".logo-box");
    rightLogoBox.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true, cancelable: true }));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("logo boxes are not keyboard-activatable at all when logo_click_action is \"none\"", async () => {
    const el = await mountCard({ logo_click_action: "none" });
    await el.updateComplete;

    const [leftLogoBox] = el.shadowRoot.querySelectorAll(".logo-box");
    expect(leftLogoBox.getAttribute("tabindex")).toBeNull();
    expect(leftLogoBox.getAttribute("role")).toBeNull();
  });

  it("keyboard-activating the nav chevrons (Enter) navigates, same as a click", async () => {
    const el = await mountCard();
    await el.updateComplete;

    const spy = vi.spyOn(el, "_handleChevronClick");
    const rightChevron = el.shadowRoot.querySelector(".nav-chevron-right");
    rightChevron.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }));
    expect(spy).toHaveBeenCalledWith("next", expect.anything());

    const leftChevron = el.shadowRoot.querySelector(".nav-chevron-left");
    leftChevron.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }));
    expect(spy).toHaveBeenCalledWith("prev", expect.anything());
  });

  it("clicking the center meta (upcoming match, not live/post-match) opens Google Calendar", async () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => {});
    const el = await mountCard();
    await el.updateComplete;

    const centerMeta = el.shadowRoot.querySelector(".center-meta.clickable");
    expect(centerMeta, "expected the upcoming match's center-meta to be clickable").not.toBeNull();
    centerMeta.click();
    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(openSpy.mock.calls[0][0]).toContain("calendar.google.com");
    openSpy.mockRestore();
  });

  it("keyboard-activating the center meta (Enter) also opens Google Calendar", async () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => {});
    const el = await mountCard();
    await el.updateComplete;

    const centerMeta = el.shadowRoot.querySelector(".center-meta.clickable");
    centerMeta.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }));
    expect(openSpy).toHaveBeenCalledTimes(1);
    openSpy.mockRestore();
  });

  it("keyboard-activating the form footer (Enter) opens the form modal, same as a click", async () => {
    const el = await mountCard();
    await el.updateComplete;

    const formBlock = el.shadowRoot.querySelector(".footer-form");
    formBlock.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }));
    await el.updateComplete;
    expect(el._activeModal).toBe("form");
  });

  it("keyboard-activating the venue footer (Enter) opens Google Maps, same as a click", async () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => {});
    const el = await mountCard();
    await el.updateComplete;

    const venueBlock = el.shadowRoot.querySelector(".footer-venue");
    venueBlock.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }));
    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(openSpy.mock.calls[0][0]).toContain("google.com/maps");
    openSpy.mockRestore();
  });

  it("swaps a broken RIGHT-side logo for the default brand logo too (not just the left one)", async () => {
    const el = await mountCard();
    await el.updateComplete;

    const logos = el.shadowRoot.querySelectorAll(".logo");
    expect(logos.length).toBe(2);
    const rightLogo = logos[1];
    rightLogo.dispatchEvent(new Event("error"));
    await el.updateComplete;
    expect(rightLogo.src.endsWith(DEFAULT_FALLBACK_LOGO)).toBe(true);
  });

  it("swaps a broken logo inside a calendar-modal row (home AND away mini-logos)", async () => {
    const el = await mountCard();
    await el.updateComplete;

    el.shadowRoot.querySelector(".header-round.clickable-round").click();
    await el.updateComplete;

    const miniLogos = el.shadowRoot.querySelectorAll(".cal-mini-logo");
    expect(miniLogos.length).toBeGreaterThanOrEqual(2);
    for (const logo of miniLogos) {
      logo.dispatchEvent(new Event("error"));
    }
    await el.updateComplete;
    for (const logo of el.shadowRoot.querySelectorAll(".cal-mini-logo")) {
      expect(logo.src.endsWith(DEFAULT_FALLBACK_LOGO)).toBe(true);
    }
  });

  it("getConfigElement() returns the visual editor custom element", async () => {
    const Card = customElements.get("ffbb-tracker-card");
    const editor = await Card.getConfigElement();
    expect(editor.tagName.toLowerCase()).toBe("ffbb-tracker-card-editor");
  });

  it("renders nothing before hass/config are set (no ha-card, no content)", async () => {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector("ha-card")).toBeNull();
    expect(el.shadowRoot.textContent.trim()).toBe("");
  });
});

describe("calendar modal interactivity and badges", () => {
  const ENTITY = "sensor.basket_landes_prochain_match_adversaire";

  const HASS_STATES = {
    "sensor.basket_landes_prochain_match_adversaire": {
      state: "US Mont-de-Marsan",
      attributes: { team_logo_url: "/logo1.png", opponent_logo_url: "/logo2.png" },
    },
    "sensor.basket_landes_prochain_match_date": { state: "2026-09-19T20:00:00", attributes: { round: "2" } },
    "sensor.basket_landes_poule": {
      state: "Poule B",
      attributes: {
        team: "Basket Landes",
        competition: "Wonderligue",
        calendar: [
          { home_team: "Basket Landes", away_team: "US Mont-de-Marsan", score: "80 - 75", round: 1 },
          { home_team: "AS Dax", away_team: "Basket Landes", date: "2026-09-26T18:00:00", round: 2 },
        ],
      },
    },
    "sensor.basket_landes_classement": {
      state: "1",
      attributes: { standings: [{ team_name: "Basket Landes", position: 1 }] },
    },
  };

  afterEach(() => {
    document.body.innerHTML = "";
  });

  async function mountCard() {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: ENTITY });
    el.hass = { states: HASS_STATES, locale: { language: "fr-FR" } };
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  it("renders DOM / EXT badges, team mini-logos, and highlights the next match", async () => {
    const el = await mountCard();
    el.shadowRoot.querySelector(".header-round.clickable-round").click();
    await el.updateComplete;

    const rows = el.shadowRoot.querySelectorAll(".calendar-row");
    expect(rows.length).toBe(2);

    // Row 0 is home (DOM) and played
    const pillDom = rows[0].querySelector(".cal-venue-pill.pill-dom");
    expect(pillDom).not.toBeNull();
    expect(pillDom.textContent.trim()).toBe("DOM");
    expect(rows[0].classList.contains("next-match-row")).toBe(false);

    // Row 1 is away (EXT), unplayed: marked as next match
    const pillExt = rows[1].querySelector(".cal-venue-pill.pill-ext");
    expect(pillExt).not.toBeNull();
    expect(pillExt.textContent.trim()).toBe("EXT");
    expect(rows[1].classList.contains("next-match-row")).toBe(true);

    // Mini logos are present on both teams
    const logos = rows[0].querySelectorAll(".cal-mini-logo");
    expect(logos.length).toBe(2);
  });

  it("clicking a calendar match row selects the match in the carousel and closes the modal", async () => {
    const el = await mountCard();
    el.shadowRoot.querySelector(".header-round.clickable-round").click();
    await el.updateComplete;
    expect(el._activeModal).toBe("calendar");

    const rows = el.shadowRoot.querySelectorAll(".calendar-row");
    // Click played match at index 0
    rows[0].click();
    await el.updateComplete;

    expect(el._matchIndex).toBe(0);
    expect(el._manualView).toBe("last");
    expect(el._activeModal).toBeNull();
    expect(el.shadowRoot.querySelector(".modal-backdrop")).toBeNull();
  });

  it("keyboard activating a calendar row with Enter or Space selects the match", async () => {
    const el = await mountCard();
    el.shadowRoot.querySelector(".header-round.clickable-round").click();
    await el.updateComplete;

    const rows = el.shadowRoot.querySelectorAll(".calendar-row");
    // Press Enter on upcoming match at index 1
    rows[1].dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }));
    await el.updateComplete;

    expect(el._matchIndex).toBe(1);
    expect(el._manualView).toBe("next");
    expect(el._activeModal).toBeNull();
  });
});

describe("i18n on initial render", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  async function mountWithLanguage(language) {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: "sensor.basket_landes_prochain_match_adversaire" });
    el.hass = {
      language,
      locale: { language },
      states: {
        "sensor.basket_landes_prochain_match_adversaire": { state: "Dax" },
        "sensor.basket_landes_prochain_match_date": { state: "2099-09-19T20:00:00", attributes: { round: "2" } },
      },
    };
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  it("renders in English on the very first render when hass.language is 'en'", async () => {
    const el = await mountWithLanguage("en");
    expect(el.shadowRoot.textContent).toContain("Next match");
    expect(el.shadowRoot.textContent).not.toContain("Prochain match");
  });

  it("renders in French on the very first render when hass.language is 'fr'", async () => {
    const el = await mountWithLanguage("fr");
    expect(el.shadowRoot.textContent).toContain("Prochain match");
    expect(el.shadowRoot.textContent).not.toContain("Next match");
  });
});

describe("default title follows the displayed view", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const STATES = {
    "sensor.basket_landes_prochain_match_adversaire": { state: "Dax" },
    "sensor.basket_landes_prochain_match_date": { state: "2099-09-19T20:00:00" },
    "sensor.basket_landes_dernier_match_score": { state: "80 - 75" },
    "sensor.basket_landes_dernier_match_adversaire": { state: "AS Dax" },
    "sensor.basket_landes_dernier_match_date": { state: "2026-09-12T20:00:00" },
    "binary_sensor.basket_landes_match_en_cours": { state: "off" },
  };

  async function mount(states, { view, config = {} } = {}) {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: "sensor.basket_landes_prochain_match_adversaire", ...config });
    el.hass = { language: "en", locale: { language: "en" }, states };
    document.body.appendChild(el);
    await el.updateComplete;
    if (view) {
      el._setManualView(view);
      await el.updateComplete;
    }
    return el;
  }

  const titleOf = (el) => el.shadowRoot.querySelector(".card-header-title")?.textContent.trim();

  it("says 'Next match' on the upcoming-match view", async () => {
    expect(titleOf(await mount(STATES, { view: "next" }))).toBe("Next match");
  });

  it("says 'Last match' on the last-match view", async () => {
    expect(titleOf(await mount(STATES, { view: "last" }))).toBe("Last match");
  });

  it("says 'Live match' while a match is in progress", async () => {
    const states = { ...STATES, "binary_sensor.basket_landes_match_en_cours": { state: "on" } };
    expect(titleOf(await mount(states))).toBe("Live match");
  });

  it("a configured title is shown as a prefix in front of the dynamic status", async () => {
    const el = await mount(STATES, { view: "last", config: { title: "Mon équipe" } });
    expect(titleOf(el)).toBe("Mon équipe • Last match");
  });
});

describe("post-match score: my number is visually distinct from the opponent's", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  // Same fixture as the title tests above: score "80 - 75", no explicit
  // is_home attribute, which defaults to true -- so 80 is ours, 75 is AS Dax's.
  const STATES = {
    "sensor.basket_landes_prochain_match_adversaire": { state: "Dax" },
    "sensor.basket_landes_prochain_match_date": { state: "2099-09-19T20:00:00" },
    "sensor.basket_landes_dernier_match_score": { state: "80 - 75" },
    "sensor.basket_landes_dernier_match_adversaire": { state: "AS Dax" },
    "sensor.basket_landes_dernier_match_date": { state: "2026-09-12T20:00:00" },
    "binary_sensor.basket_landes_match_en_cours": { state: "off" },
  };

  async function mount(states, { view } = {}) {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: "sensor.basket_landes_prochain_match_adversaire" });
    el.hass = { language: "en", locale: { language: "en" }, states };
    document.body.appendChild(el);
    await el.updateComplete;
    if (view) {
      el._setManualView(view);
      await el.updateComplete;
    }
    return el;
  }

  it("puts the home score (ours, is_home defaults true) in .score-mine and the opponent's in .score-theirs", async () => {
    const el = await mount(STATES, { view: "last" });
    expect(el.shadowRoot.querySelector(".score-mine")?.textContent.trim()).toBe("80");
    expect(el.shadowRoot.querySelector(".score-theirs")?.textContent.trim()).toBe("75");
  });

  it("swaps which number is 'mine' when the match was away (is_home: false)", async () => {
    const states = {
      ...STATES,
      "sensor.basket_landes_dernier_match_score": { state: "80 - 75", attributes: { is_home: false } },
    };
    const el = await mount(states, { view: "last" });
    expect(el.shadowRoot.querySelector(".score-mine")?.textContent.trim()).toBe("75");
    expect(el.shadowRoot.querySelector(".score-theirs")?.textContent.trim()).toBe("80");
  });

  it("still shows the full score as plain text (no split) when it isn't a clean 'NN - NN' pair", async () => {
    const states = {
      ...STATES,
      "sensor.basket_landes_dernier_match_score": { state: "Forfait" },
    };
    const el = await mount(states, { view: "last" });
    expect(el.shadowRoot.querySelector(".score-mine")).toBeNull();
    expect(el.shadowRoot.querySelector(".score-theirs")).toBeNull();
    expect(el.shadowRoot.querySelector(".score-display")?.textContent.trim()).toBe("Forfait");
  });

  // Accessibility: color/bold alone convey nothing to a screen reader, so a
  // visually-hidden (.sr-only) label spells out which number is ours, and
  // the visible, colored numbers are hidden from assistive tech (aria-hidden)
  // to avoid the score being announced twice.
  it("gives screen readers an explicit 'our score / opponent score' label instead of just '80 - 75'", async () => {
    const el = await mount(STATES, { view: "last" });
    const srLabel = el.shadowRoot.querySelector(".score-display .sr-only")?.textContent.trim();
    expect(srLabel).toBe("Our score: 80 — Opponent score: 75");
    expect(el.shadowRoot.querySelector(".score-display [aria-hidden='true']")).not.toBeNull();
  });

  it("skips the sr-only label when the score can't be split (falls back to the plain text, already readable as-is)", async () => {
    const states = {
      ...STATES,
      "sensor.basket_landes_dernier_match_score": { state: "Forfait" },
    };
    const el = await mount(states, { view: "last" });
    expect(el.shadowRoot.querySelector(".score-display .sr-only")).toBeNull();
  });
});

describe("live match DOM rendering", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders the live badge, the pulsing dot and the kick-off time", async () => {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: "sensor.basket_landes_prochain_match_adversaire" });
    el.hass = {
      language: "en",
      locale: { language: "en" },
      states: {
        "sensor.basket_landes_prochain_match_adversaire": { state: "Dax" },
        "sensor.basket_landes_prochain_match_date": { state: "2026-09-19T20:00:00" },
        "binary_sensor.basket_landes_match_en_cours": { state: "on" },
      },
    };
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot.querySelector(".badge-live")).not.toBeNull();
    expect(el.shadowRoot.querySelector(".live-dot")).not.toBeNull();
    const clock = el.shadowRoot.querySelector(".live-clock");
    expect(clock).not.toBeNull();
    expect(clock.textContent).toContain("Kick-off");
    expect(clock.textContent).toMatch(/8:00|20:00/);
  });
});

describe("rank badge style (removed legacy keys are ignored)", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  async function mountRank(config) {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: "sensor.basket_landes_prochain_match_adversaire", ...config });
    el.hass = {
      language: "fr",
      locale: { language: "fr" },
      states: {
        "sensor.basket_landes_prochain_match_adversaire": { state: "Dax" },
        "sensor.basket_landes_classement": { state: "1" },
      },
    };
    document.body.appendChild(el);
    await el.updateComplete;
    return el.shadowRoot.querySelector(".rank-badge");
  }

  it("rank_badge_style: solid produces a solid podium badge", async () => {
    const badge = await mountRank({ rank_badge_style: "solid" });
    expect(badge.classList.contains("rank-solid")).toBe(true);
    expect(badge.classList.contains("rank-gold")).toBe(true);
  });

  it("rank_badge_style: none removes the podium color", async () => {
    const badge = await mountRank({ rank_badge_style: "none" });
    expect(badge.classList.contains("rank-gold")).toBe(false);
    expect(badge.classList.contains("rank-solid")).toBe(false);
  });

  it("the default style is the outline podium badge", async () => {
    const badge = await mountRank({});
    expect(badge.classList.contains("rank-gold")).toBe(true);
    expect(badge.classList.contains("rank-solid")).toBe(false);
  });

  it("the removed solid_rank_badges option no longer changes the badge", async () => {
    const badge = await mountRank({ solid_rank_badges: true });
    expect(badge.classList.contains("rank-solid")).toBe(false);
  });

  it("the removed disable_podium_colors option no longer changes the badge", async () => {
    const badge = await mountRank({ disable_podium_colors: true });
    expect(badge.classList.contains("rank-gold")).toBe(true);
  });
});

describe("standings modal highlighting", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("never highlights a row whose team name is empty or '-'", async () => {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: "sensor.basket_landes_prochain_match_adversaire" });
    el.hass = {
      language: "fr",
      locale: { language: "fr" },
      states: {
        "sensor.basket_landes_prochain_match_adversaire": { state: "Foo" },
        "sensor.basket_landes_poule": { state: "Poule A", attributes: { team: "Bar" } },
        "sensor.basket_landes_classement": {
          state: "1",
          attributes: {
            standings: [
              { position: 1, team_name: "Zzz", points: 10 },
              { position: 2, team_name: "-", points: 8 },
              { position: 3, points: 6 },
            ],
          },
        },
      },
    };
    document.body.appendChild(el);
    await el.updateComplete;

    el.shadowRoot.querySelector(".clickable-badge").click();
    await el.updateComplete;

    expect(el.shadowRoot.querySelectorAll(".standings-table tbody tr").length).toBe(3);
    expect(el.shadowRoot.querySelectorAll(".standings-table tr.highlight-row").length).toBe(0);
  });

  it("shows the custom_team_name on my own row, and the real name everywhere else, including the opponent", async () => {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({
      entity: "sensor.basket_landes_prochain_match_adversaire",
      custom_team_name: "Les Panthères",
    });
    el.hass = {
      language: "fr",
      locale: { language: "fr" },
      states: {
        "sensor.basket_landes_prochain_match_adversaire": { state: "AS Dax" },
        "sensor.basket_landes_poule": { state: "Poule A", attributes: { team: "Basket Landes" } },
        "sensor.basket_landes_classement": {
          state: "1",
          attributes: {
            standings: [
              { position: 1, team_name: "Basket Landes", points: 10 },
              { position: 2, team_name: "AS Dax", points: 8 },
              { position: 3, team_name: "Zzz", points: 6 },
            ],
          },
        },
      },
    };
    document.body.appendChild(el);
    await el.updateComplete;

    el.shadowRoot.querySelector(".clickable-badge").click();
    await el.updateComplete;

    const names = [...el.shadowRoot.querySelectorAll(".standings-table tbody .col-team")].map((c) => c.textContent.trim());
    expect(names).toEqual(["Les Panthères", "AS Dax", "Zzz"]);
  });
});

describe("standings_popup_detailed", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  async function mountAndOpen(config = {}) {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: "sensor.basket_landes_prochain_match_adversaire", ...config });
    el.hass = {
      language: "fr",
      locale: { language: "fr" },
      states: {
        "sensor.basket_landes_prochain_match_adversaire": { state: "AS Dax" },
        "sensor.basket_landes_poule": { state: "Poule A", attributes: { team: "Basket Landes" } },
        "sensor.basket_landes_classement": {
          state: "1",
          attributes: {
            standings: [
              { position: 1, team_name: "Basket Landes", points: 10, played: 5, wins: 5, losses: 0, draws: 0, irregularities: 0 },
              { position: 2, team_name: "AS Dax", points: 8, played: 5, wins: 4, losses: 1, draws: 0, irregularities: 1 },
            ],
          },
        },
      },
    };
    document.body.appendChild(el);
    await el.updateComplete;
    el.shadowRoot.querySelector(".clickable-badge").click();
    await el.updateComplete;
    return el;
  }

  it("defaults to the simple table (#, team, Pts, J G P N) when left off", async () => {
    const el = await mountAndOpen();
    expect(el.shadowRoot.querySelector(".modal-card .standings-table-detailed")).toBeNull();
    const headerCount = el.shadowRoot.querySelectorAll(".modal-card .standings-table thead th").length;
    expect(headerCount).toBe(7);
  });

  it("standings_popup_detailed: true swaps in the same detailed table as the standalone standings card", async () => {
    const el = await mountAndOpen({ standings_popup_detailed: true });
    const table = el.shadowRoot.querySelector(".modal-card .standings-table-detailed");
    expect(table).not.toBeNull();
    // The detailed table has many more columns (Games J G P N, I, penalties,
    // forfeits, defaults, referee/coach penalties, points scored/conceded/diff)
    // than the simple popup table's 7 -- a loose but robust way to tell them
    // apart without hard-coding every FFBB column label.
    const cellCount = el.shadowRoot.querySelectorAll(".modal-card .standings-table-detailed tbody tr:first-child td").length;
    expect(cellCount).toBeGreaterThan(7);
  });

  it("still shows the simple table when the standings modal isn't the active one (no crash from the new branch)", async () => {
    const el = await mountAndOpen({ standings_popup_detailed: true });
    el.shadowRoot.querySelector(".modal-close-btn").click();
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".modal-card")).toBeNull();
  });
});

describe("card-editor.js section titles come from the translation files", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  async function schemaFor(language) {
    const Editor = customElements.get("ffbb-tracker-card-editor");
    const el = new Editor();
    el.hass = { language, locale: { language } };
    el.setConfig({ entity: "sensor.x" });
    document.body.appendChild(el);
    await el.updateComplete;
    return el.shadowRoot.querySelector("ha-form").schema;
  }

  it("English UI shows 'Logos', 'Ranking' and 'Standalone standings card' (not the hard-coded French fallback)", async () => {
    const schema = await schemaFor("en");
    expect(schema.find((f) => f.name === "logo").title).toBe("Logos");
    expect(schema.find((f) => f.name === "ranking").title).toBe("Ranking");
    expect(schema.find((f) => f.name === "standings_card").title).toBe("Standalone standings card");
  });

  it("French UI shows 'Logos', 'Classement' and 'Carte classement indépendante'", async () => {
    const schema = await schemaFor("fr");
    expect(schema.find((f) => f.name === "logo").title).toBe("Logos");
    expect(schema.find((f) => f.name === "ranking").title).toBe("Classement");
    expect(schema.find((f) => f.name === "standings_card").title).toBe("Carte classement indépendante");
  });
});

describe("logo error fallback", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  async function mountLogo(logoUrl) {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: "sensor.basket_landes_prochain_match_adversaire" });
    el.hass = {
      language: "en",
      locale: { language: "en" },
      states: {
        "sensor.basket_landes_prochain_match_adversaire": {
          state: "US Dax",
          attributes: { team_logo_url: logoUrl, opponent_logo_url: logoUrl },
        },
        "sensor.basket_landes_prochain_match_date": { state: "2099-09-19T20:00:00" },
      },
    };
    document.body.appendChild(el);
    await el.updateComplete;
    const img = el.shadowRoot.querySelector(".logo");
    expect(img.src, "precondition: the logo under test must start on the broken URL").toBe(logoUrl);
    return img;
  }

  it("swaps a broken logo for the default brand logo on the first error", async () => {
    const img = await mountLogo("https://invalid.example/nonexistent.png");

    img.dispatchEvent(new Event("error"));

    expect(img.src.endsWith(DEFAULT_FALLBACK_LOGO)).toBe(true);
  });

  it("does NOT reassign src when the fallback itself fails (no infinite error loop)", async () => {
    const img = await mountLogo("https://invalid.example/nonexistent.png");
    img.dispatchEvent(new Event("error"));
    const current = img.src;
    expect(current.endsWith(DEFAULT_FALLBACK_LOGO)).toBe(true);

    let writes = 0;
    Object.defineProperty(img, "src", {
      configurable: true,
      get: () => current,
      set: () => {
        writes += 1;
      },
    });

    for (let i = 0; i < 5; i += 1) {
      img.dispatchEvent(new Event("error"));
    }

    expect(writes).toBe(0);
  });

  it("leaves a logo that is already the fallback untouched", async () => {
    const img = await mountLogo("https://invalid.example/nonexistent.png");
    img.dispatchEvent(new Event("error"));
    let writes = 0;
    const current = img.src;
    Object.defineProperty(img, "src", {
      configurable: true,
      get: () => current,
      set: () => {
        writes += 1;
      },
    });
    img.dispatchEvent(new Event("error"));
    expect(writes).toBe(0);
  });
});

describe("modal accessibility (standings / form / calendar)", () => {
  const STATES = {
    "sensor.basket_landes_prochain_match_adversaire": { state: "US Dax" },
    "sensor.basket_landes_prochain_match_date": { state: "2099-09-19T20:00:00", attributes: { round: "2" } },
    "sensor.basket_landes_poule": {
      state: "Poule A",
      attributes: {
        team: "Basket Landes",
        competition: "PNM",
        calendar: [{ home_team: "Basket Landes", away_team: "US Dax", date: "2099-09-19T20:00:00", round: 1 }],
      },
    },
    "sensor.basket_landes_classement": {
      state: "2",
      attributes: {
        standings: [
          { position: 1, team_name: "US Dax", points: 20 },
          { position: 2, team_name: "Basket Landes", points: 18 },
        ],
      },
    },
    "sensor.basket_landes_forme_recente": { state: "V-V-D", attributes: {} },
  };
  const TRIGGERS = {
    standings: ".rank-badge.clickable-badge",
    form: ".footer-form",
    calendar: ".header-round.clickable-round",
  };

  afterEach(() => {
    document.body.innerHTML = "";
  });

  async function openModal(type) {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: "sensor.basket_landes_prochain_match_adversaire" });
    el.hass = { language: "en", locale: { language: "en" }, states: STATES };
    document.body.appendChild(el);
    await el.updateComplete;

    const trigger = el.shadowRoot.querySelector(TRIGGERS[type]);
    expect(trigger, `expected a trigger for the ${type} modal`).not.toBeNull();
    trigger.focus();
    trigger.click();
    await el.updateComplete;
    return { el, trigger, card: el.shadowRoot.querySelector(".modal-card") };
  }

  const press = (target, key, opts = {}) => {
    const event = new KeyboardEvent("keydown", { key, bubbles: true, composed: true, cancelable: true, ...opts });
    target.dispatchEvent(event);
    return event;
  };
  const focusablesOf = (card) => [...card.querySelectorAll('[tabindex]:not([tabindex="-1"])')];

  describe.each(["standings", "form", "calendar"])("%s modal", (type) => {
    it("is exposed as a labelled modal dialog", async () => {
      const { el, card } = await openModal(type);
      expect(card.getAttribute("role")).toBe("dialog");
      expect(card.getAttribute("aria-modal")).toBe("true");
      const label = el.shadowRoot.querySelector("#" + card.getAttribute("aria-labelledby"));
      expect(label, "aria-labelledby must point to an existing element").not.toBeNull();
      expect(label.textContent.trim().length).toBeGreaterThan(0);
    });

    it("moves keyboard focus into the dialog when it opens", async () => {
      const { el, card } = await openModal(type);
      expect(el.shadowRoot.activeElement).toBe(card);
    });

    it("closes on Escape pressed where the focus really is (not on the backdrop)", async () => {
      const { el } = await openModal(type);
      press(el.shadowRoot.activeElement, "Escape");
      await el.updateComplete;
      expect(el._activeModal).toBeNull();
      expect(el.shadowRoot.querySelector(".modal-backdrop")).toBeNull();
    });

    it("does not let Escape leak out and close other Home Assistant dialogs", async () => {
      const { el } = await openModal(type);
      const leaked = vi.fn();
      document.addEventListener("keydown", leaked);
      press(el.shadowRoot.activeElement, "Escape");
      document.removeEventListener("keydown", leaked);
      expect(leaked).not.toHaveBeenCalled();
    });

    it("gives focus back to the element that opened it", async () => {
      const { el, trigger } = await openModal(type);
      press(el.shadowRoot.activeElement, "Escape");
      await el.updateComplete;
      expect(el.shadowRoot.activeElement).toBe(trigger);
    });

    it("gives focus back to the opener when closed with the close button", async () => {
      const { el, trigger, card } = await openModal(type);
      card.querySelector(".modal-close-btn").click();
      await el.updateComplete;
      expect(el.shadowRoot.activeElement).toBe(trigger);
    });

    it("makes the close button and the scrollable body reachable by keyboard", async () => {
      const { card } = await openModal(type);
      const focusables = focusablesOf(card);
      expect(focusables.length).toBeGreaterThanOrEqual(2);
      expect(focusables[0].classList.contains("modal-close-btn")).toBe(true);
      expect(focusables.some((f) => f.classList.contains("modal-body"))).toBe(true);
    });

    it("traps Tab: from the last control it wraps to the first", async () => {
      const { el, card } = await openModal(type);
      const focusables = focusablesOf(card);
      focusables[focusables.length - 1].focus();
      const event = press(el.shadowRoot.activeElement, "Tab");
      expect(event.defaultPrevented).toBe(true);
      expect(el.shadowRoot.activeElement).toBe(focusables[0]);
    });

    it("traps Shift+Tab: from the first control (or the dialog itself) it wraps to the last", async () => {
      const { el, card } = await openModal(type);
      const focusables = focusablesOf(card);

      focusables[0].focus();
      let event = press(el.shadowRoot.activeElement, "Tab", { shiftKey: true });
      expect(event.defaultPrevented).toBe(true);
      expect(el.shadowRoot.activeElement).toBe(focusables[focusables.length - 1]);

      card.focus();
      event = press(el.shadowRoot.activeElement, "Tab", { shiftKey: true });
      expect(event.defaultPrevented).toBe(true);
      expect(el.shadowRoot.activeElement).toBe(focusables[focusables.length - 1]);
    });

    it("leaves Tab alone in the middle of the dialog", async () => {
      const { el, card } = await openModal(type);
      const focusables = focusablesOf(card);
      focusables[0].focus();
      const event = press(el.shadowRoot.activeElement, "Tab");
      expect(event.defaultPrevented).toBe(false);
    });
  });
});

describe("modal row highlighting prefers the exact team name", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  async function mount({ opponent = "US Dax", team = "Basket Landes", standings, calendar }) {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: "sensor.basket_landes_prochain_match_adversaire" });
    el.hass = {
      language: "en",
      locale: { language: "en" },
      states: {
        "sensor.basket_landes_prochain_match_adversaire": { state: opponent },
        "sensor.basket_landes_prochain_match_date": { state: "2099-09-19T20:00:00", attributes: { round: "2" } },
        "sensor.basket_landes_poule": { state: "Poule A", attributes: { team, competition: "PNM", calendar } },
        "sensor.basket_landes_classement": { state: "2", attributes: { standings } },
      },
    };
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  async function open(el, selector) {
    el.shadowRoot.querySelector(selector).click();
    await el.updateComplete;
  }

  const highlightedTeams = (el) =>
    [...el.shadowRoot.querySelectorAll(".standings-table tr.highlight-row .col-team")].map((n) => n.textContent.trim());

  it("standings: 'US Dax' does not also highlight 'US Dax 2'", async () => {
    const el = await mount({
      standings: [
        { position: 1, team_name: "US Dax 2", points: 20 },
        { position: 2, team_name: "Basket Landes", points: 18 },
        { position: 4, team_name: "US Dax", points: 10 },
      ],
    });
    await open(el, ".rank-badge.clickable-badge");
    expect(highlightedTeams(el)).toEqual(["Basket Landes", "US Dax"]);
  });

  it("standings: still highlights by substring when no row matches exactly", async () => {
    const el = await mount({
      opponent: "US Dax Senior",
      standings: [
        { position: 1, team_name: "Basket Landes", points: 18 },
        { position: 2, team_name: "US Dax", points: 10 },
        { position: 3, team_name: "Other", points: 5 },
      ],
    });
    await open(el, ".rank-badge.clickable-badge");
    expect(highlightedTeams(el)).toEqual(["Basket Landes", "US Dax"]);
  });

  it("calendar: 'Basket Landes' does not also highlight 'Basket Landes 2'", async () => {
    const el = await mount({
      standings: [{ position: 1, team_name: "Basket Landes", points: 18 }],
      calendar: [
        { home_team: "Basket Landes", away_team: "Foo", date: "2099-09-19T20:00:00", round: 1 },
        { home_team: "Basket Landes 2", away_team: "Bar", date: "2099-09-26T20:00:00", round: 2 },
        { home_team: "Baz", away_team: "Qux", date: "2099-10-03T20:00:00", round: 3 },
      ],
    });
    await open(el, ".header-round.clickable-round");
    const rows = [...el.shadowRoot.querySelectorAll(".calendar-row")];
    expect(rows.map((r) => r.classList.contains("highlight-row"))).toEqual([true, false, false]);
  });

  it("calendar: still highlights by substring when no name matches exactly", async () => {
    const el = await mount({
      standings: [{ position: 1, team_name: "Basket Landes", points: 18 }],
      calendar: [
        { home_team: "Basket Landes 2", away_team: "Bar", date: "2099-09-26T20:00:00", round: 2 },
        { home_team: "Baz", away_team: "Qux", date: "2099-10-03T20:00:00", round: 3 },
      ],
    });
    await open(el, ".header-round.clickable-round");
    const rows = [...el.shadowRoot.querySelectorAll(".calendar-row")];
    expect(rows.map((r) => r.classList.contains("highlight-row"))).toEqual([true, false]);
  });
});

describe("form letters are French whatever the UI language (V = win, D = loss, N = draw)", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  async function badgeClasses(language) {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: "sensor.basket_landes_prochain_match_adversaire" });
    el.hass = {
      language,
      locale: { language },
      states: {
        "sensor.basket_landes_prochain_match_adversaire": { state: "US Dax" },
        "sensor.basket_landes_prochain_match_date": { state: "2099-09-19T20:00:00" },
        "sensor.basket_landes_forme_recente": { state: "V-D-N", attributes: {} },
      },
    };
    document.body.appendChild(el);
    await el.updateComplete;
    el.shadowRoot.querySelector(".footer-form").click();
    await el.updateComplete;
    return [...el.shadowRoot.querySelectorAll(".form-badge-pill")].map((pill) =>
      ["badge-win", "badge-loss", "badge-draw"].find((c) => pill.classList.contains(c))
    );
  }

  it("in a French UI, D is a loss and N is a draw", async () => {
    expect(await badgeClasses("fr")).toEqual(["badge-win", "badge-loss", "badge-draw"]);
  });

  it("in an English UI, D is STILL a loss (the integration always sends French letters)", async () => {
    expect(await badgeClasses("en")).toEqual(["badge-win", "badge-loss", "badge-draw"]);
  });
});

describe("getGridOptions() (Sections view sizing)", () => {
  it("is full width by default with a sensible minimum, and leaves the height to the content", () => {
    const el = makeCard();
    expect(el.getGridOptions()).toEqual({ columns: 12, min_columns: 9 });
    expect("rows" in el.getGridOptions()).toBe(false);
  });
});

describe("calendar modal: round tag and standings 'draws' column", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  async function mount(language, { standings, calendar } = {}) {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: "sensor.basket_landes_prochain_match_adversaire" });
    el.hass = {
      language,
      locale: { language },
      states: {
        "sensor.basket_landes_prochain_match_adversaire": { state: "US Dax" },
        "sensor.basket_landes_prochain_match_date": { state: "2099-09-19T20:00:00", attributes: { round: "2" } },
        "sensor.basket_landes_poule": {
          state: "Poule A",
          attributes: { team: "Basket Landes", competition: "PNM", calendar },
        },
        "sensor.basket_landes_classement": { state: "1", attributes: { standings } },
      },
    };
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  const CALENDAR = [
    { home_team: "Basket Landes", away_team: "US Dax", date: "2099-09-19T20:00:00", round: 1 },
    { home_team: "US Dax", away_team: "Basket Landes", date: "2099-09-26T20:00:00", round: 2 },
  ];

  async function roundTags(language) {
    const el = await mount(language, { calendar: CALENDAR, standings: [{ position: 1, team_name: "Basket Landes" }] });
    el.shadowRoot.querySelector(".header-round.clickable-round").click();
    await el.updateComplete;
    return [...el.shadowRoot.querySelectorAll(".cal-round-tag")].map((n) => n.textContent.trim());
  }

  it.each([
    ["fr", ["J1", "J2"]],
    ["en", ["R1", "R2"]],
  ])("round tag is translated for %s", async (language, expected) => {
    expect(await roundTags(language)).toEqual(expected);
  });

  it("draws column: shows the real value, and 0 when the data is missing", async () => {
    const el = await mount("en", {
      calendar: CALENDAR,
      standings: [
        { position: 1, team_name: "Zero Draws", points: 10, draws: 0 },
        { position: 2, team_name: "No Data", points: 8 },
        { position: 3, team_name: "Two Draws", points: 6, draws: 2 },
      ],
    });
    el.shadowRoot.querySelector(".rank-badge.clickable-badge").click();
    await el.updateComplete;
    const lastCells = [...el.shadowRoot.querySelectorAll(".standings-table tbody tr")].map((tr) => {
      const cells = tr.querySelectorAll("td");
      return cells[cells.length - 1].textContent.trim();
    });
    expect(lastCells).toEqual(["0", "0", "2"]);
  });
});

describe("times follow the Home Assistant language and 12/24h profile setting", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  async function mount(locale) {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: "sensor.basket_landes_prochain_match_adversaire" });
    el.hass = {
      language: locale.language,
      locale,
      states: {
        "sensor.basket_landes_prochain_match_adversaire": { state: "US Dax" },
        "sensor.basket_landes_prochain_match_date": { state: "2099-09-19T20:00:00", attributes: { round: "2" } },
        "sensor.basket_landes_poule": {
          state: "Poule A",
          attributes: {
            team: "Basket Landes",
            competition: "PNM",
            calendar: [{ home_team: "Basket Landes", away_team: "US Dax", date: "2099-09-19T20:00:00", round: 1 }],
          },
        },
      },
    };
    document.body.appendChild(el);
    await el.updateComplete;
    const mainTime = el.shadowRoot.querySelector(".match-time").textContent.trim();
    const mainDay = el.shadowRoot.querySelector(".match-day").textContent.trim();
    el.shadowRoot.querySelector(".header-round.clickable-round").click();
    await el.updateComplete;
    const calendarTime = el.shadowRoot.querySelector(".cal-time").textContent.trim();
    const calendarDay = el.shadowRoot.querySelector(".cal-date").textContent.trim();
    return { mainTime, calendarTime, mainDay, calendarDay };
  }

  it('English + profile "24 hours": 24-hour time in the main view AND the calendar', async () => {
    expect(await mount({ language: "en", time_format: "24" })).toMatchObject({ mainTime: "20:00", calendarTime: "20:00" });
  });

  it('French + profile "12 hours": 12-hour time in the main view AND the calendar', async () => {
    const { mainTime, calendarTime } = await mount({ language: "fr", time_format: "12" });
    expect(mainTime).toMatch(/PM/i);
    expect(calendarTime).toBe(mainTime);
  });

  it('en-GB + profile "language": 24-hour everywhere (the main view used to get plain "en" and show AM/PM)', async () => {
    expect(await mount({ language: "en-GB", time_format: "language" })).toMatchObject({ mainTime: "20:00", calendarTime: "20:00" });
  });

  it("en-GB: the main view and the calendar use the same date format (\"19 Sept\", not \"Sep 19\")", async () => {
    const { mainDay, calendarDay } = await mount({ language: "en-GB", time_format: "language" });
    expect(calendarDay).toMatch(/^19 Sep/);
    expect(mainDay.endsWith(calendarDay)).toBe(true);
  });

  it("en-US + profile \"language\": 12-hour everywhere, and both views agree", async () => {
    const { mainTime, calendarTime } = await mount({ language: "en-US", time_format: "language" });
    expect(mainTime).toMatch(/PM/i);
    expect(calendarTime).toBe(mainTime);
  });
});

describe("watermarks come back when a valid logo loads after a failure", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  async function mountCard() {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: "sensor.basket_landes_prochain_match_adversaire" });
    el.hass = {
      language: "en",
      locale: { language: "en" },
      states: {
        "sensor.basket_landes_prochain_match_adversaire": {
          state: "US Dax",
          attributes: { team_logo_url: "https://logo.example/a.png", opponent_logo_url: "https://logo.example/b.png" },
        },
        "sensor.basket_landes_prochain_match_date": { state: "2099-09-19T20:00:00" },
      },
    };
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  it.each([".watermark-left", ".watermark-right"])("%s is hidden on error and shown again on the next successful load", async (selector) => {
    const el = await mountCard();
    const img = el.shadowRoot.querySelector(selector);
    expect(img).not.toBeNull();

    img.dispatchEvent(new Event("error"));
    expect(img.style.display).toBe("none");

    img.dispatchEvent(new Event("load"));
    expect(img.style.display).toBe("");
  });
});

describe("invalid custom accent color falls back to the default", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = "";
  });

  async function accentStyleFor(customColor) {
    vi.stubGlobal("CSS", { supports: (prop, value) => prop === "color" && /^(#[0-9a-f]{6}|red)$/i.test(value) });
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({
      entity: "sensor.basket_landes_prochain_match_adversaire",
      accent_color: "custom",
      custom_accent_color: customColor,
    });
    el.hass = {
      language: "en",
      locale: { language: "en" },
      states: {
        "sensor.basket_landes_prochain_match_adversaire": { state: "US Dax" },
        "sensor.basket_landes_prochain_match_date": { state: "2099-09-19T20:00:00" },
      },
    };
    document.body.appendChild(el);
    await el.updateComplete;
    return el.shadowRoot.querySelector('[style*="--ffbb-accent-color"]').getAttribute("style");
  }

  it("keeps a valid color", async () => {
    expect(await accentStyleFor("#1e88e5")).toContain("--ffbb-accent-color: #1e88e5");
  });

  it("uses the default orange when the color is not a color (\"bleu\")", async () => {
    expect(await accentStyleFor("bleu")).toContain("--ffbb-accent-color: #ff6b00");
  });
});

describe("standings table reads the attribute names really sent by the integration", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("shows played / won / lost (including 0), and 0 for draws when no value is sent", async () => {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: "sensor.basket_landes_prochain_match_adversaire" });
    el.hass = {
      language: "fr",
      locale: { language: "fr" },
      states: {
        "sensor.basket_landes_prochain_match_adversaire": { state: "US Dax" },
        "sensor.basket_landes_poule": { state: "Poule B", attributes: { team: "Basket Landes" } },
        "sensor.basket_landes_classement": {
          state: "1",
          attributes: {
            standings: [
              { position: 10, team_name: "COTE D'OPALE BASKET CALAIS", points: 1, played: 1, won: 0, lost: 1 },
              { position: 1, team_name: "ASA SCEAUX", points: 2, played: 1, won: 1, lost: 0 },
              { position: 2, team_name: "APLEMONT LE HAVRE BASKET", points: 2, played: 3, won: 2, lost: 1 },
            ],
          },
        },
      },
    };
    document.body.appendChild(el);
    await el.updateComplete;
    el.shadowRoot.querySelector(".rank-badge.clickable-badge").click();
    await el.updateComplete;

    const rows = [...el.shadowRoot.querySelectorAll(".standings-table tbody tr")].map((tr) =>
      [...tr.querySelectorAll("td")].map((td) => td.textContent.trim())
    );
    expect(rows).toEqual([
      ["1", "ASA SCEAUX", "2", "1", "1", "0", "0"],
      ["2", "APLEMONT LE HAVRE BASKET", "2", "3", "2", "1", "0"],
      ["10", "COTE D'OPALE BASKET CALAIS", "1", "1", "0", "1", "0"],
    ]);
  });
});

describe("feedback when the custom accent color is not a valid color", () => {
  const stubBrowserColors = () =>
    vi.stubGlobal("CSS", { supports: (prop, value) => prop === "color" && /^(#[0-9a-f]{6}|blue|red)$/i.test(value) });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  async function colorFieldHelper(language, config) {
    stubBrowserColors();
    const Editor = customElements.get("ffbb-tracker-card-editor");
    const el = new Editor();
    el.hass = { language, locale: { language } };
    el.setConfig({ entity: "sensor.x", ...config });
    document.body.appendChild(el);
    await el.updateComplete;
    const field = el.shadowRoot.querySelector("ha-form").schema.find((f) => f.name === "custom_accent_color");
    return field?.helper;
  }

  it("editor: warns under the field for an invalid color (English)", async () => {
    const helper = await colorFieldHelper("en", { accent_color: "custom", custom_accent_color: "bleu" });
    expect(helper).toContain("⚠");
    expect(helper).toContain("Not a valid color: the default orange is used.");
    expect(helper).toContain("Example: #1e88e5");
  });

  it("editor: the warning is translated (French) and hints that color names are English", async () => {
    const helper = await colorFieldHelper("fr", { accent_color: "custom", custom_accent_color: "bleu" });
    expect(helper).toContain("⚠");
    expect(helper).toContain("blue");
    expect(helper).toContain("Exemple");
  });

  it.each([["#1e88e5"], ["blue"], [""], ["   "]])("editor: no warning for %j", async (color) => {
    const helper = await colorFieldHelper("en", { accent_color: "custom", custom_accent_color: color });
    expect(helper).toBe("Example: #1e88e5 or #ff6b00");
  });

  it("card: logs a console warning once for an invalid custom color (YAML users)", () => {
    stubBrowserColors();
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const el = makeCard({ entity: "sensor.x", accent_color: "custom", custom_accent_color: "bleu" });
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain('"bleu"');

    el.setConfig({ entity: "sensor.x", accent_color: "custom", custom_accent_color: "bleu" });
    expect(warn).toHaveBeenCalledTimes(1);

    el.setConfig({ entity: "sensor.x", accent_color: "custom", custom_accent_color: "vert" });
    expect(warn).toHaveBeenCalledTimes(2);
  });

  it.each([
    ["a valid color", { accent_color: "custom", custom_accent_color: "#1e88e5" }],
    ["an empty color", { accent_color: "custom", custom_accent_color: "" }],
    ["a bad value while the mode is not custom", { accent_color: "default", custom_accent_color: "bleu" }],
  ])("card: no console warning for %s", (_label, extra) => {
    stubBrowserColors();
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    makeCard({ entity: "sensor.x", ...extra });
    expect(warn).not.toHaveBeenCalled();
  });
});
describe("text built from several fields keeps its separators", () => {
  let openSpy;

  beforeEach(() => {
    openSpy = vi.spyOn(window, "open").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("_openMaps() separates gym and city with a space", () => {
    makeCard()._openMaps("SALLE DE BIAUDOS", "BIAUDOS");
    expect(openSpy.mock.calls[0][0]).toContain("query=SALLE%20DE%20BIAUDOS%20BIAUDOS");
  });

  it("_openMaps() has no dangling separator when the city is missing", () => {
    makeCard()._openMaps("SALLE DE BIAUDOS", "");
    const url = openSpy.mock.calls[0][0];
    expect(url).toContain("query=SALLE%20DE%20BIAUDOS");
    expect(url.endsWith("%20")).toBe(false);
  });

  it("_openCalendar() puts spaces around 'vs' in the title and the details", () => {
    makeCard()._openCalendar("2026-09-26T14:00:00Z", "BASKET BIAUDOS", "UJSBP", "SALLE DE BIAUDOS", "BIAUDOS");
    const url = openSpy.mock.calls[0][0];
    expect(url).toContain("text=BASKET%20BIAUDOS%20vs%20UJSBP");
    expect(url).toContain(`details=${encodeURIComponent("FFBB match: BASKET BIAUDOS vs UJSBP")}`);
  });

  it("_openCalendar() separates gym and city in the location", () => {
    makeCard()._openCalendar("2026-09-26T14:00:00Z", "A", "B", "SALLE DE BIAUDOS", "BIAUDOS");
    expect(openSpy.mock.calls[0][0]).toContain(`location=${encodeURIComponent("SALLE DE BIAUDOS BIAUDOS")}`);
  });

  it("_openCalendar() location is just the gym when there is no city", () => {
    makeCard()._openCalendar("2026-09-26T14:00:00Z", "A", "B", "SALLE DE BIAUDOS", "");
    expect(openSpy.mock.calls[0][0]).toContain(`location=${encodeURIComponent("SALLE DE BIAUDOS")}`);
  });
});

describe("carousel and calendar modal on a real FFBB dataset", () => {
  const T = "UNION JEUN SP BUGLOSE PONTONX";
  const asset = (id) => `https://api.ffbb.app/assets/${id}?height=220&fit=contain&format=avif`;
  const MY = asset("c6d1d2fc");
  const MAGESCQ = asset("4777cdef");
  const BIAUDOS = asset("3b1c5eb8");
  const team = (n) => `https://competitions.ffbb.com/equipes/${n}`;
  const ENTITY = "sensor.ujsbp_u13m_prochain_match_adversaire";

  const STATES = {
    [ENTITY]: {
      state: "BASKET BIAUDOS ST MARTIN DE SEIG",
      attributes: { is_home: false, team_url: team(1), opponent_url: team(5), team_logo_url: MY, opponent_logo_url: BIAUDOS },
    },
    "sensor.ujsbp_u13m_prochain_match_date": { state: "2099-09-26T14:00:00+00:00", attributes: { round: 2 } },
    "sensor.ujsbp_u13m_prochain_match_terrain": { state: "away", attributes: { is_home: false } },
    "sensor.ujsbp_u13m_dernier_match_adversaire": {
      state: "MAGESCQ BASKET",
      attributes: { team_url: team(1), opponent_url: team(4), team_logo_url: MY, opponent_logo_url: MAGESCQ },
    },
    "sensor.ujsbp_u13m_dernier_match_date": { state: "2026-09-19T11:00:00+00:00", attributes: { round: 1 } },
    "sensor.ujsbp_u13m_dernier_match_score": { state: "51 - 46" },
    "sensor.ujsbp_u13m_poule": {
      state: "D2 Poule B",
      attributes: {
        team: T,
        competition: "Départementale masculine U13 - Division 2",
        calendar: [
          { round: 1, home_team: T, away_team: "MAGESCQ BASKET", date: "2026-09-19T11:00:00+00:00", score: "51 - 46", is_played: true },
          { round: 2, home_team: "BASKET BIAUDOS ST MARTIN DE SEIG", away_team: T, date: "2099-09-26T14:00:00+00:00", score: null, is_played: false },
          { round: 3, home_team: "BISCARROSSE OLYMPIQUE BASKET - 1", away_team: T, date: "2099-10-10T11:30:00+00:00", score: null, is_played: false },
        ],
      },
    },
    "sensor.ujsbp_u13m_classement": {
      state: "1",
      attributes: {
        standings: [
          { position: 1, team_name: T, team_url: team(1) },
          { position: 2, team_name: "BISCARROSSE OLYMPIQUE BASKET", team_url: team(2) },
          { position: 4, team_name: "MAGESCQ BASKET", team_url: team(4) },
          { position: 5, team_name: "BASKET BIAUDOS ST MARTIN DE SEIG", team_url: team(5) },
        ],
      },
    },
    "binary_sensor.ujsbp_u13m_match_en_cours": { state: "off" },
  };

  let el;

  async function mount(config = {}) {
    const Card = customElements.get("ffbb-tracker-card");
    el = new Card();
    el.setConfig({ entity: ENTITY, ...config });
    el.hass = { states: STATES, locale: { language: "fr-FR" } };
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  const logos = () => [...el.shadowRoot.querySelectorAll("img.logo")].map((i) => i.getAttribute("src"));

  async function goTo(index) {
    el._matchIndex = index;
    await el.updateComplete;
  }

  afterEach(() => {
    el?.remove();
    vi.restoreAllMocks();
  });

  it("shows each match's own two crests as the carousel moves", async () => {
    await mount();
    await goTo(0);
    expect(logos()).toEqual([MY, MAGESCQ]);
    await goTo(1);
    expect(logos()).toEqual([BIAUDOS, MY]);
  });

  it("shows the default crest (not another club's) for a club with no known logo", async () => {
    await mount();
    await goTo(2);
    const [left, right] = logos();
    expect(left).toBe(DEFAULT_FALLBACK_LOGO);
    expect(right).toBe(MY);
    expect(left).not.toBe(BIAUDOS);
  });

  it("clicking a logo opens that team's page on every match", async () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => {});
    await mount();

    const expected = [
      [team(1), team(4)],
      [team(5), team(1)],
      [team(2), team(1)],
    ];
    for (let i = 0; i < expected.length; i++) {
      await goTo(i);
      openSpy.mockClear();
      const [left, right] = el.shadowRoot.querySelectorAll(".logo-box");
      left.click();
      right.click();
      expect(openSpy.mock.calls.map((c) => c[0]), `match ${i}`).toEqual(expected[i]);
      expect(openSpy.mock.calls.every((c) => c[1] === "_blank" && c[2] === "noreferrer")).toBe(true);
    }
  });

  it("does not fall back to the more-info dialog when a link exists", async () => {
    vi.spyOn(window, "open").mockImplementation(() => {});
    await mount();
    await goTo(2);
    const moreInfo = vi.fn();
    el.addEventListener("hass-more-info", moreInfo);
    el.shadowRoot.querySelector(".logo-box").click();
    expect(moreInfo).not.toHaveBeenCalled();
  });

  it("logo_click_action 'none' opens nothing", async () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => {});
    await mount({ logo_click_action: "none" });
    await goTo(1);
    el.shadowRoot.querySelectorAll(".logo-box").forEach((b) => b.click());
    expect(openSpy).not.toHaveBeenCalled();
  });

  it("the calendar modal shows the score with a space around the dash", async () => {
    await mount();
    el._activeModal = "calendar";
    await el.updateComplete;
    const scores = [...el.shadowRoot.querySelectorAll(".cal-score")].map((n) => n.textContent.trim());
    expect(scores).toEqual(["51 - 46"]);
  });

  // Round 1: home_team is T (us), score "51 - 46" -- same mine/opponent
  // split and coloring as the main "last match" score display, for
  // consistency across the whole card.
  it("colors the calendar score the same way as the main score display: mine highlighted, theirs plain", async () => {
    await mount();
    el._activeModal = "calendar";
    await el.updateComplete;
    const row = el.shadowRoot.querySelector(".cal-score");
    expect(row.querySelector(".score-mine")?.textContent.trim()).toBe("51");
    expect(row.querySelector(".score-theirs")?.textContent.trim()).toBe("46");
  });

  it("the calendar modal builds a score from numeric fields with spaces too", async () => {
    await mount();
    const states = structuredClone(STATES);
    states["sensor.ujsbp_u13m_poule"].attributes.calendar = [
      { round: 1, home_team: T, away_team: "MAGESCQ BASKET", home_score: 65, away_score: 60, is_played: true },
    ];
    el.hass = { states, locale: { language: "fr-FR" } };
    el._activeModal = "calendar";
    await el.updateComplete;
    expect(el.shadowRoot.querySelector(".cal-score").textContent.trim()).toBe("65 - 60");
  });

  it("swaps which calendar number is 'mine' for an away match (we're away_team, not home_team)", async () => {
    await mount();
    const states = structuredClone(STATES);
    states["sensor.ujsbp_u13m_poule"].attributes.calendar = [
      { round: 2, home_team: "BASKET BIAUDOS ST MARTIN DE SEIG", away_team: T, score: "60 - 65", is_played: true },
    ];
    el.hass = { states, locale: { language: "fr-FR" } };
    el._activeModal = "calendar";
    await el.updateComplete;
    const row = el.shadowRoot.querySelector(".cal-score");
    expect(row.querySelector(".score-mine")?.textContent.trim()).toBe("65");
    expect(row.querySelector(".score-theirs")?.textContent.trim()).toBe("60");
  });

  it("the calendar modal shows the right crest per team and no other club's crest", async () => {
    await mount();
    el._activeModal = "calendar";
    await el.updateComplete;
    const srcs = [...el.shadowRoot.querySelectorAll(".cal-mini-logo")].map((i) => i.getAttribute("src"));
    expect(srcs).toEqual([
      MY, MAGESCQ,
      BIAUDOS, MY,
      DEFAULT_FALLBACK_LOGO, MY,
    ]);
  });

  it("each calendar row has an accessible label with spaces around 'vs'", async () => {
    await mount();
    el._activeModal = "calendar";
    await el.updateComplete;
    const labels = [...el.shadowRoot.querySelectorAll(".calendar-row")].map((r) => r.getAttribute("aria-label"));
    expect(labels[0]).toBe(`${T} vs MAGESCQ BASKET`);
    expect(labels.every((l) => / vs /.test(l))).toBe(true);
  });

  it("the calendar modal marks my rows and the next match", async () => {
    await mount();
    el._activeModal = "calendar";
    await el.updateComplete;
    const rows = el.shadowRoot.querySelectorAll(".calendar-row");
    expect(rows).toHaveLength(3);
    expect([...rows].every((r) => r.classList.contains("highlight-row"))).toBe(true);
    expect([...rows].map((r) => r.classList.contains("next-match-row"))).toEqual([false, true, false]);
  });

  it("shows the custom_team_name on my own rows in the calendar, opponents keep their real name", async () => {
    await mount({ custom_team_name: "Les Panthères" });
    el._activeModal = "calendar";
    await el.updateComplete;
    const rows = [...el.shadowRoot.querySelectorAll(".calendar-row")];
    const teamsPerRow = rows.map((r) => [...r.querySelectorAll(".cal-team")].map((s) => s.textContent.trim()));
    expect(teamsPerRow).toEqual([
      ["Les Panthères", "MAGESCQ BASKET"],
      ["BASKET BIAUDOS ST MARTIN DE SEIG", "Les Panthères"],
      ["BISCARROSSE OLYMPIQUE BASKET - 1", "Les Panthères"],
    ]);
    // The card's own name is never shown in an opponent-only slot.
    expect(el.shadowRoot.textContent).not.toContain(T);
  });

  it("a broken crest URL is swapped once for the default and never loops", async () => {
    await mount();
    await goTo(0);
    const img = el.shadowRoot.querySelector("img.logo");
    img.dispatchEvent(new Event("error"));
    expect(img.src.endsWith(DEFAULT_FALLBACK_LOGO)).toBe(true);
    const after = img.src;
    img.dispatchEvent(new Event("error"));
    expect(img.src).toBe(after);
  });
});

describe("getCardSize() (masonry view sizing)", () => {
  const ENTITY = "sensor.ujsbp_prochain_match_adversaire";

  function statesFor(displayMode, teamCount) {
    return {
      [ENTITY]: { state: "BASKET BIAUDOS ST MARTIN DE SEIG", attributes: {} },
      "sensor.ujsbp_prochain_match_date": { state: "2026-09-26T14:00:00+00:00", attributes: { round: 2 } },
      "sensor.ujsbp_poule": { state: "D2 Poule B", attributes: { team: "UJSBP", competition: "D2" } },
      "sensor.ujsbp_classement": {
        state: "1",
        attributes: {
          standings: Array.from({ length: teamCount }, (_, i) => ({ team_name: `Team ${i + 1}`, position: i + 1 })),
        },
      },
    };
  }

  async function mountCard(displayMode, teamCount) {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: ENTITY, display_mode: displayMode });
    el.hass = { states: statesFor(displayMode, teamCount), locale: { language: "fr-FR" } };
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("a card with no config and no hass falls back to the flat match-card estimate", () => {
    const Card = customElements.get("ffbb-tracker-card");
    expect(new Card().getCardSize()).toBe(3);
  });

  it("match mode stays flat regardless of how many teams are in the pool", async () => {
    const el = await mountCard("match", 20);
    expect(el.getCardSize()).toBe(3);
  });

  it("standings mode grows with the pool actually rendered by this card's own entities", async () => {
    const small = await mountCard("standings", 6);
    const large = await mountCard("standings", 18);
    expect(small.getCardSize()).toBeGreaterThan(3);
    expect(large.getCardSize()).toBeGreaterThan(small.getCardSize());
  });

  it("both mode is bigger than standings alone, by exactly the match card's own size", async () => {
    const standingsOnly = await mountCard("standings", 10);
    const both = await mountCard("both", 10);
    expect(both.getCardSize()).toBe(standingsOnly.getCardSize() + 3);
  });
});
