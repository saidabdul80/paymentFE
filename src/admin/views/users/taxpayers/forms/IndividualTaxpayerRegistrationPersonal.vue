<template>
    <v-container>
        <v-row class="tw-py-14">
            <v-col cols="12" md="4" sm="12">
                <SelectField v-model="individualTaxPayerStore.individualTaxPayerData.means_of_verification"
                    :error_messages="globalStore.nameRules?.means_of_verification" label="Mode of Identification"
                    :items="['NIN', 'BVN', 'Drivers Licence']" :isRequired="true" />
            </v-col>

            <v-col cols="12" md="4" sm="12">
                <VerifyInput v-model="individualTaxPayerStore.individualTaxPayerData.verification_number"
                    :error_messages="globalStore.nameRules?.verification_number" outerLabel="ID Number"
                    placeholder="Chosen ID Number" title="Verify" @handleClick="verifyTaxpayer" />
            </v-col>

            <v-col cols="12" md="4" sm="12">
                <FileInput v-model="individualTaxPayerStore.individualTaxPayerData.verification_document"
                    :error_messages="globalStore.nameRules?.verification_document" outerLabel="Verification Document"
                    placeholder="NIN Slip or National ID Card" title="Upload Image"
                    @file-selected="handleFileSelected" />
            </v-col>

            <v-col cols="12" md="4" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.personalFirstName"
                    :error_messages="globalStore.nameRules?.personalFirstName" label="First Name" placeholder=""
                    :isRequired="true" />
            </v-col>

            <v-col cols="12" md="4" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.personalMiddleName"
                    :error_messages="globalStore.nameRules?.personalMiddleName" label="Middle Name" placeholder="" />
            </v-col>

            <v-col cols="12" md="4" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.personalLastName"
                    :error_messages="globalStore.nameRules?.personalLastName" label="Last Name" placeholder="" />
            </v-col>

            <v-col cols="12" md="4" sm="12">
                <SelectField v-model="individualTaxPayerStore.individualTaxPayerData.personalTitle"
                    :error_messages="globalStore.nameRules?.personalTitle" label="Title" :items="titles"
                    :isRequired="true" />
            </v-col>

            <v-col cols="12" md="4" sm="12">
                <SelectField v-model="individualTaxPayerStore.individualTaxPayerData.personalGender"
                    :error_messages="globalStore.nameRules?.personalGender" label="Gender" :items="gender"
                    :isRequired="true" />
            </v-col>

            <v-col cols="12" md="4" sm="12">
                <TextField v-model="individualTaxPayerStore.individualTaxPayerData.personalDateofBirth"
                    :error_messages="globalStore.nameRules?.personalDateofBirth" label="Date of Birth" type="date"
                    placeholder="" />
            </v-col>

            <v-col cols="12" md="4" sm="12">
                <SelectField v-model="individualTaxPayerStore.individualTaxPayerData.personalNationality"
                    :error_messages="globalStore.nameRules?.personalNationality" label="Nationality"
                    :items="nationality" :isRequired="true" />
            </v-col>

            <v-col cols="12" md="4" sm="12">
                <SelectField v-model="individualTaxPayerStore.individualTaxPayerData.personalStateofOrigin"
                    :error_messages="globalStore.nameRules?.personalStateofOrigin" label="State of Origin"
                    :items="states" :isRequired="true" />
            </v-col>

            <v-col cols="12" md="4" sm="12">
                <SelectField v-model="individualTaxPayerStore.individualTaxPayerData.personalLga"
                    :error_messages="globalStore.nameRules?.personalLga" label="L.G.A" :items="lgas"
                    :isRequired="true" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useGlobalsStore } from '@/stores/globals';
import { useIndividualTaxPayerStore } from '@/admin/stores/individualTaxPayer';
import TextField from '@/components/TextField.vue';
import SelectField from '@/components/SelectField.vue';
import FileInput from '@/components/FileInput.vue';
import VerifyInput from '@/components/VerifyInput.vue';

export default {
    data() {
        return {
            individualTaxPayerStore: useIndividualTaxPayerStore(),
            globalStore: useGlobalsStore(),
            gender: ['Male', 'Female'],
            nationality: ['Nigerian', 'Non Nigerian'],
            titles: ['Mr.', 'Ms.', 'Mrs.', 'Miss', 'Master', 'Madam'],
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

    name: "IndividualTaxpayerRegistration",
    components: {
        TextField,
        SelectField,
        FileInput,
        VerifyInput,
    },

    methods: {
        verifyTaxpayer(data) {
            // Handle verify taxpayer event
            alert(`Verification Number: ${data}`);
        },
        handleFileSelected(fileName) {
            this.verificationDocumentFileName = fileName; // Save the file name
            this.individualTaxPayerStore.individualTaxPayerData.verification_document = this.verificationDocumentFileName;
        },

    }
}
</script>

<style>
.text-basil {
    color: #006033 !important;
}
</style>
