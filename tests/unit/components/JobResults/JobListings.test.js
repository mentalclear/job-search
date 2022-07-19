import axios from 'axios';
import { flushPromises, shallowMount } from '@vue/test-utils';
import JobListings from '@/components/JobResults/JobListings.vue';

// Mocking axios with jest, so later only mocked axios is used.
jest.mock('axios');

describe('JobListings', () => {
  it('should fetch jobs', () => {
    // This is here to work around the data object returned by real axios
    axios.get.mockResolvedValue({ data: [] });
    shallowMount(JobListings);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/jobs');
  });
  it('should create job listing for each received jobs', async () => {
    // Mocking returned value for the mocked axios call:
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
    const wrapper = shallowMount(JobListings);

    // Because there is no real Promise involved in this test this is the
    // mechanism to resolve the Promise immediately.
    await flushPromises(); // axios promise is resolved immediately

    const jobListings = wrapper.findAll('[data-test="job-listing"]');
    expect(jobListings).toHaveLength(15);
  });
});
