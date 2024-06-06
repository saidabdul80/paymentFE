<template>
  <label class="tw-block tw-text-sm tw-font-medium tw-leading-6" :class="`tw-text-[${$constants.dark}]`">
    {{ outerLabel }}
  </label>
  <v-file-input :placeholder="placeholder" prepend-icon="" show-size >
    <template v-slot:append>
      <span class="tw-p-4 tw-rounded-r-md tw-m-[-17px]"
        :class="`tw-text-[${$constants.light}], tw-bg-[${$constants.primary_light}]`">
        {{ title }}
      </span>
    </template>
  </v-file-input>
</template>

<script>
export default {
  name: "FileUpInput",
  props: {
    outerLabel: {
      type: String,
      default: 'fgdfg',
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