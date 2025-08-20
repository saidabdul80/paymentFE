<template>
  <Special>
    <div class="md:tw-max-w-md tw-w-[80%] tw-mx-auto tw-p-6 tw-bg-white tw-shadow-lg tw-rounded-lg">
      <h2 class="tw-text-2xl tw-font-bold tw-mb-6 tw-text-center">UGCC Interest Registration</h2>
      <p class="tw-text-center tw-mb-4 tw-text-gray-600">
        Register your interest in joining the University of Guyana Computer Club
      </p>
      
      <form @submit.prevent="submitInterest">
        <!-- Personal Information -->
        <div class="tw-grid md:tw-grid-cols-2 tw-gap-4 tw-mb-3">
          <div>
            <TextField 
              v-model="form.first_name" 
              label="First Name" 
              :error-messages="errors.first_name" 
              required 
            />
          </div>
          <div>
            <TextField 
              v-model="form.last_name" 
              label="Last Name" 
              :error-messages="errors.last_name" 
              required 
            />
          </div>
        </div>
        
        <!-- National ID Validation Component -->
        <NationalIdField
          v-model="form.national_id"
          @validation-change="handleNationalIdValidation"
          :required="true"
        />
        <small v-if="errors.national_id" class="tw-text-red-500 tw-block tw-mt-1">
          {{ errors.national_id }}
        </small>
        
        <!-- Contact Information -->
        <div class="tw-mb-3">
          <TextField 
            v-model="form.email" 
            label="Email Address" 
            :error-messages="errors.email" 
            type="email" 
            required 
          />
        </div>
        
        <div class="tw-mb-3">
          <label class="tw-block tw-text-sm tw-font-medium tw-mb-1">
            Phone Number
            <span class="tw-text-red-500">*</span>
          </label>
          <vue-tel-input
            :onlyCountries="['GY']"
            :dropdownOptions="{ showSearchBox: false, showFlags: true }"
            :inputOptions="{ showDialCode: true }"
            v-model="form.phone"
            mode="none"
            default-country="GY"
            ref="phoneInput"
            @validate="validatePhone"
            class="tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-px-3 tw-py-1"
            :class="{
              'tw-border-red-500': !isPhoneValid && form?.phone,
            }"
          />
          <small v-if="errors.phone" class="tw-text-red-500">{{ errors.phone }}</small>
        </div>
        
        <!-- Interest Information -->
        <div class="tw-mb-3">
          <label class="tw-block tw-text-sm tw-font-medium tw-mb-1">
            Area of Interest
            <span class="tw-text-red-500">*</span>
          </label>
          <textarea
            v-model="form.interest"
            placeholder="Tell us about your interest in computer science, programming, technology, etc."
            class="tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-px-3 tw-py-2 tw-min-h-[100px]"
            :class="{ 'tw-border-red-500': errors.interest }"
          ></textarea>
          <small v-if="errors.interest" class="tw-text-red-500 tw-block tw-mt-1">
            {{ errors.interest }}
          </small>
        </div>
        
        <!-- Academic Information -->
        <div class="tw-mb-3">
          <SelectField 
            :options="academicLevels" 
            v-model="form.academic_level" 
            label="Academic Level" 
            :error-messages="errors.academic_level" 
          />
        </div>
        
        <div class="tw-mb-3">
          <TextField 
            v-model="form.field_of_study" 
            label="Field of Study (Optional)" 
            :error-messages="errors.field_of_study" 
          />
        </div>
        
        <!-- Experience Level -->
        <div class="tw-mb-3">
          <SelectField 
            :options="experienceLevels" 
            v-model="form.experience_level" 
            label="Programming Experience Level" 
            :error-messages="errors.experience_level" 
          />
        </div>
        
        <!-- Submit Button -->
        <v-btn 
          @click="submitInterest" 
          type="submit" 
          :loading="loading"
          :disabled="!canSubmit"
          class="tw-w-full tw-bg-blue-600 tw-text-white tw-font-bold tw-px-4 tw-py-2 tw-rounded-lg tw-mt-4"
        >
          {{ loading ? 'Registering Interest...' : 'Register Interest' }}
        </v-btn>
        
        <p class="tw-mt-4 tw-text-center tw-text-gray-600 tw-text-sm">
          By registering your interest, you agree to receive updates about UGCC activities and membership opportunities.
        </p>
        
        <p class="tw-mt-2 tw-text-center">
          Already a member?
          <router-link to="/ugcc/login" class="tw-text-blue-600 tw-underline">Login here</router-link>
        </p>
      </form>
    </div>
  </Special>
</template>

