<template>
    <div class="">
        <v-row class="tw-p-14">
            <v-col cols="4" md="4" sm="12">
                <TextField label="Full Name" placeholder="First name and othername" id="" name="" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <SelectField label="Role" name="" id="" :items="role" :isRequired="true" />
            </v-col>

            <v-col cols="4" md="4" sm="12">
                <SelectField label="Bank Name" name="" id="" :items="lga" :isRequired="true" />
            </v-col>


            <v-container class="tw-mt-20">
                <v-container class="tw-mt-20">
                    <v-row align="center" justify="center" class="tw-mt-20">
                        <v-col cols="auto">
                            <v-btn type="submit" variant="outlined" size="large" color="green"
                                :class="`tw-bg-${$constants.primary}-900 tw-mr-2 text-capitalize tw-px-20`">
                                Cancel
                            </v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <v-dialog max-width="500">
                                <template v-slot:activator="{ props: activatorProps }">
                                    <v-btn v-bind="activatorProps" type="submit" size="large"
                                        class="tw-bg-green-700 tw-text-white tw-px-20">
                                        Proceed
                                    </v-btn>
                                </template>

                                <template v-slot:default="{ isActive }">
                                    <v-card>
                                        <v-card-text class=" text-center tw-p-5 mb-10">
                                            <img class="mx-auto mt-5 mb-5" src="../../../../assets/good-sgin.png"
                                                width="150" alt="" />
                                            <h3 class="text-h5">
                                                Create Admin Successfully
                                            </h3>
                                        </v-card-text>
                                    </v-card>
                                </template>
                            </v-dialog>
                        </v-col>
                    </v-row>
                </v-container>
            </v-container>



        </v-row>
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

<style>
.text-basil {
    color: #006033 !important;
}
</style>