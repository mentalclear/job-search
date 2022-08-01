<template>
  <div class="flex flex-row justify-between">
    <h3 class="my-4 text-base font-semibold">
      What do you want to do?
    </h3>
    <div class="flex items-center text-sm">
      <ActionButton
        text="Clear Filters"
        type="secondary"
        data-test="clear-user-job-filters"
        @click="clearUserJobFilterSelections"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { CLEAR_USER_JOB_FILTER_SELECTIONS } from '@/store/constants';
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import ActionButton from '@/components/shared/ActionButton.vue';

export default defineComponent({
  name: 'JobFilterSidebarPrompt',
  components: {
    ActionButton,
  },
  setup() {
    const store = useStore(key);
    const clearUserJobFilterSelections = () => {
      store.commit(CLEAR_USER_JOB_FILTER_SELECTIONS);
    };

    return { clearUserJobFilterSelections };
  },
});

</script>
