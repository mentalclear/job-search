import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import { createStore } from 'vuex';
import MainNav from '@/components/navigation/MainNav.vue';

describe('MainNav', () => {
  let store;

  const createConfig = storePlugin => ({
    global: {
      plugins: [storePlugin],
      stubs: {
        RouterLink: RouterLinkStub,
      },
    },
  });

  beforeEach(() => {
    store = createStore();
  });

  it('Display company name', () => {
    const wrapper = shallowMount(MainNav, createConfig(store));
    expect(wrapper.text()).toMatch('Bobo Careers');
  });

  describe('Navigation menu items', () => {
    it('Display menu items for navigation', () => {
      const wrapper = shallowMount(MainNav, createConfig(store));
      const navMenuItems = wrapper.findAll("[data-test='nav-list-item']");
      const navMenuNames = navMenuItems.map(item => item.text());
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
      const wrapper = shallowMount(MainNav, createConfig(store));
      const navMenuItems = wrapper.findAll("[data-test='nav-list-item']");
      expect(navMenuItems.length).toBe(6);
    });
  });

  describe('When user is logged out', () => {
    it('Prompt user to sign in', () => {
      const wrapper = shallowMount(MainNav, createConfig(store));
      const loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBe(true);
    });
    it('should issue a call to login user', async () => {
      // Mocking out commit function with jest.fn()
      const commit = jest.fn();
      store.commit = commit;

      const wrapper = shallowMount(MainNav, createConfig(store));
      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger('click');

      expect(commit).toBeCalledWith('LOGIN_USER');
    });
  });
  describe('When user is logged in', () => {
    it('should display user profile picture', async () => {
      const alteredStore = createStore({
        state() {
          return {
            isLoggedIn: true,
          };
        },
      });

      const wrapper = shallowMount(MainNav, createConfig(alteredStore));
      const profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(true);
    });

    describe('Display / Not display subnavigation', () => {
      it('should NOT display subnavigation when user isn\'t signed in', () => {
        const wrapper = shallowMount(MainNav, createConfig(store));
        const subnav = wrapper.find('[data-test="subnav"]');
        expect(subnav.exists()).toBe(false);
      });

      it('should display subnavigation when user is signed in', async () => {
        const alteredStore = createStore({
          state() {
            return {
              isLoggedIn: true,
            };
          },
        });
        const wrapper = shallowMount(MainNav, createConfig(alteredStore));
        const subnav = wrapper.find('[data-test="subnav"]');
        expect(subnav.exists()).toBe(true);
      });
    });
  });
});
