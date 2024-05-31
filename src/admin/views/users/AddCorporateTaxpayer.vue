<template>
    <div class="tw-px-5">
        <div class="text-caption pa-2 bg-grey-lighten-4 mb-8">
            <h4 class="text-h4 tw-text-green-700 font-weight-bold">CORPORATE TAXPAYER REGISTRATION</h4>
            <div class="text-grey-darken-1 text-h6">Follow the steps to register a new corporate taxpayer.</div>
        </div>

        <v-card>
            <CorporateTaxpayerRegistration />
        </v-card>
    </div>
</template>

<script>
import CorporateTaxpayerRegistration from '@/admin/components/CorporateTaxpayerRegistration.vue'
import { useGlobalsStore } from '@/stores/globals';
import Tab from '@/components/tab.vue';

export default {
    data() {
        return {
            globals: useGlobalsStore()
        }
    },
    components: {
        CorporateTaxpayerRegistration
    },
}
</script>