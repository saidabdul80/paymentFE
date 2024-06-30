<template>
  <div class="tw-p-6 tw-bg-white tw-mx-1 tw-border tw-rounded-2xl">
                 <div class="tw-flex tw-justify-between tw-items-center">
                     <h3 :class="`tw-text-[${$constants.secondary}]`" class="tw-font-visby tw-capitalize tw-text-2xl tw-font-bold">{{ title }}</h3>
                     <v-btn variant="outlined" class="tw-text-green-700 tw-bg-[#CCDFD6] tw-text-xs tw-normal-case"
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
   export default {
     name: 'PermissionCard',
     props: {
       title: {
         type: String,
         required: true
       },
       permissions: {
         type: Array,
         required: true
       }
     }
 }
   </script>
   
   <style scoped>
   /* Add any custom styles if needed */
   </style>
   