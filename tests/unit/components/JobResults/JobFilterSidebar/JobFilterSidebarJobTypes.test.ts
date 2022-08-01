import { shallowMount } from '@vue/test-utils';
import { useUniqueJobTypes } from '@/store/composables';
import JobFilterSidebarJobTypes from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarJobTypes.vue';

jest.mock('@/store/composables');
jest.mock('vuex');

const useUniqueJobTypesMock = useUniqueJobTypes as jest.Mock;

describe('JobFilterSidebarJobTypes', () => {
  it('should allow user to filter job by job types', () => {
    useUniqueJobTypesMock.mockReturnValue(new Set(['Full-time', 'Part-time']));
    const wrapper = shallowMount(JobFilterSidebarJobTypes);
    const jobTypesFilter = wrapper.findComponent({
      name: 'JobFilterSidebarCheckboxGroup',
    });
    const { uniqueValues, mutation } = jobTypesFilter.props();
    expect(uniqueValues).toEqual(new Set(['Full-time', 'Part-time']));
    expect(mutation).toBe('ADD_SELECTED_JOB_TYPES');
  });
});
