<template>
    <div class="tw-max-w-3xl tw-mx-auto tw-p-6 tw-bg-white tw-shadow-md tw-rounded-md">
      <h2 class="tw-text-2xl tw-font-semibold tw-text-gray-800 tw-mb-6">Add New User</h2>
      <form @submit.prevent="submitForm">
        <!-- Name Fields -->
        <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
          <div>
            <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">First Name</label>
            <InputText v-model="user.first_name" type="text" class="tw-mt-1 tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" />
          </div>
          <div>
            <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Middle Name</label>
            <InputText v-model="user.middle_name" type="text" class="tw-mt-1 tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" />
          </div>
          <div>
            <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Last Name</label>
            <InputText v-model="user.last_name" type="text" class="tw-mt-1 tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" />
          </div>
          <div>
            <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Nickname</label>
            <InputText v-model="user.nick_name" type="text" class="tw-mt-1 tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" />
          </div>
        </div>
  
        <!-- Company and Job Title -->
        <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4 tw-mt-4">
          <div>
            <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Company</label>
            <InputText v-model="user.company" type="text" class="tw-mt-1 tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" />
          </div>
          <div>
            <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Job Title</label>
            <InputText v-model="user.job_title" type="text" class="tw-mt-1 tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" />
          </div>
        </div>
  
        <!-- Contact Information -->
        <div class="tw-mt-4">
          <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Emails</label>
          <div v-for="(email, index) in user.emails" :key="index" class="tw-flex tw-mt-2 tw-space-x-2">
            <InputText v-model="email.email_id" type="email" class="tw-flex-1 tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" placeholder="Email" />
            <div class="tw-flex tw-items-center tw-space-x-2">
              <label class="tw-text-sm tw-font-medium tw-text-gray-700">Primary</label>
              <Checkbox :binary="true"  v-model="email.is_primary" class="tw-rounded tw-border-gray-400 tw-text-indigo-600 focus:tw-ring-indigo-500" />
            </div>
            <button type="button" @click="removeEmail(index)" class="tw-text-red-500 hover:tw-text-red-700">&times;</button>
          </div>
          <button type="button" @click="addEmail" class="tw-mt-2 tw-text-sm tw-text-indigo-600 hover:tw-underline">+ Add Email</button>
        </div>
  
        <div class="tw-mt-4">
          <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Phones</label>
          <div v-for="(phone, index) in user.phones" :key="index" class="tw-flex tw-mt-2 tw-space-x-2">
            <InputText v-model="phone.number" type="text" class="tw-flex-1 tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" placeholder="Phone Number" />
            <select v-model="phone.type" class="tw-block tw-w-1/3 tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm">
              <option value="mobile">Mobile</option>
              <option value="work">Work</option>
              <option value="home">Home</option>
            </select>
            <button type="button" @click="removePhone(index)" class="tw-text-red-500 hover:tw-text-red-700">&times;</button>
          </div>
          <button type="button" @click="addPhone" class="tw-mt-2 tw-text-sm tw-text-indigo-600 hover:tw-underline">+ Add Phone</button>
        </div>
  
        <!-- Address Information -->
        <div class="tw-mt-4">
          <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Address</label>
          <div v-for="(address, index) in user.address" :key="index" class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4 tw-mt-2">
            <InputText v-model="address.street_addr" type="text" placeholder="Street Address" class="tw-mt-1 tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" />
            <InputText v-model="address.street_addr1" type="text" placeholder="Street Address 1" class="tw-mt-1 tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" />
            <InputText v-model="address.city" type="text" placeholder="City" class="tw-mt-1 tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" />
            <InputText v-model="address.state" type="text" placeholder="State" class="tw-mt-1 tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" />
            <InputText v-model="address.postal_code" type="text" placeholder="Postal Code" class="tw-mt-1 tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" />
            <InputText v-model="address.country" type="text" placeholder="Country" class="tw-mt-1 tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" />
            <select v-model="address.type" class="tw-mt-1 tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm">
              <option value="home">Home</option>
              <option value="work">Work</option>
            </select>
            <button type="button" @click="removeAddress(index)" class="tw-mt-1 tw-text-red-500 hover:tw-text-red-700">&times;</button>
          </div>
          <button type="button" @click="addAddress" class="tw-mt-2 tw-text-sm tw-text-indigo-600 hover:tw-underline">+ Add Address</button>
        </div>
  
        <!-- Additional Information -->
        <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4 tw-mt-4">
          <div>
            <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Birth Year</label>
            <InputText v-model="user.birth_year" type="text" class="tw-mt-1 tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" />
          </div>
          <div>
            <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Birth Month</label>
            <InputText v-model="user.birth_month" type="text" class="tw-mt-1 tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" />
          </div>
          <div>
            <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Birth Day</label>
            <InputText v-model="user.birth_day" type="text" class="tw-mt-1 tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm" />
          </div>
        </div>
        <div class="tw-mt-4">
          <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Gender</label>
          <Select :options="['Male', 'Female']" v-model="user.gender"  />
        </div>
  
        <!-- Notes -->
        <div class="tw-mt-4">
          <label class="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Notes</label>
          <textarea v-model="user.notes" rows="3" class="tw-mt-1 tw-block tw-w-full tw-border-gray-400 tw-rounded-md tw-shadow-sm focus:tw-ring-indigo-500 focus:tw-border-indigo-500 sm:tw-text-sm"></textarea>
        </div>
  
        <!-- Submit Button -->
        <div class="tw-mt-6">
          <button type="submit" class="tw-px-4 tw-py-2 tw-bg-indigo-600 tw-text-white tw-rounded-md tw-shadow-sm hover:tw-bg-indigo-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-indigo-500">Add User</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
  export default {
    components: {
        InputText,
        Select,
        Checkbox
    },
    data() {
      return {
        user: {
          first_name: '',
          middle_name: '',
          last_name: '',
          nick_name: '',
          company: '',
          job_title: '',
          emails: [
            { email_id: '', is_primary: false }
          ],
          phones: [
            { number: '', type: 'mobile' }
          ],
          address: [
            {
              street_addr: '',
              street_addr1: '',
              city: '',
              state: '',
              postal_code: '',
              country: '',
              type: 'home'
            }
          ],
          birth_year: '',
          birth_month: '',
          birth_day: '',
          gender: 'M',
          notes: ''
        }
      };
    },
    methods: {
      addEmail() {
        this.user.emails.push({ email_id: '', is_primary: false });
      },
      removeEmail(index) {
        this.user.emails.splice(index, 1);
      },
      addPhone() {
        this.user.phones.push({ number: '', type: 'mobile' });
      },
      removePhone(index) {
        this.user.phones.splice(index, 1);
      },
      addAddress() {
        this.user.address.push({
          street_addr: '',
          street_addr1: '',
          city: '',
          state: '',
          postal_code: '',
          country: '',
          type: 'home'
        });
      },
      removeAddress(index) {
        this.user.address.splice(index, 1);
      },
      submitForm() {
        // Handle form submission
        console.log("User data submitted:", this.user);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any custom styling here if necessary */
  </style>
  