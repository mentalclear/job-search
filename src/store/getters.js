import {
  UNIQUE_ORGANIZATIONS,
  FILTER_JOBS_BY_ORGANIZATIONS,
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
};

export default getters;
