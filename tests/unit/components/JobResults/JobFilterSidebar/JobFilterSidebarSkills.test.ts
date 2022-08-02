import { shallowMount } from '@vue/test-utils';

import { useStore } from 'vuex';

import JobFilterSidebarSkills from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarSkills.vue';

jest.mock('vuex');
const useStoreMock = useStore as jest.Mock;

describe('JobFilterSidebarSkills', () => {
  it('should populate search input from store', () => {
    useStoreMock.mockReturnValue({
      state: {
        skillsSearchTerm: 'Programmer',
      },
      commit: jest.fn(),
    });
    const wrapper = shallowMount(JobFilterSidebarSkills);
    const skillsSearchInput = wrapper.find('[data-test="skills-search-input"]');
    const inputElement = skillsSearchInput.element as HTMLInputElement;
    expect(inputElement.value).toBe('Programmer');
  });

  it('should tell store that user has entered skills search term', async () => {
    const commit = jest.fn();
    useStoreMock.mockReturnValue({
      state: {
        skillsSearchTerm: '',
      },
      commit,
    });
    const wrapper = shallowMount(JobFilterSidebarSkills);
    const skillsSearchInput = wrapper.find('[data-test="skills-search-input"]');
    await skillsSearchInput.setValue('Vue Developer');

    expect(commit).toHaveBeenCalledWith('UPDATE_SKILLS_SEARCH_TERM', 'Vue Developer');
  });

  it('should remove whitespaces from entered skills search term', async () => {
    const commit = jest.fn();
    useStoreMock.mockReturnValue({
      state: {
        skillsSearchTerm: '',
      },
      commit,
    });
    const wrapper = shallowMount(JobFilterSidebarSkills);
    const skillsSearchInput = wrapper.find('[data-test="skills-search-input"]');
    await skillsSearchInput.setValue('    Vue Developer   ');

    expect(commit).toHaveBeenCalledWith('UPDATE_SKILLS_SEARCH_TERM', 'Vue Developer');
  });
});
