<template>
  <div>
    <h2 class="tw-text-2xl tw-font-bold tw-mb-1">Business Verification</h2>
    <p class="tw-mb-6">Kindly provide the following information for review and verification.</p>
    <form @submit.prevent="submitForm" class="tw-grid md:tw-grid-cols-2 tw-gap-x-4">
      <div class="tw-mb-1">
        <TextField v-model="form.entity_legal_name" label="Entity’s Legal Name" :error-messages="errors.entity_legal_name"/>
      </div>
      <div class="tw-mb-1">
        <TextField v-model="form.company_name" disabled label="Business Name" :error-messages="errors.company_name"/>
      </div>
      <div class="tw-mb-1">
        <SelectField :options="businessTypes" v-model="form.business_type" label="Business Type" :error-messages="errors.business_type"/>
      </div>
      <!-- <div class="tw-mb-1">
        <TextField v-model="form.business_sector" label="Business Sector" :error-messages="errors.business_sector"/>
      </div> -->
      <div class="tw-mb-1">
        <TextField v-model="form.rc_number" label="Business Number (BN)" :error-messages="errors.rc_number"/>
      </div>
      <div class="tw-mb-1">
        <TextField v-model="form.company_email" label="Company Email" :error-messages="errors.company_email"/>
      </div>
      <div class="tw-mb-1">
        <SelectField :options="['Canada']" v-model="form.business_country" label="Country of Operation" :error-messages="errors.business_country"/>
      </div>
      <div class="tw-mb-1">
        <SelectField :options="canadianProvincesAndTerritories" v-model="form.business_state" label="State / Province" :error-messages="errors.business_state"/>
      </div>
      <div class="tw-mb-1">
        <TextField v-model="form.business_address" label="Business Address" :error-messages="errors.business_address"/>
      </div>
      <div class="tw-mb-1">
        <TextField v-model="form.city" label="City" :error-messages="errors.city"/>
      </div>
      <div class="tw-mb-1">
        <TextField v-model="form.apt_unit" label="Apt / Unit" :error-messages="errors.apt_unit"/>
      </div>
      <div class="tw-mb-1">
        <TextField v-model="form.postal_zip_code" label="Postal / Zip Code" :error-messages="errors.postal_zip_code"/>
      </div>
      <div class="tw-mb-1">
        <TextField v-model="form.business_phone_number" label="Business Phone Number" :error-messages="errors.business_phone_number"/>
      </div>
      <div class="tw-mb-1">
        <SelectField :options="businessSectorOptions" v-model="form.business_sector" label="Business Sector" :error-messages="errors.business_sector"/>
      </div>
      <div class="tw-mb-1" v-if="form.business_sector === 'Others (Please Specify)'">
        <TextField v-model="form.other_business_sector" label="Please Specify" :error-messages="errors.other_business_sector"/>
      </div>
      <div class="tw-mb-1">
        <TextField v-model="form.company_website" label="Company Website" :error-messages="errors.company_website"/>
      </div>
      <div class="tw-mb-1 md:tw-col-span-2">
        <TextField v-model="form.company_description" label="Company Description" :error-messages="errors.company_description"/>
      </div>
      <div class="tw-mb-3">
        <Upload v-if="!fileLoading" v-model="form.cac_document" label="Corporation Letter" :error-messages="errors.cac_document"/>
        <v-btn v-else :loading="fileLoading" class="tw-bg-[#0003] tw-w-full tw-h-[38px]" flat></v-btn>
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
import Upload from '@/components/Upload.vue';
import ls from '@/services/ls';
import { useClient } from '@/stores/client';
import { useGlobalsStore } from '@/stores/globals';
import { useNotificationStore } from '@/stores/notification';

