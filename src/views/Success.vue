<template>
    <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-screen tw-bg-[#f7f7f7]">
      <div class="checkmark-container tw-mb-5">
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
          <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      </div>
      
      <!-- Loop through messages and match with the id -->
      <div v-if="currentMessage" class="text-center">
        <h1 class="tw-text-4xl tw-font-semibold tw-text-black-700 tw-mb-4">
          {{ currentMessage.title }}
        </h1>
        <p class="tw-text-lg tw-text-gray-500 tw-text-center tw-mb-6">
          {{ currentMessage.description }}
        </p>
        <button @click="goHome(currentMessage.route)"
          class="tw-bg-black hover:tw-bg-black-600 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
          Back to Home
        </button>
      </div>
      <div v-else class="text-center">
        <h1 class="tw-text-4xl tw-font-semibold tw-text-black-700 tw-mb-4">
          Thank You!
        </h1>
        <p class="tw-text-lg tw-text-gray-500 tw-text-center tw-mb-6">
          Your process has been completed.
        </p>
        <v-btn @click="goHome('/')"
          class="tw-bg-black hover:tw-bg-black-600 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
          Back to Home
        </v-btn>
      </div>
    </div>
  </template>
  
  <script>
import { useClient } from '@/stores/client';

  export default {
    data() {
      return {
        id: null,
        messages: [
          {
            name: 'email', // Matches when the id is 'vendor'
            title: 'Email Verify Successful!',
            description: 'You can now login to your dashbaord',
            route: '/login'
          },
          {
            name: 'individual', // Matches when the id is 'individual'
            title: 'Password Reset Successful!',
            description: 'You can now return to your individual dashboard and log in with your new password.',
            route: '/login'
          },
          {
            name: 'corporate', // Matches when the id is 'corporate'
            title: 'Password Reset Successful!',
            description: 'You can now return to your dashboard and log in with your new password.',
            route: '/login'
          },
          {
            name: 'agent', // Matches when the id is 'agent'
            title: 'Password Reset Successful!',
            description: 'You can now return to your dashboard and log in with your new password.',
            route: '/login'
          }
        ],
        currentMessage: null,
        name:'',
      };
    },
    methods: {
      goHome(page) { 
        this.$router.push(page); // Adjust this based on your route configuration
      }
    },
    async created() {
      this.id = this.$route.params.token;
      this.name = this.$route.params.name;
      // Find the message corresponding to the id
      this.currentMessage = this.messages.find(message => message.name === this.name);
      useClient().http({method:'get', path:'verify/'+this.name+'/'+this.id})
    }
  };
  </script>
    
  <style scoped>
    .checkmark-container {
      width: 100px;
      height: 100px;
    }
    
    .checkmark {
      width: 100%;
      height: 100%;
    }
    
    .checkmark-circle {
      stroke: #E6E6E6;
      stroke-width: 2;
      stroke-dasharray: 166;
      stroke-dashoffset: 166;
      stroke-linecap: round;
      animation: circleAnimation 0.6s ease-in-out forwards;
    }
    
    .checkmark-check {
      stroke: black;
      stroke-width: 2;
      stroke-dasharray: 48;
      stroke-dashoffset: 48;
      stroke-linecap: round;
      animation: checkAnimation 0.3s ease-in-out 0.7s forwards;
    }
    
    @keyframes circleAnimation {
      100% {
        stroke-dashoffset: 0;
      }
    }
    
    @keyframes checkAnimation {
      100% {
        stroke-dashoffset: 0;
      }
    }
    
    body {
        margin: 0;
        font-family: "Inter", sans-serif;
    }
    </style>