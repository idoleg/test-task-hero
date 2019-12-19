import React from "react";
import { shallow } from "enzyme";
import CreateHeroPage from "./CreateHeroPage";
import HeroForm from "../components/HeroForm";

describe("<CreateHeroPage />", () => {
  const props = {
    onCreateHero: jest.fn(),
    isLoading: false,
    error: false
  };

  const wrapper = shallow(<CreateHeroPage {...props} />);

  it("renders delete page", () => {
    expect(wrapper.contains(<h3>Create a new hero</h3>)).toBe(true);
    expect(
      wrapper.contains(
        <HeroForm
          onSubmit={props.onCreateHero}
          btnText="Create hero"
          isLoading={props.isLoading}
          error={props.error}
        />
      )
    ).toBe(true);
  });
});
