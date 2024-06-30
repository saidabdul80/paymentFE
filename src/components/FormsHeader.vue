<template>
  <div
    :class="`tw-px-2 mb-7 tw-w-[98%] ${showControls ? 'tw-grid tw-grid-cols-1 tw-gap-3 md:tw-gap-0 md:tw-grid-cols-2' : 'tw-grid tw-grid-cols-1'}`">
    <div>
      <h4 :class="`tw-text-[${$constants.primary}] ${$constants.text_size.s5}`"
        class="tw-font-visby tw-font-black tw-text-2xl tw-uppercase">{{ header }}</h4>
      <div :class="`tw-text-[${$constants.dark}] ${$constants.text_size.s2}`"
        class="tw-font-visby tw-font-medium tw-tracking-wider ">{{ title }}</div>
    </div>

    <div v-if="showControls" class="tw-flex tw-flex-wrap tw-items-center tw-gap-x-3 tw-w-[100%] tw-self-center">
      <Search :options="searchOptions" class="tw-my-4 lg:tw-my-0"  v-model="searchData"  />
      <v-btn
        class="tw-bg-gray-700 tw-h-fit tw-py-[8px] tw-rounded-lg tw-font-visby tw-font-semibold tw-text-base tw-normal-case tw-text-white"
        @click="buttonAction" prepend-icon="mdi-plus">
        {{ buttonText }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search.vue';
export default {
  name: 'FormsHeader',
  props: {
    header: {
      type: String,
      default: 'tax-collecting vendor registration'
    },
    title: {
      type: String,
      default: 'Follow the steps to register a new vendor.'
    },
    showControls: {
      type: Boolean,
      default: false
    },
    buttonText: {
      type: String,
      default: 'gray Role'
    },
    buttonAction: {
      type: Function,
      default: () => { }
    },
    searchOptions:{
      type:Array,
      default:[]
    }
  },
  data() {
    return {
      filter: 'Filter',
      searchInput: '',
      searchData:null,
      filters: ['Option 1', 'Option 2', 'Option 3'] // Example filter options
    };
  },
  components: {
    Search,
  },
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
