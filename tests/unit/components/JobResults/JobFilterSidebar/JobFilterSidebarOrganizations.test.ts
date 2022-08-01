import { shallowMount } from '@vue/test-utils';
import { useUniqueOrganizations } from '@/store/composables';
import JobFilterSidebarOrganizations from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarOrganizations.vue';

jest.mock('@/store/composables');
jest.mock('vuex');
const useUniqueOrganizationsMock = useUniqueOrganizations as jest.Mock;

describe('JobFilterSidebar', () => {
  it('should allow user to filter jobs by org', () => {
    useUniqueOrganizationsMock.mockReturnValue(new Set(['AirBNB']));
    const wrapper = shallowMount(JobFilterSidebarOrganizations);
    const organizationsFilter = wrapper.findComponent({
      name: 'JobFilterSidebarCheckboxGroup',
    });
    const { uniqueValues, mutation } = organizationsFilter.props();
    expect(uniqueValues).toEqual(new Set(['AirBNB']));
    expect(mutation).toBe('ADD_SELECTED_ORGANIZATIONS');
  });
});
