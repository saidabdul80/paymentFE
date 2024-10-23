<template>
    <div class="md:tw-border-l-4 tw-bg-white tw-w-full  tw-border-y tw-border-gray-300  tw-border-b-4 md:tw-border-b-0 tw-p-4  tw-flex tw-items-center tw-justify-between">
      <!-- Wallet Info -->
      <div>
        <p class="tw-text-gray-500 tw-capitalize">{{name}}</p>
        <h2 class="tw-text-2xl tw-font-[600] tw-text-black" style="letter-spacing: 2px;">{{ formattedBalance }}</h2>
        <p class="tw-text-sm tw-text-gray-500" v-if="previousBalance != '-'">
          From {{ formattedPreviousBalance }} (last month)
        </p>
      </div>
  
      <!-- Change Percentage -->
      <div class="tw-flex tw-items-center" v-if="percentageChange != '-'">
        <span
          class="tw-px-2 tw-py-1 tw-rounded-full tw-bg-green-100 tw-text-green-600"
          v-if="percentageChange >= 0"
        >
          ↑ {{ percentageChange }}%
        </span>
        <span
          class="tw-px-2 tw-py-1 tw-rounded-full tw-bg-red-100 tw-text-red-600"
          v-else
        >
          ↓ {{ Math.abs(percentageChange) }}%
        </span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      name:{},
      balance: {
        type: Number,
        required: true,
      },
      previousBalance: {
        type: Number,
        required: true,
      },
      percentageChange: {
        type: Number,
        required: true,
      },
    },
    computed: {
      formattedBalance() {
        return this.formatCurrency(this.balance);
      },
      formattedPreviousBalance() {
        return this.formatCurrency(this.previousBalance);
      },
    },
    methods: {
       formatCurrency(value) {
        if (value >= 1000000) {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 1,
          }).format(value / 1000000) + 'M';
        } else {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(value);
        }
      }

    },
  };
  </script>
  
  <style scoped>
  /* Optional custom styles */
  </style>
  