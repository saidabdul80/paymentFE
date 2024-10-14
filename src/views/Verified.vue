<template>
    <Special img="walk.svg">
        <div class="tw-flex tw-justify-center">
        <Card  style="width: 35%; overflow: hidden" class="tw-py-10">
            <template #content>
                <div class="tw-flex tw-flex-col tw-justify-center tw-items-center">
                    <img src="@/assets/ok.png"/>
                    <p class="tw-text-lg tw-mt-3 tw-font-bold">Email Verified. <a class="tw-underline tw-cursor-pointer">Proceed to Dasboard</a></p>
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