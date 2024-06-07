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
                    name="employmentStatus" id="employmentStatus" :items="employmentStatus" :isRequired="true" />
            </v-col>

            <v-col cols="12" md="12" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.businessEmployerName"
                    :error_messages="globalStore.nameRules?.businessEmployerName" label="Business / Employer Name"
                    placeholder="" id="businessEmployerName" name="businessEmployerName" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="6" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.business_address_line_one"
                    :error_messages="globalStore.nameRules?.business_address_line_one" label="Address Line 1"
                    placeholder="House number, street name" id="houseNumber" name="houseNumber" />
            </v-col>

            <v-col cols="4" md="6" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.business_address_line_two"
                    :error_messages="globalStore.nameRules?.business_address_line_two" label="Address Line 2"
                    placeholder="Area / landmark" id="streetName" name="streetName" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <SelectField v-model="individualTaxPayerStore.individualTaxPayerData.businessCountry"
                    :error_messages="globalStore.nameRules?.businessCountry" label="Country" name="country" id="country"
                    :items="['Nigeria']" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <SelectField v-model="individualTaxPayerStore.individualTaxPayerData.businessState"
                    :error_messages="globalStore.nameRules?.businessState" label="State" name="state" id="state"
                    :items="states" :isRequired="true" />
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
            employmentStatus: ['Employee', 'Worker', 'Independent contractor', 'Part time', 'Apprenticeship'],
            states: [
                "Abia",
                "Adamawa",
                "Akwa Ibom",
                "Anambra",
                "Bauchi",
                "Bayelsa",
                "Benue",
                "Borno",
                "Cross River",
                "Delta",
                "Ebonyi",
                "Edo",
                "Ekiti",
                "Enugu",
                "Gombe",
                "Imo",
                "Jigawa",
                "Kaduna",
                "Kano",
                "Katsina",
                "Kebbi",
                "Kogi",
                "Kwara",
                "Lagos",
                "Nasarawa",
                "Niger",
                "Ogun",
                "Ondo",
                "Osun",
                "Oyo",
                "Plateau",
                "Rivers",
                "Sokoto",
                "Taraba",
                "Yobe",
                "Zamfara",
                "Federal Capital Territory (FCT)"
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