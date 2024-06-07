<template>
    <div>
    <FormsHeader />

    <v-container class="add-vendor ">
        <v-card class="mx-auto tw-border tw-rounded-2xl">

                <h4 class=" tw-text-base tw-font-visby tw-uppercase tw-my-7 tw-text-[#7A7B78] tw-text-center tw-font-bold mb-5">
                    Enter the VENDOR’s RC number for verification. this may speed up the enrolment.
                </h4>


            <div class="tw-px-5">
        <v-form v-model="valid" validate-on="submitForm" @submit.prevent="submitForm">
            <v-row class="tw-p-14">
                <v-col cols="4" md="4" sm="12">
                    <TextField v-model="vendorStore.formData.rc_number" :rules="emptyRules" :error_messages="globalStore.nameRules?.rc_number"
                        label="RC Number" placeholder="342343***" id="rcNumber" name="rcNumber" :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField v-model="vendorStore.formData.business_name" :rules="emptyRules" label="Business Name"
                        placeholder="Hunkuyi Nigeria Limited" id="businessName" name="businessName"
                        :isRequired="true" />
                </v-col>

                <v-col cols="4" md="4" sm="12">
                    <TextField v-model="vendorStore.formData.jtbIn" label="JTB IN" :rules="emptyRules" placeholder="Joint Tax Board ID number"
                        id="jtbIn" name="jtbIn" :isRequired="true" />
                </v-col>


                <v-col cols="12" md="10" sm="12">
                    <FileInput value="Upload" label="CAC Certificate" placeholder="Business CAC certificate"
                        id="cacCertificate" name="cacCertificate" :isRequired="false" />
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



                <v-container class="tw-mt-2">
                <v-row justify="center" class="tw-mt-5">
                    <v-col cols="auto">
                        <v-btn type="submit" size="large" class="tw-bg-green-100 tw-px-20">
                            Cancel
                        </v-btn>
                    </v-col>

                    <v-col cols="auto">
                        <v-btn type="submit" size="large" class="tw-bg-green-700 tw-text-white tw-px-20">
                            Finish
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
            </v-row>
        </v-form>
    </div> 
          
        </v-card>

       </v-container>

       
    
    </div>
</template>

<script>
import EnterVendorDetailsRegistration from './EnterVendorDetailsRegistration.vue'
import FileInput from '@/components/FileInput.vue'
import TextField from '@/components/TextField.vue';
import FormsHeader from '@/components/FormsHeader.vue';
import SelectField from '@/components/SelectField.vue';
import useVendorStore from '@/admin/stores/vendor';
import { useGlobalsStore } from '@/stores/globals';

export default {
    data() {
        return {
            valid: false,
            vendorStore: useVendorStore(),
            globalStore: useGlobalsStore(),
            emptyRules: [
        value => {
          if (value) return true

          return 'required.'
        }
      ],
        }
    },
    methods: {
        async submitForm() {
            if(this.valid){
                
            console.log('Form Data:',this.vendorStore.formData);
            await this.vendorStore.createVendors(this.vendorStore.formData)
            }
           
           
        }
    },
    components: {
        EnterVendorDetailsRegistration,
        TextField,
        FormsHeader,
        SelectField,
        FileInput
    },
}
</script>

<style>
.add-vendor .v-stepper-header {
    box-shadow: none;
    width: 80%;
    margin: 0 auto;
}

.add-vendor .v-divider {
    border: 1px solid #424242;
}

.add-vendor .v-stepper.v-sheet {
    box-shadow: none;
}
</style>