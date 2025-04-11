<template>
    <div class="tw-w-full tw-p-3">
      <!-- Title -->
      <h1 class="tw-text-2xl tw-font-bold tw-text-center tw-mb-2">Create new role</h1>
      <p class="tw-text-center tw-text-sm tw-text-gray-500 tw-mb-6">Enter the name of the new role.</p>
  
      <!-- Role name input -->
      <div class="tw-mb-6">
        <label class="tw-block tw-mb-2 tw-font-medium">Role name</label>
        <InputText v-model="roleName" placeholder="Role name" class="tw-w-full tw-py-2" />
      </div>
  
      <!-- Permissions section -->
      <div class="tw-mb-6">
        <label class="tw-block tw-mb-2 tw-font-medium">Add permissions</label>
        <div class="tw-flex tw-flex-wrap tw-gap-3">
          <span
            v-for="permission in allPermissions"
            :key="permission.id"
            @click="togglePermission(permission)"
            :class="[
              'tw-cursor-pointer tw-px-4 tw-py-2 tw-rounded-md tw-text-sm tw-flex tw-items-center tw-gap-2',
              selectedPermissions.includes(permission.id)
                ? 'tw-bg-green-100 tw-text-green-700'
                : 'tw-bg-gray-100 tw-text-gray-700'
            ]"
          >
            {{ permission.description }}
            <i
              :class="[
                'pi',
                selectedPermissions.includes(permission.id) ? 'pi-check' : 'pi-plus',
                selectedPermissions.includes(permission.id) ? 'tw-text-green-600' : 'tw-text-gray-400'
              ]"
            />
          </span>
        </div>
      </div>
  
      <!-- Submit button -->
      <Button
        label="Save new role"
        class="tw-bg-black tw-text-white tw-w-full tw-py-3 tw-rounded-2xl tw-font-semibold"
        @click="saveRole"
        :loading="saving"
        :disabled="!roleName"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import Button from 'primevue/button'
  import InputText from 'primevue/inputtext'
  import { useClient } from '@/stores/client'
  
  const roleName = ref('')
  const selectedPermissions = ref([])
  const allPermissions = ref([])
  const saving = ref(false)
  
  const emit = defineEmits(['role-created'])
  const togglePermission = (perm) => {
    const index = selectedPermissions.value.indexOf(perm.id)
    if (index === -1) {
      selectedPermissions.value.push(perm.id)
    } else {
      selectedPermissions.value.splice(index, 1)
    }
  }
  
  const fetchPermissions = async () => {
    try {
      const res = await useClient().http({ method: 'get', path: '/permissions' })
      if (res) {
        allPermissions.value = res
      }
    } catch (err) {
      console.error('Failed to fetch permissions:', err)
    }
  }
  
  fetchPermissions()
  
  const saveRole = async () => {
    saving.value = true
    const newRole = {
      roleName: roleName.value,
      permissions: selectedPermissions.value
    }
  
    try {
      const res = await useClient().http({ method: 'post', path: '/roles', data: newRole, showMesage:true  })
      if (res) {
        // Optionally re-fetch roles or reset form
        roleName.value = ''
        selectedPermissions.value = []
        fetchPermissions()
        emit('role-created', true)
      }
    } catch (err) {
      console.error('Failed to save role:', err)
    } finally {
      saving.value = false
    }
  }
  </script>
  