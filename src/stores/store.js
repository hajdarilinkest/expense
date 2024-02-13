import { defineStore } from 'pinia';


export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    users: [],
    currentUser: null,
    transactions: [],
    // registrationDate: null
  }),
  getters: {
    isLoggedIn: (state) => !!state.currentUser,
  },
  actions: {
    login({ usernameOrEmail, password }) {
      // get users from lStorage
      const storedUsers = this.users || [];               //dont get from localStorage, get from users array because pinia never gets updated that way
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
        id: (this.users ? this.users.length : 0) +1,     
        username: userData[0],
        password: userData[1],
        email: userData[2],
        fname: userData[3],
        lname: userData[4],
        balance : 0.00,
      };
    
      try {
        this.users = this.users || [];
        this.users.push(newUser);
        console.log('User registered successfully', newUser);
        this.currentUser = newUser;         //kur bon register menjer bon log in
        this.saveState();
      } catch (error) {
        console.error('Error registering user', error);
      }
    },
    makeTransaction(amountMoney) {
      const newTransaction = {
        id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
        label: "Label",
        amount: amountMoney,
      };
      console.log("Store received: ", amountMoney);
      this.currentUser.balance += parseFloat(amountMoney);
    
      this.transactions.push(newTransaction);
      this.saveState();
    },
    
    hideTransaction(transactionId) {
      const index = this.transactions.findIndex(transaction => transaction.id === transactionId);
      if (index !== -1) {
        this.transactions.splice(index, 1);
      }
    }, 
    deleteTransaction(transactionId, transactionAmount) {
      const index = this.transactions.findIndex(transaction => transaction.id === transactionId);
      if (index !== -1) {
        this.transactions.splice(index, 1);
        this.currentUser.balance -= parseFloat(transactionAmount)          //fix this
      }
    }, 
    updateUser(userData) 
    {
      console.log("Updating user now....")
      this.currentUser.username = userData[0];
      // this.currentUser.password = userData[1];
      this.currentUser.email = userData[2];
      this.currentUser.fname = userData[3];
      this.currentUser.lname = userData[4];

      if (userData[1] !== ''){
        this.currentUser.password = userData[1];
      }
      console.log("New user info: ", this.currentUser)
    },    
    saveState() {
      const authState = {
        users: this.users,
        currentUser: this.currentUser,
        transactions: this.transactions
      };
      console.log("Saving auth state to local: ", authState)              
      localStorage.setItem('authState', JSON.stringify(authState));
    },
  },
})
