<template>
    <Special>
        <div class="tw-flex tw-justify-center tw-mt-10">
        <Card  style="overflow: hidden" class="tw-py-10 md:tw-w-[35%] tw-w-[80%]">
            <template #content>
                <div class="tw-flex tw-w-full tw-flex-col tw-justify-center tw-items-center">
                    <div class="tw-w-[80%] "> 
                        <p class="tw-text-center tw-font-bold tw-text-lg">Login to your account</p>
                        <div class="tw-mb-4">
                            <TextField v-model="form.username" label="Email address"  />
                        </div>
                        <div class="tw-mb-4">
                            <label for="password" class="tw-block tw-text-sm tw-font-medium tw-mb-1">Password</label>
                            <Password v-model="form.password" fluid id="password" :feedback="false" toggleMask  class=" tw-w-full  tw-rounded-lg" required />
                        </div>
                        <p class=" tw-text-right tw-mb-5 tw-cursor-pointer">Forgot Password?</p>
                        <v-btn :loading="loading" @click="login()" type="submit" color="black"class="tw-w-full" severity="contrast">Login</v-btn>
                    </div>
                </div>
            </template>
        </Card>
        </div>
    </Special>
</template>

<script>
import InputOtp from 'primevue/inputotp';
import Password from 'primevue/password';
import Card from 'primevue/card';
import Button from 'primevue/Button';
import Special from "@/components/Special.vue"
import TextField from "@/components/TextField.vue"
import { useAuthStore } from '@/admin/stores/auth';
import { useAppAuthStore } from '@/stores/auth';

    export default {
        components: {
            Special,
            Card,
            InputOtp,
            Password,
            Button,
            TextField
        },
        data() {
            return {
                form:{},
                loading:false

            }
        },
        methods:{
            async login(){
                this.loading = true
                await useAppAuthStore().login({
                    password: this.form.password,
                    email: this.form.username,
                })
                this.loading = false
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>