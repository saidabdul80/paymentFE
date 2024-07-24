<template>
    <div>
      <label :class="`tw-text-[${$constants.neutral}] tw-font-semibold`">        
        Currency
        <span class="tw-text-red-600 "></span>
    </label>
      <v-select
        v-model="selectedCurrency"
        :items="currencies"
        
        outlined
        required 
        :bg-color="$constants.input_background"       
        variant="outlined"
      ></v-select>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CurrencySelect',
    props: {
      modelValue: String,
      label: {
        type: String,
        default: '',
      },
      isRequired: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        currencies: ['USD', 'CAD', 'EUR', 'GBP'], // Add more currencies as needed
        selectedCurrency: this.modelValue || ''
      };
    },
    watch: {
      selectedCurrency(newValue) {
        this.$emit('update:modelValue', newValue);
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  