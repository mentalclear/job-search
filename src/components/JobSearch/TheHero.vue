<template>
  <main class="flex flex-col h-screen">
    <section class="flex flex-col h-screen pt-10 pb-20">
      <div class="grid grid-cols-12">
        <div class="col-start-1 col-span-1 " />
        <div class="col-start-2 col-span-5 ">
          <TheHeadline />
          <JobSearchForm />
        </div>
        <div class="col-start-7 col-span-5 self-center justify-self-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png"
            alt="Big Logo"
            class="w-80 h-80 object-contain"
          >
        </div>
        <div class="col-start-12 col-span-1" />
      </div>
    </section>
    <TheSpotlight class="flex flex-row justify-center pb-16">
      <template #default="slotProps">
        <RouterLink
          to="/jobs/results"
          class="flex flex-col mx-5 border rounded-lg w-72 bg-brand-gray-2 h-96"
        >
          <img
            :src="slotProps.spotlight.img"
            alt="Image"
            class="object-contain"
          >
          <div class="h-48 px-6 py-4 mt-3">
            <h3 class="text-lg font-medium">
              {{ slotProps.spotlight.title }}
            </h3>

            <p class="mt-3 text-sm">
              {{ slotProps.spotlight.description }}
            </p>
          </div>
          <RouterLink
            to="/jobs/results"
            class="px-6 pb-4 text-sm text-brand-blue-1"
          >
            See Jobs
          </RouterLink>
        </RouterLink>
      </template>
    </TheSpotlight>
  </main>
</template>

<script>
import TheHeadline from './TheHeadline.vue';
import JobSearchForm from './JobSearchForm.vue';
import TheSpotlight from './TheSpotlight.vue';

export default {
  name: 'TheHero',
  components: {
    TheHeadline,
    JobSearchForm,
    TheSpotlight,
  },

};
</script>
