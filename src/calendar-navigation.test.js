// @vitest-environment happy-dom
//
// The card shows the match the last/next *sensors* describe, which the
// integration picks by date, but its chevrons used to navigate from the
// calendar's first row without a score. Whenever a past match had no result
// yet, the two disagreed: "previous" skipped that match and "next" landed on
// it, and nothing said it was waiting for its score. These tests replay that
// situation with a real season calendar (a team whose 26/09 result never
// arrived) at the pure-logic level and through the rendered card.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  PENDING_RESULT_GRACE_HOURS,
  computeViewModel,
  findCalendarIndex,
  findLastPlayedIndex,
  findNextMatchIndex,
  isPendingResult,
} from "./pure.js";
import "./ha-ffbb-tracker-card.js";

const NOW = new Date("2026-10-02T12:00:00+00:00");
const HOUR = 3_600_000;
const ago = (hours) => new Date(NOW.getTime() - hours * HOUR).toISOString();

// A real calendar: round 1 played, round 2 over but with no result, round 3 is
// the next match, round 5 later.
const ROW_PLAYED = {
  round: 1, match_number: "11507", home_team: "UNION JEUN SP BUGLOSE PONTONX", away_team: "MAGESCQ BASKET",
  date: "2026-09-19T11:00:00+00:00", score: "51 - 46", is_played: true, is_home: true, is_stale: false,
};
const ROW_PENDING = {
  round: 2, match_number: "11527", home_team: "BASKET BIAUDOS ST MARTIN DE SEIG", away_team: "UNION JEUN SP BUGLOSE PONTONX",
  date: "2026-09-26T14:00:00+00:00", score: null, is_played: false, is_home: false, is_stale: false,
};
const ROW_NEXT = {
  round: 3, match_number: "11549", home_team: "BISCARROSSE OLYMPIQUE BASKET - 1", away_team: "UNION JEUN SP BUGLOSE PONTONX",
  date: "2026-10-10T11:30:00+00:00", score: null, is_played: false, is_home: false, is_stale: false,
};
const ROW_LATER = {
  round: 5, match_number: "11591", home_team: "UNION JEUN SP BUGLOSE PONTONX", away_team: "BASKET OCEAN COTE SUD - 1",
  date: "2026-11-07T12:30:00+00:00", score: null, is_played: false, is_home: true, is_stale: false,
};
const CALENDAR = [ROW_PLAYED, ROW_PENDING, ROW_NEXT, ROW_LATER];

const st = (state, attributes = {}) => ({ state, attributes });
function entitiesFor(calendar, { nextAttrs = { match_number: "11549" }, nextState = ROW_NEXT.date } = {}) {
  return {
    poule: st("D2 Poule B", { team: "UNION JEUN SP BUGLOSE PONTONX", calendar }),
    nextDate: st(nextState, { round: "3", ...nextAttrs }),
    nextOpponent: st("BISCARROSSE OLYMPIQUE BASKET - 1", { is_home: false }),
    lastScore: st("51 - 46", { is_home: true }),
    lastDate: st(ROW_PLAYED.date, { round: "1", match_number: "11507" }),
    lastOpponent: st("MAGESCQ BASKET"),
  };
}
const viewModel = (extra = {}) =>
  computeViewModel({
    entities: entitiesFor(CALENDAR),
    config: { entity: "sensor.x_poule", default_match_view: "auto" },
    lang: "fr",
    now: NOW,
    states: {},
    ...extra,
  });

