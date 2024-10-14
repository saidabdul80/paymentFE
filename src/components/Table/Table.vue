<template>
  <div
    class="tw-bg-white tw-overflow-x-auto  tw-border-[#e6eaee] tw-rounded-[5px]">
    <div
      v-if="!loading"
      class="table-shadow-sm tw-rounded-[5px] tw-overflow-auto">
      <div
        class="tw-border-b-[1px] tw-border-gray-200 tw-text-md md:tw-text-lg tw-font-bold tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-p-5">
        <div class="tw-font-bold tw-mb-3 md:tw-mb-0">{{pageTitle}}</div>
        
        <div class="tw-flex tw-flex-row">
       
          <div
            class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-1 tw-border tw-border-gray-200 md:tw-border-none tw-p-2 tw-rounded-md">
            <div class="tw-font-bold tw-text-sm">Status:</div>
            <select
              v-model="status"
              class="tw-text-sm focus:tw-ring-0 focus:tw-outline-none">
              <option v-for="status in statuses" :key="status" :value="status">{{status}}</option>
            </select>
          </div>
          <div
            class="tw-inline-flex tw-rounded-md tw-shadow-sm md:tw-ml-2 tw-ml-auto">
            <button
              class="tw-px-4 tw-py-2 tw-border  
               tw-text-sm tw-rounded-l-md"
                 @click="changeSorting('newest')"
                 :class="sortOrder=='newest' ? 'tw-bg-black tw-text-white' : 'tw-bg-gray-200 tw-text-black'"
                >
              Newest
            </button>
            <button
              class="tw-px-4 tw-py-2 tw-border tw-border-gray-300  tw-text-black tw-text-sm
                tw-rounded-r-md"
                @click="changeSorting('oldest')"
                :class="sortOrder=='oldest' ? 'tw-bg-black tw-text-white' : 'tw-bg-gray-200 tw-text-black'"
                >
              Oldest
            </button>
          </div>
        </div>
      </div>

      <v-container class="tw-py-4 tw-block md:tw-hidden">
        <v-row class="tw-justify-center">
          <v-col cols="12" md="8">
            <v-text-field
              v-model="search"
              variant="plain"
              bg-color="#e8ecf0"
              rounded="lg"
              placeholder="Search transactions"
              class="tw-rounded-full tw-border-0 tw-px-4">
              <template v-slot:prepend-inner>
                <v-icon class="tw-ml-4 tw-mt-[-4px]">mdi-magnify</v-icon>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <div v-if="paginationData?.data?.length > 0">
        <table
          class="tw-min-w-full tw-bg-white tw-overflow-hidden tw-rounded-lg tw-text-md">
          <thead v-if="showHeader">
            <tr>
              <th
                v-if="showSelect"
                class="tw-px-4 tw-py-5 tw-text-right tw-bg-[#F9FAFB] tw-border-b-[1px] tw-border-gray-200 tw-w-[10px] tw-w-max-[10px]">
                <input
                  type="checkbox"
                  @change="toggleAll"
                  :checked="selectAll" />
              </th>
              <th
                v-for="header in headers"
                :key="header.key"
                class="tw-bg-[#F9FAFB] tw-capitalize tw-px-6 tw-py-5 tw-text-left tw-text-gray-900 tw-tracking-wider tw-border-b-[1px] tw-border-gray-200">
                {{ header.title }}
              </th>
            </tr>
          </thead>
          <tbody class="tw-divide-y tw-divide-gray-200 tw-text-[14px]">
            <tr
              v-for="(row, index) in paginationData?.data"
              :key="index"
              @click="handleRowClick(row)"
              class="tw-cursor-pointer hover:tw-bg-gray-50">
              <td
                v-if="showSelect"
                class="tw-px-4 tw-py-5 tw-text-right tw-border-b-[1px] tw-border-gray-200 tw-w-[10px] tw-w-max-[10px]">
                <input type="checkbox" v-model="selectedRows" :value="row" />
              </td>
              <td
                v-for="header in headers"
                :key="header.key"
                class="tw-px-6 tw-py-5 tw-border-b-[1px] tw-border-gray-200">
                <span v-if="header.key === 'sn'">
                  {{ index + paginationData?.meta?.from }}
                </span>
                <span v-else>
                  <slot :name="`td-${header.key}`" :row="row">
                    {{ row[header.key] }}
                  </slot>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="tw-flex tw-bg-white tw-justify-center">
        <img
          
          src="@/assets/notransaction.png"
          class="tw-w-[100px] md:tw-w-[200px]"
          alt="no transactions" />
      </div>
    </div>
    <div v-else>
      <TableLoader :count="rows" :columns="headers.length + 1" />
    </div>
    <div class="tw-mt-5">
      <Pagination
      
        :current-page="paginationData?.meta?.current_page"
        :total-pages="paginationData?.meta?.last_page"
        :rows-per-page="paginationData?.meta?.per_page"
        :total-items="paginationData?.meta?.total"
        :links="paginationData?.links"
        @page-change="changePage"
        @rows-per-page-change="changeRowsPerPage" />
    </div>
  </div>
</template>

<script>
import TableLoader from "./TableLoader.vue";
import Pagination from "./Pagination.vue";
import { useGlobalsStore } from "../../stores/globals";

export default {
  props: {
    pageTitle:{
      type: String,
      default: 'Recent Transactions'
    },
    statuses:{
      type: Array,
      default: () => (['All', 'Pending', 'Successful']),
    },
    headers: {
      type: Array,
      required: true,
    },
    paginationData: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showSelect: {
      type: Boolean,
      default: false,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      search: "",
      status: "All",
      rows: 10,
      selectAll: false,
      selectedRows: [],
      sortOrder: "newest",
      globals:useGlobalsStore()
    };
  },
  components: {
    TableLoader,
    Pagination,
  },
  watch:{
    status(newVal){
      this.globals.filters.status = newVal
    },
    sortOrder(newVal){
      if(newVal == 'newest'){
        this.globals.sort = 'desc'
      }else{
        this.globals.sort = 'asc'
      }
    },
    selectAll(value) {
      if (value) {
        this.selectedRows = this.paginationData.data.map((row) => row);
      } else {
        this.selectedRows = [];
      }
    },
    selectedRows: {
      handler(newValue) {
        this.selectAll = newValue.length === this.paginationData.data.length;
      },
      deep: true,
    },
  },
  methods: {
    handleRowClick(row) {
      this.$emit("row-click", row);
    },
    toggleAll() {
      if (this.selectAll) {
        this.selectedRows = [];
      } else {
        this.selectedRows = this.paginationData.data.map((row) => row);
      }
      this.selectAll = !this.selectAll;
    },
    changePage(path) {
      this.$emit("page-change", path);
    },
    changeRowsPerPage(data) {
      this.rows = data;
      this.$emit("page-length", data);
    },
    changeSorting(order) {  
      this.sortOrder = order;
    },
  },
};
</script>

<style scoped>
.table-shadow {
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
}
</style>
