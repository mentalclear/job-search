import MainNav from '@/components/MainNav.vue';
import { mount } from '@vue/test-utils';

describe('MainNav', () => { 
  it('Display company name', () => {
    const wrapper = mount(MainNav);
    expect(wrapper.text()).toMatch('Bobo Careers');
  });

  describe('Navigation menu items', () => { 
    it('Display menu items for navigation', () => {
      const wrapper = mount(MainNav);
      const navMenuItems = wrapper.findAll('[data-test=\'nav-list-item\']');
      const navMenuNames = navMenuItems.map((item)=> item.text());      
      expect(navMenuNames).toEqual([
        'Teams',
        'Locations',
        'Life at BoBo Corp',
        'How we hire',
        'Students',
        'Jobs'
      ]);
    });
    it('Correct amount of menu items', () => {
      const wrapper = mount(MainNav);
      const navMenuItems = wrapper.findAll('[data-test=\'nav-list-item\']');
      expect(navMenuItems.length).toBe(6);
    });
  });
});
