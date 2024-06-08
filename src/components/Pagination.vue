<template>
    <div class="tw-flex tw-items-center tw-justify-between tw-bg-gray-50 tw-px-4 tw-py-1 sm:tw-rounded-lg" :class="`tw-text-[${$constants.secondary_light}]`">
      <div class="tw-flex tw-items-center">
        <span class="tw-text-sm tw-text-gray-700">Rows per page:</span>
        <select v-model="rowsPerPageX" @change="changeRowsPerPage" class="tw-ml-2 tw-block tw-px-3 tw-mt-1 tw-text-base tw-text-gray-700 tw-bg-white tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-indigo-500 tw-focus:border-indigo-500 sm:tw-text-sm">
          <option v-for="option in rowsPerPageOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
      <div class="tw-flex tw-items-center">
        <v-btn :disabled="links?.prev === null" @click="changePage(links?.prev)" :class="`tw-text-gray-600`" icon="mdi-chevron-left" size="small" class="tw-rounded-md tw-p-0" variant="none" flat>          
        </v-btn>
        <span class="tw-text-sm tw-text-gray-700">
          {{ currentPage }} of {{ totalPages }}
        </span>
        <v-btn :disabled="links?.next === null" @click="changePage(links?.next)" :class="`tw-text-gray-600`" icon="mdi-chevron-right" size="small" class="tw-rounded-md tw-p-0" variant="none" flat>          
        </v-btn>
      </div>
      <div class="tw-text-sm tw-text-gray-700">
        Showing {{ startRow }} to {{ endRow }} of {{ totalItems }}
      </div>
    </div> 
  </template>
  
  <script>
  import {useGlobalsStore} from "@/stores/globals"
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true,
      },
      totalPages: {
        type: Number,
        required: true,
      },
      rowsPerPage: {
        type: Number,
        required: true,
      },
      totalItems: {
        type: Number,
        required: true,
      },
      rowsPerPageOptions: {
        type: Array,
        default: () => [10, 25, 50, 100],
      },
      meta:{
        type:Object,
        default:{}
      },
      links:{
        type:Object,
        default:{}
      }
    },
    computed: {
      startRow() {
        return (this.currentPage - 1) * this.rowsPerPage + 1;
      },
      endRow() {
        return Math.min(this.currentPage * this.rowsPerPage, this.totalItems);
      },
    },
    data() {
        return {
            globals: useGlobalsStore(),
            rowsPerPageX:10
        }
    },
    created(){
        this.rowsPerPageX = this.rowsPerPage
    },
    methods: {
      changePage(path) {
        this.$emit('page-change', path);
      },
      changeRowsPerPage(event) {
        this.globals.filters.paginate = parseInt(event.target.value)
        this.$emit('rows-per-page-change', parseInt(event.target.value));
      },
    },
  };
  </script>
  
  <style scoped>
  /* Scoped styles if needed */
  </style>
  