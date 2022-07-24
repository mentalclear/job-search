<template>
  <TheAccordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="organization in UNIQUE_ORGANIZATIONS"
            :key="organization"
            class="w-1/2 h-8"
          >
            <input
              :id="organization"
              type="checkbox"
              class="mr-3"
            >
            <label :for="organization">{{ organization }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </TheAccordion>
</template>

<script>
import TheAccordion from '@/components/shared/TheAccordion.vue';

export default {
  name: 'JobFilterSidebarOrganizations',
  components: {
    TheAccordion,
  },
  computed: {
    UNIQUE_ORGANIZATIONS() {
      return this.$store.getters.UNIQUE_ORGANIZATIONS;
    },
  },
};
</script>
