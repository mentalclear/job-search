import { useStore } from 'vuex';
import {
  useFilteredJobs,
  useUniqueJobTypes,
  useUniqueOrganizations,
} from '@/store/composables';

jest.mock('vuex');

describe('composables', () => {
  describe('useFilteredJobs', () => {
    it('should retrieve filtered jobs from the store', () => {
      useStore.mockReturnValue({
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
      useStore.mockReturnValue({
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
      useStore.mockReturnValue({
        getters: {
          UNIQUE_ORGANIZATIONS: new Set(['Google']),
        },
      });

      const result = useUniqueOrganizations();
      expect(result.value).toEqual(new Set(['Google']));
    });
  });
});
