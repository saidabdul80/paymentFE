<template>
    <v-card>
        <h4 class="text-center mt-10">ENTER YOUR RC NUMBER FOR VERIFICATION.</h4>
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
                    <TextField label="RC Number" placeholder="" id="rcNumber" name="rcNumber" :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField label="Business Name" placeholder="" id="businessName" name="businessName"
                        :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <SelectField label="Sector" name="sector" id="sector" :items="[
                        'Agriculture and Agribusiness', 'Mining and Quarrying', 'Construction', 'Manufacturing', 'Energy and Utilities'
                        , 'Financial Services', 'Healthcare', 'Information and Communication Technology (ICT)'
                        , 'Tourism and Hospitality', 'Transportation and Logistics', 'Real Estate', 'Education'
                        , 'Non-profit and Social Services', 'Government and Public Administration'
                        , 'Media and Entertainment', 'Retail and Wholesale Trade', 'Food and Beverage'
                        , 'Sports and Recreation', 'Arts and Culture', 'Environmental Services']" :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField label="Company Phone Number" placeholder="" id="companyPhoneNumber"
                        name="companyPhoneNumber" :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField label="Company Email" placeholder="" id="companyEmail" name="companyEmail" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField label="Number of staff" placeholder="" type="number" id="numberOfstaff"
                        name="numberOfstaff" :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField label="Office Number" placeholder="No. 124" id="officeNumber" name="officeNumber" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField label="Street Name" placeholder="Yaman Street ..." id="officeNumber"
                        name="officeNumber" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField label="Area / Landmark" placeholder="Name of estate or community or description"
                        id="areaLandmark" name="areaLandmark" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField label="Town / District" placeholder="Garin Nupawa" id="townDistrict" name="townDistrict"
                        :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <SelectField label="L.G.A" name="lga" id="lga" :items="['Gombe', 'Akko']" :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField label="ZIP Code" placeholder="102554" id="zipCode" name="zipCode" />
                </v-col>

                <v-col cols="12" md="12" sm="12">
                    <TextField label="CAC Certificate" type="file" placeholder="" id="" name="" />
                </v-col>

                <v-container class="tw-mt-2">
                    <v-row align="center" justify="center" class="tw-mt-5">
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
    </v-card>
</template>

<script>
import TextField from '@/components/TextField.vue';
import SelectField from '@/components/SelectField.vue';

export default {
    data() {
        return {
            // isLoading: false,
            // notificationStore: useNotificationStore(),
            // userStore: useUserStore(),

            name: 'CorporateTaxpayerRegistration',
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
    name: "CorporateTaxpayerRegistration",
    components: {
        TextField,
        SelectField,
    }
}
</script>
