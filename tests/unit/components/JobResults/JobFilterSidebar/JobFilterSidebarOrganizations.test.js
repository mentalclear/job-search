import { mount } from '@vue/test-utils';
import JobFilterSidebarOrganizations from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarOrganizations.vue';

describe('JobFilterSidebarOrganizations', () => {
  it('should render unique list of organizations for filtering jobs', async () => {
    const $store = {
      getters: {
        UNIQUE_ORGANIZATIONS: new Set(['Google', 'Amazon']),
      },
    };
    const wrapper = mount(JobFilterSidebarOrganizations, {
      global: {
        mocks: {
          $store,
        },
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    const clickableArea = wrapper.find('[data-test="clickable-area"]');
    await clickableArea.trigger('click');
    const organizationLabels = wrapper.findAll('[data-test="organization"]');
    const organizations = organizationLabels.map(node => node.text());
    expect(organizations).toEqual(['Google', 'Amazon']);
  });
});
