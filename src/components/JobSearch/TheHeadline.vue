<template>
  <section class="mb-16">
    <h1
      class="font-bold tracking-tighter text-8xl mb-14"
      data-test="action-phrase"
    >
      <span :class="actionClasses">{{ action }}</span>
      <br>
      for everyone
    </h1>
    <h2 class="text-3xl font-light">
      Find your next job at Bobo Corp
    </h2>
  </section>
</template>

<script lang="ts">
import nextElementInList from '@/utils/nextElementInList';
import { defineComponent } from 'vue';

interface ActionClasses {
  [x: string]: boolean
}

interface Data {
  action: string,
  interval?: number
}

export default defineComponent({
  name: 'TheHeadline',
  data(): Data {
    return {
      action: 'Build',
      // interval: undefined,
    };
  },
  computed: {
    actionClasses(): ActionClasses {
      return {
        // build: this.action === 'Build',
        // create: this.action === 'Create',
        // design: this.action === 'Design',
        // code: this.action === 'Code',
        // All above can be represented as below:
        [this.action.toLowerCase()]: true,
      };
    },
  },
  created() {
    this.changeTitle();
  },
  unmounted() {
    clearInterval(this.interval);
  },
  methods: {
    changeTitle() {
      this.interval = setInterval(() => {
        const actions = ['Build', 'Create', 'Design', 'Code'];
        this.action = nextElementInList(actions, this.action);
      }, 3000);
    },
  },
});
</script>

<style scoped>
.build {
  color: #1a73e8;
}
.create {
  color: #34a853;
}
.design {
  color: #f9ab00;
}
.code {
  color: #d93025;
}

</style>
