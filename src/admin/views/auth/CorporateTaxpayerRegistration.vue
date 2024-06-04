<template>
    <div class="tw-px-5 md:tw-px-20">
        <div class="text-caption pa-2 mb-8 tw-mt-5">
            <h4 class="text-h5 tw-text-green-700 font-weight-bold">CORPORATE TAXPAYER REGISTRATION</h4>
            <div class="text-grey-darken-1 text-subtitle-1">
                Follow the steps to complete your GIRS taxpayer registration.
            </div>
        </div>

        <v-row class="tabs-container">
            <v-col cols="12" md="12" sm="12">
                <CorporateTaxpayerRegistration />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import CorporateTaxpayerRegistration from './forms/CorporateTaxpayerRegistration.vue'

import { useGlobalsStore } from '@/stores/globals';
import Tab from '@/components/tab.vue';

export default {
    data() {
        return {
            globals: useGlobalsStore()
        }
    },
    created() {
        useGlobalsStore().updateSubPageName("ADD CORPORATE TAXPAYER")
    },
    components: {
        Tab,
        CorporateTaxpayerRegistration,
    },
}
</script>

<style scoped>
@media (min-width: 768px) {
    .tabs-container {
        flex-direction: row;
    }
}

@media (max-width: 767px) {
    .tabs-container {
        flex-direction: column;
    }

    .tw-px-5 {
        padding-left: 0.625rem;
        /* equivalent to 5px */
        padding-right: 0.625rem;
        /* equivalent to 5px */
    }

    .md\:tw-px-20 {
        padding-left: 1.25rem;
        /* equivalent to 20px */
        padding-right: 1.25rem;
        /* equivalent to 20px */
    }
}
</style>
