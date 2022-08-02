import { GlobalState } from '@/store/types';
import { stringify } from 'postcss';

const state = (): GlobalState => ({
  isLoggedIn: false,
  degrees: [],
  jobs: [],
  selectedDegrees: [],
  selectedOrganizations: [],
  selectedJobTypes: [],
  skillsSearchTerm: '',
});

export default state;
