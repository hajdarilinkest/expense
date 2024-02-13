import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import Register from '../views/Register.vue';
import Dashboard from '../components/Dashboard.vue';
import Reports from '../components/Reports.vue'
import Transactions from '../components/Transactions.vue'
import Profile from '../components/Profile.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard,
        },
        {
          path: 'reports',
          name: 'reports',
          component: Reports,
        },
        {
          path: 'transactions',
          name: 'transactions',
          component: Transactions,
        },
        {
          path:"profile",
          name:'profile',
          component: Profile
        }
      ],
      beforeEnter: (to, from, next) => {
        let authStateTmp = JSON.parse(localStorage.getItem('authState') )   // pa JSON.parse delen cdoer true, buggy
        if (localStorage.length===0){                                       //kur e starton app, localStorage is empty, kshu qe ky kusht boet nese ske asgje local
          let isAuthenticated = false;
           isAuthenticated ? next() : next('/login');

        }
        else {
        let isAuthenticated = authStateTmp.currentUser !== null ;       //lets check for current user 
        isAuthenticated ? next() : next('/login');
      }

      }
      
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        let authStateTmp = JSON.parse(localStorage.getItem('authState') )
        let isAuthenticated = !authStateTmp || authStateTmp.currentUser === undefined ||authStateTmp.currentUser === null;       //lets check for current user 
        isAuthenticated ? next() :  next('/dashboard');
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