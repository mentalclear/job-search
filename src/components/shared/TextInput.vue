<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <input
    :id="id"
    :value="modelValue"
    type="text"
    :placeholder="placeholder"
    class="w-full text-lg font-normal focus:outline-none"
    @input="handleInput"
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextInput',
  props: {
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    id: {
      type: String,
      required: true,
      default: '',
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    handleInput($event: Event) {
      const target = $event.target as HTMLInputElement;
      this.$emit('update:modelValue', target.value);
    },
  },
});
</script>
