import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import ComparationCard from "@ng_consult/hotels/components/ComparationCard.vue";

describe("HotelCard Component", () => {
  const defaultProps = {
    isComparing: false,
    id: 1,
    name: "Hotel Exemplo",
    description: "Um ótimo lugar para descansar.",
    photo: "https://via.placeholder.com/300x200",
    location: "Praia do Sol",
    rating: 4.5,
    guests: 4,
    rooms: 2,
    bathrooms: 1,
    suite: 1,
    area: 120,
    price: "200,00",
    amenities: ["Estacionamento", "Wi-Fi", "Piscina"],
  };

  beforeEach(() => {
    vi.stubGlobal("navigateTo", vi.fn());
  });

  it("renders the hotel name, location, and rating correctly", () => {
    const wrapper = mount(ComparationCard, {
      props: defaultProps,
    });

    expect(wrapper.text()).toContain(defaultProps.name);
    expect(wrapper.text()).toContain(defaultProps.location);
    expect(wrapper.text()).toContain(defaultProps.rating.toString());
  });

  it("renders the list of details correctly", () => {
    const wrapper = mount(ComparationCard, {
      props: defaultProps,
    });

    const details = wrapper.findAll("ul > li");
    expect(details.length).toBeGreaterThan(0);

    if (defaultProps.location) {
      expect(wrapper.text()).toContain(defaultProps.location);
    }

    if (defaultProps.rating) {
      expect(wrapper.text()).toContain(defaultProps.rating.toString());
    }

    if (defaultProps.description) {
      expect(wrapper.text()).toContain(defaultProps.description);
    }
  });

  it("renders the list of amenities correctly", () => {
    const wrapper = mount(ComparationCard, {
      props: defaultProps,
    });

    defaultProps.amenities.forEach((amenity) => {
      expect(wrapper.text()).toContain(amenity);
    });
  });
});
