import DeleteHeroPage from "../pages/DeleteHeroPage";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { deleteHero } from "../store/heroActions";

const mapStateToProps = (state, props) => {
  const id = parseInt(props.match.params.id);

  return {
    history: props.history,
    id,
    hero: state.heroes.items.find(item => item.id === id),
    isLoading: state.heroes.isLoading,
    error: state.heroes.error
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ deleteHero }, dispatch);

const mergeProps = (stateProps, dispatchProps) => {
  /**
   * Cancel delete the hero and redirect to the main page
   * @param {object} hero
   */
  function handleCancelDeleteHero(hero) {
    stateProps.history.push("/");
  }
  /**
   * Delete the hero and redirect to the main page
   * @param {object} hero
   */
  function handlelDeleteHero(hero) {
    dispatchProps.deleteHero(stateProps.id, () => stateProps.history.push("/"));
  }

  return {
    ...stateProps,
    ...dispatchProps,
    onCancelDeleteHero: handleCancelDeleteHero,
    onDeleteHero: handlelDeleteHero
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DeleteHeroPage);
