<template>
  <div>
      <div class="tw-flex">
           <FormsHeader
              header="Role Management"
              title="Showing all administrator roles and assigned permissions."
              :showControls="true"
              buttonText="Add New Role"
              :buttonAction="addNewRole"
              />
      </div>

      <div class="tw-container tw-mx-auto tw-p-6">
          <permission-card v-for="(card, index) in paginatedCards" :key="index" :title="card.title"
              :permissions="card.actions" class="tw-my-4" @edit-permissions="openModal(card.title, card.actions)" />
         
         
         
              <div
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


      <!-- Role Management Modal -->
      <role-management-modal :actions="selectedActions" :role-name="selectedRoleName" :showModal="showModals" @update:showModal="showModals = $event" @save-role="handleSaveRole" />
  </div>
</template>

<script>
import FormsHeader from '@/components/FormsHeader.vue';
import PermissionCard from '@/admin/views/settings/role/components/PermissionCard.vue';
import RoleManagementModal from '@/admin/views/settings/role/components/RoleManagementModal.vue';
import search from '@/components/Search.vue'
export default {
    data() {
        return {
            currentPage: 1,
      rowsPerPage: 3,
      totalItems: 9, 
      cards: [
        { title: 'PAYE Head', actions: ['Manage admins', 'Assign target', 'Approve requests', 'Collect taxes', 'Vet tax declaration',
                'Approve requests', 'Collect taxes', 'Assign target', 'Vet tax declaration', 'Assign target', 
                'Manage admins'] },
        { title: 'PAYE Staff', actions: ['Manage admins', 'Assign target', 'Approve requests', 'Collect taxes', 'Vet tax declaration',
                'Approve requests', 'Collect taxes', 'Assign target', 'Vet tax declaration', 'Assign target', 
                'Manage admins'] },
        { title: 'Collections Head', actions: ['Manage admins', 'Assign target', 'Approve requests', 'Collect taxes', 'Vet tax declaration',
                'Approve requests', 'Collect taxes', 'Assign target', 'Vet tax declaration', 'Assign target', 
                'Manage admins'] },
        { title: 'PAYE Head 2', actions: ['Manage admins', 'Assign target', 'Approve requests', 'Collect taxes', 'Vet tax declaration',
                'Approve requests', 'Collect taxes', 'Assign target', 'Vet tax declaration', 'Assign target', 
                'Manage admins'] },
        { title: 'PAYE Staff 2', actions: ['Manage admins', 'Assign target', 'Approve requests', 'Collect taxes', 'Vet tax declaration',
                'Approve requests', 'Collect taxes', 'Assign target', 'Vet tax declaration', 'Assign target', 
                'Manage admins'] },
        { title: 'Collections Head 2', actions: ['Manage admins', 'Assign target', 'Approve requests', 'Collect taxes', 'Vet tax declaration',
                'Approve requests', 'Collect taxes', 'Assign target', 'Vet tax declaration', 'Assign target', 
                'Manage admins'] },
        { title: 'PAYE Head 3', actions: ['Manage admins', 'Assign target', 'Approve requests', 'Collect taxes', 'Vet tax declaration',
                'Approve requests', 'Collect taxes', 'Assign target', 'Vet tax declaration', 'Assign target', 
                'Manage admins'] },
        { title: 'PAYE Staff 3', actions: ['Manage admins', 'Assign target', 'Approve requests', 'Collect taxes', 'Vet tax declaration',
                'Approve requests', 'Collect taxes', 'Assign target', 'Vet tax declaration', 'Assign target', 
                'Manage admins'] },
        { title: 'Collections Head 3', actions: ['Manage admins', 'Assign target', 'Approve requests', 'Collect taxes', 'Vet tax declaration',
                'Approve requests', 'Collect taxes', 'Assign target', 'Vet tax declaration', 'Assign target', 
                'Manage admins'] }
      ]
        }
    },
    components: {
        FormsHeader,
        search,
        PermissionCard
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
      return this.cards.slice(start, end);
    }
},
    methods: {
        editPermissions() {
            // Logic for editing permissions
            alert('Edit Permissions Clicked');
        },

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
      openModal(roleName,actions) {
          this.selectedRoleName = roleName;
          this.selectedActions = actions.map(action => ({ name: action, selected: false }));
          this.showModals = true;
          // Optionally set current card data to modal
      },
      handleSaveRole(roleData) {
          
          // Handle save role logic here
          console.log('Role Data:', roleData);
          this.showModal = false;
      },
  }
}
</script>
