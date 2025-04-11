<template>
    <div class=" tw-bg-white tw-min-h-screen">
      <div class="tw-w-full">
        <div class="tw-p-8 ">
        <div class="tw-flex tw-items-center tw-justify-between tw-mb-6">
          <router-link to="/admin/settings/sub-admins" class="tw-text-sm tw-text-gray-500 hover:tw-underline">
            ← Back
          </router-link>
          <Button
            label="Revoke access"
            icon="pi pi-ban"
            severity="danger"
            class="tw-bg-red-100 tw-text-red-600 tw-border-red-300"
            @click="revokeAccess"
          />
        </div>
  
        <div class="tw-flex tw-items-center  tw-mb-6">
          <div class="tw-bg-blue-100 tw-mb-3 tw-rounded-full tw-h-12 tw-w-12 tw-flex tw-items-center tw-justify-center tw-font-semibold tw-text-blue-700 tw-mr-4">
            {{ adminInitials }}
          </div>
          <div>
            <h1 class="tw-text-lg" style="line-height: 0.5 !important">{{ admin.name }}</h1>
            <p class="tw-text-sm tw-mt-0 tw-text-gray-500">
              {{ admin.role }}
              <Button icon="pi pi-pencil" size="small" text label="Change" class="tw-ml-2 tw-underline" severity="info" @click="handleShowRoleModal = true" />
            </p>
          </div>
        </div>
        </div>
        <Divider class="tw-my-8" />
        <div class="tw-px-8 tw-min-h-32">
        <div class="tw-flex  tw-items-center tw-justify-between ">
                <h2 class="tw-font-medium tw-mb-2">Permissions</h2>
                <Button size='small' v-if="!isEditing" icon="pi pi-pencil" label="Edit" class="tw-mt-4 tw-bg-white tw-border tw-text-gray-600" @click="startEdit" />
        </div>
            
          <div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-3 tw-mb-4">
            <template v-if="isEditing">
              <span
                v-for="perm in allPermissions"
                :key="perm.id"
                @click="togglePermission(perm.id)"
                :class="[
                  'tw-cursor-pointer tw-px-4 tw-py-2 tw-rounded-md tw-text-sm tw-border tw-flex tw-justify-between tw-truncate tw-items-center gap-2',
                  admin.permissions.includes(perm.id)
                    ? 'tw-bg-green-100 tw-text-green-700 tw-border-green-300'
                    : 'tw-bg-red-100 tw-text-red-700 tw-border-red-300'
                ]"
              >
                {{ perm.description }}
                <i :class="admin.permissions.includes(perm.id) ? 'pi pi-check' : 'pi pi-times'"></i>
              </span>
            </template>
            <template v-else>
              <span
                v-for="permId in admin.permissions"
                :key="permId"
                class="tw-bg-gray-100 tw-text-gray-800 tw-rounded-md tw-px-4 tw-py-2 tw-text-sm"
              >
                {{ getPermissionDescription(permId) }}
              </span>
            </template>
          </div>
  
          <div class="tw-mt-4 tw-flex tw-gap-2" v-if="isEditing">
            <Button size='small' label="Cancel" class="tw-bg-white tw-border tw-text-gray-800" @click="cancelEdit" />
            <Button size='small' label="Save changes" class="tw-bg-black tw-border-black tw-text-white" @click="saveChanges" />
          </div>
       
        </div>
        <Divider class="tw-my-8" />
        <div class="tw-px-8 ">
          <h2 class="tw-font-medium tw-mb-3">All activities</h2>
          <table class="tw-w-full tw-bg-white tw-rounded-lg  tw-text-sm">
            <thead class="tw-text-left tw-border-b tw-text-gray-500 tw-bg-gray-100">
              <tr>
                <th class="tw-px-4 tw-py-3">Action performed</th>
                <th class="tw-px-4 tw-py-3">Client involved</th>
                <th class="tw-px-4 tw-py-3">Date and time</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(activity, index) in admin.activities"
                :key="index"
                class="tw-border hover:tw-bg-gray-50"
              >
                <td class="tw-px-4 tw-py-3">{{ activity.action }}</td>
                <td class="tw-px-4 tw-py-3">{{ activity.client }}</td>
                <td class="tw-px-4 tw-py-3">{{ activity.timestamp }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Drawer class="!tw-w-full md:!tw-w-80 lg:!tw-w-[30rem]"  position="right" v-model:visible="handleShowRoleModal" header="Change Role">
            <AssignRole :adminId="admin.id" :roleId="admin.role" @role-assigned="()=>{fetchAdmin(); handleShowRoleModal = false}" />
        </Drawer>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import Button from 'primevue/button'
  import { useClient } from '@/stores/client'
  import AssignRole from './AssignRole.vue';
  import Drawer from 'primevue/drawer';
import Divider from 'primevue/divider';
  const route = useRoute()
  const client = useClient()
  
  const admin = ref({
    id:1,
    name: 'FAKE ADMIN',
    role: 'FAKE ROLE',
    permissions: [],
    activities: [],
  })
  
  const allPermissions = ref([])
  const isEditing = ref(false)
  const originalPermissions = ref([])
  const handleShowRoleModal = ref(false)
  const fetchAdmin = async () => {
    const id = route.params.id2
    try {
      const res = await client.http({ method: 'get', path: `/admin/${id}` })
      //admin.value = res
    } catch (err) {
      console.error('Error fetching admin:', err)
    }
  }
  
  const fetchPermissions = async () => {
    try {
      allPermissions.value = await client.http({ method: 'get', path: '/permissions' })
    } catch (err) {
      console.error('Error fetching permissions:', err)
    }
  }
  
  const togglePermission = (permId) => {
    const idx = admin.value.permissions.indexOf(permId)
    if (idx === -1) {
      admin.value.permissions.push(permId)
    } else {
      admin.value.permissions.splice(idx, 1)
    }
  }
  
  const getPermissionDescription = (id) => {
    const p = allPermissions.value.find(p => p.id === id)
    return p ? p.description : id
  }
  
  const startEdit = () => {
    originalPermissions.value = [...admin.value.permissions]
    isEditing.value = true
  }
  
  const cancelEdit = () => {
    admin.value.permissions = [...originalPermissions.value]
    isEditing.value = false
  }
  
  const saveChanges = async () => {
        const id = route.params.id2
      await client.http({
        method: 'post',
        path: `/admin-assign`,
        data: {adminId:admin.value.id, permissions: admin.value.permissions }
      })
      isEditing.value = false
  }
  
  const revokeAccess = async () => {
    try {
      await client.http({
        method: 'delete',
        path: `/admin/${route.params.adminId}`
      })
    } catch (err) {
      console.error('Error revoking access:', err)
    }
  }
  
  const adminInitials = computed(() => {
    const [first, last] = admin.value.name.split(' ')
    return `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase()
  })
  
  onMounted(() => {
    fetchAdmin()
    fetchPermissions()
  })
  </script>
  
  <style scoped>
  table th,
  table td {
    white-space: nowrap;
  }
  </style>
  