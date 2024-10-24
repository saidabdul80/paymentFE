<template>
  <div>
    <h2 class="tw-text-2xl tw-font-bold tw-mb-1">Business Verification</h2>
    <p class="tw-mb-6">Kindly provide the following information for review and verification.</p>
    <form @submit.prevent="submitForm" class="tw-grid md:tw-grid-cols-2 tw-gap-x-4">
      <div class="tw-mb-1">
        <TextField v-model="form.company_name" label="Company Name" :error-messages="errors.company_name"/>
      </div>
      <div class="tw-mb-1">
        <SelectField :options="businessTypes" v-model="form.business_type" label="Business Type" :error-messages="errors.business_type"/>
      </div>
      <div class="tw-mb-1">
        <TextField v-model="form.business_sector" label="Business Sector" :error-messages="errors.business_sector"/>
      </div>
      <div class="tw-mb-1">
        <TextField v-model="form.rc_number" label="RC Number" :error-messages="errors.rc_number"/>
      </div>
      <div class="tw-mb-1">
        <TextField v-model="form.company_email" label="Company Email" :error-messages="errors.company_email"/>
      </div>
      <div class="tw-mb-1">
        <TextField v-model="form.business_country" label="Business Country" :error-messages="errors.business_country"/>
      </div>
      <div class="tw-mb-1">
        <TextField v-model="form.business_state" label="Business State" :error-messages="errors.business_state"/>
      </div>
      <div class="tw-mb-1">
        <TextField v-model="form.business_address" label="Business Address" :error-messages="errors.business_address"/>
      </div>
      <div class="tw-mb-1">
        <TextField v-model="form.cac_document" label="CAC Document URL" :error-messages="errors.cac_document"/>
      </div>
      <div class="tw-mb-1">
        <TextField v-model="form.bank_statement" label="Bank Statement URL" :error-messages="errors.bank_statement"/>
      </div>
      <div class="tw-mb-1 md:tw-col-span-2">
        <v-btn type="submit" :loading="isSubmitting" class="tw-w-md tw-bg-black tw-text-white tw-py-2 tw-rounded">
          Submit
        </v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import SelectField from '@/components/SelectField.vue';
import TextField from '@/components/TextField.vue';
import ls from '@/services/ls';
import { useClient } from '@/stores/client';
import { useGlobalsStore } from '@/stores/globals';
import { useNotificationStore } from '@/stores/notification';

export default {
  components: {
    TextField,
    SelectField
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      businessTypes :[
          "Corporation",
          "Sole Proprietorship",
          " Limited",
          "Partnership",
          "LLC",
        ],
      user:ls.get('auth.user'),
      form: { ...this.modelValue, ...{company_name:ls.get('auth.user')?.business_name} }, // Initialize form with the modelValue prop
      isSubmitting: false, 
      errors: {},
      global: useGlobalsStore()
    };
  },
  watch: {
    modelValue: {
      handler(newValue) {
        this.form = { ...newValue };
      },
      deep: true,
    },
  },
  methods: {
    validateForm() {
      const errors = {};
      
      if (!this.form.company_name) errors.company_name = "Company Name is required.";
      if (!this.form.business_type) errors.business_type = "Business Type is required.";
      if (!this.form.business_sector) errors.business_sector = "Business Sector is required.";
      //if (!this.form.rc_number) errors.rc_number = "RC Number is required.";
      if (!this.form.company_email) errors.company_email = "Company Email is required.";
      if (!this.form.business_country) errors.business_country = "Business Country is required.";
      if (!this.form.business_state) errors.business_state = "Business State is required.";
      if (!this.form.business_address) errors.business_address = "Business Address is required.";
      //if (!this.form.cac_document) errors.cac_document = "CAC Document URL is required.";
      //if (!this.form.bank_statement) errors.bank_statement = "Bank Statement URL is required.";

      this.errors = errors;

      return Object.keys(errors).length === 0;
    },
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }

      this.isSubmitting = true; // Disable the button
      // Emit the updated form data to the parent component
      this.$emit('update:modelValue', this.form);
      const res = await useClient().http({
        method: 'post',
        path: '/clients/details',
        data: {...this.form, ...{company_name:this.user.business_name}}
      });
      if (res) {
        const notificationStore = useNotificationStore();
        notificationStore.showNotification({
          type: 'success',
          message: 'Form submitted successfully',
        });
      }

      this.isSubmitting = false; 
    },
  },
};
</script>

<style lang="scss" scoped>
/* Add any additional styles if necessary */
</style>
