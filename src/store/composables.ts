import { computed } from 'vue';
import { useStore } from 'vuex';

import {
  FETCH_JOBS,
  FILTERED_JOBS,
  UNIQUE_JOB_TYPES,
  UNIQUE_ORGANIZATIONS,
} from '@/store/constants';

import { Job } from '@/api/types';

/* GETTERS */
const useFilteredJobs = () => {
  const store = useStore();
  return computed<Job>(() => store.getters[FILTERED_JOBS]);
};

const useUniqueJobTypes = () => {
  const store = useStore();
  return computed<Set<string>>(() => store.getters[UNIQUE_JOB_TYPES]);
};

const useUniqueOrganizations = () => {
  const store = useStore();
  return computed<Set<string>>(() => store.getters[UNIQUE_ORGANIZATIONS]);
};

/* ACTIONS */
const useFetchJobsDispatch = () => {
  const store = useStore();
  store.dispatch(FETCH_JOBS);
};


export {
  useFilteredJobs, useUniqueJobTypes, useUniqueOrganizations, useFetchJobsDispatch,
};
