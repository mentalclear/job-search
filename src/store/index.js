/* eslint-disable no-shadow */
import { createStore } from 'vuex';

import getJobs from '@/api/getJobs';

export const LOGIN_USER = 'LOGIN_USER';
export const RECEIVE_JOBS = 'RECEIVE_JOBS';
export const FETCH_JOBS = 'FETCH_JOBS';
export const UNIQUE_ORGANIZATIONS = 'UNIQUE_ORGANIZATIONS';

export const state = () => ({
  isLoggedIn: false,
  jobs: [],
});

export const mutations = {
  [LOGIN_USER](state) {
    state.isLoggedIn = true;
  },
  [RECEIVE_JOBS](state, value) {
    state.jobs = value;
  },
};

export const getters = {
  [UNIQUE_ORGANIZATIONS](state) {
    const uniqueOragnizations = new Set();
    state.jobs.forEach((job) => {
      uniqueOragnizations.add(job.organization);
    });
    return uniqueOragnizations;
  },
};

export const actions = {
  [FETCH_JOBS]: async (context) => {
    const jobListings = await getJobs();
    context.commit(RECEIVE_JOBS, jobListings);
  },
};

const store = createStore({
  state,
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV !== 'production',
});

export default store;
