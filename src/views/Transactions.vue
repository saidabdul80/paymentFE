<template>
  <div class="tw-h-full tw-w-full" color="light">
    <Tab :tabs="tabs" v-model="tabIndex" :withBorder="true" :config="tabConfig" refresh  @change="handleTabDrupdwonButton">
      <template v-slot:Sent>
        <DataTable
            :loading="global.loadingTransactions"
            :paginationData="global.transactions"
            :headers="headers"
            @row-click="handleRowClick"
            @page-change="handlePageChangeR"
            :search-options="searchOptions"
            :search-options-dropdown="searchOptionsDropdown"
          >
          <template v-slot:td-status="{ row }">
              <span class="tw-rounded-[33px] tw-bg-white tw-block">
                  <v-chip
                  size="small"
                  :color="getChipColor(row.status)"
                  class="tw-py-0 tw-flex tw-justify-center tw-font-bold tw-capitalize"
                  >
                  {{ row?.status.toLowerCase() }}
                  </v-chip>
              </span>
          </template>
      </DataTable>
      </template>
      <template v-slot:Received>
        <DataTable
          :loading="global.loadingTransactions"
          :paginationData="global.transactions"
          :headers="headers1"
          @row-click="handleRowClick"
          @page-change="handlePageChangeS"
          :search-options="searchOptions"
          :search-options-dropdown="searchOptionsDropdown"
        >
        <template v-slot:td-status="{ row }">
          <span class="tw-rounded-[33px] tw-bg-white tw-block">
              <v-chip size="small" :color="getChipColor(row.status)"
              class="tw-py-0 tw-flex tw-justify-center tw-font-bold tw-capitalize">
              {{ row?.status.toLowerCase() }}
              </v-chip>
          </span>
        </template>
        <template v-slot:td-action="{ row}" >
            <v-btn  @click.stop="updateRecord(row)" v-if="row?.status?.toLowerCase() !== 'completed' " size="small" icon="mdi-redo" :loading="row?.loading" color="black" title="Re Try Transaction" ></v-btn>
            <!-- <v-btn @click="confirmSendMoney(row)" v-if="row?.status?.toLowerCase() =='completed' && !row?.fulfilled" size="small"  icon="mdi-check"  :loading="isLoading" color="primary" title="Fulfil"></v-btn> -->
            <!-- <v-btn  @click.stop="getTransaction(row)"  icon="mdi-redo" size="small"> 
            </v-btn> -->
        </template>
        </DataTable>

      </template>
    </Tab>
  </div>

  <Dialog v-model:visible="showmodal" :header="getTitle" modal class="tw-min-[300px] md:tw-w-[450px]">
    <SendRecieveMoney :type="type" :receiveData="receiveData" />
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
        <div class="tw-text-gray-500 tw-text-sm">Amount</div>
        <div class="tw-text-sm">{{ formatAmount(transaction.amount) }} {{ transaction.currency }}</div>
        <div class="tw-text-gray-500 tw-text-sm">Net amount</div>
        <div class="tw-text-sm">{{ formatAmount(transaction.net_amount) }} {{ transaction.currency }}</div>
        <div class="tw-text-gray-500 tw-text-sm">Recipient name</div>
        <div class="tw-text-sm">{{ transaction.recipient_detail?.full_name }}</div>
        <div class="tw-text-gray-500 tw-text-sm">Recipient email</div>
        <div class="tw-text-sm tw-w-[150px] tw-truncate">
          {{ transaction.recipient_detail?.email }}
        </div>
        <div class="tw-text-gray-500 tw-text-sm">Start Balance</div>
        <div class="tw-text-sm">{{ formatAmount(transaction.start_balance) }} {{ transaction.currency }}</div>
        <div class="tw-text-gray-500 tw-text-sm">End Balance</div>
        <div class="tw-text-sm">{{ formatAmount(transaction.end_balance) }} {{ transaction.currency }}</div>
