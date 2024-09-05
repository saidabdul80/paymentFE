<template>
    <div class="tw-text-lg tw-grid md:tw-grid-cols-5 tw-gap-4 " v-if="adminStore.currentUser">
        <div class="md:tw-col-span-3">
            <div class="rounded-lg tw-p-0 tw-border tw-bg-white tw-flex tw-flex-col md:tw-h-[]">
                <div class="tw-mt-6">
                    <v-img
                        src="https://media.licdn.com/dms/image/D4D03AQFOpAZB0-Dd3w/profile-displayphoto-shrink_800_800/0/1683719645012?e=2147483647&v=beta&t=Ue-M4NltA8ASpxm9rekvp9lkKquGw4X0YtP38vpVmgY"
                        alt="image_description" width="100px" height="100px"
                        class="rounded-circle tw-mx-auto tw-d-block" />
                </div>
                <div class="text-center">
                    <p :class="`tw-text-[${$constants.primary}]`"
                        class="tw-text-xl tw-font-visby tw-font-bold text-center mb-3">
                        {{ adminStore.currentUser?.full_name }}
                    </p>
                    <v-btn type="submit" variant="outlined" prepend-icon="mdi-pencil" :color="$constants.primary"
                        :class="`tw-bg-[#CCDFD6] tw-border-green-900 tw-border tw-rounded-lg tw-font-semibold tw-mr-2 text-capitalize`"
                        @click="EditAdmin">
                        Edit Administrative Details
                    </v-btn>
                    <v-row>
                        <v-col cols="12" md="6">
                        </v-col>
                      
                       
                    </v-row>
                  
                  
                   
                </div>
                <hr class="tw-my-4 tw-w-[90%] tw-self-center" />

                <v-card-text class="tw-m-0 adminDetailText">
                    <v-list-item class="tw-p-0">
                        <div v-if="!adminStore.usersLoading" class="md:tw-flex">
                            <div :class="`tw-text-[${$constants.primary}]`" class="tw-pr-2"><strong>First Name:
                                </strong></div>
                            <div :class="`tw-text-[${$constants.dark}]`" class="">{{
                                adminStore.currentUser?.first_name }}</div>
                        </div>
                        <span v-else><v-skeleton-loader :loading="adminStore.usersLoading" type="text" /></span>
                    </v-list-item>
                    <v-list-item class="tw-p-0">
                        <div v-if="!adminStore.usersLoading" class="md:tw-flex">
                            <div :class="`tw-text-[${$constants.primary}]`" class="tw-pr-2"><strong>Last Name: </strong>
                            </div>
                            <div :class="`tw-text-[${$constants.dark}]`" class="">{{
                                adminStore.currentUser?.last_name }}</div>
                        </div>

                        <span v-else><v-skeleton-loader :loading="adminStore.usersLoading" type="text" /></span>
                    </v-list-item>
                    <v-list-item class="tw-p-0">
                        <div v-if="!adminStore.usersLoading" class="md:tw-flex">
                            <div :class="`tw-text-[${$constants.primary}]`" class="tw-pr-2"><strong>Email:
                                </strong></div>
                            <div :class="`tw-text-[${$constants.dark}]`" class="">{{
                                adminStore.currentUser?.email }}</div>
                        </div>
                        <span v-else><v-skeleton-loader :loading="adminStore.usersLoading" type="text" /></span>
                    </v-list-item>
                    <v-list-item class="tw-p-0">
                        <div v-if="!adminStore.usersLoading" class="md:tw-flex">
                            <div :class="`tw-text-[${$constants.primary}]`" class="tw-pr-2"><strong>DOB:
                                </strong></div>
                            <div :class="`tw-text-[${$constants.dark}]`" class="">{{
                                adminStore.currentUser?.dob }}</div>
                        </div>
                        <span v-else><v-skeleton-loader :loading="adminStore.usersLoading" type="text" /></span>
                    </v-list-item>
                    <v-list-item class="tw-p-0">
                        <div v-if="!adminStore.usersLoading" class="md:tw-flex">
                            <div :class="`tw-text-[${$constants.primary}]`" class="tw-pr-2"><strong>Phone Number:
                                </strong></div>
                            <div :class="`tw-text-[${$constants.dark}]`" class="">{{
                                adminStore.currentUser?.phone_number }}</div>
                        </div>

                        <span v-else><v-skeleton-loader :loading="adminStore.usersLoading" type="text" /></span>
                    </v-list-item>
                    <v-list-item class="tw-p-0">
                        <div v-if="!adminStore.usersLoading" class="md:tw-flex">
                            <div :class="`tw-text-[${$constants.primary}]`" class="tw-pr-2"><strong>Address: </strong>
                            </div>
                            <div :class="`tw-text-[${$constants.dark}]`" class="">{{
                                adminStore.currentUser?.address }}</div>
                        </div>
                        <span v-else><v-skeleton-loader :loading="adminStore.usersLoading" type="text" /></span>
                    </v-list-item>

                </v-card-text>


            </div>
            <div :class="`tw-text-[${$constants.dark}]`" class=" text-center">Last edited 9 minutes ogo</div>

        </div>
        <div class="tw-h-[100%] md:tw-col-span-2">
            <v-row class="tw-mb-2">
            <v-col cols="12" md="6">
                <v-btn :class="`tw-bg-orange-500 tw-text-white tw-borde`"
                    @click="enableSendMoneyDialog = true">Enable Send Money</v-btn>
                </v-col>
                <v-col>
                    <v-btn color="red" @click="deleteUser()">Delete User</v-btn>
                </v-col>
            </v-row>
            <div class="rounded-lg tw-p-0 tw-bg-white tw-border tw-mb-4 md:tw-h-[45%] tw-flex tw-flex-col">
                <!-- Contact Information -->
                <p :class="`tw-text-[${$constants.primary}]`"
                    class="tw-uppercase tw-text-center tw-mt-4 tw-font-visby tw-font-extrabold tw-text-lg">Contact
                    Information</p>
                <hr class=" tw-my-4 tw-w-[90%] tw-self-center">
                <v-card-text class="adminDetailText">
                    <v-list-item class="tw-p-0">
                        <div v-if="!adminStore.usersLoading" class="md:tw-flex">
                            <div :class="`tw-text-[${$constants.primary}]`" class=""><strong>Phone Number: </strong>
                            </div>
                            <div :class="`tw-text-[${$constants.dark}]`" class="">{{
                                adminStore.currentUser?.phone_number }}</div>
                        </div>

                        <span v-else><v-skeleton-loader :loading="adminStore.usersLoading" type="text" /></span>
                    </v-list-item>
                    <v-list-item class="tw-p-0">
                        <div v-if="!adminStore.usersLoading" class="md:tw-flex">
                            <div :class="`tw-text-[${$constants.primary}]`" class="tw-pr-2"><strong>Email Address:
                                </strong></div>
                            <div :class="`tw-text-[${$constants.dark}]`" class="">{{
                                adminStore.currentUser?.email }}</div>
                        </div>

                        <span v-else><v-skeleton-loader :loading="adminStore.usersLoading" type="text" /></span>
                    </v-list-item>
                    <v-list-item class="tw-p-0">
                        <div v-if="!adminStore.usersLoading" class="md:tw-flex">
                            <div :class="`tw-text-[${$constants.primary}]`" class="tw-pr-2"><strong>Address Line:
                                </strong></div>
                            <div :class="`tw-text-[${$constants.dark}]`" class="">{{
                                adminStore.currentUser?.address_line_1 }}</div>
                        </div>

                        <span v-else><v-skeleton-loader :loading="adminStore.usersLoading" type="text" /></span>
                    </v-list-item>
                    <v-list-item class="tw-p-0">
                        <div v-if="!adminStore.usersLoading" class="md:tw-flex">
                            <div :class="`tw-text-[${$constants.primary}]`" class="tw-pr-2"><strong>Zip Code: </strong>
                            </div>
                            <div :class="`tw-text-[${$constants.dark}]`" class="">{{
                                adminStore.currentUser?.contactZipCode }}</div>
                        </div>

                        <span v-else><v-skeleton-loader :loading="adminStore.usersLoading" type="text" /></span>
                    </v-list-item>

                </v-card-text>
            </div>

            <div class="rounded-lg tw-bg-white tw-px-4 tw-border tw-flex tw-pb-4 tw-mb-3 md:tw-mb-0 tw-flex-col">

                <div>
                    <p :class="`tw-text-[${$constants.primary}]`"
                        class="tw-uppercase tw-text-center tw-mt-4 tw-font-visby tw-font-extrabold tw-text-lg">
                        Administrator
                        Role</p>
                    <!-- Edit Permissions Text Link -->
                    <div class="tw-flex tw-justify-center tw-mt-4">
                        <v-btn
                            v-if="Ls.hasPermission(Abilities.ASSIGN_ROLE)"
                            class="tw-bg-green-700 tw-h-fit tw-py-[8px] tw-rounded-lg tw-font-visby tw-font-semibold tw-text-base tw-normal-case tw-text-white"
                            @click="openRoleManagementModal" prepend-icon="mdi-plus">
                            Assign Role
                        </v-btn>
                    </div>
                </div>
                <hr class=" tw-my-4 tw-w-[100%] tw-self-center">

                <div class="tw-flex tw-flex-wrap tw-self-center tw-w-[100%] tw-gap-2">
                    <v-chip v-for="(role, index) in adminStore.currentUser?.roles" :key="index"
                        class="tw-bg-[#E8F8F0] tw-font-semibold tw-text-base tw-font-visby  tw-text-[#065F46]" outlined>
                        {{ role.name }}
                    </v-chip>
                </div>

            </div>

           <!--  <div class="rounded-lg tw-bg-white tw-px-4 tw-border tw-flex tw-pb-4 tw-my-3 md:tw-mb-0 tw-flex-col">
                <div>
                    <p :class="`tw-text-[${$constants.primary}]`"
                        class="tw-uppercase tw-text-center tw-mt-4 tw-font-visby tw-font-extrabold tw-text-lg">
                        Administrator
                        Permissions</p>                    
                    <div class="tw-flex tw-justify-center tw-mt-4">
                        <v-btn v-if="Ls.hasPermission(Abilities.ASSIGN_ROLE)" variant="outlined" class="tw-text-green-700 tw-bg-[#CCDFD6] tw-text-xs tw-normal-case"
                            @click="openRoleManagementModal">
                            <v-icon class="tw-mr-1 " size="large" left>mdi-pencil-outline</v-icon> Assign Permissions
                        </v-btn>
                    </div>
                </div>


                <hr class="tw-my-4 tw-w-[100%] tw-self-center">

                <div class="tw-flex tw-flex-wrap tw-self-center tw-w-[100%] tw-gap-2">
                    <v-chip v-for="(permission, index) in allPermissions" :key="index"
                        class="tw-bg-[#E8F8F0] tw-font-semibold tw-text-base tw-font-visby tw-text-[#065F46]" outlined>
                        {{ permission.name }}
                    </v-chip>
                </div>
            </div> -->
        </div>


        <!-- Role Management Modal -->
        <v-dialog v-model="showRoleManagementModal" max-width="550px">
            <v-card class="tw-p-6">
                <v-card-title class="tw-font-visby tw-font-bold tw-text-4xl">Role Management</v-card-title>
                <v-card-subtitle class="tw-font-visby tw-font-medium tw-text-[13px] tw-leading-5">
                    Set a name and define responsibilities for staff members assigned this role.
                    <hr class="tw-my-5">
                </v-card-subtitle>

                <v-card-text>
                    <v-form>

                        <v-col class="md:tw-py-0 tw-min-h-64" cols="12" md="12" sm="12">   
                        <div class="tw-max-h-64 tw-overflow-auto">                                                        
                            <v-checkbox class="tw-font-visby tw-font-medium tw-text-base" v-for="(action, index) in roleStore.allRoles"
                            :key="index" :color="$constants.primary" v-model="action.selected" :label="action.name"></v-checkbox>
                        </div>                                                    
                        </v-col>

                    </v-form>
                </v-card-text>
                <v-card-actions class="md:tw-flex tw-justify-center tw-gap-x-5">
                    <v-btn size="large" @click="cancel"
                        class="tw-bg-[#CCDFD6] tw-border-green-700 tw-border tw-text-green-900 tw-font-visby tw-font-semibold tw-text-base tw-normal-case tw-px-16">
                        Cancel
                    </v-btn>
                    <v-btn v-if="Ls.hasPermission(Abilities.ASSIGN_ROLE)" type="submit" size="large" @click="assignRole" :loading="roleStore.assigningRole" 
                        class="tw-bg-green-700 tw-font-visby tw-font-semibold tw-text-base tw-normal-case tw-text-white tw-px-9 tw-mr-4">
                        Assign Role
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <Dialog v-model:visible="enableSendMoneyDialog" modal style="min-width: 300px;" header="Enable or Disable User from Send money">
            <SelectField :items="['CAD','NGN']" label="Select Currency" v-model="sendmoneyCurrency" />
            <div class="tw-w-full tw-flex tw-justify-center tw-items-center">
                <Checkbox v-model="sendmoneyStatus" :binary="true" />
                <label>Enable</label>
            </div>
            <v-btn :loading="loadingsendmoney" :class="`tw-bg-green-800 tw-text-white tw-borde`"
                    @click="enableSendMoney()">Proceed</v-btn>
        </Dialog>
    </div>
