import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import Register from '../views/Register.vue';
// import { useAuthStore } from '@/stores/store';
//authStore time
// const authStore = useAuthStore();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,

      beforeEnter: (to, from, next) => {
        let authStateTmp = JSON.parse(localStorage.getItem('authState') )   // pa JSON.parse delen cdoer true, buggy
        let isAuthenticated = authStateTmp.currentUser !== null;       //lets check for current user 
        isAuthenticated ? next() : next('/login');
      }
      
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        let authStateTmp = JSON.parse(localStorage.getItem('authState') )
        let isAuthenticated = authStateTmp.currentUser === null;       //lets check for current user 
       

        isAuthenticated ? next() :  next('/');
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
  ],
});

export default router;
