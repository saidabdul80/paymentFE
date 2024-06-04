<template>
    <v-container>
        <div class="text-caption pa-2 mb-8">
            <h4 class="text-h5 tw-text-green-700 font-weight-bold">ADMINISTRATOR REGISTRATION</h4>
            <div class="text-grey-darken-1 text-h6">Follow the Steps to register a new GIRS administrator.</div>
        </div>
        <v-card class="mx-auto">
            <v-card flat class="no-shadow">
                <AdministratorRegistrationForm />
            </v-card>
        </v-card>
    </v-container>
</template>

<script>
import AdministratorRegistrationForm from '../forms/AdministratorRegistrationForm.vue'

import { useGlobalsStore } from '@/stores/globals';

export default {
    data() {
        return {
            globals: useGlobalsStore().updateSubPageName("Add Admin"),
            step: 1 // Starting step
        }
    },
    components: {
        AdministratorRegistrationForm
    },
}
</script>

<style>
.no-shadow {
    box-shadow: none;
}
</style>