<template>
  <v-btn 
    :variant="variant" 
    elevation="2"
    rounded="lg"
    size="large"
    class="tw-px-6 tw-mx-1"
  >
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
    variant: {
      type: String,
      default: '' // 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain'
    },
  }
}
</script>