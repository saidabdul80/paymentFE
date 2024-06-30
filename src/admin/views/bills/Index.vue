<template>
  <div class="pay-bill-form tw-w-[70%] tw-mx-auto ">
    <v-card class="tw-p-5">
      <v-row>
        <v-col cols="12">
          <h2 class="tw-font-bold">Pay Bill</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <TextField v-model="amount" label="Amount" type="number" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-select v-model="paymentType" :items="paymentTypes" label="Payment Type" required />
        </v-col>
        <v-col cols="12">
          <TextField v-model="description" label="Description" required />
        </v-col>
        <v-col cols="12" md="6">
          <TextField v-model="payer.firstName" label="First Name" required />
        </v-col>
        <v-col cols="12" md="6">
          <TextField v-model="payer.lastName" label="Last Name" required />
        </v-col>
        <v-col cols="12" md="6">
          <TextField v-model="payer.email" label="Email" required />
        </v-col>
        <v-col cols="12" md="6">
          <TextField v-model="payeeName" label="Payee Name" required />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn @click="payBill" :loading="isLoading" color="primary">Pay Bill</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import TextField from '@/components/TextField.vue';
export default {
  name: 'PayBill',
  data() {
    return {
      isLoading: false,
      amount: '',
      paymentTypes: ['bill', 'tuition'],
      description: '',
      payer: {
        firstName: '',
        lastName: '',
        email: '',
      },
      payeeName: '',
    };
  },
  components:{
    TextField
  },
  methods: {
    payBill() {
      const payload = {
        amount: this.amount,
        paymentType: this.paymentType,
        description: this.description,
        payer: this.payer,
        payeeName: this.payeeName,        
      };
      this.isLoading = true;
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        console.log('Payment initiated with payload:', payload);
      }, 1000);
    },
  },
};
</script>

<style>
/* Add custom styles here */
</style>
