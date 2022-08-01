<template>
  <div class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96">
    <section class="pb-5">
      <JobFilterSidebarPrompt />

      <TheAccordion header="Degree">
        <JobFilterSidebarDegrees />
      </TheAccordion>

      <TheAccordion header="Job Types">
        <JobFilterSidebarJobTypes />
      </TheAccordion>

      <TheAccordion header="Organizations">
        <JobFilterSidebarOrganizations />
      </TheAccordion>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheAccordion from '@/components/shared/TheAccordion.vue';
import JobFilterSidebarDegrees from './JobFilterSidebarDegrees.vue';
import JobFilterSidebarJobTypes from './JobFilterSidebarJobTypes.vue';
import JobFilterSidebarOrganizations from './JobFilterSidebarOrganizations.vue';
import JobFilterSidebarPrompt from './JobFilterSidebarPrompt.vue';

export default defineComponent({
  name: 'JobFilterSidebar',
  components: {
    JobFilterSidebarDegrees,
    JobFilterSidebarJobTypes,
    JobFilterSidebarOrganizations,
    JobFilterSidebarPrompt,
    TheAccordion,
  },
});

</script>
