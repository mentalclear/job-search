import { mount } from '@vue/test-utils';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import JobFilterSidebarCheckboxGroup
  from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarCheckboxGroup.vue';

jest.mock('vuex');
jest.mock('vue-router');

describe('JobFilterSidebarCheckboxGroup', () => {
  const createConfig = (props = {}) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    props: {
      header: 'Some Header',
      uniqueValues: new Set(['ValueA', 'ValueB']),
      mutation: 'Some mutation',
      ...props,
    },
  });

  it('should render unique list of jobs for filtering jobs', async () => {
    const wrapper = mount(JobFilterSidebarCheckboxGroup, createConfig());
    const clickableArea = wrapper.find('[data-test="clickable-area"]');
    await clickableArea.trigger('click');
    const inputLabels = wrapper.findAll('[data-test="value"]');
    const inputValues = inputLabels.map(node => node.text());
    expect(inputValues).toEqual(['ValueA', 'ValueB']);
  });

  describe('when user clicks checkbox', () => {
    it('should communicate that user has selected checkbox for value', async () => {
      const commit = jest.fn();
      useStore.mockReturnValue({ commit });
      useRouter.mockReturnValue({ push: jest.fn() });
      const wrapper = mount(JobFilterSidebarCheckboxGroup, createConfig());

      const clickableArea = wrapper.find('[data-test="clickable-area"]');
      await clickableArea.trigger('click');
      const fullTimeInput = wrapper.find('[data-test="ValueA"]');
      await fullTimeInput.setChecked();
      expect(commit).toHaveBeenCalledWith('Some mutation', ['ValueA']);
    });

    it('should navigate user to job result page to see the fresh batch of jobs', async () => {
      const commit = jest.fn();
      useStore.mockReturnValue({ commit });
      const push = jest.fn();
      useRouter.mockReturnValue({ push });
      const wrapper = mount(JobFilterSidebarCheckboxGroup, createConfig());
      const clickableArea = wrapper.find('[data-test="clickable-area"]');
      await clickableArea.trigger('click');
      const fullTimeInput = wrapper.find('[data-test="ValueA"]');
      await fullTimeInput.setChecked();

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' });
    });
  });
});
