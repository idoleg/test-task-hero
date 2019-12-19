import React, { memo } from "react";
import Hero, { heroPropTypes } from "./Hero";
import PropTypes from "prop-types";

/**
 * Draw the list of heroes
 * @param {object} props.hero
 * @return {React.ReactElement}
 */
export function ListOfHeroes({ heroes }) {
  return (
    <ol>
      {heroes.map(hero => (
        <Hero key={hero.id} {...hero} />
      ))}
    </ol>
  );
}

ListOfHeroes.propTypes = {
  heroes: PropTypes.arrayOf(PropTypes.shape(heroPropTypes)).isRequired
};

export default memo(ListOfHeroes);
