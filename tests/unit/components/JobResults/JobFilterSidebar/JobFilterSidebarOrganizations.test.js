import { mount } from '@vue/test-utils';
import JobFilterSidebarOrganizations from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarOrganizations.vue';

describe('JobFilterSidebarOrganizations', () => {
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

  it('should render unique list of organizations for filtering jobs', async () => {
    const $store = {
      getters: {
        UNIQUE_ORGANIZATIONS: new Set(['Google', 'Amazon']),
      },
    };
    const wrapper = mount(JobFilterSidebarOrganizations, createConfig($store));

    const clickableArea = wrapper.find('[data-test="clickable-area"]');
    await clickableArea.trigger('click');
    const organizationLabels = wrapper.findAll('[data-test="organization"]');
    const organizations = organizationLabels.map(node => node.text());
    expect(organizations).toEqual(['Google', 'Amazon']);
  });

  it('should communicates that user has selected checkbox for organization', async () => {
    const commit = jest.fn();
    const $store = {
      getters: {
        UNIQUE_ORGANIZATIONS: new Set(['Google', 'Amazon']),
      },
      commit,
    };
    const wrapper = mount(JobFilterSidebarOrganizations, createConfig($store));

    const clickableArea = wrapper.find('[data-test="clickable-area"]');
    await clickableArea.trigger('click');
    const googleInput = wrapper.find('[data-test="Google"]');
    await googleInput.setChecked();
    expect(commit).toHaveBeenCalledWith('ADD_SELECTED_ORGANIZATIONS', ['Google']);
  });
});
