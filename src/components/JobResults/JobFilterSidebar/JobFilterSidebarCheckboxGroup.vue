<template>
  <div class="mt-5">
    <fieldset>
      <ul class="flex flex-row flex-wrap">
        <li
          v-for="value in uniqueValues"
          :key="value"
          class="w-1/2 h-8"
        >
          <input
            :id="value"
            v-model="selectedValues"
            :value="value"
            :data-test="value"
            type="checkbox"
            class="mr-3"
            @change="selectValue"
          >
          <label
            :for="value"
            data-test="value"
          >{{ value }}</label>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from 'vue';
import { CLEAR_USER_JOB_FILTER_SELECTIONS } from '@/store/constants';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { key } from '@/store';

export default defineComponent({
  name: 'JobFilterSidebarCheckboxGroup',
  props: {
    uniqueValues: {
      type: [Array, Set] as PropType<string[] | Set<String>>,
      required: true,
    },
    mutation: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore(key);
    const router = useRouter();
    const selectedValues = ref<string[]>([]);

    store.subscribe((mutation) => {
      if (mutation.type === CLEAR_USER_JOB_FILTER_SELECTIONS) {
        selectedValues.value = [];
      }
    });

    const selectValue = () => {
      store.commit(props.mutation, selectedValues.value);
      router.push({ name: 'JobResults' });
    };

    return { selectValue, selectedValues };
  },
});
</script>
