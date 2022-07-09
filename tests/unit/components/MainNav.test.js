import MainNav from '@/components/MainNav.vue';
import { mount } from '@vue/test-utils';

describe('MainNav', () => { 
  it('Display company name', () => {
    const wrapper = mount(MainNav);
    expect(wrapper.text()).toMatch('Bobo Careers');
  });
});
