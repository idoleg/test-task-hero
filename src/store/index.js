import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import heroReducers from "./heroReducers";
import { HeroApi } from "../api/HeroApi";

const reducer = combineReducers({ heroes: heroReducers });
const composeEnhancers =
  (typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const enhancer = composeEnhancers(
  applyMiddleware(ReduxThunk.withExtraArgument({ HeroApi, localStorage }))
);

/**
 * Create new store with init state and reducers
 * @param {Object} preloadedState Init state for store
 * @return {Store}
 */
export function configureStore(preloadedState = {}) {
  return createStore(reducer, preloadedState, enhancer);
}
