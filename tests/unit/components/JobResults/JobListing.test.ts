import { mount, RouterLinkStub } from '@vue/test-utils';
import JobListing from '@/components/JobResults/JobListing.vue';
import { Job } from '@/api/types';
import { createJob } from '../../store/utils';

describe('JobListing', () => {
  const createConfig = (job: Job) => ({
    props: {
      job: {
        ...job,
      },
    },
    global: {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    },
  });


  it('should render job title', () => {
    const job = createJob({ title: 'Vue Programmer' });
    const wrapper = mount(JobListing, createConfig(job));
    expect(wrapper.text()).toMatch('Vue Programmer');
  });
  it('should render job organization', () => {
    const job = createJob({ organization: 'AirBnB' });
    const wrapper = mount(JobListing, createConfig(job));
    expect(wrapper.text()).toMatch('AirBnB');
  });
  it('should render job location', () => {
    const job = createJob({ locations: ['Orlando', 'Jacksonville'] });
    const wrapper = mount(JobListing, createConfig(job));
    // Form that is recommended at JC
    ['Orlando', 'Jacksonville'].forEach(
      (item) => {
        expect(wrapper.text()).toMatch(item);
      },
    );
    // expect(wrapper.text()).toMatch('Orlando');
    // expect(wrapper.text()).toMatch('Jacksonville');
  });
  it('should render job qualifications', () => {
    const job = createJob({ minimumQualifications: ['Code', 'Develop'] });
    const wrapper = mount(JobListing, createConfig(job));
    ['Code', 'Develop'].forEach(
      (item) => {
        expect(wrapper.text()).toMatch(item);
      },
    );
  });

  it('should link to individual job page', () => {
    const job = createJob({ id: 15 });
    const wrapper = mount(JobListing, createConfig(job));
    const jobPageLink = wrapper.findComponent(RouterLinkStub);
    const toProp = jobPageLink.props('to');
    expect(toProp).toBe('/jobs/results/15');
  });
});
