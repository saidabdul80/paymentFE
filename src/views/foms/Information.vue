<template>
    <div>
      <h2 class="tw-text-2xl tw-font-bold tw-mb-2">Business Verification</h2>
      <p class="tw-mb-6">Kindly provide the following information for review and verification.</p>
      <form @submit.prevent="submitForm">
        <div class="tw-mb-4">
          <TextField v-model="form.companyName" label="Company Name" />
        </div>
        <div class="tw-mb-4">
          <TextField v-model="form.businessType" label="Business Type" />
        </div>
        <div class="tw-mb-4">
          <TextField v-model="form.businessSector" label="Business Sector" />
        </div>
        <div class="tw-mb-4">
          <TextField v-model="form.rcNumber" label="RC Number" />
        </div>
        <div class="tw-mb-4">
          <TextField v-model="form.companyEmail" label="Company Email" />
        </div>
        <div class="tw-mb-4">
          <TextField v-model="form.businessCountry" label="Business Country" />
        </div>
        <div class="tw-mb-4">
          <TextField v-model="form.businessState" label="Business State" />
        </div>
        <div class="tw-mb-4">
          <TextField v-model="form.businessAddress" label="Business Address" />
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import TextField from '@/components/TextField.vue'; 
  
  export default {
    components: {
      TextField,
    },
    props: {
      modelValue: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        form: { ...this.modelValue }, // Initialize form with the modelValue prop
        isSubmitting: false, // To manage button state during submission
      };
    },
    watch: {
      // Watch for changes in modelValue prop and update local form data
      modelValue: {
        handler(newValue) {
          this.form = { ...newValue };
        },
        deep: true,
      },
    },
    methods: {
      submitForm() {
        this.isSubmitting = true; // Disable the button
        // Emit the updated form data to the parent component
        this.$emit('update:modelValue', this.form);
  
        // Simulate an API call with a timeout for demonstration
        setTimeout(() => {
          console.log('Form submitted:', this.form);
          this.isSubmitting = false; // Re-enable the button after submission
        }, 2000);
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  /* Add any additional styles if necessary */
  </style>
  