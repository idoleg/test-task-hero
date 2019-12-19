import React from "react";
import { mount } from "enzyme";
import HeroForm from "./HeroForm";

describe("<HeroForm />", () => {
  const props = {
    onSubmit: jest.fn(),
    btnText: "Text on submit button",
    inputName: "Value in name input",
    inputDescription: "Value in description textarea",
    isLoading: false,
    error: false
  };
  const userSimulationInputForName = "Hero name!";

  const wrapper = mount(<HeroForm {...props} />);

  it("renders form with getting props", () => {
    expect(wrapper.find("input#name").prop("value")).toEqual(props.inputName);
    expect(wrapper.find("textarea#description").prop("value")).toEqual(
      props.inputDescription
    );
    expect(wrapper.find("input[type='submit']").prop("value")).toEqual(
      props.btnText
    );
  });

  it("simulates user input and check the warning for user about change", () => {
    expect(wrapper.contains(<b>Your changes are not save</b>)).toBe(false);
    wrapper
      .find("input#name")
      .simulate("change", { target: { value: userSimulationInputForName } });
    expect(wrapper.contains(<b>Your changes are not save</b>)).toBe(true);
  });

  it("dispatches the `onSubmit()` props it submits the form data", () => {
    expect(props.onSubmit).toHaveBeenCalledTimes(0);
    wrapper.find("form").simulate("submit", new Event("submit"));
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
    expect(props.onSubmit).toHaveBeenCalledWith({
      name: userSimulationInputForName,
      description: props.inputDescription
    });
  });

  it("disables button and shows notice while changes are loading", () => {
    expect(wrapper.contains(<span>Your hero is saving...</span>)).toBe(false);
    expect(wrapper.find("input[type='submit']").prop("disabled")).toBe(false);
    wrapper.setProps({ isLoading: true });
    expect(wrapper.contains(<span>Your hero is saving...</span>)).toBe(true);
    expect(wrapper.find("input[type='submit']").prop("disabled")).toBe(true);
  });
});
