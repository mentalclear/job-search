<template>
  <header
    :class="['w-full', 'text-sm', headerHeightClass]"
  >
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <div
        class="flex flex-nowrap h-full px-8 mx-auto border-b border-solid border-brand-gray-1"
      >
        <RouterLink
          :to="{name: 'Home'}"
          class="flex items-center h-full text-xl"
        >
          Bobo Careers
        </RouterLink>
        <nav class="h-full ml-12">
          <ul class="flex h-full p-0 m-0 list-none">
            <li
              v-for="link in navLinks"
              :key="link.text"
              class="h-full ml-9 first:ml-0"
              data-test="nav-list-item"
            >
              <RouterLink
                :to="link.url"
                class="flex items-center h-full py-2.5"
              >
                {{ link.text }}
              </RouterLink>
            </li>
          </ul>
        </nav>
        <div class="flex items-center h-full ml-auto">
          <ActionButton
            v-if="!isLoggedIn"
            data-test="login-button"
            text="Sign In"
            @click="LOGIN_USER()"
          />
          <ProfileImage
            v-else
            data-test="profile-image"
          />
        </div>
      </div>
      <SubNav
        v-if="isLoggedIn"
        data-test="subnav"
      />
    </div>
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { LOGIN_USER } from '@/store';
import ActionButton from '../shared/ActionButton.vue';
import ProfileImage from './ProfileImage.vue';
import SubNav from './SubNav.vue';

export default {
  name: 'MainNav',
  components: {
    ActionButton,
    ProfileImage,
    SubNav,
  },
  data() {
    return {
      navLinks: [
        { text: 'Teams', url: '/teams' },
        { text: 'Locations', url: '/' },
        { text: 'Life at BoBo', url: '/' },
        { text: 'How we hire', url: '/' },
        { text: 'Students', url: '/' },
        { text: 'Jobs', url: '/jobs/results' },
      ],
    };
  },
  computed: {
    headerHeightClass() {
      return {
        'h-16': !this.isLoggedIn,
        'h-32': this.isLoggedIn,
      };
    },
    ...mapState(['isLoggedIn']),
  },
  methods: {
    // LOGIN_USER needs to be called with parens ()
    ...mapMutations([LOGIN_USER]),
  },
};
</script>
