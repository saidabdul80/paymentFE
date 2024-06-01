<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      {{ title }}
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        label="Filter"
        rounded="lg"
        density="compact"
        prepend-inner-icon="mdi-magnify-expand"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
      <slot name="new_taxpayer_button" />
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table 
        v-model:search="search" 
        :headers="headers"
        :items="items"
        item-value="id"
        show-select 
        select-strategy="all"
    >
        <template v-slot:header.data-table-select="{ allSelected, selectAll, someSelected }">
            <v-checkbox-btn
                :indeterminate="someSelected && !allSelected"
                :model-value="allSelected"
                color="primary"
                @update:model-value="selectAll(!allSelected)"
            ></v-checkbox-btn>
        </template>
        <template v-slot:item.data-table-select="{ internalItem, isSelected, toggleSelect }">
            <v-checkbox-btn
                :model-value="isSelected(internalItem)"
                color="primary"
                @update:model-value="toggleSelect(internalItem)"
            ></v-checkbox-btn>
        </template>

        <template v-slot:item.photo="{ item }">
            <v-card class="my-2 tw-h-9 tw-w-9" elevation="2" style="border-radius: 50%">
            <v-img
                :src="item.photo"
            ></v-img>
            </v-card>
        </template>

        <template v-slot:item.status="{ item }">
            <div class="text-nd">
            <span> </span>
            <v-chip
                :color="getColor(item.status)"
                :text="item.status"
                size="small"
                label
            ></v-chip>
            </div>
        </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    getColor(status) {
      if (status?.toLowerCase() === 'active') {
        return `${this.$constants.primary}`
      } else if (status?.toLowerCase() === 'pending') {
        return `${this.$constants.warning}`
      } else {
        return `${this.$constants.danger}`
      }
    }
  },
  data() {
    return {
      search: ''
    }
  }
}
</script>

<style scoped>
</style>
