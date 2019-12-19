import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HeroesContainer from "./containers/HeroesContainer";
import CreateHeroContainer from "./containers/CreateHeroContainer";
import UpdateHeroContainer from "./containers/UpdateHeroContainer";
import DeleteHeroContainer from "./containers/DeleteHeroContainer";
import { configureStore } from "./store";
import { fetchHeroes } from "./store/heroActions";

const store = configureStore();

// Init store
store.dispatch(fetchHeroes());

/**
 * Main component of the application
 * Сonnecting store and create routes
 * @return {React.ReactElement}
 */
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HeroesContainer} />
          <Route exact path="/create" component={CreateHeroContainer} />
          <Route exact path="/update/:id" component={UpdateHeroContainer} />
          <Route exact path="/delete/:id" component={DeleteHeroContainer} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
