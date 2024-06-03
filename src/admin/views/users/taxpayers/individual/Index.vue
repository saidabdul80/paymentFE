<template>
    <div class="tw-px-5">
        <div class="text-caption pa-2  mb-8">
            <h4 :class="`tw-text-[${$constants.primary}] ${$constants.text_size.s5}`" class="font-weight-bold">INDIVIDUAL TAXPAYER REGISTRATION</h4>
            <div :class="`tw-text-[${$constants.dark}] ${$constants.text_size.s2}`" class="">Follow the steps to register a new individual taxpayer.</div>
        </div>
        <Tab :tabs="tabs">
            <template v-slot:Identification>
                <IndividualTaxpayerRegistration @click="" />
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
import IndividualTaxpayerRegistration from '@/admin/views/users/taxpayers/forms/IndividualTaxpayerRegistration.vue'
import IndividualTaxpayerRegistrationPersonal from '@/admin/views/users/taxpayers/forms/IndividualTaxpayerRegistrationPersonal.vue'
import IndividualTaxpayerRegistrationContact from '@/admin/views/users/taxpayers/forms/IndividualTaxpayerRegistrationContact.vue'
import IndividualTaxpayerRegistrationBusiness from '@/admin/views/users/taxpayers/forms/IndividualTaxpayerRegistrationBusiness.vue'

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