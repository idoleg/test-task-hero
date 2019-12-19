import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";

/**
 * Draw and handle form for create or update the hero.
 * @param {function} props.onSubmit Handle submit event
 * @param {String} [props.btnText] Text of the submit button.
 * @param {String} [props.inputName] Value for name input.
 * @param {String} [props.inputDescription] Value for description input.
 * @param {Boolean} props.isLoading
 * @param {Boolean|Object} props.error
 * @return {React.ReactElement}
 */
function HeroForm({
  onSubmit,
  btnText,
  inputName,
  inputDescription,
  isLoading,
  error
}) {
  const [name, updateName] = useState(inputName);
  const [description, updateDescription] = useState(inputDescription);
  const [notSave, setNotSaveStatus] = useState(false);

  // If the user made changes and did not save them, show a warning
  useEffect(() => {
    if (inputName !== name || inputDescription !== description) {
      setNotSaveStatus(true);
    } else if (inputName === name && inputDescription === description) {
      setNotSaveStatus(false);
    }
  }, [inputName, name, description, inputDescription]);

  /**
   * Handle form submit
   * @param {React.SyntheticEvent} event
   */
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ name, description });
  }

  return (
    <form onSubmit={handleSubmit}>
      <dl>
        <dt>
          <label htmlFor="name">Hero name:</label>
        </dt>
        <dd>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => updateName(e.target.value)}
          />
        </dd>
        <dt>
          <label htmlFor="description">Description of hero:</label>
        </dt>
        <dd>
          <textarea
            cols="70"
            rows="10"
            id="description"
            value={description}
            onChange={e => updateDescription(e.target.value)}
          />
        </dd>
        <dd>
          <input type="submit" value={btnText} disabled={isLoading} />{" "}
          {isLoading && <span>Your hero is saving...</span>}
          {notSave && !isLoading && <b>Your changes are not save</b>}
          {error && <p>Something goes wrong. Try again later. </p>}
        </dd>
      </dl>
    </form>
  );
}

HeroForm.defaultProps = {
  btnText: "Submit",
  inputName: "",
  inputDescription: ""
};

HeroForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  btnText: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputDescription: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired
};

export default memo(HeroForm);
