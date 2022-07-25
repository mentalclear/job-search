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

  describe('FILTER_JOBS_BY_JOB_TYPES', () => {
    it('should identify jobs associated with given job types', () => {
      const state = {
        jobs: [
          {
            jobType: 'Full-time',
          },
          {
            jobType: 'Temporary',
          },
          {
            jobType: 'Part-time',
          },
        ],
        selectedJobTypes: ['Full-time', 'Part-time'],
      };
      const filteredJobs = getters.FILTER_JOBS_BY_JOB_TYPES(state);
      expect(filteredJobs).toEqual([
        { jobType: 'Full-time' },
        { jobType: 'Part-time' },
      ]);
    });

    describe('When user has not selected any job types', () => {
      it('should return all jobs', () => {
        const state = {
          jobs: [
            {
              jobType: 'Full-time',
            },
            {
              jobType: 'Temporary',
            },
            {
              jobType: 'Part-time',
            },
          ],
          selectedJobTypes: [],
        };
        const filteredJobs = getters.FILTER_JOBS_BY_JOB_TYPES(state);
        expect(filteredJobs).toEqual([
          { jobType: 'Full-time' },
          { jobType: 'Temporary' },
          { jobType: 'Part-time' },
        ]);
      });
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
});
