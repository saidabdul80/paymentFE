<template>
  <Special>
    <div class="md:tw-max-w-lg tw-w-[90%] tw-mx-auto tw-p-6 tw-bg-white tw-shadow-lg tw-rounded-lg">
      <div class="tw-text-center tw-mb-6">
        <h2 class="tw-text-2xl tw-font-bold tw-mb-2">UGCC Member Registration</h2>
        <p class="tw-text-gray-600">Join the University of Guyana Computer Club</p>
      </div>
      
      <form @submit.prevent="register">
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
        
        <!-- National ID Validation -->
        <NationalIdField
          v-model="form.national_id"
          @validation-change="handleNationalIdValidation"
          :required="true"
        />
        <small v-if="errors.national_id" class="tw-text-red-500 tw-block tw-mt-1">
          {{ errors.national_id }}
        </small>
        
        <!-- Account Information -->
        <div class="tw-mb-3">
          <TextField 
            v-model="form.username" 
            label="Username" 
            :error-messages="errors.username" 
            placeholder="Choose a unique username"
            required 
          />
        </div>
        
        <div class="tw-mb-3">
          <TextField 
            v-model="form.email" 
            label="Email Address" 
            :error-messages="errors.email" 
            type="email" 
            required 
          />
        </div>
        
        <!-- Password Fields -->
        <div class="tw-mb-3">
          <label class="tw-block tw-text-sm tw-font-medium tw-mb-1">
            Password
            <span class="tw-text-red-500">*</span>
          </label>
          <Password 
            :feedback="true" 
            toggleMask 
            v-model="form.password" 
            fluid 
            id="password" 
            class="tw-w-full tw-rounded-lg" 
            :class="{ 'p-invalid': errors.password }" 
          />
          <small v-if="errors.password" class="tw-text-red-500">{{ errors.password }}</small>
        </div>
        
        <div class="tw-mb-3">
          <label class="tw-block tw-text-sm tw-font-medium tw-mb-1">
            Confirm Password
            <span class="tw-text-red-500">*</span>
          </label>
          <Password 
            :feedback="false" 
            toggleMask 
            v-model="form.password_confirmation" 
            fluid 
            id="password_confirmation" 
            class="tw-w-full tw-rounded-lg" 
            :class="{ 'p-invalid': errors.password_confirmation }" 
          />
          <small v-if="errors.password_confirmation" class="tw-text-red-500">{{ errors.password_confirmation }}</small>
        </div>
        
        <!-- Contact Information -->
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
        
        <!-- Academic Information -->
        <div class="tw-mb-3">
          <SelectField 
            :options="academicLevels" 
            v-model="form.academic_level" 
            label="Academic Level" 
            :error-messages="errors.academic_level" 
            required
          />
        </div>
        
        <div class="tw-mb-3">
          <TextField 
            v-model="form.field_of_study" 
            label="Field of Study" 
            :error-messages="errors.field_of_study" 
            placeholder="e.g., Computer Science, Information Technology"
          />
        </div>
        
        <!-- Skills and Experience -->
        <div class="tw-mb-3">
          <SelectField 
            :options="experienceLevels" 
            v-model="form.experience_level" 
            label="Programming Experience Level" 
            :error-messages="errors.experience_level" 
            required
          />
        </div>
        
        <div class="tw-mb-3">
          <label class="tw-block tw-text-sm tw-font-medium tw-mb-1">
            Skills & Interests
          </label>
          <textarea
            v-model="form.bio"
            placeholder="Tell us about your programming skills, technologies you're interested in, projects you've worked on, etc."
            class="tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-px-3 tw-py-2 tw-min-h-[100px]"
            :class="{ 'tw-border-red-500': errors.bio }"
          ></textarea>
          <small v-if="errors.bio" class="tw-text-red-500 tw-block tw-mt-1">
            {{ errors.bio }}
          </small>
        </div>
        
        <!-- Terms and Conditions -->
        <div class="tw-flex tw-items-start tw-mb-4">
          <Checkbox 
            v-model="form.acceptTerms" 
            inputId="acceptTerms" 
            class="tw-mr-2 tw-mt-1"
            :class="{ 'p-invalid': errors.acceptTerms }"
          />
          <label for="acceptTerms" class="tw-text-sm tw-text-gray-700">
            I agree to the UGCC 
            <a href="#" class="tw-text-blue-600 tw-underline">Terms and Conditions</a>
            and 
            <a href="#" class="tw-text-blue-600 tw-underline">Privacy Policy</a>
            <span class="tw-text-red-500">*</span>
          </label>
        </div>
        <small v-if="errors.acceptTerms" class="tw-text-red-500 tw-block tw-mb-3">
          {{ errors.acceptTerms }}
        </small>
        
        <!-- Submit Button -->
        <v-btn 
          @click="register" 
          type="submit" 
          :loading="loading"
          :disabled="!canSubmit"
          class="tw-w-full tw-bg-blue-600 tw-text-white tw-font-bold tw-px-4 tw-py-2 tw-rounded-lg tw-mb-4"
        >
          {{ loading ? 'Creating Account...' : 'Create Member Account' }}
        </v-btn>
        
        <!-- Alternative Actions -->
        <div class="tw-text-center tw-space-y-2">
          <p class="tw-text-gray-600">
            Already have an account?
            <router-link to="/ugcc/login" class="tw-text-blue-600 tw-underline">
              Login here
            </router-link>
          </p>
          <p class="tw-text-gray-600">
            Just want to show interest?
            <router-link to="/ugcc/interest" class="tw-text-blue-600 tw-underline">
              Register Your Interest
            </router-link>
          </p>
        </div>
        
        <!-- Back to Main Site -->
        <div class="tw-text-center tw-mt-6 tw-pt-4 tw-border-t tw-border-gray-200">
          <router-link to="/" class="tw-text-sm tw-text-gray-500 tw-underline">
            ← Back to Main Site
          </router-link>
        </div>
      </form>
    </div>
  </Special>
