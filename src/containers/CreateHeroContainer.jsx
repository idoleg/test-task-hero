import CreateHeroPage from "../pages/CreateHeroPage";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createHero } from "../store/heroActions";

const mapStateToProps = (state, props) => {
  return {
    history: props.history,
    isLoading: state.heroes.isLoading,
    error: state.heroes.error
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createHero }, dispatch);

const mergeProps = (stateProps, dispatchProps) => {
  /**
   * Add the hero to the store and redirect to the hero update page
   * @param {Object} hero
   */
  function handleCreateHero(hero) {
    dispatchProps.createHero(hero, hero =>
      stateProps.history.push("/update/" + hero.id)
    );
  }

  return {
    ...stateProps,
    ...dispatchProps,
    onCreateHero: handleCreateHero
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CreateHeroPage);
