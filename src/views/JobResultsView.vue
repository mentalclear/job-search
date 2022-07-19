<template>
  <div class="flex flex-row flex-nowrap w-full">
    <JobFilterSidebar />
    <JobListings />
  </div>
</template>

<script>
import JobFilterSidebar from '@/components/JobResults/JobFilterSidebar/JobFilterSidebar.vue';
import JobListings from '@/components/JobResults/JobListings.vue';

export default {
  name: 'JobResultsView',
  components: {
    JobFilterSidebar,
    JobListings,
  },
};
</script>
