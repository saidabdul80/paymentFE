<template>
  <div>
    <h2 class="tw-text-2xl tw-font-bold tw-mb-2">Business Verification</h2>
    <p class="tw-mb-6">Kindly provide the following information for review and verification.</p>
    <form @submit.prevent="submitForm" class="tw-grid md:tw-grid-cols-2 tw-gap-x-4">
      <div class="tw-mb-4">
        <TextField v-model="form.company_name" label="Company Name" required/>
      </div>
      <div class="tw-mb-4">
        <TextField v-model="form.business_type" label="Business Type" />
      </div>
      <div class="tw-mb-4">
        <TextField v-model="form.business_sector" label="Business Sector" />
      </div>
      <div class="tw-mb-4">
        <TextField v-model="form.rc_number" label="RC Number" />
      </div>
      <div class="tw-mb-4">
        <TextField v-model="form.company_email" label="Company Email" />
      </div>
      <div class="tw-mb-4">
        <TextField v-model="form.business_country" label="Business Country" />
      </div>
      <div class="tw-mb-4">
        <TextField v-model="form.business_state" label="Business State" />
      </div>
      <div class="tw-mb-4">
        <TextField v-model="form.business_address" label="Business Address" />
      </div>
      <div class="tw-mb-4">
        <TextField v-model="form.cac_document" label="CAC Document URL" />
      </div>
      <div class="tw-mb-4">
        <TextField v-model="form.bank_statement" label="Bank Statement URL" />
      </div>
      <div class="tw-mb-4 md:tw-col-span-2">
        <v-btn type="submit" :loading="isSubmitting" class="tw-w-full tw-bg-black tw-text-white tw-py-2 tw-rounded">
          Submit
        </v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import TextField from '@/components/TextField.vue';
import { useClient } from '@/stores/client';
import { useGlobalsStore } from '@/stores/globals';
import { useNotificationStore } from '@/stores/notification';

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
      isSubmitting: false, 
      global: useGlobalsStore()
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
   async submitForm() {
      this.isSubmitting = true; // Disable the button
      // Emit the updated form data to the parent component
      this.$emit('update:modelValue', this.form);
     const res = await useClient().http({
        method:'post',
        path:'/clients/details',
        data: this.global.objectToFormData(this.form)
      })
      if(res){
        const notificationStore = useNotificationStore();
            notificationStore.showNotification({
                type: 'success',
                message: '',
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
