<template>
  <v-btn 
    :variant="variant" 
    elevation="2"
    rounded="lg"
    size="large"
    :to="to"
    class="tw-px-6 tw-mx-2"
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
    style:{
      default:{}
    },
    variant: {
      type: String,
      default: '' // 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain'
    },
    to:''
  }
}
</script>