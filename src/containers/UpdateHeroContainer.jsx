import UpdateHeroPage from "../pages/UpdateHeroPage";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateHero } from "../store/heroActions";

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
  bindActionCreators({ updateHero }, dispatch);

const mergeProps = (stateProps, dispatchProps) => {
  /**
   * Update the hero to the store and redirect to the hero update page
   * @param {object} hero
   */
  function handleUpdateHero(hero) {
    dispatchProps.updateHero({ ...hero, id: stateProps.id });
  }

  return {
    ...stateProps,
    ...dispatchProps,
    onUpdateHero: handleUpdateHero
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(UpdateHeroPage);
