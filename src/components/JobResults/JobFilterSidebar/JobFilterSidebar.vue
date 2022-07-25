<template>
  <div class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96">
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">
          What do you want to do?
        </h3>
        <div class="flex items-center text-sm">
          <ActionButton
            text="Clear Filters"
            type="secondary"
          />
        </div>
      </div>
      <TheAccordion header="Degree" />
      <JobFilterSidebarJobTypes />
      <JobFilterSidebarOrganizations />
    </section>
  </div>
</template>

<script>
import ActionButton from '@/components/shared/ActionButton.vue';
import TheAccordion from '@/components/shared/TheAccordion.vue';
import JobFilterSidebarOrganizations from './JobFilterSidebarOrganizations.vue';
import JobFilterSidebarJobTypes from './JobFilterSidebarJobTypes.vue';

export default {
  name: 'JobFilterSidebar',
  components: {
    ActionButton, TheAccordion, JobFilterSidebarOrganizations, JobFilterSidebarJobTypes,
  },
};

</script>
