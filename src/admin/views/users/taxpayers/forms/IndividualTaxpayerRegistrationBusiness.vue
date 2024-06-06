<template>
    <div>
        <v-row class="tw-p-14">
            <v-col cols="6" md="6" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.businessOccupation"
                    :error_messages="globalStore.nameRules?.businessOccupation" label="Occupation" placeholder=""
                    id="occupation" name="occupation" :isRequired="true" />
            </v-col>

            <v-col cols="6" md="6" sm="12">
                <SelectField v-model="individualTaxPayerStore.individualTaxPayerData.businessEmploymentStatus"
                    :error_messages="globalStore.nameRules?.businessEmploymentStatus" label="Employment Status"
                    name="employmentStatus" id="employmentStatus"
                    :items="['Employee', 'Worker', 'Independent contractor', 'Part time', 'Apprenticeship']"
                    :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.businessEmployerName"
                    :error_messages="globalStore.nameRules?.businessEmployerName" label="Business / Employer Name"
                    placeholder="" id="businessEmployerName" name="businessEmployerName" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.businessOfficeNumber"
                    :error_messages="globalStore.nameRules?.businessOfficeNumber" label="Office Number" placeholder=""
                    id="officeNumber" name="officeNumber" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.businessStreetName"
                    :error_messages="globalStore.nameRules?.businessStreetName" label="Street Name" placeholder=""
                    id="streetName" name="streetName" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.businessAreaLandmark"
                    :error_messages="globalStore.nameRules?.businessAreaLandmark" label="Area / Landmark" placeholder=""
                    id="areaLandmark" name="areaLandmark" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.businessTownDistrict"
                    :error_messages="globalStore.nameRules?.businessTownDistrict" label="Town / District" placeholder=""
                    id="townDistrict" name="townDistrict" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <SelectField v-model="individualTaxPayerStore.individualTaxPayerData.businessState"
                    :error_messages="globalStore.nameRules?.businessState" label="State" name="state" id="state" :items="states = [
                        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
                        'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
                        'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
                        'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
                        'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara']" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <SelectField v-model="individualTaxPayerStore.individualTaxPayerData.businessLga"
                    :error_messages="globalStore.nameRules?.businessLga" label="L.G.A" name="lga" id="lga"
                    :items="['Gombe', 'Akko']" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <SelectField v-model="individualTaxPayerStore.individualTaxPayerData.businessCountry"
                    :error_messages="globalStore.nameRules?.businessCountry" label="Country" name="country" id="country"
                    :items="['Nigeria']" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.businessZipCode"
                    :error_messages="globalStore.nameRules?.businessZipCode" label="ZIP Code" placeholder=""
                    id="zipCode" name="zipCode" />
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