<script setup>
import { watch } from 'vue';
import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/store.js'
import { useRouter } from 'vue-router';
import swal from 'sweetalert';

const authStore = useAuthStore();
const router = useRouter();


const username = ref(authStore.currentUser.username);
const password = ref('');                             //car futet te ky field duet te krahasoet me 'oldpass'
const email = ref(authStore.currentUser.email);
const fname = ref(authStore.currentUser.fname);
const lname = ref(authStore.currentUser.lname);
const newpass = ref('');
const cnewpass =  ref('');

const passwordMatch=   ref(true);
const oldpasswordMatch = ref(false);

const update = () => {
  if (password.value=='' && newpass.value !== '' || newpass.value == '' && cnewpass.value !=='')
  {
    return;
  }
  else {
  console.log("user is currently: ", authStore.currentUser)
  const a = [username.value, newpass.value, email.value, fname.value, lname.value];
  
    console.log("Data to update: ", a);
    authStore.updateUser(a);
    console.log("Updated info: ", authStore.currentUser)
    swal("Succesfully updated account!","Changes made","success");
    router.push('/dashboard');
}
};


watch([newpass,cnewpass], () => {
   passwordMatch.value=newpass.value === cnewpass.value 
})
watch(password, () => {
    oldpasswordMatch.value= authStore.currentUser.password === password.value;
 })


//define rules here!!
const requiredRule = (v) => !!v || 'This field is required';


const nameRules = 
[
  requiredRule,
  v => (v && v.length<=12) || "Name shouldn't be more than 12 characters"
]


const usernameRules = [
    requiredRule,
    v => (v && v.length>=4) || "Username shouldn't be less than 4 characters"

]
const passwordRules = 
[
  (v) => (v && v.length >=8) || 'Minimum 8 characters',
]
const oldpasswordRules = 
[
  () => !!oldpasswordMatch.value || 'Incorrect Password',
]
const cpasswordRules =
 [
   requiredRule,
    () => !!passwordMatch.value || 'Passwords do not match!'
];

const isInfoChanged = computed(() => {
  return (
    fname.value !== authStore.currentUser.fname ||
    lname.value !== authStore.currentUser.lname ||
    username.value !== authStore.currentUser.username
  );
});

const isPasswordChanged = computed(() => {
  return (
    password.value !== '' ||
    newpass.value !== '' ||
    cnewpass.value !== ''
  );
});
const isButtonDisabled = computed(() => {
  return !isInfoChanged.value && !isPasswordChanged.value;
});
</script>

<template>
    <div class="hello"> 
    <h1>Profile</h1>
    <v-divider></v-divider>
    <v-container>
      <h3>User Information</h3>
    <v-form @submit.prevent="update">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field 
          v-model="fname" 
          label="First Name" 
          :rules="nameRules"
          required >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
          v-model="lname" 
          label="Last Name" 
          :rules="nameRules"
          required >
            
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
          v-model="username" 
          label="Username" 
          :rules="usernameRules"
          required >
            
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
          v-model="email" 
          label="E-mail" 
          required 
          readonly >
          
          </v-text-field>
        </v-col>
        <v-divider></v-divider>
        </v-row>
        <br>
        <h3>User Password</h3>
        <v-row>
        <v-col cols="12" md="4">
          <v-text-field
          v-model="password" 
          type="password"
          label="Old Password" 
          :rules="oldpasswordRules"
          required>
          </v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
          v-model="newpass" 
          type="password"
          label="New Password" 
          :rules="passwordRules"
          required>
            
          </v-text-field>
        </v-col>
        <v-col cols="12" md="4" xs="12">
          <v-text-field
          v-model="cnewpass"
          type="password" 
          label="New Password Again" 
          :rules="cpasswordRules"
          required>
            
          </v-text-field>
        </v-col>
        
        <v-row justify="end">
        <v-col cols="12" md="4" xs="12">
        <v-btn class="mx-auto, text-white" type="submit" variant="tonal" color="cyan-lighten-1"  :disabled="isButtonDisabled" block>Save changes</v-btn>
        <div ></div>
      </v-col>
      </v-row>
      </v-row>

    </v-form>
  </v-container>
</div>

</template>
<style scoped>
.hello {
    background-color: #f0f2f5;
}
.toggle-drawer {
  display: none;
}

@media (max-width: 960px) {
  .toggle-drawer {
    display: block;
  }
}
</style>