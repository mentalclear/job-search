import { useRoute } from 'vue-router';
import { computed } from 'vue';

const useCurentPage = () => {
  const route = useRoute();
  const page = route.query.page as string;
  return computed(() => Number.parseInt(page || '1', 10));
};

export default useCurentPage;
