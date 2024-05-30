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
                const response = await useClient().http({ method: 'post', path: '/staffs/login', data })
                if (response) {
                    Ls.set('auth.token', response.token)
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

            logout() {
                return new Promise((resolve, reject) => {
                    axios.post('/auth/logout', null, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('auth.token')}`
                        }
                    }).then((response) => {
                        const notificationStore = useNotificationStore()
                        notificationStore.showNotification({
                            type: 'success',
                            message: 'Logged out successfully.',
                        })

                        window.router.push('/login')
                        // resetStore.clearPinia()
                        resolve(response)
                    })
                        .catch((err) => {
                            handleError(err)
                            window.router.push('/')
                            reject(err)
                        })
                })
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
