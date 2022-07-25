<template>
  <TheAccordion header="Job Types">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="jobType in UNIQUE_JOB_TYPES"
            :key="jobType"
            class="w-1/2 h-8"
          >
            <input
              :id="jobType"
              v-model="selectedJobTypes"
              :value="jobType"
              :data-test="jobType"
              type="checkbox"
              class="mr-3"
              @change="selectJobType"
            >
            <label
              :for="jobType"
              data-test="job-type"
            >{{ jobType }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </TheAccordion>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { ADD_SELECTED_JOB_TYPES, UNIQUE_JOB_TYPES } from '@/store/constants';
import TheAccordion from '@/components/shared/TheAccordion.vue';

export default {
  name: 'JobFilterSidebarJobTypes',
  components: {
    TheAccordion,
  },
  data() {
    return {
      selectedJobTypes: [],
    };
  },
  computed: {
    ...mapGetters([UNIQUE_JOB_TYPES]),
  },
  methods: {
    ...mapMutations([ADD_SELECTED_JOB_TYPES]),
    selectJobType() {
      this.ADD_SELECTED_JOB_TYPES(this.selectedJobTypes);
      this.$router.push({ name: 'JobResults' });
    },
  },
};
</script>
