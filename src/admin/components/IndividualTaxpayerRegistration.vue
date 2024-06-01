<template>
    <div>
        <v-card-title class="text-start justify-center py-2 tw-mx-5">
            <h6 class="text-green-darken-3  font-weight-bold">
                INDIVIDUAL TAXPAYER REGISTRATION
            </h6>
            <div class="tw-text-h6 text-medium-emphasis font-weight-regular">
                Follow the steps to complete your GIRS taxpayer registration.
            </div>
        </v-card-title>

        <v-tabs v-model="tab" bg-color="transparent" color="basil" class="tw-mx-8 tw-mt-5">
            <v-tab value="one" class="">Identification Details</v-tab>
            <v-tab value="two">Personal Details</v-tab>
            <v-tab value="three">Contact Information</v-tab>
            <v-tab value="four">Business / Employer Details</v-tab>
        </v-tabs>

        <v-card color="basil" class="tw-p-10 tw-mx-8 tw-mt-5">
            <v-card-text class="">
                <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="one">
                        <v-row>
                            <v-col cols="4" md="4" sm="12">
                                <TextField placeholder="" label="First Name" color="green" :isRequired='true' />
                            </v-col>

                            <v-col cols="4" md="4" sm="12">
                                <TextField placeholder="" label="Middle Name" color="green" />
                            </v-col>

                            <v-col cols="4" md="4" sm="12">
                                <TextField placeholder="" label="Larst Name" color="green" :isRequired='true' />
                            </v-col>

                            <v-col cols="4" md="4" sm="12">
                                <TextField placeholder="" label="BVN" color="green" :isRequired='true' />
                            </v-col>

                            <v-col cols="4" md="4" sm="12">
                                <TextField placeholder="" label="NIN" color="green" :isRequired='true' />
                            </v-col>

                            <v-col cols="4" md="4" sm="12">
                                <TextField placeholder="" label="JBT TIN" color="green" />
                            </v-col>

                            <v-container class="tw-mt-20">
                                <v-row align="center" justify="center" class="tw-mt-20">
                                    <v-col cols="auto">
                                        <!-- class="tw-flex tw-w-full tw-justify-center tw-rounded-md tw-bg-green-600 tw-px-3 tw-py-1.5 tw-text-sm tw-font-semibold tw-leading-6 tw-text-white tw-shadow-sm hover:tw-bg-green-500 focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-green-900 tw-py-1"> -->
                                        <!-- class="tw-border-solid tw-border-2 tw-border-sky-500" -->
                                        <button type="submit"
                                            class="tw-flex tw-w-full tw-justify-center tw-rounded-md tw-bg-green-100 tw-px-3 tw-py-1.5 tw-text-sm tw-font-semibold tw-leading-6 tw-text-green-700 tw-shadow-sm hover:tw-bg-green-500 focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-green-700 tw-py-1 tw-border-solid tw-border-2 tw-border-green-700 tw-px-10">
                                            Cancel
                                        </button>
                                    </v-col>

                                    <v-col cols="auto">
                                        <button type="submit"
                                            class="tw-flex tw-w-full tw-justify-center tw-rounded-md tw-bg-green-700 tw-px-3 tw-py-1.5 tw-text-sm tw-font-semibold tw-leading-6 tw-text-white tw-shadow-sm hover:tw-bg-green-500 focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-green-700 tw-py-1 tw-px-10">
                                            Proceed to Verification
                                        </button>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-row>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="two">
                        Two
                    </v-tabs-window-item>

                    <v-tabs-window-item value="three">
                        Three
                    </v-tabs-window-item>

                    <v-tabs-window-item value="four">
                        Four
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card-text>
        </v-card>

        <!-- <v-tabs v-model="tab" bg-color="transparent" color="basil" grow>
            <v-tab v-for="item in items" :key="item" :text="item" :value="item"></v-tab>
        </v-tabs>
        <v-card color="basil" class="tw-mt-5 tw-p-10">
            <v-tabs-window v-model="tab">
                <v-tabs-window-item v-for="item in items" :key="item" :value="item">
                    <v-card color="basil" flat>
                        <v-card-text>
                            <v-row>
                                <v-col cols="4" md="4" sm="12">
                                    <TextField placeholder="" label="First Name" color="green" :isRequired='true' />
                                </v-col>

                                <v-col cols="4" md="4" sm="12">
                                    <TextField placeholder="" label="Middle Name" color="green" />
                                </v-col>

                                <v-col cols="4" md="4" sm="12">
                                    <TextField placeholder="" label="Larst Name" color="green" :isRequired='true' />
                                </v-col>

                                <v-col cols="4" md="4" sm="12">
                                    <TextField placeholder="" label="BVN" color="green" :isRequired='true' />
                                </v-col>

                                <v-col cols="4" md="4" sm="12">
                                    <TextField placeholder="" label="NIN" color="green" :isRequired='true' />
                                </v-col>

                                <v-col cols="4" md="4" sm="12">
                                    <TextField placeholder="" label="JBT TIN" color="green" />
                                </v-col>
                            </v-row>

                            <v-btn class="mt-4" color="success" block @click="validate">
                                Validate
                            </v-btn>
                        </v-card-text>
                    </v-card>
                </v-tabs-window-item>
            </v-tabs-window>
        </v-card> -->
    </div>
</template>

<script>
import TextField from '@/components/TextField.vue';

export default {
    data() {
        return {
            tab: 'Identification Details',
            items: [
                'Identification Details', 'Personal Details', 'Contact Information', 'Business / Employer Details',
            ],
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
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
    name: "IndividualTaxpayerRegistration",
    components: {
        TextField
    }
    // data: () => ({ review: '30%' }),
}
</script>

<style>
.text-basil {
    color: #006033 !important;
}
</style>