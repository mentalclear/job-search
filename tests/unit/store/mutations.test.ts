import mutations from '@/store/mutations';
import { createDegree, createJob, createState } from './utils';

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

  describe('RECEIVE_DEGREES', () => {
    it('should recieve degrees from API repsonse', () => {
      const startState = createState({ degrees: [] });
      const degreeOne = createDegree();
      const degreeTwo = createDegree();
      mutations.RECEIVE_DEGREES(startState, [degreeOne, degreeTwo]);
      expect(startState.degrees).toEqual([degreeOne, degreeTwo]);
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

  describe('ADD_SELECTED_DEGREES', () => {
    it('should update degrees that the user has chosen to filter by', () => {
      const startState = createState({ selectedDegrees: [] });
      mutations.ADD_SELECTED_DEGREES(startState, ['Ph.D', 'Associate']);
      expect(startState.selectedDegrees).toEqual(['Ph.D', 'Associate']);
    });
  });

  describe('CLEAR_USER_JOB_FILTER_SELECTIONS', () => {
    it('should remove all job filters user has chaosen', () => {
      const startingState = createState({
        selectedDegrees: ['Random degree'],
        selectedOrganizations: ['Random organization'],
        selectedJobTypes: ['Random job type'],
        skillsSearchTerm: 'Blah blah blah',
      });

      mutations.CLEAR_USER_JOB_FILTER_SELECTIONS(startingState);
      expect(startingState.selectedDegrees).toEqual([]);
      expect(startingState.selectedJobTypes).toEqual([]);
      expect(startingState.selectedOrganizations).toEqual([]);
      expect(startingState.skillsSearchTerm).toEqual('');
    });
  });

  describe('UPDATE_SKILLS_SEARCH_TERM', () => {
    it('should recieve search term fro skills the user has', () => {
      const startingState = createState({
        skillsSearchTerm: '',
      });
      mutations.UPDATE_SKILLS_SEARCH_TERM(startingState, 'Vue');
      expect(startingState.skillsSearchTerm).toEqual('Vue');
    });
  });
});
