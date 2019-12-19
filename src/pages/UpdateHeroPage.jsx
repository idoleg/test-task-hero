import React, { memo } from "react";
import PropTypes from "prop-types";
import HeroForm from "../components/HeroForm";
import { Link } from "react-router-dom";

/**
 * Hero update page
 * @param {Object} props.hero
 * @param {function} props.onUpdateHero
 * @param {Boolean} props.isLoading
 * @param {Boolean|Object} props.error
 * @return {React.ReactElement}
 */
export function UpdateHeroPage({ hero, onUpdateHero, isLoading, error }) {
  return (
    <>
      <h3>
        Update the hero <b>{hero && hero.name}</b>
      </h3>
      {hero ? (
        <HeroForm
          onSubmit={onUpdateHero}
          inputName={hero.name}
          inputDescription={hero.description}
          btnText="Update hero"
          isLoading={isLoading}
          error={error}
        />
      ) : (
        <p>Hero is loading</p>
      )}
      <Link to="/">Back to the list of heroes</Link>
    </>
  );
}

UpdateHeroPage.propTypes = {
  onUpdateHero: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired
};

export default memo(UpdateHeroPage);
