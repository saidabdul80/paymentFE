import axios from 'axios';
import { defineStore } from 'pinia';
import { useNotificationStore } from '@/stores/notification';

import { useClient } from '@/stores/client';
const useAdminStore = (useWindow = false) => {
    const defineStoreFunc = useWindow ? window.pinia.defineStore : defineStore;
    return defineStoreFunc({
        id: 'admin',
        state: () => ({
            currentUser: {
                password:'password',
                email:''
            },            
            currentAbilities: [],
            userForm: {},
            creating:false,
            usersDashboardData:[],
            dashboardLoading:true,
            sents:{},
            sentsLoading:true,
            receives:{},
            receivesLoading:true,
            providers:[],
            users: {},
            usersLoading: false,
        }),

        getters: {
            currentAbilitiesCount: (state) => state.currentAbilities.length,
        },        
        actions: {
            async createAdmin(data) {     
                this.creating = true;           
                const response = await useClient().http({ method: 'post', path: '/admin', data })
                Object.keys(this.currentUser).forEach(key => {
                    this.currentUser[key]=  ''
                });
                this.creating = false;
                const notificationStore = useNotificationStore();
                notificationStore.showNotification({
                    type: 'success',
                    message: '',
                });

            },
            async updateCurrentUser(data) {
                const response = await useClient().http({ method: 'put', path: '/admin', data })
                this.currentUser = response.data;
                Object.assign(this.userForm, response.data.data);
                const notificationStore = useNotificationStore();
                notificationStore.showNotification({
                    type: 'success',
                    message: '',
                });

            },

            async fetchCurrentUser(params) {
                const response = await useClient().http({ method: 'get', path: '/admin/me', data })
                this.currentUser = response.data;
                this.userForm = response.data;
                const notificationStore = useNotificationStore();
                notificationStore.showNotification({
                    type: 'success',
                    message: '',
                });
            },
            async fetchUsersById(id) {
                this.usersLoading = true                
                const response = await useClient().http({ method: 'get', path: '/admin/' + id })                
                //this.currentUser2 = response.data.admin;                                                 
                this.usersLoading = false
                if(response){
                    this.currentUser = response.admin;
                }
            },
            async fetchUsersDashboard(params) {
                const response = await useClient().http({ method: 'get', path: '/users/dashboard_counts' })
                this.usersDashboardData = response
                this.dashboardLoading = false
            },
            async fetchUsers(params = null, path = null) {
                this.usersLoading = true
                const response = await useClient().http({ method: 'get', path: path || '/admin', data: params || {}, fullPath: path ? true : false })
                this.usersLoading = false
                if (response) {
                    this.users = response;
                }                
            },

            async fetchSent(params=null,path=null) {
                this.sentsLoading = true
                const response = await useClient().http({ method: 'get', path:path || '/transaction/sent',data:params||{},fullPath: path?true:false })
                this.sentsLoading = false                
                if(response){
                    this.sents = response;
                }
            },    
            async fetchReceive(params=null,path=null) {
                this.receivesLoading = true
                const response = await useClient().http({ method: 'get', path:path || '/transaction/receive',data:params||{},fullPath: path?true:false })
                this.receivesLoading = false                
                if(response){
                    this.receives = response;
                }
            },        
            async sendMoney(data) {
                const response = await useClient().http({ method: 'post', path: '/transaction/apaylo-send', data })                
                const notificationStore = useNotificationStore();
                notificationStore.showNotification({
                    type: 'success',
                    message: '',
                });
            },

            async fetchUserPermissions() {
                const response = await useClient().http({ method: 'get', path: '/sents/permissions', data })
                this.currentAbilities = response.data.data;
            },

            async dashboard(type='receive'){
                const response = await useClient().http({ method: 'get', path: '/transaction/stat?type='+type })
                return response
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
            async fullfil(data){
                const response = await useClient().http({ method: 'post', path: '/transaction/fulfilment  ',data })
                return response
            },

            async verifyApaylo(data){
                const response = await useClient().http({ method: 'post', path: '/transaction/apaylo-receive  ',data })
                return response
            },

            async fetchProviders(){
                const response = await useClient().http({ method: 'get', path: '/provider' })
                this.providers = response;
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
