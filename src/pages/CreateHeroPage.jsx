import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import HeroForm from "../components/HeroForm";

/**
 * Hero creation page
 * @param {function} props.onCreateHero
 * @param {Boolean} props.isLoading
 * @param {Boolean|Object} props.error
 * @return {React.ReactElement}
 */
function CreateHeroPage({ onCreateHero, isLoading, error }) {
  return (
    <>
      <h3>Create a new hero</h3>
      <HeroForm
        onSubmit={onCreateHero}
        btnText="Create hero"
        isLoading={isLoading}
        error={error}
      />
      <Link to="/">Back to the list of heroes</Link>
    </>
  );
}

CreateHeroPage.propTypes = {
  onCreateHero: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired
};

export default memo(CreateHeroPage);
