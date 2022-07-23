<template>
  <TheAccordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li class="w-1/2 h-8">
            <input
              id="VueTube"
              type="checkbox"
              class="mr-3"
            >
            <label for="VueTube">VueTube</label>
          </li>
          <li class="w-1/2 h-8">
            <input
              id="BetweenVueAndMe"
              type="checkbox"
              class="mr-3"
            >
            <label for="BetweenVueAndMe">Between Vue</label>
          </li>
          <li class="w-1/2 h-8">
            <input
              id="EtVueBrute"
              type="checkbox"
              class="mr-3"
            >
            <label for="EtVueBrute">Et Vue Brute</label>
          </li>
          <li class="w-1/2 h-8">
            <input
              id="VueAndAHalfMan"
              type="checkbox"
              class="mr-3"
            >
            <label for="VueAndAHalfMan">Vue and a Half Man</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </TheAccordion>
</template>

<script>
import TheAccordion from '@/components/shared/TheAccordion.vue';

export default {
  name: 'JobFilterSidebarOrganizations',
  components: {
    TheAccordion,
  },
};
</script>
