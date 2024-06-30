<template>
    <div>
        <div class="tw-flex">
            <FormsHeader header="Role Management" title="Showing all administrator roles and assigned permissions."
                :showControls="true" buttonText="Add New Role" :buttonAction="addNewRole" />
        </div>
        <div class="tw-container tw-mx-auto tw-p-6"  v-if="!roleLoading">
            <permission-card v-if="!roleLoading" v-for="(card, index) in paginatedCards" :key="index" :title="card.name"
                :permissions="card.permissions" class="tw-my-4"
                @edit-permissions="openModal(card.id, card.name, card.permissions)" />
            <div v-if="!roleLoading"
                class="tw-flex tw-justify-between tw-items-center tw-text-[#374151] tw-text-sm tw-rounded-sm tw-p-2 tw-bg-[#F3F4F6] tw-mt-2 tw-mx-1 tw-font-sans tw-font-medium">
                <div>Rows per page: {{ rowsPerPage }}</div>
                <div class=" tw-flex tw-items-center">
                    <v-btn variant="plain" size="x-small" icon @click="prevPage" :disabled="currentPage === 1">
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <div>{{ currentPage }} of {{ totalPages }}</div>
                    <v-btn variant="plain" size="x-small" icon @click="nextPage" :disabled="currentPage === totalPages">
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </div>
                <div>Showing {{ startItem }} to {{ endItem }} of {{ totalItems }}</div>
            </div>
        </div>
        <div v-else class=" tw-justify-center tw-items-center tw-flex-col tw-flex">
            <CustomSkeletonLoader :height="'100px'" :width="'90%'" />
            <hr class=" tw-my-6">
            <CustomSkeletonLoader :height="'100px'" :width="'90%'" />
        </div>

        <role-management-modal :actions="selectedActions" :role-name="selectedRoleName"
            :role-id="selectedRoleId" :showModal="showModals" @update:showModal="showModals = $event"
            @save-role="handleSaveRole" @create-role="handleCreateRole" @update-role="handleUpdateRole" />
        

    
    </div>
</template>


<script>
import FormsHeader from '@/components/FormsHeader.vue';
import PermissionCard from '@/admin/views/settings/role/components/PermissionCard.vue';
import RoleManagementModal from '@/admin/views/settings/role/components/RoleManagementModal.vue';
import useRoleStore from '@/admin/stores/role';
import CustomSkeletonLoader from '@/components/CustomSkeletonLoader.vue';

export default {
    data() {
        return {
            selectedActions: [],
            selectedRoleName: '',
            selectedRoleId: null,
            showModals: false,
            roleLoading: true,
            rollStore: useRoleStore(),
            currentPage: 1,
            rowsPerPage: 3,
            totalItems: 9,
            role: [],
            permission: [],
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalItems / this.rowsPerPage);
        },
        startItem() {
            return (this.currentPage - 1) * this.rowsPerPage + 1;
        },
        endItem() {
            return Math.min(this.currentPage * this.rowsPerPage, this.totalItems);
        },
        paginatedCards() {
            const start = (this.currentPage - 1) * this.rowsPerPage;
            const end = start + this.rowsPerPage;
            return this.role.slice(start, end);
        }
    },
    async created() {
        this.roleLoading = true;
        const [roles, permissions] = await Promise.all([
            this.rollStore.fetchRole(),
            this.rollStore.fetchPermission()
        ]);
        this.role = roles;
        this.permission = permissions;
        this.roleLoading = false;
    },
    methods: {
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        openModal(roleId, roleName, actions) {
            this.showModals = true;
            this.selectedRoleName = roleName;
            this.selectedRoleId = roleId;
            this.selectedActions = this.permission.map(perm => ({
                name: perm.name,
                selected: actions.some(action => action.name === perm.name)
            }));
        },
        addNewRole() {
            this.showModals = true;
            this.selectedRoleName = '';
            this.selectedRoleId = null;
            this.selectedActions = this.permission.map(perm => ({
                name: perm.name,
                selected: false
            }));
            
        },
        async handleCreateRole(roleData) {
            const selectedActions = roleData.actions.filter(action => action.selected).map(action => action.name);
            await this.rollStore.createRole({ name: roleData.roleName, permissions: selectedActions });
            this.showModals = false;
            await this.fetchRoles(); // Refetch roles after creation
        },
        async handleUpdateRole(roleData) {
            const selectedActions = roleData.actions.filter(action => action.selected).map(action => action.name);
            await this.rollStore.updateRolePermission(roleData.roleId, { "permission": selectedActions });
            this.showModals = false;
            await this.fetchRoles(); // Refetch roles after update
        },
        async fetchRoles() {
            this.roleLoading = true;
            this.role = await this.rollStore.fetchRole();
            this.roleLoading = false;
        }
    },
    components: {
        FormsHeader,
        PermissionCard,
        RoleManagementModal,
        CustomSkeletonLoader
    }
}
</script>
