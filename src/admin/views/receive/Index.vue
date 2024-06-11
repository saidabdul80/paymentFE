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
          {{ row.sender_amount }}
        </template>
        <template v-slot:td-receiver_amount="{ row }">
          {{ row.receiver_amount }}
        </template>
        <template v-slot:td-exchange_rate="{ row }">
          {{ row.exchange_rate }}
        </template>
        <template v-slot:td-recipient_email="{ row }">
          {{ row.recipient_detail.email }}
        </template>
        <template v-slot:td-recipient_full_name="{ row }">
          {{ row.recipient_detail.full_name }}
        </template>
        <template v-slot:td-customer_email="{ row }">
          {{ row.customer_detail.email }}
        </template>
        <template v-slot:td-customer_full_name="{ row }">
          {{ row.customer_detail.full_name }}
        </template>
        <template v-slot:td-description="{ row }">
          {{ row.notes }}
        </template>
        <template v-slot:td-status="{ row }">
          <v-chip
            size="small"
            :color="row.status === 'completed' ? '#065F46' : '#991B1B'"
            class="tw-py-0 tw-flex tw-justify-center tw-font-bold tw-capitalize"
          >
            {{ row.status }}
          </v-chip>
        </template>
        <template v-slot:td-transaction_ref="{ row }">
          {{ row.transaction_ref }}
        </template>
        <template v-slot:td-transaction_number="{ row }">
          {{ row.transaction_number }}
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
      adminStore: useAdminStore(),
      globals: useGlobalsStore(),
      receives: {},
      searchInput: '',
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
        { title: 'Tranx. Ref', key: 'transaction_ref' },
        { title: 'Tranx. Number', key: 'transaction_number' }
      ],
    };
  },
  created() {
    this.adminStore.fetchReceive();
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
  methods: {
    handleRowClick(row) {
      console.log('Row clicked:', row);
    },
    handlePageChange(path) {
      this.adminStore.fetchReceive(this.globals.filters, path);
    },
    navigateToNewAdmin() {
      this.$router.push('/admin/users/add-corporate-taxpayer');
    }
  }
}
</script>
