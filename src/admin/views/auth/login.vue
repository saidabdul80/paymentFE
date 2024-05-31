<template>
    <div class="tw-flex tw-min-h-full tw-flex-1">
        <v-row align="start" no-gutters>
            <v-col cols="12" md="6">
                <div class="tw-relative tw-hidden tw-flex-1 lg:tw-block mx-4 my-4 mt-2">
                    <img class="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-object-cover tw-rounded-3xl"
                        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                        style="height: 98vh;" alt="" />
                </div>
            </v-col>
            <v-col md="6" sm="12">
                <div class="tw-flex tw-flex-1 tw-flex-col tw-justify-center tw-px-4 tw-py-12 sm:tw-px-6 lg:tw-flex-none lg:tw-px-20 xl:tw-px-24">
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
                                <v-form ref="form" validate-on="submit lazy"  @submit.prevent="login">
                                    <v-row>
                                        <v-col cols="12" md="12" sm="12">
                                            <v-text-field variant="solo" v-model="authStore.loginData.username"
                                                    :error-messages="globalStore.nameRules?.username" required placeholder="G-TIN or phone number"
                                                label="ID Number" color="green"></v-text-field>
                                            <v-text-field variant="solo" :type="showPassword?'text':'password'" v-model="authStore.loginData.password"
                                                    :error-messages="globalStore.nameRules?.password"  required placeholder="**********"
                                                label="Password" color="green"   :append-inner-icon="showPassword?'mdi-eye':'mdi-eye-off'"  @click:append-inner="showPassword = !showPassword"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <div class="tw-grid tw-gap-4 md:tw-grid-cols-2 tw-grid-cols-2   tw-items-center tw-justify-between">
                                        <v-checkbox label="Remember me"></v-checkbox>
                                        <div class=" tw-text-right  mb-3 ">
                                            <a href="#" class="tw-font-semibold tw-text-green-900 hover:tw-text-green-500">Forgot
                                                password?</a>
                                        </div>
                                    </div>
                                    <div>
                                        <v-btn   type="submit" block
                                        :color="$constants.primary" :class="`tw-w-full`" :loading="isLoading">
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
import { useGlobalsStore } from '@/stores/globals';
import { useNotificationStore } from '@/stores/notification';

export default {
    name: "Login",
    components: {
    },
    data() {
        return {
            isLoading:false,
            showPassword:false,
            notificationStore: useNotificationStore(),
            authStore: useAuthStore(),
            globalStore: useGlobalsStore(),
        }
    },
    watch:{
  
    },
    methods: {
        async login() {
            this.isLoading = true
            await this.authStore.login(this.authStore.loginData)
            this.$refs.form.validate(true)
            this.isLoading = false
        }
    }
};
</script>

<style scoped></style>