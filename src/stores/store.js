import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    users: [],
    currentUser: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.currentUser,
  },
  actions: {
    login({ usernameOrEmail, password }) {
      const user = this.users.find(
        (user) => user.username === usernameOrEmail ||
         user.email === usernameOrEmail
        && user.password === password
      );
      if (user) {
        console.log('Successful login:', user);
        this.currentUser = user;
        this.saveState();
      } else {
        console.log('Login failed');
      }
    },

    logout() {
      this.currentUser = null;
      this.saveState();
    },

    registerUser(userData) {
      // You can customize the logic for generating user IDs based on your backend
      const newUser = {
        id: this.users.length + 1,
        username: userData[0],
        password: userData[1],
        email: userData[2],
        fname: userData[3],
        lname: userData[4],
      };

      try {
        // Assuming synchronous registration for simplicity
        this.users.push(newUser);
        console.log('User registered successfully', newUser);
        this.saveState();
      } catch (error) {
        console.error('Error registering user', error);
      }
    },

    initStore() {
      // Initialize the store state from localStorage
      const storedState = localStorage.getItem('authState');
      if (storedState) {
        const { users, currentUser } = JSON.parse(storedState);
        this.users = users;
        this.currentUser = currentUser;
      }
    },

    saveState() {
      // Save the store state to localStorage
      const authState = {
        users: this.users,
        currentUser: this.currentUser,
      };
      localStorage.setItem('authState', JSON.stringify(authState));
    },
  },
});
  //make a variable to hold users as array
  //store all incoming data with push to that array
  //return success this page and go to login 