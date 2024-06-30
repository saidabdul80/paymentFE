import { defineStore } from 'pinia';
import { useNotificationStore } from '@/stores/notification';

import { useClient } from '@/stores/client';
const useRoleStore = (useWindow = false) => {
    const defineStoreFunc = useWindow ? window.pinia.defineStore : defineStore;
    return defineStoreFunc({
        id: 'role',

        state: () => ({
           
            allRoles: {},
            permissions: [],

            rollsLoading: false,
        }),

        getters: {},
        actions: {
            async updateRolePermission(id,data) {
                this.rollsLoading = true
                const response = await useClient().http({ method: 'put', path: `roles/${id}/permissions `, data })
                this.rollsLoading = false
                if (response) {
                    const notificationStore = useNotificationStore();
                    notificationStore.showNotification({
                        type: 'success',
                        message: 'Updated successfully.',
                    });
                }


            },

            async fetchRole() {
                this.rollsLoading = true
                const response = await useClient().http({ method: 'get', path: '/roles' })
                if(response){
                    this.rollsLoading = false
                   return response;
                    
                }
            },
            async fetchPermission() {
                this.rollsLoading = true
                const response = await useClient().http({ method: 'get', path: '/permissions' })
                if(response){
                    this.rollsLoading = false
                    this.permissions = response
                   return response;
                    
                }
            },

            async createRole(data) {
                this.staffsLoading = true;
                try {
                    const response = await useClient().http({
                        method: 'post',
                        path: '/staffs',
                        data
                    });
                    if (response) {
                        const notificationStore = useNotificationStore();
                        notificationStore.showNotification({
                            type: 'success',
                            message: 'Vendor created successfully.',
                        });
                    }
                } catch (error) {
                    console.error('Failed to create vendor:', error);
                } finally {
                    this.staffsLoading = false;
                }
            },
            async fetchRoleById(id) {
                this.staffsLoading = true
                const response = await useClient().http({ method: 'get', path: '/staffs/' + id })
                this.rolls = response.data;
                // this.currentUser = response.data;
                this.staffsLoading = false
            },
           
        },
    })();
};

export default useRoleStore;
