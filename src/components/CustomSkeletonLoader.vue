<template>
    <div :style="{ width: width, height: height }" class="tw-bg-gray-200 tw-rounded-md tw-animate-pulse"></div>
  </template>
  
  <script>
  export default {
    props: {
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '56px' // Adjust this value to match the height of your TextField
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  