<template>
    <div class="tw-px-5 md:tw-px-20">
        <div class="text-caption pa-2 mb-8 tw-mt-5">
            <h4 class="text-h5 tw-text-green-700 font-weight-bold">INDIVIDUAL TAXPAYER REGISTRATION</h4>
            <div class="text-grey-darken-1 text-subtitle-1">
                Follow the steps to register a new individual taxpayer.
            </div>
        </div>

        <v-row class="tabs-container">
            <v-col cols="12" md="12" sm="12">
                <Tab :tabs="tabs">
                    <template v-slot:Identification>
                        <IndividualTaxpayerRegistrationIdentification />
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
            </v-col>
        </v-row>
    </div>
</template>

<script>
import IndividualTaxpayerRegistrationIdentification from './forms/IndividualTaxpayerRegistrationIdentification.vue'
import IndividualTaxpayerRegistrationPersonal from './forms/IndividualTaxpayerRegistrationPersonal.vue'
import IndividualTaxpayerRegistrationContact from './forms/IndividualTaxpayerRegistrationContact.vue'
import IndividualTaxpayerRegistrationBusiness from './forms/IndividualTaxpayerRegistrationBusiness.vue'

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
        IndividualTaxpayerRegistrationIdentification,
        IndividualTaxpayerRegistrationPersonal,
        IndividualTaxpayerRegistrationContact,
        IndividualTaxpayerRegistrationBusiness
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
