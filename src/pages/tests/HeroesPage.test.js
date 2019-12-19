import React from "react";
import { shallow } from "enzyme";
import HeroesPage from "../HeroesPage";
import ListOfHeroes from "../../components/ListOfHeroes";

describe("<HeroesPage />", () => {
  const props = {
    heroes: [{ id: 1, name: "Hero #1", description: "Descr #1" }],
    isLoading: false,
    error: false
  };

  const wrapper = shallow(<HeroesPage {...props} />);

  it("renders heroes page", () => {
    expect(wrapper.contains(<h3>List of aviable heroes</h3>)).toBe(true);
    expect(wrapper.contains(<ListOfHeroes heroes={props.heroes} />)).toBe(true);
  });

  it("load information about heroes", () => {
    wrapper.setProps({ isLoading: true });
    expect(wrapper.contains(<p>Heroes is loading...</p>)).toBe(true);
  });
});
