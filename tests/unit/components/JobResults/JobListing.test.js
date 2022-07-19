import { mount, RouterLinkStub } from '@vue/test-utils';
import JobListing from '@/components/JobResults/JobListing.vue';

describe('JobListing', () => {
  const createJobProps = (jobProps = {}) => ({
    title: 'Vue Developer',
    organization: 'AirBnB',
    locations: ['Indianapolis'],
    minimumQualifications: ['Succeed'],
    ...jobProps,
  });
  const createConfig = jobProps => ({
    props: {
      job: {
        ...jobProps,
      },
    },
    global: {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    },
  });


  it('should render job title', () => {
    const jobProps = createJobProps({ title: 'Vue Programmer' });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch('Vue Programmer');
  });
  it('should render job organization', () => {
    const jobProps = createJobProps({ organization: 'AirBnB' });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch('AirBnB');
  });
  it('should render job location', () => {
    const jobProps = createJobProps({ locations: ['Orlando', 'Jacksonville'] });
    const wrapper = mount(JobListing, createConfig(jobProps));
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
    const jobProps = createJobProps({ minimumQualifications: ['Code', 'Develop'] });
    const wrapper = mount(JobListing, createConfig(jobProps));
    ['Code', 'Develop'].forEach(
      (item) => {
        expect(wrapper.text()).toMatch(item);
      },
    );
  });

  it('should link to individual job page', () => {
    const jobProps = createJobProps({ id: 15 });
    const wrapper = mount(JobListing, createConfig(jobProps));
    const jobPageLink = wrapper.findComponent(RouterLinkStub);
    const toProp = jobPageLink.props('to');
    expect(toProp).toBe('/jobs/results/15');
  });
});
