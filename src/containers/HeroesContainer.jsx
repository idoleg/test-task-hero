import React, { useEffect } from "react";
import HeroesPage from "../pages/HeroesPage";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchHeroes } from "../store/heroActions";

/**
 * @param {function} props.fetchHeroes
 * @param {function} props.heroes
 * @param {Boolean} props.isLoading
 * @param {Boolean|Object} props.error
 * @return {React.ReactElement}
 */
function HeroesContainer({ fetchHeroes, heroes, isLoading, error }) {
  // Fetch heroes, if they are not already loaded. This effect will work once.
  useEffect(() => {
    fetchHeroes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <HeroesPage heroes={heroes} isLoading={isLoading} error={error} />;
}

const mapStateToProps = state => {
  return {
    heroes: state.heroes.items,
    isLoading: state.heroes.isLoading,
    error: state.heroes.error
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchHeroes }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HeroesContainer);
