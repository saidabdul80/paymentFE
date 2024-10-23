<template>
    <Special>
        <div class="tw-flex tw-justify-center tw-mt-10">
            <Card style="overflow: hidden" class="tw-py-10 md:tw-w-[35%] tw-w-[80%]">
                <template #content>
                    <div class="tw-flex tw-w-full tw-flex-col tw-justify-center tw-items-center">
                        <div class="tw-w-[80%] ">
                            <p class="tw-text-center tw-font-bold tw-text-lg">Login to your account</p>
                            <p v-if="global.error" class="tw-text-[#d13333]" style="font-size: 15px;line-height: 15px;text-align: center;margin: 6px 0px;">{{ global.error}}</p>
                            <div class="tw-mb-4">
                                <TextField v-model="form.username" label="Email address" :error-messages="errors.username" />
                            </div>
                            <div class="tw-mb-4">
                                <label for="password" class="tw-block tw-text-sm tw-font-medium tw-mb-1">Password</label>
                                <Password v-model="form.password" fluid id="password" :feedback="false" toggleMask class="tw-w-full tw-rounded-lg" required />
                                <small v-if="errors.password" class="tw-text-[#d13333]">{{ errors.password }}</small>
                            </div>
                            <p class="tw-text-right tw-mb-5 tw-cursor-pointer">Forgot Password?</p>
                            <v-btn :loading="loading" @click="login()" type="submit" color="black" class="tw-w-full" severity="contrast">Login</v-btn>
                            <p class="tw-text-center tw-mt-5 tw-cursor-pointer">Don't have an account? <router-link to="/register" class="tw-text-blue-600 tw-underline">Join</router-link></p>
                        </div>
                    </div>
                </template>
            </Card>
        </div>
    </Special>
</template>

<script>
import Password from 'primevue/password';
import Card from 'primevue/card';
import Special from "@/components/Special.vue";
import TextField from "@/components/TextField.vue";
import { useAuthStore } from '@/admin/stores/auth';
import { useAppAuthStore } from '@/stores/auth';
import { useGlobalsStore } from '@/stores/globals';

export default {
    components: {
        Special,
        Card,
        Password,
        TextField,
    },
    data() {
        return {
            global:useGlobalsStore(),
            form: {
                username: '',
                password: ''
            },
            errors: {},
            loading: false,
        };
    },
    methods: {
        async login() {
            this.errors = {}; // Reset errors
            if (this.validateForm()) {
                this.loading = true;
                const res = await useAppAuthStore().login({
                    password: this.form.password,
                    email: this.form.username,
                });
                if (res) {
                    // Handle successful login
                }
                this.loading = false;
            }
        },
        validateForm() {
            let valid = true;
            const publicEmailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];

            if (!this.form.username) {
                this.errors.username = 'Email address is required';
                valid = false;
            } else if (!this.validEmail(this.form.username)) {
                this.errors.username = 'Invalid email address';
                valid = false;
            } 
            //else if (this.isPublicEmailDomain(this.form.username, publicEmailDomains)) {
            //     this.errors.username = 'Company email address is required';
            //     valid = false;
            // }
            if (!this.form.password) {
                this.errors.password = 'Password is required';
                valid = false;
            }
            return valid;
        },
        validEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/i;
            return re.test(email);
        },
        isPublicEmailDomain(email, publicEmailDomains) {
            const domain = email.split('@')[1];
            return publicEmailDomains.includes(domain);
        },
    },
};
</script>

<style lang="scss" scoped>
/* Add any additional styles if necessary */
</style>
