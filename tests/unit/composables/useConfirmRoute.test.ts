import { useRoute } from 'vue-router';
import useConfirmRoute from '@/composables/useConfirmRoute';

jest.mock('vue-router');
const useRouteMock = useRoute as jest.Mock;

describe('useConfirmRoute', () => {
  it('should determine if the page route matches specified routr', () => {
    useRouteMock.mockReturnValue({ name: 'Home' });
    const routeName = 'Home';
    const resultRoute = useConfirmRoute(routeName);
    expect(resultRoute.value).toBeTruthy();
  });
});
