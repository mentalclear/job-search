/* eslint-disable no-shadow */
import { createStore } from 'vuex';

export const LOGIN_USER = 'LOGIN_USER';

export const state = () => ({
  isLoggedIn: false,
});

export const mutations = {
  [LOGIN_USER](state) {
    state.isLoggedIn = true;
  },
};

const store = createStore({
  state,
  mutations,
  strict: process.env.NODE_ENV !== 'production',
});


export default store;
