<template>
    <div class="tw-px-5">
        <div class="text-caption pa-2 bg-grey-lighten-4">
            <v-container>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-card class="pa-5 tw-bg-white" :border="$constants.secondary_dark" variant="outlined">
                            <v-row align="center">
                                <v-col cols="3" class="text-center">
                                    <span class=" tw-bg-green-200 tw-py-7 tw-px-3 rounded-lg">
                                        <v-icon size="48px" :color="$constants.g3">mdi-shield-check</v-icon>
                                    </span>
                                </v-col>
                                <v-col cols="9">
                                    <div class="title font-weight-bold tw-text-xl tw-text-green-700">124</div>
                                    <div class="caption tw-mb-2">Administrators</div>
                                    <span class="mr-2 mt-2 tw-rounded tw-text-xs tw-bg-green-200 px-2 py-1">34
                                        Admins</span>
                                    <span class="mt-2 tw-rounded tw-text-xs tw-bg-green-200 px-2 py-1" outlined>90
                                        Sub-Admins</span>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-card class="pa-5 tw-bg-white" :border="$constants.secondary_dark" variant="outlined">
                            <v-row align="center">
                                <v-col cols="3" class="text-center">
                                    <span class=" tw-bg-red-200 tw-py-7 tw-px-3 rounded-lg">
                                        <v-icon size="48px" color="red">mdi-headset</v-icon>
                                    </span>
                                </v-col>
                                <v-col cols="9">
                                    <div class="title font-weight-bold tw-text-xl tw-text-green-700">5,689</div>
                                    <div class="caption tw-mb-2">Vendors</div>
                                    <span class="mr-2 mt-2 tw-rounded tw-text-xs tw-bg-green-200 px-2 py-1">
                                        4,676 Active
                                    </span>
                                    <span class="mt-2 tw-rounded tw-text-xs tw-bg-green-200 px-2 py-1" outlined>
                                        897 Inactive
                                    </span>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-card class="pa-5 tw-bg-white" :border="$constants.secondary_dark" variant="outlined">
                            <v-row align="center">
                                <v-col cols="3" class="text-center">
                                    <span class=" tw-bg-yellow-100 tw-py-7 tw-px-3 rounded-lg">
                                        <v-icon size="48px" color="yellow">mdi-account-multiple</v-icon>
                                    </span>
                                </v-col>
                                <v-col cols="9">
                                    <div class="title font-weight-bold tw-text-xl tw-text-green-700">
                                        3,456,890
                                    </div>
                                    <div class="caption tw-mb-2">Vendors</div>
                                    <span class="mr-2 mt-2 tw-rounded tw-text-xs tw-bg-green-200 px-2 py-1">
                                        985,345 Corporate
                                    </span>
                                    <span class="mt-2 tw-rounded tw-text-xs tw-bg-green-200 px-2 py-1">
                                        2M+ Individual
                                    </span>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>


        <Tab :tabs="tabs">
            <template v-slot:Admins>
                <Admins />
            </template>
            <template v-slot:Vendors>
                <Vendors />
            </template>
            <template v-slot:Taxpayers>
                <Taxpayers />
            </template>
        </Tab>
    </div>
</template>

<script>
import Admins from '@/admin/views/users/usersList/Admins.vue'
import Vendors from '@/admin/views/users/usersList/Vendors.vue'
import Taxpayers from '@/admin/views/users/usersList/Taxpayers.vue'

import { useGlobalsStore } from '@/stores/globals';
import Tab from '@/components/tab.vue';

export default {
    data() {
        return {
            tabs: [
                { name: 'Admins', key: 'Admins' },
                { name: 'Vendors', key: 'Vendors' },
                { name: 'Taxpayers', key: 'Taxpayers' },
            ],
            globals: useGlobalsStore()
        }
    },
    created() {
        useGlobalsStore().updateSubPageName("LIST")
    },
    components: {
        Tab,
        Admins,
        Vendors,
        Taxpayers
    },
}
</script>