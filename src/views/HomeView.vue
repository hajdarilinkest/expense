<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/store';
import { useRouter } from 'vue-router';
  
const authStore = useAuthStore();
const router = useRouter();
const drawer = ref(true);

const logout = () => {
  swal("Logged out.", "You will have to log back in to use the site", "info")
  authStore.logout();
  router.push('/login');
};

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const navigateTo = (routeName) => {
  router.push({ name: routeName });
};
</script>

<template>
  <v-card>
    <v-layout>
      <v-app-bar :elevation="1">
        <v-btn icon @click="toggleDrawer" class="toggle-drawer"> <v-icon>mdi-menu</v-icon> </v-btn>

        <v-list>
          <v-list-item
            title="Expenses™"
            subtitle="by Mangosoft"
          >
          </v-list-item>
        </v-list>

        <template v-slot:append>
          <v-menu location="start" offset-y>
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props">
                <v-icon>mdi-bell-outline</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item >Subscribe now for 20% OFF Premium</v-list-item>
              <v-list-item >Expenses™ Official Event starting tomorrow</v-list-item>
              </v-list>
          </v-menu>

          <v-menu location="start" offset-y>
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props">
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click= "navigateTo('profile')">Profile</v-list-item>
              <v-list-item >Settings</v-list-item>
              <v-divider></v-divider>
              <v-list-item @click="logout" class="text-red">Logout</v-list-item>
            </v-list>
          </v-menu>
        </template>

        
      </v-app-bar>
      

      <v-navigation-drawer v-model="drawer">

        <v-list density="compact" nav>
          <v-list-item @click="navigateTo('dashboard')" :value=true
          prepend-icon="mdi-home" 
          title="Dashboard" 
          value="dashboard"
          >
        </v-list-item>
        <v-list-item 
        @click="navigateTo('expenses')"
        prepend-icon="mdi-cash"
        title="Expenses"
        value="expenses"
        >
        </v-list-item>
          <v-list-item 
          @click="navigateTo('reports')" 
          prepend-icon="mdi-chart-bar" 
          title="Reports" 
          value="reports"
          >
        </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view></router-view>
      </v-main>
      
    </v-layout>
  </v-card>
</template>

<style scoped>
.toggle-drawer {
  display: none;
}

@media (max-width: 960px) {
  .toggle-drawer {
    display: block;
  }
}
</style>
