import { shallowMount } from '@vue/test-utils';
import { useUniqueDegrees } from '@/store/composables';
import JobFilterSidebarDegrees from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarDegrees.vue';

jest.mock('@/store/composables');
jest.mock('vuex');
const useUniqueDegreesMock = useUniqueDegrees as jest.Mock;

describe('JobFilterSidebar', () => {
  it('should allow user to filter job by degrees', () => {
    useUniqueDegreesMock.mockReturnValue(['Associate', 'Bachelor\'s']);
    const wrapper = shallowMount(JobFilterSidebarDegrees);
    const degreesFilter = wrapper.findComponent({
      name: 'JobFilterSidebarCheckboxGroup',
    });
    const { uniqueValues, mutation } = degreesFilter.props();
    expect(uniqueValues).toEqual(['Associate', 'Bachelor\'s']);
    expect(mutation).toBe('ADD_SELECTED_DEGREES');
  });
});
