<template>
    <div>
      
      <v-select
        v-model="selectedCurrency"
        :items="currencies"
        label="Currency"
        outlined
        required
        variant="solo"
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
  