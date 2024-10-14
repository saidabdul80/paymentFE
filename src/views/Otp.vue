<template>
    <Special img="walk.svg">
        <div class="tw-flex tw-justify-center">
        <Card  style="width: 35%; overflow: hidden" class="tw-py-10">
            <template #content>
                <p class="tw-font-bold tw-text-2xl tw-text-center tw-mb-3">Verify your email</p>
                <p class="tw-text-md tw-text-center tw-mb-5">We have sent an email to <span class="tw-font-bold">sam@sit amet.com</span></p>
                <div class="tw-flex tw-justify-center tw-my-4">
                <InputOtp  v-model="value" integerOnly :length="5" class="tw-mb-6" >
                    <template #default="{ attrs, events }">
                        <InputText type="text" v-bind="attrs" v-on="events" class="tw-w-14 tw-h-14 tw-text-center tw-shadow-md" />
                    </template>
                </InputOtp>
                </div>
                <p class="tw-text-sm tw-text-center tw-mb-5">Didn’t receive the email yet? <span class="tw-text-[#6D8FFF]"> Resend</span></p>
                <div class="tw-flex tw-justify-center">
                    <Button severity="contrast" label="Verify" class="tw-w-[60%]" />
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
import Button from 'primevue/Button';
import Special from "@/components/Special.vue"
    export default {
        components: {
            Special,
            Card,
            InputOtp,
            Button,
            InputText
        },
        data() {
            return {
                value: null
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>