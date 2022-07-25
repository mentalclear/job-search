import {
  LOGIN_USER,
  RECEIVE_JOBS,
  ADD_SELECTED_ORGANIZATIONS,
  ADD_SELECTED_JOB_TYPES,
} from '@/store/constants';

const mutations = {
  [LOGIN_USER](state) {
    state.isLoggedIn = true;
  },
  [RECEIVE_JOBS](state, value) {
    state.jobs = value;
  },
  [ADD_SELECTED_ORGANIZATIONS](state, value) {
    state.selectedOrganizations = value;
  },
  [ADD_SELECTED_JOB_TYPES](state, value) {
    state.selectedJobTypes = value;
  },
};

export default mutations;
