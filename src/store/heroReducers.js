import { handleActions, combineActions } from "redux-actions";
import {
  requestHeroes,
  receiveHeroes,
  addingHero,
  addHero,
  changingHero,
  changeHero,
  removingHero,
  removeHero
} from "./heroActions";

const defaultState = {
  items: [],
  isLoading: false,
  error: false
};

export default handleActions(
  {
    [combineActions(
      requestHeroes,
      addingHero,
      changingHero,
      removingHero
    )]: state => {
      return { ...state, isLoading: true, isError: false };
    },
    [receiveHeroes]: (state, { payload: { heroes, isLoading, error } }) => {
      return { items: heroes, isLoading, error };
    },
    [addHero]: (state, { payload: { hero, isLoading, error } }) => {
      return {
        items: [...state.items, hero],
        isLoading,
        error
      };
    },
    [changeHero]: (state, { payload: { hero, isLoading, error } }) => {
      const indexOfHero = state.items.findIndex(item => item.id === hero.id);
      return {
        items: [
          ...state.items.slice(0, indexOfHero),
          hero,
          ...state.items.slice(indexOfHero + 1)
        ],
        isLoading,
        error
      };
    },
    [removeHero]: (state, { payload: { id, isLoading, error } }) => {
      const indexOfHero = state.items.findIndex(item => item.id === id);
      return {
        items: [
          ...state.items.slice(0, indexOfHero),
          ...state.items.slice(indexOfHero + 1)
        ],
        isLoading,
        error
      };
    }
  },
  defaultState
);
