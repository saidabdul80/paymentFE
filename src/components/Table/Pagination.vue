<template>
  <div class="tw-flex tw-items-center tw-justify-between tw-bg-gray-50 tw-px-4 tw-py-1 sm:tw-rounded-lg" >
    <!-- <div class="tw-flex tw-items-center">
      <span class="tw-text-sm tw-text-gray-700">Rows per page:</span>
      <select v-model="rowsPerPageX" @change="changeRowsPerPage" class="tw-ml-2 tw-block tw-px-3 tw-mt-1 tw-text-base tw-text-gray-700 tw-bg-white tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-indigo-500 tw-focus:border-indigo-500 sm:tw-text-sm">
        <option v-for="(option,i) in rowsPerPageOptions" :key="i" :value="option">{{ option }}</option>
      </select>
    </div> -->
    <div class="tw-flex tw-items-center">
     
    </div>
    <div class="tw-text-sm tw-text-gray-700">
       {{ startRow }} - {{ endRow }} of {{ totalItems }}
      <Button severity="contrast" rounded="sm" outlined :disabled="links?.prev === null" @click="changePage(links?.prev)" icon="pi pi-chevron-left" size="small" class="!tw-rounded-md !tw-h-[30px] !tw-w-[30px] !tw-border-gray-400 tw-me-2"  >          
        <template #icon>
          <PhCaretLeft/>
        </template>
      </Button>
     
      <Button severity="contrast" rounded="sm" outlined :disabled="links?.next === null" @click="changePage(links?.next)"  icon="pi pi-chevron-right" size="small" class="!tw-rounded-md !tw-h-[30px] !tw-w-[30px] !tw-border-gray-400 tw-p-0"  >          
        <template  #icon>
        <PhCaretRight/>
        </template>
      </Button>
    </div>
  </div> 
</template>

<script>
import { PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue';
import Button from 'primevue/Button';

//import {useGlobalsStore} from "@/store/globals"
//import Button from "../Button.vue"

export default {
  components: {
   Button,
   PhCaretLeft,
   PhCaretRight
  },
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
          // globals: useGlobalsStore(),
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
      //this.globals.filters.paginate = parseInt(event.target.value)
      this.$emit('rows-per-page-change', parseInt(event.target.value));
    },
  },
};
</script>

<style scoped>
/* Scoped styles if needed */
</style>
