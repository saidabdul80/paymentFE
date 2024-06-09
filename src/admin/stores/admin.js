import axios from 'axios';
import { defineStore } from 'pinia';
import { useNotificationStore } from '@/stores/notification';

import { useClient } from '@/stores/client';
const useAdminStore = (useWindow = false) => {
    const defineStoreFunc = useWindow ? window.pinia.defineStore : defineStore;
    return defineStoreFunc({
        id: 'user',

        state: () => ({
            currentUser: null,
            currentAbilities: [],
            userForm: {},
            usersDashboardData:[],
            dashboardLoading:true,
            staffs:{},
            staffsLoading:true,
        }),

        getters: {
            currentAbilitiesCount: (state) => state.currentAbilities.length,
        },        
        actions: {
            async updateCurrentUser(data) {
                const response = await useClient().http({ method: 'put', path: '/staffs', data })
                this.currentUser = response.data;
                Object.assign(this.userForm, response.data.data);
                const notificationStore = useNotificationStore();
                notificationStore.showNotification({
                    type: 'success',
                    message: '',
                });

            },

            async fetchCurrentUser(params) {
                const response = await useClient().http({ method: 'get', path: '/staffs/me', data })
                this.currentUser = response.data;
                this.userForm = response.data;
                const notificationStore = useNotificationStore();
                notificationStore.showNotification({
                    type: 'success',
                    message: '',
                });
            },
            async fetchUsersDashboard(params) {
                const response = await useClient().http({ method: 'get', path: '/users/dashboard_counts' })
                this.usersDashboardData = response
                this.dashboardLoading = false
            },

            async fetchStaffs(params=null,path=null) {
                this.staffsLoading = true
                const response = await useClient().http({ method: 'get', path:path || '/staffs',data:params||{},fullPath: path?true:false })
                this.staffsLoading = false                
                if(response){
                    this.staffs = response;
                }
            },        
            async uploadAvatar(data) {
                const response = await useClient().http({ method: 'get', path: '/staffs/upload-avatar', data })
                this.currentUser.avatar = response.data.avatar;
                const notificationStore = useNotificationStore();
                notificationStore.showNotification({
                    type: 'success',
                    message: '',
                });
            },

            async fetchUserPermissions() {
                const response = await useClient().http({ method: 'get', path: '/staffs/permissions', data })
                this.currentAbilities = response.data.data;
            },

            hasAbilities(abilities) {
                return !!this.currentAbilities.find((ab) => {
                    if (ab.name === '*') return true;
                    if (typeof abilities === 'string') {
                        return ab.name === abilities;
                    }
                    return !!abilities.find((p) => ab.name === p);
                });
            },

            hasAllAbilities(abilities) {
                return abilities.every((ability) =>
                    this.currentAbilities.some((ab) => ab.name === ability || ab.name === '*')
                );
            },
        },
    })();
};

export default useAdminStore;
