import { mount } from '@vue/test-utils';
import { useStore } from 'vuex';
import JobFilterSidebarPrompt from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarPrompt.vue';

jest.mock('vuex');
const useStoreMock = useStore as jest.Mock;

describe('JobFilterSidebarPrompt', () => {
  describe('when user clicks clear filters button', () => {
    it('should send message to clear all of user\'s job search filters', async () => {
      const commit = jest.fn();
      useStoreMock.mockReturnValue({ commit });
      const wrapper = mount(JobFilterSidebarPrompt);
      const button = wrapper.find('[data-test="clear-user-job-filters"]');
      await button.trigger('click');

      expect(commit).toHaveBeenCalledWith('CLEAR_USER_JOB_FILTER_SELECTIONS');
    });
  });
});
