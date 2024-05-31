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
                                <img class="tw-h-20 tw-w-auto tw-mt-10 " src="@/assets/logo-full.png"
                                    alt="Your Company" />
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

                                            <!-- <v-text-field variant="solo" v-model="authStore.loginData.username"
                                                :rules="usernameRules" required placeholder="G-TIN or phone number"
                                                label="ID Number" color="green"></v-text-field> -->

                                            <TextField v-model="authStore.loginData.username" :rules="idNumberRules"
                                                label="ID Number" placeholder="G-TIN or phone number" />

                                            <label :for="id"
                                                class="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
                                                Password
                                            </label>
                                            <v-text-field variant="outlined" :type="showPassword ? 'text' : 'password'"
                                                v-model="authStore.loginData.password" :rules="passwordRules" required
                                                placeholder="**********" color="green"
                                                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                                @click:append-inner="showPassword = !showPassword" bg-color="#f5f6fa"
                                                border="#d5d5d5"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <div
                                        class="tw-grid tw-gap-4 md:tw-grid-cols-2 tw-grid-cols-2   tw-items-center tw-justify-between">
                                        <v-checkbox label="Remember me"></v-checkbox>
                                        <div class=" tw-text-right  mb-3 ">
                                            <a href="forgot-password"
                                                class="tw-font-semibold tw-text-green-900 hover:tw-text-green-500">Forgot
                                                password?</a>
                                        </div>
                                    </div>
                                    <div>
                                        <v-btn @click.prevent="login()" type="submit" block color="green" size="large"
                                            :class="`tw-bg-${$constants.primary}-900 tw-w-full`">
                                            <span v-if="isLoading" class="loader tw-h-5 tw-w-5"></span>
                                            Login
                                        </v-btn>
                                    </div>
                                    <p class="tw-mt-2 tw-text-sm tw-leading-6 tw-text-gray-500">
                                        Don't have a GIRS account? Click here to
                                        {{ ' ' }}
                                        <a href="#" class="tw-font-semibold tw-text-green-900 hover:tw-text-green-700">
                                            enrol yourself.
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
    name: "Login",
    components: {
        TextField
    },
    data() {
        return {
            isLoading: false,
            showPassword: false,
            notificationStore: useNotificationStore(),
            authStore: useAuthStore(),
            usernameRules: [
                value => {
                    if (value) return true
                    return 'Username is required.'
                }
            ],
            passwordRules: [
                value => {
                    if (value) return true
                    return 'Password is required.'
                },
            ],
        }
    },
    methods: {

        async login() {
            //    alert()
            this.isLoading = true
            await this.authStore.login(this.authStore.loginData)
            this.isLoading = false

        }
    }
};
</script>

<style scoped></style>