</template>

<script>
import useAdminStore from '@/admin/stores/admin';
import TextField from "@/components/TextField.vue"
import CopyButton from "@/components/CopyButton.vue"
import useRoleStore from '@/admin/stores/role';
import SelectFilter from '@/components/SelectFilter.vue';
import ls from '@/services/ls';
import abilities from '@/admin/stubs/abilities';
import Dialog from 'primevue/dialog';
import Select from 'primevue/select';
import SelectField from '@/components/SelectField.vue';
import Checkbox from 'primevue/checkbox';
import { useClient } from '@/stores/client';

export default {
    data: () => ({
        adminStore: useAdminStore(),
        name: "AdminDetails",
        showRoleManagementModal: false,
        roleStore: useRoleStore(),
        roleLoading: false,
        isLoading: false,
        role_name: '',
        roles: [],
        permission: [],
        Ls:ls,
        Abilities:abilities,
        enableSendMoneyDialog:false,
        sendmoneyCurrency:'CAD',
        sendmoneyStatus:false,
    }),
    components: {
        TextField,
        CopyButton,
        SelectFilter,
        Dialog,
        SelectField,
        Checkbox
    },
    computed: {
        allPermissions() {
            return this.adminStore.currentUser?.roles?.reduce((acc, role) => {
                return acc.concat(role.permissions);
            }, []) || [];
        }
    },
    methods: {
        async enableSendMoney(){
            this.loadingsendmoney = true
            await this.adminStore.allowSendMoney({
                user_id:this.$route.params.id,
                currency_symbol: this.sendmoneyCurrency,
                enable: this.sendmoneyStatus
          });
          this.loadingsendmoney = false
          this.enableSendMoneyDialog= false
        },
       async deleteUser(){
         
                this.isLoading = true;
                try {
                    await this.adminStore.showAlert({
                        text: "You are about to Delete User",
                        title: "Continue Action?",
                        cancelBtnText: "No",
                        confirmBtnText: "Yes",
                        loading: false,
                        callback: async () => {
                        await this.adminStore.deleteUser(this.adminStore.currentUser?.id);
                        },
                    })
                } catch (error) {
                    console.error("Error in ticket generation", error);
                } finally {
                    this.isLoading = false;
                }
        
        },
        EditAdmin() {
            this.$router.push({ name: 'Add Admin', params: { id: this.adminStore.currentUser?.id } });
        },
        openRoleManagementModal() {
            this.showRoleManagementModal = true;
            this.selectedRoleName = '';
            this.selectedRoleId = null;
            this.roleStore.allRoles.forEach(role => {
                role.selected = this.adminStore.currentUser?.roles?.some(userRole => userRole.id === role.id);
            });
        },
        cancel() {
            this.showRoleManagementModal = false;
            
        },
        async assignRole() {            
            const selectedRoleIds = this.roleStore.allRoles
                        .filter(role => role?.selected)
                        .map(role => role.id);
            await this.roleStore.assignRole(selectedRoleIds, this.$route.params.id);              
            this.showRoleManagementModal = false;
            await this.adminStore.fetchUsersById(this.$route.params.id);
            this.resetRole();
        },
        resetRole(){
            this.roleStore.allRoles.forEach(role => {
                role.selected = this.adminStore.currentUser?.roles?.some(element => element.id === role.id);
            });
        }

    },
    async created() {
        this.adminStore.fetchUsersById(this.$route.params.id)

        this.roleLoading = true;
        const [roles, permissions] = await Promise.all([
            this.roleStore.fetchRole(),
            this.roleStore.fetchPermission()
        ]);
        this.roles = roles;
       this.resetRole()
        //console.log(this.roleStore.allRoles,2323)
        
        this.permission = permissions;
        this.totalItems = this.roles?.length
        this.roleLoading = false;
    },
}
</script>

<style>
.adminDetailText .v-list-item--density-default {
    min-height: 35px !important;
}
</style>