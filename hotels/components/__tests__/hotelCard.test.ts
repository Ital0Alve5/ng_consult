import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import HotelCard from "@ng_consult/hotels/components/HotelCard.vue";

describe("HotelCard Component", () => {
  const defaultProps = {
    isComparing: false,
    id: 1,
    name: "Hotel Exemplo",
    photo: "https://via.placeholder.com/300x200",
    location: "Praia do Sol",
    rating: 4.5,
    guests: 4,
    rooms: 2,
    price: "200,00",
    amenities: ["Wi-Fi", "Piscina", "Estacionamento"],
  };

  beforeEach(() => {
    vi.stubGlobal("navigateTo", vi.fn());
  });

  it("renders hotel name, location, and rating correctly", () => {
    const wrapper = mount(HotelCard, {
      props: defaultProps,
    });

    expect(wrapper.text()).toContain(defaultProps.name);
    expect(wrapper.text()).toContain(defaultProps.location);
    expect(wrapper.text()).toContain(defaultProps.rating.toString());
  });

  it("renders the list of amenities correctly", () => {
    const wrapper = mount(HotelCard, {
      props: defaultProps,
      isComparing: true,
    });

    defaultProps.amenities.forEach((amenitie) => {
      expect(wrapper.text()).toContain(amenitie);
    });
  });

  it("renders the price correctly", () => {
    const wrapper = mount(HotelCard, {
      props: defaultProps,
      isComparing: true,
    });

    expect(wrapper.text()).toContain(`${defaultProps.price}/noite`);
  });

  it("render the checkbox when is comparing", async () => {
    const wrapper = mount(HotelCard, {
      props: {
        ...defaultProps,
        isComparing: true,
      },
    });

    const checkbox = wrapper.find("checkbox");
    expect(checkbox.exists()).toBe(true);
  });
});
