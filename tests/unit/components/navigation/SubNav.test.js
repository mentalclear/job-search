import { mount } from '@vue/test-utils';
import SubNav from '@/components/navigation/SubNav.vue';

describe('SubNav', () => {
  const createConfig = (routeName, $store = {}) => ({
    global: {
      // Used to mock global objects, in this case $router.
      // Should use real world names.
      // Below gets passed JobResults - which is a real world name
      mocks: {
        $route: {
          name: routeName,
        },
        $store,
      },
      // Ask vue-test to install a stub instead of a child component.
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe('when user is on job page', () => {
    it('should display job count', () => {
      const routeName = 'JobResults';
      const $store = {
        getters: {
          FILTER_JOBS_BY_ORGANIZATIONS: [{ id: 1 }, { id: 2 }],
        },
      };
      const wrapper = mount(SubNav, createConfig(routeName, $store));
      const jobCount = wrapper.find('[data-test="job-count"]');
      expect(jobCount.text()).toMatch('2 jobs matched');
    });
  });

  describe('when user is not on job page', () => {
    it('Does NOT display job count', () => {
      const routeName = 'Home';
      const wrapper = mount(SubNav, createConfig(routeName));
      const jobCount = wrapper.find('[data-test="job-count"]');
      expect(jobCount.exists()).toBe(false);
    });
  });
});
