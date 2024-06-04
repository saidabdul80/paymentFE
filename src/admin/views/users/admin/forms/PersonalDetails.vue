<template>
    <div class="">
        <v-row class="tw-p-14">

            
            <v-col cols="4" md="4" sm="12">
                <TextField label="NIN"  placeholder="93888479665" id="" name="" :isRequired="true" />
            </v-col>
            
            <v-col cols="4" md="4" sm="12">
                <TextField label="BVN" placeholder="Bank verification number" id="" name="" :isRequired="false" />
            </v-col>
            
            <v-col cols="4" md="4" sm="12">
                <TextField label="JTB IN" placeholder="Joint Tax Board ID number" id="" name="" :isRequired="true" />
            </v-col>
            
            <v-col cols="4" md="4" sm="12">
                <TextField label="First Name" placeholder="Enter your first name" id="" name="" :isRequired="true" />
            </v-col>
            
            <v-col cols="4" md="4" sm="12">
                <TextField label="Middle Name" placeholder="Enter your middle name" id="" name="" :isRequired="false" />
            </v-col>
            
            <v-col cols="4" md="4" sm="12">
                <TextField label="Last Name" placeholder="Enter your last name" id="" name="" :isRequired="true" />
            </v-col>
            
            <v-col cols="4" md="4" sm="12">
                <TextField label="Role" placeholder="Enter your role" id="" name="" :isRequired="true" />
            </v-col>
            
            <v-col cols="4" md="4" sm="12">
                <SelectField :items="['Male', 'Female']" label="Gender" name="" id="" :isRequired="true" />
            </v-col>
            
            <v-col cols="4" md="4" sm="12">
                <TextField label="Date of Birth" placeholder="Enter your date of birth" id="" name="" :isRequired="false" />
            </v-col>
            
            <v-col cols="4" md="4" sm="12">
                <TextField label="Nationality" placeholder="Enter your Nationality" id="" name="" :isRequired="true" />
            </v-col>
            
            <v-col cols="4" md="4" sm="12">
                <TextField label="State of Origin" placeholder="Enter your state of origin" id="" name="" :isRequired="true" />
            </v-col>
            
            <v-col cols="4" md="4" sm="12">
                <TextField label="LGA " placeholder="Enter your LGA" id="" name="" :isRequired="true" />
            </v-col>

        </v-row>

        <v-container class="">
                <v-row justify="center" class="">
                    <v-col cols="auto">
                        <v-btn type="submit" size="large" class="tw-bg-green-100 tw-px-20">
                            Cancel
                        </v-btn>
                    </v-col>

                    <v-col cols="auto">
                        <v-btn type="submit" size="large" class="tw-bg-green-700 tw-text-white">
                            Next
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
    </div>
</template>

<script>
import TextField from '@/components/TextField.vue';
import SelectField from '@/components/SelectField.vue';

export default {
    data() {
        return {
            role: ['PAYE Head', 'Admin Head', 'Vendor Head'],
            lga: [
                "Akko",
                "Balanga",
                "Billiri",
                "Dukku",
                "Funakaye",
                "Gombe",
                "Kaltungo",
                "Kwami",
                "Nafada",
                "Shongom",
                "Yamaltu/Deba"
            ],
        }
    },
    name: "AdministratorRegistrationForm",
    components: {
        TextField,
        SelectField,
    }
}
</script>