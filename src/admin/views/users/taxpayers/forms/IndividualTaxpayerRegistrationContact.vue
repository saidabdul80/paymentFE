<template>
    <v-container>
        <v-row class="tw-py-14">
            <v-col cols="6" md="6" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.contactPhoneNumber"
                    :error_messages="globalStore.nameRules?.contactPhoneNumber" label="Phone Number" placeholder=""
                    id="phoneNumber" name="phoneNumber" :isRequired="true" />
            </v-col>

            <v-col cols="6" md="6" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.contactEmailAddress"
                    :error_messages="globalStore.nameRules?.contactEmailAddress" label="Email Address" placeholder=""
                    id="emailAddress" name="emailAddress" />
            </v-col>

            <v-col cols="4" md="6" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.contact_address_line_one"
                    :error_messages="globalStore.nameRules?.contact_address_line_one" label="Address Line 1"
                    placeholder="House number, street name" id="houseNumber" name="houseNumber" />
            </v-col>

            <v-col cols="4" md="6" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.contact_address_line_two"
                    :error_messages="globalStore.nameRules?.contact_address_line_two" label="Address Line 2"
                    placeholder="Area / landmark" id="streetName" name="streetName" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.contactTownDistrict"
                    :error_messages="globalStore.nameRules?.contactTownDistrict" label="Town / District" placeholder=""
                    id="townDistrict" name="townDistrict" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <SelectField v-model="individualTaxPayerStore.individualTaxPayerData.contactLga"
                    :error_messages="globalStore.nameRules?.contactLga" label="L.G.A" name="lga" id="lga" :items="lgas"
                    :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.contactZipCode"
                    :error_messages="globalStore.nameRules?.contactZipCode" label="ZIP Code" placeholder="" id="zipCode"
                    name="zipCode" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useGlobalsStore } from '@/stores/globals';
import { useIndividualTaxPayerStore } from '@/admin/stores/individualTaxPayer';
import TextField from '@/components/TextField.vue';
import SelectField from '@/components/SelectField.vue';

export default {
    data() {
        return {
            individualTaxPayerStore: useIndividualTaxPayerStore(),
            globalStore: useGlobalsStore(),
            lgas: [
                "Akko",
                "Balanga",
                "Billiri",
                "Dukku",
                "Funakaye",
                "Gombe",
                "Kaltungo",
                "Kwami",
                "Nafada",
                "Shongom",
                "Yamaltu/Deba"
            ],
        }
    },

    name: "IndividualTaxpayerRegistrationContact",
    components: {
        TextField,
        SelectField,
    },
}
</script>

<style>
.text-basil {
    color: #006033 !important;
}
</style>