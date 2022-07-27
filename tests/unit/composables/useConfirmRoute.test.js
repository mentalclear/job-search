import { useRoute } from 'vue-router';
import useConfirmRoute from '@/composables/useConfirmRoute';

jest.mock('vue-router');

describe('useConfirmRoute', () => {
  it('should determine if the page route matches specified routr', () => {
    useRoute.mockReturnValue({ name: 'Home' });
    const routeName = 'Home';
    const resultRoute = useConfirmRoute(routeName);
    expect(resultRoute.value).toBeTruthy();
  });
});
