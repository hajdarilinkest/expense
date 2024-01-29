<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/store';
import { useRouter } from 'vue-router';

const usernameOrEmail = ref('');
const password = ref('');

const router = useRouter();
const authStore = useAuthStore();
const login = () => {
  authStore.login({ usernameOrEmail: usernameOrEmail.value, password: password.value });
  if(authStore.isLoggedIn) {
    router.push('/');
  } else {
    alert("Username or Password incorrect!");
  }
};
</script>

<template>
  <v-app>
    <v-main class="">
      
      <v-container>
        <v-row class="centered_div"> <!-- flex container equivalent-->
          <v-col :cols="12" md="5" sm="12" xs="12" >
            <v-card-title class="text-h4" >Login</v-card-title>
               <v-card-text > 
                <v-form @submit.prevent="login" >
                  <v-text-field v-model="usernameOrEmail" label="Username or Email" required></v-text-field>
                  <v-text-field v-model="password" label="Password" type="password" required></v-text-field>

                  <v-btn color="primary" type="submit">Login</v-btn>
                </v-form>
                <a><br>Don't have an account? <router-link to="/register" style="color: rgb(0, 110, 255);">Click Here to Register.</router-link></a>
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

.centered_div
{
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 600px) {
  .centered_div {
    display: block;
  }
}
</style>
