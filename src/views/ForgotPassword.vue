<template>
    <Special img="walk.svg">
        <div class="tw-flex tw-justify-center">
            <Card style="width: 35%; overflow: hidden" class="tw-py-10">
                <template #content>
                    <p class="tw-font-bold tw-text-2xl tw-text-center tw-mb-3">Forgot Password</p>
                    <p class="tw-text-md tw-text-center tw-mb-5">Please enter your email address to receive a password reset link.</p>
                    <div class="tw-flex tw-flex-col tw-justify-center tw-my-4">
                        <TextField label="Email" v-model="email" type="email" class="tw-mb-4" />
                    </div>
                    <div class="tw-flex tw-justify-center">
                        <v-btn @click="forgotPassword" :loading="loading" color="black" class="tw-w-[60%]" severity="contrast">Reset Password</v-btn>
                    </div>
                </template>
            </Card>
        </div>
    </Special>
</template>

<script>
import Card from 'primevue/card';
import Special from "@/components/Special.vue";
import TextField from '@/components/TextField.vue';

import { useClient } from '@/stores/client';
import { useGlobalsStore } from '@/stores/globals';

export default {
    components: {
        Special,
        Card,
        TextField
    },
    data() {
        return {
            email: '',
            global: useGlobalsStore(),
            loading:false
        }
    },
    methods: {
       async  forgotPassword() {
            const payload = {
                email: this.email
            };
            this.loading = true;
            localStorage.setItem('email',payload.email)
            const res = await useClient().http({method:'post',path:'/auth/forgot-password', data :payload}) 
            this.loading = false;
            this.global.palert({
                title: 'Thank you',
                text: 'We have sent you an email',
                callback: async () => {
                    this.$router.push('/otp')
                },
            });
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
