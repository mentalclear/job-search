<template>
  <button
    :class="buttonClass"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue';

export default defineComponent({
  name: 'ActionButton',
  props: {
    text: {
      type: String,
      required: true,
      default: '',
    },
    type: {
      type: String,
      required: false,
      default: 'primary',
      validator: (value: string) => ['primary', 'secondary'].includes(value),
    },
  },
  setup(props) { // Providing props to setup method
    const { type } = toRefs(props);

    const buttonClass = computed(() => ({
      [type.value]: true,
    }));

    return { buttonClass };
  },
});
</script>

<style scoped>
button {
  @apply px-5 py-3 font-medium rounded;
}

.primary {
  @apply text-white bg-brand-blue-1 hover:shadow-blue;
}

.secondary {
  @apply text-brand-blue-1 bg-transparent hover:bg-brand-blue-2 hover:text-white;
}
</style>
