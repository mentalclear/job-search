<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <JobListing
        v-for="job in displayedJobs"
        :key="job.id"
        :job="job"
        data-test="job-listing"
      />
    </ol>
    <div class="mt-8 mx-auto">
      <div class="flex flex-row flex-nowrap">
        <p class="text-sm flex-grow">
          Page {{ currentPage }}
        </p>
        <div class="flex items-center justify-center">
          <RouterLink
            v-if="previousPage"
            :to="{ name: 'JobResults', query: { page: previousPage }}"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            data-test="previous-page-link"
          >
            Previous
          </RouterLink>
          <RouterLink
            v-if="nextPage"
            :to="{ name: 'JobResults', query: { page: nextPage }}"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            data-test="next-page-link"
          >
            Next
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { FETCH_JOBS, FILTER_JOBS_BY_ORGANIZATIONS } from '@/store/constants';
import JobListing from './JobListing.vue';

export default {
  name: 'JobListings',
  components: {
    JobListing,
  },
  computed: {
    ...mapGetters([FILTER_JOBS_BY_ORGANIZATIONS]),
    currentPage() {
      const pageString = this.$route.query.page || '1';
      return Number.parseInt(pageString, 10);
    },
    displayedJobs() {
      const pageNumber = this.currentPage;
      const firstJobIndex = (pageNumber - 1) * 10;
      const lastJobIndex = pageNumber * 10;
      return this.FILTER_JOBS_BY_ORGANIZATIONS.slice(firstJobIndex, lastJobIndex);
    },
    nextPage() {
      const nextPage = this.currentPage + 1;
      const maxPage = Math.ceil(this.FILTER_JOBS_BY_ORGANIZATIONS.length / 10);
      return nextPage <= maxPage ? nextPage : undefined;
    },
    previousPage() {
      const previousPage = this.currentPage - 1;
      const firstPage = 1;
      return previousPage >= firstPage ? previousPage : undefined;
    },
  },
  async mounted() {
    this.FETCH_JOBS();
  },
  methods: {
    ...mapActions([FETCH_JOBS]),
  },
};

</script>
