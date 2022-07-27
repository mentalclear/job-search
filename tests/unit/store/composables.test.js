import { useStore } from 'vuex';
import { useFilteredJobs } from '@/store/composables';

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
});
