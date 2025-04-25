<template>
  <div>
    <div v-if="!transactionSuccessful">
      <div v-if="type == 'debit'">
        <div class="tw-grid md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-2">
          <div>
            <SelectField
              v-model="sendData.currency_code"
              :options="currencyOptions"
              label="Currency"
              variant="outlined"
              @update:modelValue="handleCurrencyChange"
              required
            ></SelectField>
          </div>
          
          <!-- Common fields for both currencies -->
          <div v-if="sendData.currency_code === 'CAD'">
            <TextField v-model="sendData.recipient_full_name" label="Recipient Full Name" required />
          </div>
          <div v-if="sendData.currency_code === 'CAD'">
            <TextField v-model="sendData.recipient_email" label="Recipient Email" required />
          </div>
          <div class="md:tw-cols-span-2">
            <TextField 
              v-model="sendData.amount" 
              label="Amount" 
              required 
              :prefix="currencySymbol"
            />
          </div>
          <div v-if="sendData.currency_code === 'CAD'">
            <TextField v-model="sendData.security_question" label="Security Question" required />
          </div>
          <div v-if="sendData.currency_code === 'CAD'">
            <TextField v-model="sendData.security_answer" label="Security Answer" required />
          </div>
          <div>
            <TextField v-model="sendData.description" label="Description" required />
          </div>
          <div>
            <TextField v-model="sendData.mfa_token" label="MFA Token" required />
          </div>

          <!-- NGN specific fields -->
          <template v-if="sendData.currency_code === 'NGN'">
            <div>
              <SelectField
              :filter="true"
                v-model="sendData.recipient_detail.bank"
                option-label="bankName"
                :options="bankOptions"
                label="Select Bank"
                :loading="loadingBanks"
                @update:modelValue="handleBankSelect"
                required
              ></SelectField>
            </div>
            <div>
              <TextField 
                v-model="account_number" 
                label="Account Number" 
                required
                @keyup="verifyAccount"
              />
              <div v-if="verifyingAccount" class="tw-text-sm tw-text-gray-500">
                Verifying account...
              </div>
              <div v-if="accountVerificationError" class="tw-text-sm tw-text-red-500">
                {{ accountVerificationError }}
              </div>
            </div>
            <div class="tw-col-span-2">
              <p>
               <span class="tw-font-bold tw-text-gray-500">Bank Name:</span> {{ sendData.recipient_detail.bank_name }}
              </p>
              <p>
               <span class="tw-font-bold tw-text-gray-500">Account Name:</span> {{ sendData.recipient_detail.account_name }}
              </p>
            </div>
          </template>
        </div>
        <div class="tw-flex tw-justify-center tw-my-4">
          <v-btn ref="btnRef" :disabled="sendData.currency_code == 'NGN'? !accountVerified :false"  @click="sendMoney" :loading="loadingTx" color="black">Send Money</v-btn>
        </div>
      </div>
      <div v-else>
        <div class="tw-grid tw-grid-cols-1 tw-gap-3">
            <div class="tw-flex">
              <TextField v-model="receiveData.reference_number" label="Reference number" required class="tw-w-full tw-rounded-e-none" />
              <v-btn :loading="loadingFetchedReceivedData" @click="fetchReceived()" class="tw-bg-black tw-text-white tw-rounded-s-none tw-h-[42px] tw-w-[100px]" style="align-self: flex-end">Fetch</v-btn>
            </div>
            <div class="tw-my-3">
              <p><b>Senders Name:</b> {{ fetchedReceivedData?.sender_name }}</p>
              <p><b>Amount:</b> {{ fetchedReceivedData?.amount }}</p>
              <p>
                <b>Security Question:</b>
                    {{fetchedReceivedData?.security_question }}
                </p>
              <p><b>Description:</b> {{ fetchedReceivedData?.description }}</p>
            </div>
          </div>
          <div class="tw-flex tw-justify-center tw-my-4">
            <v-btn ref="btnRef" @click="accept" :loading="loadingTx" color="black">Accept Transaction</v-btn>
            <v-btn ref="btnRef" class="tw-ms-2" @click="reject" :loading="loadingTx" color="red">Reject Transaction</v-btn>
          </div>
        </div>
      </div>
      <div v-else ref="receipt">
        <div class="tw-bg-white tw-p-6 tw-rounded-md tw-max-w-lg tw-mx-auto">
            <h2 class="tw-text-xl tw-font-bold tw-mb-4">Transaction Receipt</h2>
            <p><b>Recipient Name:</b> {{ sendData.recipient_full_name }}</p>
            <p><b>Recipient Email:</b> {{ sendData.recipient_email }}</p>
            <!-- <p><b>Customer Name:</b> {{ sendData.customer_full_name }}</p>
            <p><b>Customer Email:</b> {{ sendData.customer_email }}</p> -->
            <p><b>Amount:</b> {{ sendData.amount }} CAD</p>
            <p><b>Security Question:</b> {{ sendData.security_question }}</p>
            <p><b>Security Answer:</b> {{ sendData.security_answer }}</p>
            <p><b>Description:</b> {{ sendData.description }}</p>
            <div class="tw-flex tw-justify-center tw-mt-4">
              <v-btn @click="printReceipt" color="black">Print Receipt</v-btn>
              <v-btn class="tw-ml-2" @click="resetTransaction" color="secondary">New Transaction</v-btn>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
