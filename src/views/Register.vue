<script setup>
import { watch } from 'vue';
import { ref } from 'vue';
import { useAuthStore } from '../stores/store.js'
import { useRouter } from 'vue-router';
import swal from 'sweetalert';

const authStore = useAuthStore();
const router = useRouter();


const username = ref('');
const password = ref('');
const email = ref('');
const fname = ref('');
const lname = ref('');
const cpassword = ref('');
const passwordMatch =  ref(true);

const register = () => {

  const a = [username.value, password.value, email.value, fname.value, lname.value, cpassword.value];
  //make a dispatch function to send data in store
  console.log("Data to register: ", a)
  
if (                                                                                        //manual solution, temporary
        username.value  === '' ||
        password.value  === '' ||
        cpassword.value === '' ||
        email.value     === '' ||
        fname.value     === '' ||
        lname.value     === ''
    )
 {
  swal("Sign up failed!","Please, make sure you have filled every required field", "warning")
  console.log("Register Failed!")
 }
 else if (!passwordMatch.value) {
    swal("Sign up failed!", "Passwords do not match", "error")
    console.log("Register Failed! Passwords do not match");
    return;
  }

 else {
  authStore.registerUser(a); 
  console.log('Signed up');
  console.log('Current user? ', authStore.currentUser)
  router.push('/dashboard')
 }
};

watch([password,cpassword], () => {
  passwordMatch.value=password.value === cpassword.value
})
//define rules here!!
const requiredRule = (v) => !!v || 'This field is required';

const passwordRules = 
[
  requiredRule,
  (v) => (v && v.length >=8) || 'Minimum 8 characters',

]
const nameRules = 
[
  requiredRule,
  v => (v && v.length<=12) || "Name shouldn't be more than 12 characters"
]
const emailRules = 
[
  requiredRule,
  (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Use a valid e-mail address!'
]
const usernameRules = [
    requiredRule,
    v => (v && v.length>=4) || "Name shouldn't be less than 4 characters"

]
const cpasswordRules =
 [
   requiredRule,
    () => !!passwordMatch.value || 'Passwords do not match!'
];


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
                    <v-text-field 
                    v-model="fname" 
                    label="First Name" 
                    required 
                    clearable 
                    :rules="nameRules" 
                    >
                  </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field 
                    v-model="lname" 
                    label="Last Name" 
                    required clearable 
                    :rules="nameRules"
                    >
                  </v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field 
                    v-model="username" 
                    label="Username" 
                    required 
                    clearable 
                    :rules="usernameRules"
                    >
                  </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field 
                    v-model="email" 
                    label="E-mail" 
                    type="email" 
                    pattern=".+@email\.com" 
                    required 
                    clearable 
                    :rules="emailRules"
                    >
                  </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field 
                    v-model="password" 
                    label="Password" 
                    type="password" 
                    required 
                    :rules="passwordRules"
                    >
                  </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="cpassword"
                      label="Confirm Password"
                      type="password"
                      required
                      :rules="cpasswordRules"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-btn class="mx-auto, text-white" type="submit" color="cyan-lighten-3" block :loading="loading">Register</v-btn>
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
