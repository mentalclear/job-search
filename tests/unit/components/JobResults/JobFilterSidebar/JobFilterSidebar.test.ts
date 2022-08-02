import { shallowMount } from '@vue/test-utils';
import JobFilterSidebar from '@/components/JobResults/JobFilterSidebar/JobFilterSidebar.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

jest.mock('vuex');
jest.mock('vue-router');
const useRouteMock = useRoute as jest.Mock;
const useStoreMock = useStore as jest.Mock;

describe('JobFilterSidebar', () => {
  it('should set up a panel for user to filter jobs by one or more criteria', () => {
    useStoreMock.mockReturnValue({ commit: jest.fn() });
    useRouteMock.mockReturnValue({
      query: {},
    });
    const wrapper = shallowMount(JobFilterSidebar);
    expect(wrapper.exists).toBeTruthy();
  });

  it('should read query parameters to filter jobs for user', () => {
    const commit = jest.fn();
    useStoreMock.mockReturnValue({ commit });
    useRouteMock.mockReturnValue({
      query: {
        role: 'Vue',
      },
    });
    shallowMount(JobFilterSidebar);
    expect(commit).toHaveBeenCalledWith('UPDATE_SKILLS_SEARCH_TERM', 'Vue');
  });
});
