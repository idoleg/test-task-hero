import React, { useEffect } from "react";
import CreateHeroPage from "../pages/CreateHeroPage";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchHeroes, createHero } from "../store/heroActions";
import { useHistory } from "react-router-dom";

/**
 * @param {function} props.fetchHeroes
 * @param {function} props.createHero
 * @param {Boolean} props.isLoading
 * @param {Boolean|Object} props.error
 * @return {React.ReactElement}
 */
function CreateHeroContainer({ fetchHeroes, createHero, isLoading, error }) {
  const history = useHistory();
  // Fetch heroes, if they are not already loaded. This effect will work once.
  useEffect(() => {
    fetchHeroes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Add the hero to the store and redirect to the hero update page
   * @param {object} hero
   */
  function handleCreateHero(hero) {
    createHero(hero, hero => history.push("/update/" + hero.id));
  }

  return (
    <CreateHeroPage
      onCreateHero={handleCreateHero}
      isLoading={isLoading}
      error={error}
    />
  );
}

const mapStateToProps = state => {
  return {
    heroes: state.heroes.items,
    isLoading: state.heroes.isLoading,
    error: state.heroes.error
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchHeroes, createHero }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateHeroContainer);
