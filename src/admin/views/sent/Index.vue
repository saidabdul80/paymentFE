<template>
    <div>
      <DataTable
        :loading="adminStore.sentsLoading"
        :headers="headers"
        :paginationData="adminStore.sents"
        @row-click="handleRowClick"
        @page-change="handlePageChange"
      >
        <template v-slot:td-cemail="{ row }">
          {{ row.customer_detail.email }}
        </template>
        <template v-slot:td-cfull_name="{ row }">
          {{ row.customer_detail.full_name }}
        </template>
        <template v-slot:td-recipient_email="{ row }">
          {{ row.recipient_detail?.email }}
        </template>
        <template v-slot:td-recipient_full_name="{ row }">
          {{ row.recipient_detail?.full_name }}
        </template>
        <template v-slot:td-description="{ row }">
          {{ row.description }}
        </template>
        <template v-slot:td-status="{ row }">
          <v-chip
            size="small"
            :color="row.status?.toLowerCase() === 'completed' ? '#065F46' : '#991B1B'"
            class="tw-py-0 tw-flex tw-justify-center tw-font-bold tw-capitalize"
          >
            {{ row.status.toLowerCase() }}
          </v-chip>
        </template>
        <template v-slot:td-action="{ row }">          
          <v-btn @click="$route.push('/admin/send')" :loading="isLoading" color="primary">Re-Send</v-btn>
        </template>
      </DataTable>
    </div>
  </template>
  
<script>
import { useGlobalsStore } from '@/stores/globals';
import TextField from '@/components/TextField.vue';
import useAdminStore from '@/admin/stores/admin';

import DataTable from '@/components/Table.vue';
export default {
    data() {
        return {
            name: "Admins",
            adminStore:useAdminStore(),
            globals: useGlobalsStore(),
            sents:{},            
            searchInput: '',
            headers: [
                { title: 'S/N', key: 'sn' },
                { title: 'Transaction Ref', key: 'transaction_ref' },                            
                { title: 'Amount', key: 'amount' },                            
                { title: 'Customer Email', key: 'cemail' },                            
                { title: 'Customer Full Name', key: 'cfull_name' },                                
                { title: 'Recipient Email', key: 'cemail' },                            
                { title: 'Recipient Full_name', key: 'cfull_name' },                            
                { title: 'Description', key: 'notes' },                
                { title: 'Status', key: 'status' },
            ],
          
        }
    },
    created(){
        this.adminStore.fetchSent()
    },
    components: {
        TextField,
        DataTable
    },
    watch:{
        'globals.filters': {
            handler: function(newFilters) {                
                if(this.globals.activeTab =="Admins" || this.globals.activeTab == null){                    
                    this.adminStore.fetchSent(newFilters);
                }
            },
            deep: true
        }
    },
    computed: {      
    },
    methods: {
        handleRowClick(row) {
        console.log('Row clicked:', row);
        },
        handlePageChange(path) {                                
            this.adminStore.fetchSent(this.globals.filters, path)        
        },      
        navigateToNewAdmin() {
            this.$router.push('/admin/users/add-corporate-taxpayer');
        }
    },
}
</script>

<style>
.my-custom-text-field {
    font-size: 12px;
    /* Adjust the font size */
    padding: -2px 4px;
    /* Adjust the padding */
}
</style>
