import { mount } from '@vue/test-utils';
import JobFilterSidebarOrganizations from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarOrganizations.vue';

describe('JobFilterSidebarOrganizations', () => {
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

  it('should render unique list of organizations for filtering jobs', async () => {
    const $router = { push: jest.fn() };
    const $store = {
      getters: {
        UNIQUE_ORGANIZATIONS: new Set(['Google', 'Amazon']),
      },
    };
    const wrapper = mount(JobFilterSidebarOrganizations, createConfig($store, $router));

    const clickableArea = wrapper.find('[data-test="clickable-area"]');
    await clickableArea.trigger('click');
    const organizationLabels = wrapper.findAll('[data-test="organization"]');
    const organizations = organizationLabels.map(node => node.text());
    expect(organizations).toEqual(['Google', 'Amazon']);
  });

  describe('when user clicks checkbox', () => {
    it('should communicates that user has selected checkbox for organization', async () => {
      const $router = { push: jest.fn() };
      const commit = jest.fn();
      const $store = {
        getters: {
          UNIQUE_ORGANIZATIONS: new Set(['Google', 'Amazon']),
        },
        commit,
      };
      const wrapper = mount(JobFilterSidebarOrganizations, createConfig($store, $router));

      const clickableArea = wrapper.find('[data-test="clickable-area"]');
      await clickableArea.trigger('click');
      const googleInput = wrapper.find('[data-test="Google"]');
      await googleInput.setChecked();
      expect(commit).toHaveBeenCalledWith('ADD_SELECTED_ORGANIZATIONS', ['Google']);
    });

    it('should navigate user to job result page to see the fresh batch of jobs', async () => {
      const $store = {
        getters: {
          UNIQUE_ORGANIZATIONS: new Set(['Google', 'Amazon']),
        },
        commit: jest.fn(),
      };
      const push = jest.fn();
      const $router = { push };
      const wrapper = mount(JobFilterSidebarOrganizations, createConfig($store, $router));

      const clickableArea = wrapper.find('[data-test="clickable-area"]');
      await clickableArea.trigger('click');
      const googleInput = wrapper.find('[data-test="Google"]');
      await googleInput.setChecked();

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' });
    });
  });
});
