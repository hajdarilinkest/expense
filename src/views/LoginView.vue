<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/store';
import { useRouter } from 'vue-router';
import axios from 'axios';

const usernameOrEmail = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
  try {
    loading.value = true;
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      username_or_email: usernameOrEmail.value,
      password: password.value
    });

    const { user, token } = response.data;
    localStorage.setItem('token', token); 
    authStore.login(user, token); // Update store with user and token+
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    router.push('/dashboard');
  } catch (error) {
    console.error('Error logging in:', error);
    swal("Error", "Failed to login. Please try again later.", "error");
  } finally {
    loading.value = false; // Reset loading state
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const requiredRule = (v) => !!v || 'Password is required';
</script>

<template>
  <v-app>
    <v-main class="">
      <v-container>
        <v-row class="centered_div">
          <v-col :cols="12" md="5" sm="12" xs="12">
            <v-card-title class="text-h4">Login</v-card-title>
            <v-card-text class="card">
              <v-form @submit.prevent="login">
                <v-text-field v-model="usernameOrEmail" label="Username or Email" required clearable></v-text-field>
                <v-text-field v-model="password" :type="showPassword ? 'text' : 'password'" label="Password"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="togglePasswordVisibility"
                  :rules="[requiredRule]">
                </v-text-field>
                <v-btn class="mx-auto, text-white" type="submit" color="cyan-lighten-3" block :loading="loading">
                  Login
                </v-btn>
              </v-form>
              <a><br>Don't have an account? <router-link to="/register" style="color: rgb(0, 110, 255);">Click Here to
                  Register.</router-link></a>
            </v-card-text>
          </v-col>
          <v-col :cols="12" md="7" sm="12" xs="12">
            <img src="/bg.jpg" alt="expense" class="max-width-image">
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
  .max-width-image {
    height: 100%;
    width: 100%;
  }

  .centered_div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 600px) {
    .centered_div {
      display: block;
    }
  }

  .custom-btn:hover {
    background-color: #4DD0E1 !important;
    color: white !important;
    border: 1px solid #4DD0E1 !important;
  }
</style>
