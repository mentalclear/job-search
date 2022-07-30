import { useRoute } from 'vue-router';
import useCurentPage from '@/composables/useCurrentPage';

jest.mock('vue-router');
const useRouteMock = useRoute as jest.Mock;

describe('useCurrentPage', () => {
  describe('when query parms include page', () => {
    it('should return the page', () => {
      useRouteMock.mockReturnValue({
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
      useRouteMock.mockReturnValue({
        query: {},
      });
      const result = useCurentPage();
      expect(result.value).toBe(1);
    });
  });
});
