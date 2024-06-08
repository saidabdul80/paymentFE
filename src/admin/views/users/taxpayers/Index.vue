<template>
    <div class="tw-px-5">

        <v-data-table @click:row="handleClick"
         :headers="headers" :items="filteredItems" :loading="loading">
            <template v-slot:loading>
                <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
            <template v-slot:item.image="{ item }">
                <img :src="item.image" alt="User Image" style="width: 30px; height: auto;" />
            </template>
            
        </v-data-table>
    </div>
</template>

<script>
import { shallowRef, computed } from 'vue'
import { useGlobalsStore } from '@/stores/globals';
import TextField from '@/components/TextField.vue';
import { taxpayers } from '@/services/taxpayers';
export default {
    data() {
        return {
            name: "TaxPayers",
            globals: useGlobalsStore(),
            loading: false,
            searchInput: '',
            headers: [
                { title: 'S/N', key: 'serialNo' },
                { title: 'Image', key: 'image' },
                { title: 'Full Name', key: 'name' },
                { title: 'G-TIN', key: 'gtin' },
                { title: 'Gender', key: 'gender' },
                { title: 'Taxpayer Type', key: 'taxpayerType' },
                { title: 'Phone Number', key: 'phoneNumber' },
                { title: 'Email', key: 'email' },
            ],
            items:taxpayers,
        }
    },

    components: {
        TextField,
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
        handleClick: function (item,row) {    
            const rowData = row.item;
            console.log('Row clicked:', rowData);
            this.$router.push('/admin/users/view-taxpayer');
        },
        onClick() {
            this.loading = true
            setTimeout(() => {
                this.loading = false
            }, 2000)
        },
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

.clickable-rows .v-data-table__row {
  cursor: pointer;
}

.v-data-table__tr--clickable:hover {
    background-color:  #f0f0f0 ;
}
</style>
