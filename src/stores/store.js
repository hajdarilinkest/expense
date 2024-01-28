import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    users: [
      { "id": 1, "username": "user", "password": "pass" },
      { "id": 2, "username": "user1", "password": "pass1" },
      {"id":3, "username" : "donart", "password": "donart"}
    ],
    currentUser: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.currentUser,
  },
  actions: {
    login({ username, password }) {
      const user = this.users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        console.log('Successful login:', user);
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        console.log('Login failed');
      }
    },

    logout() {
      this.currentUser = null;
      localStorage.removeItem('currentUser');
    },

    registerUser(newUser) {
      try {
        // Assuming synchronous registration for simplicity
        this.users.push(newUser);
        console.log('User registered successfully', newUser);
        localStorage.setItem('users', JSON.stringify(this.users));
      } catch (error) {
        console.error('Error registering user', error);
      }
    },

    initStore() {
      // Initialize the store state from localStorage
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
      }

      const storedCurrentUser = localStorage.getItem('currentUser');
      if (storedCurrentUser) {
        this.currentUser = JSON.parse(storedCurrentUser);
      }
    },
  },
});

export const usePersistedAuthStore = () => {
  const authStore = useAuthStore();
  authStore.initStore(); // Initialize the store from localStorage
  return authStore;
};
