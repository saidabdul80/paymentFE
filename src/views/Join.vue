<template>
  <Special>
      <div class="md:tw-max-w-md tw-w-[80%] tw-mx-auto tw-p-6 tw-bg-white tw-shadow-lg tw-rounded-lg">
        <h2 class="tw-text-2xl tw-font-bold tw-mb-6 tw-text-center">Create account</h2>
        <p class="tw-text-center tw-mb-4">
          Already have an account?
          <router-link to="/login" class="tw-text-blue-600 tw-underline">Login</router-link>
        </p>
        <form @submit.prevent="createAccount">
          <div class="tw-mb-4">
            <label for="businessName" class="tw-block tw-text-sm tw-font-medium tw-mb-1">Business Name</label>
            <InputText id="businessName" v-model="form.business_name" type="text" class="tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-px-3 tw-py-2" required />
          </div>
          <div class="tw-mb-4">
            <label for="location" class="tw-block tw-text-sm tw-font-medium tw-mb-1">Business Email Address</label>
            <InputText id="location" v-model="form.email" type="email" class="tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-px-3 tw-py-2" required />
          </div>
          <div class="tw-grid md:tw-grid-cols-2 tw-gap-4 tw-mb-4">
            <div class="">
              <label for="firstName" class="tw-block tw-text-sm tw-font-medium tw-mb-1">First Name</label>
              <InputText id="firstName" v-model="form.first_name" type="text" class="tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-px-3 tw-py-2" required />
            </div>
            <div class="">
              <label for="lastName" class="tw-block tw-text-sm tw-font-medium tw-mb-1">Last Name</label>
              <InputText id="lastName" v-model="form.last_name" type="text" class="tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-px-3 tw-py-2" required />
            </div>
          </div>
          <div class="tw-mb-4">
            <label for="phoneNumber" class="tw-block tw-text-sm tw-font-medium tw-mb-1">Phone Number</label>
            <InputText id="phoneNumber" v-model="form.phone_number" type="text" class="tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-px-3 tw-py-2" required />
          </div>
          <div class="tw-mb-4 tw-w-full">
            <label for="password" class="tw-block tw-text-sm tw-font-medium tw-mb-1">Enter Password</label>
            <Password v-model="form.password" fluid id="password" class=" tw-w-full  tw-rounded-lg" required />
          </div>
          <div class="tw-mb-4 tw-flex tw-items-center">
            <Checkbox  id="terms" v-model="form.acceptTerms" :binary="true" required class="tw-mr-2"  />
            <label for="terms" class="tw-text-sm">
              I have read and accepted the 
              <router-link to="/terms" class="tw-text-blue-600 tw-underline">Terms & conditions</router-link>
              and
              <router-link to="/data-processing" class="tw-text-blue-600 tw-underline">Data Processing Policy</router-link>
            </label>
          </div>
          <v-btn type="submit" class="tw-w-full tw-bg-black tw-text-white tw-font-bold tw-px-4 tw-py-2 tw-rounded-lg">Create my account</v-btn>
        </form>
      </div>
  </Special>
  </template>
  
  <script>


    import Password from 'primevue/password';
    import Button from 'primevue/Button';
  import InputText from 'primevue/inputtext';
  import Checkbox from 'primevue/checkbox';
  import Special from "@/components/Special.vue"
import { useClient } from '@/stores/client';
import { useGlobalsStore } from '@/stores/globals';



  export default {
    components: {
        Special,
        Password,
        InputText,
        Checkbox,
        Button
    },
    data() {
      return {
        global:useGlobalsStore(),
        form: {
          acceptTerms: false,
        },
      };
    },
    methods: {
      async createAccount() {
        this.loading = true
        const res = useClient().http({method:'post',path:'/auth/register', data:this.form})
        if(res){
          this.global.palert({
            title: 'Thank you for Joining CowrisPay',
            text: 'We have sent you an email',
            callback: async () => {
            
            },
          });
        }
        this.loading = false
        // Perform account creation logic here
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styles if necessary */
  </style>
  