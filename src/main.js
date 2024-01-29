import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import App from './App.vue';
import router from './router';
import { useAuthStore } from './stores/store';

const app = createApp(App);
const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(vuetify).mount('#app');

const authStore = useAuthStore();
authStore.initStore(); // Initialize the store from localStorage
pinia.use(({ store }) => {
  store.$auth = authStore;
});


