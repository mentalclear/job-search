import { ref } from 'vue';
import { flushPromises, RouterLinkStub, shallowMount } from '@vue/test-utils';
import { useFilteredJobs, useFetchJobsDispatch } from '@/store/composables';
import JobListings from '@/components/JobResults/JobListings.vue';
import useCurrentPage from '@/composables/useCurrentPage';
import usePreviousPageAndNextPage from '@/composables/usePreviousAndNextPages';

jest.mock('@/store/composables');
jest.mock('@/composables/useCurrentPage');
jest.mock('@/composables/usePreviousAndNextPages');


describe('JobListings', () => {
  const createConfig = () => ({
    global: {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    },
  });

  describe('when component mounts', () => {
    it('should make call to fetch jobs from API', () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue({ value: 2 });
      usePreviousPageAndNextPage.mockReturnValue({ previousPage: 1, nextPage: 3 });
      shallowMount(JobListings, createConfig());
      expect(useFetchJobsDispatch).toHaveBeenCalled();
    });
  });

  it('should create job listing for a maximum of 10 jobs', async () => {
    useFilteredJobs.mockReturnValue({ value: Array(15).fill({}) });
    useCurrentPage.mockReturnValue({ value: 1 });
    usePreviousPageAndNextPage.mockReturnValue({ previousPage: undefined, nextPage: 2 });
    const wrapper = shallowMount(JobListings, createConfig());

    // Because there is no real Promise involved in this test this is the
    // mechanism to resolve the Promise immediately.
    await flushPromises(); // axios promise is resolved immediately

    const jobListings = wrapper.findAll('[data-test="job-listing"]');
    expect(jobListings).toHaveLength(10);
  });

  it('should display Page', () => {
    useFilteredJobs.mockReturnValue({ value: [] });
    useCurrentPage.mockReturnValue(ref(5));
    usePreviousPageAndNextPage.mockReturnValue({ previousPage: 4, nextPage: 6 });
    const wrapper = shallowMount(JobListings, createConfig());
    expect(wrapper.text()).toMatch('Page 5');
  });

  describe('when user is on the first page of job results', () => {
    it('should not show link to previous page', () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue(ref(1));
      usePreviousPageAndNextPage.mockReturnValue({ previousPage: undefined, nextPage: 2 });
      const wrapper = shallowMount(JobListings, createConfig());
      const previousPageLink = wrapper.find('[data-test="previous-page-link"]');
      expect(previousPageLink.exists()).toBeFalsy();
    });

    it('should show link to the next page', async () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue(ref(1));
      usePreviousPageAndNextPage.mockReturnValue({ previousPage: undefined, nextPage: 2 });
      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const nextPageLink = wrapper.find('[data-test="next-page-link"]');
      expect(nextPageLink.exists()).toBeTruthy();
    });
  });

  describe('when user is on the last page', () => {
    it('should not show link to next page', async () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue(ref(2));
      usePreviousPageAndNextPage.mockReturnValue({ previousPage: 1, nextPage: undefined });
      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const nextPageLink = wrapper.find('[data-test="next-page-link"]');
      expect(nextPageLink.exists()).toBeFalsy();
    });

    it('should show link to the previous page', async () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue(ref(2));
      usePreviousPageAndNextPage.mockReturnValue({ previousPage: 1, nextPage: undefined });
      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const previousPageLink = wrapper.find('[data-test="previous-page-link"]');
      expect(previousPageLink.exists()).toBeTruthy();
    });
  });
});
