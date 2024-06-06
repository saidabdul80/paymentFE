<template>
    <div class="tw-px-5">
        <div class="text-caption pa-2  mb-8">
            <h4 :class="`tw-text-[${$constants.primary}] ${$constants.text_size.s5}`" class="font-weight-bold">
                INDIVIDUAL TAXPAYER REGISTRATION</h4>
            <div :class="`tw-text-[${$constants.dark}] ${$constants.text_size.s2}`" class="">Follow the steps to
                register a new individual taxpayer.</div>
        </div>
        <!-- <v-form ref="form"> -->
        <Tab :tabs="tabs" :saveData="saveData" :showBottomNavigations="true">
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

        <!-- </v-form> -->
    </div>
</template>

<script>
import IndividualTaxpayerRegistrationPersonal from '@/admin/views/users/taxpayers/forms/IndividualTaxpayerRegistrationPersonal.vue'
import IndividualTaxpayerRegistrationContact from '@/admin/views/users/taxpayers/forms/IndividualTaxpayerRegistrationContact.vue'
import IndividualTaxpayerRegistrationBusiness from '@/admin/views/users/taxpayers/forms/IndividualTaxpayerRegistrationBusiness.vue'

import { useIndividualTaxPayerStore } from '@/admin/stores/individualTaxPayer';

import { useGlobalsStore } from '@/stores/globals';

import Tab from '@/components/tab.vue';
import Button from '../../../components/button/Button.vue';

export default {
    data() {
        return {
            isLoading: false,
            tabs: [
                { name: 'Personal Details', key: 'Personal' },
                { name: 'Contact Information', key: 'Contact' },
                { name: 'Business / Employer Details', key: 'Business' },
            ],
            globals: useGlobalsStore(),
            individualTaxPayerStore: useIndividualTaxPayerStore(),
        }
    },
    created() {
        useGlobalsStore().updateSubPageName("ADD INDIVIDUAL TAXPAYER")
    },
    methods: {
        async saveData() {
            this.isLoading = true;
            // console.log(this.individualTaxPayerStore)
            await this.individualTaxPayerStore.createIndividualTaxPayer(this.individualTaxPayerStore.individualTaxPayerData)
                // const notificationStore = useNotificationStore();
                // notificationStore.showNotification({
                //     type: 'success',
                //     message: 'Registration Successfully.',
                // });
            //     this.$router.push('/admin/dashboard');
            // this.$refs.form.validate(true);
            // this.isLoading = false;
        }
    },
    components: {
        Tab,
        Button,
        IndividualTaxpayerRegistrationPersonal,
        IndividualTaxpayerRegistrationContact,
        IndividualTaxpayerRegistrationBusiness
    },

}
</script>