<template>    
    <div class="">            
        <v-btn   v-if="Ls.hasPermission(Abilities.ADD_ADMINS)"  @click="$router.push('users/add-admin/')">Add User</v-btn>
        <DataTable
            :loading="adminStore.usersLoading"
            :headers="headers"
            :paginationData="adminStore.users"
            @row-click="handleRowClick"
            @page-change="handlePageChange"
          >       
          <template v-slot:td-picture_url="{ row }">
            <img @error="handleError" :src="row?.picture_url?row?.picture_url:'-'" alt="image" class="tw-w-10 tw-h-10 tw-rounded-full" >
          </template>
          <template v-slot:td-status="{ row }">
                <span class="tw-rounded-[33px] tw-bg-white tw-block tw-w-[70px]">
                    <v-chip size="small" :color="row.status?.toLowerCase()=='active'?'#065F46':'#991B1B'"  class="tw-py-0 tw-flex tw-justify-center tw-font-bold tw-capitalize">
                        {{ row.status.toLowerCase() }}
                    </v-chip>
                </span>
            </template>
        </DataTable>
    </div>
</template>

<script>
import { useGlobalsStore } from '@/stores/globals';
import TextField from '@/components/TextField.vue';
import useAdminStore from '@/admin/stores/admin';
import ls from '@/services/ls';
import abilities from '@/admin/stubs/abilities';

import DataTable from '@/components/Table.vue';
export default {
    data() {
        return {
            name: "Admins",
            adminStore:useAdminStore(),
            globals: useGlobalsStore(),
            users:{},            
            searchInput: '',
            headers: [                
                { title: 'First Name', key: 'first_name',bold:true },      
                { title: 'Last Name', key: 'last_name' },                
                { title: 'Email', key: 'email', copy:true },                                
                { title: 'Date of Birth', key: 'dob' },
                { title: 'Phone Number', key: 'phone_number'},                                
            ],
            Ls:ls,
            Abilities:abilities,       
        }
    },
    created(){
        this.adminStore.fetchUsers()
    },
    components: {
        TextField,
        DataTable
    },
    watch:{
        'globals.filters': {
            handler: function(newFilters) {                
                if(this.globals.activeTab =="Admins" || this.globals.activeTab == null){                                        
                    this.adminStore.fetchUsers(newFilters);
                }
            },
            deep: true
        }
    },
    methods: {
        handleRowClick(row) {
            this.adminStore.currentUser = row
            this.$router.push('/admin/users/view-admin/' + row.id);
        },
        handlePageChange(path) {                                
            this.adminStore.fetchUsers(this.globals.filters, path)        
        },          
        handleError(event){                
            event.target.src =  "/user.png"
        }       
    },
}
</script>

<style>
.my-custom-text-field {
    font-size: 12px;
    /* Adjust the font size */
    padding: -2px 4px;
    /* Adjust the padding */
}
</style>
