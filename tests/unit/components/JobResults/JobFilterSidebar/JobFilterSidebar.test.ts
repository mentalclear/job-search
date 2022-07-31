import { shallowMount } from '@vue/test-utils';
import { useUniqueJobTypes, useUniqueOrganizations } from '@/store/composables';
import JobFilterSidebar from '@/components/JobResults/JobFilterSidebar/JobFilterSidebar.vue';

jest.mock('@/store/composables');
const useUniqueJobTypesMock = useUniqueJobTypes as jest.Mock;
const useUniqueOrganizationsMock = useUniqueOrganizations as jest.Mock;

describe('JobFilterSidebar', () => {
  it('should allow user to filter job by job types', () => {
    useUniqueJobTypesMock.mockReturnValue(new Set(['Full-time', 'Part-time']));
    useUniqueOrganizationsMock.mockReturnValue(new Set(['AirBNB']));
    const wrapper = shallowMount(JobFilterSidebar);
    const jobTypesFilter = wrapper.findComponent('[data-test="job-types-filter"]');
    const { header, uniqueValues, mutation } = jobTypesFilter.props();
    expect(header).toBe('Job Types');
    expect(uniqueValues).toEqual(new Set(['Full-time', 'Part-time']));
    expect(mutation).toBe('ADD_SELECTED_JOB_TYPES');
  });
  it('should allow user to filter jobs by org', () => {
    useUniqueJobTypesMock.mockReturnValue(new Set(['Full-time', 'Part-time']));
    useUniqueOrganizationsMock.mockReturnValue(new Set(['AirBNB']));
    const wrapper = shallowMount(JobFilterSidebar);
    const jobTypesFilter = wrapper.findComponent('[data-test="organizations-filter"]');
    const { header, uniqueValues, mutation } = jobTypesFilter.props();
    expect(header).toBe('Organizations');
    expect(uniqueValues).toEqual(new Set(['AirBNB']));
    expect(mutation).toBe('ADD_SELECTED_ORGANIZATIONS');
  });
});
