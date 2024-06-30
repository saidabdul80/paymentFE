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
            }
        }),

        actions: {
            async login(data) {
                const response = await useClient().http({ method: 'post', path: '/auth/login', data })
                if (response) {

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
                    const notificationStore = useNotificationStore();
                    notificationStore.showNotification({
                        type: 'success',
                        message: 'Logged in successfully.',
                    })
                    router.push('/admin/home')
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
                console.log(data)
                const notificationStore = useNotificationStore();
                notificationStore.showNotification({
                    type: 'success',
                    message: 'Check your email and spam folder for the password reset link within 5 minutes.',
                })
            },

        },
    })()
}
