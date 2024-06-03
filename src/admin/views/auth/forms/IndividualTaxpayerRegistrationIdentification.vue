<template>
    <div>
        <h4 class="text-center mt-5">ENTER YOUR NATIONAL IDENTIFICATION NUMBER FOR VERIFICATION.</h4>
        <h4 class="text-center text-dark">
            <v-icon icon="mdi-reload"></v-icon>
            VERIFYING NATIONAL IDENTIFICATION NUMBER
        </h4>
        <h4 class="text-center text-green">
            <v-icon icon="mdi-check-decagram-outline"></v-icon>
            NATIONAL IDENTIFICATION NUMBER VERIFICATION SUCCESSFUL
        </h4>
        <h4 class="text-center text-red">
            <v-icon icon="mdi-close-box-outline"></v-icon>
            NATIONAL IDENTIFICATION NUMBER VERIFICATION FAILED. PLEASE UPLOAD ID DOCUMENT TO PROCEED.
        </h4>
        <v-row class="tw-p-14">
            <v-col cols="4" md="4" sm="12">
                <TextField :rules="idNumberRules" label="ID Number" placeholder="Enter NIN Number" id="nin" name="nin"
                    :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField label="NIN" placeholder="G-TIN or Phone Number" id="bvn" name="bvn" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField label="JTB" placeholder="Joint Tax Board ID Number" id="jtbNumber" name="jtbNumber"
                    :isRequired="true" />
            </v-col>

            <v-col cols="12" md="12" sm="12">
                <TextField label="National ID Document" placeholder="NIN slap or National ID Card" type="file"
                    id="jtbNumber" name="jtbNumber" :isRequired="true" />
            </v-col>

            <v-container class="tw-mt-20">
                <v-row align="center" justify="center" class="tw-mt-20">
                    <v-col cols="auto">
                        <v-btn type="submit" size="large" class="tw-bg-green-100 tw-px-20 text-capitalize">
                            Cancel
                        </v-btn>
                    </v-col>

                    <v-col cols="auto">
                        <v-dialog max-width="500">
                            <template v-slot:activator="{ props: activatorProps }">
                                <v-btn v-bind="activatorProps" type="submit" size="large"
                                    class="tw-bg-green-700 tw-text-white text-capitalize">
                                    Proceed to Verification
                                </v-btn>
                            </template>

                            <template v-slot:default="{ isActive }">
                                <v-card>
                                    <v-card-text class=" text-center tw-p-5 mb-10">
                                        <img class="mx-auto mt-5 mb-5" src="../../../../assets/good-sgin.png"
                                            width="150" alt="" />
                                        <h3 class="text-h5">
                                            ID Verification Successful
                                        </h3>
                                        Identification Number matches <b>Amina Ahmad Musa</b>. Please proceed to
                                        finish
                                        registering this taxpayer.
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
    name: "IndividualTaxpayerRegistrationIdentification",
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