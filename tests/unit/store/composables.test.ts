import { useStore } from 'vuex';
import {
  useFetchJobsDispatch,
  useFilteredJobs,
  useUniqueJobTypes,
  useUniqueOrganizations,
} from '@/store/composables';

jest.mock('vuex');
const useStoreMock = useStore as jest.Mock;

describe('composables', () => {
  describe('useFilteredJobs', () => {
    it('should retrieve filtered jobs from the store', () => {
      useStoreMock.mockReturnValue({
        getters: {
          FILTERED_JOBS: [{ id: 1 }],
        },
      });

      const result = useFilteredJobs();
      expect(result.value).toEqual([{ id: 1 }]);
    });
  });

  describe('useUniqueJobTypes', () => {
    it('should retrieve unique jobs from store', () => {
      useStoreMock.mockReturnValue({
        getters: {
          UNIQUE_JOB_TYPES: new Set(['Full-time']),
        },
      });

      const result = useUniqueJobTypes();
      expect(result.value).toEqual(new Set(['Full-time']));
    });
  });

  describe('useUniqueOrganizations', () => {
    it('should retrieve unique organizations from store', () => {
      useStoreMock.mockReturnValue({
        getters: {
          UNIQUE_ORGANIZATIONS: new Set(['Google']),
        },
      });

      const result = useUniqueOrganizations();
      expect(result.value).toEqual(new Set(['Google']));
    });
  });

  describe('useFetchJobsDispatch', () => {
    it('should send calls to fetch jobs from API', () => {
      const dispatch = jest.fn();
      useStoreMock.mockReturnValue({
        dispatch,
      });
      useFetchJobsDispatch();
      expect(dispatch).toHaveBeenCalledWith('FETCH_JOBS');
    });
  });
});
