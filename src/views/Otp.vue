<template>
    <Special img="walk.svg">
        <div class="tw-flex tw-justify-center">
            <Card style="width: 35%; overflow: hidden" class="tw-py-10">
                <template #content>
                    <p class="tw-font-bold tw-text-2xl tw-text-center tw-mb-3">Reset Password</p>
                    <p class="tw-text-md tw-text-center tw-mb-5">Please enter the details to reset your password.</p>
                    <div class="tw-flex tw-flex-col tw-justify-center tw-my-4">
                        <TextField label="Email" v-model="email" type="email" class="tw-mb-4" />
                        <InputOtp v-model="otp" integerOnly :length="6" class="tw-mb-6">
                            <template #default="{ attrs, events }">
                                <InputText type="text" v-bind="attrs" v-on="events" class="tw-w-14 tw-h-14 tw-text-center tw-shadow-md" />
                            </template>
                        </InputOtp>
                        <TextField label="Password" v-model="password" type="password" class="tw-mb-4" />
                        <TextField label="Confirm Password" v-model="confirm_password" type="password" class="tw-mb-4" />
                    </div>
                    <div class="tw-flex tw-justify-center">
                        <v-btn @click="resetPassword" color="black" class="tw-w-[60%]" severity="contrast">Reset Password</v-btn>
                    </div>
                </template>
            </Card>
        </div>
    </Special>
</template>

<script>
import InputOtp from 'primevue/inputotp';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Special from "@/components/Special.vue";
import TextField from '@/components/TextField.vue';
import axios from 'axios';
import { useGlobalsStore } from '@/stores/globals';
import { useClient } from '@/stores/client';
export default {
    components: {
        Special,
        Card,
        InputOtp,
        InputText,
        TextField
    },
    data() {
        return {
            email: '',
            otp: '',
            password: '',
            confirm_password: '',
            global: useGlobalsStore(),
            loading:false
        }
    },
    methods: {
        resetPassword() {
            const payload = {
                email: this.email,
                otp: this.otp,
                password: this.password,
                confirm_password: this.confirm_password
            };

            this.loading = true;
            const res = await useClient().http({method:'post',path:'/auth/reset-password', data :payload}) 
            this.loading = false;
            if  (res) {
                this.global.palert({
                    title: 'Thank you',
                    text: 'Password reset successful',
                    callback: async () => {
                        this.$router.push('/login')
                    },
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
