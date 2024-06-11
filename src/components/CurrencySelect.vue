<template>
    <label :class="`tw-text-[${$constants.dark}]`" v-if="label !== ''">
        Currency
        <span v-if="isRequired" :class="`tw-text-red-600`">*</span>
    </label>
    <v-select
      v-model="selectedCurrency"
      :items="currencies"
      label="Currency"
      outlined
      @change="handleCurrencyChange"
      required
    ></v-select>
  </template>
  
  <script>
  export default {
    name: 'CurrencySelect',
    props: {
      value: String
    },
    data() {
      return {
        currencies: ['USD', 'CAD', 'EUR', 'GBP'], // Add more currencies as needed
        selectedCurrency: this.value || ''
      };
    },
    methods: {
      handleCurrencyChange() {
        this.$emit('input', this.selectedCurrency);
      }
    }
  };
  </script>
  