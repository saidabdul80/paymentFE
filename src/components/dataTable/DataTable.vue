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
            <v-chip
                :class="getClasses(item.status)"
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
  methods:{
    getClasses(status){
      let classname = ''
      if(status?.toLowerCase() === 'active'){
        classname = `tw-text-[${this.$constants.primary}] tw-bg-[${this.$constants.primary}]/${this.$constants.transparent_level}`
      }else if(status?.toLowerCase() == 'pending'){
        classname = `tw-text-[${this.$constants.warning}] tw-bg-[${this.$constants.warning}]/${this.$constants.transparent_level}` 
      }else{
        classname = `tw-text-[${this.$constants.danger}] tw-bg-[${this.$constants.danger}]/${this.$constants.transparent_level}`;
      }
      return classname
    }
  },
  data() {
    return {
      search: ''
    }
  }
}
</script>