<template>
  <div class="">
    <FormsHeader v-if="!isEdit" header="New Staff User" title=""  />
    <PersonalDetails :loading="adminStore.creating" @submit="saveData" />
  </div>
</template>

<script>

import { useGlobalsStore } from '@/stores/globals';
import Tab from '@/components/tab.vue';
import PersonalDetails from './forms/PersonalDetails.vue'
import ContactInformation from './forms/ContactInformation.vue'
import useAdminStore from '@/admin/stores/admin';
import FormsHeader from '@/components/FormsHeader.vue';
export default {
  components: {
    PersonalDetails,
    ContactInformation,
    Tab,
    FormsHeader
  },
  data() {
    return {
      isLoading: false,
      globals: useGlobalsStore(),
      adminStore: useAdminStore(),
      tabs: [
        { name: 'Personal Details', key: 'PersonalDetails' },
        { name: 'Contact Information', key: 'ContactInformation' },
      ],
      validation: {
        nin: "PersonalDetails",
        bvn: "PersonalDetails",
        first_name: "PersonalDetails",
        middle_name: "PersonalDetails",
        last_name: "PersonalDetails",
        role: "PersonalDetails",
        gender: "PersonalDetails",
        dob: "PersonalDetails",
        phone_number: "ContactInformation",
        email: "ContactInformation",
        address_line_1: "ContactInformation",
        address_line_2: "ContactInformation",
      },
      tabConfig: {
      },

    };
  },
  computed: {
    isEdit() {
      return !!this.$route.params.id;
    },
  },
  async created() {
  
    if (this.isEdit) {
     
      //await this.adminStore?.fetchDepartment();
      await this.adminStore.fetchStaffsById(this.$route.params.id)
    }else{
      this.adminStore.currentUser = {
        password:'password',
        email:''
      }
     // await this.adminStore?.fetchDepartment()
    }
  },
  
  methods: {
    filterFormData(data) {
      const allowedFields = [
        'id', 'address_line_1', 'address_line_2', 'email','first_name','dob',
        'gender','gender','department_id', 'nationality_id', 'state_id', 'lga_id', 'ward_id', 'nin',
        'phone_number', 'last_name',
      ];
      return allowedFields.reduce((filteredData, key) => {
        if (data.hasOwnProperty(key)) {
          filteredData[key] = data[key];
        }
        return filteredData;
      }, {});

    },
    async saveData() {      
      this.isLoading = true;
      const filteredData = this.filterFormData(this.adminStore.currentUser);
      if (this.isEdit) {
        await this.adminStore.updateCurrentUser(filteredData)        
      } else {
       
        await this.adminStore.createAdmin(this.adminStore.currentUser)
      }
      this.isLoading = false;
    },
  },
}
</script>