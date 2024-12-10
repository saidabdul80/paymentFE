<template>
  <div
    :class="` mb-7 tw-w-full ${showControls ? 'tw-grid tw-px-2 tw-grid-cols-1 tw-gap-3 md:tw-gap-0 md:tw-grid-cols-3' : 'tw-grid tw-grid-cols-1'}`">
    <div>
      <h4 :class="`tw-text-[${$constants.primary_text}] ${$constants.text_size.s5}`"
        class="tw-font-visby tw-font-black tw-text-2xl tw-uppercase">{{ header }}</h4>
      <div :class="`tw-text-[${$constants.dark}] ${$constants.text_size.s2}`"
        class="tw-font-visby tw-font-medium tw-tracking-wider ">{{ title }}</div>
    </div>

    <div v-if="showControls"
      class="tw-col-span-2 tw-place-content-end tw-flex md:tw-flex-wrap tw-flex-col md:tw-flex-row tw-items-center tw-gap-x-3 tw-w-[100%] tw-place-self-end">
      <div id="before-search" class="md:tw-w-auto tw-w-full lg:tw-my-0 tw-my-3 "></div>
      <div :class="{'md:tw-w-[50%]':showButton, 'tw-flex tw-w-full':true}" v-if="!hideSearch">
        <Search :options="searchOptions" :searchOptionsDropdown="searchOptionsDropdown" v-model="searchData" />
      </div>
      <div id="after-search" class="md:tw-w-auto tw-w-full lg:tw-my-0 tw-my-3 "></div>
      <div v-if="showButton" class="md:tw-w-auto tw-w-full tw-flex tw-gap-y-2 tw-flex-wrap md:tw-gap-y-0 tw-justify-between">
        <div v-if="config.dropdownItem.length == 0 && showButton">

          <v-btn v-if="enableParollButton"
            :class="`tw-bg-[${$constants.primary}]`"
            class="tw-h-fit tw-mr-2 tw-mb-1 md:tw-mb-0 tw-py-[8px] md:tw-w-auto sm:tw-w-[90%] tw-w-[100%] tw-rounded-md tw-font-visby tw-font-semibold tw-text-base tw-normal-case tw-text-white"
            @click="payrollButtonAction" :prepend-icon="lg ? '' : payrollIcon" @onClick="onClick">

            <span class="tw-pr-2" v-if="!lg"> {{ payrollButtonText }}</span>

            <v-icon v-else :size="23">{{ payrollIcon }}</v-icon>
          </v-btn>
          <v-btn v-if="enableIcon"
          :class="`tw-bg-[${$constants.primary}]`"
            class=" tw-h-fit tw-pr-2 tw-py-[8px] md:tw-w-auto sm:tw-w-[90%] tw-w-[100%] tw-rounded-md tw-font-visby tw-font-semibold tw-text-base tw-normal-case tw-text-white"
            @click="buttonAction" :prepend-icon="lg ? '' : icon">

            <span class="tw-pr-2" v-if="!lg"> {{ buttonText }}</span>

            <v-icon v-else :size="23">{{ icon }}</v-icon>
          </v-btn>

          <v-btn v-else
          :class="`tw-bg-[${$constants.primary_btn}] `"
            class=" tw-h-fit tw-py-[8px] md:tw-w-auto sm:tw-w-[90%] tw-w-[100%] tw-rounded-md tw-font-visby tw-font-semibold tw-text-base tw-normal-case tw-text-white"
            @click="buttonAction" :prepend-icon="icon">

            <span class="tw-pr-2"> {{ buttonText }}</span>

          </v-btn>
        </div>

        <div v-if="config.dropdownItem.length > 0 && showButton" class="md:tw-w-auto sm:tw-w-[90%] tw-w-[80%]">
          <v-tooltip v-if="config?.toolTipText != ''" activator="parent" class="tw-border" location="top">{{
            config?.toolTipText }}</v-tooltip>
          <DropdownButton @click="handleDropdownButton" :title="config?.dropDownLabel" prepend-icon="mdi-plus"
            :header="config?.header" :items="config?.dropdownItem" @onClick="onClick" />
        </div>

        <v-btn v-if="refresh" @click="$emit('refresh', true)" class="tw-ml-2" flat variant="outlined" size="small"
          :color="$constants.primary_btn" icon="ph-arrow-clockwise"></v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search.vue';
import DropdownButton from './DropdownButton.vue';
export default {
  name: 'FormsHeader',
  props: {
    config: {
      type: Object,
      default: {
        search: true,
        sideButton: true,
        header: '',
        toolTipText: '',
        dropDownLabel: '',
        dropdownItem: []
      }
    },
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
    showButton: {
      type: Boolean,
      default: true
    },
    payrollButtonText: {
      type: String,
      default: ''
    },
    buttonText: {
      type: String,
      default: 'Add New Role'
    },
    payrollIcon: {
      type: String,
      default: 'mdi-plus'
    },
    icon: {
      type: String,
      default: 'mdi-plus'
    },
    enableParollButton: {
      type: Boolean,
      default: false
    },
    enableIcon: {
      type: Boolean,
      default: false
    },
    payrollButtonAction: {
      type: Function,
      default: () => { }
    },
    buttonAction: {
      type: Function,
      default: () => { }
    },
    searchOptions: {
      type: Array,
      default: []
    },
    searchOptionsDropdown: {
      type: Object,
      default: {}
    },
    refresh: {
      type: Boolean,
      default: false
    },
    hideSearch: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    lg() { return this.$vuetify.display.lgAndDown }
  },
  data() {
    return {
      filter: 'Filter',
      searchInput: '',
      searchData: null,
      filters: ['Option 1', 'Option 2', 'Option 3'] // Example filter options
    };
  },
  methods: {
    onClick(value) {

      this.$emit('onClick', value)
    }
  },
  components: {
    Search,
    DropdownButton
  },
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
