<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <form
    class="flex items-center w-full h-12 mt-14
    border border-solid border-brad-gray-3 rounded-3xl"
    @submit.prevent="searchForJobs"
  >
    <FontAwesomeIcon
      :icon="['fas', 'search']"
      class="ml-4 mr-3"
    />
    <div class="flex flex-nowrap flex-1 h-full text-base font-light">
      <div class="relative flex items-center flex-1 h-full pr-3">
        <label
          for="role"
          class="absolute left-0 -top-10"
        >
          Role
        </label>
        <TextInput
          id="role"
          v-model="role"
          placeholder="Software Engineer"
          data-test="role-input"
        />
      </div>

      <span
        class="flex items-center h-full px-3
      border-l border-r border-brand-gray-3 bg-brand-gray-2"
      >
        in
      </span>

      <div class="relative flex items-center flex-1 h-full pl-3">
        <label
          for="location"
          class="absolute left-0 -top-10"
        >
          Where?
        </label>
        <TextInput
          id="location"
          v-model="location"
          placeholder="Los Angeles"
          data-test="location-input"
        />
      </div>
    </div>
    <ActionButton
      text="Search"
      type="secondary"
      class="rounded-r-3xl hover:rounded-r-3xl"
      data-test="form-submit-button"
    />
  </form>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import ActionButton from '../shared/ActionButton.vue';
import TextInput from '../shared/TextInput.vue';

export default defineComponent({
  name: 'JobSearchForm',
  components: {
    ActionButton,
    TextInput,
  },
  setup() {
    const router = useRouter();
    const role = ref('');
    const location = ref('');
    const searchForJobs = () => {
      router.push({
        name: 'JobResults',
        // Query parameters will be sent to the url, like: ?role=blah,location=blah
        query: {
          role: role.value,
          location: location.value,
        },
      });
    };
    return { location, role, searchForJobs };
  },
});
</script>
