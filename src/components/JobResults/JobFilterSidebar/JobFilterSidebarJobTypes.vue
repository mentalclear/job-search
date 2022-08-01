<template>
  <JobFilterSidebarCheckboxGroup
    :unique-values="uniqueJobTypes"
    :mutation="ADD_SELECTED_JOB_TYPES"
    data-test="job-types-filter"
  />
</template>

<script lang="ts">
import { useUniqueJobTypes } from '@/store/composables';
import { ADD_SELECTED_JOB_TYPES } from '@/store/constants';
import { defineComponent } from 'vue';
import JobFilterSidebarCheckboxGroup from './JobFilterSidebarCheckboxGroup.vue';

export default defineComponent({
  name: 'JobFilterSidebarJobTypes',
  components: {
    JobFilterSidebarCheckboxGroup,
  },
  setup() {
    const uniqueJobTypes = useUniqueJobTypes();

    return {
      uniqueJobTypes,
      ADD_SELECTED_JOB_TYPES,
    };
  },
});

</script>
