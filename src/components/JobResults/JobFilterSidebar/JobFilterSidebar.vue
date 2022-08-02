<template>
  <div class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96">
    <section class="pb-5">
      <JobFilterSidebarPrompt />

      <TheAccordion header="Skills and Qualifications">
        <JobFilterSidebarSkills />
      </TheAccordion>

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
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import { UPDATE_SKILLS_SEARCH_TERM } from '@/store/constants';
import { useRoute } from 'vue-router';
import TheAccordion from '@/components/shared/TheAccordion.vue';
import JobFilterSidebarDegrees from './JobFilterSidebarDegrees.vue';
import JobFilterSidebarJobTypes from './JobFilterSidebarJobTypes.vue';
import JobFilterSidebarOrganizations from './JobFilterSidebarOrganizations.vue';
import JobFilterSidebarPrompt from './JobFilterSidebarPrompt.vue';
import JobFilterSidebarSkills from './JobFilterSidebarSkills.vue';


export default defineComponent({
  name: 'JobFilterSidebar',
  components: {
    JobFilterSidebarDegrees,
    JobFilterSidebarJobTypes,
    JobFilterSidebarOrganizations,
    JobFilterSidebarPrompt,
    JobFilterSidebarSkills,
    TheAccordion,
  },
  setup() {
    const parseSkillSearchTerm = () => {
      const route = useRoute();
      const store = useStore(key);
      const role = route.query.role || '';
      store.commit(UPDATE_SKILLS_SEARCH_TERM, role);
    };
    onMounted(parseSkillSearchTerm);
  },
});

</script>
