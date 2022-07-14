<template>
  <div>
    <MainNav />
    <TheHero />
  </div>
</template>

<script>
import TheHero from '@/components/jobsearch/TheHero.vue';
import MainNav from '@/components/navigation/MainNav.vue';

export default {
  name: 'App',
  components: {
    MainNav,
    TheHero,
  },
};
</script>
