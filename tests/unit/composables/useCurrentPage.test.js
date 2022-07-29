import { useRoute } from 'vue-router';
import useCurentPage from '@/composables/useCurrentPage';

jest.mock('vue-router');

describe('useCurrentPage', () => {
  describe('when query parms include page', () => {
    it('should return the page', () => {
      useRoute.mockReturnValue({
        query: {
          page: '5',
        },
      });
      const result = useCurentPage();
      expect(result.value).toBe(5);
    });
  });

  describe('when query params exclude page', () => {
    it('should default to page 1', () => {
      useRoute.mockReturnValue({
        query: {},
      });
      const result = useCurentPage();
      expect(result.value).toBe(1);
    });
  });
});
