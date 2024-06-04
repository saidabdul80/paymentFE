<template>
    <div :class="`tw-flex tw-h-full tw-p-0 tw-w-full`">
        <v-layout class="rounded rounded-md" :color="$constants.light">
            <v-app-bar flat :color="$constants.light" class="tw-shadow-md" height="70">
                <v-toolbar-title>
                    <img v-if="mode === 'LIGHT'" class="tw-w-40 tw-h-auto" src="@/assets/logo-full-color.png" alt="" />
                    <img v-else class="tw-w-40 tw-h-auto" src="@/assets/logo-full-white.png" alt="" />
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-switch v-model="mode" @change="toggleMode" class="tw-text-sm tw-w-[150px]"
                    :class="mode === 'LIGHT' ? 'tw-text-green-900' : 'tw-text-gray-500'"
                    :color="mode === 'LIGHT' ? $constants.success : 'gray-500'" :label="`${mode}`" false-value="DARK"
                    true-value="LIGHT" hide-details>
                    <template v-slot:prepend>
                        <v-icon icon="mdi-white-balance-sunny"></v-icon>
                    </template>
                </v-switch>
            </v-app-bar>
            <v-main style="height:100vh;"
                :class="`tw-bg-[${mode === 'LIGHT' ? $constants.light : $constants.secondary}]`">
                <BreadCrumbs />
                <router-view></router-view>
            </v-main>
        </v-layout>
    </div>
</template>

<script>
import { RouterView } from "vue-router";
import ls from "@/services/ls";
import { useConstantsStore } from '@/stores/constants';

import BreadCrumbs  from '@/components/BreadCrumbs.vue' 

export default {
    name: 'AuthTopBar',
    components: {
        RouterView,
        BreadCrumbs
    },
    computed: {
        mode() {
            return this.constantsStore.mode;
        },
        constantsStore() {
            return useConstantsStore();
        },
    },
    created() {
        const savedMode = ls.get('mode');
        if (savedMode) {
            this.constantsStore.setMode(savedMode);
        }
    },
    methods: {
        toggleMode() {
            this.constantsStore.toggleMode();
            ls.set('mode', this.constantsStore.mode);
        }
    }
}
</script>

<style scoped></style>
