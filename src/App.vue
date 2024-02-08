<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LoginView from './views/LoginView.vue'
import Register from './views/Register.vue'
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

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
