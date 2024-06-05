import axios from 'axios';
import { defineStore } from 'pinia';
import { useNotificationStore } from '@/stores/notification';

import { useClient } from '@/stores/client';
const useVendorStore = (useWindow = false) => {
    const defineStoreFunc = useWindow ? window.pinia.defineStore : defineStore;
    return defineStoreFunc({
        id: 'vendor',

        state: () => ({
            currentvendor: null,
            currentAbilities: [],

            vendorForm: {},
        }),

        getters: {
            currentAbilitiesCount: (state) => state.currentAbilities.length,
        },

        actions: {
            async updateCurrentvendor(data) {
                const response = await useClient().http({ method: 'put', path: '/vendors', data })
                this.currentvendor = response.data;
                Object.assign(this.vendorForm, response.data.data);
                const notificationStore = useNotificationStore();
                notificationStore.showNotification({
                    type: 'success',
                    message: '',
                });

            },

            async fetchCurrentvendor(params) {
                const response = await useClient().http({ method: 'get', path: '/vendors/me', data })
                this.currentvendor = response.data;
                this.vendorForm = response.data;
                const notificationStore = useNotificationStore();
                notificationStore.showNotification({
                    type: 'success',
                    message: '',
                });
            },

            async uploadAvatar(data) {
                const response = await useClient().http({ method: 'get', path: '/staffs/upload-avatar', data })
                this.currentvendor.avatar = response.data.avatar;
                const notificationStore = useNotificationStore();
                notificationStore.showNotification({
                    type: 'success',
                    message: '',
                });
            },

            async fetchvendorPermissions() {
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

export default usevendorStore;
