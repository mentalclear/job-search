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
      const navMenuItems = wrapper.findAll("[data-test='nav-list-item']");
      const navMenuNames = navMenuItems.map((item) => item.text());
      expect(navMenuNames).toEqual([
        'Teams',
        'Locations',
        'Life at BoBo Corp',
        'How we hire',
        'Students',
        'Jobs',
      ]);
    });
    it('Correct amount of menu items', () => {
      const wrapper = mount(MainNav);
      const navMenuItems = wrapper.findAll("[data-test='nav-list-item']");
      expect(navMenuItems.length).toBe(6);
    });
  });

  describe('When user is logged out', () => {
    it('Prompt user to sign in', () => {
      const wrapper = mount(MainNav);
      const loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBeTruthy();
    });
  });
  describe('When user is logged in', () => {
    it('Prompt user to sign in', async () => {
      let profileImage;
      const wrapper = mount(MainNav);
      profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBeFalsy();

      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger('click');

      // Requires to requery the element again otherwise fails because
      // first time it wasn't rendered
      profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBeTruthy();
    });
  });
});
