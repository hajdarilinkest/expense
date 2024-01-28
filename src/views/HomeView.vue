<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card-title class="text-h4">Welcome to Home</v-card-title>
        <v-card-text>
          <p>You are logged in as {{ authStore.currentUser.username }}</p>
          <v-btn color="primary" @click="logout">Logout</v-btn>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
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

if (authStore.isLoggedIn) {
  router.replace('/');
}
</script>
