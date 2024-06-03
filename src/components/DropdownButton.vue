<template>
    <div>
      <Button
        :title="title"
        :prepend-icon="prependIcon"
        rounded="lg"
        size="large"
        :class="buttonClasses"
        id="menu-activator"
      />
      <v-menu activator="#menu-activator">
        <v-list>
          <v-list-item class="tw-ml-3">{{ header }}</v-list-item>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :value="index"
            :to="item.link">
            <div class="tw-flex">
              <v-list-item-title @click="$emit('click', item)" class="tw-my-auto tw-ml-3 tw-mr-14">{{ item.title }}</v-list-item-title>
              <v-radio :value="item" />
            </div>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </template>
  
<script>
  import { computed } from 'vue';
  import Button from '@/components/button/Button.vue';
  import { useConstantsStore } from '@/stores/constants';
  
  export default {
    components:{
        Button
    },
    props: {
        header:{
            type:String
        },
      title: {
        type: String,
        required: true,
      },
      prependIcon: {
        type: String,
        default: '',
      },
      items: {
        type: Array,
        required: true,
      },
    },
    setup() {
      const constantsStore = useConstantsStore();
      const buttonClasses = computed(() => `tw-text-[${constantsStore.values.light}] tw-bg-[${constantsStore.values.primary}]`);
  
      return {
        buttonClasses,
      };
    },
  };
  </script>
  