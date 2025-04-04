import axios from 'axios'
import { defineStore } from 'pinia'
import { useNotificationStore } from '@/stores/notification'
import { handleError } from '@/helpers/error-handling'
import Ls from '@/services/ls.js'
import { useClient } from '@/stores/client'
import router from '@/router'
import ls from '@/services/ls.js'
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
                localStorage.clear();
                const response = await useClient().http({ method: 'post', path: 'admin/login', data })                
                if (response) {
                    const password = data.password;
                  
                   this.handlePassed(response);
                    // if(response.user.is_default_password){
                    //     Ls.set('oldpassword',password)
                    //     router.push('/admin/change-password')        
                    //     return false;                
                    // }

                     
                  

                  
                }
            },
            requireMFA(){
                let is_mfa = false                
                
                    Ls.get('permissions').forEach(role => {
                    if(role == 'require-mfa'){
                        is_mfa = true;                        
                    }
                }); 
                return is_mfa;
            },
            handlePassed(response){
                if(response){

                    Ls.set('auth.token', response.token)
                    Ls.set('auth.user_type', 'admin')
                    Ls.set('auth.prefix', 'admin')
                    Ls.set('auth.user', JSON.stringify(response.admin))              
                    this.loginData.username = ''
                    this.loginData.password = ''                               
                    const notificationStore = useNotificationStore();
                    notificationStore.showNotification({
                        type: 'success',
                        message: 'Logged in successfully.',
                    })
                    
                    router.push('/admin/dashboard')
                }
            },
            async verifyMfaCode(data){
                const response = await useClient().http({ method: 'post', path: 'auth/verify-mfa',data })          
                if(response){
                    router.push('/app/dashboard')
                }
            },
            async changePassword(data){                
                const response = await useClient().http({ method: 'post', path: 'auth/change-password',data })
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
                    const token = Ls.get('auth.token');
                    if (token) {                    
                        //useClient().http({method:'post',path:'/auth/logout',data:{},fullPath:false});
                        Ls.remove('auth.user');
                        Ls.remove('permissions');
                        Ls.remove('auth.token');
                        localStorage.clear();
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
