import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import App from './App.vue';
import { useAuthStore } from './stores/store';

import router from './router';

export const pinia = createPinia(); //dueshka ta krijosh para se ta bosh createApp

const app = createApp(App);
const vuetify = createVuetify({
  components,
  directives,
});

app.use(pinia);
app.use(router);
app.use(vuetify).mount('#app');

const authStore = useAuthStore();
console.log('localStorage Data: ', localStorage.getItem('authState'));
authStore.initStore(); // initialize the store from localStorage
pinia.use(({ store }) => {
  store.$auth = authStore;
});


  