
<template>
    <div class="">
        <v-row class="tw-p-14">
            
            <v-col cols="4" md="4" sm="12">
                <TextField label="Phone Number" placeholder="" id="" name="" :isRequired="true" />
            </v-col>
            
            <v-col cols="4" md="4" sm="12">
                <TextField label="Email" placeholder="" id="" name="" :isRequired="false" />
            </v-col>
            
            <v-col cols="4" md="4" sm="12">
                <TextField label="Residential House Number " placeholder="" id="" name="" :isRequired="false" />
            </v-col>
            
            <v-col cols="4" md="4" sm="12">
                <TextField label="Street Name " placeholder="" id="" name="" :isRequired="false" />
            </v-col>
            
            <v-col cols="4" md="4" sm="12">
                <TextField label="Area / Landmark" placeholder="" id="" name="" :isRequired="false" />
            </v-col>
            
            <v-col cols="4" md="4" sm="12">
                <TextField label="Town / District" placeholder="" id="" name="" :isRequired="true" />
            </v-col>
            
            <v-col cols="4" md="4" sm="12">
                <TextField label="LGA" placeholder="" id="" name="" :isRequired="true" />
            </v-col>
            
            <v-col cols="4" md="4" sm="12">
                <TextField label="ZIP Code" placeholder="" id="" name="" :isRequired="false" />
            </v-col>
        </v-row>


        <v-container class="">
                <v-row justify="center" class="">
                    <v-col cols="auto">
                        <v-btn type="submit" size="large" class="tw-bg-green-100 tw-px-20">
                            Previous
                        </v-btn>
                    </v-col>

                    <v-col cols="auto">
                        <v-btn type="submit" size="large" class="tw-bg-green-700 tw-text-white">
                            Finish
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
