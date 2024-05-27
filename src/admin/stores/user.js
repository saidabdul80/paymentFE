import axios from 'axios';
import { defineStore } from 'pinia';
import { useNotificationStore } from '@/stores/notification';
import { handleError } from '@/helpers/error-handling';

const useUserStore = (useWindow = false) => {
    const defineStoreFunc = useWindow ? window.pinia.defineStore : defineStore;

    axios.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('auth.token')}`;
        return config;
    });

    return defineStoreFunc({
        id: 'user',

        state: () => ({
            currentUser: null,
            currentAbilities: [],            

            userForm: {
                first_name: '',
                email: '',
                password: '',
                confirm_password: '',                
            },
        }),

        getters: {
            currentAbilitiesCount: (state) => state.currentAbilities.length,
        },

        actions: {
            updateCurrentUser(data) {
                return new Promise((resolve, reject) => {
                    axios.put('/api/staffs', data)
                        .then((response) => {
                            this.currentUser = response.data.data;
                            Object.assign(this.userForm, response.data.data);
                            const notificationStore = useNotificationStore();
                            notificationStore.showNotification({
                                type: 'success',
                                message: '',
                            });
                            resolve(response);
                        })
                        .catch((err) => {
                            handleError(err);
                            reject(err);
                        });
                });
            },

            fetchCurrentUser(params) {
                return new Promise((resolve, reject) => {
                    axios.get('/api/staffs/me', { params })
                        .then((response) => {
                            this.currentUser = response.data.data;
                            this.userForm = response.data.data;
                            resolve(response);
                        })
                        .catch((err) => {
                            handleError(err);
                            reject(err);
                        });
                });
            },

            uploadAvatar(data) {
                return new Promise((resolve, reject) => {
                    axios.post('/api/staffs/upload-avatar', data)
                        .then((response) => {
                            this.currentUser.avatar = response.data.data.avatar;
                            resolve(response);
                        })
                        .catch((err) => {
                            handleError(err);
                            reject(err);
                        });
                });
            },

            fetchUserPermissions() {
                return new Promise((resolve, reject) => {
                    axios.get('/api/staffs/permissions')
                        .then((response) => {
                            this.currentAbilities = response.data.data;
                            resolve(response);
                        })
                        .catch((err) => {
                            handleError(err);
                            reject(err);
                        });
                });
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

export default useUserStore;
