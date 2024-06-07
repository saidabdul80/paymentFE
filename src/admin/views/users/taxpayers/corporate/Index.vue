<template>
    <!-- admin register page -->
    <div class="tw-px-5">
        <div class="text-caption pa-2 mb-8 tw-mt-5">
            <h4 class="text-h5 tw-text-green-700 font-weight-bold">CORPORATE TAXPAYER REGISTRATION</h4>
            <div class="text-grey-darken-1 text-subtitle-1">
                Follow the steps to complete your GIRS taxpayer registration
            </div>
        </div>

        <CorporateTaxpayerRegistration />

    </div>
</template>

<script>
import CorporateTaxpayerRegistration from '../forms/CorporateTaxpayerRegistration.vue'
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