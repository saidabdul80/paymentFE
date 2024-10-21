<template>
    <div class="form-container">
      <h2 class="tw-text-2xl tw-font-bold tw-mb-2">Business verification</h2>
      <p class="tw-mb-6">Kindly provide the following information for review and verification.</p>
  
      <div class="tw-mb-6">
        <TextField v-model="form.fullName" label="Full name" />
      </div>
  
      <div class="tw-mb-6">
        <TextField v-model="form.email" label="Email address" />
      </div>
  
      <div class="tw-mb-6">
        <label for="phone" class="tw-block tw-text-sm tw-font-medium tw-mb-1">Phone number</label>
        <div class="tw-flex">
          
            <vue-tel-input
              :dropdownOptions="{ showSearchBox: true, showFlags: true }"
              :inputOptions="{ showDialCode: true }"
              v-model="form.phoneNumber"
              mode="international"
              default-country="CA"
              ref="phoneInput"
              @validate="validatePhone"
              class="tw-rounded-xl  tw-w-full tw-p-[5px] tw-border tw-border-[#ccc] tw-text-black"
              :class="{
                'tw-border-red-500':
                  !isPhoneValid && form?.phoneNumber?.length > 4,
              }"></vue-tel-input>
         
            <!-- <select v-model="form.countryCode" class="tw-border tw-border-gray-300 tw-rounded-l-md tw-py-2 tw-px-3">
              <option value="+1">🇨🇦 +1</option>
             
            </select> -->
       
          <!-- <TextField v-model="form.phone" label="Phone number" class="tw-w-full tw-border tw-border-gray-300 tw-rounded-r-md tw-py-2 tw-px-3"/> -->
        </div>
      </div>
  
      <div class="tw-mb-6">
        <label class="tw-flex tw-text-sm tw-items-center">
          <input type="checkbox" v-model="form.isCorporateRepresentative" class="tw-mr-2"/>
          <span>I understand that the Corporate Representative is automatically assigned the Super Administrator role and as a result has complete access to all functions and can make autonomous decisions. Learn more about <a href="#" class="tw-text-blue-600">Super Administrators</a>.</span>
        </label>
      </div>
  
    </div>
  </template>
  
  <script>
  import TextField from '@/components/TextField.vue';
  import { VueTelInput } from "vue-tel-input";

    import "vue-tel-input/vue-tel-input.css";
  export default {
    components: {
      TextField,
      VueTelInput,
    },
    data() {
      return {
        businessTypes :[
          "Corporation",
          "Sole Proprietorship",
          " Limited",
          "Partnership",
          "LLC",
        ],
        form: {
          isPhoneValid: false,
          fullName: '',
          email: '',
          countryCode: '+1',
          phone: '',
          isCorporateRepresentative: false
        }
      };
    },
    computed: {
      formValid() {
        return this.form.fullName && this.form.email && this.form.phone && this.form.isCorporateRepresentative;
      }
    },
    methods: {
        validatePhone(event) {
            this.isPhoneValid = event.valid;
            },
      submitDetails() {
        if (this.formValid) {
          // Handle form submission
          console.log('Form submitted:', this.form);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styles if necessary */
  </style>
  