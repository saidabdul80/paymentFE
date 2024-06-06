<template>
    <div>
        <v-row class="tw-p-14">
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

            <v-col cols="4" md="4" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.contactHouseNumber"
                    :error_messages="globalStore.nameRules?.contactHouseNumber" label="House Number" placeholder=""
                    id="houseNumber" name="houseNumber" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.contactStreetName"
                    :error_messages="globalStore.nameRules?.contactStreetName" label="Street Name" placeholder=""
                    id="streetName" name="streetName" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.contactAreaLandmark"
                    :error_messages="globalStore.nameRules?.contactAreaLandmark" label="Area / Landmark" placeholder=""
                    id="areaLandmark" name="areaLandmark" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.contactTownDistrict"
                    :error_messages="globalStore.nameRules?.contactTownDistrict" label="Town / District" placeholder=""
                    id="townDistrict" name="townDistrict" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <SelectField v-model="individualTaxPayerStore.individualTaxPayerData.contactLga"
                    :error_messages="globalStore.nameRules?.contactLga" label="L.G.A" name="lga" id="lga"
                    :items="['Gombe', 'Akko']" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.contactZipCode"
                    :error_messages="globalStore.nameRules?.contactZipCode" label="ZIP Code" placeholder="" id="zipCode"
                    name="zipCode" />
            </v-col>
        </v-row>
    </div>
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