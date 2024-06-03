<template>
    <v-container>
        <v-card class="mx-auto">
            <div class="text-caption pa-2 mt-15">
                <h4 class="text-h5 tw-text-green-700 text-center font-weight-bold mb-5">
                    Follow the steps to create a new vendor
                </h4>
            </div>
            <v-stepper alt-labels hide-actions editable :items="tabs" class="tw-px-20 no-shadow ">
                <template v-slot:item.1>
                    <v-card flat>
                        <EnterVendorDetailsRegistration />
                    </v-card>
                </template>

                <template v-slot:item.2>
                    <v-card flat>
                        Verify Details
                    </v-card>
                </template>

                <template v-slot:item.3>
                    <v-card flat>
                        Finish
                    </v-card>
                </template>
            </v-stepper>
        </v-card>
    </v-container>
</template>

<script>
import EnterVendorDetailsRegistration from './EnterVendorDetailsRegistration.vue'
import { useGlobalsStore } from '@/stores/globals';

export default {
    data() {
        return {
            globals: useGlobalsStore(),
            step: 1,
            tabs: ['Enter Vendor Details', 'Verify Details', 'Finish']
        }
    },
    components: {
        EnterVendorDetailsRegistration
    },
}
</script>

<style>
.v-stepper-header {
    box-shadow: none;
    width: 80%;
    margin: 0 auto;
}

.v-divider {
    border: 1px solid #424242;
}

.v-stepper.v-sheet {
    box-shadow: none;
}
</style>