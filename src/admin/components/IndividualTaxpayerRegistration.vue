<template>
    <div>

    <v-row>
        <v-col cols="4" md="4" sm="12">
            <v-text-field variant="solo" label="First Name" color="green" :isRequired='true' ></v-text-field>
        </v-col>

        <v-col cols="4" md="4" sm="12">
            <v-text-field variant="solo" label="Middle Name" color="green" ></v-text-field>
        </v-col>

        <v-col cols="4" md="4" sm="12">
            <v-text-field variant="solo" label="Larst Name" color="green" :isRequired='true' ></v-text-field>
        </v-col>

        <v-col cols="4" md="4" sm="12">
            <v-text-field variant="solo" label="BVN" color="green" :isRequired='true' ></v-text-field>
        </v-col>

        <v-col cols="4" md="4" sm="12">
            <v-text-field variant="solo" label="NIN" color="green" :isRequired='true' ></v-text-field>
        </v-col>

        <v-col cols="4" md="4" sm="12">
            <v-text-field variant="solo" label="JBT TIN" color="green" ></v-text-field>
        </v-col>

        <v-container class="tw-mt-20">
            <v-row align="center" justify="center" class="tw-mt-20">
                <v-col cols="auto">
                    <v-btn type="submit" class="tw-bg-green-100">
                        Cancel
                    </v-btn>
                </v-col>

                <v-col cols="auto">
                    <v-btn type="submit"
                        class="tw-bg-green-700 tw-text-white">
                        Proceed to Verification
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-row>
    </div>
</template>

<script>
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
    }
    // data: () => ({ review: '30%' }),
}
</script>

<style>
.text-basil {
    color: #006033 !important;
}
</style>