import React from "react";
import { shallow } from "enzyme";
import DeleteHeroPage from "../DeleteHeroPage";

describe("<DeleteHeroPage />", () => {
  const props = {
    hero: { id: 1, name: "Hero #1", description: "Descr #1" },
    onDeleteHero: jest.fn(),
    onCancelDeleteHero: jest.fn(),
    isLoading: false,
    error: false
  };

  const wrapper = shallow(<DeleteHeroPage {...props} />);

  it("renders delete page", () => {
    expect(
      wrapper.contains(
        <h3>
          Delete the hero <strong>{props.hero.name}</strong>
        </h3>
      )
    ).toBe(true);
  });

  it("dispatches the `onDeleteHero()` props when clicked on Yes button", () => {
    expect(props.onDeleteHero).toHaveBeenCalledTimes(0);
    wrapper.find("button#delete").simulate("click", new Event("click"));
    expect(props.onDeleteHero).toHaveBeenCalledTimes(1);
  });

  // eslint-disable-next-line max-len
  it("dispatches the `onCancelDeleteHero()` props when clicked on No button", () => {
    expect(props.onCancelDeleteHero).toHaveBeenCalledTimes(0);
    wrapper.find("button#cancel").simulate("click", new Event("click"));
    expect(props.onCancelDeleteHero).toHaveBeenCalledTimes(1);
  });

  it("load information about hero", () => {
    wrapper.setProps({ isLoading: true });
    expect(wrapper.contains(<span>Hero is deleting...</span>)).toBe(true);
  });
});
