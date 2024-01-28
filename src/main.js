// import { createApp } from 'vue';
// import { createPinia } from 'pinia';
// import { createPersistedState } from 'pinia-persistedstate/dist/esm/createPersistedState.js';
// import 'vuetify/styles';
// import { createVuetify } from 'vuetify';
// import * as components from 'vuetify/components';
// import * as directives from 'vuetify/directives';
// import axios from 'axios';

// import App from './App.vue';
// import router from './router';
// import { usePersistedAuthStore } from './stores/store';

// const app = createApp(App);
// const vuetify = createVuetify({
//   components,
//   directives,
// });

// const pinia = createPinia();

// app.use(pinia);
// app.use(router);
// const persistedState = createPersistedState();

// app.config.globalProperties.$axios = axios.create({
//   baseURL: 'http://localhost:3000', // Corrected the URL by adding a colon
// });

// app.use(vuetify).mount('#app');
// app.use(persistedState);

// // Router guard to prevent access to login page when logged in
// router.beforeEach((to, from, next) => {
//   const authStore = usePersistedAuthStore();
//   if (to.name === 'login' && authStore.isLoggedIn) {
//     // Redirect to home if trying to access login while logged in
//     next({ name: 'home' });
//   } else {
//     next();
//   }
// });

// export { pinia };
import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import App from './App.vue';
import router from './router';
import { usePersistedAuthStore } from './stores/store';

const app = createApp(App);
const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(vuetify).mount('#app');

const authStore = usePersistedAuthStore();
pinia.use(({ store }) => {
  store.$auth = authStore;
});
