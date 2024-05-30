<template>
    <div class="tw-px-5">
        <Tab :tabs="tabs">
            <template v-slot:Identification>
                <IndividualTaxpayerRegistration />
            </template>
            <template v-slot:Personal>
                Personal
            </template>
            <template v-slot:Contact>
                Personal
            </template>
        </Tab>
    </div>
</template>

<script>
import IndividualTaxpayerRegistration from '@/admin/components/IndividualTaxpayerRegistration.vue'
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
        useGlobalsStore().updateSubPageName("ADD INDIVIDUAL TAXPAYER3")
    },
    components: {
        Tab,
        IndividualTaxpayerRegistration,
    },
}
</script>