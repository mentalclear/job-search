<template>
  <header class="w-full text-sm">
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <div
        class="flex flex-nowrap h-full px-8 mx-auto border-b border-solid border-brand-gray-1"
      >
        <a
          href="/"
          class="flex items-center h-full text-xl"
        >{{ company }}</a>
        <nav class="h-full ml-12">
          <ul class="flex h-full p-0 m-0 list-none">
            <li
              v-for="link in navLinks"
              :key="link"
              class="h-full ml-9 first:ml-0"
              data-test="nav-list-item"
            >
              <a
                href=""
                class="flex items-center h-full py-2.5"
              >
                {{ link }}
              </a>
            </li>
          </ul>
        </nav>
        <div class="flex items-center h-full ml-auto">
          <ActionButton
            v-if="!isLoggedIn"
            data-test="login-button"
            @click="logIn"
          />
          <ProfileImage
            v-else
            data-test="profile-image"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import ActionButton from './ActionButton.vue';
import ProfileImage from './ProfileImage.vue';

export default {
  name: 'MainNav',
  components: {
    ActionButton,
    ProfileImage,
  },
  data() {
    return {
      company: 'Bobo Careers',
      navLinks: [
        'Teams',
        'Locations',
        'Life at BoBo Corp',
        'How we hire',
        'Students',
        'Jobs',
      ],
      isLoggedIn: false,
    };
  },
  methods: {
    logIn() {
      this.isLoggedIn = true;
    },
  },
};
</script>
