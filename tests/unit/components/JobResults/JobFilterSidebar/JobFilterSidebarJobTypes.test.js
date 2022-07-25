import { mount } from '@vue/test-utils';
import JobFilterSidebarJobTypes from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarJobTypes.vue';

describe('JobFilterSidebarJobTypes', () => {
  const createConfig = $store => ({
    global: {
      mocks: {
        $store,
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  it('should render unique list of job types for filtering jobs', async () => {
    const $store = {
      getters: {
        UNIQUE_JOB_TYPES: new Set(['Full-time', 'Part-time']),
      },
    };
    const wrapper = mount(JobFilterSidebarJobTypes, createConfig($store));

    const clickableArea = wrapper.find('[data-test="clickable-area"]');
    await clickableArea.trigger('click');
    const jobTypeLabels = wrapper.findAll('[data-test="job-type"]');
    const jobTypes = jobTypeLabels.map(node => node.text());
    expect(jobTypes).toEqual(['Full-time', 'Part-time']);
  });

  it('should communicate that user has selected checkbox for job type', async () => {
    const commit = jest.fn();
    const $store = {
      getters: {
        UNIQUE_JOB_TYPES: new Set(['Full-time', 'Part-time']),
      },
      commit,
    };
    const wrapper = mount(JobFilterSidebarJobTypes, createConfig($store));

    const clickableArea = wrapper.find('[data-test="clickable-area"]');
    await clickableArea.trigger('click');
    const fullTimeInput = wrapper.find('[data-test="Full-time"]');
    await fullTimeInput.setChecked();
    expect(commit).toHaveBeenCalledWith('ADD_SELECTED_JOB_TYPES', ['Full-time']);
  });
});
