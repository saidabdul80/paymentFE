<template>
  <div class="tw-p-6 tw-bg-white tw-mx-1 tw-border tw-rounded-2xl ">
                 <div v-if="Ls.hasPermission(abilities.EDIT_ROLE)" class="tw-flex tw-justify-between tw-items-center">
                     <h3 :class="`tw-text-[${$constants.secondary}]`" class="tw-font-visby tw-capitalize tw-text-2xl tw-font-bold">{{ title }}</h3>
                     <v-btn v-if="showEdit" variant="outlined" class="tw-text-gray-700 tw-bg-[#CCDFD6] tw-text-xs tw-normal-case"
                     @click="$emit('EditPermissions')">
                         <v-icon class="tw-mr-1 " size="large" left>mdi-pencil-outline</v-icon> Edit Permissions
                     </v-btn>
                 </div>
                 
                 <hr class="tw-my-4" />
                 <div class="tw-flex tw-flex-wrap tw-gap-2">
                     <v-chip v-for="(permission, index) in permissions" :key="index"
                         class="tw-bg-[#E8F8F0] tw-font-semibold tw-capitalize tw-text-base tw-font-visby  tw-text-[#065F46]" outlined>
                         {{ permission.name }}
                     </v-chip>
                 </div>
             </div>
   </template>
   
<script>

import abilities from '@/admin/stubs/abilities';
import ls from '@/services/ls';

   export default {
     name: 'PermissionCard',
     data() {
      return {
        Ls: ls,
        abilities:abilities
      }
     },
     props: {
       title: {
         type: String,
         required: true
       },
       permissions: {
         type: Array,
         required: true
       },
       showEdit:{
        type:Boolean,
        default:true
       }
     }
 }
   </script>
   
   <style scoped>
   /* Add any custom styles if needed */
   </style>
   