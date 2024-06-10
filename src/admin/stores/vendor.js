
import { defineStore } from 'pinia';
import { useNotificationStore } from '@/stores/notification';

import { useClient } from '@/stores/client';
const useVendorStore = (useWindow = false) => {
    const defineStoreFunc = useWindow ? window.pinia.defineStore : defineStore;
    return defineStoreFunc({
        id: 'vendor',
        state: () => ({
            formData: {},
            vendors:{},
            vendorsLoading:true,
            currentVendor:{
                g_tin:'G-TI772388',
                nin:'4457899003323',
                bvn:'45875687899',
                phone_number:'08198456789',
                email:'saninsonslll@gmail.com',
                address:'NO. 32 B, Alkali Road, Sabo, Kumbiya',
                contact:'Dauda Umar Isah',
                account_name:'Dauda Umar Isah',
                account_number:'3444578934',
                bank_name:'Stanbic Bank',
                status:'Activ',
            }
        }),

        getters: {
          
        },

        actions: {
            async fetchVendors(params=null,path=null) {            
                this.vendorsLoading = true
                const response = await useClient().http({ method: 'get', path:path || '/vendors',data:params||{},fullPath: path?true:false })
                this.vendorsLoading = false                
                if(response){
                    this.vendors = response;
                }
            },    
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

            async fetchCurrentvendor(id) {
                this.vendorsLoading = true
                const response = await useClient().http({ method: 'get', path: '/vendors/'+id })
                this.vendorsLoading = false
                this.currentVendor = response.data;                
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
