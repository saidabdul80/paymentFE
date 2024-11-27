<template>
    <Special>
      <div class="tw-flex tw-justify-between tw-items-center tw-w-[90%] tw-mx-auto tw-bg-black">
        <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-5 tw-gap-8 tw-p-8">
          <!-- Contact Information -->
          <div class="tw-text-white tw-col-span-2">
            <h2 class="tw-text-3xl tw-font-bold">Contact Us</h2>
            <p class="tw-mt-4">We strive to make support as easy and well-organized as possible for you. Please use the following contact information to reach out to us or fill the form.</p>
            <p class="tw-mt-4"><a href="mailto:help@cowris.com">help@cowris.com</a></p>
            <p class="tw-mt-2"><a href="tel:+14164566217">+1 (416) 456-6217</a></p>
            <div class="tw-mt-8">
              <h3 class="tw-font-bold tw-text-lg">Customer Support</h3>
              <p class="tw-mt-2">Our customer support team is always available to address any concerns or queries you may have.</p>
            </div>
            <div class="tw-mt-8">
              <h3 class="tw-font-bold tw-text-lg">Feedback and Suggestions</h3>
              <p class="tw-mt-2">We value your feedback and your input is crucial in improving our service.</p>
            </div>
          </div>
          <div></div>
          <!-- Contact Form -->
          <div class="tw-bg-white tw-rounded-lg tw-shadow-lg tw-col-span-2 tw-p-8">
            <h2 class="tw-text-2xl tw-font-bold tw-text-gray-800">Get in Touch</h2>
            <p class="tw-mt-2 tw-text-gray-600">You can reach us anytime</p>
            <form @submit.prevent="handleSubmit" class="tw-mt-8">
              <div class="tw-grid tw-grid-cols-2 tw-gap-4">
                <TextField v-model="firstName" label="First Name" required />
                <TextField v-model="lastName" label="Last Name" required />
              </div>
              <TextField v-model="email" label="Email" required />
              <div class="tw-flex tw-mt-4">
                <vue-tel-input
                  :onlyCountries="['CA']"
                  :dropdownOptions="{ showSearchBox: false, showFlags: true }"
                  :inputOptions="{ showDialCode: true }"
                  v-model="phoneNumber"
                  mode="none"
                  default-country="CA"
                  ref="phoneInput"
                  @validate="validatePhone"
                  class="tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-px-3 tw-py-1"
                  :class="{
                    'tw-border-red-500': !isPhoneValid && form?.phone_number,
                  }"
                ></vue-tel-input>
                <small v-if="errors.phoneNumber" class="tw-text-[#d13333]">{{ errors.phoneNumber }}</small>
              </div>
              <textarea placeholder="How can we help?" style="border:1px solid #ddd" class="tw-w-full tw-mt-4 tw-px-4 tw-py-2 tw-border tw-rounded-lg" v-model="message"></textarea>
              <v-btn @click="contactUs" type="submit" class="tw-w-full tw-bg-black tw-text-white tw-font-bold tw-px-4 tw-py-2 tw-rounded-lg">Submit</v-btn>
              <p class="tw-mt-4 tw-text-center tw-text-gray-600">By contacting us you agree to our <a href="#" class="tw-text-blue-500">Terms and Conditions</a></p>
            </form>
          </div>
        </div>
      </div>
    </Special>
  </template>
  
  <script>
  import Special from "@/components/Special.vue";
  import TextField from "@/components/TextField.vue";
import { useClient } from "@/stores/client";
  import { VueTelInput } from "vue-tel-input";
  
  export default {
    components: {
      Special,
      VueTelInput,
      TextField,
    },
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
        errors: {},
        isPhoneValid: true,
      };
    },
    methods: {
      async contactUs() {
        this.errors = {}; // Reset errors
        if (this.validateForm()) {
          const payload = {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            phone_number: Number(this.phoneNumber.replaceAll(' ', '').replaceAll('+', '')),
            message: this.message,
          };
          try {
            const res = await useClient().http({method:'post', path:'/contact-us', data: payload});
            if (res) {
              this.global.palert({
                title: 'Thank you',
                text: 'We will get back to you soon',
                callback: () => {
                  this.$router.push('/login');
                },
              });
            }
          } catch (error) {
            console.error(error);
          }
        }
      },
      validateForm() {
        let valid = true;
        if (!this.firstName) {
          this.errors.firstName = 'First Name is required';
          valid = false;
        }
        if (!this.lastName) {
          this.errors.lastName = 'Last Name is required';
          valid = false;
        }
        if (!this.email) {
          this.errors.email = 'Email is required';
          valid = false;
        }
        if (!this.phoneNumber) {
          this.errors.phoneNumber = 'Phone Number is required';
          valid = false;
        } else if (!this.isPhoneValid) {
          this.errors.phoneNumber = 'Invalid phone number format';
          valid = false;
        }
        if (!this.message) {
          this.errors.message = 'Message is required';
          valid = false;
        }
        return valid;
      },
      validatePhone(isValid) {
        this.isPhoneValid = isValid;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  