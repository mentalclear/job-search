import { shallowMount } from '@vue/test-utils';
import JobFilterSidebar from '@/components/JobResults/JobFilterSidebar/JobFilterSidebar.vue';

jest.mock('vuex');

describe('JobFilterSidebar', () => {
  it('should set up a panel for user to filter jobs by one or more criteria', () => {
    const wrapper = shallowMount(JobFilterSidebar);
    expect(wrapper.exists).toBeTruthy();
  });
});
