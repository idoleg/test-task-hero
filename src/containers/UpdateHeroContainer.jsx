import React, { useEffect } from "react";
import UpdateHeroPage from "../pages/UpdateHeroPage";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchHeroes, updateHero } from "../store/heroActions";

/**
 * @param {function} props.fetchHeroes
 * @param {function} props.updateHero
 * @param {Number} props.id
 * @param {Object} props.hero
 * @param {Boolean} props.isLoading
 * @param {Boolean|Object} props.error
 * @return {React.ReactElement}
 */
function UpdateHeroContainer({
  fetchHeroes,
  updateHero,
  id,
  hero,
  isLoading,
  error
}) {
  // Fetch heroes, if they are not already loaded. This effect will work once.
  useEffect(() => {
    fetchHeroes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Update the hero to the store and redirect to the hero update page
   * @param {object} hero
   */
  function handleUpdateHero(hero) {
    updateHero({ ...hero, id });
  }
  return (
    <UpdateHeroPage
      hero={hero}
      onUpdateHero={handleUpdateHero}
      isLoading={isLoading}
      error={error}
    />
  );
}

const mapStateToProps = (state, props) => {
  const id = parseInt(props.match.params.id);

  return {
    id,
    hero: state.heroes.items.find(item => item.id === id),
    isLoading: state.heroes.isLoading,
    error: state.heroes.error
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchHeroes, updateHero }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateHeroContainer);
