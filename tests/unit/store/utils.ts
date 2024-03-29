import { Degree, Job } from '@/api/types';
import { GlobalState } from '@/store/types';
import state from '@/store/state';

const createState = (config: Partial<GlobalState> = {}): GlobalState => {
  const initialState = state();
  return { ...initialState, ...config };
};

const createDegree = (config: Partial<Degree> = {}): Degree => ({
  id: 1,
  degree: "Master's",
  ...config,
});

const createJob = (config: Partial<Job> = {}): Job => ({
  id: 1,
  title: 'Angular Developer',
  organization: 'Vue and Me',
  degree: "Master's",
  jobType: 'Intern',
  locations: ['Lisbon'],
  minimumQualifications: [],
  preferredQualifications: [],
  description: [],
  dateAdded: '2021-07-04',
  ...config,
});

export { createDegree, createJob, createState };
