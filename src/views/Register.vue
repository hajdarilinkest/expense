<script setup>
import { watch } from 'vue';
import { ref } from 'vue';
import { errorMessages } from 'vue/compiler-sfc';
import { useAuthStore } from '../stores/store.js'
import { useRouter } from 'vue-router';
// import router from '@/router';

const username = ref('');
const password = ref('');
const email = ref('');
const fname = ref('');
const lname = ref('');
const cpassword = ref('');
const passwordMatch =  ref(true);
const authStore = useAuthStore();
const router = useRouter();

const register = () => {
  //get all data in an array
  const a = [username.value, password.value, email.value, fname.value, lname, cpassword];
  //make a dispatch function to send data in store
  authStore.registerUser(a); 
  console.log('Signed up');
  router.push('/login')
};
watch([password,cpassword], () => {
  passwordMatch.value=password.value === cpassword.value
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col :cols="12" md="7" sm="12" xs="12">
            <img src="/bg.jpg" alt="expense" class="max-width-image" />
          </v-col>
          <v-col :cols="12" md="5" sm="12" xs="12">
            <v-card-title class="text-h4">Register</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="register">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="fname" label="First Name" required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="lname" label="Last Name" required></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="username" label="Username" required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="email" label="E-mail" required></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="cpassword"
                      label="Confirm Password"
                      type="password"
                      required
                      :rules="[()=> !!passwordMatch || 'Passwords do not match!']"
                      :error-messages="passwordMatch ? [] : ['Passwords do not match!']"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-btn class= "ml-auto" color="primary" type="submit">Register</v-btn>
              </v-form>
              <a><br /> Already have an account? <router-link to="/login" style="color: rgb(0, 110, 255);">Click Here to Login.</router-link></a>
            </v-card-text>
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
  padding-top: 20vh; 
}
@media (max-width: 600px) {
  .centered_div {
    display: block;
  }

}
</style>
