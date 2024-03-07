<script setup>
import { watch } from 'vue';
import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/store.js'
import { useRouter } from 'vue-router';
import swal from 'sweetalert';
import axios from 'axios';

const authStore = useAuthStore();
const router = useRouter();
const username = ref('');
const password = ref('');                             //car futet te ky field duet te krahasoet me 'oldpass'
const email = ref('');
const fname = ref('');
const lname = ref('');
const newpass = ref('');
const cnewpass =  ref('');
const passwordMatch=   ref(true);
const oldpasswordMatch = ref(false);
const loading = ref(false); 
//-----------------------------
const initialUsername = ref('');
const initialEmail = ref('');
const initialFname = ref('');
const initialLname = ref('');


const fetchUserData = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('token: ', token);
    await axios.get('http://127.0.0.1:8000/api/user', {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    }).then((response)=>{

    const userData = response.data.user;
    username.value = userData.username;
    email.value = userData.email;
    fname.value = userData.first_name;
    lname.value = userData.last_name;
    //--------------------------------
    initialUsername.value = userData.username;
      initialEmail.value = userData.email;
      initialFname.value = userData.first_name;
      initialLname.value = userData.last_name;
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};
fetchUserData();

const update = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const userData = {
      id: authStore.currentUser.id,
      username: username.value,
      password: newpass.value,
      email: email.value,
      fname: fname.value,
      lname: lname.value,
      oldPassword: password.value, // Include the old password,
      newPassword: newpass.value,
    };

    console.log("Data to update: ", userData);
    const response = await axios.post('http://127.0.0.1:8000/api/profile', userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('User updated successfully:', response.data);
    swal("Successfully updated account!", "Changes made", "success");
    router.push('/dashboard');
  } catch (error) {
    swal("Update failed!", error.response?.data?.message || "An error occurred while updating user", "error");
    console.error('Error updating user:', error);
  } finally {
    loading.value = false;
  }
};


    if (newpass.value !== '' || cnewpass.value !== '') {
     watch([newpass, cnewpass], () => {
        passwordMatch.value = newpass.value === cnewpass.value;
    });  
    watch(password, () => {
        oldpasswordMatch.value = password.value !== '';
    });
}


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

const oldpasswordRules = [
    () => {
        return true;
    }
];

const cpasswordRules =
 [
   requiredRule,
    () => !!passwordMatch.value || 'Passwords do not match!'
];

const isInfoChanged = computed(() => {
  return (
    fname.value !== initialFname.value ||
    lname.value !== initialLname.value ||
    username.value !== initialUsername.value
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
           >
            
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
        <v-btn 
        class="mx-auto, 
        text-white" 
        type="submit" 
        variant="tonal" 
        color="cyan-lighten-1"  
        :disabled="isButtonDisabled" 
        block
        :loading = "loading"
        @click = "loading = !loading" 
        >
        Save changes</v-btn>
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