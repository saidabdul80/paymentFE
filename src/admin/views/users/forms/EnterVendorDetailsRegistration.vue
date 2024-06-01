<template>
    <div class="">
        <v-row class="tw-p-14">
            <v-col cols="4" md="4" sm="12">
                <TextField label="RC Number" placeholder="342343***" id="rcNumber" name="rcNumber" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField label="Business Name" placeholder="Hunkuyi Nigeria Limited" id="businessName"
                    name="businessName" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField label="JTB IN" placeholder="Joint Tax Board ID number" id="" name="" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField label="Address Line 1" placeholder="Suite Nov, Street Name" id="" name=""
                    :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField label="Address Line 2" placeholder="Suite Nov, Street Name" id="" name=""
                    :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <SelectField label="L.G.A" name="" id="" :items="[
                    'Akko', 'Gombe', 'Kwami', 'Dukku']" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField label="Contact First Name" placeholder="Musa" id="" name="" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField label="Contact Middle Name" placeholder="" id="" name="" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField label="Contact Last Name" placeholder="Sani" id="" name="" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <SelectField label="Bank Name" name="" id="" :items="[
                    'FCMB', 'Stanbic IBCT', 'GT Bank', 'Access Bank']" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField label="Account Name" placeholder="Company bank account name" id="" name=""
                    :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField label="Account Number" type="number" placeholder="10-digit account number" id="" name=""
                    :isRequired="true" />
            </v-col>

            <v-container class="tw-mt-5">
                <v-row align="center" justify="center" class="tw-mt-5">

                    <v-col cols="auto">
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
                                        <img class="mx-auto mt-5 mb-5" src="../../../../assets/loader.png" width="150"
                                            alt="" />
                                        <h3 class="text-h5">
                                            Verifying Vendor Details
                                        </h3>
                                        Please hold on as we verify your BVN and NIN.

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
    name: "EnterVendorDetailsRegistration",
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