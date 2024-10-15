<template>
  <v-btn :variant="variant" elevation="1" :disabled="disabled" rounded="lg" size="large" :to="to"
    class="" height="40px" :style="{ width: width }">
    {{ title }}
  </v-btn>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true // title is a required prop
    },
    style: {
      default: {}
    },
    variant: {
      type: String,
      default: 'text' // 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      default: ''
    },
    to: ''
  }
}
</script>