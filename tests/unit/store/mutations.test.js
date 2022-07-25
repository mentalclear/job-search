import mutations from '@/store/mutations';

describe('mutations', () => {
  describe('LOGIN_USER', () => {
    it('should log user in', () => {
      const state = { isLoggedIn: false };
      const epxectedState = { isLoggedIn: true };
      mutations.LOGIN_USER(state);
      expect(state).toEqual(epxectedState);
    });
  });
  describe('RECEIVE_JOBS', () => {
    it('should recieve jobs from API repsonse', () => {
      const state = { jobs: [] };
      mutations.RECEIVE_JOBS(state, ['Job 1', 'Job 2']);
      expect(state).toEqual({ jobs: ['Job 1', 'Job 2'] });
    });
  });
  describe('ADD_SELECTED_ORGANIZATIONS', () => {
    it('should update organizations that the user has chosen to filter by', () => {
      const state = { selectedOrganizations: [] };
      mutations.ADD_SELECTED_ORGANIZATIONS(state, ['Org1', 'Org2']);
      expect(state).toEqual({ selectedOrganizations: ['Org1', 'Org2'] });
    });
  });
  describe('ADD_SELECTED_JOB_TYPES', () => {
    it('should update organizations that the user has chosen to filter by', () => {
      const state = { selectedJobTypes: [] };
      mutations.ADD_SELECTED_JOB_TYPES(state, ['Full-time', 'Part-type']);
      expect(state).toEqual({ selectedJobTypes: ['Full-time', 'Part-type'] });
    });
  });
});
