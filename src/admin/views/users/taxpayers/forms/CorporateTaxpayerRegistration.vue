<template>
    <!-- Corporate register Component -->
    <div class="tw-min-h-[240px] border tw-rounded-lg"
        :class="`tw-text-[${$constants.dark}] tw-bg-[${$constants.light}]`">
        <h4 class="text-center mt-10">ENTER YOUR RC NUMBER FOR VERIFICATION</h4>
        <h4 class="text-center text-dark">
            <v-icon icon="mdi-reload"></v-icon>
            VERIFYING RC NUMBER
        </h4>
        <h4 class="text-center text-green">
            <v-icon icon="mdi-check-decagram-outline"></v-icon>
            RC NUMBER VERIFICATION SUCCESSFUL
        </h4>
        <h4 class="text-center text-red">
            <v-icon icon="mdi-close-box-outline"></v-icon>
            RC NUMBER VERIFICATION FAILED.
        </h4>
        <div class="tw-px-20">
            <v-row class="tw-p-14">
                <v-col cols="4" md="4" sm="12">
                    <TextField v-model="corporateTaxPayerStore.corporateTaxPayerData.rcNumber"
                        :error_messages="globalStore.nameRules?.rcNumber" label="RC Number" placeholder="Eg. RC123456"
                        :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField v-model="corporateTaxPayerStore.corporateTaxPayerData.businessName"
                        :error_messages="globalStore.nameRules?.businessName" label="Business Name"
                        placeholder="Business legal name" :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <SelectField v-model="corporateTaxPayerStore.corporateTaxPayerData.sector"
                        :error_messages="globalStore.nameRules?.sector" label="Sector" :items="sector"
                        :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField v-model="corporateTaxPayerStore.corporateTaxPayerData.companyPhoneNumber"
                        :error_messages="globalStore.nameRules?.companyPhoneNumber" label="Company Phone Number"
                        placeholder="11-digit business phone number" :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField v-model="corporateTaxPayerStore.corporateTaxPayerData.companyEmail"
                        :error_messages="globalStore.nameRules?.companyEmail" label="Company Email"
                        placeholder="name@example.com" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField v-model="corporateTaxPayerStore.corporateTaxPayerData.numberOfstaff"
                        :error_messages="globalStore.nameRules?.numberOfstaff" label="Number of staff" placeholder="1"
                        type="number" :isRequired="true" />
                </v-col>

                <v-col cols="4" md="6" sm="12">
                    <TextField v-model="corporateTaxPayerStore.corporateTaxPayerData.address_line_one"
                        :error_messages="globalStore.nameRules?.address_line_one" label="Address Line 1"
                        placeholder="House number, street name" />
                </v-col>

                <v-col cols="4" md="6" sm="12">
                    <TextField v-model="corporateTaxPayerStore.corporateTaxPayerData.address_line_two"
                        :error_messages="globalStore.nameRules?.address_line_two" label="Address Line 2"
                        placeholder="Area / Landmark" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField v-model="corporateTaxPayerStore.corporateTaxPayerData.townDistrict"
                        :error_messages="globalStore.nameRules?.townDistrict" label="Town / District"
                        placeholder="Town of business" :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <SelectField v-model="corporateTaxPayerStore.corporateTaxPayerData.lga"
                        :error_messages="globalStore.nameRules?.lga" label="L.G.A" id="lga" :items="lga"
                        :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField v-model="corporateTaxPayerStore.corporateTaxPayerData.zipCode"
                        :error_messages="globalStore.nameRules?.zipCode" label="ZIP Code"
                        placeholder="Zip code of business location" />
                </v-col>

                <v-col md="12" sm="12">
                    <FileInput v-model="corporateTaxPayerStore.corporateTaxPayerData.cac_certificate"
                        :error_messages="globalStore.nameRules?.cac_certificate" outerLabel="CAC Certificate"
                        placeholder="Business CAC certificate" title="Upload Image"
                        @file-selected="handleFileSelected" />
                </v-col>

                <v-row justify="center" class="tw-my-6">
                    <Button title="Cancel" variant="outlined" :class="`tw-text-[${$constants.primary}]`"
                        @click="goBack" />

                    <Button title="Finish" :class="`tw-text-[${$constants.light}] tw-bg-[${$constants.primary}]`"
                        @click.prevent="saveData" />
                </v-row>
            </v-row>
        </div>
    </div>
    <v-spacer class="tw-my-10">&nbsp;</v-spacer>
</template>

<script>

import { useGlobalsStore } from '@/stores/globals';
import { useCorporateTaxPayerStore } from '@/admin/stores/corporateTaxPayerStore';
import { useNotificationStore } from "@/stores/notification";

import TextField from '@/components/TextField.vue';
import SelectField from '@/components/SelectField.vue';
import FileInput from '@/components/FileInput.vue';
import Button from '@/components/button/Button.vue';

export default {
    data() {
        return {
            isLoading: false,
            corporateTaxPayerStore: useCorporateTaxPayerStore(),
            globalStore: useGlobalsStore(),
            tab: 'Identification Details',
            sector: [
                'Agriculture and Agribusiness', 'Mining and Quarrying', 'Construction', 'Manufacturing', 'Energy and Utilities'
                , 'Financial Services', 'Healthcare', 'Information and Communication Technology (ICT)'
                , 'Tourism and Hospitality', 'Transportation and Logistics', 'Real Estate', 'Education'
                , 'Non-profit and Social Services', 'Government and Public Administration'
                , 'Media and Entertainment', 'Retail and Wholesale Trade', 'Food and Beverage'
                , 'Sports and Recreation', 'Arts and Culture', 'Environmental Services'],
            lga: ['Gombe', 'Akko'],
        }
    },
    name: "CorporateTaxpayerRegistration",
    components: {
        TextField,
        SelectField,
        FileInput,
        Button,
    },
    methods: {
        handleFileSelected(fileName) {
            this.verificationDocumentFileName = fileName; // Save the file name
        },
        async saveData() {
            this.isLoading = true;
            this.corporateTaxPayerStore.corporateTaxPayerData.cac_certificate = this.verificationDocumentFileName;
            await this.corporateTaxPayerStore.createCorporateTaxPayer(this.corporateTaxPayerStore.corporateTaxPayerData)
            // const notificationStore = useNotificationStore();
            // notificationStore.showNotification({
            //     type: 'success',
            //     message: 'Registration Successfully.',
            // });
            //     this.$router.push('/admin/dashboard');
            // this.$refs.form.validate(true);
            // this.isLoading = false;
        },
        goBack() {
            this.$router.go(-1);
        },
    },
}
</script>

<style>
.text-basil {
    color: #006033 !important;
}
</style>
