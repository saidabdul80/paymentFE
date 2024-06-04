<template>
    <div>
        <v-row class="tw-p-14">
            <v-col cols="6" md="6" sm="12">
                <TextField label="Phone Number" placeholder="" id="phoneNumber" name="phoneNumber" :isRequired="true" />
            </v-col>

            <v-col cols="6" md="6" sm="12">
                <TextField label="Email" placeholder="" id="middleName" name="middleName" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField label="House Number" placeholder="" id="houseNumber" name="houseNumber" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField label="Street Name" placeholder="" id="streetName" name="streetName" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField label="Area / Landmark" placeholder="" id="areaLandmark" name="areaLandmark"
                    :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField label="Town / District" placeholder="" id="townDistrict" name="townDistrict"
                    :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <SelectField label="L.G.A" name="lga" id="lga" :items="['Gombe', 'Akko']" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField label="ZIP Code" placeholder="" id="zipCode" name="zipCode" />
            </v-col>

            <v-container class="tw-mt-20">
                <v-row align="center" justify="center" class="tw-mt-20">
                    <v-col cols="auto">
                        <v-btn type="submit" size="large" class="tw-bg-green-100 tw-px-20">
                            Cancel
                        </v-btn>
                    </v-col>

                    <v-col cols="auto">
                        <v-btn type="submit" size="large" class="tw-bg-green-700 tw-text-white">
                            Proceed to Verification
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-row>
    </div>
</template>

<script>
import TextField from '@/components/TextField.vue';
import SelectField from '@/components/SelectField.vue';

export default {
    data() {
        return {
            tab: 'Identification Details',
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            countries: [
                { text: 'United States', value: 'us' },
                { text: 'Canada', value: 'ca' },
                { text: 'United Kingdom', value: 'uk' },
                { text: 'Australia', value: 'au' },
            ],
        }
    },

    methods: {
        async validate() {
            const { valid } = await this.$refs.form.validate()

            if (valid) alert('Form is valid')
        },
        reset() {
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },
    },
    name: "IndividualTaxpayerRegistrationContact",
    components: {
        TextField,
        SelectField,
    }
}
</script>

<style>
.text-basil {
    color: #006033 !important;
}
</style>