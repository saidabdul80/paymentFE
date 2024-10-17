<template>
<!--   <div v-if="isLoading" class="tw-fixed tw-w-full tw-h-full tw-bg-gray-200 tw-flex tw-items-center tw-justify-center tw-top-0 tw-z-[9000]">
    <div class="page-loader">
        <div class="loader-inner"></div>
        <div class="loader-image"></div>
    </div>
  </div> -->
  <NotificationRoot />
  <Alert v-show="globals.alert.show" :text="globals.alert?.text"  :icon="globals.alert?.icon" :title="globals.alert?.title" :confirmBtnText="globals.alert?.confirmBtnText"
  :cancelBtnText="globals.alert?.cancelBtnText" v-model="globals.alert.show" @confirm="handleAlert" :loading="globals.alert.loading" :img-path="globals.alert.imgpath" />
  <RouterView/>
</template>
<script setup>

import NotificationRoot from '@/components/notifications/NotificationRoot.vue';
import { useGlobalsStore } from '@/stores/globals';
import { RouterLink, RouterView } from "vue-router";
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import Alert from '@/components/Alert.vue';
const globals = useGlobalsStore()
</script>

<style>



</style>
