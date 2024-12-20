<template>
    <div>
      <div v-if="!transactionSuccessful">
        <div v-if="type == 'debit'">
          <div class="tw-grid md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-2">
            <div>
              <TextField v-model="sendData.recipient_full_name" label="Recipient Full Name" required />
            </div>
            <div>
              <TextField v-model="sendData.recipient_email" label="Recipient Email" required />
            </div>
            <!-- <div>
              <TextField v-model="sendData.customer_full_name" label="Customer Full Name" required />
            </div>
            <div>
              <TextField v-model="sendData.customer_email" label="Customer Email" required />
            </div> -->
            <div class="md:tw-cols-span-2">
              <TextField v-model="sendData.amount" label="Amount" required />
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
          </div>
          <div class="tw-flex tw-justify-center tw-my-4">
            <v-btn ref="btnRef" @click="sendMoney" :loading="loadingTx" color="black">Send Money</v-btn>
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
      <div v-else  ref="receipt">
        <!-- Receipt section -->
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
import Checkbox from "primevue/checkbox";
import { useNotificationStore } from "@/stores/notification";
import { useGlobalsStore } from "@/stores/globals";

export default {
  components: {
    TextField,
    Checkbox,
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
      sendData: {
        security_question:'Company Name',
      },
      loadingTx: false,
      errors: {},
      global:useGlobalsStore(),
      fetchedReceivedData: {},
      loadingFetchedReceivedData: false,
      transactionSuccessful: false, // Flag to check transaction success
    };
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
    async sendMoney() {
      this.loadingTx = true;

      const res = await useClient().http({
        method: "post",
        path: "/transactions/send",
        data: { ...this.sendData, amount: Number(this.sendData.amount) },
      });
      if (res) {
        const notificationStore = useNotificationStore();
        notificationStore.showNotification({
          type: "success",
          message: "Sent successfully.",
        });
        this.transactionSuccessful = true; // Set transaction success flag
      }
      this.loadingTx = false;
    },
    printReceipt() {
      const printContents = this.$refs.receipt.innerHTML;
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;

      window.print();

      document.body.innerHTML = originalContents;
      window.location.reload();
    },
    resetTransaction() {
      this.transactionSuccessful = false;
      this.sendData = {};
    },
  },
};
</script>
