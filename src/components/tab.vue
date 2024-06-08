<template>
  <div class="lg:tw-flex lg:tw-justify-between tw-my-3">
    <v-tabs v-model="tab" :bg-color="mode == 'LIGHT' ? 'transparent' : '#FFF6'" class="tw-border-b">
      <v-tab v-for="(tab, index) in tabs" :color="$constants.dark" :value="index" class="tw-capitalize">
        {{ tab.name }}
      </v-tab>
    </v-tabs>

    <div class="lg:tw-flex lg:tw-w-[640px] lg:tw-gap-3 lg:tw-justify-between lg:tw-items-end " v-if="Object.keys(configData||{}).length>0">
      <Search class="tw-my-4 lg:tw-my-0" v-if="configData?.search" v-model="searchData" @update:filters="handleSearch" />
      <div class="tw-my-4 lg:tw-my-0" v-if="configData?.sideButton">
        <v-tooltip v-if="configData?.toolTipText != ''" activator="parent" class="tw-border" location="top">{{ configData?.toolTipText }}</v-tooltip>
        <DropdownButton @click="handleDropdownButton" :title="configData?.dropDownLabel" prepend-icon="mdi-plus"
          :header="configData?.header" :items="configData?.dropdownItem" />

      </div>
    </div>
  </div>

  <div class="tw-min-h-[240px] tw-rounded-lg"
    :class="`tw-text-[${$constants.dark}] tw-bg-[${$constants.light}]`">
    <v-tabs-window v-model="tab">
      <v-tabs-window-item v-for="(tab, n) in tabs" :key="n" :value="n">
        <div>
          <slot :name="tab?.key"></slot>

          <!-- Buttons to navigate through the provided tabs -->
          <v-row justify="center" class="tw-mb-10" v-if="showBottomNavigations">
            <Button v-if="n === 0" title="Cancel" variant="outlined" :class="`tw-text-[${$constants.primary}]`"
              @click="goBack" />
            <Button v-else title="Previous" variant="outlined" :class="`tw-text-[${$constants.primary}]`"
              @click="prevTab" />

            <Button v-if="n < tabs.length - 1" title="Proceed"
              :class="`tw-text-[${$constants.light}] tw-bg-[${$constants.primary}]`" @click.prevent="nextTab" />
            <Button v-else title="Finish" :class="`tw-text-[${$constants.light}] tw-bg-[${$constants.primary}]`"
              @click.prevent="saveData" />
          </v-row>

        </div>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>

  <v-spacer class="tw-my-10">&nbsp;</v-spacer>
</template>

<script>
import { useGlobalsStore } from '@/stores/globals';
import DropdownButton from '@/components/DropdownButton.vue';
import Search from '@/components/Search.vue';
import Button from '@/components/button/Button.vue';

export default {
  props: {
    config: {
      type: Object,
      default:{ 
        key: {
          search: true,
          sideButton: true,
          header:'',
          toolTipText: '',
          dropDownLabel: '',
          dropdownItem: {}
        }
      }
    },
    title: {
      type: String,
      required: true // title is a required prop
    },
    tabs: {
      default: [
        { name: 'Tab 1', key: 'tab1' },
        { name: 'Tab 2', key: 'tab2' },
        { name: 'Tab 3', key: 'tab3' },
        { name: 'Tab 4', key: 'tab4' },
        { name: 'Tab 5', key: 'tab5' },
      ]
    },
    // show or hide the bottom navigations
    showBottomNavigations: {
      type: Boolean,
      default: false
    },

    // universal method name for saving data
    saveData: {
      type: Function,
      default: ''
    },
  },
  data: () => ({    
    searchData: {
      search: '',
      filter: null
    },
    globals: useGlobalsStore(),
    tab: 0, 
    typingTimer: null,
    doneTypingInterval: 2000 
  }),
  computed: {
    mode() {
      return this.globals.mode;
    },
    configData() {
      return this.config[this.tabs[this.tab]?.key];
    }
  },
  components: {
    DropdownButton,
    Search,
    Button
  },
  methods: {
    handleSearch(data) {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => {        
        this.$emit('change', data);        
        this.globals.filters.search = data.search;        
      }, this.doneTypingInterval);      
    },
    handleDropdownButton(data) {
      this.$emit('change', data);
    },
    changeTab(index) {
      if (index >= 0 && index < this.tabs.length) {
        this.tab = index;
      }
    },
    //  move to the next tab
    nextTab() {
      if (this.tab < this.tabs.length - 1) {
        this.tab++;
      }
    },
    // move to previous tab
    prevTab() {
      if (this.tab > 0) {
        this.tab--;
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  }
 };
</script>