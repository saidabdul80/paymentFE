<template>
    <div>
        <v-row class="tw-p-14">
            <v-col cols="6" md="6" sm="12">
                <TextField label="Occupation" placeholder="" id="occupation" name="occupation" :isRequired="true" />
            </v-col>

            <v-col cols="6" md="6" sm="12">
                <SelectField label="Employment Status" name="lga" id="lga"
                    :items="['Employee', 'Worker', 'Independent contractor', 'Part time', 'Apprenticeship']"
                    :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField label="Business / Ennployer Nanne" placeholder="" id="businessEnnployerName"
                    name="businessEnnployerName" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField label="Office Nurnbet" placeholder="" id="officeNurnbet" name="officeNurnbet"
                    :isRequired="true" />
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
                <SelectField label="State" name="state" id="state" :items="states = [
                    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
                    'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
                    'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
                    'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
                    'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara']" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <SelectField label="L.G.A" name="lga" id="lga" :items="['Gombe', 'Akko']" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <SelectField label="Country" name="country" id="country" :items="['Nigeria']" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField label="ZIP Code" placeholder="" id="zipCode" name="zipCode" />
            </v-col>

            <v-container class="tw-mt-5">
                <v-row align="center" justify="center" class="tw-mt-5">
                    <v-col cols="auto">
                        <v-btn type="submit" size="large" class="tw-bg-green-100 tw-px-20">
                            Cancel
                        </v-btn>
                    </v-col>

                    <v-col cols="auto">
                        <!-- <v-btn type="submit" size="large" class="tw-bg-green-700 tw-text-white">
                            Proceed to Verification
                        </v-btn> -->
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
                                        <img class="mx-auto mt-5 mb-5" src="../../../../assets/user-plus.png"
                                            width="150" alt="" />
                                        <h3 class="text-h5">
                                            Taxpayer Declaration
                                        </h3>
                                        <h3>
                                            <v-checkbox
                                                label="declare that the information provided is correct and complete."></v-checkbox>

                                        </h3>
                                        <br /><br />
                                        <v-btn type="submit" size="large" variant="outlined"
                                            class="tw-border-green-700 tw-text-green-700  text-capitalize mr-3 tw-px-10">
                                            Go Back
                                        </v-btn>
                                        <v-btn type="submit" size="large" variant="outlined"
                                            class="tw-bg-green-700 tw-text-white  text-capitalize  tw-px-10">
                                            Finish
                                        </v-btn>
                                    </v-card-text>
                                </v-card>
                            </template>
                        </v-dialog>
                    </v-col>
                </v-row>
            </v-container>
        </v-row>
    </div>
</template>

<script>
// import { useUserStore } from '@/admin/stores/user';
import TextField from '@/components/TextField.vue';
import SelectField from '@/components/SelectField.vue';

export default {
    data() {
        return {
            // isLoading: false,
            // notificationStore: useNotificationStore(),
            // userStore: useUserStore(),

            tab: 'Identification Details',
            items: [
                'Identification Details', 'Personal Details', 'Contact Information', 'Business / Employer Details',
            ],
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
    // data: () => ({ review: '30%' }),
}
</script>

<style>
.text-basil {
    color: #006033 !important;
}
</style>