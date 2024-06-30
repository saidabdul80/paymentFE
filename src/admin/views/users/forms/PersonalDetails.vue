<template>
    <v-card>
        <v-form ref="form" v-model="valid">
            <v-row class="lg:tw-p-14 md:tw-p-5 tw-p-4">
                <!-- Email -->
                <v-col class="md:tw-py-0" cols="12" md="4" sm="12" v-if="isEdit ? !adminStore.staffsLoading : true">
                    <TextField v-if="isEdit ? !adminStore.staffsLoading : true" v-model="adminStore.currentUser.email"
                        label="Email" placeholder="Enter email" :isRequired="true" :rules="emailRules"
                        :error_messages="globalStore.nameRules?.email" />
                    <div class="tw-mb-3" v-else>
                        <CustomSkeletonLoader :height="'10px'" :width="'45%'" class="tw-mb-2" />
                        <CustomSkeletonLoader :height="'56px'" :width="'100%'" />
                    </div>
                </v-col>

                <!-- First Name -->
                <v-col class="md:tw-py-0" cols="12" md="4" sm="12">
                    <TextField v-if="isEdit ? !adminStore.staffsLoading : true"
                        v-model="adminStore.currentUser.first_name" label="First Name" placeholder="Enter first name"
                        :isRequired="true" :rules="nameRules" :error_messages="globalStore.nameRules?.first_name" />
                    <div class="tw-mb-3" v-else>
                        <CustomSkeletonLoader :height="'10px'" :width="'45%'" class="tw-mb-2" />
                        <CustomSkeletonLoader :height="'56px'" :width="'100%'" />
                    </div>
                </v-col>

                <!-- Last Name -->
                <v-col class="md:tw-py-0" cols="12" md="4" sm="12">
                    <TextField v-if="isEdit ? !adminStore.staffsLoading : true"
                        v-model="adminStore.currentUser.last_name" label="Last Name" placeholder="Enter last name"
                        :isRequired="true" :rules="nameRules" :error_messages="globalStore.nameRules?.last_name" />
                    <div class="tw-mb-3" v-else>
                        <CustomSkeletonLoader :height="'10px'" :width="'45%'" class="tw-mb-2" />
                        <CustomSkeletonLoader :height="'56px'" :width="'100%'" />
                    </div>
                </v-col>

                <!-- Phone Number -->
                <v-col class="md:tw-py-0" cols="12" md="4" sm="12">
                    <TextField v-if="isEdit ? !adminStore.staffsLoading : true"
                        v-model="adminStore.currentUser.phone_number" label="Phone Number"
                        placeholder="Enter phone number" :isRequired="false" :rules="phoneRules"
                        :error_messages="globalStore.nameRules?.phone_number" />
                    <div class="tw-mb-3" v-else>
                        <CustomSkeletonLoader :height="'10px'" :width="'45%'" class="tw-mb-2" />
                        <CustomSkeletonLoader :height="'56px'" :width="'100%'" />
                    </div>
                </v-col>

                <!-- Gender -->
                <v-col class="md:tw-py-0" cols="12" md="4" sm="12">
                    <SelectField class="gTextFieldSelect" variant="flat"
                        v-if="isEdit ? !adminStore.staffsLoading : true" v-model="adminStore.currentUser.gender"
                        :items="['Male', 'Female']" label="Gender" :isRequired="true" :rules="genderRules"
                        :error_messages="globalStore.nameRules?.gender" />
                    <div class="tw-mb-3" v-else>
                        <CustomSkeletonLoader :height="'10px'" :width="'45%'" class="tw-mb-2" />
                        <CustomSkeletonLoader :height="'56px'" :width="'100%'" />
                    </div>
                </v-col>

                <!-- Date of Birth -->
                <v-col class="md:tw-py-0" cols="12" md="4" sm="12">
                    <TextField v-if="isEdit ? !adminStore.staffsLoading : true" v-model="adminStore.currentUser.dob"
                        label="Date of Birth" placeholder="Enter date of birth" type="date" :isRequired="true"
                        :rules="dobRules" :error_messages="globalStore.nameRules?.dob" />
                    <div class="tw-mb-3" v-else>
                        <CustomSkeletonLoader :height="'10px'" :width="'45%'" class="tw-mb-2" />
                        <CustomSkeletonLoader :height="'56px'" :width="'100%'" />
                    </div>
                </v-col>

                <!-- Address -->
                <v-col class="md:tw-py-0" cols="12" md="4" sm="12">
                    <TextField v-if="isEdit ? !adminStore.staffsLoading : true" v-model="adminStore.currentUser.address"
                        label="Address" placeholder="Enter address" :isRequired="true" :rules="addressRules"
                        :error_messages="globalStore.nameRules?.address" />
                    <div class="tw-mb-3" v-else>
                        <CustomSkeletonLoader :height="'10px'" :width="'45%'" class="tw-mb-2" />
                        <CustomSkeletonLoader :height="'56px'" :width="'100%'" />
                    </div>
                </v-col>
            </v-row>
            <div class="tw-flex tw-justify-center tw-pb-20">
                <v-btn :loading="loading" :color="$constants.primary" @click="submitForm" size="large">Submit</v-btn>
            </div>
        </v-form>
    </v-card>
</template>

<script>
import TextField from '@/components/TextField.vue';
import SelectField from '@/components/SelectField.vue';
import useAdminStore from '@/admin/stores/admin';
import { useGlobalsStore } from '@/stores/globals';
import SelectFilter from '@/components/SelectFilter.vue';
import CustomSkeletonLoader from '@/components/CustomSkeletonLoader.vue';

export default {
    emit: ['submit'],
    props: {
        loading: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            adminStore: useAdminStore(),
            globalStore: useGlobalsStore(),
            valid: false,
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            nameRules: [
                v => !!v || 'This field is required',
            ],
            phoneRules: [],
            genderRules: [
                v => !!v || 'Gender is required',
            ],
            dobRules: [
                v => !!v || 'Date of Birth is required',
            ],
            addressRules: [
                v => !!v || 'Address is required',
            ],
        }
    },
    name: "AdministratorRegistrationForm",
    computed: {
        isEdit() {
            return !!this.$route.params.id;
        },
    },
    methods: {
        submitForm() {
            this.$refs.form.validate()
            if(this.valid){
                this.$emit('submit', true);
            }
        }
    },
    components: {
        SelectField,
        SelectFilter,
        TextField,
        CustomSkeletonLoader
    }
}
</script>
