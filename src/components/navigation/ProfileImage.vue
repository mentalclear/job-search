<template>
  <img
    :src="imageLink"
    alt="profile pic"
    class="w-8 h-8 object-contain rounded-3xl"
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProfileImage',
  data() {
    return {
      imageLink: 'https://randomuser.me/api/portraits/men/71.jpg',
    };
  },
});
</script>
