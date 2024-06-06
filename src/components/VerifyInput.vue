<template>
  <div class="tw-mr-4">
    <label class="tw-block tw-text-sm tw-font-medium tw-leading-6" :class="`tw-text-[${$constants.dark}]`">
      {{ outerLabel }}
    </label>
    <v-text-field :placeholder="placeholder" prepend-icon="">
      <template v-slot:append>
        <span class="tw-p-4 tw-rounded-r-md tw-m-[-17px] cursor-pointer"
          :class="`tw-text-[${$constants.light}], tw-bg-[${$constants.primary_light}]`" @click="handleClick">
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
