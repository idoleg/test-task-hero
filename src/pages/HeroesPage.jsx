import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ListOfHeroes from "../components/ListOfHeroes";
import { heroPropTypes } from "../components/Hero";

/**
 * Page with the list of heroes
 * @param {Array} props.heroes
 * @param {Boolean} props.isLoading
 * @param {Boolean|Object} props.error
 * @return {React.ReactElement}
 */
function HeroesPage({ heroes, isLoading, error }) {
  return (
    <>
      <h3>List of aviable heroes</h3>
      {isLoading ? (
        <p>Heroes is loading...</p>
      ) : (
        <ListOfHeroes heroes={heroes} />
      )}
      {error && <p>Something goes wrong</p>}
      <Link to="/create/">Create a new hero</Link>
    </>
  );
}

HeroesPage.propTypes = {
  heroes: PropTypes.arrayOf(PropTypes.shape(heroPropTypes)).isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired
};

export default memo(HeroesPage);
