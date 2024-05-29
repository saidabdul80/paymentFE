<template>
    <div class="tw-flex tw-min-h-full tw-flex-1">
        <v-row align="start" no-gutters>
            <v-col cols="6" md="6" sm="12">
                <div class="tw-relative tw-hidden tw-flex-1 lg:tw-block mx-4 my-4 mt-2">
                    <img class="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-object-cover tw-rounded-3xl"
                        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                        style="height: 98vh;" alt="" />
                </div>
            </v-col>
            <v-col cols="6" md="6" sm="12">
                <div
                    class="tw-flex tw-flex-1 tw-flex-col tw-justify-center tw-px-4 tw-py-12 sm:tw-px-6 lg:tw-flex-none lg:tw-px-20 xl:tw-px-24">
                    <div class="tw-mx-auto tw-w-full tw-max-w-sm lg:tw-w-96">
                        <div>
                            <div class="tw-flex tw-justify-center tw-mb-10">
                                <img class="tw-h-20 tw-w-auto tw-mt-10 " src="./../../../assets/logo.png"
                                    alt="Your Company" />
                            </div>
                            <p
                                class="tw-mt-10 tw-text-sm tw-leading-6 tw-text-green-900 tw-text-center tw-text tw-font-semibold">
                                Enter your details to access your GIRS account.
                            </p>
                        </div>
                        <div class="tw-mt-10">
                            <div>
                                <form action="#" method="POST" class="tw-space-y-6">

                                    <!-- <TextField /> -->
                                    <v-row>
                                        <v-col cols="12" md="12" sm="12">
                                            <TextField placeholder="G-TIN or phone number" label="ID Number"
                                                color="green" />
                                            <TextField placeholder="**********" label="Password" color="green" />
                                        </v-col>
                                    </v-row>
                                    <div class="tw-flex  tw-justify-between">
                                        <div class="tw-flex tw-items-center">
                                            <input id="remember-me" name="remember-me" type="checkbox" checked="checked"
                                                class="tw-h-4 tw-w-4 tw-rounded tw-border-green-500 tw-text-green-600 focus:tw-text-green-600" />
                                            <label for="remember-me"
                                                class="tw-ml-3 tw-block tw-text-sm tw-leading-6 tw-text-green-900">Remember
                                                me</label>
                                        </div>

                                        <div class="tw-text-sm tw-leading-6">
                                            <a href="#"
                                                class="tw-font-semibold tw-text-green-900 hover:tw-text-green-500">Forgot
                                                password?</a>
                                        </div>
                                    </div>


                                    <div>
                                        <!-- <button type="submit"
                                            class="tw-flex tw-w-full tw-justify-center tw-rounded-md tw-bg-green-600 tw-px-3 tw-py-1.5 tw-text-sm tw-font-semibold tw-leading-6 tw-text-white tw-shadow-sm hover:tw-bg-green-500 focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-green-900 tw-py-1">
                                            Login
                                        </button> -->
                                        <a href="admin/dashboard"
                                            class="tw-flex tw-w-full tw-justify-center tw-rounded-md tw-bg-green-600 tw-px-3 tw-py-1.5 tw-text-sm tw-font-semibold tw-leading-6 tw-text-white tw-shadow-sm hover:tw-bg-green-500 focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-green-900 tw-py-1">
                                            Login
                                        </a>
                                    </div>
                                    <p class="tw-mt-2 tw-text-sm tw-leading-6 tw-text-gray-500">
                                        Don't have a GIRS account? Click here to
                                        {{ ' ' }}
                                        <a href="#" class="tw-font-semibold tw-text-green-900 hover:tw-text-green-700">
                                            enrol yourself.
                                        </a>
                                    </p>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>


<script>
import TextField from '@/components/TextField.vue';

export default {
    name: "Login",
    components: {
        TextField,
    },
};
</script>

<style scoped></style>