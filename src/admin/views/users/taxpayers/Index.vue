<template>
    <div class="tw-px-5">
        <div class="text-caption pa-2  mb-8">
            <h4 :class="`tw-text-[${$constants.primary}] ${$constants.text_size.s5}`" class="font-weight-bold">
                INDIVIDUAL TAXPAYER REGISTRATIONergrgrg</h4>
            <div :class="`tw-text-[${$constants.dark}] ${$constants.text_size.s2}`" class="">Follow the steps to
                register a new individual taxpayer.</div>
        </div>
        <!-- <v-form ref="form"> -->
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
                <v-row align="center" justify="center" class="tw-mb-5">
                    <v-col cols="auto">
                        <v-btn type="submit" size="large" class="tw-bg-green-100 tw-px-20">
                            Cancel
                        </v-btn>
                    </v-col>

                    <v-row class="tw-my-10" justify="center">
                        <Button
                            title="Go Back"
                            variant="outlined"
                            :class="`tw-text-[${$constants.primary}]`"
                            @click="goBack"
                        ></Button>
                        <Button
                            title="Proceed to Enrolment"
                            :class="`tw-text-[${$constants.light}] tw-bg-[${$constants.primary}]`"
                            @click="proceedToEnrolment"
                        ></Button>
                    </v-row>

                    <v-col cols="auto">
                        <v-dialog max-width="500">
                            <template v-slot:activator="{ props: activatorProps }">
                                <v-btn v-bind="activatorProps" type="submit" size="large"
                                    class="tw-bg-green-700 tw-text-white">
                                    Proceed to Verification
                                </v-btn>
                            </template>

                            <template v-slot:default="{ isActive }">
                                <v-card>
                                    <v-card-text class=" text-center tw-p-5 mb-10">
                                        <img class="mx-auto mt-5 mb-5" src="../../assets/user-plus.png" width="150"
                                            alt="" />
                                        <h3 class="text-h5">
                                            Enrolment Complete
                                        </h3>
                                        <b>Mrs. Amina Ahmad Musa</b> has now been added as an individual
                                        taxpayer with <b>G-TIN34322211</b>. A confirmation SMS would be sent
                                        to her<br /><br />
                                        <v-btn @click.prevent="createIndividualTaxPayer()" type="button" size="large"
                                            class="tw-bg-green-700 tw-text-white">
                                            <span v-if="isLoading" class="loader tw-h-5 tw-w-5"></span>
                                            Submit
                                        </v-btn>
                                    </v-card-text>
                                </v-card>
                            </template>
                        </v-dialog>
                    </v-col>
                </v-row>
            </template>
        </Tab>
        <!-- </v-form> -->
    </div>
</template>

<script>
import IndividualTaxpayerRegistration from '@/admin/views/users/taxpayers/forms/IndividualTaxpayerRegistration.vue'
import IndividualTaxpayerRegistrationPersonal from '@/admin/views/users/taxpayers/forms/IndividualTaxpayerRegistrationPersonal.vue'
import IndividualTaxpayerRegistrationContact from '@/admin/views/users/taxpayers/forms/IndividualTaxpayerRegistrationContact.vue'
import IndividualTaxpayerRegistrationBusiness from '@/admin/views/users/taxpayers/forms/IndividualTaxpayerRegistrationBusiness.vue'

import { useIndividualTaxPayerStore } from '@/admin/stores/individualTaxPayer';

import { useGlobalsStore } from '@/stores/globals';
import { useNotificationStore } from "@/stores/notification";

import Tab from '@/components/tab.vue';
import Button from '@/components/button/Button.vue';

export default {
    data() {
        return {
            isLoading: false,
            tabs: [
                { name: 'Identification Details', key: 'Identification' },
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
        async createIndividualTaxPayer() {
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
        IndividualTaxpayerRegistration,
        IndividualTaxpayerRegistrationPersonal,
        IndividualTaxpayerRegistrationContact,
        IndividualTaxpayerRegistrationBusiness
    },

}
</script>