<script>
import Special from '@/components/Special.vue';
import TextField from '@/components/TextField.vue';
import SelectField from '@/components/SelectField.vue';
import NationalIdField from '@/components/NationalIdField.vue';
import { VueTelInput } from 'vue-tel-input';
import { useClient } from '@/stores/client';
import { useGlobalsStore } from '@/stores/globals';

export default {
  components: {
    Special,
    TextField,
    SelectField,
    NationalIdField,
    VueTelInput,
  },
  
  data() {
    return {
      global: useGlobalsStore(),
      form: {
        first_name: '',
        last_name: '',
        national_id: '',
        email: '',
        phone: '',
        interest: '',
        academic_level: '',
        field_of_study: '',
        experience_level: ''
      },
      errors: {},
      loading: false,
      isPhoneValid: true,
      nationalIdValidation: {
        isValid: false,
        verified: false
      },
      academicLevels: [
        'High School',
        'Foundation/Pre-University',
        'Undergraduate Year 1',
        'Undergraduate Year 2',
        'Undergraduate Year 3',
        'Undergraduate Year 4+',
        'Graduate/Masters',
        'PhD',
        'Working Professional',
        'Other'
      ],
      experienceLevels: [
        'Complete Beginner',
        'Some Basic Knowledge',
        'Intermediate',
        'Advanced',
        'Professional Developer'
      ]
    };
  },
  
  computed: {
    canSubmit() {
      return this.nationalIdValidation.isValid && 
             this.nationalIdValidation.verified && 
             this.form.first_name && 
             this.form.last_name && 
             this.form.email && 
             this.form.phone && 
             this.form.interest &&
             this.isPhoneValid;
    }
  },
  
  methods: {
    async submitInterest() {
      this.errors = {}; // Reset errors
      
      if (!this.validateForm()) {
        return;
      }
      
      this.loading = true;
      
      try {
        // Prepare the data for submission
        const payload = {
          ...this.form,
          phone: this.form.phone?.replaceAll(' ', '').replaceAll('+', '')
        };
        
        const response = await useClient().http({
          method: 'post',
          path: '/api/ugcc/interest',
          data: payload
        });
        
        if (response) {
          this.global.palert({
            title: 'Interest Registered Successfully!',
            text: 'Thank you for your interest in UGCC. We will contact you soon with more information about membership and upcoming activities.',
            callback: () => {
              this.$router.push('/ugcc/login');
            },
          });
        }
      } catch (error) {
        console.error('Error submitting interest:', error);
        this.global.palert({
          title: 'Registration Failed',
          text: 'There was an error registering your interest. Please try again.',
          type: 'error'
        });
      } finally {
        this.loading = false;
      }
    },
    
    validateForm() {
      let valid = true;
      
      // First and Last Name Validation
      if (!this.form.first_name) {
        this.errors.first_name = 'First Name is required';
        valid = false;
      }
      if (!this.form.last_name) {
        this.errors.last_name = 'Last Name is required';
        valid = false;
      }
      
      // National ID Validation
      if (!this.form.national_id) {
        this.errors.national_id = 'National ID is required';
        valid = false;
      } else if (!this.nationalIdValidation.isValid) {
        this.errors.national_id = 'Invalid National ID format';
        valid = false;
      } else if (!this.nationalIdValidation.verified) {
        this.errors.national_id = 'National ID must be verified';
        valid = false;
      }
      
      // Email Validation
      if (!this.form.email) {
        this.errors.email = 'Email Address is required';
        valid = false;
      } else if (!this.validEmail(this.form.email)) {
        this.errors.email = 'Invalid email address';
        valid = false;
      }
      
      // Phone Number Validation
      if (!this.form.phone) {
        this.errors.phone = 'Phone Number is required';
        valid = false;
      } else if (!this.isPhoneValid) {
        this.errors.phone = 'Invalid phone number format';
        valid = false;
      }
      
      // Interest Validation
      if (!this.form.interest) {
        this.errors.interest = 'Please tell us about your interest';
        valid = false;
      } else if (this.form.interest.length < 10) {
        this.errors.interest = 'Please provide more detail about your interest (at least 10 characters)';
        valid = false;
      }
      
      return valid;
    },
    
    validatePhone(isValid) {
      this.isPhoneValid = isValid;
    },
    
    validEmail(email) {
      const re = /^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@(([^<>()\\[\\]\\\\.,;:\\s@"]+\\.)+[^<>()\\[\\]\\\\.,;:\\s@"]{2,})$/i;
      return re.test(email);
    },
    
    handleNationalIdValidation(validation) {
      this.nationalIdValidation = validation;
    }
  }
};
</script>

<style scoped>
/* Component-specific styles if needed */
</style>