import { Degree, Job } from '@/api/types';

export interface GlobalState {
  isLoggedIn: boolean,
  degrees: Degree[],
  jobs: Job[],
  selectedDegrees: string[],
  selectedOrganizations: string[],
  selectedJobTypes: string[],
}
