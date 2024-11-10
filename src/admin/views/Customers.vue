<template>
  <div class="tw-h-full tw-w-full" color="light">
    <DataTable
          :loading="global.loadingTransactions"
          :paginationData="global.transactions"
          :headers="headers"
          @row-click="handleRowClick"
          @page-change="handlePageChange"
        />
  </div>

  <Dialog v-model:visible="showmodal" :header="type=='debit'?'Send Money':'Receive Transaction'" modal class="tw-min-[300px] md:tw-w-[450px]">
    <div v-if="type=='debit'">
      <div class="tw-grid md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-3">
        <div  >
          <TextField v-model="sendData.recipient_full_name" label="Recipient Full Name" required />
        </div>
        <div  >
          <TextField v-model="sendData.recipient_email" label="Recipient Email" required />
        </div>
        <div  >
          <TextField v-model="sendData.customer_full_name" label="Customer Email" required />
        </div>
        <div  >
          <TextField v-model="sendData.customer_email" label="Customer Full Name" required />
        </div>
        <div  >
          <TextField v-model="sendData.mount" label="Amount" required />
        </div>
        <!-- <div  >
          <TextField v-model="sendData.security_question" label="Security Question" required />
        </div>
        <div  >
          <TextField v-model="sendData.security_answer" label="Security Answer" required />
        </div>
        <div  >
          <TextField v-model="sendData.description" label="Description" required />
        </div> -->
      </div>
      <div class="tw-flex tw-justify-center tw-my-4">
          <v-btn ref="btnRef" @click="sendMoney" :loading="loadingTx" color="black">Send Money</v-btn>
      </div>
    </div>
    <div v-else>
        <div class="tw-grid tw-grid-cols-1 tw-gap-3">
        <div  >
          <TextField  v-model="receiveData.reference_number" label="Reference number" required />
        </div>
        <div  >
          <TextField v-model="receiveData.answer" label="Answer" required />
        </div>
        </div>
        <div class="tw-flex tw-justify-center tw-my-4">
          <v-btn ref="btnRef" @click="receiveMoney" :loading="loadingTx" color="black">Add Transaction</v-btn>
      </div>
    </div>
  </Dialog>
  <Drawer v-model:visible="showdrawer" class="" :header="type + ' Transaction'" position="right">

    <template #header>
        <span class="tw-capitalize">{{type}} Transaction</span>
    </template>
    <div ref="drawerContent">
    <div class="tw-text-center tw-mb-4">
      <h1 class="tw-text-2xl tw-font-semibold">{{ formatAmount(transaction.amount) }} {{ transaction.currency }}</h1>
      <!-- <p class="tw-text-gray-500 tw-flex tw-items-center tw-justify-center">{{ transaction.currency }} <PhCaretLeft /> USD</p> -->
      <div class="tw-mt-2">
        <span
          class="tw-bg-gray-100 tw-text-gray-600 tw-py-1 tw-px-3 tw-rounded-lg tw-text-sm"
        >
          {{ transaction.transaction_number }}
        </span>
      </div>
    </div>

    <!-- Company Details -->
    <!-- <div class="tw-flex tw-items-center tw-mb-4 tw-border-b tw-pb-4">
      <CompanyCard />
    </div> -->

    <!-- Transaction Details -->
    <div class="tw-mb-4">
      <div class="tw-grid tw-grid-cols-2 tw-gap-y-2">
        <div class="tw-text-gray-500 tw-text-sm">Customer name</div>
        <div class="tw-text-sm">{{ transaction.customer_detail?.full_name }}</div>

        <div class="tw-text-gray-500 tw-text-sm">Customer email</div>
        <div class="tw-text-sm tw-w-[150px] tw-truncate">
          {{ transaction.customer_detail?.email }}
        </div>

        <div class="tw-text-gray-500 tw-text-sm">amount</div>
        <div class="tw-text-sm">{{ formatAmount(transaction.amount) }} {{ transaction.currency }}</div>
<!-- 
        <div class="tw-text-gray-500 tw-text-sm">Sender amount</div>
        <div class="tw-text-sm">{{ formatAmount(transaction.provider_request_response?.Amount) }} CAD</div> -->

        <!-- <div class="tw-text-gray-500 tw-text-sm">Exchange rate</div>
        <div class="tw-text-sm">{{ transaction.provider_request_response?.ExchangeRate || '$1 = $0.71' }}</div> -->

        <div class="tw-text-gray-500 tw-text-sm">Description</div>
        <div class="tw-text-sm">
          {{ transaction.provider_request_response?.Description || 'No description available' }}
        </div>

        <div class="tw-text-gray-500 tw-text-sm">Date</div>
        <div class="tw-text-sm">{{ formatDate(transaction.created_at) }}</div>

        <div class="tw-text-gray-500 tw-text-sm">Status</div>
        <div class="tw-text-sm">
          <span
            :class="`tw-inline-block tw-px-2 tw-py-1 tw-rounded-full ${statusClass(transaction.status)}`"
          >
            {{ transaction.status }}
          </span>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="tw-mt-6 tw-flex tw-flex-col tw-items-center">
      <button
      @click="printDrawerContent()"
        class="tw-bg-black tw-text-white tw-py-2 tw-px-4 tw-rounded-lg tw-mb-2 hover:tw-bg-gray-800"
      >
        Download
      </button>
      <a href="#" class="tw-text-sm tw-text-gray-500 hover:tw-underline">
        Report an issue
      </a>
    </div>
    </div>
  </Drawer>
</template>

