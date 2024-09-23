<template>
  <div class="send-money-form tw-w-[70%] tw-mx-auto ">
    <v-card class="tw-p-5">
      <v-row>
        <v-col cols="12">
          <h2 class="tw-font-bold">Send Money</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <!-- <Contacts v-model="recipient" /> -->
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
          <TextField v-model="amount" label="Amount" required />
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
          <v-btn ref="btnRef" @click="mfaCodeDialog = true" :loading="isLoading" color="primary">Send Money</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>

  <v-dialog v-model="dialog" activator="btnRef" max-width="340">
    <template v-slot:default="{ isActive }">
      <v-card >
        <v-card-title  class="tw-flex tw-justify-center tw-py-3 tw-items-center  tw-font-bold text-success">
         Money Sent Successfully
          <v-icon class="tw-mt-1 tw-ml-2" color="success">mdi-check-circle</v-icon>
        </v-card-title>
        <v-card-text>
          <div class="tw-mb-2">
            <span class="tw-font-semibold">Recipient Full Name:</span> {{ recipientDetail.full_name }}
          </div>
          <div class="tw-mb-2">
            <span class="tw-font-semibold">Recipient Email:</span> {{ recipientDetail.email }}
          </div>
          <div class="tw-mb-2">
            <span class="tw-font-semibold">Customer Full Name:</span> {{ customerDetail.full_name }}
          </div>
          <div class="tw-mb-2">
            <span class="tw-font-semibold">Customer Email:</span> {{ customerDetail.email }}
          </div>          
          <div class="tw-mb-2 tw-text-lg tw-font-bold tw-text-[green]">
            <span >Amount:  {{ amount }}{{ currency }} </span>
          </div>
          <div class="tw-mb-2">
            <span class="tw-font-semibold">Security Question:</span> {{ securityQuestion }}
          </div>
          <div class="tw-mb-2">
            <span class="tw-font-semibold">Security Answer:</span> {{ securityAnswer }}
          </div>
          <div class="tw-mb-2">
            <span class="tw-font-semibold">Description:</span> {{ description }}
          </div> 
        </v-card-text>
        <template v-slot:actions>
          <v-btn class="ml-auto"   color="surface-variant" variant="flat" text="Ok" @click="closeDialog()"></v-btn>
        </template>
      </v-card>
    </template>
  </v-dialog>

  <v-dialog v-model="mfaCodeDialog" activator="btnRef" max-width="340">
    <template v-slot:default="{ isActive }">
      <v-card >
        <v-card-title  class="tw-flex tw-justify-center tw-py-3 tw-items-center  tw-font-bold text-success">
         Enter MFA code and continue
          <v-icon class="tw-mt-1 tw-ml-2" color="success">mdi-keys-</v-icon>
        </v-card-title>
        <v-card-text>
          <div class="tw-mb-2">
            <TextField v-model="mfaCode" label="" required />
          </div>
        </v-card-text>
        <template v-slot:actions>
          <v-btn class="ml-auto"   color="surface-variant" variant="flat" text="Continue" @click="sendMoney()"></v-btn>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { useGlobalsStore } from '@/stores/globals';
import useAdminStore from '@/admin/stores/admin';
import TextField from '@/components/TextField.vue'; // Adjust the path as per Customer project structure
import CurrencySelect from '@/components/CurrencySelect.vue'; // Adjust the path as per Customer project structure
import Ls from '@/services/ls.js'
//import { useClient } from '@/stores/client';
import { useZohoStore } from '@/stores/zohoStore';
//import Contacts from '@/components/Contacts.vue';
export default {
  name: 'SendMoneyForm',
  components: {
    TextField,
    CurrencySelect,
   // Contacts
  },
  data() {
    return {
      dialog: false,
      isLoading: false,
      adminStore: useAdminStore(),
      globals: useGlobalsStore(),
      recipientDetail: {
        full_name: '',
        email: ''
      },
      recipient:{},
      customerDetail: {
        full_name: '',
        email: ''
      },
      currency: 'CAD',
      amount: '',
      securityQuestion: 'Company Name',
      securityAnswer: 'Cowris',
      description: '',
      zohoStore: useZohoStore(),
      mfaCodeDialog:false,
      mfaCode:null
    };
  },
  async mounted(){
    await this.zohoStore.fetchContact();
  },
  watch: {
        'recipient': {
            handler(newContacts) {
                this.recipientDetail.email = newContacts.Email;
                this.recipientDetail.full_name = newContacts.Full_Name;
            },
            deep: true,
            immediate: true
        }
    },
  methods: {
    closeDialog(){      
      this.recipientDetail =  {
        full_name: '',
        email: ''
      };
      this.customerDetail = {
        full_name: '',
        email: ''
      };
      this.amount = '';
      this.description = '' ;
      this.dialog = false;
    },
    async sendMoney() {
      const payload = {
        currency_symbol: this.currency,
        recipient_detail: this.recipientDetail,
        customer_detail: this.customerDetail,
        amount: Number(this.amount),
        security_question: this.securityQuestion,
        security_answer: this.securityAnswer,
        description: this.description,
        api_key: '',
        mfa_token:this.mfaCode
      };
      this.isLoading = true
      this.mfaCodeDialog = false;
      
      const res = await this.adminStore.sendMoney(payload);
      if(res){
        this.dialog = true;
      }
      this.isLoading = false
      console.log('Sending money with payload:', payload);
    }
  },

};
</script>

<style>
/* Add Customer custom styles here */
</style>
