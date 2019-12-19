import { createActions } from "redux-actions";
const STORAGE_NAME = "heroes";

export const {
  requestHeroes,
  receiveHeroes,
  addingHero,
  addHero,
  changingHero,
  changeHero,
  removingHero,
  removeHero
} = createActions({
  REQUEST_HEROES: () => ({}),
  RECEIVE_HEROES: (heroes, isLoading = false, error = false) => ({
    heroes,
    isLoading,
    error
  }),
  ADDING_HERO: () => ({}),
  ADD_HERO: (hero, isLoading = false, error = false) => ({
    hero,
    isLoading,
    error
  }),
  CHANGING_HERO: () => ({}),
  CHANGE_HERO: (hero, isLoading = false, error = false) => ({
    hero,
    isLoading,
    error
  }),
  REMOVING_HERO: () => ({}),
  REMOVE_HERO: (id, isLoading = false, error = false) => ({
    id,
    isLoading,
    error
  })
});

/**
 * Add the list of heroes to the store from server
 * If heroes id not saved in the browser local storage, fetch them from server.
 * @return {Promise}
 */
export function fetchHeroes() {
  return async (dispatch, getState, { HeroApi, localStorage }) => {
    try {
      // Check local storage
      const heroes = JSON.parse(localStorage.getItem(STORAGE_NAME));
      if (heroes === null) {
        throw new Error();
      }
      dispatch(receiveHeroes(heroes));
    } catch (err) {
      try {
        // If local storage is empty, fetch heroes from server
        dispatch(requestHeroes());
        const heroes = await HeroApi.getHeroes();
        dispatch(receiveHeroes(heroes));

        // And save them to the local storage
        saveHeroesToLocalStorage(localStorage, getState);
      } catch (err) {
        console.error(err);
        dispatch(receiveHeroes(null, false, err));
      }
    }
  };
}

/**
 * Create hero, save on the server and in local storage
 * @param {Object} hero
 * @param {function|null} callback
 * @return {Promise}
 */
export function createHero(hero, callback = null) {
  return async (dispatch, getState, { HeroApi, localStorage }) => {
    try {
      // Save new hero on server
      dispatch(addingHero());
      const savedHero = await HeroApi.postHero(hero);
      dispatch(addHero(savedHero));

      // Save heroes to the local storage
      saveHeroesToLocalStorage(localStorage, getState);

      // Call function after all actions
      callback && callback(savedHero);
    } catch (err) {
      console.error(err);
      dispatch(addHero(null, false, err));
    }
  };
}

/**
 * Update hero, save on the server and in local storage
 * @param {Object} hero
 * @param {function|null} callback
 * @return {Promise}
 */
export function updateHero(hero, callback = null) {
  return async (dispatch, getState, { HeroApi, localStorage }) => {
    try {
      // Send changes of the hero to server
      dispatch(changingHero());
      const savedHero = await HeroApi.putHero(hero);
      dispatch(changeHero(savedHero));

      // Save heroes to the local storage
      saveHeroesToLocalStorage(localStorage, getState);

      // Call function after all actions
      callback && callback(savedHero);
    } catch (err) {
      console.error(err);
      dispatch(changeHero(null, false, err));
    }
  };
}

/**
 * Update hero, save on the server and in local storage
 * @param {Number} id
 * @param {function|null} callback
 * @return {Promise}
 */
export function deleteHero(id, callback = null) {
  return async (dispatch, getState, { HeroApi, localStorage }) => {
    try {
      // Send request with delete the hero to server
      dispatch(removingHero());
      const savedHero = await HeroApi.deleteHero(id);
      dispatch(removeHero(savedHero));

      // Save heroes to the local storage
      saveHeroesToLocalStorage(localStorage, getState);

      // Call function after all actions
      callback && callback(id);
    } catch (err) {
      console.error(err);
      dispatch(removeHero(null, false, err));
    }
  };
}

/**
 * Save heroes list to the browser local storage
 * @param {Storage} localStorage
 * @param {getState} getState
 */
function saveHeroesToLocalStorage(localStorage, getState) {
  localStorage.setItem(STORAGE_NAME, JSON.stringify(getState().heroes.items));
}
