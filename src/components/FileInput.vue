<template>
  <div class="tw-mr-4">
    <label :class="`tw-text-[${$constants.dark}]`">
      {{ outerLabel }}
    </label>
    <v-file-input :placeholder="placeholder" variant="outlined" prepend-icon="" :bg-color="$constants.input_background"
      show-size>
      <template v-slot:append>
        <span
          class="tw-p-4 tw-rounded-r-md tw-border tw-border-gray-400 tw-ml-[-18px] tw-bg-[#CCDFD6] tw-text-green-900"
          variant="outlined">
          {{ title }}
        </span>
      </template>
    </v-file-input>
  </div>
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
  }
}
</script>