</template>

<script>
import Special from '@/components/Special.vue';
import TextField from '@/components/TextField.vue';
import SelectField from '@/components/SelectField.vue';
import NationalIdField from '@/components/NationalIdField.vue';
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
import { VueTelInput } from 'vue-tel-input';
import { useClient } from '@/stores/client';
import { useGlobalsStore } from '@/stores/globals';

export default {
  components: {
    Special,
    TextField,
    SelectField,
    NationalIdField,
    Password,
    Checkbox,
    VueTelInput,
  },
  
  data() {
    return {
      global: useGlobalsStore(),
      form: {
        first_name: '',
        last_name: '',
        national_id: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        academic_level: '',
        field_of_study: '',
        experience_level: '',
        bio: '',
        acceptTerms: false
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
             this.form.username &&
             this.form.email && 
             this.form.password &&
             this.form.password_confirmation &&
             this.form.phone && 
             this.form.academic_level &&
             this.form.experience_level &&
             this.form.acceptTerms &&
             this.isPhoneValid;
    }
  },
  
  methods: {
    async register() {
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
          path: '/api/ugcc/register',
          data: payload
        });
        
        if (response) {
          this.global.palert({
            title: 'Welcome to UGCC!',
            text: 'Your member account has been created successfully. Please check your email for verification instructions.',
            callback: () => {
              this.$router.push('/ugcc/login');
            },
          });
        }
      } catch (error) {
        console.error('Registration error:', error);
        
        // Handle validation errors
        if (error.response?.data?.errors) {
          this.errors = error.response.data.errors;
        } else if (error.response?.data?.message) {
          this.global.palert({
            title: 'Registration Failed',
            text: error.response.data.message,
            type: 'error'
          });
        } else {
          this.global.palert({
            title: 'Registration Failed',
            text: 'There was an error creating your account. Please try again.',
            type: 'error'
          });
        }
      } finally {
        this.loading = false;
      }
    },
    
    validateForm() {
      let valid = true;
      
      // Personal Information
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
      
      // Account Information
      if (!this.form.username) {
        this.errors.username = 'Username is required';
        valid = false;
      } else if (this.form.username.length < 3) {
        this.errors.username = 'Username must be at least 3 characters';
        valid = false;
      }
      
      if (!this.form.email) {
        this.errors.email = 'Email Address is required';
        valid = false;
      } else if (!this.validEmail(this.form.email)) {
        this.errors.email = 'Invalid email address';
        valid = false;
      }
      
      // Password Validation
      if (!this.form.password) {
        this.errors.password = 'Password is required';
        valid = false;
      } else if (this.form.password.length < 8) {
        this.errors.password = 'Password must be at least 8 characters';
        valid = false;
      }
      
      if (!this.form.password_confirmation) {
        this.errors.password_confirmation = 'Please confirm your password';
        valid = false;
      } else if (this.form.password !== this.form.password_confirmation) {
        this.errors.password_confirmation = 'Passwords do not match';
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
      
      // Academic Information
      if (!this.form.academic_level) {
        this.errors.academic_level = 'Please select your academic level';
        valid = false;
      }
      
      if (!this.form.experience_level) {
        this.errors.experience_level = 'Please select your experience level';
        valid = false;
      }
      
      // Terms Acceptance
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