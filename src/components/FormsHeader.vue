<template>
        <div class="text-caption tw-px-2 tw-ml-2 mb-8">
            <h4 :class="`tw-text-[${$constants.primary}] ${$constants.text_size.s5}`" class="tw-font-visby tw-font-black tw-text-2xl tw-uppercase">{{ header }}</h4>
            <div :class="`tw-text-[${$constants.dark}] ${$constants.text_size.s3}`" class="tw-font-visby tw-font-medium tw-text-base">{{ title }}</div>
        </div>
  </template>
  
<script>

  
  export default {
    name: 'FormsHeader',
    props: {
        header:{
            type: String,
            default:'tax-collecting vendor registration'
        },
      title: {
        type: String,
        default:'Follow the steps to register a new vendor.',
      },
    },
 
  };
  </script>
  