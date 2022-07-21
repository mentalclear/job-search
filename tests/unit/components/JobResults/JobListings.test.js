import axios from 'axios';
import { flushPromises, RouterLinkStub, shallowMount } from '@vue/test-utils';
import JobListings from '@/components/JobResults/JobListings.vue';

// Mocking axios with jest, so later only mocked axios is used.
jest.mock('axios');

describe('JobListings', () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: '5',
      ...queryParams,
    },
  });

  const creatConfig = $route => ({
    global: {
      mocks: {
        $route,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    },
  });

  beforeEach(() => {
    // Mocking returned value for the mocked axios call:
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
  });

  afterEach(() => {
    // Resetting mocks after each test to decouple tests
    axios.get.mockReset();
  });

  it('should fetch jobs', () => {
    const $route = createRoute();
    shallowMount(JobListings, creatConfig($route));
    expect(axios.get).toHaveBeenCalledWith('http://myfakeapi.com/jobs');
  });
  it('should create job listing for a maximum of 10 jobs', async () => {
    // Left axios.get here to be more readabile
    // Mocking returned value for the mocked axios call:
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
    const queryParams = { page: '1' };
    const $route = createRoute(queryParams);
    const wrapper = shallowMount(JobListings, creatConfig($route));

    // Because there is no real Promise involved in this test this is the
    // mechanism to resolve the Promise immediately.
    await flushPromises(); // axios promise is resolved immediately

    const jobListings = wrapper.findAll('[data-test="job-listing"]');
    expect(jobListings).toHaveLength(10);
  });

  describe('when query params exclude page number', () => {
    it('should display Page 1', () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      const queryParams = { page: undefined };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, creatConfig($route));
      expect(wrapper.text()).toMatch('Page 1');
    });
  });
  describe('when query params include page number', () => {
    it('should display page number', () => {
      const queryParams = { page: '3' };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, creatConfig($route));
      expect(wrapper.text()).toMatch('Page 3');
    });
  });

  describe('when user is on the first page of job results', () => {
    it('should not show link to previous page', () => {
      const queryParams = { page: '1' };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, creatConfig($route));
      const previousPageLink = wrapper.find('[data-test="previous-page-link"]');
      expect(previousPageLink.exists()).toBeFalsy();
    });

    it('should show link to the next page', async () => {
      const queryParams = { page: '1' };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, creatConfig($route));
      await flushPromises();
      const nextPageLink = wrapper.find('[data-test="next-page-link"]');
      expect(nextPageLink.exists()).toBeTruthy();
    });
  });

  describe('when user is on the last page', () => {
    it('should not show link to next page', async () => {
      const queryParams = { page: '2' };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, creatConfig($route));
      await flushPromises();
      const nextPageLink = wrapper.find('[data-test="next-page-link"]');
      expect(nextPageLink.exists()).toBeFalsy();
    });

    it('should show link to the previous page', async () => {
      const queryParams = { page: '2' };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, creatConfig($route));
      await flushPromises();
      const previousPageLink = wrapper.find('[data-test="previous-page-link"]');
      expect(previousPageLink.exists()).toBeTruthy();
    });
  });
});
