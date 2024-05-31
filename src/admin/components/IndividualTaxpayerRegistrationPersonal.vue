<template>
    <div>
        <v-row class="tw-p-14">
            <v-col cols="4" md="4" sm="12">
                <TextField label="First Name" placeholder="" id="firstName" name="firstName" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField label="Middle Name" placeholder="" id="middleName" name="middleName" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField label="Last Name" placeholder="" id="lastName" name="lastName" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <SelectField label="Title" name="title" id="title"
                    :items="['Mr.', 'Ms.', 'Mrs.', 'Miss', 'Master', 'Madam']" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <SelectField label="Gender" name="gender" id="gender" :items="['Male', 'Female']" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <TextField label="Date of Birth" type="date" placeholder="" id="dateofBirth" name="dateofBirth"
                    :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <SelectField label="Nationality" name="nationality" id="nationality" :items="['Nigeria']"
                    :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <SelectField label="State of Origin" name="stateofOrigin" id="stateofOrigin" :items="states = [
                    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
                    'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
                    'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
                    'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
                    'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara']" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <SelectField label="L.G.A" name="lga" id="lga" :items="['Gombe', 'Akko']" :isRequired="true" />
            </v-col>

            <v-container class="tw-mt-20">
                <v-row align="center" justify="center" class="tw-mt-20">
                    <v-col cols="auto">
                        <v-btn type="submit" size="large" class="tw-bg-green-100">
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
    name: "IndividualTaxpayerRegistration",
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