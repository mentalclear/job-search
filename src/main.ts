import { createApp } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown, faAngleUp, faSearch } from '@fortawesome/free-solid-svg-icons';
import App from '@/App.vue';
import '@/assets/tailwind.css';
import router from '@/router';
import store, { key } from '@/store';

library.add(faAngleDown);
library.add(faAngleUp);
library.add(faSearch);

const app = createApp(App);

app.use(router);
app.use(store, key);
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.mount('#app');
