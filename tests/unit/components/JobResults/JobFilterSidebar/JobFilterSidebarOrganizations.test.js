import { mount } from '@vue/test-utils';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useUniqueOrganizations } from '@/store/composables';
import JobFilterSidebarOrganizations from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarOrganizations.vue';

jest.mock('vuex');
jest.mock('vue-router');
jest.mock('@/store/composables');

describe('JobFilterSidebarOrganizations', () => {
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  it('should render unique list of organizations for filtering jobs', async () => {
    useUniqueOrganizations.mockReturnValue(new Set(['Google', 'Amazon']));
    const wrapper = mount(JobFilterSidebarOrganizations, createConfig());

    const clickableArea = wrapper.find('[data-test="clickable-area"]');
    await clickableArea.trigger('click');
    const organizationLabels = wrapper.findAll('[data-test="organization"]');
    const organizations = organizationLabels.map(node => node.text());
    expect(organizations).toEqual(['Google', 'Amazon']);
  });

  describe('when user clicks checkbox', () => {
    it('should communicates that user has selected checkbox for organization', async () => {
      useUniqueOrganizations.mockReturnValue(new Set(['Google', 'Amazon']));
      const commit = jest.fn();
      useStore.mockReturnValue({ commit });
      useRouter.mockReturnValue({ push: jest.fn() });
      const wrapper = mount(JobFilterSidebarOrganizations, createConfig());

      const clickableArea = wrapper.find('[data-test="clickable-area"]');
      await clickableArea.trigger('click');
      const googleInput = wrapper.find('[data-test="Google"]');
      await googleInput.setChecked();
      expect(commit).toHaveBeenCalledWith('ADD_SELECTED_ORGANIZATIONS', ['Google']);
    });

    it('should navigate user to job result page to see the fresh batch of jobs', async () => {
      useUniqueOrganizations.mockReturnValue(new Set(['Google', 'Amazon']));
      const push = jest.fn();
      const commit = jest.fn();
      useStore.mockReturnValue({ commit });
      useRouter.mockReturnValue({ push });
      const wrapper = mount(JobFilterSidebarOrganizations, createConfig());

      const clickableArea = wrapper.find('[data-test="clickable-area"]');
      await clickableArea.trigger('click');
      const googleInput = wrapper.find('[data-test="Google"]');
      await googleInput.setChecked();

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' });
    });
  });
});
