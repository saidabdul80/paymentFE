<template>
    <div class="tw-flex tw-min-h-full tw-flex-1">
        <v-row align="start" no-gutters>
            <!-- <v-col cols="12" md="6">
                <div class="tw-relative tw-hidden tw-flex-1 lg:tw-block mx-4 my-4 mt-2">
                    <img class="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-object-cover tw-rounded-3xl"
                        src="@/assets/mfa-image.png" style="height: 98vh;" alt="" />
                </div>
            </v-col>
            -->
            <v-col md="12" sm="12"> 
                <div class="tw-flex tw-flex-1 tw-flex-col tw-justify-center tw-px-4 tw-py-12 sm:tw-px-6 lg:tw-flex-none lg:tw-px-20 xl:tw-px-24">
                    <div class="tw-mx-auto tw-w-full tw-max-w-sm lg:tw-w-96">
                        <div>
                            <div class="tw-flex tw-justify-center tw-mb-10">
                                <img class="tw-h-20 tw-w-auto tw-mt-10 " src="@/assets/logo.png" alt="COWRISPAY" />
                            </div>
                            <p class="tw-mt-10 tw-text-sm tw-leading-6 tw-text-black-900 tw-text-center tw-font-semibold">
                                Enter MFA code from your google authenticator.
                            </p>
                        </div>
                        <div class="tw-mt-10">
                            <v-form>
                                <v-row>
                                    <v-col cols="12" md="12" sm="12">
                                        <TextField v-model="verificationCode" :rules="verificationCodeRules"
                                            label="MFA Code" placeholder="Enter code" id="verificationCode"
                                            name="verificationCode" :isRequired="true" />                                            
                                    </v-col>
                                </v-row>
                                <div>
                                    <v-btn :loading="isLoading" @click.prevent="verifyCode" type="submit" block color="black" size="large"
                                        :class="`tw-bg-${$constants.primary}-900 tw-w-full tw-p-3 tw-mt-3`">
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
import { useAppAuthStore } from '@/stores/auth';
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
            verificationCode: '',
            notificationStore: useNotificationStore(),
            authStore: useAppAuthStore(),
            verificationCodeRules: [
                value => {
                    if (value) return true
                    return 'Verification Code is required.'
                }
            ],
        }
    },
    methods: {
        async verifyCode() {
            this.isLoading = true;
            try {
                await this.authStore.verifyMfaCode({token:this.verificationCode});
                ls.remove('mfa.qrcode')
            } catch (error) {
                this.notificationStore.notifyError('Verification failed. Please try again.');
            } finally {
                this.isLoading = false;
            } 
        },
        async resendCode() {
            try {
                await this.authStore.resendMfaCode();
                this.notificationStore.notifySuccess('A new verification code has been sent.');
            } catch (error) {
                this.notificationStore.notifyError('Failed to resend verification code. Please try again.');
            }
        }
    }
};
</script>

<style scoped></style>
