import axios from 'axios'
import { defineStore } from 'pinia'
import { useNotificationStore } from '@/stores/notification'
import { handleError } from '@/helpers/error-handling'
import Ls from '@/services/ls.js'
import { useClient } from '@/stores/client'
import router from '@/router'
export const useAuthStore = (useWindow = false) => {
    const defineStoreFunc = useWindow ? window.pinia.defineStore : defineStore

    return defineStoreFunc({
        id: 'auth',
        state: () => ({
            status: '',
            loginData: {
                username: '',
                password: '',
                remember: '',
            },
            forgotPasswordData: {
                idNumber: ''
            },
            loadingMFA: false,
            qrcode:null,
        }),

        actions: {
            async login(data) {
                const response = await useClient().http({ method: 'post', path: '/auth/login', data })                
                if (response) {
                    const password = data.password;
                    this.handlePassed(response);
                    if(response.user.is_default_password){
                        Ls.set('oldpassword',password)
                        router.push('/admin/change-password')        
                        return false;                
                    }

                    if(this.requireMFA()){                        
                        const user =  JSON.parse(Ls.get('auth.user')||"{}");
                        if(!user.is_mfa_setup){
                            this.setUpMFA()
                            router.push('/admin/setup-mfa')                            
                            return false;
                        }

                        router.push('/admin/verification')
                        return false;
                    }else{
                        const notificationStore = useNotificationStore();
                        notificationStore.showNotification({
                            type: 'success',
                            message: 'Logged in successfully.',
                        })
                    }
                    router.push('/admin/home')
                }
            },
            requireMFA(){
                let is_mfa = false                
                
                JSON.parse(Ls.get('permissions')||"{}").forEach(role => {
                    if(role == 'require-mfa'){
                        is_mfa = true;                        
                    }
                }); 
                return is_mfa;
            },
            handlePassed(response){
                
                const allPermissions = []; // Extract permissions from roles
                
                response.user.roles.forEach(role => {
                    role.permissions.forEach(permission => {
                        allPermissions.push(permission.name);
                    });
                }); // Extract root permissions

                response.user.permissions.forEach(permission => {
                    allPermissions.push(permission.name);
                });

                Ls.set('permissions', JSON.stringify(allPermissions));
                Ls.set('auth.token', response.token)
                Ls.set('auth.user', JSON.stringify(response.user))
                Ls.set('auth.client', JSON.stringify(response.client))                
                this.loginData.username = ''
                this.loginData.password = ''                               
            },
            async verifyMfaCode(data){
                const response = await useClient().http({ method: 'post', path: '/auth/verify-mfa',data })          
                if(response){
                    router.push('/admin/home')
                }
            },
            async changePassword(data){                
                const response = await useClient().http({ method: 'post', path: '/auth/change-password',data })
                if(response){     
                    Ls.remove('oldpassword');
                    const notificationStore = useNotificationStore();
                    notificationStore.showNotification({
                        type: 'success',
                        message: 'Password changed successfully.',
                    })               
                    this.logout()
                }
            },
            async setUpMFA(data){    
                this.loadingMFA = true;            
                const response = await useClient().http({ method: 'get', path: '/auth/setup-mfa',data })
                this.loadingMFA = false
                if(response){     
                    this.qrcode = response.qrCodeDataUrl;
                    Ls.set('mfa.qrcode',response.qrCodeDataUrl);                       
                }
            },
            async logout() {
                try {  
                    const token = Ls.get('auth.user');
                    if (token) {                    
                        //useClient().http({method:'post',path:'/auth/logout',data:{},fullPath:false});
                        Ls.remove('auth.user');
                        Ls.remove('permissions');
                        Ls.remove('auth.client');
                        const notificationStore = useNotificationStore();
                        notificationStore.showNotification({
                            type: 'success',
                            message: 'Logged out successfully.',
                        });
                        setTimeout(()=>{
                            router.push('/');
                        },500)
                    }else{
                        // const notificationStore = useNotificationStore();
                        // notificationStore.showNotification({
                        //     type: 'error',
                        //     message: 'Already logout.',
                        // });
                        setTimeout(()=>{
                            router.push('/');
                        },500)
                    }
                   
                } catch (err) {
                    const notificationStore = useNotificationStore();
                    notificationStore.showNotification({
                        type: 'error',
                        message: 'An error occurred while logging out.',
                    });
                }
            },
            async forgotPassword(data) {                
                const notificationStore = useNotificationStore();
                notificationStore.showNotification({
                    type: 'success',
                    message: 'Check your email and spam folder for the password reset link within 5 minutes.',
                })
            },

        },
    })()
}
