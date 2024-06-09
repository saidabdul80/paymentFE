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
          { name: 'Vendors', key: 'Vendors' },
          { name: 'Taxpayers', key: 'Taxpayers' },
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
          },
          vendors:{
            border: this.$constants.secondary_dark,
            icon: 'mdi-headset',
            iconSize: '48px',
            iconColor: this.$constants.danger,
            iconBgClass: this.getBgClass(this.$constants.danger, this.$constants.transparent_level),
            total: 5689,
            title: 'Vendors',
            labels: [
              { total: 4676, type:'Active'},
              { total: 897,type:'Inactive'}
            ]
          },
          taxpayers: {
            border: this.$constants.secondary_dark,
            icon: 'mdi-account-multiple',
            iconSize: '48px',
            iconColor: this.$constants.warning,
            iconBgClass:  this.getBgClass(this.$constants.warning, this.$constants.transparent_level),
            total: 3456890,
            title: 'Taxpayers',
            labels: [
              { total: 985345,type: 'Corporate'},
              { total: 2050400, type: 'Individual'}
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
        users: [
            {
                id: 1,
                photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                name: 'Muhammad Adam 1',
                gtin: 'GIRS1234',
                phone: '08012345678',
                email: 'muhammadadam1@mai.com',
                status: 'Active',
            },
            {
                id: 2,
                photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                name: 'Muhammad Adam 2',
                gtin: 'GIRS1235',
                phone: '08012345679',
                email: 'muhammadadam2@mai.com',
                status: 'Pending',
            },
            {
                id: 3,
                photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                name: 'Muhammad Adam 3',
                gtin: 'GIRS1236',
                phone: '08012345670',
                email: 'muhammadadam3@mai.com',
                status: 'Inactive',
            },
            {
                id: 4,
                photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                name: 'Muhammad Adam 4',
                gtin: 'GIRS1237',
                phone: '08012345671',
                email: 'muhammadadam4@mai.com',
                status: 'Active',
            },
            {
                id: 5,
                photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                name: 'Muhammad Adam 5',
                gtin: 'GIRS1238',
                phone: '08012345672',
                email: 'muhammadadam5@mai.com',
                status: 'Active',
            },
            {
                id: 6,
                photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                name: 'Muhammad Adam 6',
                gtin: 'GIRS1239',
                phone: '08012345673',
                email: 'muhammadadam6@mai.com',
                status: 'Pending',
            },
            {
                id: 7,
                photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                name: 'Muhammad Adam 7',
                gtin: 'GIRS1240',
                phone: '08012345674',
                email: 'muhammadadam7@mai.com',
                status: 'Inactive',
            },
            {
                id: 8,
                photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                name: 'Muhammad Adam 8',
                gtin: 'GIRS1241',
                phone: '08012345675',
                email: 'muhammadadam8@mai.com',
                status: 'Active',
            },
            {
                id: 9,
                photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                name: 'Muhammad Adam 9',
                gtin: 'GIRS1242',
                phone: '08012345676',
                email: 'muhammadadam9@mai.com',
                status: 'Active',
            },
            {
                id: 10,
                photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                name: 'Muhammad Adam 10',
                gtin: 'GIRS1243',
                phone: '08012345677',
                email: 'muhammadadam10@mai.com',
                status: 'Pending',
            },
            {
                id: 11,
                photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                name: 'Muhammad Adam 11',
                gtin: 'GIRS1244',
                phone: '08012345678',
                email: 'muhammadadam11@mai.com',
                status: 'Inactive',
            },
            {
                id: 12,
                photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                name: 'Muhammad Adam 12',
                gtin: 'GIRS1245',
                phone: '08012345679',
                email: 'muhammadadam12@mai.com',
                status: 'Active',
            },
            {
                id: 13,
                photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                name: 'Muhammad Adam 12',
                gtin: 'GIRS1245',
                phone: '08012345679',
                email: 'muhammadadam12@mai.com',
                status: 'Active',
            },
            {
                id: 14,
                photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                name: 'Muhammad Adam 12',
                gtin: 'GIRS1245',
                phone: '08012345679',
                email: 'muhammadadam12@mai.com',
                status: 'Active',
            },
            {
                id: 15,
                photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                name: 'Muhammad Adam 12',
                gtin: 'GIRS1245',
                phone: '08012345679',
                email: 'muhammadadam12@mai.com',
                status: 'Active',
            },
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

        this.cards.vendors.labels[0].total = data?.vendors?.active ?? 0;
        this.cards.vendors.labels[1].total = data?.vendors?.inactive ?? 0;
        this.cards.vendors.total = data?.vendors?.total ?? 0;

        this.cards.taxpayers.labels[0].total = data?.taxpayers?.corporate ?? 0;
        this.cards.taxpayers.labels[1].total = data?.taxpayers?.individual ?? 0;
        this.cards.taxpayers.total = data?.taxpayers?.total ?? 0;
    });
    },
    methods: {
      /* generateSampleData(page, perPage) {
      const data = [];
      const startId = (page - 1) * perPage + 1;
      for (let i = startId; i < startId + perPage; i++) {
        data.push({
          id: i,
          photo: 'https://via.placeholder.com/40',
          name: `User ${i}`,
          email: `user${i}@example.com`,
          status: ['Active', 'Inactive', 'Pending'][Math.floor(Math.random() * 3)],
        });
      }
      return data;
    }, */    
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
