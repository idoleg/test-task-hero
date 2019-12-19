import HeroesPage from "../pages/HeroesPage";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    heroes: state.heroes.items,
    isLoading: state.heroes.isLoading,
    error: state.heroes.error
  };
};

export default connect(mapStateToProps)(HeroesPage);
