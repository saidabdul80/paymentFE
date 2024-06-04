<template>
    <div class="tw-px-5">
        <v-data-table :headers="headers" :items="filteredItems" :loading="loading">
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

export default {
    data() {
        return {
            name: "Admins",
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
            items: [
                { serialNo: 1, image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', name: 'Halima Umar Samb', gtin: 'GTG4773', gender: 'Female', taxpayerType: 'Individual', phoneNumber: '09067543245', email: 'halima773@gmail.com' },
                { serialNo: 2, image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', name: 'Adamu Lawan', gtin: 'GTG3454', gender: 'Female', taxpayerType: 'Corporate', phoneNumber: '09067543245', email: 'yusuftankostore@yahoo.com' },
                { serialNo: 3, image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', name: 'Festus Holdings', gtin: 'GTG1968', gender: 'Male', taxpayerType: 'Individual', phoneNumber: '08067543245', email: 'mmsiraj346@gmailmail.com' },
                { serialNo: 4, image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', name: 'Adama Yahaya', gtin: 'GTG1964', gender: 'Male', taxpayerType: 'Individual', phoneNumber: '07067543245', email: 'zplaza@yahoo.com' },
                { serialNo: 5, image: 'https://imgcdn.stablediffusionweb.com/2024/4/20/9fc776ca-96ab-4189-b189-9d6ef63137e2.jpg', name: 'Sani Gaya & Co.', gtin: 'GTG1964', gender: 'Male', taxpayerType: 'Individual', phoneNumber: '09067543245', email: 'madam234@hotmail.com' },
                { serialNo: 6, image: 'https://pbs.twimg.com/profile_images/1655273316855193601/XC0ib5Q5_400x400.jpg', name: 'Yusuf Tanko Ventures', gtin: 'GTG1970', gender: 'Male', taxpayerType: 'Corporate', phoneNumber: '09067543245', email: 'scouture@yahoo.com' },
                { serialNo: 7, image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', name: 'Muhammad Sirajo', gtin: 'GTG1971', gender: 'Male', taxpayerType: 'Individual', phoneNumber: '09067543245', email: 'halima773@gmail.com' },
                { serialNo: 8, image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', name: 'Zainab Plaza', gtin: 'GTG1970', gender: 'Female', taxpayerType: 'Corporate', phoneNumber: '09067543245', email: 'halima773@gmail.com' },
                { serialNo: 9, image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', name: 'Muniratu Musa Adam', gtin: 'GTG1968', gender: 'Female', taxpayerType: 'Individual', phoneNumber: '09067543245', email: 'halima773@gmail.com' },
                { serialNo: 10, image: 'https://pbs.twimg.com/media/F2IW0vIXUAEckVv.jpg', name: 'Salima Coutur', gtin: 'GTG1967', gender: 'Female', taxpayerType: 'Corporate', phoneNumber: '09067543245', email: 'halima773@gmail.com' },
                { serialNo: 12, image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', name: 'Kubura Ademola', gtin: 'GTG1968', gender: 'Male', taxpayerType: 'Corporate', phoneNumber: '09067543245', email: 'kubee919@gmail.com' },
                { serialNo: 13, image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', name: 'Pontiac GTO', gtin: 'GTG1964', gender: 'Male', taxpayerType: 'Corporate', phoneNumber: '09067543245', email: 'halima773@gmail.com' },
                { serialNo: 14, image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', name: 'Plymouth Barracuda', gtin: 'GTG1964', gender: 'Male', taxpayerType: 'Individual', phoneNumber: '09067543245', email: 'adamse@yahoo.com' },
                { serialNo: 15, image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', name: 'Chevrolet Chevelle SS', gtin: 'GTG1970', gender: 'Male', taxpayerType: 'Individual', phoneNumber: '09067543245', email: 'holdings234@gmail.com' },
                { serialNo: 16, image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', name: 'Ford Mustang', gtin: 'GTG1965', gender: 'Male', taxpayerType: 'Individual', phoneNumber: '09067543245', email: 'adamayks4@yahoo.com' },
                { serialNo: 17, image: 'https://1.bp.blogspot.com/-cYpyEBqTD9s/V71dpkJ2uZI/AAAAAAAAHss/q0yRo0XRB4k8peIgyzcPDjNxmO6mK2DXACLcB/s640/13-3.jpg', name: 'Dodge Charger', gtin: 'GTG1968', gender: 'Male', taxpayerType: 'Individual', phoneNumber: '09067543245', email: 'halima773@gmail.com' },
            ],
        }
    },

    components: {
        TextField
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
