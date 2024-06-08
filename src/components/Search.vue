<template>
    <v-row class="tw-flex tw-items-center tw-m-0">
      <v-select
        v-model="filter"
        :items="filters"
        placeholder="Filter"
        prepend-inner-icon="mdi-tune"
        variant="none"
        density="compact"
        hide-details
        class="tw-rounded-r-[0px] tw-border tw-rounded-l-[5px] lg:tw-w-[40%]"
        :class="`tw-text-[${$constants.secondary}]`"
        @input="emitFilters"
      ></v-select>
  
      <v-text-field
        variant="none"
        placeholder="Search"
        v-model="searchInput"
        prepend-inner-icon="mdi-magnify"
        density="compact"
        hide-details
        class="tw-rounded-r-[5px] tw-border tw-rounded-l-[0px] lg:tw-w-[60%]"
        @input="emitFilters"
      ></v-text-field>
    </v-row>
  </template>
  
  <script>
  export default {
    data() {
      return {
        filter: null, // Initialize the filter model
        searchInput: '', // Initialize the search input model
        filters: ['Option 1', 'Option 2', 'Option 3'], // Example filter options
      };
    },
    watch: {
      filter() {
        this.emitFilters();
      },
      searchInput() {
        this.emitFilters();
      },
    },
    methods: {
      emitFilters() {
        const filters = {
          filter: this.filter,
          search: this.searchInput,
        };
        this.$emit('update:filters', filters);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>
  