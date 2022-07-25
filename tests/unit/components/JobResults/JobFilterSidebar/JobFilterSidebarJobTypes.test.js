import { mount } from '@vue/test-utils';
import JobFilterSidebarJobTypes from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarJobTypes.vue';

describe('JobFilterSidebarJobTypes', () => {
  const createConfig = ($store, $router) => ({
    global: {
      mocks: {
        $store,
        $router,
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  it('should render unique list of job types for filtering jobs', async () => {
    const $router = { push: jest.fn() };
    const $store = {
      getters: {
        UNIQUE_JOB_TYPES: new Set(['Full-time', 'Part-time']),
      },
    };
    const wrapper = mount(JobFilterSidebarJobTypes, createConfig($store, $router));

    const clickableArea = wrapper.find('[data-test="clickable-area"]');
    await clickableArea.trigger('click');
    const jobTypeLabels = wrapper.findAll('[data-test="job-type"]');
    const jobTypes = jobTypeLabels.map(node => node.text());
    expect(jobTypes).toEqual(['Full-time', 'Part-time']);
  });

  describe('when user clicks checkbox', () => {
    it('should communicate that user has selected checkbox for job type', async () => {
      const $router = { push: jest.fn() };
      const commit = jest.fn();
      const $store = {
        getters: {
          UNIQUE_JOB_TYPES: new Set(['Full-time', 'Part-time']),
        },
        commit,
      };
      const wrapper = mount(JobFilterSidebarJobTypes, createConfig($store, $router));

      const clickableArea = wrapper.find('[data-test="clickable-area"]');
      await clickableArea.trigger('click');
      const fullTimeInput = wrapper.find('[data-test="Full-time"]');
      await fullTimeInput.setChecked();
      expect(commit).toHaveBeenCalledWith('ADD_SELECTED_JOB_TYPES', ['Full-time']);
    });

    it('should navigate user to job result page to see the fresh batch of jobs', async () => {
      const $store = {
        getters: {
          UNIQUE_JOB_TYPES: new Set(['Full-time', 'Part-time']),
        },
        commit: jest.fn(),
      };
      const push = jest.fn();
      const $router = { push };
      const wrapper = mount(JobFilterSidebarJobTypes, createConfig($store, $router));

      const clickableArea = wrapper.find('[data-test="clickable-area"]');
      await clickableArea.trigger('click');
      const fullTimeInput = wrapper.find('[data-test="Full-time"]');
      await fullTimeInput.setChecked();

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' });
    });
  });
});
