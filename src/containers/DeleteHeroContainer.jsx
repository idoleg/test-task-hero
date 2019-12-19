import React, { useEffect } from "react";
import DeleteHeroPage from "../pages/DeleteHeroPage";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchHeroes, deleteHero } from "../store/heroActions";
import { useHistory } from "react-router-dom";

/**
 * @param {function} props.fetchHeroes
 * @param {function} props.deleteHero
 * @param {Number} props.id
 * @param {Object} props.hero
 * @param {Boolean} props.isLoading
 * @param {Boolean|object} props.error
 * @return {React.ReactElement}
 */
function DeleteHeroContainer({
  fetchHeroes,
  deleteHero,
  id,
  hero,
  isLoading,
  error
}) {
  const history = useHistory();
  // Fetch heroes, if they are not already loaded. This effect will work once.
  useEffect(() => {
    fetchHeroes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Cancel delete the hero and redirect to the main page
   * @param {object} hero
   */
  function handleCancelDeleteHero(hero) {
    history.push("/");
  }
  /**
   * Delete the hero and redirect to the main page
   * @param {object} hero
   */
  function handlelDeleteHero(hero) {
    deleteHero(id, () => history.push("/"));
  }

  return (
    <DeleteHeroPage
      hero={hero}
      onDeleteHero={handlelDeleteHero}
      onCancelDeleteHero={handleCancelDeleteHero}
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
  bindActionCreators({ fetchHeroes, deleteHero }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteHeroContainer);
