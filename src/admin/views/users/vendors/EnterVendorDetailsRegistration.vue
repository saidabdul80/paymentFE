<template>
    <div class="tw-px-5">
        <v-form v-model="valid" validate-on="submitForm" @submit.prevent="submitForm">
            <v-row class="tw-p-14">
                <v-col cols="4" md="4" sm="12">
                    <TextField v-model="vendorStore.formData.rc_number" :rules="nameRules" :error_messages="globalStore.nameRules?.rc_number"
                        label="RC Number" placeholder="342343***" id="rcNumber" name="rcNumber" :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField v-model="vendorStore.formData.business_name" label="Business Name"
                        placeholder="Hunkuyi Nigeria Limited" id="businessName" name="businessName"
                        :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField v-model="vendorStore.formData.jtbIn" label="JTB IN" placeholder="Joint Tax Board ID number"
                        id="jtbIn" name="jtbIn" :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField v-model="vendorStore.formData.address_line1" label="Address Line 1"
                        placeholder="Suite No. Street Name" id="addressLine1" name="addressLine1" :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField v-model="vendorStore.formData.addressLine2" label="Address Line 2"
                        placeholder="Suite No. Street Name" id="addressLine2" name="addressLine2" :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <SelectField v-model="vendorStore.formData.lga" label="L.G.A" name="lga" id="lga"
                        :items="['Akko', 'Gombe', 'Kwami', 'Dukku']" :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField v-model="vendorStore.formData.contact_first_name" label="Contact First Name" placeholder="Musa"
                        id="contactFirstName" name="contactFirstName" :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField v-model="vendorStore.formData.contact_middle_name" label="Contact Middle Name" placeholder=""
                        id="contactMiddleName" name="contactMiddleName" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField v-model="vendorStore.formData.contact_last_name" label="Contact Last Name" placeholder="Sani"
                        id="contactLastName" name="contactLastName" :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <SelectField v-model="vendorStore.formData.bank_name" label="Bank Name" name="bankName" id="bankName"
                        :items="['FCMB', 'Stanbic IBCT', 'GT Bank', 'Access Bank']" :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField v-model="vendorStore.formData.account_name" label="Account Name"
                        placeholder="Company bank account name" id="accountName" name="accountName"
                        :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField v-model="vendorStore.formData.account_number" label="Account Number" type="number"
                        placeholder="10-digit account number" id="accountNumber" name="accountNumber"
                        :isRequired="true" />
                </v-col>

                <v-container class="tw-mt-5">
                    <v-row justify="center" class="tw-mt-5">
                        <v-col cols="auto">
                            <v-dialog max-width="500">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn type="submit" v-bind="attrs" v-on="on" size="large"
                                        class="tw-bg-green-700 tw-text-white">
                                        Proceed to Verification
                                    </v-btn>
                                </template>
                                <template v-slot:default="{ isActive }">
                                    <v-card>
                                        <v-card-text class="text-center tw-p-5 mb-10">
                                            <img class="mx-auto mt-5 mb-5" src="../../../../assets/loader.png"
                                                width="150" alt="" />
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
        </v-form>
    </div>
</template>

<script>
import TextField from '@/components/TextField.vue';
import SelectField from '@/components/SelectField.vue';
import useVendorStore from '@/admin/stores/vendor';
import { useGlobalsStore } from '@/stores/globals';

export default {
    data() {
        return {
            valid: false,
            vendorStore: useVendorStore(),
            globalStore: useGlobalsStore(),
            nameRules: [
        value => {
          if (value) return true

          return 'Name is required.'
        },
        value => {
          if (value?.length <= 10) return true

          return 'Name must be less than 10 characters.'
        },
      ],
        }
    },
    methods: {
        async submitForm() {
            if(this.valid){
                
            console.log('Form Data:',this.vendorStore.formData);
            //await this.globalStore.createVendors(this.vendorStore.formData)
            }
           
           
        }
    },
    components: {
        TextField,
        SelectField
    }
}
</script>

<style>
.text-basil {
    color: #006033 !important;
}
</style>
