import { computed } from 'vue';
import { useStore } from 'vuex';

import {
  FETCH_DEGREES,
  FETCH_JOBS,
  FILTERED_JOBS,
  UNIQUE_DEGREES,
  UNIQUE_JOB_TYPES,
  UNIQUE_ORGANIZATIONS,
} from '@/store/constants';

import { Job } from '@/api/types';
import { key } from '@/store';

/* GETTERS */
const useFilteredJobs = () => {
  const store = useStore(key);
  return computed<Job[]>(() => store.getters[FILTERED_JOBS]);
};

const useUniqueDegrees = () => {
  const store = useStore(key);
  return computed<string[]>(() => store.getters[UNIQUE_DEGREES]);
};

const useUniqueJobTypes = () => {
  const store = useStore(key);
  return computed<Set<string>>(() => store.getters[UNIQUE_JOB_TYPES]);
};

const useUniqueOrganizations = () => {
  const store = useStore(key);
  return computed<Set<string>>(() => store.getters[UNIQUE_ORGANIZATIONS]);
};

/* ACTIONS */
const useFetchJobsDispatch = () => {
  const store = useStore(key);
  store.dispatch(FETCH_JOBS);
};

const useFetchDegreesDispatch = () => {
  const store = useStore(key);
  store.dispatch(FETCH_DEGREES);
};

export {
  useFilteredJobs,
  useUniqueDegrees,
  useUniqueJobTypes,
  useUniqueOrganizations,
  useFetchDegreesDispatch,
  useFetchJobsDispatch,
};
