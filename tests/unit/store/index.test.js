/* eslint-disable no-shadow */
import {
  actions, getters, mutations, state,
} from '@/store';
import getJobs from '@/api/getJobs';

jest.mock('@/api/getJobs');

describe('actions', () => {
  describe('FETCH_JOBS', () => {
    beforeEach(() => {
      getJobs.mockResolvedValue([{ id: 1, title: 'Software Developer' }]);
    });

    it('should make a request to fetch jobs', async () => {
      const context = { commit: jest.fn() };
      await actions.FETCH_JOBS(context);
      expect(getJobs).toHaveBeenCalled();
    });

    it('should send message to save recieved jobs in store', async () => {
      const commit = jest.fn();
      const context = { commit };
      await actions.FETCH_JOBS(context);
      expect(commit).toHaveBeenCalledWith('RECEIVE_JOBS', [
        { id: 1, title: 'Software Developer' },
      ]);
    });
  });
});

describe('getters', () => {
  describe('UNIQUE_ORGANIZATIONS', () => {
    it('should find unique organizations from a list of jobs', () => {
      const state = {
        jobs: [
          {
            organization: 'Google',
          },
          {
            organization: 'Amazon',
          },
          {
            organization: 'Google',
          },
        ],
      };

      const result = getters.UNIQUE_ORGANIZATIONS(state);
      expect(result).toEqual(new Set(['Google', 'Amazon']));
    });
  });
  describe('FILTER_JOBS_BY_ORGANIZATIONS', () => {
    it('should identify jobs associated with given organization', () => {
      const state = {
        jobs: [
          {
            organization: 'Google',
          },
          {
            organization: 'Amazon',
          },
          {
            organization: 'Microsoft',
          },
        ],
        selectedOrganizations: ['Google', 'Microsoft'],
      };
      const filteredJobs = getters.FILTER_JOBS_BY_ORGANIZATIONS(state);
      expect(filteredJobs).toEqual([
        { organization: 'Google' },
        { organization: 'Microsoft' },
      ]);
    });
  });

  describe('When user has not selected any organizations', () => {
    it('should return all jobs', () => {
      const state = {
        jobs: [
          {
            organization: 'Google',
          },
          {
            organization: 'Amazon',
          },
          {
            organization: 'Microsoft',
          },
        ],
        selectedOrganizations: [],
      };
      const filteredJobs = getters.FILTER_JOBS_BY_ORGANIZATIONS(state);
      expect(filteredJobs).toEqual([
        { organization: 'Google' },
        { organization: 'Amazon' },
        { organization: 'Microsoft' },
      ]);
    });
  });
});

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
});

describe('state', () => {
  it('should keep track of whether user is logged in', () => {
    const startingState = state();
    expect(startingState.isLoggedIn).toBeFalsy();
  });

  it('should store job listings', () => {
    const startingState = state();
    expect(startingState.jobs).toEqual([]);
  });

  it('should store organizations that user wants to filter by', () => {
    const startingState = state();
    expect(startingState.selectedOrganizations).toEqual([]);
  });
});
