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
            <div>
              <TextField v-model="sendData.recipient_full_name" label="Recipient Full Name" required />
            </div>
            <div>
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
            <div>
              <TextField v-model="sendData.security_question" label="Security Question" required />
            </div>
            <div>
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
                  v-model="sendData.recipient_detail.bank_code"
                  :options="bankOptions"
                  label="Select Bank"
                  option-label="name"
                  option-value="code"
                  :loading="loadingBanks"
                  @update:modelValue="handleBankSelect"
                  required
                ></SelectField>
              </div>
              <div>
                <TextField 
                  v-model="sendData.recipient_detail.account_number" 
                  label="Account Number" 
                  required
                  @blur="verifyAccount"
                />
                <div v-if="verifyingAccount" class="tw-text-sm tw-text-gray-500">
                  Verifying account...
                </div>
                <div v-if="accountVerificationError" class="tw-text-sm tw-text-red-500">
                  {{ accountVerificationError }}
                </div>
              </div>
              <div>
                <TextField 
                  v-model="sendData.recipient_detail.account_name" 
                  label="Account Name" 
                  required
                  :readonly="true"
                />
              </div>
              <div>
                <TextField 
                  v-model="sendData.recipient_detail.bank_name" 
                  label="Bank Name" 
                  required
                  :readonly="true"
                />
              </div>
            </template>
          </div>
          <div class="tw-flex tw-justify-center tw-my-4">
            <v-btn ref="btnRef" @click="sendMoney" :loading="loadingTx" color="black">Send Money</v-btn>
          </div>
        </div>
        <div v-else>
          <!-- Receive money section remains unchanged -->
        </div>
      </div>
      <div v-else ref="receipt">
        <!-- Receipt section remains unchanged -->
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
  data() {
    return {
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
    this.verifyAccount = debounce(this._verifyAccount, 500);
  },
  methods: {
    async fetchBanks() {
      this.loadingBanks = true;
      try {
        const response = await useClient().http({
          method: 'get',
          path: 'transactions/nigeria-bank-list'
        });
        this.bankOptions = response || [];
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
      if (!this.sendData.recipient_detail.bank_code || !this.sendData.recipient_detail.account_number) return;

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

        if (response && response.account_name) {
          this.sendData.recipient_detail.account_name = response.account_name;
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