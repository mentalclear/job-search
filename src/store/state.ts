import { GlobalState } from '@/store/types';

const state = (): GlobalState => ({
  isLoggedIn: false,
  degrees: [],
  jobs: [],
  selectedDegrees: [],
  selectedOrganizations: [],
  selectedJobTypes: [],
});

export default state;
