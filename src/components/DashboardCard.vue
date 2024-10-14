<template>
    <div class="tw-bg-white tw-rounded-lg tw-p-4 tw-shadow-md tw-flex tw-items-center tw-justify-between">
      <!-- Wallet Info -->
      <div>
        <p class="tw-text-gray-500">Wallet balance</p>
        <h2 class="tw-text-3xl tw-font-bold tw-text-black">{{ formattedBalance }}</h2>
        <p class="tw-text-sm tw-text-gray-500">
          From {{ formattedPreviousBalance }} (last month)
        </p>
      </div>
  
      <!-- Change Percentage -->
      <div class="tw-flex tw-items-center">
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
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Optional custom styles */
  </style>
  