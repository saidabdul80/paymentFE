<template>
    <div class="tw-flex tw-min-h-full tw-flex-1">
        <v-row align="start" no-gutters>
            <v-col cols="12" md="6">
                <div class="tw-relative tw-hidden tw-flex-1 lg:tw-block mx-4 my-4 mt-2">
                    <img class="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-object-cover tw-rounded-3xl"
                        src="./../../../assets/mfa-image.png" style="height: 98vh;" alt="" />
                </div>
            </v-col>
            <v-col md="6" sm="12">
                <div class="tw-flex tw-flex-1 tw-flex-col tw-justify-center tw-px-4 tw-py-12 sm:tw-px-6 lg:tw-flex-none lg:tw-px-20 xl:tw-px-24">
                    <div class="tw-mx-auto tw-w-full tw-max-w-sm lg:tw-w-96">
                        <div>
                            <div class="tw-flex tw-justify-center tw-mb-10">
                                <img class="tw-h-20 tw-w-auto tw-mt-10 " src="@/assets/logo.png" alt="Your Company" />
                            </div>
                            <p class="tw-mt-10 tw-text-sm tw-leading-6 tw-text-green-900 tw-text-center tw-font-semibold">
                                Enter New Password.
                            </p>
                        </div>
                        <div class="tw-mt-10">
                            <v-form ref="form">
                                <v-row>
                                    <v-col cols="12" md="12" sm="12">
                                        <TextField v-model="details.new_password" :rules="passwordRules"
                                            label="New Password" placeholder="Enter new password" id="newPassword"
                                            name="newPassword" :isRequired="true" />
                                    </v-col>
                                    <v-col cols="12" md="12" sm="12">
                                        <TextField v-model="details.confirm_password" :rules="confirmPasswordRules"
                                            label="Confirm Password" placeholder="Confirm new password" id="confirmPassword"
                                            name="confirmPassword" :isRequired="true" />
                                    </v-col>
                                </v-row>
                                <div>
                                    <v-btn @click.prevent="changePassword" type="submit" block color="green" size="large"
                                        :class="`tw-bg-${$constants.primary}-900 tw-w-full tw-p-3 tw-mt-3`">
                                        <span v-if="isLoading" class="loader tw-h-5 tw-w-5"></span>
                                        Verify
                                    </v-btn>
                                </div>                             
                            </v-form>
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { useAuthStore } from '@/admin/stores/auth';
import { useNotificationStore } from '@/stores/notification';
import TextField from '@/components/TextField.vue';
import ls from '@/services/ls';

export default {
    name: "MFA Verification",
    components: {
        TextField
    },
    data() {
        return {
            isLoading: false,

            details: {
                new_password: '',
                confirm_password: ''
            },
            notificationStore: useNotificationStore(),
            authStore: useAuthStore(),
            passwordRules: [
                value => !!value || 'Password is required.',
                value => value.length >= 8 || 'Password must be at least 8 characters.',
                value => /[A-Za-z]/.test(value) || 'Password must contain at least one letter.',
                value => /[0-9]/.test(value) || 'Password must contain at least one number.'
            ],
            confirmPasswordRules: [
                value => !!value || 'Confirmation password is required.',
                value => value === this.details.new_password || 'Passwords do not match.'
            ],
            verificationCodeRules: [
                value => !!value || 'Verification Code is required.'
            ]
        }
    },
    created(){
        this.details.old_password = ls.get('oldpassword');
    }, 
    methods: {
        async changePassword() {                        
            const valid = await this.$refs.form.validate();            
            
            if (!valid.valid) {
                return;
            }
            this.isLoading = true;
            await this.authStore.changePassword(this.details);
            this.isLoading = false;
        }
    }
};
</script>

<style scoped></style>