// ---------------------------------------------------------------------------
describe("isPendingResult()", () => {
  it("uses the same 3 hour grace period as the integration", () => {
    expect(PENDING_RESULT_GRACE_HOURS).toBe(3);
  });

  it("is false up to exactly 3 hours after the start, true beyond", () => {
    expect(isPendingResult({ date: ago(2) }, NOW)).toBe(false);
    expect(isPendingResult({ date: ago(3) }, NOW)).toBe(false);
    expect(isPendingResult({ date: new Date(NOW.getTime() - 3 * HOUR - 1000).toISOString() }, NOW)).toBe(true);
    expect(isPendingResult({ date: ago(24 * 6) }, NOW)).toBe(true);
  });

  it("is false for a match still to come", () => {
    expect(isPendingResult({ date: ago(-48) }, NOW)).toBe(false);
  });

  it("is false once the match has a score or the played flag", () => {
    expect(isPendingResult({ date: ago(30), score: "60 - 50" }, NOW)).toBe(false);
    expect(isPendingResult({ date: ago(30), is_played: true }, NOW)).toBe(false);
  });

  it.each([undefined, null, "", "not a date"])("is false without a usable date (%j)", (date) => {
    expect(isPendingResult({ date }, NOW)).toBe(false);
  });

  it("accepts `datetime` as the date field and tolerates a missing row", () => {
    expect(isPendingResult({ datetime: ago(10) }, NOW)).toBe(true);
    expect(isPendingResult(null, NOW)).toBe(false);
    expect(isPendingResult(undefined, NOW)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
describe("findLastPlayedIndex() / findNextMatchIndex()", () => {
  it("finds the last row with a result", () => {
    expect(findLastPlayedIndex(CALENDAR)).toBe(0);
    expect(findLastPlayedIndex([{ is_played: true }, { score: "1 - 0" }, {}])).toBe(1);
    expect(findLastPlayedIndex([{}, {}])).toBe(-1);
    expect(findLastPlayedIndex(null)).toBe(-1);
  });

  it("skips a past match that is still waiting for its result", () => {
    // The old rule (first row without a score) answered 1, the 26/09 match.
    expect(findNextMatchIndex(CALENDAR, NOW)).toBe(2);
  });

  it("keeps a match that has just started or ended as the next one for the grace period", () => {
    const justEnded = [ROW_PLAYED, { ...ROW_PENDING, date: ago(2) }, ROW_NEXT];
    expect(findNextMatchIndex(justEnded, NOW)).toBe(1);
  });

  it("falls back to the first row without a result when only past ones are left", () => {
    const allPast = [ROW_PLAYED, { ...ROW_PENDING, date: ago(30) }, { ...ROW_NEXT, date: ago(10) }];
    expect(findNextMatchIndex(allPast, NOW)).toBe(1);
  });

  it("is -1 when every match has a result, or there is no calendar", () => {
    expect(findNextMatchIndex([ROW_PLAYED], NOW)).toBe(-1);
    expect(findNextMatchIndex([], NOW)).toBe(-1);
    expect(findNextMatchIndex(undefined, NOW)).toBe(-1);
  });

  it("does not change anything when every past match has its result", () => {
    const upToDate = [ROW_PLAYED, { ...ROW_PENDING, score: "27 - 51", is_played: true }, ROW_NEXT];
    expect(findNextMatchIndex(upToDate, NOW)).toBe(2);
  });
});

// ---------------------------------------------------------------------------
describe("findCalendarIndex()", () => {
  it("finds a row by match number, as a string or a number", () => {
    expect(findCalendarIndex(CALENDAR, { matchNumber: "11549" })).toBe(2);
    expect(findCalendarIndex(CALENDAR, { matchNumber: 11549 })).toBe(2);
  });

  it("falls back to the start time when there is no match number", () => {
    expect(findCalendarIndex(CALENDAR, { dateStr: ROW_NEXT.date })).toBe(2);
    expect(findCalendarIndex(CALENDAR, { matchNumber: "", dateStr: ROW_PENDING.date })).toBe(1);
  });

  it("compares times, not strings (same instant, different notation)", () => {
    expect(findCalendarIndex(CALENDAR, { dateStr: "2026-10-10T13:30:00+02:00" })).toBe(2);
  });

  it("prefers the match number over the date", () => {
    expect(findCalendarIndex(CALENDAR, { matchNumber: "11591", dateStr: ROW_PLAYED.date })).toBe(3);
  });

  it("falls back to the date when the number matches no row", () => {
    expect(findCalendarIndex(CALENDAR, { matchNumber: "99999", dateStr: ROW_NEXT.date })).toBe(2);
  });

  it("is -1 when nothing matches, with no arguments, or without a calendar", () => {
    expect(findCalendarIndex(CALENDAR, { matchNumber: "1", dateStr: "unknown" })).toBe(-1);
    expect(findCalendarIndex(CALENDAR)).toBe(-1);
    expect(findCalendarIndex(null, { matchNumber: "11549" })).toBe(-1);
  });
});

// ---------------------------------------------------------------------------
describe("computeViewModel(): the match shown and the chevrons agree", () => {
  it("starts on the match the sensors describe, with chevrons relative to it", () => {
    const vm = viewModel();

    expect(vm.currentIndex).toBe(2);
    expect(vm.opponentName).toContain("BISCARROSSE");
    expect(vm.canGoPrev).toBe(true);
    expect(vm.canGoNext).toBe(true);
    expect(vm.isResultPending).toBe(false);
  });

  it("marks the past match without a result as pending, not as upcoming", () => {
    const vm = viewModel({ matchIndex: 1 });

    expect(vm.isPostMatch).toBe(false);
    expect(vm.isResultPending).toBe(true);
    expect(vm.isCalendarClickable).toBe(false); // no "add to calendar" for a past match
  });

  it("does not mark a played match, or one still to come", () => {
    expect(viewModel({ matchIndex: 0 }).isResultPending).toBe(false);
    expect(viewModel({ matchIndex: 3 }).isResultPending).toBe(false);
    expect(viewModel({ matchIndex: 3 }).isCalendarClickable).toBe(true);
  });

  it("leaves a row the integration flags as stale to the existing postponed badge", () => {
    const stale = [ROW_PLAYED, { ...ROW_PENDING, is_stale: true }];
    const vm = computeViewModel({
      entities: entitiesFor(stale, { nextAttrs: { match_number: "11527" }, nextState: ROW_PENDING.date }),
      config: { entity: "sensor.x_poule" },
      lang: "fr",
      now: NOW,
      states: {},
      matchIndex: 1,
    });

    expect(vm.isStale).toBe(true);
    expect(vm.isResultPending).toBe(false);
  });

  it("is never pending while a match is live", () => {
    const entities = { ...entitiesFor(CALENDAR), matchInProgress: st("on") };

    expect(computeViewModel({ entities, config: { entity: "sensor.x_poule" }, now: NOW, states: {}, matchIndex: 1 }).isResultPending).toBe(false);
  });

  it("aligns the last-match view too, on the last played match", () => {
    const vm = viewModel({ manualView: "last" });

    expect(vm.currentIndex).toBe(0);
    expect(vm.isPostMatch).toBe(true);
  });

  it("works with an older integration that exposes no match number, through the date", () => {
    const vm = viewModel({
      entities: entitiesFor(CALENDAR, { nextAttrs: {}, nextState: ROW_NEXT.date }),
    });

    expect(vm.currentIndex).toBe(2);
  });

  it("falls back to the calendar rule when neither number nor date identify a row", () => {
    const vm = viewModel({
      entities: entitiesFor(CALENDAR, { nextAttrs: {}, nextState: "unknown" }),
    });

    expect(vm.currentIndex).toBe(2); // first row not waiting for a result, not row 1
  });

  it("changes nothing when every past match has its result", () => {
    const upToDate = [ROW_PLAYED, { ...ROW_PENDING, score: "27 - 51", is_played: true }, ROW_NEXT, ROW_LATER];
    const vm = viewModel({ entities: entitiesFor(upToDate) });

    expect(vm.currentIndex).toBe(2);
    expect(vm.isResultPending).toBe(false);
    expect(viewModel({ entities: entitiesFor(upToDate), matchIndex: 1 }).isResultPending).toBe(false);
  });
});

// ---------------------------------------------------------------------------
describe("the rendered card", () => {
  const ENTITY = "sensor.ujsbp_u13m_poule";
  const states = {
    [ENTITY]: st("D2 Poule B", { team: "UNION JEUN SP BUGLOSE PONTONX", competition: "Départementale U13", calendar: CALENDAR }),
    "sensor.ujsbp_u13m_prochain_match_date": st(ROW_NEXT.date, { round: "3", match_number: "11549" }),
    "sensor.ujsbp_u13m_prochain_match_adversaire": st("BISCARROSSE OLYMPIQUE BASKET - 1", { is_home: false }),
    "sensor.ujsbp_u13m_dernier_match_score": st("51 - 46", { is_home: true }),
    "sensor.ujsbp_u13m_dernier_match_date": st(ROW_PLAYED.date, { round: "1", match_number: "11507" }),
    "sensor.ujsbp_u13m_dernier_match_adversaire": st("MAGESCQ BASKET"),
    "binary_sensor.ujsbp_u13m_match_en_cours": st("off"),
  };

  async function mount(language = "fr-FR") {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: ENTITY });
    el.hass = { states, locale: { language } };
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }
  const click = async (el, side) => {
    el.shadowRoot.querySelector(`.nav-chevron-${side}`).click();
    await el.updateComplete;
  };
  const text = (el) => el.shadowRoot.textContent;

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"], now: NOW });
  });
  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = "";
  });

  it("replays the reported sequence: previous no longer skips the match without a result", async () => {
    const el = await mount();
    expect(text(el)).toContain("BISCARROSSE");
    expect(el.shadowRoot.querySelector(".badge-pending")).toBeNull();

    await click(el, "left");
    expect(text(el)).toContain("BIAUDOS");
    expect(el.shadowRoot.querySelector(".badge-pending").textContent.trim()).toBe("Résultat en attente");
    expect(el.shadowRoot.querySelector(".badge-gameday")).toBeNull();

    await click(el, "left");
    expect(text(el)).toContain("MAGESCQ");
    expect(text(el)).toContain("51");
    expect(el.shadowRoot.querySelector(".badge-pending")).toBeNull();

    await click(el, "right");
    await click(el, "right");
    expect(text(el)).toContain("BISCARROSSE");
    expect(el.shadowRoot.querySelector(".badge-pending")).toBeNull();
  });

  it("labels the badge in English", async () => {
    const el = await mount("en-US");
    await click(el, "left");

    expect(el.shadowRoot.querySelector(".badge-pending").textContent.trim()).toBe("Result pending");
  });

  it("highlights the real next match in the season schedule, and labels the pending one", async () => {
    const el = await mount();
    el._openModal("calendar");
    await el.updateComplete;

    const rows = [...el.shadowRoot.querySelectorAll(".calendar-row")];
    expect(rows).toHaveLength(4);
    const next = rows.filter((row) => row.classList.contains("next-match-row"));
    expect(next).toHaveLength(1);
    expect(next[0].textContent).toContain("BISCARROSSE");

    const pending = rows[1];
    expect(pending.textContent).toContain("BIAUDOS");
    expect(pending.querySelector(".cal-pending").textContent.trim()).toBe("En attente");
    expect(pending.querySelector(".cal-time")).toBeNull();
    expect(rows[2].querySelector(".cal-pending")).toBeNull();
    expect(rows[2].querySelector(".cal-time")).not.toBeNull();
  });

  it("tapping the pending row in the schedule opens that match with the badge", async () => {
    const el = await mount();
    el._openModal("calendar");
    await el.updateComplete;

    el.shadowRoot.querySelectorAll(".calendar-row")[1].click();
    await el.updateComplete;

    expect(text(el)).toContain("BIAUDOS");
    expect(el.shadowRoot.querySelector(".badge-pending")).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// The sensors and the card's own rule can disagree about the next match. The
// integration lets users keep a match as "next" for up to 6 hours after its
// start (live window option) while the card calls it pending after 3: the
// card must still start from the match it is actually showing.
describe("when the sensors keep a finished match as the next one", () => {
  const ENTITY = "sensor.ujsbp_u13m_poule";
  const JUST_ENDED = { ...ROW_PENDING, date: ago(4) }; // 4 h ago: pending for the card, still "next" for the sensor
  const calendar = [ROW_PLAYED, JUST_ENDED, ROW_NEXT];
  const states = {
    [ENTITY]: st("D2 Poule B", { team: "UNION JEUN SP BUGLOSE PONTONX", calendar }),
    "sensor.ujsbp_u13m_prochain_match_date": st(JUST_ENDED.date, { round: "2", match_number: "11527" }),
    "sensor.ujsbp_u13m_prochain_match_adversaire": st("BASKET BIAUDOS ST MARTIN DE SEIG", { is_home: false }),
    "sensor.ujsbp_u13m_dernier_match_score": st("51 - 46", { is_home: true }),
    "sensor.ujsbp_u13m_dernier_match_date": st(ROW_PLAYED.date, { round: "1", match_number: "11507" }),
    "sensor.ujsbp_u13m_dernier_match_adversaire": st("MAGESCQ BASKET"),
  };

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"], now: NOW });
  });
  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = "";
  });

  it("starts the chevrons from the match the sensors describe, not from the card's own next match", () => {
    const vm = computeViewModel({
      entities: entitiesFor(calendar, { nextAttrs: { match_number: "11527" }, nextState: JUST_ENDED.date }),
      config: { entity: "sensor.x_poule", default_match_view: "auto" },
      lang: "fr",
      now: NOW,
      states: {},
    });

    expect(findNextMatchIndex(calendar, NOW)).toBe(2); // the card's rule says Biscarrosse...
    expect(vm.currentIndex).toBe(1); // ...but the match on screen is the one at index 1
  });

  it("makes the previous chevron move to the previous match instead of doing nothing", async () => {
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: ENTITY });
    el.hass = { states, locale: { language: "fr-FR" } };
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.textContent).toContain("BIAUDOS");

    el.shadowRoot.querySelector(".nav-chevron-left").click();
    await el.updateComplete;

    expect(el.shadowRoot.textContent).toContain("MAGESCQ");
  });

  it("shows a pending match that is also today with the pending badge, not 'Game day'", async () => {
    // 06:00 UTC today, 6 hours before "now": over, but still today's date.
    const today = { ...ROW_PENDING, date: "2026-10-02T06:00:00+00:00" };
    const Card = customElements.get("ffbb-tracker-card");
    const el = new Card();
    el.setConfig({ entity: ENTITY });
    el.hass = {
      states: {
        ...states,
        [ENTITY]: st("D2 Poule B", { team: "UNION JEUN SP BUGLOSE PONTONX", calendar: [ROW_PLAYED, today, ROW_NEXT] }),
        "sensor.ujsbp_u13m_prochain_match_date": st(ROW_NEXT.date, { round: "3", match_number: "11549" }),
        "sensor.ujsbp_u13m_prochain_match_adversaire": st("BISCARROSSE OLYMPIQUE BASKET - 1", { is_home: false }),
      },
      locale: { language: "fr-FR" },
    };
    document.body.appendChild(el);
    await el.updateComplete;

    el.shadowRoot.querySelector(".nav-chevron-left").click();
    await el.updateComplete;

    expect(el.shadowRoot.querySelector(".badge-pending")).not.toBeNull();
    expect(el.shadowRoot.querySelector(".badge-gameday")).toBeNull();
  });
});
