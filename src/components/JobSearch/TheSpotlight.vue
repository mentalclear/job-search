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

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import axios from 'axios';

interface Spotlight {
  id: number,
  img: string,
  title: string,
  description: string
}

export default defineComponent({
  name: 'TheSpotlight',
  setup() {
    const spotlights = ref<Spotlight[]>([]);

    const getSpotlights = async () => {
      const baseUrl = process.env.VUE_APP_API_URL;
      const url = `${baseUrl}/spotlights`;

      try {
        const response = await axios.get<Spotlight[]>(url);
        spotlights.value = response.data;
      } catch (e) {
        console.error(e);
      }
    };

    onMounted(getSpotlights);

    return { spotlights };
  },
});

</script>
