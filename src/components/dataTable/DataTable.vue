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
        flat
        hide-details
        single-line
      ></v-text-field>
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table show-select v-model:search="search" :items="items">
        <template v-slot:header.STATUS>
            <div class="text-end">STATUS</div>
        </template>

        <template v-slot:item.PHOTO="{ item }">
            <v-card class="my-2 tw-h-9 tw-w-9" elevation="2" style="border-radius: 50%">
                <v-img
                    :src="`https://cdn.vuetifyjs.com/docs/images/graphics/gpus/${item.PHOTO}`"
                ></v-img>
            </v-card>
        </template>

        <template v-slot:item.STATUS="{ item }">
            <div class="text-end">
            <v-chip
                :class="item.STATUS === 'Active' ? [$constants.bg.primary_light, $constants.color.primary] : item.STATUS === 'Inactive' ? [$constants.bg.danger_light, $constants.color.danger] : [$constants.bg.warning_light, $constants.color.warning]"
                :text="item.STATUS === 'Active' ? 'Active' : item.STATUS === 'Inactive' ? 'Inactive' : 'Pending'"
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
  data() {
    return {
      search: ''
    }
  }
}
</script>