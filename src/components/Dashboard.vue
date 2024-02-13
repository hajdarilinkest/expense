<template>
    <div class="hello">
      <h1>Dashboard</h1>
      <p>
        You are logged in as {{ authStore.currentUser.username }}
        <br>
        <!-- e-mail: {{ authStore.currentUser.email }} -->
        Account Balance: {{ parseFloat(authStore.currentUser.balance).toFixed(2) }} €
      </p>

    </div>
  </template>


  <script setup>
  import { useAuthStore } from '../stores/store';
  import { useRouter } from 'vue-router';
  
  const authStore = useAuthStore();
  const router = useRouter();
  
  const logout = () => {
    authStore.logout();
    router.push('/login');
  };
  
  const toggleMenu = () => {
  
  };
  </script>

<style scoped>
.hello {
    background-color: #f0f2f5;
}
</style>