<template>
    <div class="tw-h-full tw-w-full" color="light">
      <DataTable
            :loading="global.loadingTransactions"
            :paginationData="global.clients"
            :headers="headers"
            @row-click="handleRowClick"
            @page-change="handlePageChange"
            placeholder="Search clients"
          >
        <template v-slot:td-action="{ row }">
            <UsersActions :row="row" @reload="reload" @viewClient="showClient" />
        </template>
        </DataTable>
    </div>
<!--   
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
-->
<Drawer v-model:visible="showdrawer" class="md:tw-w-[50%] tw-w-[95%]" :header="''" position="right">
    <template #header>
      <span class="tw-capitalize">Client Details</span>
    </template>
    <div ref="drawerContent">
      <div class="tw-text-center tw-mb-4">
        <h1 class="tw-text-2xl tw-font-semibold">{{ client.company_name }}</h1>
        <div class="tw-mt-2">
          <span class="tw-bg-gray-100 tw-text-gray-600 tw-py-1 tw-px-3 tw-rounded-lg tw-text-sm">
            {{ client.business_type }}
          </span>
        </div>
      </div>

      <div class="tw-mb-4">
        <div class="tw-grid tw-grid-cols-3 tw-gap-5">
            <div>
                 <div class="tw-text-gray-500 tw-text-sm tw-font-bold">Client ID</div>
                 <div class="tw-text-md">{{ client.id }}</div>
            </div>
             <div>
                 <div class="tw-text-gray-500 tw-text-sm tw-font-bold">KYC Status</div>
                 <div class="tw-text-md">{{ client.kyc_status }}</div>
            </div>

             <div>
                 <div class="tw-text-gray-500 tw-text-sm tw-font-bold">KYC Documentation Status</div>
                 <div class="tw-text-md">{{ client.kyc_documentation_status }}</div>
            </div>

             <div>
                 <div class="tw-text-gray-500 tw-text-sm tw-font-bold">Company Name</div>
                 <div class="tw-text-md">{{ client.company_name }}</div>
            </div>

             <div>
                 <div class="tw-text-gray-500 tw-text-sm tw-font-bold">Business Type</div>
                 <div class="tw-text-md">{{ client.business_type }}</div>
            </div>

             <div>
                 <div class="tw-text-gray-500 tw-text-sm tw-font-bold">Business Sector</div>
                 <div class="tw-text-md">{{ client.business_sector }}</div>
            </div>

             <div>
                 <div class="tw-text-gray-500 tw-text-sm tw-font-bold">Business Number (BN)</div>
                 <div class="tw-text-md">{{ client.rc_number }}</div>
            </div>

             <div>
                 <div class="tw-text-gray-500 tw-text-sm tw-font-bold">Company Email</div>
                 <div class="tw-text-md tw-w-[150px] tw-truncate">{{ client.company_email }}</div>
            </div>

             <div>
                 <div class="tw-text-gray-500 tw-text-sm tw-font-bold">Country of Operation</div>
                 <div class="tw-text-md">{{ client.business_country }}</div>
            </div>

             <div>
                 <div class="tw-text-gray-500 tw-text-sm tw-font-bold">Business State</div>
                 <div class="tw-text-md">{{ client.business_state }}</div>
            </div>

             <div>
                 <div class="tw-text-gray-500 tw-text-sm tw-font-bold">Business Address</div>
                 <div class="tw-text-md">{{ client.business_address }}</div>
            </div>

             <div>
                 <div class="tw-text-gray-500 tw-text-sm tw-font-bold">CAC Document</div>
                 <div class="tw-text-md">{{ client.cac_document ? 'Available' : 'Not Available' }}</div>
            </div>

             <div>
                 <div class="tw-text-gray-500 tw-text-sm tw-font-bold">Bank Statement</div>
                 <div class="tw-text-md">{{ client.bank_statement ? 'Available' : 'Not Available' }}</div>
            </div>

             <div>
                 <div class="tw-text-gray-500 tw-text-sm tw-font-bold">Can Send Money</div>
                 <div class="tw-text-md">{{ client.can_send_money ? 'Yes' : 'No' }}</div>
            </div>
             <div>
                 <div class="tw-text-gray-500 tw-text-sm tw-font-bold">Account Suspended</div>
                 <div class="tw-text-md">{{ client.is_suspended ? 'Yes' : 'No' }}</div>
            </div>
             <div>
                 <div class="tw-text-gray-500 tw-text-sm tw-font-bold">Ledger Balance</div>
                 <div class="tw-text-md">{{ global.toCurrency(clientBalance.ledger_balance, false, false) }}</div>
            </div>

             <div>
                 <div class="tw-text-gray-500 tw-text-sm tw-font-bold">Available Balance</div>
                 <div class="tw-text-md">{{ global.toCurrency(clientBalance.available_balance, false,false) }}</div>
            </div>
        </div>
      </div>

      <div class="tw-mt-6">
        <h2 class="tw-text-md tw-font-semibold">User Details</h2>
        <div v-for="user in client.users" :key="user.id" class="tw-mt-4 tw-grid tw-grid-cols-2 tw-gap-y-2">
             <div>
                 <div class="tw-text-gray-500 tw-text-sm tw-font-bold">User ID</div>
                 <div class="tw-text-md">{{ user.id }}</div>
            </div>

             <div>
                 <div class="tw-text-gray-500 tw-text-sm tw-font-bold">Email</div>
                 <div class="tw-text-md">{{ user.email }}</div>
            </div>

             <div>
                 <div class="tw-text-gray-500 tw-text-sm tw-font-bold">First Name</div>
                 <div class="tw-text-md">{{ user?.first_name }}</div>
            </div>

             <div>
                 <div class="tw-text-gray-500 tw-text-sm tw-font-bold">Last Name</div>
                 <div class="tw-text-md">{{ user.last_name }}</div>
            </div>

             <div>
                 <div class="tw-text-gray-500 tw-text-sm tw-font-bold">Phone Number</div>
                 <div class="tw-text-md">{{ user.phone_number }}</div>
            </div>
        </div>
      </div>

      <div class="tw-mt-6 tw-flex tw-flex-col tw-items-center">
        <v-btn @click="approveClient()" class="tw-bg-black tw-text-white tw-py-2 tw-px-4 tw-rounded-lg tw-mb-2 hover:tw-bg-gray-800">
            Approve Client
        </v-btn>
        <v-btn variant="text" @click="printDrawerContent()" class="tw-bg-black tw-text-white tw-py-2 tw-px-4 tw-rounded-lg tw-mb-2 hover:tw-bg-gray-800">
            Downlod Info
        </v-btn>
        <!-- <a href="#" class="tw-text-sm tw-text-gray-500 hover:tw-underline">
          Report an issue
        </a> -->
      </div>
    </div>
  </Drawer>
  </template>
  
  <script>
  import CompanyCard from "@/components/CompanyCard.vue";
  import Tab from "@/components/tab.vue";
  import DataTable from "@/components/Table/Table.vue";
  import TextField from "@/components/TextField.vue";
  import UsersActions from "@/components/UsersActions.vue";
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
      TextField,
      UsersActions
    },
    data() {
      return {
        sendData:{},
        receiveData:{},
        type: "credit",
        loadingTx:false,
        tabIndex: 0,
        tabs: [
        
        ],
        global: useGlobalsStore(),
        showdrawer: false,
        clientBalance:{},
        transaction: {},
        filters: {},
        showmodal:false,
        headers: [
          { key: "company_name", title: "Customer name" },
          { key: "company_email", title: "Email", copy:true },
          { key: "rc_number", title: "Corporate Number" },
          { key: "balance.available_balance", title: "Balance" },
          { key: "kyc_status", title: "KYC Status" },
          { key: "action", title: "Actions" },
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
          client:{}
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
           // transaction_type: this.type||'',
          };
  
          this.global.getClientsForAdmin(this.filters);
        },
        deep: true,
      },
      tabIndex: function (newV) {
        if (newV == 0) {
          this.type = "credit";
          this.filters.transaction_type = this.type
          this.global.getClientsForAdmin({
              transaction_type: this.type,
          });
        } else {
          this.type = "debit";
          this.filters.transaction_type = this.type
          this.global.getClientsForAdmin({
              transaction_type: this.type,
          });
        }
      },
    },
   
    methods: {
      async approveClient(){
          const res = await useClient().http({method:'post', path:''})
      },
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
      async showClient(id){
        this.isMenuOpenisMenuOpen = false
        this.showdrawer = true
        const res = await useClient().http({method:'get', path:'admin/clients/'+id})
        if(res){
            this.client = res.client
            this.clientBalance = res.balance
            this.showdrawer = true;
        }
      },
      async handleRowClick(row) {
        this.$router.push('/admin/dashboard/'+row.id);
        
        //this.transaction = row;
      },
      handlePageChange(path) {
        this.global.getClientsForAdmin(this.filters, path);
      },
      reload(){
        this.global.getClientsForAdmin(this.filters);
      }
    },
    created() {
      this.filters.transaction_type=this.type ;
      this.global.getClientsForAdmin(this.filters);
    },
  };
  </script>