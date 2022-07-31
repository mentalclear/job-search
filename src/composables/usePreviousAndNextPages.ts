import { computed } from 'vue';

interface SimpleRef {
  value: number,
}

const usePreviousAndNextPages = (currentPage: SimpleRef, maxPage: SimpleRef) => {
  const nextPage = computed(() => {
    const nxtPage = currentPage.value + 1;
    return nxtPage <= maxPage.value ? nxtPage : undefined;
  });
  const previousPage = computed(() => {
    const prevPage = currentPage.value - 1;
    const firstPage = 1;
    return prevPage >= firstPage ? prevPage : undefined;
  });

  return { nextPage, previousPage };
};

export default usePreviousAndNextPages;
