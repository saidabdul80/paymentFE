<template>
  <div class="tw-mr-4">
    <label :class="`tw-text-[${$constants.dark}]`">
      {{ outerLabel }}
    </label>
    <v-text-field :placeholder="placeholder" variant="outlined" prepend-icon="" :bg-color="$constants.input_background">
      <template v-slot:append>
        <span
          class="tw-p-4 tw-rounded-r-md tw-border tw-border-gray-400 tw-ml-[-18px]  tw-bg-[#CCDFD6] tw-text-green-900 cursor-pointer"
          @click="handleClick">
          {{ title }}
        </span>
      </template>
    </v-text-field>
  </div>
</template>

<script>
export default {
  // name: "VerifyInput",
  props: {
    outerLabel: {
      type: String,
      default: ''
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
  methods: {
    handleClick() {
      this.$emit('handleClick');
    }
  }
}
</script>
