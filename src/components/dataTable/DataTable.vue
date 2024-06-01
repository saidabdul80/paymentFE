<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      USERS
      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        hide-details
        single-line
      ></v-text-field>
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table show-select v-model:search="search" :items="items">
      <template v-slot:header.status>
        <div class="text-end">status</div>
      </template>

      <template v-slot:item.PHOTO="{ item }">
        <v-card class="my-2 tw-h-9 tw-w-9" elevation="2" style="border-radius: 50%">
          <v-img
            :src="`https://cdn.vuetifyjs.com/docs/images/graphics/gpus/${item.PHOTO}`"
          ></v-img>
        </v-card>
      </template>

      <template v-slot:item.status="{ item }">
        <div class="text-end">
          <span> </span>
          <v-chip
            :color="getColor(item.status)"
            class="tw-w-[50px]"
            :text="item.status"
            size="x-small"
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
