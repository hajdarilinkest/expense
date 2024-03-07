  <script setup>
  import { useAuthStore } from '../stores/store';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import axios from 'axios';
  
  const authStore = useAuthStore();
  const router = useRouter();
  const username = ref('');


  const fetchUserData = async () => {
  try {
    const token = localStorage.getItem('token');
    await axios.get('http://127.0.0.1:8000/api/user', {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    }).then((response)=>{

    //ket boe me objekt
    const userData = response.data.user;
    username.value = userData.username;
    console.log (response)
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};
fetchUserData();
  
  const logout = () => {
    authStore.logout();
    router.push('/login');
  };
  
  const toggleMenu = () => {
  
  };
  </script>

<template>
  <div class="hello">
    <h1>Dashboard</h1>
    <p>
      You are logged in as {{ username }}
      <br>
      <!-- e-mail: {{ authStore.currentUser.email }} -->
      Account Balance: {{ parseFloat(authStore.currentUser.balance).toFixed(2) }} €
    </p>

  </div>
</template>



<style scoped>
.hello {
    background-color: #f0f2f5;
}
</style>