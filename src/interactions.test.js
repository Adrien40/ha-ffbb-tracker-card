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
    // Start and end dates 2h apart, in the calendar API's compact ISO form
    // (no dashes/colons/milliseconds).
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

// card-editor.js's _valueChanged() is what runs every time a user touches
// a field in the visual editor (ha-form fires "value-changed" on any edit).
// Before this block it had zero coverage: a regression here means a
// setting silently stops saving, with no error anywhere -- the user just
// finds their toggle "didn't stick" after leaving the editor.
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
    const bare = new Editor(); // no setConfig(), no hass
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

  it("defaults text fields (entity, custom_team_name, title, icon, custom_accent_color) to \"\" when ha-form omits them", () => {
    const el = makeEditor();
    const spy = vi.fn();
    el.addEventListener("config-changed", spy);

    // ha-form only includes fields currently shown in the schema; none of
    // the text fields are present in this update.
    el._valueChanged({ detail: { value: { show_rank: false } } });

    const { config } = spy.mock.calls[0][0].detail;
    expect(config.entity).toBe("");
    expect(config.custom_team_name).toBe("");
    expect(config.title).toBe("");
    expect(config.icon).toBe("");
    expect(config.custom_accent_color).toBe("");
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

// End-to-end render tests with a full, realistic hass object -- everything
// above this point calls internal methods directly, but none of it proves
// the *actual HTML* a user sees is correct (right score, right team names,
// a badge that really opens its modal on click). This is the fixture from
// pure.test.js's computeViewModel suite, translated into the raw
// hass.states shape resolveEntities() expects, so it stays consistent with
// what's already proven correct at the pure-function level.
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
        // Only read by _extractCalendarMatches() -- exercises both the
        // "has a score" and "has a date, no score yet" row branches of
        // the calendar modal in a single fixture.
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
    el._setManualView("last"); // deterministic: bypasses any real-clock date math
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

  // Regression check for the bug reported against the old two-checkbox
  // design: picking "solid" badges visually forced podium colors on
  // (correct in the rendered page), but the "enable podium colors" toggle
  // in the editor stayed unchecked -- an inconsistent state that could
  // never happen once solid/outline/none became mutually-exclusive values
  // of a single field. This proves a "solid" badge always carries its
  // color class (rank-gold/silver/bronze) alongside rank-solid, with no
  // separate setting able to leave one enabled without the other.
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
    // V-V-D-V-N -> 5 tokens, one pill each.
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
    expect(text).toContain("80 - 75"); // scored row
    expect(text).toContain("AS Dax"); // date-only row's opponent name

    // Escape closes it too, same handler as the other two modals.
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

    // logo_click_action defaults to "team_url"; neither fixture entity has
    // a url-ish attribute or a matching standings row, so both fall back
    // to firing hass-more-info instead of window.open -- assert that
    // fallback explicitly rather than assuming a URL was found.
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
    expect(el._manualView).toBe("next"); // already on "next": right chevron is a no-op there

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
    el._setManualView("next"); // gym/city come from the upcoming-match location
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
    el.hass = { locale: { language: "en-US" } }; // no `states` key -- resolveEntities() short-circuits to null
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot.querySelector(".card-warning")).not.toBeNull();
  });

  // The .badge-gameday element is the one piece of the isGameDay feature not
  // already covered: pure.test.js proves computeViewModel() derives the
  // isGameDay boolean correctly, but nothing before this proved the render()
  // template actually turns that boolean into a visible badge -- or, just as
  // important, correctly suppresses it when isLive/isPostMatch/is_stale
  // would make a "Game day" badge misleading. mountWithStates() reuses this
  // describe block's HASS_STATES fixture, optionally overriding individual
  // sensor entries, so each test only has to spell out the one state that
  // actually matters for it.
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
      vi.setSystemTime(new Date("2026-09-18T08:00:00")); // fixture's next match is the 19th

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

    // The badge is positioned with position: absolute relative to
    // .center-meta (see styles.test.js). If the template ever moved it
    // outside that element, the CSS would silently anchor it to the wrong
    // ancestor and it would land in the wrong place.
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
});
