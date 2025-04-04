<template>
    <div class="tw-flex tw-min-h-full tw-flex-1">
        <v-row align="start" no-gutters>
            <!-- <v-col cols="12" md="6">
                <div class="tw-relative tw-hidden tw-flex-1 lg:tw-block mx-4 my-4 mt-2">
                    <img class="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-object-cover tw-rounded-3xl"
                        src="./../../../assets/mfa-image.png" style="height: 98vh;" alt="" />
                </div>
            </v-col> -->
            <v-col md="12" sm="12">
                <div class="tw-flex tw-flex-1 tw-flex-col tw-justify-center tw-px-4 tw-py-12 sm:tw-px-6 lg:tw-flex-none lg:tw-px-20 xl:tw-px-24">
                    <div class="tw-mx-auto tw-w-full tw-max-w-sm lg:tw-w-96">
                        <div>
                            <div class="tw-flex tw-justify-center tw-mb-10">
                                <img class="tw-h-20 tw-w-auto tw-mt-10 " src="@/assets/logo.png" alt="Your Company" />
                            </div>
                            <p class="tw-mt-10 tw-text-sm tw-leading-6 tw-text-black-900 tw-text-center tw-font-semibold">
                               MFA Setup, Scan the Qrcode and click on finish
                            </p>
                        </div>
                        <div class="tw-mt-10">
                            <v-form>                                
                                    <div class="tw-flex tw-justify-center" :key="index">
                                        <v-skeleton-loader v-if="authStore.loadingMFA" type="card" v-for="x in 5" ></v-skeleton-loader>                
                                        <img :src="authStore.qrcode" v-else class="tw-w-15 tw-h-15 tw-text-center"/>                                
                                    </div>
                                <div>
                                    <v-btn @click.prevent="finish" :loading="isLoading" type="submit" block color="black" size="large"
                                        :class="`tw-bg-${$constants.primary}-900 tw-w-full tw-p-3 tw-mt-3`">

                                        Finish Setup
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
            index:0,
            verificationCode: '',
            notificationStore: useNotificationStore(),
            authStore: useAuthStore(),
            verificationCodeRules: [
                value => {
                    if (value) return true
                    return 'Verification Code is required.'
                }
            ],
        }
    },
    methods: {
        async finish() {
            this.$router.push('/auth/verification');            
        },     
        async resendCode() {
            try {
                await this.authStore.resendMfaCode();
                this.notificationStore.notifySuccess('A new verification code has been sent.');
            } catch (error) {
                this.notificationStore.notifyError('Failed to resend verification code. Please try again.');
            }
        }
    },
    async created(){
        await this.authStore.setUpMFA()
        this.index++
        this.authStore.qrcode = ls.get('mfa.qrcode');
    }
};
</script>

<style scoped></style>
