<template>
    <div class="tw-px-5">
        <div class="text-caption pa-2 bg-grey-lighten-4 mb-8">
            <h4 class="text-h4 tw-text-green-700 font-weight-bold">INDIVIDUAL TAXPAYER REGISTRATION</h4>
            <div class="text-grey-darken-1 text-h6">Follow the steps to register a new individual taxpayer.</div>
        </div>
        <Tab :tabs="tabs">
            <template v-slot:Identification>
                <IndividualTaxpayerRegistration />
            </template>
            <template v-slot:Personal>
                <IndividualTaxpayerRegistrationPersonal />
            </template>
            <template v-slot:Contact>
                <IndividualTaxpayerRegistrationContact />
            </template>
            <template v-slot:Business>
                <IndividualTaxpayerRegistrationBusiness />
            </template>
        </Tab>
    </div>
</template>

<script>
import IndividualTaxpayerRegistration from '@/admin/components/IndividualTaxpayerRegistration.vue'
import IndividualTaxpayerRegistrationPersonal from '@/admin/components/IndividualTaxpayerRegistrationPersonal.vue'
import IndividualTaxpayerRegistrationContact from '@/admin/components/IndividualTaxpayerRegistrationContact.vue'
import IndividualTaxpayerRegistrationBusiness from '@/admin/components/IndividualTaxpayerRegistrationBusiness.vue'

import { useGlobalsStore } from '@/stores/globals';
import Tab from '@/components/tab.vue';

export default {
    data() {
        return {
            tabs: [
                { name: 'Identification Details', key: 'Identification' },
                { name: 'Personal Details', key: 'Personal' },
                { name: 'Contact Information', key: 'Contact' },
                { name: 'Business / Employer Details', key: 'Business' },
            ],
            globals: useGlobalsStore()
        }
    },
    created() {
        useGlobalsStore().updateSubPageName("ADD INDIVIDUAL TAXPAYER")
    },
    components: {
        Tab,
        IndividualTaxpayerRegistration,
        IndividualTaxpayerRegistrationPersonal,
        IndividualTaxpayerRegistrationContact,
        IndividualTaxpayerRegistrationBusiness
    },
}
</script>