import { useClient } from "@/stores/client";
import TextField from "./TextField.vue";
import { useNotificationStore } from "@/stores/notification";
import { useGlobalsStore } from "@/stores/globals";
import SelectField from './SelectField.vue';
import { debounce } from 'lodash';

export default {
components: {
  TextField,
  SelectField
},
props: {
  type: {
    type: String,
    default: "debit",
  },
  receiveData: {
    type: Object,
    default: () => ({}),
  },
},
watch: {
  'account_number':function() {
    this.sendData.recipient_detail.account_number = this.account_number
      this._verifyAccount()
  }
},
data() {
  return {
    account_number: '',
    currencyOptions: ['CAD', 'NGN'],
    bankOptions: [],
    loadingBanks: false,
    verifyingAccount: false,
    accountVerified: false,
    accountVerificationError: '',
    sendData: {
      security_question: 'Company Name',
      currency_code: 'CAD',
      recipient_detail: {
        account_name: '',
        account_number: '',
        bank_name: '',
        bank_code: ''
      }
    },
    loadingTx: false,
    global: useGlobalsStore(),
    fetchedReceivedData: {},
    loadingFetchedReceivedData: false,
    transactionSuccessful: false,
  };
},
computed: {
  currencySymbol() {
    return this.sendData.currency_code === 'NGN' ? '₦' : '$';
  }
},
created() {
  // Debounce the account verification to avoid excessive API calls
///  this.verifyAccount = debounce(this._verifyAccount, 500);
},
methods: {
  accept(){
        this.global.palert({
                title:'Accept?',
                text: '<p class="tw-mb-3">Enter Security Question Answer</p> '+
                  '<input type="text" id="answer-input" name="simple-input" placeholder="Anwser"'+
                      'class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">',
                cancelBtnText:'Cancel',
                confirmBtnText:'Proceed',
                loading:false,
                callback: async()=>{
                    const val = document.getElementById('answer-input').value
                    this.loadingTx = true
                    const res = await useClient().http({
                            method:'post',
                            path:'transactions/receive',
                            data:{reference_number:this.receiveData.reference_number, answer:val}
                        })
                        if(res){
                            const notificationStore = useNotificationStore();
                            notificationStore.showNotification({
                                type: 'success',
                                message: 'Completed',
                            });
                        }
                        this.loadingTx = false
                }
            })
    },
    async reject(){
        this.loadingTx = true
        const res = await useClient().http({
                method:'post',
                path:'transactions/decline',
                data:{reference_number:this.receiveData.reference_number}
            })
            if(res){
                const notificationStore = useNotificationStore();
                notificationStore.showNotification({
                    type: 'success',
                    message: 'Declined',
                });
            }
            this.loadingTx = false
    },
  async fetchReceived() {
      this.loadingFetchedReceivedData = true;
      const res = await useClient().http({
        method: "post",
        path: "transactions/incoming/details",
        data: { reference_number: this.receiveData.reference_number },
      });
      if (res) {
        this.fetchedReceivedData = res;
      }

      this.loadingFetchedReceivedData = false;
    },
  async fetchBanks() {
    this.loadingBanks = true;
    try {
      const response = await useClient().http({
        method: 'get',
        path: 'transactions/nigeria-bank-list'
      });
      this.bankOptions = response.banks || [];
    } catch (error) {
      console.error('Error fetching banks:', error);
      this.global.showError('Failed to load bank list. Please try again.');
    } finally {
      this.loadingBanks = false;
    }
  },
  handleCurrencyChange(currency) {
    if (currency === 'NGN') {
      this.fetchBanks();
    } else {
      // Reset NGN-specific fields when switching to CAD
      this.sendData.recipient_detail = {
        account_name: '',
        account_number: '',
        bank_name: '',
        bank_code: ''
      };
      this.accountVerified = false;
      this.accountVerificationError = '';
    }
  },
  handleBankSelect(bankCode) {
    const selectedBank = this.bankOptions.find(bank => bank.code === bankCode);
    if (selectedBank) {
      this.sendData.recipient_detail.bank_name = selectedBank.name;
    }
  },
  async _verifyAccount() {
    if (this.sendData.currency_code !== 'NGN') return;
    if (!this.sendData.recipient_detail.bank || !this.sendData.recipient_detail.account_number) return;
    if (this.account_number.length < 10) return;
    this.sendData.recipient_detail.bank_code = this.sendData.recipient_detail.bank.bankCode
    this.sendData.recipient_detail.bank_name = this.sendData.recipient_detail.bank.bankName
    this.verifyingAccount = true;
    this.accountVerificationError = '';
    this.accountVerified = false;

    try {
      const response = await useClient().http({
        method: 'post',
        path: 'transactions/verify-nigeria-account-details',
        data: {
          account_number: this.sendData.recipient_detail.account_number,
          bank_code: this.sendData.recipient_detail.bank_code
        }
      });

      if (response && response.data) {
        this.sendData.recipient_detail.account_name = response.data.accountName;
        this.accountVerified = true;
      } else {
        this.accountVerificationError = 'Account verification failed';
      }
    } catch (error) {
      console.error('Account verification error:', error);
      this.accountVerificationError = 'Failed to verify account details';
    } finally {
      this.verifyingAccount = false;
    }
  },
  verifyAccount(){
    if (this.sendData.recipient_detail.account_number && 
          this.sendData.recipient_detail.account_number.length === 10 &&
          this.sendData.recipient_detail.bank_code) {
        this._verifyAccount();
      }
  },
  async sendMoney() {
    // Validate required fields
    if (!this.sendData.currency_code) {
      this.global.showError('Please select a currency');
      return;
    }

    // Additional validation for NGN transactions
    if (this.sendData.currency_code === 'NGN') {
      if (!this.sendData.recipient_detail.bank_code || 
          !this.sendData.recipient_detail.account_number) {
        this.global.showError('Please select a bank and enter account number');
        return;
      }

      if (!this.accountVerified) {
        this.global.showError('Please verify the account details first');
        return;
      }
    }

    this.loadingTx = true;
    try {
      const payload = { 
        ...this.sendData, 
        amount: Number(this.sendData.amount) 
      };

      // For CAD transactions, remove recipient_detail if present
      if (this.sendData.currency_code === 'CAD') {
        delete payload.recipient_detail;
      }

      const res = await useClient().http({
        method: "post",
        path: "/transactions/send",
        data: payload
      });

      if (res) {
        const notificationStore = useNotificationStore();
        notificationStore.showNotification({
          type: "success",
          message: "Transaction sent successfully",
        });
        this.transactionSuccessful = true;
      }
    } catch (error) {
      console.error("Transaction error:", error);
      this.global.showError('Transaction failed. Please try again.');
    } finally {
      this.loadingTx = false;
    }
  },
  // Other methods remain unchanged...
},
};
</script>