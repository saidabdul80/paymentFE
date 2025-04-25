<template>
    <div class="tw-min-h-full tw-w-full tw-mt-[60px]">
        <div v-if="!$route.params?.id2">
                <DataTable
                    :loading="loadingRoles"
                    :paginationData="admins"
                    :headers="headers"
                    @row-click="handleRowClick"
                    @page-change="handlePageChange"
                    placeholder="Search by name, role or email address"
                    :statuses="[]"
                    :sort="false"
                    :left="true"
                >
                    <template v-slot:left>
                        <Button @click="handleAddNewSubAdmin = !handleAddNewSubAdmin" type="button" severity="primary" text outlined style="border: 1px solid;" label="Add new sub-admin" icon="pi pi-plus" />
                    </template>
                </DataTable>

                <Drawer class="!tw-w-full md:!tw-w-80 lg:!tw-w-[30rem]"  position="right" v-model:visible="handleAddNewSubAdmin" header="Add new sub-admin">
                    
                    <div class="tw-px-5">
                        <p class="tw-text-2xl tw-mt-4">Enter sub-admin details</p> 
                        <p class="tw-text-sm tw-text-gray-500 tw-mb-8">Carefully fill in the form below.</p>
                        <div class="tw-flex tw-flex-col tw-gap-1 tw-mb-4">
                            <label for="role" class="tw-w-24">First Name</label>
                            <InputText v-model="admin.first_name" id="role" class="tw-flex-auto" autocomplete="off" />
                        </div>
                        <div class="tw-flex tw-flex-col tw-gap-1 tw-mb-4">
                            <label for="role" class="tw-w-24">Last Name</label>
                            <InputText v-model="admin.last_name" id="role" class="tw-flex-auto" autocomplete="off" />
                        </div>
                        <div class="tw-flex tw-flex-col tw-gap-1 tw-mb-4">
                            <label for="role" class="tw-w-24">Email</label>
                            <InputText v-model="admin.email" id="role" class="tw-flex-auto" autocomplete="off" />
                        </div>
                        <div class="tw-flex tw-flex-col tw-gap-1 tw-mb-4">
                            <div class="tw-flex tw-justify-between tw-items-center">
                                <label for="role" class="tw-w-24">Role Name</label>
                                <Button icon="pi pi-plus" severity="info" @click="showRoleModal = true" label="Add new role" text size="small"  />
                            </div>
                            <Select filter :loading="loadingRoles" :options="roles" option-value="id" option-label="name" v-model="admin.role" id="role" class="tw-flex-auto" autocomplete="off" />
                        </div>
                        <div class="tw-flex tw-flex-col tw-gap-1 tw-mb-4">
                            <div class="tw-flex tw-justify-between tw-items-center">
                                <Button  @click="addAdmin" label="Submit Details"   />
                            </div>
                        </div>
                    </div>
                </Drawer>
                <Dialog v-model:visible="showRoleModal" :draggable="false" modal header="" :style="{ width: $vuetify.display.smAndDown ? '90%' :( $vuetify.display.mdAndDown? '70%' :  '600px' )}">
                    <CreateRole @role-created="()=>{this.fetchRoles(); showRoleModal = false}" />
                </Dialog>
        </div>
        <div v-else>
            <ViewAdmin :adminId="$route.params.id2" />
        </div>
    </div>
</template>

<script>
import { useGlobalsStore } from '@/stores/globals';
import  Drawer  from 'primevue/drawer';
import Button from 'primevue/button';
import InputText  from 'primevue/inputtext';
import CreateRole from './CreateRole.vue';
import Dialog from 'primevue/dialog';
import Select from 'primevue/select';
import { useClient } from '@/stores/client';
import ViewAdmin from './ViewAdmin.vue';



export default {
    name: "SubAdmin",
    components: {
        Button,
        InputText,
        Drawer,
        CreateRole,
        Dialog,
        Select,
        ViewAdmin
    },
    data() {
        return {
            showRoleModal:false,
            admin:{},
            admins:[],
            headers: [
                { name: "Sub-admin name", value: "name" },
                { name: "Role", value: "role" },
                { name: "Email Address", value: "action" },
                { name: "Status", value: "status" },
            ],
            global: useGlobalsStore(),
            clients: [],
            selectedClient: null,
            clientId: null,
            isLoadingOpen: false,
            handleAddNewSubAdmin: false,
            loadingRoles:false,
            roles:[],
        };
    },
    methods: {
        async fetchRoles(){
            this.loadingRoles = true
            const res = await useClient().http({ method: 'get', path: '/roles' })
            this.loadingRoles = false
            if (res) {
                this.roles = res
            }

        },
        async fetchAdmins(){
            this.loadingRoles = true
            const res = await useClient().http({ method: 'get', path: '/admin' })
            this.loadingRoles = false
            if (res) {
                this.admins = res
            }

        },
        async addAdmin(){
            const res = await useClient().http({ method: 'post', path: '/admin/register', data: this.admin, showMesage:true })
            if(res){
                this.fetchAdmins()
            }
        },
    },
    created(){
        this.fetchAdmins()
        this.fetchRoles()
    }

}
</script>

<style lang="scss" scoped>

</style>