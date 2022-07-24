import {
  LOGIN_USER,
  RECEIVE_JOBS,
  ADD_SELECTED_ORGANIZATIONS,
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
};

export default mutations;
