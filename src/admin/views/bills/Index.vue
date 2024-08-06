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
          <Payee v-model="bill.payee" label="Payee Name" required />            
        </v-col>
        <v-col cols="12" md="6">          
          <TextField v-model="bill.payee_account_number" label="Payee Account Number" type="number" required />
        </v-col>
        <v-col cols="12" md="6">
          <TextField v-model="bill.amount" label="Amount" type="number" required />
        </v-col>
        <v-col cols="12" md="6">
          <TextField v-model="bill.description" label="Description" required />
        </v-col>
        <v-col cols="12" md="6">
          <TextField v-model="bill.first_name" label="First Name" required />
        </v-col>
        <v-col cols="12" md="6">
          <TextField v-model="bill.last_name" label="Last Name" required />
        </v-col>
        <v-col cols="12" md="6">
          <TextField v-model="bill.email" label="Email" required />
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
import useAdminStore from '@/admin/stores/admin';
import Payee from '@/components/Payee.vue';
import SelectFilterArray from '@/components/SelectFilterArray.vue';
import TextField from '@/components/TextField.vue';
export default {
  name: 'PayBill',
  data() {
    return {
      isLoading: false,
      bill:{
        payee:{},        
        payee_account_number:"",
        payee_code:"",
        payee_name:"",
        amount:"",
        description: "",
        email:"",
        first_name:"",
        last_name:"",
      },
      amount: '',
      paymentTypes: ['bill', 'tuition'],
      description: '',
      payer: {
        firstName: '',
        lastName: '',
        email: '',
      },
      payeeName: '',
      paymentType:''
    };
  },
  components:{
    TextField,
    Payee,
    SelectFilterArray
  },
  methods: {
    async payBill() {
      const payload = {...this.bill}
      delete payload.payee
      payload.payee_code = this.bill.payee.PayeeCode
      payload.payee_name = this.bill.payee.PayeeName
      this.isLoading = true;
      const store = useAdminStore();
      await store.payBill(payload)      
      this.isLoading = false
      if (response) {
        
      }   
    },
  },
};
</script>

<style>
/* Add custom styles here */
</style>
