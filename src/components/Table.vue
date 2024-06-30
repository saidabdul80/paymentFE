<template>
  <div class="tw-overflow-x-auto sm:tw-rounded-md">
    <div v-if="!loading" class="table-wrapper tw-border-[2px] tw-shadow-sm tw-rounded-lg tw-max-h-[67vh]">
      <div class="table-container">
        <table class="tw-min-w-full tw-bg-white tw-text-md">
          <thead class="table-header">
            <tr>
              <th v-if="showCheckboxes" :class="`tw-bg-[${$constants.secondary_light}]`" class="tw-px-6 tw-py-3 tw-text-left tw-font-bold  tw-border-b-[2px] tw-border-gray-200">
                <input type="checkbox" @change="toggleAll" :checked="selectAll" />
              </th>
              <th :class="`tw-bg-[${$constants.secondary_light}]`" v-for="header in headers" :key="header.key" class="tw-text-sm tw-font-bold tw-px-6 tw-py-3 tw-text-left tw-text-gray-400 tw-uppercase tw-tracking-wider tw-border-b-[2px] tw-border-gray-200">
                {{ header.title }}
              </th>
            </tr>
          </thead>
          <tbody class="tw-divide-y tw-divide-gray-200 tw-text-[14px]">
            <tr v-if="paginationData?.data?.length === 0">
              <td :colspan="headers.length + (showCheckboxes ? 1 : 0)" class="tw-px-8 tw-py-3 tw-font-visby tw-font-bold tw-text-lg tw-text-center">
                No data available
              </td>
            </tr>
            <tr
              v-else
              v-for="(row, index) in paginationData.data"
              :key="index"
              @click="handleRowClick(row)"
              :class="index % 2 === 0 ? 'tw-bg-white' : `tw-bg-[${$constants.secondary_light}]`"
              class="tw-cursor-pointer hover:tw-bg-gray-50"
            >
              <td v-if="showCheckboxes" class="tw-px-6 tw-py-1">
                <input type="checkbox" v-model="selectedRows" :value="row" />
              </td>
              <td v-for="(header,index) in headers" :class="header?.bold?'tw-font-bold':`tw-font-semibold tw-text-[${$constants.secondary}]`" :key="header.key" class="tw-px-6 tw-py-2 tw-h-[56px]">
                <span v-if="header.key === 'sn'">
                  {{ index + paginationData?.meta?.from }}
                </span>
                <span v-else>
                  <span v-if="$slots[`td-${header.key}`]">
                    <slot :name="`td-${header.key}`" :row="row"></slot>
                  </span>
                  <span v-else class="tw-flex tw-items-center">                    
                    <span v-if="header?.formatNumber">
                        {{helpers.formatMoney(parseFloat(getNestedValue(row, header.key)))}}
                    </span>
                    <span v-else>
                      {{ getNestedValue(row, header.key) }}                      
                    </span>
                    <CopyButton @click.prevent="" v-if="header?.copy" :text="getNestedValue(row, header.key)" />
                  </span>
                </span>
                
              </td>
            </tr>
          </tbody>
        </table>
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
        @rows-per-page-change="changeRowsPerPage"
      />
    </div>
  </div>
</template>

<script>
import TableLoader from '@/components/TableLoader.vue';
import Pagination from '@/components/Pagination.vue';
import CopyButton from '@/components/CopyButton.vue';
import { helpers } from '@/helpers/utilities';
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
    showCheckboxes: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      helpers:helpers,
      rows: 10,
      selectAll: false,
      selectedRows: [],
    };
  },
  components: {
    TableLoader,
    Pagination,
    CopyButton,
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
      this.rows = data;
      this.$emit('page-length', data);
    },
    getNestedValue(obj, key) {
      return key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), obj);
    },
    handleError(event){          
            event.target.src ="/assets/user.png"
    }
  },
};
</script>

<style>
.table-wrapper {
  max-height: 67vh;
  overflow: hidden;
  position: relative;
}

.table-container {
  max-height: 67vh;
  overflow: auto;
}

.table-header tr th {
  position: sticky;
  top: 0;
  background: white;
  z-index: 2;
}

.table-shadow {
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
}

.table-body tr:nth-child(even) {
  background-color: #f9f9f9;
}

.table-body tr:hover {
  background-color: #f1f1f1;
}
</style>
