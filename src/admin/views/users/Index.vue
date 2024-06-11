<template>
  <div class="tw-px-5">
    <div class="text-caption">
      <div v-if="adminStore.dashboardLoading" class="tw-grid tw-grid-cols-3 tw-w-full tw-gap-4">
        <v-skeleton-loader   v-for="x in 3"  boilerplate type="card" class="tw-w-full"></v-skeleton-loader>        
      </div>
      <div v-else class="tw-grid lg:tw-grid-cols-3 tw-grid-cols-1 tw-gap-5">      
          <v-card v-for="(key, index) in Object.keys(cards)" :key="index" class="tw-p-[16px] border-1 tw-flex"
            :class="`tw-border-[${$constants.secondary_light}]`" variant="outlined">
            <div>
              <span :class="cards[key].iconBgClass" class="tw-p-[10px] tw-inline-block tw-rounded-[24px]">
                <v-icon size="56px" class="tw-w-[56px] tw-h-[56px]" :color="cards[key].iconColor">{{ cards[key].icon }}</v-icon>
              </span>
            </div>
            <div class="tw-ml-4 ">
              <span class="tw-font-bold leading-none"
                :class="`${$constants.text_size.s4} tw-text-[${$constants.primary}]`">{{
                  globals.toCurrency(cards[key].total, false) }}</span>
              <p :class="`${$constants.text_size.s2} tw-text-[${$constants.dark}]`"
                class=" tw-mb-[6px] tw-mt-[-3px] tw-font-[500]">{{ cards[key].title }}</p>
              <div>
                <v-chip class="tw-font-[500] tw-mr-2 rounded-md " :class="`${$constants.text_size.s1}`" rounded="sm"
                  v-for="label in cards[key].labels" size="x-small" :color="getColor(label.type)"
                  :text="`${globals.toCurrency(label.total, false)} ${label.type}`"></v-chip>
              </div>
            </div>
          </v-card>        
      </div>
  
      <Tab :tabs="tabs" :config="tabConfig">
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
  </div>
  </template>
  
  <script>
  import Admins from '@/admin/views/users/admin/Index.vue'
  import Vendors from '@/admin/views/users/vendors/Index.vue'
  import Taxpayers from '@/admin/views/users/taxpayers/Index.vue'
  import { useGlobalsStore } from '@/stores/globals';
  import Tab from '@/components/tab.vue';
  //import DataTable from '@/components/dataTable/DataTable.vue';
  import Button from '@/components/button/Button.vue';
  import useAdminStore from '@/admin/stores/admin';
  
  export default {
    components: {
      Tab,
      Admins,
      Vendors,
      Taxpayers,
      Button,      
    },
    data() {
      return {
        headers: [
        { key: 'id', title: 'ID' },
        { key: 'photo', title: 'Photo' },
        { key: 'name', title: 'Name' },
        { key: 'email', title: 'Email' },
        { key: 'status', title: 'Status' },
      ],
        adminStore:useAdminStore(),
        globals:useGlobalsStore(),
        tabs: [
          { name: 'Admins', key: 'Admins' },
        ],
        tabConfig:{
          'Admins':{
            search: true,
            sideButton: true,
            toolTipText: '',
            dropDownLabel: 'Add New Admin',
            dropdownItem: [{
                    title: 'Add Admin',
                    link: 'users/add-admin/'
                }]
          },
          'Vendors':{
            search: true,
            sideButton: true,
            toolTipText: '',
            dropDownLabel: 'Add New Vendor',
            dropdownItem: [{
                    title: 'Individual Taxpayer',
                    link: 'users/add-vendor/'
                }]
          },
          'Taxpayers':{
            search: true,
            sideButton: true,
            toolTipText: '',
            dropDownLabel: 'Add New TaxPayer',
            dropdownItem: [
                {
                    title: 'Individual Taxpayer',
                    link: 'users/add-individual-taxpayer/'
                },
                {
                    title: 'Corporate Taxpayer',
                    link: 'users/add-corporate-taxpayer/'
                }
            ]
          },
        },
        cards: {
          administrators:{
    
            icon: 'mdi-shield-check',
            iconColor: this.$constants.success,
            iconBgClass: this.getBgClass(this.$constants.success, this.$constants.transparent_level),
            total: 124,
            title: 'Administrators',
            labels: [
              { total: 34, type:'Admins'},
              { total: 90, type:'Sub-Admins'},
              { total: 90, type:'Others'}
            ]
          }
        },
        headers: [
            { key: 'id', title: 'ID' },
            { key: 'photo', title: 'PHOTO' },
            { key: 'name', title: 'NAME' },
            { key: 'gtin', title: 'G-TIN' },
            { key: 'phone', title: 'PHONE NUMBER' },
            { key: 'email', title: 'EMAIL' },
            { key: 'status', title: 'STATUS' },
        ],
        taxpayers: [
            {
                title: 'Individual Taxpayer',
                link: '/admin/users'
            },
            {
                title: 'Corporate Taxpayer',
                link: '/admin/dashboard'
            }
        ]
      };
    },
    created() {
      this.adminStore.fetchUsersDashboard().then((res) => {
        const data = this.adminStore.usersDashboardData;
        this.cards.administrators.labels[0].total = data?.administrators?.admins ?? 0;
        this.cards.administrators.labels[1].total = data?.administrators?.subAdmins ?? 0;
        this.cards.administrators.labels[2].total = data?.administrators?.others ?? 0;
        this.cards.administrators.total = data?.administrators?.total ?? 0;
    });
    },
    methods: {    
        getColor(type){
            if(type.toLowerCase() != 'inactive' ){
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
