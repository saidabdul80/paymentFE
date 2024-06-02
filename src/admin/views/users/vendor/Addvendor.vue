<template>
    <v-container>
        <v-card class="mx-auto">
            <v-stepper alt-labels hide-actions editable :items="['Enter Vendor Details', 'Verify Details', 'Finish']"
                class="tw-px-20 no-shadow tw-pt-10 ">
                <template v-slot:item.1>
                    <v-card flat class="no-shadow">
                        <EnterVendorDetailsRegistration />
                    </v-card>
                </template>

                <template v-slot:item.2>
                    <v-card flat class="no-shadow">
                        Verify Details
                    </v-card>
                </template>

                <template v-slot:item.3>
                    <v-card flat class="no-shadow">
                        Finish
                    </v-card>
                </template>
            </v-stepper>
        </v-card>
    </v-container>
</template>

<script>
import EnterVendorDetailsRegistration from './forms/EnterVendorDetailsRegistration.vue'
import { useGlobalsStore } from '@/stores/globals';

export default {
    data() {
        return {
            globals: useGlobalsStore(),
            step: 1 // Starting step
        }
    },
    components: {
        EnterVendorDetailsRegistration
    },
}
</script>

<style>
.no-shadow {
    box-shadow: none;
}
</style>