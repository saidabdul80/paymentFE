<template>
  <div class="tw-px-5">
    <div class="text-caption">
      <div class="tw-grid lg:tw-grid-cols-3 tw-grid-cols-1 tw-gap-5">
        <v-card v-for="(card, index) in cards" :key="index" class="tw-p-[16px] tw-bg-white border-1 tw-flex"
          :class="`tw-border-[${$constants.secondary_light}]`" variant="outlined">
          <div>
            <span :class="card.iconBgClass" class="tw-p-[10px] tw-inline-block tw-rounded-[24px]">
              <v-icon size="56px" class="tw-w-[56px] tw-h-[56px]" :color="card.iconColor">{{ card.icon }}</v-icon>
            </span>
          </div>
          <div class="tw-ml-4">
            <span class="tw-font-bold leading-none"
              :class="`${$constants.text_size.s4} tw-text-[${$constants.primary}]`">{{
                globals.toCurrency(card.total,false) }}</span>
            <p :class="`${$constants.text_size.s2}`" class="tw-font-thin tw-mb-[6px] tw-mt-[-3px]">{{ card.title }}</p>
            <div>
              <v-chip class="tw-font-[100] tw-mr-2 rounded-md" :class="`${$constants.text_size.s1}`" rounded="sm"
                v-for="label in card.labels" size="x-small" :color="getColor(label.type)"
                :text="`${globals.toCurrency(label.total, false)} ${label.type}`"></v-chip>
            </div>
          </div>
        </v-card>
      </div>
    </div>

    <Tab :tabs="tabs">
      <template v-slot:Admins>
        <Admins />
      </template>
      <template v-slot:Vendors>
        <Vendors />
      </template>
      <template v-slot:Taxpayers>
        <Taxpayers />
      </template>
    </Tab>
  </div>
</template>

<script>
import Admins from '@/admin/views/users/usersList/Admins.vue'
import Vendors from '@/admin/views/users/usersList/Vendors.vue'
import Taxpayers from '@/admin/views/users/usersList/Taxpayers.vue'
import { useGlobalsStore } from '@/stores/globals';
import Tab from '@/components/tab.vue';

export default {
  components: {
    Tab,
    Admins,
    Vendors,
    Taxpayers
  },
  data() {
    return {
      globals: useGlobalsStore(),
      tabs: [
        { name: 'Admins', key: 'Admins' },
        { name: 'Vendors', key: 'Vendors' },
        { name: 'Taxpayers', key: 'Taxpayers' },
      ],
      cards: [
        {

          icon: 'mdi-shield-check',
          iconColor: this.$constants.success,
          iconBgClass: this.getBgClass(this.$constants.success, this.$constants.transparent_level),
          total: 124,
          title: 'Administrators',
          labels: [
            { total: 34, type: 'Admins' },
            { total: 90, type: 'Sub-Admins' }
          ]
        },
        {
          border: this.$constants.secondary_dark,
          icon: 'mdi-headset',
          iconSize: '48px',
          iconColor: this.$constants.danger,
          iconBgClass: this.getBgClass(this.$constants.danger, this.$constants.transparent_level),
          total: 5689,
          title: 'Vendors',
          labels: [
            { total: 4676, type: 'Active' },
            { total: 897, type: 'Inactive' }
          ]
        },
        {
          border: this.$constants.secondary_dark,
          icon: 'mdi-account-multiple',
          iconSize: '48px',
          iconColor: this.$constants.warning,
          iconBgClass: this.getBgClass(this.$constants.warning, this.$constants.transparent_level),
          total: 3456890,
          title: 'Taxpayers',
          labels: [
            { total: 985345, type: 'Corporate' },
            { total: 2050400, type: 'Individual' }
          ]
        }
      ]
    };
  },
  created() {
    this.globals.updateSubPageName("LIST");
  },
  methods: {
    getColor(type) {
      if (type.toLowerCase() != 'inactive') {
        return this.$constants.primary
      }
    },
    getBgClass(color, transparencyLevel) {
      return `tw-bg-[${color}]/${transparencyLevel}`;
    }
  }
}
</script>

<style scoped>
/* Scoped styles if needed */
</style>