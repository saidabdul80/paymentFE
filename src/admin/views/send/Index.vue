<template>
  <div class="send-money-form">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2>Send Money</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <TextField v-model="recipientDetail.full_name" label="Recipient Full Name" required />
        </v-col>
        <v-col cols="12" md="6">
          <TextField v-model="recipientDetail.email" label="Recipient Email" required />
        </v-col>
        <v-col cols="12" md="6">
          <TextField v-model="customerDetail.full_name" label="Customer Full Name" required />
        </v-col>
        <v-col cols="12" md="6">
          <TextField v-model="customerDetail.email" label="Customer Email" required />
        </v-col>
        <v-col cols="12" md="6">          
          <CurrencySelect v-model="currency" label="Currency" required />
        </v-col>
        <v-col cols="12" md="6">
          <TextField v-model="amount" label="Amount" type="number" required />
        </v-col>
        <v-col cols="12" md="6">
          <TextField v-model="securityQuestion" label="Security Question" required />
        </v-col>
        <v-col cols="12" md="6">
          <TextField v-model="securityAnswer" label="Security Answer" required />
        </v-col>
        <v-col cols="12" md="6">
          <TextField v-model="description" label="Description" required />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn @click="sendMoney" :loading="isLoading" color="primary">Send Money</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { useGlobalsStore } from '@/stores/globals';
import useAdminStore from '@/admin/stores/admin';
import TextField from '@/components/TextField.vue'; // Adjust the path as per Customer project structure
import CurrencySelect from '@/components/CurrencySelect.vue'; // Adjust the path as per Customer project structure
import Ls from '@/services/ls.js'
export default {
  name: 'SendMoneyForm',
  components: {
    TextField,
    CurrencySelect
  },
  data() {
    return {
      isLoading: false,
      adminStore:useAdminStore(),
      globals:useGlobalsStore(),
      recipientDetail: {
        full_name: '',
        email: ''
      },
      customerDetail: {
        full_name: '',
        email: ''
      },
      currency: '',
      amount: '',
      securityQuestion: '',
      securityAnswer: '',
      description: ''
    };
  },
  methods: {
   async sendMoney() {
      
      const payload = {
        currency_symbol: this.currency,
        recipient_detail: this.recipientDetail,
        customer_detail: this.customerDetail,
        amount: this.amount,
        security_question: this.securityQuestion,
        security_answer: this.securityAnswer,
        description: this.description,
        api_key: JSON.parse(Ls.get('auth.client')||"{}")?.api_key                    
      };
      this.isLoading = true
      await this.adminStore.sendMoney(payload);
      this.isLoading = false
      console.log('Sending money with payload:', payload);
      // Call Customer API endpoint to send money with the payload
    }
  }
};
</script>

<style>
/* Add Customer custom styles here */
</style>
