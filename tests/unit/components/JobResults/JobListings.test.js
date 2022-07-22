import { flushPromises, RouterLinkStub, shallowMount } from '@vue/test-utils';
import JobListings from '@/components/JobResults/JobListings.vue';

describe('JobListings', () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: '5',
      ...queryParams,
    },
  });
  const createStore = (config = {}) => ({
    state: {
      jobs: Array(15).fill({}),
    },
    dispatch: jest.fn(),
    ...config,
  });

  const createConfig = ($route, $store) => ({
    global: {
      mocks: {
        $route,
        $store,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    },
  });

  describe('when component mounts', () => {
    it('should make call to fetch jobs from API', () => {
      const $route = createRoute();
      const dispatch = jest.fn();
      const $store = createStore({ dispatch });
      shallowMount(JobListings, createConfig($route, $store));
      expect(dispatch).toHaveBeenCalledWith('FETCH_JOBS');
    });
  });

  it('should create job listing for a maximum of 10 jobs', async () => {
    const queryParams = { page: '1' };
    const $route = createRoute(queryParams);
    const numberOfJobsInStore = 15;
    const $store = createStore({
      state: {
        jobs: Array(numberOfJobsInStore).fill({}),
      },
    });
    const wrapper = shallowMount(JobListings, createConfig($route, $store));

    // Because there is no real Promise involved in this test this is the
    // mechanism to resolve the Promise immediately.
    await flushPromises(); // axios promise is resolved immediately

    const jobListings = wrapper.findAll('[data-test="job-listing"]');
    expect(jobListings).toHaveLength(10);
  });

  describe('when query params exclude page number', () => {
    it('should display Page 1', () => {
      const queryParams = { page: undefined };
      const $route = createRoute(queryParams);
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      expect(wrapper.text()).toMatch('Page 1');
    });
  });
  describe('when query params include page number', () => {
    it('should display page number', () => {
      const queryParams = { page: '3' };
      const $route = createRoute(queryParams);
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      expect(wrapper.text()).toMatch('Page 3');
    });
  });

  describe('when user is on the first page of job results', () => {
    it('should not show link to previous page', () => {
      const queryParams = { page: '1' };
      const $route = createRoute(queryParams);
      const $store = createStore();
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      const previousPageLink = wrapper.find('[data-test="previous-page-link"]');
      expect(previousPageLink.exists()).toBeFalsy();
    });

    it('should show link to the next page', async () => {
      const queryParams = { page: '1' };
      const $route = createRoute(queryParams);
      const $store = createStore({
        state: {
          jobs: Array(15).fill({}),
        },
      });
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const nextPageLink = wrapper.find('[data-test="next-page-link"]');
      expect(nextPageLink.exists()).toBeTruthy();
    });
  });

  describe('when user is on the last page', () => {
    it('should not show link to next page', async () => {
      const queryParams = { page: '2' };
      const $route = createRoute(queryParams);
      const $store = createStore({
        state: {
          jobs: Array(15).fill({}),
        },
      });
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const nextPageLink = wrapper.find('[data-test="next-page-link"]');
      expect(nextPageLink.exists()).toBeFalsy();
    });

    it('should show link to the previous page', async () => {
      const queryParams = { page: '2' };
      const $route = createRoute(queryParams);
      const $store = createStore({
        state: {
          jobs: Array(15).fill({}),
        },
      });
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const previousPageLink = wrapper.find('[data-test="previous-page-link"]');
      expect(previousPageLink.exists()).toBeTruthy();
    });
  });
});
