<template>
    <div>
      <h2 class="tw-text-2xl tw-font-bold tw-mb-2">Payment Settings</h2>
      <p class="tw-mb-6">Kindly provide the following payment-related information.</p>
      <form @submit.prevent="submitForm" class="tw-grid md:tw-grid-cols-2 tw-gap-x-4">
        <div class="tw-mb-4">
          <TextField v-model="form.webhook_url" label="Webhook URL" />
        </div>
        <div class="tw-mb-4">
          <TextField v-model="form.security_question" label="Security Question" />
        </div>
        <div class="tw-mb-4">
          <TextField v-model="form.security_answer" label="Security Answer" />
        </div>
        <div class="tw-mb-4">
          <TextField v-model="form.payment_email" label="Payment Email" />
        </div>
        <div class="tw-mb-4">
          <TextField v-model="form.notification_email" label="Notification Email" />
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
        async submitForm() {
      this.isSubmitting = true; // Disable the button
      // Emit the updated form data to the parent component
      this.$emit('update:modelValue', this.form);
     const res = await useClient().http({
        method:'post',
        path:'/clients/details/payment-info',
        data:this.form
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
  