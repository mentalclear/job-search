/* eslint-disable no-shadow */
import {
  FILTERED_JOBS,
  FILTER_JOBS_BY_JOB_TYPES,
  FILTER_JOBS_BY_ORGANIZATIONS,
  INCLUDE_JOB_BY_JOB_TYPE,
  INCLUDE_JOB_BY_ORGANIZATION,
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
  [INCLUDE_JOB_BY_ORGANIZATION]: state => (job) => {
    if (state.selectedOrganizations.length === 0) return true;
    return state.selectedOrganizations.includes(job.organization);
  },
  [INCLUDE_JOB_BY_JOB_TYPE]: state => (job) => {
    if (state.selectedJobTypes.length === 0) return true;
    return state.selectedJobTypes.includes(job.jobType);
  },

  [FILTERED_JOBS](state, getters) {
    return state.jobs
      .filter(job => getters.INCLUDE_JOB_BY_ORGANIZATION(job))
      .filter(job => getters.INCLUDE_JOB_BY_JOB_TYPE(job));
  },
};

export default getters;
