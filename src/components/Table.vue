<template>
    <div class="tw-overflow-x-auto tw-p-1 sm:tw-rounded-md">
    <div v-if="!loading" class="table-shadow tw-border-[2px] tw-border-gray-200 tw-rounded-lg">
      <table  class=" tw-min-w-full tw-bg-white  tw-overflow-hidden tw-rounded-lg tw-text-md">
        <thead class="">
          <tr>
            <th class="tw-px-6 tw-py-3 tw-text-left tw-font-bold tw-bg-[#F9FAFB] tw-border-b-[2px] tw-border-gray-200">
              <input type="checkbox" @change="toggleAll" :checked="selectAll" />
            </th>
            <th v-for="header in headers" :key="header.key" class="tw-bg-[#F9FAFB] tw-font-bold tw-px-6 tw-py-3 tw-text-left  tw-text-gray-400 tw-uppercase tw-tracking-wider tw-border-b-[2px] tw-border-gray-200">
              {{ header.title }}
            </th>
          </tr>
        </thead>
        <tbody class="tw-divide-y tw-divide-gray-200 tw-text-[14px]">
          <tr
            v-for="(row, index) in paginationData.data"
            :key="index"
            @click="handleRowClick(row)"
            :class="index % 2 === 0 ? 'tw-bg-white' : 'tw-bg-gray-100'"
            class="tw-cursor-pointer hover:tw-bg-gray-50"
          >
            <td class="tw-px-6 tw-py-1">
              <input type="checkbox" v-model="selectedRows" :value="row" />
            </td>
            <td v-for="header in headers" :key="header.key" class="tw-px-6 tw-py-1">
                <span v-if="header.key =='sn'">
                    {{ index +paginationData?.meta?.from  }}
                </span>
                <span v-else>
                    <span v-if="$slots[`td-${header.key}`]">
                        <slot :name="`td-${header.key}`" :row="row"></slot>
                    </span>
                    <span v-else>
                        {{ row[header.key] }}
                    </span>
                </span>
            </td>
          </tr>
        </tbody>
      </table>
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
          @rows-per-page-change="changeRowsPerPage"

        />
      </div>
    </div>
  </template>
  
  <script>
  import TableLoader from '@/components/TableLoader.vue';
  import Pagination from '@/components/Pagination.vue';
  
  export default {
    props: {
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
    },
    data() {
      return {
        rows:10,
        selectAll: false,
        selectedRows: [],
      };
    },
    components: {
      TableLoader,
      Pagination,
    },
    watch: {
      selectAll(value) {
        if (value) {
          this.selectedRows = this.paginationData.data.map(row => row);
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
        this.$emit('row-click', row);
      },
      toggleAll() {
        if (this.selectAll) {
          this.selectedRows = [];
        } else {
          this.selectedRows = this.paginationData.data.map(row => row);
        }
        this.selectAll = !this.selectAll;
      },
      changePage(path) {
        this.$emit('page-change', path);
      },
      changeRowsPerPage(data) {             
        this.rows = data           
        this.$emit('page-length', data);
      },
    },
  };
  </script>
  
  <style scoped>
  .table-shadow{
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06);
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
  }


  </style>
  