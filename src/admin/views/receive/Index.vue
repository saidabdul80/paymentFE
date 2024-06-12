<template>
    <div>
      <DataTable
        :loading="adminStore.receivesLoading"
        :headers="headers"
        :paginationData="adminStore.receives"
        @row-click="handleRowClick"
        @page-change="handlePageChange"
      >
        <template v-slot:td-sender_amount="{ row }">
          {{row.sender_currency.currency_symbol}} <span class="tw-font-bold" > {{ row.sender_amount }}</span>
        </template>
        <template v-slot:td-receiver_amount="{ row }">
            {{row.receiver_currency.currency_symbol}} <span class="tw-font-bold" >{{ row.receiver_amount }}</span>
        </template>
        <template v-slot:td-exchange_rate="{ row }">
          {{ parseFloat( row.exchange_rate).toFixed(2) }}
        </template>
        <template v-slot:td-recipient_email="{ row }">
          {{ row.recipient_detail.email }}
        </template>
        <template v-slot:td-recipient_full_name="{ row }">
          {{ row.recipient_detail.full_name }}
        </template>
        <template v-slot:td-customer_email="{ row }">
            <div class="tw-overflow-x-auto">
                {{ row.customer_detail.email }}
            </div>
        </template>
        <template v-slot:td-customer_full_name="{ row }">
            <div class="tw-overflow-x-auto">
                {{ row.customer_detail.full_name }}
            </div>
        </template>
        <template v-slot:td-description="{ row }">
            <div class="tw-overflow-x-auto">
                {{ row.notes }}
            </div>
        </template>
        <template v-slot:td-status="{ row }">
          <v-chip
            size="small"
            :color="row.status === 'completed' ? '#065F46' : '#991B1B'"
            class="tw-py-0 tw-flex tw-justify-center tw-font-bold tw-capitalize">
            {{ row.status }}
          </v-chip>
        </template>
        <template v-slot:td-transaction_ref="{ row }">
            <div class="tw-overflow-x-auto">
                {{ row.transaction_ref }}
            </div>
        </template>
        <template v-slot:td-transaction_number="{ row }">
            <div class="tw-overflow-x-auto">
                {{ row.transaction_number }}
            </div>
        </template>
        <template v-slot:td-action="{ row }">          
          <v-btn @click="confirmSendMoney(row)" v-if="row.status.toLowerCase() =='completed' && !row.fulfilled" :loading="isLoading" color="primary">Fulfil</v-btn>
        </template>
      </DataTable>
    </div>

    <v-dialog v-model="confirmDialog" max-width="400">
      <v-card>

        <v-card-title>Confirmation</v-card-title>
        <v-card-text>
          Are you sure you want to confirm money sent?
        </v-card-text>
        <div class="tw-px-4">
            <v-select error-messages="Please select a Provider" :error="selectedProviderError" v-model="selectedProvider" :items="adminStore.providers" item-value="id" item-title="name" label="Select Currency" variant="solo"
                        height="20px" width="100%" class="tw-mb-0"></v-select>
        </div>
        <v-card-actions>
          <v-btn color="error" text @click="confirmDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="sendMoney(rowToSend)" :loading="isLoading">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
<script>
import { useGlobalsStore } from '@/stores/globals';
import TextField from '@/components/TextField.vue';
import useAdminStore from '@/admin/stores/admin';
import DataTable from '@/components/Table.vue';
import Ls from '@/services/ls';
export default {
  data() {
    return {
      name: "Admins",
      adminStore: useAdminStore(),
      user: JSON.parse(Ls.get('auth.client')||"{}"),
      globals: useGlobalsStore(),
      receives: {},
      searchInput: '',
      isLoading: false, // to indicate if the request is loading
      confirmDialog: false, // confirmation dialog flag
      rowToSend: null,
      selectedProviderError:false,
      selectedProvider:null,
      headers: [
        { title: 'S/N', key: 'sn' },
        { title: 'Sender Amount', key: 'sender_amount' },
        { title: 'Receiver Amount', key: 'receiver_amount' },
        { title: 'Ex. Rate', key: 'exchange_rate' },
        { title: 'Re. Email', key: 'recipient_email' },
        { title: 'Re. Name', key: 'recipient_full_name' },
        { title: 'Cust. Email', key: 'customer_email' },
        { title: 'Cust. Name', key: 'customer_full_name' },
        { title: 'Description', key: 'notes' },
        { title: 'Status', key: 'status' },
        { title: 'Trx. Ref', key: 'transaction_ref' },
        { title: 'Trx. No.', key: 'transaction_number' },
        { title: '#', key: 'action' }
        
      ],
    };
  },
  components: {
    TextField,
    DataTable
  },
  watch: {
    'globals.filters': {
      handler: function(newFilters) {
        if (this.globals.activeTab === "Admins" || this.globals.activeTab === null) {
          this.adminStore.fetchReceive(newFilters);
        }
      },
      deep: true
    }
  },
  created(){
    this.adminStore.fetchReceive();
    this.adminStore.fetchProviders()
  },
  methods: {
    confirmSendMoney(rowData) {
      this.rowToSend = rowData; // store the selected row data
      this.confirmDialog = true; // open the confirmation dialog
    },
    handleRowClick(row) {
      console.log('Row clicked:', row);
    },
    handlePageChange(path) {
      this.adminStore.fetchReceive(this.globals.filters, path);
    },   
    async sendMoney(rowData){
        this.selectedProviderError =false
        if(this.selectedProvider == null){
            this.selectedProviderError =true
            return;
        }
        this.isLoading = true
        const payload = {
          currency_symbol:rowData.receiver_currency.currency_symbol, // You can modify this based on your requirement          
          transaction_id: rowData.id,
          payment_provider_id:this.selectedProvider,
          recipient_detail: rowData.recipient_detail,
          customer_detail: rowData.customer_detail,
          amount: parseFloat(rowData.sender_amount),
          description: rowData.notes || '', // Assuming 'notes' is the description
          api_key:this.user.api_key,
          transaction_number: rowData.transaction_number || '', // Optional
          payment_number: rowData.provider_request_response.senderMemo || '' // Optional
        };
        this.confirmDialog = false; 
        await this.adminStore.fullfil(payload);
        this.adminStore.fetchReceive();
        this.isLoading = false
    }
  }
}
</script>
