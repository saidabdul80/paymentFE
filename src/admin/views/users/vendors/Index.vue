<template>
    <div class="">        
        <DataTable
            :loading="vendorStore.vendorsLoading"
            :headers="headers"
            :paginationData="vendorStore.vendors"
            @row-click="handleRowClick"
            @page-change="handlePageChange"
        >
            <template v-slot:td-photo="{ row }">
                <img :src="row.photo" alt="Image" class="tw-w-10 tw-h-10 tw-rounded-full">
            </template>
            <template v-slot:td-status="{ row }">
                <span class="tw-rounded-[33px] tw-bg-white tw-block">
                    <v-chip size="small" :color="row.status?.toLowerCase() == 'active' ? '#065F46' : '#991B1B'" class="tw-py-0 tw-flex tw-justify-center tw-font-bold tw-capitalize">
                        {{ row.status.toLowerCase() }}
                    </v-chip>
                </span>
            </template>
        </DataTable>
    </div>
</template>

<script>
import { useGlobalsStore } from '@/stores/globals';
import TextField from '@/components/TextField.vue';
import DataTable from '@/components/Table.vue';
import useVendorStore from '@/admin/stores/vendor';

export default {
    data() {
        return {
            name: "Vendors",
            vendorStore: useVendorStore(),
            globals: useGlobalsStore(),
            searchInput: '',
            headers: [
                { title: 'S/N', key: 'sn' },
                { title: 'Image', key: 'image' },
                { title: 'Full Name', key: 'full_name' },
                { title: 'Phone Number', key: 'phone_number' },
                { title: 'Email', key: 'email' },
                { title: 'Status', key: 'status' },
            ],
        };
    },
    created() {
        this.vendorStore.fetchVendors();
    },
    components: {
        TextField,
        DataTable
    },
    watch: {
        'globals.filters': {
            handler: function (newFilters) {
                if (this.globals.activeTab === "Vendors" || this.globals.activeTab == null) {
                    this.vendorStore.fetchVendors(newFilters);
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
            this.vendorStore.fetchVendors(this.globals.filters, path);
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
