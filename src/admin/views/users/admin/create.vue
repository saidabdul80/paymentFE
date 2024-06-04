<template>
  <div class="tw-px-5">
    <div class="text-caption pa-2 mb-8">
            <h4 :class="`tw-text-[${$constants.primary}] ${$constants.text_size.s5}`" class="font-weight-bold">Administrator Registration</h4>
            <div :class="`tw-text-[${$constants.dark}] ${$constants.text_size.s2}`" class="">Follow the steps to register a new GIRS administrator.</div>
        </div>
       <Tab :tabs="tabs" :config="tabConfig">
        <template v-slot:PersonalDetails>
          <PersonalDetails />
        </template>
        <template v-slot:ContactInformation>
          <ContactInformation />
        </template>
     
      </Tab>
      </div>
</template>

<script>

import { useGlobalsStore } from '@/stores/globals';
import Tab from '@/components/tab.vue';
import PersonalDetails from './forms/PersonalDetails.vue'
import ContactInformation from './forms/ContactInformation.vue'
export default {
  components: {
    PersonalDetails,
    ContactInformation,
    Tab
  },
  data() {
    return {
      globals:useGlobalsStore(),
      tabs: [
        { name: 'Personal Details', key: 'PersonalDetails' },
        { name: 'Contact Information', key: 'ContactInformation' },
      ],
      tabConfig:{
      },
   
    };
  },
}
</script>