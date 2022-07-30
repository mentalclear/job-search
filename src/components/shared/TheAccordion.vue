<template>
  <div class="py-5 border-b border-solid border-brand-gray-2">
    <div
      class="flex flex-wrap items-center justify-between cursor-pointer"
      data-test="clickable-area"
      @click="open"
    >
      <h3 class="text-base font-semibold">
        {{ header }}
      </h3>
      <FontAwesomeIcon :icon="caretIcon" />
    </div>
    <div
      v-if="isOpen"
      class="w-full mt-5"
    >
      <slot>
        <p>Whoops, something has forgotten to populate me!</p>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
  name: 'TheAccordion',
  props: {
    header: {
      type: String,
      required: true,
    },
  },
  setup() {
    // data() analog
    const isOpen = ref(false);
    // methods analog
    const open = () => {
      isOpen.value = !isOpen.value;
    };
    // computed analog
    const caretIcon = computed(() => (isOpen.value ? ['fas', 'angle-up'] : ['fas', 'angle-down']));

    return { open, isOpen, caretIcon };
  },
});
</script>
