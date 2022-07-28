import { useRoute } from 'vue-router';
import { computed } from 'vue';

const useCurentPage = () => {
  const route = useRoute();
  return computed(() => Number.parseInt(route.query.page || '1', 10));
};

export default useCurentPage;
