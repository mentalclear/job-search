import {
  FILTER_JOBS_BY_JOB_TYPES,
  FILTER_JOBS_BY_ORGANIZATIONS,
  UNIQUE_JOB_TYPES,
  UNIQUE_ORGANIZATIONS,
} from '@/store/constants';

const getters = {
  [UNIQUE_ORGANIZATIONS](state) {
    const uniqueOragnizations = new Set();
    state.jobs.forEach((job) => {
      uniqueOragnizations.add(job.organization);
    });
    return uniqueOragnizations;
  },
  [FILTER_JOBS_BY_ORGANIZATIONS](state) {
    return state.selectedOrganizations.length > 0
      ? state.jobs
        .filter(job => state.selectedOrganizations.includes(job.organization))
      : state.jobs;
  },
  [UNIQUE_JOB_TYPES](state) {
    const uniqueJobTypes = new Set();
    state.jobs.forEach((job) => {
      uniqueJobTypes.add(job.jobType);
    });
    return uniqueJobTypes;
  },
  [FILTER_JOBS_BY_ORGANIZATIONS](state) {
    return state.selectedOrganizations.length > 0
      ? state.jobs
        .filter(job => state.selectedOrganizations.includes(job.organization))
      : state.jobs;
  },
  [FILTER_JOBS_BY_JOB_TYPES](state) {
    return state.selectedJobTypes.length > 0
      ? state.jobs
        .filter(job => state.selectedJobTypes.includes(job.jobType))
      : state.jobs;
  },
};

export default getters;
