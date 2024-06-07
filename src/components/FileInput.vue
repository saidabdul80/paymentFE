<template>
  <label :class="`tw-text-[${$constants.dark}]`">
    {{ outerLabel }}
  </label>
  <v-file-input v-model="file" @change="handleFileChange" :placeholder="placeholder" variant="outlined" prepend-icon=""
    :bg-color="$constants.input_background" show-size>
    <template v-slot:append>
      <span class="tw-p-4 tw-rounded-r-md tw-border tw-border-gray-400 tw-ml-[-18px] tw-bg-[#CCDFD6] tw-text-green-900"
        variant="outlined">
        {{ title }}
      </span>
    </template>
  </v-file-input>
  <!-- <div>
    <label :for="id" class="tw-block tw-text-sm tw-font-medium tw-leading-6"
        :class="`tw-text-[${$constants.secondary}] tw-bg-[${$constants.danger}]/20`">
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
  </div> -->

</template>

<script>
export default {
  name: "FileInput",

  props: {
    outerLabel: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      file: null
    }
  },

  methods: {
    handleFileChange() {
      if (this.file) {
        const fileName = this.file.name;
        this.$emit('file-selected', fileName);
      }
    }
  }
}
</script>