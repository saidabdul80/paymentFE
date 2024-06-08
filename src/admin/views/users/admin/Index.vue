<template>
    <div class="">            
        <DataTable
            :loading="adminStore.staffsLoading"
            :headers="headers"
            :paginationData="adminStore.staffs"
            @row-click="handleRowClick"
            @page-change="handlePageChange"
          >       
          <template v-slot:td-photo="{ row }">
            <img :src="row.photo" alt="Image" class="tw-w-10 tw-h-10 tw-rounded-full">
          </template>
        </DataTable>
    </div>
</template>

<script>
import { shallowRef, computed } from 'vue'
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
            staffs:{},
            loading: false,
            searchInput: '',
            headers: [
                { title: 'S/N', key: 'serialNo' },
                { title: 'Staff Number', key: 'staff_number' },
                { title: 'Image', key: 'image' },
                { title: 'Full Name', key: 'name' },
                { title: 'Gender', key: 'gender' },
                { title: 'Taxpayer Type', key: 'taxpayerType' },
                { title: 'Phone Number', key: 'phone_number' },
                { title: 'Email', key: 'email' },
            ],
          
        }
    },
    created(){
        this.adminStore.fetchStaffs()
    },
    components: {
        TextField,
        DataTable
    },
    watch:{
        'globals.filters': {
            handler: function(newFilters) {
            this.adminStore.fetchStaffs(newFilters);
            },
            deep: true
        }
    },
    computed: {
        filteredItems() {
            return this.items.filter(item => {
                const searchLower = this.searchInput.toLowerCase();
                return Object.values(item).some(value =>
                    String(value).toLowerCase().includes(searchLower)
                );
            });
        }
    },

    methods: {
        handleRowClick(row) {
        console.log('Row clicked:', row);
        },
        handlePageChange(path) {                    
            this.adminStore.fetchStaffs(this.globals.filters, path)        
        },
        onClick() {
            this.loading = true
            setTimeout(() => {
                this.loading = false
            }, 2000)
        },
        navigateToNewAdmin() {
            // Assuming you have a route named 'new-admin'
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
