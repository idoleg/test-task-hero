import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { heroPropTypes } from "../components/Hero";

/**
 * Hero deletion page
 * @param {Object} props.hero
 * @param {function} props.onDeleteHero
 * @param {function} props.onCancelDeleteHero
 * @param {Boolean} props.isLoading
 * @param {Boolean|Object} props.error
 * @return {React.ReactElement}
 */
function DeleteHeroPage({
  hero,
  onDeleteHero,
  onCancelDeleteHero,
  isLoading,
  error
}) {
  return (
    <>
      <h3>
        Delete the hero <strong>{hero && hero.name}</strong>
      </h3>
      {hero ? (
        <p>
          <span>
            Are you sure what you want to delete the hero{" "}
            <strong>{hero.name}</strong>?
          </span>{" "}
          <button id="cancel" onClick={onCancelDeleteHero}>
            No
          </button>{" "}
          <button id="delete" onClick={onDeleteHero}>
            Yes!
          </button>{" "}
          {isLoading && <span>Hero is deleting...</span>}
        </p>
      ) : (
        <p>Hero is loading</p>
      )}
      {error && <p>Something goes wrong. Try again later. </p>}
      <Link to="/">Back to the list of heroes</Link>
    </>
  );
}

DeleteHeroPage.propTypes = {
  hero: PropTypes.shape(heroPropTypes),
  onDeleteHero: PropTypes.func.isRequired,
  onCancelDeleteHero: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired
};

export default memo(DeleteHeroPage);
