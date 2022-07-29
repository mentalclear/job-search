/* eslint-disable no-shadow */
import {
  FILTERED_JOBS,
  INCLUDE_JOB_BY_JOB_TYPE,
  INCLUDE_JOB_BY_ORGANIZATION,
  UNIQUE_JOB_TYPES,
  UNIQUE_ORGANIZATIONS,
} from '@/store/constants';
import { GlobalState } from '@/store/types';
import { Job } from '@/api/types';

interface IncludeJobGetters {
  INCLUDE_JOB_BY_ORGANIZATION: (job: Job) => boolean,
  INCLUDE_JOB_BY_JOB_TYPE: (job: Job) => boolean,
}

const getters = {
  [UNIQUE_ORGANIZATIONS](state: GlobalState) {
    const uniqueOragnizations = new Set<string>();
    state.jobs.forEach((job) => {
      uniqueOragnizations.add(job.organization);
    });
    return uniqueOragnizations;
  },
  [UNIQUE_JOB_TYPES](state: GlobalState) {
    const uniqueJobTypes = new Set<string>();
    state.jobs.forEach((job) => {
      uniqueJobTypes.add(job.jobType);
    });
    return uniqueJobTypes;
  },
  [INCLUDE_JOB_BY_ORGANIZATION]: (state: GlobalState) => (job: Job) => {
    if (state.selectedOrganizations.length === 0) return true;
    return state.selectedOrganizations.includes(job.organization);
  },
  [INCLUDE_JOB_BY_JOB_TYPE]: (state: GlobalState) => (job: Job) => {
    if (state.selectedJobTypes.length === 0) return true;
    return state.selectedJobTypes.includes(job.jobType);
  },

  [FILTERED_JOBS](state: GlobalState, getters: IncludeJobGetters) {
    return state.jobs
      .filter((job: Job) => getters.INCLUDE_JOB_BY_ORGANIZATION(job))
      .filter((job: Job) => getters.INCLUDE_JOB_BY_JOB_TYPE(job));
  },
};

export default getters;
