import { defineStore } from 'pinia';
import { useNotificationStore } from '@/stores/notification';
import { useClient } from '@/stores/client';

export const useSettingsStore = (useWindow = false) => {
    const defineStoreFunc = useWindow ? window.pinia.defineStore : defineStore;

    return defineStoreFunc({
        id: 'admin-settings',
        state: () => ({
            configurationsLoading:false,
            configurations:[]
        }),

        getters: {},

        actions: {
            async fetchConfigurations(params = null, path = null) {
                this.configurationsLoading = true;
                try {
                    const response = await useClient().http({
                        method: 'get',
                        path: path || '/admin/settings',
                        data: params || {},
                        fullPath: !!path
                    });
                    if (response) {
                     
                        this.configurations = response;
                        return response;
                    }
                } catch (error) {
                    console.error('Failed to fetch vendors:', error);
                } finally {
                    this.configurationsLoading = false;
                }
            },
            async saveConfiguration(data = {}, id = null) {
                this.configurationsLoading = true;                
                const response = await useClient().http({
                    method: 'put',
                    path: '/admin/settings/',
                    data: data || {}                    
                });
                if (response) {
                    const notificationStore = useNotificationStore();
                    notificationStore.showNotification({
                        type: 'success',
                        message: 'updated successfully.',
                    });
                }                
                this.configurationsLoading = false;
            },
       
        },
    })();
};
if( import.meta.env.VITE_DEVELOPMENT_MODE == 'local'){
    window.admin_settingsStore  = useSettingsStore;
  }