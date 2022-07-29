<template>
  <ul>
    <li
      v-for="spotlight in spotlights"
      :key="spotlight.id"
    >
      <slot
        :img="spotlight.img"
        :title="spotlight.title"
        :description="spotlight.description"
      />
    </li>
  </ul>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'TheSpotlight',
  setup() {
    const spotlights = ref([]);

    const getSpotlights = async () => {
      const baseUrl = process.env.VUE_APP_API_URL;
      const url = `${baseUrl}/spotlights`;

      try {
        const response = await axios.get(url);
        spotlights.value = response.data;
      } catch (e) {
        console.error(e);
      }
    };

    onMounted(getSpotlights);

    return { spotlights };
  },
};

</script>
