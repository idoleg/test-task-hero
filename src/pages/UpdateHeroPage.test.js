import React from "react";
import { shallow } from "enzyme";
import UpdateHeroPage from "./UpdateHeroPage";
import HeroForm from "../components/HeroForm";

describe("<UpdateHeroPage />", () => {
  const props = {
    hero: { id: 1, name: "Hero #1", description: "Descr #1" },
    onUpdateHero: jest.fn(),
    isLoading: false,
    error: false
  };

  const wrapper = shallow(<UpdateHeroPage {...props} />);

  it("renders update page", () => {
    expect(
      wrapper.contains(
        <h3>
          Update the hero <b>{props.hero.name}</b>
        </h3>
      )
    ).toBe(true);
    expect(
      wrapper.contains(
        <HeroForm
          onSubmit={props.onUpdateHero}
          inputName={props.hero.name}
          inputDescription={props.hero.description}
          btnText="Update hero"
          isLoading={props.isLoading}
          error={props.error}
        />
      )
    ).toBe(true);
  });

  it("get empty information about hero", () => {
    wrapper.setProps({ hero: null });
    expect(wrapper.contains(<p>Hero is loading...</p>)).toBe(true);
  });
});
