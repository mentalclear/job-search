import mutations from '@/store/mutations';
import { createJob, createState } from './utils';

describe('mutations', () => {
  describe('LOGIN_USER', () => {
    it('should log user in', () => {
      // Cast this to GlobalState type
      // const state = { isLoggedIn: false } as GlobalState;
      // just using the state fundtion
      // const startState = state();
      const startState = createState({ isLoggedIn: false });
      mutations.LOGIN_USER(startState);
      expect(startState.isLoggedIn).toBeTruthy();
    });
  });
  describe('RECEIVE_JOBS', () => {
    it('should recieve jobs from API repsonse', () => {
      const startState = createState({ jobs: [] });
      const jobOne = createJob();
      const jobTwo = createJob();
      mutations.RECEIVE_JOBS(startState, [jobOne, jobTwo]);
      expect(startState.jobs).toEqual([jobOne, jobTwo]);
    });
  });
  describe('ADD_SELECTED_ORGANIZATIONS', () => {
    it('should update organizations that the user has chosen to filter by', () => {
      const startState = createState({ selectedOrganizations: [] });
      mutations.ADD_SELECTED_ORGANIZATIONS(startState, ['Org1', 'Org2']);
      expect(startState.selectedOrganizations).toEqual(['Org1', 'Org2']);
    });
  });
  describe('ADD_SELECTED_JOB_TYPES', () => {
    it('should update organizations that the user has chosen to filter by', () => {
      const startState = createState({ selectedJobTypes: [] });
      mutations.ADD_SELECTED_JOB_TYPES(startState, ['Full-time', 'Part-type']);
      expect(startState.selectedJobTypes).toEqual(['Full-time', 'Part-type']);
    });
  });
});
