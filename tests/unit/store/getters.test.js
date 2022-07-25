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

  describe('UNIQUE_JOB_TYPES', () => {
    it('should find unique organizations from a list of jobs', () => {
      const state = {
        jobs: [
          {
            jobType: 'Full-time',
          },
          {
            jobType: 'Temporary',
          },
          {
            jobType: 'Full-time',
          },
        ],
      };

      const result = getters.UNIQUE_JOB_TYPES(state);
      expect(result).toEqual(new Set(['Full-time', 'Temporary']));
    });
  });

  describe('INCLUDE_JOB_BY_ORGANIZATION]', () => {
    describe('when user has not selected any organization', () => {
      it('should include job', () => {
        const state = {
          selectedOrganizations: [],
        };
        const job = { organization: 'Google' };
        // getter returns function, so it's invoked in place with (job)
        const includeJob = getters.INCLUDE_JOB_BY_ORGANIZATION(state)(job);
        expect(includeJob).toBeTruthy();
      });
      it('should identify if job is associated with given organization', () => {
        const state = {
          selectedOrganizations: ['Google', 'Microsoft'],
        };
        const job = { organization: 'Google' };
        // getter returns function, so it's invoked in place with (job)
        const includeJob = getters.INCLUDE_JOB_BY_ORGANIZATION(state)(job);
        expect(includeJob).toBeTruthy();
      });
    });
  });

  describe('INCLUDE_JOB_BY_JOB_TYPE', () => {
    describe('when user has not selected any job types', () => {
      it('should include job', () => {
        const state = {
          selectedJobTypes: [],
        };
        const job = { jobType: 'Full-time' };
        // getter returns function, so it's invoked in place with (job)
        const includeJob = getters.INCLUDE_JOB_BY_JOB_TYPE(state)(job);
        expect(includeJob).toBeTruthy();
      });
      it('should identify if job is associated with given job types', () => {
        const state = {
          selectedJobTypes: ['Full-time', 'Part-time'],
        };
        const job = { jobType: 'Full-time' };
        // getter returns function, so it's invoked in place with (job)
        const includeJob = getters.INCLUDE_JOB_BY_JOB_TYPE(state)(job);
        expect(includeJob).toBeTruthy();
      });
    });
  });

  describe('FILTERED_JOBS', () => {
    it('should filter jobs by organization and job types', () => {
      const INCLUDE_JOB_BY_ORGANIZATION = jest.fn().mockReturnValue(true);
      const INCLUDE_JOB_BY_JOB_TYPE = jest.fn().mockReturnValue(true);

      const mcokGetters = {
        INCLUDE_JOB_BY_JOB_TYPE,
        INCLUDE_JOB_BY_ORGANIZATION,
      };

      const job = { id: 1, title: 'Best job ever' };
      const state = {
        jobs: [job],
      };

      const result = getters.FILTERED_JOBS(state, mcokGetters);
      expect(result).toEqual([job]);
      expect(INCLUDE_JOB_BY_ORGANIZATION).toHaveBeenLastCalledWith(job);
      expect(INCLUDE_JOB_BY_JOB_TYPE).toHaveBeenCalledWith(job);
    });
  });
});
