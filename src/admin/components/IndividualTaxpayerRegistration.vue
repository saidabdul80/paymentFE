<template>
    <div>
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



            <v-container class="tw-mt-20">
                <v-container class="tw-mt-20">
                    <v-row align="center" justify="center" class="tw-mt-20">
                        <v-col cols="auto">
                            <v-btn type="submit" class="tw-bg-green-100">
                                Cancel
                            </v-btn>
                        </v-col>

                        <v-col cols="auto">
                            <v-btn type="submit" class="tw-bg-green-700 tw-text-white">
                                Proceed to Verification
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
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