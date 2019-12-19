import React from "react";
import { Link } from "react-router-dom";
import { shallow } from "enzyme";
import Hero from "./Hero";

describe("<Hero />", () => {
  const props = {
    id: 1,
    name: "Hero name",
    description: "Hero descr"
  };
  const wrapper = shallow(<Hero {...props} />);

  it("renders with name", () => {
    expect(wrapper.contains(<strong>{props.name}:</strong>)).toBe(true);
  });

  it("renders controls link with right url", () => {
    expect(wrapper.contains(<Link to={"/update/" + props.id}>Edit</Link>)).toBe(
      true
    );
    expect(
      wrapper.contains(<Link to={"/delete/" + props.id}>Delete</Link>)
    ).toBe(true);
  });
});
