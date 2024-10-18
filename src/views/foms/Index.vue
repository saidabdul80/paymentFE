<template>
  <div class="tw-grid tw-grid-cols-3 tw-gap-4">
    <DashboardCard 
    v-for="x in 3"
    :balance="7820000"
    :previousBalance="3910000"
    :percentageChange="50"
    />
  </div>
  <div class="tw-grid sm:tw-grid-cols-5 tw-w-full tw-bg-white">
    <div class="sm:tw-col-span-2 tw-py-4">
      <nav class="tw-flex tw-flex-col tw-space-y-4 tw-pl-6" >
        <a
          v-for="tab in tabs"
          :key="tab.name"
          href="#"
          class="tw-flex tw-items-center tw-p-3 tw-rounded-md"
          :class="{'tw-bg-[#F6F8FA]': currentTab === tab.name, 'tw-text-gray-500': currentTab !== tab.name}"
          @click.prevent="setTab(tab.name)"
        >
          <div class="tw-flex tw-items-center tw-space-x-2">
            <div class="tw-p-3 tw-h-8 tw-w-8 tw-flex tw-items-center tw-text-center tw-rounded-full" :class="{'tw-bg-gray-600 !tw-text-white': currentTab === tab.name, 'tw-bg-white': currentTab !== tab.name}" >
              {{ tab.index }}
            </div>
            <span>{{ tab.label }}</span>
          </div>
        </a>
      </nav>
    </div>
    <div class="sm:tw-col-span-3 tw-p-10">
      <Transition>

        <Information v-if="currentTab == 'information'" v-model="form.information" />
        <Documents   v-else-if="currentTab == 'documents'" v-model="form.documents" />
        <Bussiness   v-else-if="currentTab == 'corporate'" v-model="form.bussiness" />
      </Transition>
      <button 
          type="submit" 
          :disabled="isSubmitting"
          class="tw-w-full tw-bg-gray-400 tw-text-white tw-font-bold tw-px-4 tw-py-2 tw-rounded-lg"
          :class="{'tw-opacity-50 tw-cursor-not-allowed': isSubmitting}"
        >
          Save and Continue
        </button>
    </div>
<Dialog header="Verification ongoing..." v-model:visible="showmodal" modal class="sm:tw-w-[25rem] tw-tw-[80%]">
 <!-- Close button -->
        <!-- <button @click="closeModal" class="tw-absolute tw-top-2 tw-right-2 tw-text-gray-500 hover:tw-text-gray-700">
          <span class="pi pi-times"></span>
        </button> -->

        <!-- Modal Header -->
        <!-- <div class="tw-px-6 tw-py-4 tw-text-center">
          <h2 class="tw-text-lg tw-font-semibold"></h2>
        </div> -->

        <!-- Modal Image -->
        <div class="tw-flex tw-items-center tw-justify-center tw-mt-4">
          <img src="@/assets/dd.svg" alt="Verification"  />
        </div>

        <!-- Modal Body -->
        <div class="tw-px-6 tw-py-4 tw-text-center">
          <p class="tw-font-semibold">Business details submitted!</p>
          <p class="tw-text-gray-600 tw-text-sm tw-mt-2">All details and documents have been successfully submitted. We will review and give you a feedback <strong>within 24 hours.</strong></p>
        </div>
        <div class="tw-px-6 tw-py-4 tw-text-center">
          <v-btn severity="contrast" @click="showmodal=false"  class="tw-w-full tw-bg-black tw-text-white tw-font-bold tw-px-4 tw-py-2 tw-rounded-lg">
            Alright!
          </v-btn>
        </div>

</Dialog>
   
  </div>
</template>

<script>
import Dialog from 'primevue/dialog';
import Bussiness from './Bussiness.vue';
import Documents from './Documents.vue';
import Information from './Information.vue';

import DashboardCard from '@/components/DashboardCard.vue';

export default {
  components: {
    Information,
    Documents,
    Bussiness,
    Dialog,
    DashboardCard
  },
  data() {
    return {
      showmodal:true,
      form:{
        information:{},
        documents:{},
        bussiness:{},
      },
      currentTab: 'information', // Set the initial active tab
      tabs: [
        { index: 1, name: 'information', label: 'Business Information' },
        { index: 2, name: 'documents', label: 'Business Registration Documents' },
        { index: 3, name: 'corporate', label: 'Corporate Representative' },
      ]
    };
  },
  computed: {
   
  },
  methods: {
    setTab(tab) {
      this.currentTab = tab; // Update the current tab
    },
    submitForm() {
      // Perform form submission logic here
    },
  },
};
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
