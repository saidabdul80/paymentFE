<template>
  <v-btn 
    :variant="variant" 
    elevation="2"
    class="tw-px-10 tw-mx-1"
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