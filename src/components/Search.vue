<template>
  <!-- <v-btn size="small" :icon="toggleFilter ? 'ph ph-sort-ascending' : 'ph ph-sort-descending'" @click="sortTable()"
    flat></v-btn> -->

  <v-row class="tw-flex tw-items-center tw-m-0 tw-shadow-sm tw-bg-transparent tw-rounded-[5px]">
    <v-select v-model="globals.filter" :items="[...options]" placeholder="Filter"  variant="none"
      density="compact" hide-details
      class="tw-rounded-r-[0px] tw-border-y-2 tw-h-[44px] tw-max-w-[100px] md:tw-max-w-[auto] md:tw-w-[45%] tw-border-x-2 tw-rounded-l-[5px] lg:tw-w-[30%]"
      :class="`tw-bg-[${$constants.secondary_light}]`" @update:modelValue="emitFilters">
      <template v-slot:selection="{ item, index }">
        <v-label>
          <span class="tw-capitalize tw-truncate tw-w-[70px]">{{ item.raw.replace('_', ' ') }}</span>
        </v-label>
        <!-- {{ globals.filter }}</span> -->
      </template>
      <template v-slot:item="{ props, item }">
        <v-list-item v-bind="props" :title="item.raw.replace('_', ' ')">
          <template #title>
            <span class="tw-capitalize">{{ item.raw.replace('_', ' ') }}</span>
          </template>
        </v-list-item>
      </template>
    </v-select>
    <div id="searchWrapper" tabindex="0" class="lg:tw-w-[70%] tw-w-[55%]"> 
    <div v-if="!Object.keys(searchOptionsDropdown)?.includes(globals.filter)" class="lg:tw-w-full">
      
        <div  v-if="globals.filter?.includes('date')" class="tw-rounded-r-[5px] tw-h-[44px] tw-bg-white tw-border-y-2 tw-border-r-2 tw-border-l-0 tw-rounded-l-[0px] lg:tw-w-full">
          <PDate class="tw-w-full" :noborder="true"  v-model="searchInput" height="38px"  @change="emitFilters"  />
        </div>
      <v-text-field v-else variant="none" placeholder="Search" v-model="searchInput" prepend-inner-icon="mdi-magnify"
        density="compact" hide-details
        class="tw-rounded-r-[5px] tw-bg-white tw-border-y-2 tw-border-r-2 tw-border-l-0 tw-rounded-l-[0px] lg:tw-w-full"
         @keydown.enter="handleSearch"  />
    </div>
    <v-select v-else v-model="searchInput" @update:modelValue="emitFilters" :items="searchOptionsDropdown[globals.filter]"
      variant="none" density="compact" hide-details
      class="tw-rounded-r-[5px]  tw-h-[44px] tw-bg-white tw-border-y-2 tw-border-r-2 tw-border-l-0 tw-rounded-l-[0px] lg:tw-w-full"
      :class="`tw-bg-[${$constants.secondary_light}]`" />
    </div>
  </v-row>
 
</template>

<script>
import { useGlobalsStore } from '@/stores/globals';
import { useNotificationStore } from '@/stores/notification';
import SelectFilter from './SelectFilter.vue';
import PDate from './PDate.vue';
import Dialog from './dialog/Dialog.vue';


import PSelect from './PSelect.vue';
import PInput from './PInput.vue';
export default {
  components: {
    SelectFilter,
    Dialog,
    PSelect,
    PInput,
    PDate
  },
  props: {
    options: {
      type: Array,
      default: []
    },
    searchOptionsDropdown: {
      type: Object,
      default: {}
    }

  },
  data() {
    return {
     // filter: 'search', // Initialize the filter model
      searchInput: '', // Initialize the search input model            
      globals: useGlobalsStore(),
      notificationStore: useNotificationStore(),
      typingTimer: null,
      doneTypingInterval: 2000,

      regions: {},
      toggleFilter: false,
      objfilter: {},
      revenueOptionsDialog: false,
      //sources:mdas.mda
    };
  },
  watch: {
    'globals.filter': function (n, o) {
      if (n !== o) {
        this.searchInput = '';
      }
    }
  },
  methods: {
    emitFilters() {
      if (this.searchInput != null && this.searchInput != '') {
        this.globals.filters = {};
        this.globals.filters[this.globals.filter] = this.searchInput;
      }
    },
    sortTable() {
      this.toggleFilter = !this.toggleFilter
      this.globals.filters['sort'] = this.toggleFilter ? 'asc' : 'desc'
    },
    handleFilter() {
      const filters = {}
      Object.keys(this.objfilter).forEach(key => {
        filters[key] = this.objfilter[key];
      });
      this.globals.filters = filters;
    },
    handleSearch() {
      this.globals.filters[this.globals.filter] = this.searchInput;
      // clearTimeout(this.typingTimer);
      // Object.keys(this.globals.filters).forEach(key=>{
      //   this.globals.filters[key] = ''
      // });
      // this.typingTimer = setTimeout(() => {
      //   if (this.globals.filter != null && this.globals.filter != '') {
      //     this.globals.filters = {};
      //     this.globals.filters[this.globals.filter] = this.searchInput;
      //   } else {
      //     this.globals.filters['search'] = this.searchInput;
      //     // this.notificationStore.showNotification({
      //     //   type: 'info',
      //     //   message: 'Click filter to select an option.',
      //     // });
      //   }
      // }, this.doneTypingInterval);
    },
  },
  mounted(){
    
    this.$nextTick(()=>{
      this.globals.filter = 'search';
      document.getElementById('searchWrapper').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          //console.log('Enter key pressed!');
          // Perform your action here
        }
      });
    })

  }
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>