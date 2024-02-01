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
      // get users from lStorage
      const storedUsers = this.users || [];               //dont get from localStorage, get from users array ktu lart sepse pinia ashtu asnjer sboeshte update
      console.log('Users array: ', storedUsers)          // its showing users

      const user = storedUsers.find(
        (user) => 
        (user.username === usernameOrEmail ||
         user.email === usernameOrEmail)
        && user.password === password
      );
      console.log("user here is: ", user)



      if (user) {
        console.log('Successful login: ', user);
        this.currentUser = user;
        this.saveState();
        return true;                //pls work
      } else {
        console.log('Login failed');        
        return false;
      }
    },

    logout() {
      this.currentUser = null;
      this.saveState();
    },

    initStore() {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];    
      console.log('initStore(): \nStored users: ',storedUsers)          //kjo sdelen

      const storedState = localStorage.getItem('authState');
      console.log("Stored state in initStore: ", storedState)
      if (storedState) {
        const { users, currentUser } = JSON.parse(storedState);
        console.log('Parsed State in initStore: ', {users, currentUser})
        this.users = users;
        this.currentUser = currentUser;
      }
    },

    registerUser(userData) {
      const newUser = {
        id: (this.users ? this.users.length : 0) +1,      //tjeter error      FIXED 
        username: userData[0],
        password: userData[1],
        email: userData[2],
        fname: userData[3],
        lname: userData[4],
      };
    
      try {
        this.users = this.users || [];
        this.users.push(newUser);
        console.log('User registered successfully', newUser);
        this.saveState();
      } catch (error) {
        console.error('Error registering user', error);
      }
    },

    saveState() {
      const authState = {
        users: this.users,
        currentUser: this.currentUser,
      };
      console.log("Saving auth state to local: ", authState)                    //currentUser ktu delen a ne LoginView no.
      localStorage.setItem('authState', JSON.stringify(authState));
    },
  },
})
