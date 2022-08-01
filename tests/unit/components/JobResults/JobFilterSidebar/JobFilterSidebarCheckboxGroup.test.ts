import { shallowMount } from '@vue/test-utils';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import JobFilterSidebarCheckboxGroup
  from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarCheckboxGroup.vue';

jest.mock('vuex');
const useStoreMock = useStore as jest.Mock;
jest.mock('vue-router');
const useRouterMock = useRouter as jest.Mock;

describe('JobFilterSidebarCheckboxGroup', () => {
  const createConfig = (props = {}) => ({
    props: {
      uniqueValues: new Set(['ValueA', 'ValueB']),
      mutation: 'Some mutation',
      ...props,
    },
  });

  it('should render unique list of jobs for filtering jobs', async () => {
    useStoreMock.mockReturnValue({ commit: jest.fn(), subscribe: jest.fn() });
    const wrapper = shallowMount(JobFilterSidebarCheckboxGroup, createConfig());
    const inputLabels = wrapper.findAll('[data-test="value"]');
    const inputValues = inputLabels.map(node => node.text());
    expect(inputValues).toEqual(['ValueA', 'ValueB']);
  });

  describe('when user clicks checkbox', () => {
    it('should communicate that user has selected checkbox for value', async () => {
      const commit = jest.fn();
      useStoreMock.mockReturnValue({ commit, subscribe: jest.fn() });
      useRouterMock.mockReturnValue({ push: jest.fn() });
      const wrapper = shallowMount(JobFilterSidebarCheckboxGroup, createConfig());

      const fullTimeInput = wrapper.find('[data-test="ValueA"]');
      await fullTimeInput.setValue(true);
      expect(commit).toHaveBeenCalledWith('Some mutation', ['ValueA']);
    });

    it('should navigate user to job result page to see the fresh batch of jobs', async () => {
      const commit = jest.fn();
      useStoreMock.mockReturnValue({ commit, subscribe: jest.fn() });
      const push = jest.fn();
      useRouterMock.mockReturnValue({ push });
      const wrapper = shallowMount(JobFilterSidebarCheckboxGroup, createConfig());
      const fullTimeInput = wrapper.find('[data-test="ValueA"]');
      await fullTimeInput.setValue(true);

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' });
    });
  });
});
