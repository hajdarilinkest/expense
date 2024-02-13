<script setup>
import { useAuthStore } from '../stores/store';
import { ref } from 'vue';

const authStore = useAuthStore();

let amountMoneyAdded = ref();
let amountMoneySubtracted = ref();
const TransactionList = authStore.transactions;

const makeTransaction = () => {
  const added = parseFloat(amountMoneyAdded.value) || 0;
  const subtracted = parseFloat(amountMoneySubtracted.value) || 0;
  const totalAmount = added - subtracted;
  console.log("Amount of money: ", totalAmount);
  authStore.makeTransaction(totalAmount);
  dialog.value = false;
  amountMoneyAdded.value = '';
  amountMoneySubtracted.value = '';
};

const closeDialog = () => {
  dialog.value = false;
};

const getTextColorClass = (amount) => {
  return amount >= 0 ? 'text-green' : 'text-red';
};

const deleteTransaction = (transactionId) => {
  const transaction = TransactionList.find(t => t.id === transactionId);
  if (transaction) {
    authStore.deleteTransaction(transactionId, transaction.amount);
  }
};

const hideTransaction = (transactionId) => {
  authStore.hideTransaction(transactionId);
};
const dialog = ref(false);

import { computed } from 'vue';

const reversedTransactionList = computed(() => {
  return TransactionList.slice().reverse();
});


</script>

<template>
  <div class="hello">
    <h1>Transactions</h1>
    <h3>Account: {{ authStore.currentUser.username }}</h3>
    <h3>Balance: {{ parseFloat(authStore.currentUser.balance).toFixed(2) }} €</h3>
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn variant="flat" v-bind="props">Add a New Transaction</v-btn>
      </template>
      <v-card>
        <v-card-title>
          Add a New Transaction
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field
                label="Income"
                v-model="amountMoneyAdded"
                type="text"
                prepend-inner-icon='mdi-plus'
                clearable
              ></v-text-field>
              <v-text-field
                label="Expense"
                v-model="amountMoneySubtracted"
                type="text"
                prepend-inner-icon='mdi-minus'
                clearable
              ></v-text-field>
              <v-btn @click="makeTransaction" variant="flat">Make Transaction</v-btn>
              <v-btn @click="closeDialog" variant="flat">Close</v-btn>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-table>
  <thead>
    <tr>
      <th class="text-left">Label</th>
      <th class="text-left">Amount</th>
      <th class="text-left">Actions</th> <!-- Add column for actions -->
    </tr>
  </thead>
  <tbody>
    <tr v-if="!TransactionList.length">
      <td colspan="3">No transactions yet in this timeline.</td>
    </tr>
    <tr v-for="transaction in reversedTransactionList" :key="transaction.id">
      <td>{{ transaction.label }}</td>
      <td :class="getTextColorClass(transaction.amount)">
        {{ transaction.amount.toFixed(2) }} EUR
      </td>
      <td>
        
        <v-tooltip text="Hide">
          <template v-slot:activator="{ props }">
        <v-btn @click="hideTransaction(transaction.id)" icon variant="flat" v-bind="props">
          <v-icon>mdi-block-helper</v-icon>
        </v-btn>
        </template>
        </v-tooltip>

        <v-tooltip text="Delete">
          <template v-slot:activator="{ props }">
        <v-btn @click="deleteTransaction(transaction.id)" icon variant="flat" v-bind="props">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        </template>
        </v-tooltip>

      </td>
    </tr>
  </tbody>
</v-table>

  </div>
</template>

<style scoped>
.reverseorder {               /*doesnt work, slevizen lista upside down*/ 
  display: flex;
  justify-content: space-evenly;
}

.reverseorder tbody {
  flex-direction: column-reverse;
}
.hello {
  background-color: #f0f2f5;
}
</style>
