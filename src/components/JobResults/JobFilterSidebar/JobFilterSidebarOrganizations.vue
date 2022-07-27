<template>
  <TheAccordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="organization in uniqueOrganizations"
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
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ADD_SELECTED_ORGANIZATIONS } from '@/store/constants';
import { useUniqueOrganizations } from '@/store/composables';
import TheAccordion from '@/components/shared/TheAccordion.vue';

export default {
  name: 'JobFilterSidebarOrganizations',
  components: {
    TheAccordion,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const selectedOrganizations = ref([]);
    const uniqueOrganizations = useUniqueOrganizations();

    const selectOrganization = () => {
      store.commit(ADD_SELECTED_ORGANIZATIONS, selectedOrganizations.value);
      router.push({ name: 'JobResults' });
    };

    return { selectOrganization, selectedOrganizations, uniqueOrganizations };
  },
};
</script>
