import axios from 'axios';
import { defineStore } from 'pinia';
import { useNotificationStore } from '@/stores/notification';

import { useClient } from '@/stores/client';
const useVendorStore = (useWindow = false) => {
    const defineStoreFunc = useWindow ? window.pinia.defineStore : defineStore;
    return defineStoreFunc({
        id: 'vendor',

        state: () => ({
            formData: {},
        }),

        getters: {
          
        },

        actions: {
            async createVendors(data) {
                const response = await useClient().http({ method: 'post', path: '/vendors', data })
                if(response) {
                    Ls.set('auth.token', response.token)
                        // this.formData.rc_number = ''
                        // this.formData.business_name = ''
                        // this.formData.jtbIn = ''
                        // this.formData.address_line1 = ''
                        // this.formData.address_line2 = ''
                        // this.formData.lga = ''
                        // this.formData.contactFirst_name = ''
                        // this.formData.contact_middle_name = ''
                        // this.formData.contact_last_name = ''
                        // this.formData.bank_name = ''
                        // this.formData.account_name = ''
                        // this.formData.account_number = ''
                    const notificationStore = useNotificationStore();
                    notificationStore.showNotification({
                        type: 'success',
                        message: 'Vendor created successfully.',
                    })
                    router.push('/admin/dashboard')
                }
            },
            
            async updateCurrentvendor(data) {
                const response = await useClient().http({ method: 'put', path: '/vendors', data })
                this.currentvendor = response.data;
                Object.assign(this.vendorForm, response.data.data);
                const notificationStore = useNotificationStore();
                notificationStore.showNotification({
                    type: 'success',
                    message: '',
                });

            },

            async fetchCurrentvendor(params) {
                const response = await useClient().http({ method: 'get', path: '/vendors/me', data })
                this.currentvendor = response.data;
                this.vendorForm = response.data;
                const notificationStore = useNotificationStore();
                notificationStore.showNotification({
                    type: 'success',
                    message: '',
                });
            },

            async uploadAvatar(data) {
                const response = await useClient().http({ method: 'get', path: '/staffs/upload-avatar', data })
                this.currentvendor.avatar = response.data.avatar;
                const notificationStore = useNotificationStore();
                notificationStore.showNotification({
                    type: 'success',
                    message: '',
                });
            },

        },
    })();
};

export default useVendorStore;
