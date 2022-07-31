<template>
  <TheHero />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheHero from '@/components/JobSearch/TheHero.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    TheHero,
  },
});
</script>