<script>
import CompanyCard from "@/components/CompanyCard.vue";
import Tab from "@/components/tab.vue";
import DataTable from "@/components/Table/Table.vue";
import TextField from "@/components/TextField.vue";
import { useClient } from "@/stores/client";
import { useGlobalsStore } from "@/stores/globals";
import { PhCaretLeft } from "@phosphor-icons/vue";
import Dialog from "primevue/dialog";
import Drawer from "primevue/drawer";
export default {
  components: {
    DataTable,
    CompanyCard,
    Drawer,
    Tab,
    PhCaretLeft,
    Dialog,
    TextField
  },
  data() {
    return {
      sendData:{},
      receiveData:{},
      type: "credit",
      loadingTx:false,
      tabIndex: 0,
      tabs: [
        { name: "Received", key: "Received" },
        { name: "Sent", key: "Sent" },
      ],
      global: useGlobalsStore(),
      showdrawer: false,
      transaction: {},
      filters: {},
      showmodal:false,
      headers: [
        { key: "full_name", title: "Customer name" },
        { key: "email", title: "Email", copy:true },
        { key: "total_receive", title: "Total Received Amount" },
        { key: "total_sent", title: "Total Sent Amount" },
        { key: "transaction_count", title: "Total Trx Count" },
        { key: "last_transaction_date", title: "Last Trx Date", formatDate: true  }
      ],
      tabConfig:{
          'Sent':{
            search: false,
         
            sideButton: true,
            toolTipText: '',
            dropDownLabel: 'Send Money',
          },
          'Received':{
            search: false,
            sideButton: true,
            toolTipText: '',
            dropDownLabel: 'Manual Receive',
          },
          
        },
      client_id:null
    };
  },
  watch: {
    'global.filters': {
        handler: function (newFilters) {
        let status = newFilters?.status == "All" ? "" : newFilters?.status;
        this.filters = {
          //transaction_status: status||'',
          sort: newFilters.sort||'',
          search: newFilters.search||'',
        };

        this.global.getCustomersForAdmin(this.filters);
      },
      deep: true,
    },
    tabIndex: function (newV) {
      if (newV == 0) {
        this.type = "credit";
        this.filters.transaction_type = this.type
        this.global.getCustomersForAdmin({
            transaction_type: this.type,
        });
      } else {
        this.type = "debit";
        this.filters.transaction_type = this.type
        this.global.getCustomersForAdmin({
            transaction_type: this.type,
        });
      }
    },
  },
 
  methods: {
    async sendMoney(){
        this.loadingTx = true
        await useClient().http({
                method:'post',
                path:'/transactions/send',
                data:this.sendData
            })
        this.loadingTx = false
    },
    async receiveMoney(){
        this.loadingTx = true
        await useClient().http({
                method:'post',
                path:'/transactions/receive',
                data:this.receiveData
            })
        this.loadingTx = false
    },
    handleTabDrupdwonButton(title){
        this.showmodal = true
    },
    printDrawerContent() {
      const printContent = this.$refs.drawerContent.innerHTML;
      const width = 105 * 3.78; // 1mm = 3.78px
    const height = 148 * 3.78;

    const printWindow = window.open("", "_blank", `width=${width},height=${height}`);

      printWindow.document.write(`
        <html>
          <head>
            <title>Print Receipt</title>
            <style>
             
            @page { size: 90mm 108mm; margin: 10mm; }
              body {
                font-family: Arial, sans-serif;
                margin: 10mm;
                width: 90mm;
                height: 108mm;
                box-sizing: border-box;
              }
              .tw-text-center { text-align: center; }
              .tw-mb-4 { margin-bottom: 1rem; }
              .tw-text-2xl { font-size: 1.5rem; }
              .tw-font-semibold { font-weight: 600; }
              .tw-text-gray-500 { color: #6B7280; }
              .tw-bg-gray-100 { background-color: #F3F4F6; }
              .tw-text-gray-600 { color: #4B5563; }
              .tw-py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
              .tw-px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
              .tw-rounded-lg { border-radius: 0.5rem; }
              .tw-text-sm { font-size: 0.875rem; }
              .tw-flex { display: flex; }
              .tw-items-center { align-items: center; }
              .tw-border-b { border-bottom: 1px solid #E5E7EB; }
              .tw-pb-4 { padding-bottom: 1rem; }
              .tw-grid { display: grid; }
              .tw-grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
              .tw-gap-y-2 { row-gap: 0.5rem; }
              .tw-mt-6 { margin-top: 1.5rem; }
              .tw-inline-block { display: inline-block; }
              .tw-bg-yellow-100 { background-color: #FEF3C7; }
              .tw-text-yellow-600 { color: #D97706; }
              .tw-bg-black { background-color: #000; }
              .tw-text-white { color: #fff; }
              .tw-hover-bg-gray-800:hover { background-color: #1F2937; }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    },

    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    statusClass(status) {
      const statusClasses = {
        completed: 'tw-bg-green-100 tw-text-green-600',
        pending: 'tw-bg-yellow-100 tw-text-yellow-600',
        processing: 'tw-bg-yellow-100 tw-text-yellow-600',
        rejected: 'tw-bg-red-100 tw-text-red-600',
        canceled: 'tw-bg-red-100 tw-text-red-600',
      };
      return statusClasses[status.toLowerCase()] || 'tw-bg-gray-100 tw-text-gray-600';
    },
    formatAmount(amount) {
      return amount ? parseFloat(amount).toFixed(2) : '0.00';
    },
    handleRowClick(row) {
      this.showdrawer = true;
      this.transaction = row;
    },
    handlePageChange(path) {
      this.global.getCustomersForAdmin(this.filters, path);
    },
  },
  created() {
    this.client_id = this.$route.params.id || null;
    if(this.client_id){
      this.filters.client_id = this.client_id
    }
    //this.filters.transaction_type=this.type ;
    this.global.getCustomersForAdmin(this.filters);
  },
};
</script>