<template>
    <div class="text-center pa-4">
      <v-dialog v-model="internalModel" max-width="579px" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">Open Dialog</v-btn>
        </template>
  
        <v-card>
          <v-card-title
            class="tw-px-5"
            :class="{ 'flex-row-reverse': true, 'tw-pb-0': true }"
          >
            <!-- You can place a close button here if needed -->
          </v-card-title>
  
          <v-card-text class="tw-px-0">
            <div class="tw-mt-1">
              <div class="tw-pb-6" v-if="imgPath">
                <img :src="getImageUrl()" width="148px" class="tw-mx-auto" />
              </div>
              <h1
                class="tw-text-[32px] tw-font-semibold tw-px-2 tw-text-center"
                :class="`tw-text-[${$constants.secondary}]`"
              >
                {{ title }}
              </h1>
            </div>
  
            <p class="tw-text-center tw-pb-6 tw-px-0">{{ text }}</p>
          </v-card-text>
  
          <v-card-actions>
            <div
              class="tw-w-full tw-flex"
              :class="
                cancelBtnText && confirmBtnText
                  ? 'tw-justify-center tw-gap-x-3'
                  : 'tw-justify-center'
              "
            >
              <v-btn
                v-if="cancelBtnText"
                @click="handleCancel"
                color="gray"
                outlined
                class="tw-h-[48px] tw-w-[45%] tw-shadow-none tw-bg-gray-200"
              >
                {{ cancelBtnText }}
              </v-btn>
              <v-btn
                v-if="confirmBtnText"
                @click="handleOk"
                :loading="loading"
                color="white"
                dark
                class="tw-h-[48px] tw-w-[45%] tw-bg-black tw-text-white"
              >
                {{ confirmBtnText }}
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  import useAdminStore from '@/admin/stores/admin';
  export default {
    props: {
      modelValue: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: "",
      },
      text: {
        type: String,
        default: "",
      },
      confirmBtnText: {
        type: String,
        default: "Ok",
      },
      cancelBtnText: {
        type: String,
        default: null,
      },
      loading: {
        type: Boolean,
        default: false,
      },
      imgPath: {
        type: String,
        default: null,
      },
    },
    data() {
      return {
     
        adminStore: useAdminStore()
      };
    },
    computed: {
      internalModel: {
        get() {
          return this.modelValue;
        },
        set(val) {
          this.$emit("update:modelValue", val);
        },
      },
    },
    methods: {
      handleOk() {
        this.$emit("confirm", this.text);
        this.adminStore.handleAlertResponse(true);
      },
      handleCancel() {
        this.$emit("cancelAlert", false);
        this.adminStore.handleAlertResponse(false);
        this.internalModel = false;
      },
      getImageUrl() {
        return new URL(`../assets/${this.imgPath}`, import.meta.url);
      },
    },
  };
  </script>
  