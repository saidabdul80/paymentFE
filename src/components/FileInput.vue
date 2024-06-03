<template>
  <div>
    <label :for="id" class="tw-block tw-text-sm tw-font-medium tw-leading-6"
        :class="`tw-text-[${$constants.danger}] tw-bg-[${$constants.danger}]/20`">
        {{ label }}
        <span v-if="isRequired" :class="`tw-text-red-600`">*</span>
    </label>
    <v-list> 
        <v-list-item to="" round :loading="isSelecting" @click="onButtonClick">
        {{placeholder}}
      </v-list-item>
    </v-list>
      <input 
        ref="uploader"
        class="d-none"
        type="file"
        accept="image/*"
        @change="onFileChanged">
    </div>
    
</template>

<script>
export default {
    name: 'TextField',
    emits: ['update:modelValue'],
    props: {
        multiple: {
            type: Boolean,
            default: false,
        },
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        autoComplete: {
            type: String,
            default: 'off',
        },
        placeholder: {
            type: String,
            default: '',
        },
        isRequired: {
            type: Boolean,
            default: false,
        },
        value: {
            type: String,
            default: '',
        },
        error_messages: {
            type: String,
        },
        type: {
            type: String,
            default: 'file',
        }
    },
    data: () => ({
    selectedFile: null,
    isSelecting: false
  }),
  computed: {
    buttonText() {
      return this.selectedFile ? this.selectedFile.name : this.defaultButtonText
    }
  },
  methods: {
    onButtonClick() {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true })

      this.$refs.uploader.click()
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0]
      
      // do something
    }
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
