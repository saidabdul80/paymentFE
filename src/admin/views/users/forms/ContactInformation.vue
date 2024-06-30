
<template>
    <div class="">
        <v-row class="tw-p-14">
            <v-col cols="12" md="4" sm="12">
                <TextField 
                    v-model="adminStore.currentUser2.phone_number" 
                    label="Phone Number" 
                    type="tel" 
                    placeholder="Enter your mobile number" 
                    :isRequired="true" 
                    :error_messages="globalStore.nameRules?.phone_number" />
            </v-col>
            
            <v-col cols="12" md="4" sm="12">
                <TextField 
                    v-model="adminStore.currentUser2.email" 
                    label="Email" 
                    type="email" 
                    placeholder="Enter your email" 
                    :isRequired="false" 
                    :error_messages="globalStore.nameRules?.email" />
            </v-col>
            
            <v-col cols="12" md="4" sm="12">
                <TextField 
                    v-model="adminStore.currentUser2.address_line_1" 
                    label="Residential House Number" 
                    placeholder="No. 124B" 
                    :isRequired="false" 
                    :error_messages="globalStore.nameRules?.address_line_1" />
            </v-col>

            <RegionFields 
                v-model="adminStore.currentUser2" 
                :nationality="globalStore.countries"
                :nationalityLoading="globalStore.countriesLoading"
                :error_messages="globalStore.nameRules?.regionData"
            ></RegionFields>


                <v-col cols="12" md="4" sm="12">
                <TextField 
                    v-model="adminStore.currentUser2.address_line_2" 
                    label="Street Name" 
                    placeholder="" 
                    :isRequired="false" 
                    :error_messages="globalStore.nameRules?.address_line_2" />
            </v-col>
        </v-row>
    </div>
</template>


<script>
import TextField from '@/components/TextField.vue';
import SelectField from '@/components/SelectField.vue';
import RegionFields from '@/components/RegionFields.vue';
import useAdminStore from '@/admin/stores/admin';
import { useGlobalsStore } from '@/stores/globals';
export default {
    data() {
        return {
            adminStore:useAdminStore(),
            globalStore:useGlobalsStore(),
            role: ['PAYE Head', 'Admin Head', 'Vendor Head'],           
        }
    },
    name: "AdministratorRegistrationForm",
    components: {
        TextField,
        SelectField,
        RegionFields
    },
     
    async created() {
        await this.globalStore.fetchCountries();
    },
}
</script>
