<template>
  <Special>
    <div class="md:tw-max-w-md tw-w-[80%] tw-mx-auto tw-p-6 tw-bg-white tw-shadow-lg tw-rounded-lg">
      <h2 class="tw-text-2xl tw-font-bold tw-mb-6 tw-text-center">Create account</h2>
      <p class="tw-text-center tw-mb-4">
        Already have an account?
        <router-link to="/login" class="tw-text-blue-600 tw-underline">Login</router-link>
      </p>
      <div>
        <div class="tw-mb-3">
          <TextField v-model="form.business_name" label="Business Name" :error-messages="errors.business_name" />
        </div>
        <div class="tw-mb-3">
          <TextField v-model="form.email" label="Business Email Address" :error-messages="errors.email" type="email" />
        </div>
        <div class="tw-grid md:tw-grid-cols-2 tw-gap-4 tw-mb-3">
          <div>
            <TextField v-model="form.first_name" label="First Name" :error-messages="errors.first_name" />
          </div>
          <div>
            <TextField v-model="form.last_name" label="Last Name" :error-messages="errors.last_name" />
          </div>
        </div>
        <div class="tw-mb-3">
          <vue-tel-input
            :onlyCountries="['CA']"
            :dropdownOptions="{ showSearchBox: false, showFlags: true }"
            :inputOptions="{ showDialCode: true }"
            v-model="form.phone_number"
            mode="none"
            default-country="CA"
            ref="phoneInput"
            @validate="validatePhone"
            class="tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-px-3 tw-py-1"
            :class="{
              'tw-border-red-500':
                !isPhoneValid && form?.phone_number,
            }"
          ></vue-tel-input>
          <small v-if="errors.phone_number" class="tw-text-[#d13333]">{{ errors.phone_number }}</small>
        </div>
        <div class="tw-mb-3">
          <SelectField :options="['Canada']" v-model="form.location" label="Location/Country" :error-messages="errors.location" />
        </div>
        <div class="tw-mb-2 tw-w-full">
          <label class="tw-block tw-text-sm tw-font-medium tw-mb-1">Password</label>
          <Password :feedback="false" toggleMask v-model="form.password" fluid id="password" class="tw-w-full tw-rounded-lg" :class="{ 'p-invalid': errors.password }" />
          <small v-if="errors.password" class="tw-text-[#d13333]">{{ errors.password }}</small>
        </div>
        <div class="tw-flex tw-items-center tw-mb-2">
          <Checkbox id="terms" v-model="form.acceptTerms" :binary="true" required class="tw-mr-2" />
          <label for="terms" class="tw-text-sm">
            I have read and accepted the 
            <router-link to="/#terms" class="tw-text-blue-600 tw-underline">Terms & conditions</router-link>
            and
            <router-link to="/#data-processing" class="tw-text-blue-600 tw-underline">Data Processing Policy</router-link>
          </label>
        </div>
        <small class="tw-mb-4 tw-w-full tw-text-[#d13333]" v-if="errors.acceptTerms">{{ errors.acceptTerms }}</small>
        <v-btn @click="createAccount" type="submit" class="tw-w-full tw-bg-black tw-text-white tw-font-bold tw-px-4 tw-py-2 tw-rounded-lg">Create my account</v-btn>
      </div>
    </div>
  </Special>
</template>

<script>
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
import Special from "@/components/Special.vue";
import TextField from '@/components/TextField.vue';
import { useClient } from '@/stores/client';
import { useGlobalsStore } from '@/stores/globals';
import SelectField from '@/components/SelectField.vue';
import { VueTelInput } from "vue-tel-input";

export default {
  components: {
    Special,
    Password,
    Checkbox,
    TextField,
    SelectField,
    VueTelInput,
  },
  data() {
    return {
      global: useGlobalsStore(),
      form: {
        business_name: '',
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        location: 'Canada',
        password: '',
        acceptTerms: false,
      },
      errors: {},
      loading: false,
      isPhoneValid: true, // Add phone validation status
    };
  },
  methods: {
    async createAccount() {
      this.errors = {}; // Reset errors
      if (this.validateForm()) {
        this.loading = true;
        this.form.phone_number = this.form?.phone_number?.replaceAll(' ','')?.replaceAll('+','');
        const res = await useClient().http({ method: 'post', path: '/auth/register', data: this.form });
        if (res) {
          this.global.palert({
            title: 'Thank you for Joining CowrisPay',
            text: 'We have sent you an email',
            callback: async () => {
              this.$router.push('/login');
            },
          });
        }
        this.loading = false;
      }
    },
    validateForm() {
      let valid = true;
      const publicEmailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
      
      // Business Name Validation
      if (!this.form.business_name) {
        this.errors.business_name = 'Business Name is required';
        valid = false;
      }
      
      // Email Validation
      if (!this.form.email) {
        this.errors.email = 'Business Email Address is required';
        valid = false;
      } else if (!this.validEmail(this.form.email)) {
        this.errors.email = 'Invalid email address';
        valid = false;
      } else if (this.isPublicEmailDomain(this.form.email, publicEmailDomains)) {
        this.errors.email = 'Company email address is required';
        valid = false;
      }
      
      // First and Last Name Validation
      if (!this.form.first_name) {
        this.errors.first_name = 'First Name is required';
        valid = false;
      }
      if (!this.form.last_name) {
        this.errors.last_name = 'Last Name is required';
        valid = false;
      }
      
      // Phone Number Validation
      if (!this.form.phone_number) {
        this.errors.phone_number = 'Phone Number is required';
        valid = false;
      } else if (!this.isPhoneValid) {
        this.errors.phone_number = 'Invalid phone number format';
        valid = false;
      }
      
      // Password Validation
      if (!this.form.password) {
        this.errors.password = 'Password is required';
        valid = false;
      }
      
      // Terms Acceptance Validation
      if (!this.form.acceptTerms) {
        this.errors.acceptTerms = 'You must accept the terms and conditions';
        valid = false;
      }
      return valid;
    },
    validatePhone(isValid) {
      this.isPhoneValid = isValid;
    },
    validEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/i;
      return re.test(email);
    },
    isPublicEmailDomain(email, publicEmailDomains) {
      const domain = email.split('@')[1];
      return publicEmailDomains.includes(domain);
    },
  },
};
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>
