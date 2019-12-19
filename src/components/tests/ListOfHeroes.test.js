import React from "react";
import { shallow } from "enzyme";
import { ListOfHeroes } from "../ListOfHeroes";
import Hero from "../Hero";

describe("<ListOfHeroes />", () => {
  const heroes = [
    { id: 1, name: "Hero #1", description: "Descr #1" },
    { id: 2, name: "Hero #2", description: "Descr #2" }
  ];
  const wrapper = shallow(<ListOfHeroes heroes={heroes} />);

  it("renders the list of hero", () => {
    heroes.map(hero => {
      expect(wrapper.contains(<Hero {...hero} />)).toBe(true);
    });
  });
});
