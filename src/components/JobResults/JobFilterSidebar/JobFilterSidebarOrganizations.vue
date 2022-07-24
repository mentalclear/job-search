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
              v-model="selectedOrganizations"
              :value="organization"
              :data-test="organization"
              type="checkbox"
              class="mr-3"
              @change="selectOrganization"
            >
            <label
              :for="organization"
              data-test="organization"
            >{{ organization }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </TheAccordion>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { UNIQUE_ORGANIZATIONS, ADD_SELECTED_ORGANIZATIONS } from '@/store';
import TheAccordion from '@/components/shared/TheAccordion.vue';

export default {
  name: 'JobFilterSidebarOrganizations',
  components: {
    TheAccordion,
  },
  data() {
    return {
      selectedOrganizations: [],
    };
  },
  computed: {
    ...mapGetters([UNIQUE_ORGANIZATIONS]),
  },
  methods: {
    ...mapMutations([ADD_SELECTED_ORGANIZATIONS]),
    selectOrganization() {
      this.ADD_SELECTED_ORGANIZATIONS(this.selectedOrganizations);
    },
  },
};
</script>
