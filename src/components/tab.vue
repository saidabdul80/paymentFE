<template>
  <div class="lg:tw-flex lg:tw-justify-between tw-my-3">

    <v-tabs v-model="tab" :bg-color="mode == 'LIGHT' ? 'transparent' : '#FFF6'" class="tw-border-b">
      <v-tab v-for="(tab, index) in tabs" :color="$constants.dark" :value="index" class="tw-capitalize">{{ tab.name
        }}</v-tab>
    </v-tabs>

    <div class="lg:tw-flex lg:tw-w-[640px] lg:tw-gap-3 lg:tw-justify-between lg:tw-items-end " v-if="Object.keys(configData||{}).length>0">
      <Search class="tw-my-4 md:tw-my-0" v-if="configData?.search" v-model="searchData" @change="$emit('change', searchData)" />
      <div class="tw-my-4 md:tw-my-0" v-if="configData?.sideButton">
        <v-tooltip v-if="configData?.toolTipText != ''" activator="parent" class="tw-border" location="top">{{ configData?.toolTipText }}</v-tooltip>
        <DropdownButton @click="handleDropdownButton" :title="configData?.dropDownLabel" prepend-icon="mdi-plus"
          header="CHOOSE TAXPAYER TYPE" :items="configData?.dropdownItem" />

      </div>
    </div>
  </div>
  <v-card class="tw-min-h-[240px]">
    <v-tabs-window v-model="tab">
      <v-tabs-window-item v-for="(tab, n) in tabs" :key="n" :value="n">
        <v-container fluid>
          <slot :name="tab?.key"></slot>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>

</template>
<script>
import { useGlobalsStore } from '@/stores/globals';

import DropdownButton from '@/components/DropdownButton.vue';
import Search from '@/components/Search.vue'
import { config } from '@vue/test-utils';

export default {
  props: {
    config: {
      type: Object,
      default:
      {
        key: {
          search: true,
          sideButton: true,
          toolTipText: '',
          dropDownLabel: '',
          dropdownItem: {}
        }
      },
    },
    dropDownLabel: {
      default: 'Add New Taxpayer'
    },
    dropdownTooltipText: {
      default: 'Add New Vendor'
    },
    tabs: {
      default: [
        { name: 'Tab 1', key: 'tab1' },
        { name: 'Tab 2', key: 'tab2' },
        { name: 'Tab 3', key: 'tab3' },
      ]
    }
  },
  data: () => ({
    searchData: {
      search: '',
      filter: null
    },
    globals: useGlobalsStore(),
    tab: {},
  }),
  computed: {
    mode() {
      return this.globals.mode
    },
    configData (){
      return this.config[this.tabs[this.tab]?.key]
    }
  },
  components: {
    DropdownButton,
    Search
  },
  methods: {
    handleDropdownButton(data) {
      this.$emit('change', data)
    },
  }
}
</script>
<!-- <style>
.grouped-div >div>div> .v-input__control{
  border-radius: 5px 0px ;
}
</style> -->