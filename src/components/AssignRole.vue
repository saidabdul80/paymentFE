<template>
    <div class="tw-p-0 tw-max-w-md tw-mx-auto">
      <h2 class="tw-text-xl tw-font-semibold tw-mb-1">Select role</h2>
      <p class="tw-text-gray-500 tw-mb-6">You can select from the roles below.</p>
  
      <div class="tw-space-y-4 tw-mb-10">
        <label
          v-for="role in roles"
          :key="role.id"
          class="tw-flex tw-items-center tw-space-x-3 tw-cursor-pointer"
        >
          <input
            type="radio"
            :value="role.id"
            v-model="selectedRoleId"
            class="tw-form-radio tw-text-black tw-w-5 tw-h-5"
          />
          <span
            class="tw-font-medium"
            :class="{ 'tw-font-bold': role.id === selectedRoleId }"
          >
            {{ role.name }}
          </span>
        </label>
      </div>
  
      <button
        :loading="assignRoleLoading"
        class="tw-bg-black tw-text-white tw-py-3 tw-px-6 tw-rounded-xl tw-w-full tw-text-sm disabled:tw-bg-gray-300"
        :disabled="selectedRoleId === currentRoleId"
        @click="assignRole"
      >
        Save new role
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useClient } from '@/stores/client'
  
  const emit = defineEmits(['role-assigned'])
  const assignRoleLoading = ref(false)
  defineProps({
    adminId: {
      type: String,
      required: true,
    },
    roleId: {
      type: String,
      required: true,
    },
  })
  
  const roles = ref([])
  const selectedRoleId = ref(null)

  
  const client = useClient()
  
  const fetchRoles = async () => {
      const res = await client.http({
        method: 'get',
        path: `/roles`, 
      })
      roles.value = res
      selectedRoleId.value = roleId
  }
  
  const assignRole = async () => {
    assignRoleLoading.value = true
      await client.http({
        method: 'post',
        path: `/assign`,
        data: {
          adminId:adminId,
          roleId: selectedRoleId.value,
        },
        showMesage:true
      })
      assignRoleLoading.value = false
      emit('role-assigned', true)
    
  }
  
  onMounted(fetchRoles)
  </script>
  