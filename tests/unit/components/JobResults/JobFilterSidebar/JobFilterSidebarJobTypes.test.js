import { mount } from '@vue/test-utils';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useUniqueJobTypes } from '@/store/composables';
import JobFilterSidebarJobTypes from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarJobTypes.vue';

jest.mock('vuex');
jest.mock('vue-router');
jest.mock('@/store/composables');

describe('JobFilterSidebarJobTypes', () => {
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  it('should render unique list of job types for filtering jobs', async () => {
    useUniqueJobTypes.mockReturnValue(new Set(['Full-time', 'Part-time']));
    const wrapper = mount(JobFilterSidebarJobTypes, createConfig());

    const clickableArea = wrapper.find('[data-test="clickable-area"]');
    await clickableArea.trigger('click');
    const jobTypeLabels = wrapper.findAll('[data-test="job-type"]');
    const jobTypes = jobTypeLabels.map(node => node.text());
    expect(jobTypes).toEqual(['Full-time', 'Part-time']);
  });

  describe('when user clicks checkbox', () => {
    it('should communicate that user has selected checkbox for job type', async () => {
      useUniqueJobTypes.mockReturnValue(new Set(['Full-time', 'Part-time']));
      const commit = jest.fn();
      useStore.mockReturnValue({ commit });
      useRouter.mockReturnValue({ push: jest.fn() });
      const wrapper = mount(JobFilterSidebarJobTypes, createConfig());

      const clickableArea = wrapper.find('[data-test="clickable-area"]');
      await clickableArea.trigger('click');
      const fullTimeInput = wrapper.find('[data-test="Full-time"]');
      await fullTimeInput.setChecked();
      expect(commit).toHaveBeenCalledWith('ADD_SELECTED_JOB_TYPES', ['Full-time']);
    });

    it('should navigate user to job result page to see the fresh batch of jobs', async () => {
      useUniqueJobTypes.mockReturnValue(new Set(['Full-time', 'Part-time']));
      const commit = jest.fn();
      useStore.mockReturnValue({ commit });
      const push = jest.fn();
      useRouter.mockReturnValue({ push });
      const wrapper = mount(JobFilterSidebarJobTypes, createConfig());
      const clickableArea = wrapper.find('[data-test="clickable-area"]');
      await clickableArea.trigger('click');
      const fullTimeInput = wrapper.find('[data-test="Full-time"]');
      await fullTimeInput.setChecked();

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' });
    });
  });
});
