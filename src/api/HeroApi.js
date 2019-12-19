import heroes from "./heroes.json";

const FAKE_TIMEOUT = 2000;

export const HeroApi = {
  /**
   * Get list of heroes from "fake server"
   * @return {Promise}
   */
  getHeroes: () => {
    return new Promise((resolve, reject) =>
      setTimeout(() => resolve(heroes), FAKE_TIMEOUT)
    );
  },
  /**
   * Add new hero to "fake server"
   * @param {object} hero
   * @return {Promise}
   */
  postHero: hero => {
    const heroWithId = { id: new Date().valueOf(), ...hero };
    return new Promise((resolve, reject) =>
      setTimeout(() => resolve(heroWithId), FAKE_TIMEOUT)
    );
  },
  /**
   * Update hero by id in "fake server"
   * @param {object} hero
   * @return {Promise}
   */
  putHero: hero => {
    return new Promise((resolve, reject) =>
      setTimeout(() => resolve(hero), FAKE_TIMEOUT)
    );
  },
  /**
   * Delete hero by id from "fake server"
   * @param {number} id
   * @return {Promise}
   */
  deleteHero: id => {
    return new Promise((resolve, reject) =>
      setTimeout(() => resolve(id), FAKE_TIMEOUT)
    );
  }
};
