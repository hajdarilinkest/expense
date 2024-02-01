<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Expense from './components/ExpenseTitle.vue'
import LoginView from './views/LoginView.vue'
import Register from './views/Register.vue'

</script>

<template>
  <header> 
    <!-- <router-link :to="{path:'/'}">Home</router-link>  
    <router-link :to="{path:'/login'}">Login</router-link>  
    <router-link :to="{path:'/register'}">Register</router-link> -->
  </header>

  <RouterView />
</template>

<style scoped>
</style>
