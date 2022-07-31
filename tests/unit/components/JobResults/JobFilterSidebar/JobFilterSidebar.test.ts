import { shallowMount } from '@vue/test-utils';
import { useUniqueDegrees, useUniqueJobTypes, useUniqueOrganizations } from '@/store/composables';
import JobFilterSidebar from '@/components/JobResults/JobFilterSidebar/JobFilterSidebar.vue';

jest.mock('@/store/composables');
const useUniqueDegreesMock = useUniqueDegrees as jest.Mock;
const useUniqueJobTypesMock = useUniqueJobTypes as jest.Mock;
const useUniqueOrganizationsMock = useUniqueOrganizations as jest.Mock;

describe('JobFilterSidebar', () => {
  it('should allow user to filter job by degrees', () => {
    useUniqueDegreesMock.mockReturnValue(['Associate', 'Bachelor\'s']);
    useUniqueJobTypesMock.mockReturnValue(new Set(['Full-time', 'Part-time']));
    useUniqueOrganizationsMock.mockReturnValue(new Set(['AirBNB']));
    const wrapper = shallowMount(JobFilterSidebar);
    const degreesFilter = wrapper.findComponent('[data-test="degrees-filter"]');
    const { header, uniqueValues, mutation } = degreesFilter.props();
    expect(header).toBe('Degree');
    expect(uniqueValues).toEqual(['Associate', 'Bachelor\'s']);
    expect(mutation).toBe('ADD_SELECTED_DEGREES');
  });

  it('should allow user to filter job by job types', () => {
    useUniqueDegreesMock.mockReturnValue(['Associate', 'Bachelor\'s']);
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
    useUniqueDegreesMock.mockReturnValue(['Associate', 'Bachelor\'s']);
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
