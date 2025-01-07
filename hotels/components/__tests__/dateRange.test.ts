import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import DateRange from "@ng_consult/hotels/components/DateRange.vue";
import { CalendarDate, getLocalTimeZone } from "@internationalized/date";

describe("DateRange Component", () => {
  const todayDate = new Date();
  const todayMonth = todayDate.getMonth() + 1;
  const todayYear = todayDate.getFullYear();
  const todayDay = todayDate.getDate();

  const defaultValue = {
    start: new CalendarDate(todayYear, todayMonth, todayDay),
    end: new CalendarDate(todayYear, todayMonth, todayDay).add({ days: 20 }),
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the component with default values", () => {
    const wrapper = mount(DateRange, {
      props: {
        modelValue: defaultValue,
      },
    });

    expect(wrapper.text()).toContain("Check-in - Check-out");
    expect(wrapper.text()).toContain(
      new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(
        defaultValue.start.toDate(getLocalTimeZone())
      )
    );
    expect(wrapper.text()).toContain(
      new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(
        defaultValue.end.toDate(getLocalTimeZone())
      )
    );
  });

  it("shows the calendar when the button is clicked", async () => {
    const wrapper = mount(DateRange, {
      props: {
        modelValue: defaultValue,
      },
    });

    const button = wrapper.find("button");
    expect(button.exists()).toBe(true);

    await button.trigger("click");
    const calendar = wrapper.find("lazyrangecalendar");
    expect(calendar.exists()).toBe(true);
  });

  it("displays the placeholder with the default date range", () => {
    const today = new Date();
    const todayDate = new CalendarDate(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );
    const endDate = todayDate.add({ days: 20 });

    const formattedStart = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "medium",
    }).format(todayDate.toDate(getLocalTimeZone()));
    const formattedEnd = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "medium",
    }).format(endDate.toDate(getLocalTimeZone()));

    const wrapper = mount(DateRange, {
      props: {
        modelValue: { start: todayDate, end: endDate },
      },
    });

    const button = wrapper.find("button");
    expect(button.text()).toContain(`${formattedStart} - ${formattedEnd}`);
  });
});