export default {
  components: {
    TextField,
    SelectField,
    Upload
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      canadianProvincesAndTerritories: [
        "Alberta",
        "British Columbia",
        "Manitoba",
        "New Brunswick",
        "Newfoundland and Labrador",
        "Northwest Territories",
        "Nova Scotia",
        "Nunavut",
        "Ontario",
        "Prince Edward Island",
        "Quebec",
        "Saskatchewan",
        "Yukon"
    ],
      businessTypes: [
        "Corporation",
        "Sole Proprietorship",
        "Limited",
        "Partnership",
        "LLC",
      ],
      businessSectorOptions: [
        "Fintech",
        "MSB",
        "Remittance",
        "Retail",
        "eCommerce",
        "Others (Please Specify)"
      ],
      user: ls.get('auth.user'),
      form: {},
      isSubmitting: false,
      errors: {},
      global: useGlobalsStore(),
      fileLoading: false
    };
  },
  created() {
    this.initializeForm();
  },
  watch: {
    modelValue: {
      handler(newValue) {
        const currentCompanyName = this.form.company_name;
        this.form = { 
          ...newValue,
          company_name: currentCompanyName || this.user?.business_name
        };
      },
      deep: true,
    },
    'form.cac_document': async function(newVal) {
      if (this.isUrl(this.form.cac_document)) {
        return;
      }
      if (!this.form.cac_document) {
        return;
      }

      this.fileLoading = true;

      setTimeout(async () => {
        const formData = new FormData();
        formData.append('file', this.form.cac_document);
        formData.append('folder', 'pg');
        const res = await useClient().http({ method: 'post', path: 'upload', data: formData });
        this.form.cac_document = res.url;
        this.fileLoading = false;
      }, 500);
    }
  },
  methods: {
    isUrl(file) {
      let url;
      try {
        url = new URL(file);
      } catch (_) {
        return false;  
      }
      return url.protocol === "http:" || url.protocol === "https:";
    },
    initializeForm() {
      this.form = {
        ...this.modelValue,
        company_name: this.user?.business_name
      };
    },
    validateForm() {
      const errors = {};

      if (!this.form.company_name) errors.company_name = "Company Name is required.";
      if (!this.form.entity_legal_name) errors.entity_legal_name = "Entity's Legal Name is required.";
      if (!this.form.business_type) errors.business_type = "Business Type is required.";
      if (!this.form.business_sector) errors.business_sector = "Business Sector is required.";
      if (!this.form.company_email) errors.company_email = "Company Email is required.";
      if (!this.form.business_country) errors.business_country = "Business Country is required.";
      if (!this.form.business_state) errors.business_state = "Business State is required.";
      if (!this.form.business_address) errors.business_address = "Business Address is required.";
      //if (!this.form.city) errors.city = "City is required.";
      //if (!this.form.apt_unit) errors.apt_unit = "Apt / Unit is required.";
      if (!this.form.postal_zip_code) errors.postal_zip_code = "Postal / Zip Code is required.";
      if (!this.form.business_phone_number) errors.business_phone_number = "Business Phone Number is required.";
      if (this.form.business_sector === 'Others (Please Specify)' && !this.form.other_business_sector) errors.other_business_sector = "Please specify the Business Sector.";
      if (!this.form.company_website) errors.company_website = "Company Website is required.";
      if (!this.form.company_description) errors.company_description = "Company Description is required.";
   

      this.errors = errors;
      return Object.keys(errors).length === 0;
    },
    async submitForm() {
      if (!this.validateForm()) return;

      this.isSubmitting = true;

      try {
        const response = await useClient().http({
          method: 'post',
          path: '/clients/details',
          data: {
            ...this.form,
            company_name: this.form.company_name || this.user?.business_name
          }
        });

        if (response) {
          const notification = useNotificationStore();
          notification.showSuccess("Business details updated successfully.");
        }
      } catch (error) {
        const notification = useNotificationStore();
        notification.showError("An error occurred while updating business details.");
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style scoped>
</style>


<!-- <template>
  <div>
    <h2 class="tw-text-2xl tw-font-bold tw-mb-1">Business Verification</h2>
    <p class="tw-mb-6">Kindly provide the following information for review and verification.</p>
    <form @submit.prevent="submitForm" class="tw-grid md:tw-grid-cols-2 tw-gap-x-4">
      <div class="tw-mb-1">
        <TextField v-model="form.company_name" disabled label="Business Name" :error-messages="errors.company_name"/>
      </div>
      <div class="tw-mb-1">
        <SelectField :options="businessTypes" v-model="form.business_type" label="Business Type" :error-messages="errors.business_type"/>
      </div>
      <div class="tw-mb-1">
        <TextField v-model="form.business_sector" label="Business Sector" :error-messages="errors.business_sector"/>
      </div>
      <div class="tw-mb-1">
        <TextField v-model="form.rc_number" label="Business Number (BN)" :error-messages="errors.rc_number"/>
      </div>
      <div class="tw-mb-1">
        <TextField v-model="form.company_email" label="Company Email" :error-messages="errors.company_email"/>
      </div>
      <div class="tw-mb-1">
        <TextField v-model="form.business_country" label="Country of Operation" :error-messages="errors.business_country"/>
      </div>
      <div class="tw-mb-1">
        <TextField v-model="form.business_state" label="State / Province" :error-messages="errors.business_state"/>
      </div>
      <div class="tw-mb-1">
        <TextField v-model="form.business_address" label="Business Address" :error-messages="errors.business_address"/>
      </div>
      <div class="tw-mb-3">
        <Upload v-if="!fileLoading" v-model="form.cac_document" label="Corporation Letter" :error-messages="errors.cac_document"/>
        <v-btn  v-else :loading="fileLoading"  class="tw-bg-[#0003] tw-w-full tw-h-[38px]" flat ></v-btn>
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
import Upload from '@/components/Upload.vue';
import ls from '@/services/ls';
import { useClient } from '@/stores/client';
import { useGlobalsStore } from '@/stores/globals';
import { useNotificationStore } from '@/stores/notification';

export default {
  components: {
    TextField,
    SelectField,
    Upload
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      businessTypes: [
        "Corporation",
        "Sole Proprietorship",
        "Limited",
        "Partnership",
        "LLC",
      ],
      user: ls.get('auth.user'),
      form: {},
      isSubmitting: false,
      errors: {},
      global: useGlobalsStore(),
      fileLoading:false
    };
  },
  created() {
    // Initialize form with both modelValue and user's business name
    this.initializeForm();
  },
  watch: {
    modelValue: {
      handler(newValue) {
        // Preserve the company name when model value changes
        const currentCompanyName = this.form.company_name;
        this.form = { 
          ...newValue,
          company_name: currentCompanyName || this.user?.business_name
        };
      },
      deep: true,
    },
    'form.cac_document':async function(newVal){
      if(this.isUrl(this.form.cac_document)){
        return;
      }
      if(!this.form.cac_document){
          return;
        }
        
      this.fileLoading = true;

      setTimeout(async()=>{
        const formData =  new FormData()
     
        formData.append('file',this.form.cac_document);
        formData.append('folder','pg');
        const res = await useClient().http({method:'post',path:'upload',data:formData})
        this.form.cac_document = res.url;
        this.fileLoading = false;
      },500)
    }
  },
  methods: {
    isUrl(file) {
        let url;
        try {
            url = new URL(file);
        } catch (_) {
            return false;  
        }

        return url.protocol === "http:" || url.protocol === "https:";
    },
    initializeForm() {
      this.form = {
        ...this.modelValue,
        company_name: this.user?.business_name
      };
    },
    validateForm() {
      const errors = {};
      
      if (!this.form.company_name) errors.company_name = "Company Name is required.";
      if (!this.form.business_type) errors.business_type = "Business Type is required.";
      if (!this.form.business_sector) errors.business_sector = "Business Sector is required.";
      if (!this.form.company_email) errors.company_email = "Company Email is required.";
      if (!this.form.business_country) errors.business_country = "Business Country is required.";
      if (!this.form.business_state) errors.business_state = "Business State is required.";
      if (!this.form.business_address) errors.business_address = "Business Address is required.";
      //if (!this.form.rc_number) errors.rc_number = "RC Number is required.";
      //if (!this.form.cac_document) errors.cac_document = "CAC Document URL is required.";
      //if (!this.form.bank_statement) errors.bank_statement = "Bank Statement URL is required.";

      this.errors = errors;
      return Object.keys(errors).length === 0;
    },
    async submitForm() {
      if (!this.validateForm()) return;

      this.isSubmitting = true;
      
      try {
        const response = await useClient().http({
          method: 'post',
          path: '/clients/details',
          data: {
            ...this.form,
            company_name: this.form.company_name || this.user?.business_name
          }
        });

        if (response) {
          const notificationStore = useNotificationStore();
          notificationStore.showNotification({
            type: 'success',
            message: 'Form submitted successfully',
          });
          
          // Update the modelValue after successful submission
          this.$emit('update:modelValue', this.form);
        }
      } catch (error) {
        const notificationStore = useNotificationStore();
        notificationStore.showNotification({
          type: 'error',
          message: 'Failed to submit form',
        });
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/* Add any additional styles if necessary */
</style> -->
