<template>
    <div class="tw-flex tw-min-h-full tw-flex-1">
        <v-row align="start" no-gutters>
            <v-col cols="12" md="6">
                <div class="tw-relative tw-hidden tw-flex-1 lg:tw-block mx-4 my-4 mt-2">
                    <img class="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-object-cover tw-rounded-3xl"
                        src="./../../../assets/login-image.png" style="height: 98vh;" alt="" />
                </div>
            </v-col>
            <v-col md="6" sm="12">
                <div
                    class="tw-flex tw-flex-1 tw-flex-col tw-justify-center tw-px-4 tw-py-12 sm:tw-px-6 lg:tw-flex-none lg:tw-px-20 xl:tw-px-24">
                    <div class="tw-mx-auto tw-w-full tw-max-w-sm lg:tw-w-96">
                        <div>
                            <div class="tw-flex tw-justify-center tw-mb-10">
                                <img class="tw-h-20 tw-w-auto tw-mt-10 " src="@/assets/logo.png" alt="Your Company" />
                            </div>
                            <p
                                class="tw-mt-10 tw-text-sm tw-leading-6 tw-text-green-900 tw-text-center tw-text tw-font-semibold">
                                Enter your details to access your GIRS account.
                            </p>
                        </div>
                        <div class="tw-mt-10">
                            <div>
                                <v-form>
                                    <v-row>
                                        <v-col cols="12" md="12" sm="12">
                                            <TextField v-model="authStore.loginData.idNumber" :rules="idNumberRules"
                                                label="ID Number" placeholder="G-TIN or phone number" id="idNumber"
                                                name="idNumber" :isRequired="true" />

                                        </v-col>
                                    </v-row>
                                    <div>
                                        <v-btn @click.prevent="forgotPassword()" type="submit" block color="green"
                                            size="large"
                                            :class="`tw-bg-${$constants.primary}-900 tw-w-full tw-p-3 tw-mt-3`">
                                            <span v-if="isLoading" class="loader tw-h-5 tw-w-5"></span>
                                            Login
                                        </v-btn>
                                    </div>
                                    <p class="tw-mt-2 tw-text-sm tw-leading-6 tw-text-gray-500">
                                        Already have an account?
                                        <a href="login"
                                            class="tw-font-semibold tw-text-green-900 hover:tw-text-green-700">
                                            Login.
                                        </a>
                                    </p>
                                </v-form>
                            </div>

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

export default {
    name: "Forgot Password",
    components: {
        TextField
    },
    data() {
        return {
            isLoading: false,
            showPassword: false,
            notificationStore: useNotificationStore(),
            authStore: useAuthStore(),
            idNumberRules: [
                value => {
                    if (value) return true
                    return 'ID Number is required.'
                }
            ],
        }
    },
    methods: {

        async forgotPassword() {
            //    alert()
            this.isLoading = true
            await this.authStore.forgotPassword(this.authStore.forgotPasswordData)
            this.isLoading = false

        }
    }
};
</script>

<style scoped></style>