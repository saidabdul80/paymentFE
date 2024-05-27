import axios from 'axios'
import { defineStore } from 'pinia'
import { useNotificationStore } from '@/stores/notification'
import { handleError } from '@/helpers/error-handling'
import Ls from '@/services/ls.js'
export const useAuthStore = (useWindow = false) => {
    const defineStoreFunc = useWindow ? window.pinia.defineStore : defineStore    

    return defineStoreFunc({
        id: 'auth',
        state: () => ({
            status: '',

            loginData: {
                username : '',
                password: '',
                remember: '',
            },
        }),

        actions: {
            login(data) {
                return new Promise((resolve, reject) => {                    
                    axios
                        .post('/api/staffs/login', data)
                        .then((response) => {
                            Ls.set('auth.token', response.data.token)
                            resolve(response)

                            setTimeout(() => {
                                this.loginData.username  = ''
                                this.loginData.password = ''
                            }, 1000)
                        })
                        .catch((err) => {
                            handleError(err)
                            reject(err)
                        })
                })
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
        },
    })()
}
