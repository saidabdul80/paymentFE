<template>
    <div class="tw-max-w-3xl tw-mx-auto tw-p-6 tw-bg-white tw-shadow-md tw-rounded-md">
      <h2 class="tw-text-2xl tw-font-semibold tw-text-gray-800 tw-mb-6">Add New User</h2>
      <form @submit.prevent="submitForm">
        <!-- Salutation -->
        <div>
          <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Salutation</label>
          <Select v-model="user.Salutation" :options="['Mr.', 'Mrs.', 'Ms.']" class="tw-mt-1 tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" />
        </div>
  
        <!-- Name Fields -->
        <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4 tw-mt-4">
          <div>
            <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">First Name</label>
            <InputText v-model="user.First_Name" type="text" class="tw-mt-1 tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" />
          </div>
          <div>
            <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Last Name</label>
            <InputText v-model="user.Last_Name" type="text" class="tw-mt-1 tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" />
          </div>
        </div>
  
        <!-- Contact Information -->
        <div class="tw-mt-4">
          <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Primary Email</label>
          <InputText v-model="user.Email" type="email" class="tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" placeholder="Primary Email" />
        </div>
  
        <div class="tw-mt-4">
          <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Secondary Email</label>
          <InputText v-model="user.Secondary_Email" type="email" class="tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" placeholder="Secondary Email" />
        </div>
  
        <!-- Phone Numbers -->
        <div class="tw-mt-4">
          <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Phone</label>
          <InputText v-model="user.Phone" type="text" class="tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" placeholder="Phone" />
        </div>
        
        <div class="tw-mt-4">
          <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Mobile</label>
          <InputText v-model="user.Mobile" type="text" class="tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" placeholder="Mobile" />
        </div>
  
        <div class="tw-mt-4">
          <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Home Phone</label>
          <InputText v-model="user.Home_Phone" type="text" class="tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" placeholder="Home Phone" />
        </div>
  
        <div class="tw-mt-4">
          <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Other Phone</label>
          <InputText v-model="user.Other_Phone" type="text" class="tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" placeholder="Other Phone" />
        </div>
  
        <!-- Address Information -->
        <div class="tw-mt-4">
          <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Other Street</label>
          <InputText v-model="user.Other_Street" type="text" class="tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" placeholder="Street Address" />
        </div>
  
        <div class="tw-mt-4">
          <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Other State</label>
          <InputText v-model="user.Other_State" type="text" class="tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" placeholder="State" />
        </div>
  
        <!-- Date of Birth -->
        <div class="tw-mt-4">
          <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Date of Birth</label>
          <InputText v-model="user.Date_of_Birth" type="date" class="tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" />
        </div>
  
        <!-- Notes -->
        <div class="tw-mt-4">
          <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Title</label>
          <InputText v-model="user.Title" type="text" class="tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" placeholder="Title" />
        </div>
  
        <div class="tw-mt-4">
          <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Description</label>
          <textarea v-model="user.Description" rows="3" class="tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" placeholder="Description"></textarea>
        </div>
  
        <!-- Submit Button -->
        <div class="tw-mt-6">
          <v-btn :loading="loading" type="submit" class="tw-px-4 tw-py-2 tw-bg-indigo-600 tw-text-white tw-rounded-md tw-shadow-sm hover:tw-bg-indigo-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-indigo-500">Add User</v-btn>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { useZohoStore } from '@/stores/zohoStore';
import Checkbox from 'primevue/checkbox';
  import InputText from 'primevue/inputtext';
  import Select from 'primevue/select';
  const User = {
          Salutation: '',
          First_Name: '',
          Last_Name: '',
          Email: '',
          Secondary_Email: '',
          Phone: '',
          Mobile: '',
          Home_Phone: '',
          Other_Phone: '',
          Other_Street: '',
          Other_State: '',
          Date_of_Birth: '',
          Title: '',
          Description: ''
        };
  export default {
    components: {
      InputText,
      Select,
      Checkbox
    },
    data() {
      return {
        user: {
          Salutation: '',
          First_Name: '',
          Last_Name: '',
          Email: '',
          Secondary_Email: '',
          Phone: '',
          Mobile: '',
          Home_Phone: '',
          Other_Phone: '',
          Other_Street: '',
          Other_State: '',
          Date_of_Birth: '',
          Title: '',
          Description: '',
          Owner:{"id": 1},
          api_name: "data"
        },
        loading:false,
        zohoStore: useZohoStore()
      };
    },
    methods: {
      async submitForm() {
        this.loading = true
        const res =await this.zohoStore.createContact(this.user);
        if(res){
            this.$emit('done',{value:res?.Full_Name})
            this.user = User;
        }
        this.loading = false
      }
    }
  };
  </script>
  