<!-- 
        <div class="tw-text-gray-500 tw-text-sm">Sender amount</div>
        <div class="tw-text-sm">{{ formatAmount(transaction.provider_request_response?.Amount) }} CAD</div> -->

        <!-- <div class="tw-text-gray-500 tw-text-sm">Exchange rate</div>
        <div class="tw-text-sm">{{ transaction.provider_request_response?.ExchangeRate || '$1 = $0.71' }}</div> -->
        <div class="tw-text-gray-500 tw-text-sm">Description</div>
        <div class="tw-text-sm">
          {{ transaction.description || 'No description available' }}
        </div>

        <div class="tw-text-gray-500 tw-text-sm">Note</div>
        <div class="tw-text-sm">
          {{ transaction?.notes|| 'No Note available' }}
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
        Download receipt
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
import SendRecieveMoney from "@/components/SendRecieveMoney.vue";
import Tab from "@/components/tab.vue";
import DataTable from "@/components/Table/Table.vue";
import TextField from "@/components/TextField.vue";
import ls from "@/services/ls";
import { useClient } from "@/stores/client";
import { useGlobalsStore } from "@/stores/globals";
import { useNotificationStore } from "@/stores/notification";
import { PhCaretLeft } from "@phosphor-icons/vue";
import Checkbox from "primevue/checkbox";
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
    TextField,
    Checkbox,
    SendRecieveMoney

  },
  data() {
    return {
      fetchedReceivedData:{},
      loadingFetchedReceivedData:false,
      sendData:{},
      receiveData:{},
      type: "credit",
      loadingTx:false,
      tabIndex: 0,
      // tabs: [
       
      //   { name: "Sent", key: "Sent" },
      // ],
      global: useGlobalsStore(),
      showdrawer: false,
      transaction: {},
      filters: {},
      showmodal:false,
      headers1: [
        { key: "customer_detail.full_name", title: "Customer name" },
        { key: "transaction_number", title: "Trx Number",copy:true },
        { key: "start_balance", title: "Start Balance" },
        { key: "type", title: "Trx type" },
        { key: "amount", title: "Amount" },
        { key: "end_balance", title: "End Balance" },
        { key: "created_at", title: "Date" },
        { key: "status", title: "Status" },
        { key: "action", title: "#" },
        
      ],
      headers: [
        // { key: "customer_detail.full_name", title: "Customer name" },
        { key: "transaction_number", title: "Trx Number",copy:true },
        {key: "recipient_detail.full_name", title: "Recipient name"},
        { key: "start_balance", title: "Start Balance" },
        { key: "type", title: "Trx type" },
        { key: "amount", title: "Amount" },
        { key: "end_balance", title: "End Balance" },
        { key: "created_at", title: "Date" },
        { key: "status", title: "Status" },
        { key: "action", title: "#" },
        
      ],
      searchOptionsDropdown:{
   
      },
      searchOptions:['name','email', 'amount','transaction_number','date'],
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
      user: ls.get('auth.user'),
    };
  },
  watch: {
    'global.filters': {
        handler: function (newFilters) {
        let status = newFilters?.status == "All" ? "" : newFilters?.status;
        this.filters = {
          transaction_status: status||'',
          sort: newFilters.sort||'',
          transaction_type: this.type||'',
          ...newFilters
          // transaction_number: newFilters.search||'',
        };
        this.global.getTrasactions(this.filters);
      },
      deep: true,
    },
    tabIndex: function (newV) {
      if (newV == 0) {
        this.type = "credit";
        this.filters.transaction_type = this.type
        this.global.getTrasactions({
            transaction_type: this.type,
        });
      } else {
        this.type = "debit";
        this.filters.transaction_type = this.type
        this.global.getTrasactions({
            transaction_type: this.type,
        });
      }
    },
  },
 computed:{
  tabs(){
    const tabs =  [{ name: "Received", key: "Received" }]
    if(this.user?.can_send_money){
      tabs.push({ name: "Sent", key: "Sent" });
    }
    return tabs;
  },
 getTitle(){
        if(this.type=='debit'){
            return 'Send Money'
        }else{
            return this.receiveData?.transaction_number ?'Re-try Receive Transaction': 'New Receive Transaction'
        }
    }
 },
  methods: {
    getChipColor(status) {
      const lowerStatus = status.toLowerCase();
      if (lowerStatus === 'completed') {
        return '#065F46'; // Green for completed
      } else if (lowerStatus === 'pending') {
        return 'orange'; // Orange for pending
      } else if (lowerStatus === 'failed') {
        return '#991B1B'; // Red for failed
      }
      return '#ccc'; // Default color (e.g., gray)
    },
    // async sendMoney(){
    //     this.loadingTx = true
    //     await useClient().http({
    //             method:'post',
    //             path:'/transactions/send',
    //             data:{...this.sendData, amount: Number(this.sendData.amount)}
    //         })
    //     this.loadingTx = false
    // },
    // async fetchReceived(){
    //     this.loadingFetchedReceivedData = true
    //     const res = await useClient().http({
    //             method:'post',
    //             path:'transactions/incoming/details',
    //             data:{reference_number:this.receiveData.reference_number}
    //         })
    //     if(res){
    //         this.fetchedReceivedData = res
    //     }
        
    //     this.loadingFetchedReceivedData = false
    // },
 
    updateRecord(rowData) {
      this.showmodal = true;
      this.receiveData.replyTo = rowData.customer_detail; // store the selected row data
      this.receiveData.reference_number = rowData.transaction_ref
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
      this.receiveData.date = formattedDate;
      this.receiveData.answer = ''
    },
    // async sendMoney(){
    //     this.loadingTx = true
    //     await useClient().http({
    //             method:'post',
    //             path:'/transactions/send',
    //             data:this.sendData
    //         })
    //     this.loadingTx = false
    // },
    async receiveMoney(){
        this.loadingTx = true
        if(this.receiveData?.reference_number){

            await useClient().http({
                method:'post',
                path:'/transactions/receive',
                data:this.receiveData
            })
        }else{
            await useClient().http({
                method:'post',
                path:'/transactions/incoming/details',
                data:this.receiveData
            })
        }
        this.loadingTx = false
    },
    handleTabDrupdwonButton(title){
        this.showmodal = true
    },
    getTransaction(row){

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
    handlePageChangeR(path) {
      this.filters.transaction_type=this.type ;
      console.log(this.type,'rece')
      this.global.getTrasactions(this.filters, path);
    },
    handlePageChangeS(path) {

      this.filters.transaction_type=this.type;
      this.global.getTrasactions(this.filters, path);
    },

  },
  created() {
    this.filters.transaction_type=this.type ;
    this.global.getTrasactions(this.filters);
  },
};
</script>