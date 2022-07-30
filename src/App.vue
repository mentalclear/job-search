<template>
  <div>
    <MainNav />
    <RouterView />
  </div>
</template>

<script lang="ts">
import MainNav from '@/components/navigation/MainNav.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    MainNav,
  },
});
</script>
