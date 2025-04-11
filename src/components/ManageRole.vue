<template>
    <div class="tw-bg-white tw-mt-[60px]">
      <!-- Header -->
      <div class=" tw-p-6  tw-flex sm:tw-flex-row tw-flex-col tw-justify-between tw-items-center tw-mb-6 tw-w-full">
        <Button icon="pi pi-plus" @click="visible = true" label="Add new role" class="tw-bg-white tw-text-gray-700 tw-border tw-border-gray-300 hover:tw-shadow" />
        <span class="p-input-icon-left md:tw-w-80 sm:tw-w-[15rem] tw-w-[10rem] tw-relative">
          <i class="pi pi-search tw-absolute tw-text-gray-300 tw-top-[14px] tw-left-2" />
          <InputText v-model="search" placeholder="Search by role name" class="tw-w-full" :pt="{root:{class:'tw-pl-8'}}" />
        </span>
      </div>
  
      <div
        v-for="(role, index) in filteredRoles"
        :key="role.id"
        class=" tw-border-b tw-p-6 tw-mb-4 "
      >
        <div class="tw-flex tw-justify-between tw-items-start">
          <div>
            <div class="tw-flex tw-items-center tw-mb-4">
              <span class="tw-h-2 tw-w-2 tw-rounded-full tw-bg-blue-600 tw-inline-block tw-mr-2"></span>
              <h2 class=" tw-text-md">{{ role.name }}</h2>
            </div>
  
            <div class="tw-flex tw-flex-wrap tw-gap-3 tw-mb-4">
              <template v-if="editIndex === index">
                <span
                  v-for="perm in allPermissions"
                  :key="perm.id"
                  @click="togglePermission(role, perm.id)"
                  :class="[
                    'tw-cursor-pointer tw-rounded-md tw-px-4 tw-py-2 tw-text-sm tw-flex tw-items-center tw-gap-2',
                    role?.permissions?.includes(perm.id)
                      ? 'tw-bg-green-100 tw-text-green-700'
                      : 'tw-bg-red-100 tw-text-red-700'
                  ]"
                >
                  {{ perm.description }}
                  <i :class="role?.permissions?.includes(perm.id) ? 'pi pi-check' : 'pi pi-plus'"></i>
                </span>
              </template>
              <template v-else>
                <span
                  v-for="perm in role.permissions"
                  :key="perm"
                  class="tw-bg-gray-100 tw-text-sm tw-rounded-md tw-px-4 tw-py-2"
                >
                  {{ getPermissionDescription(perm) }}
                </span>
              </template>
            </div>
  
            <div v-if="editIndex === index" class="tw-flex tw-gap-2">
              <Button label="Cancel" class="tw-bg-white tw-border tw-text-gray-800" @click="cancelEdit" />
              <Button label="Save changes" class="tw-bg-black tw-border-black tw-text-white" @click="saveChanges(role)" />
            </div>
          </div>
  
          <div class="tw-flex tw-space-x-2" v-if="editIndex !== index">
            <Button icon="pi pi-pencil" size="small" class="tw-p-1 tw-bg-white tw-text-gray-600 tw-border tw-border-gray-300" @click="editIndex = index" />
            <Button icon="pi pi-trash" size="small" class="tw-p-1 tw-bg-red-100 tw-text-red-600 tw-border tw-border-red-200" @click="deleteRole(role.id)" />
          </div>
        </div>
      </div>
  
      <Dialog :draggable="false"  v-model:visible="visible" modal header="" :style="{ width: '600px' }">
        <CreateRole @role-created="fetchRoles" />
      </Dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted } from 'vue'
  import Button from 'primevue/button'
  import InputText from 'primevue/inputtext'
  import Dialog from 'primevue/dialog'
  import CreateRole from './CreateRole.vue'
  import { useClient } from '@/stores/client'
  import { useGlobalsStore } from '@/stores/globals'
  
  const client = useClient()
  
  const roles = ref([])
  const allPermissions = ref([])
  const editIndex = ref(null)
  const visible = ref(false)
  const search = ref('')
  const backupPermissions = ref([])
  
  const fetchRoles = async () => {
    try {
      const res = await client.http({ method: 'get', path: '/roles' })
      if (res) {
        roles.value = res
      }
    } catch (err) {
      console.error('Error fetching roles:', err)
    }
  }
  
  const fetchPermissions = async () => {
    try {
      const res = await client.http({ method: 'get', path: '/permissions' })
      if (res) {
        allPermissions.value = res
      }
    } catch (err) {
      console.error('Error fetching permissions:', err)
    }
  }
  
  const togglePermission = (role, permId) => {
    const idx = role?.permissions?.indexOf(permId)
    if(!role.permissions) {
        role.permissions = []
    }
    if (idx === -1) {
      role.permissions.push(permId)
    } else {
      role.permissions.splice(idx, 1)
    }
  }
  
  const saveChanges = async (role) => {
    try {
      await client.http({
        method: 'put',
        path: `/roles/${role.id}`,
        data: {
          roleName: role.name,
          permissions: role.permissions
        }
      })
      editIndex.value = null
    } catch (err) {
      console.error('Error saving role:', err)
    }
  }
  
  const deleteRole = async (roleId) => {
    useGlobalsStore().palert({
        title:'Confirm Delete',
        text:'Deleting will erase this role and its permissions totally from the database. Note that this action cannot be undone.',
        cancelBtnText:'Delete',
        confirmBtnText:'Cancel',
        callback:async (res)=>{
            if(res){
                await client.http({ method: 'delete', path: `/roles/${roleId}`, showMesage:true })
                fetchRoles()
            }
        }
    })
  }
  
  const cancelEdit = () => {
    if (editIndex.value !== null) {
      roles.value[editIndex.value].permissions = [...backupPermissions.value]
      editIndex.value = null
    }
  }
  
  const filteredRoles = computed(() =>
    roles.value?.filter((role) =>
      role.name.toLowerCase()?.includes(search.value.toLowerCase())
    )
  )
  
  const getPermissionDescription = (permId) => {
    const perm = allPermissions.value.find((p) => p.id === permId)
    return perm ? perm.description : permId
  }
  
  watch(editIndex, (newVal) => {
    if (newVal !== null && roles.value[newVal]?.permissions) {
      backupPermissions.value = [...roles.value[newVal]?.permissions ]
    }
  })
  
  onMounted(() => {
    fetchRoles()
    fetchPermissions()
  })
  </script>
  