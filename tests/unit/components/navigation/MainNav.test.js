import { shallowMount } from '@vue/test-utils';
import MainNav from '@/components/navigation/MainNav.vue';

describe('MainNav', () => {
  it('Display company name', () => {
    // shallowMount - stubbs out all children components
    const wrapper = shallowMount(MainNav);
    expect(wrapper.text()).toMatch('Bobo Careers');
  });

  describe('Navigation menu items', () => {
    it('Display menu items for navigation', () => {
      const wrapper = shallowMount(MainNav);
      const navMenuItems = wrapper.findAll("[data-test='nav-list-item']");
      const navMenuNames = navMenuItems.map((item) => item.text());
      expect(navMenuNames).toEqual([
        'Teams',
        'Locations',
        'Life at BoBo',
        'How we hire',
        'Students',
        'Jobs',
      ]);
    });
    it('Correct amount of menu items', () => {
      const wrapper = shallowMount(MainNav);
      const navMenuItems = wrapper.findAll("[data-test='nav-list-item']");
      expect(navMenuItems.length).toBe(6);
    });
  });

  describe('When user is logged out', () => {
    it('Prompt user to sign in', () => {
      const wrapper = shallowMount(MainNav);
      const loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBe(true);
    });
  });
  describe('When user is logged in', () => {
    it('Display user profile picture', async () => {
      let profileImage;
      const wrapper = shallowMount(MainNav);
      profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(false);

      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger('click');

      // Requires to requery the element again otherwise fails because
      // first time it wasn't rendered
      profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(true);
    });

    describe('Display / Not display subnavigation', () => {
      it('Should NOT display subnavigation when user isn\'t signed in', () => {
        const wrapper = shallowMount(MainNav);
        const subnav = wrapper.find('[data-test="subnav"]');
        expect(subnav.exists()).toBe(false);
      });

      it('Should display subnavigation when user is signed in', async () => {
        const wrapper = shallowMount(MainNav);
        const loginButton = wrapper.find("[data-test='login-button']");
        await loginButton.trigger('click');
        const subnav = wrapper.find('[data-test="subnav"]');
        expect(subnav.exists()).toBe(true);
      });
    });
  });
});