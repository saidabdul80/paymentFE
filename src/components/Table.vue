<template>
    <div class="tw-overflow-x-auto tw-p-1 sm:tw-rounded-md">
      <table v-if="!loading" class="tw-shadow-md tw-min-w-full tw-bg-white tw-rounded-lg tw-overflow-hidden tw-text-md">
        <thead class="tw-bg-[#F9FAFB]">
          <tr>
            <th class="tw-px-6 tw-py-3 tw-text-left">
              <input type="checkbox" @change="toggleAll" :checked="selectAll" />
            </th>
            <th v-for="header in headers" :key="header.key" class="tw-px-6 tw-py-3 tw-text-left tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider">
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
              <span v-if="$slots[`td-${header.key}`]">
                <slot :name="`td-${header.key}`" :row="row"></slot>
              </span>
              <span v-else>
                {{ row[header.key] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        <TableLoader :count="5" :columns="headers.length + 1" />
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
        this.$emit('page-change', data);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Scoped styles if needed */
  </style>
  