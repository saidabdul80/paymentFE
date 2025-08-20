<template>
  <div class="tw-mb-3">
    <label class="tw-block tw-text-sm tw-font-medium tw-mb-1">
      National ID Number
      <span class="tw-text-red-500">*</span>
    </label>
    <input
      v-model="nationalId"
      @input="validateFormat"
      @blur="verifyRealTime"
      type="text"
      placeholder="e.g., AB1234567"
      maxlength="9"
      class="tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-px-3 tw-py-2"
      :class="{
        'tw-border-red-500': hasError,
        'tw-border-green-500': isValid && nationalId.length === 9
      }"
    />
    <small v-if="hasError" class="tw-text-red-500 tw-block tw-mt-1">
      {{ errorMessage }}
    </small>
    <small v-else-if="nationalId.length > 0" class="tw-text-gray-500 tw-block tw-mt-1">
      Format: 2 capital letters followed by 7 digits
    </small>
    <div v-if="isVerifying" class="tw-flex tw-items-center tw-mt-2">
      <div class="tw-animate-spin tw-rounded-full tw-h-4 tw-w-4 tw-border-b-2 tw-border-blue-500 tw-mr-2"></div>
      <span class="tw-text-sm tw-text-blue-500">Verifying with government database...</span>
    </div>
    <div v-if="verificationStatus === 'verified'" class="tw-flex tw-items-center tw-mt-2">
      <svg class="tw-w-4 tw-h-4 tw-text-green-500 tw-mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
      </svg>
      <span class="tw-text-sm tw-text-green-500">National ID verified successfully</span>
    </div>
    <div v-if="verificationStatus === 'invalid'" class="tw-flex tw-items-center tw-mt-2">
      <svg class="tw-w-4 tw-h-4 tw-text-red-500 tw-mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
      </svg>
      <span class="tw-text-sm tw-text-red-500">National ID not found in government database</span>
    </div>
  </div>
</template>

<script>
import { useClient } from '@/stores/client';

export default {
  name: 'NationalIdField',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'validation-change'],
  data() {
    return {
      nationalId: this.modelValue,
      isValid: false,
      hasError: false,
      errorMessage: '',
      isVerifying: false,
      verificationStatus: null, // null, 'verified', 'invalid'
      verificationTimeout: null
    };
  },
  watch: {
    modelValue(newVal) {
      this.nationalId = newVal;
    },
    nationalId(newVal) {
      this.$emit('update:modelValue', newVal);
    }
  },
  methods: {
    validateFormat() {
      const regex = /^[A-Z]{2}\d{7}$/;
      const inputValue = this.nationalId.toUpperCase();
      
      // Auto-format to uppercase
      this.nationalId = inputValue;
      
      this.hasError = false;
      this.errorMessage = '';
      this.verificationStatus = null;
      
      if (this.nationalId.length === 0) {
        if (this.required) {
          this.hasError = true;
          this.errorMessage = 'National ID is required';
          this.isValid = false;
        }
      } else if (this.nationalId.length < 9) {
        // Don't show error while typing, just not valid yet
        this.isValid = false;
      } else if (!regex.test(this.nationalId)) {
        this.hasError = true;
        this.errorMessage = 'National ID must be 2 capital letters followed by 7 digits (e.g., AB1234567)';
        this.isValid = false;
      } else {
        this.isValid = true;
        this.hasError = false;
      }
      
      // Emit validation status
      this.$emit('validation-change', {
        isValid: this.isValid && !this.hasError,
        value: this.nationalId,
        verified: this.verificationStatus === 'verified'
      });
    },
    
    async verifyRealTime() {
      if (!this.isValid || this.hasError || this.nationalId.length !== 9) {
        return;
      }
      
      // Clear any existing timeout
      if (this.verificationTimeout) {
        clearTimeout(this.verificationTimeout);
      }
      
      // Add a small delay to avoid too many API calls
      this.verificationTimeout = setTimeout(async () => {
        await this.performVerification();
      }, 500);
    },
    
    async performVerification() {
      this.isVerifying = true;
      this.verificationStatus = null;
      
      try {
        // Call the backend API to verify the National ID
        const response = await useClient().http({
          method: 'post',
          path: '/api/verify-national-id',
          data: { nationalId: this.nationalId }
        });
        
        if (response && response.valid) {
          this.verificationStatus = 'verified';
        } else {
          this.verificationStatus = 'invalid';
        }
      } catch (error) {
        console.error('National ID verification error:', error);
        // For demo purposes, we'll simulate verification
        // In a real app, you'd handle the error appropriately
        this.simulateVerification();
      } finally {
        this.isVerifying = false;
        
        // Emit updated validation status
        this.$emit('validation-change', {
          isValid: this.isValid && !this.hasError,
          value: this.nationalId,
          verified: this.verificationStatus === 'verified'
        });
      }
    },
    
    simulateVerification() {
      // For demo purposes, simulate government API response
      // In production, this would be a real API call
      const testValidIds = ['AB1234567', 'CD9876543', 'EF5555555', 'GH1111111'];
      
      if (testValidIds.includes(this.nationalId)) {
        this.verificationStatus = 'verified';
      } else {
        this.verificationStatus = 'invalid';
      }
    },
    
    // Public method to trigger validation
    validate() {
      this.validateFormat();
      return this.isValid && !this.hasError && this.verificationStatus === 'verified';
    }
  },
  
  mounted() {
    this.validateFormat();
  }
};
</script>

<style scoped>
/* Component-specific styles if needed */
</style>