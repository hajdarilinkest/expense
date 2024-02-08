<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/store';
import { useRouter } from 'vue-router';
import IconCommunity from '@/components/icons/IconCommunity.vue';


const usernameOrEmail = ref('');
const password = ref('');
const showPassword = ref(false);


const router = useRouter();

const authStore = useAuthStore();

const login = async() => {
  console.log("Im trying to log in with: ", usernameOrEmail.value, password.value) // gjer ktu ok
  const loginLogic = await authStore.login({ usernameOrEmail: usernameOrEmail.value, password: password.value });    
  
  if(loginLogic) {
    console.log("Redirecting to home..\nCurrent user:", localStorage.getItem('currentUser'))       //delen null
    router.push('/dashboard');      // direkt ne dashboard qe mos mbesish ne faqe bosh
  } else {
    swal("Username or Password incorrect", {
      dangerMode: true,
      button: true, 
      icon: "error"
    });
    console.log("Not succesful bro")
  }
};


const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
const requiredRule = (v) => !!v || 'Password is required';

</script>

<template>
  <v-app>
    <v-main class="">
      
      <v-container>
        <v-row class="centered_div"> 
          <v-col :cols="12" md="5" sm="12" xs="12" >
            <v-card-title class="text-h4" >Login</v-card-title>
               <v-card-text class="card" > 
                <v-form @submit.prevent="login" >
                  <v-text-field 
                  v-model="usernameOrEmail" 
                  label="Username or Email" 
                  required
                  clearable
                  ></v-text-field>
                  
                  <v-text-field
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  label="Password"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="togglePasswordVisibility"
                  :rules="[requiredRule]"
                  >
                  </v-text-field>

                  <v-btn class="mx-auto, text-white" type="submit" color="cyan-lighten-3" block>Login</v-btn>
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
.custom-btn:hover {
  background-color: #4DD0E1 !important;
  color: white !important;
  border: 1px solid #4DD0E1 !important;
}
</style>
