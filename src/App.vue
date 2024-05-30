
<template>
  <div v-if="isLoading" class="tw-fixed tw-w-full tw-h-full tw-bg-gray-200 tw-flex tw-items-center tw-justify-center tw-top-0 tw-z-[9000]">
    <div class="page-loader">
        <div class="loader-inner"></div>
        <div class="loader-image"></div>
    </div>
  </div>
  <NotificationRoot />
  <RouterView />
</template>
<script setup>

import NotificationRoot from '@/components/notifications/NotificationRoot.vue';
import { useGlobalsStore } from './stores/globals';
import { RouterLink, RouterView } from "vue-router";
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
const globals = useGlobalsStore();
const isLoading = ref(false);

watch(() => globals.pageLoading, (newVal) => {
  isLoading.value = newVal;
});
</script>
