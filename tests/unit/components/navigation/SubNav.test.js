import { mount } from '@vue/test-utils';
import { useFilteredJobs } from '@/store/composables';
import useConfirmRoute from '@/composables/useConfirmRoute';
import SubNav from '@/components/navigation/SubNav.vue';

jest.mock('@/store/composables');
jest.mock('@/composables/useConfirmRoute');

describe('SubNav', () => {
  const createConfig = () => ({
    global: {
      // Ask vue-test to install a stub instead of a child component.
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe('when user is on job page', () => {
    it('should display job count', () => {
      useConfirmRoute.mockReturnValue(true);
      useFilteredJobs.mockReturnValue([{ id: 1 }, { id: 2 }]);
      const wrapper = mount(SubNav, createConfig());
      const jobCount = wrapper.find('[data-test="job-count"]');
      expect(jobCount.text()).toMatch('2 jobs matched');
    });
  });

  describe('when user is not on job page', () => {
    it('Does NOT display job count', () => {
      useConfirmRoute.mockReturnValue(false);
      useFilteredJobs.mockReturnValue([]);
      const wrapper = mount(SubNav, createConfig());
      const jobCount = wrapper.find('[data-test="job-count"]');
      expect(jobCount.exists()).toBe(false);
    });
  });
});
