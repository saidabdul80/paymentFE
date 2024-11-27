<template>
  <div class="tw-bg-black tw-min-h-[100vh] tw-relative">
    <br />
    <br />
    <br />
    <br />
    <br />
    <div
      class="tw-w-full tw-grid md:tw-grid-cols-3 tw-pt-4 tw-items-center tw-pb-5 tw-grid-cols-1"
    >
      <a @click="$router.push('/')" class="tw-text-white tw-underline">Back to Homepage</a>
      
      <div></div>
    </div>
    <slot />
    <div v-if="img==''">
        <br />
        <br />
        <br />
    </div>
    <div v-else class="tw-h-[250px] tw-hidden md:tw-flex tw-place-content-end tw-w-full tw-text-white">
        <img :src="resolvedImg" />
    </div>
    <Footer class="tw-absolute tw-bottom-0" />
  </div>
</template>
<script>
import Footer from "@/components/Footer.vue";

export default {
  props: {
    img: {
      type: String,
      default: '',
    },
  },
  data() {
  
  },
  computed: {
    resolvedImg () {    
        if (this.img) {
          const path = new URL('@/assets/', import.meta.url);
          return `${path}/${this.img}`
      }
      return '';
    },
  },
  components: {
    Footer,
  },
};
</script>
