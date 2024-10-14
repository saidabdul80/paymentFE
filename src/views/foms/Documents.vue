<template>
    <div>
      <h2 class="tw-text-2xl tw-font-bold tw-mb-2">Business verification</h2>
      <p class="tw-mb-6">Kindly upload the following documents.</p>
      <div class="tw-mb-6">
        <Upload @file-selected="onFileUpload($event, 'registration')" title="CAC registration document" />
      </div>
      <div class="tw-mb-6">
        <Upload @file-selected="onFileUpload($event, 'statement')" title="Bank statement document" />
      </div>
    </div>
  </template>
  
  <script>
  import Upload from '@/components/Upload.vue';
  
  export default {
    props: ['modelValue'],
    components: {
      Upload
    },
    data() {
      return {
        internalValue: {
          registration: null,
          statement: null
        }
      };
    },
    methods: {
      onFileUpload(file, name) {
        this.internalValue[name] = file;
        this.$emit('update:modelValue', { ...this.internalValue });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styles if necessary */
  </style>
  