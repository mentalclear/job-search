import getters from '@/store/getters';

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
