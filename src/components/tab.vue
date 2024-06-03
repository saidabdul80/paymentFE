<template>
  <div class="px-3 tw-mb-5">
    <v-tabs v-model="tab" :bg-color="mode === 'LIGHT' ? $constants.layout_background : $constants.secondary">
      <v-tab v-for="(tab, index) in tabs" :color="mode === 'LIGHT' ? $constants.primary : $constants.secondary_light"
        :value="index" class="tw-capitalize">
        {{ tab.name }}
      </v-tab>
    </v-tabs>
  </div>
  <v-card class="tw-min-h-[70vh]" :color="mode === 'LIGHT' ? $constants.light : 'surface-variant'">
    <v-tabs-window v-model="tab">
      <v-tabs-window-item v-for="(tab, n) in tabs" :key="n" :value="n">
        <v-container fluid>
          <slot :name="tab?.key"></slot>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>

</template>
<script>
import { useConstantsStore } from '@/stores/constants';

export default {
  props: {
    tabs: {
      default: [
        { name: 'Tab 1', key: 'tab1' },
        { name: 'Tab 2', key: 'tab2' },
        { name: 'Tab 3', key: 'tab3' },
      ]
    }
  },
  data: () => ({
    tab: null,
  }),
  computed: {
    mode() {
      return this.constantsStore.mode;
    },
    constantsStore() {
      return useConstantsStore();
    },
  },
}
</script>