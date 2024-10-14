<template>
  
    <label class="tw-block tw-text-sm tw-font-medium tw-mb-1" for="username"
      >{{label}}</label
    >
    <InputText
      :disabled="disabled"
      :invalid="error_messages != ''"
      v-model="inputValue"
      :placeholder="placeholder"
      class="tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-px-3 tw-py-2"
    />
    <small
      v-if="error_messages != ''"
      class="tw-text-[#d13333]"
      id="username-help"
      >{{ error_messages }}</small
    >
</template>

<script>
import InputText from "primevue/inputtext";

export default {
  name: "TextField",
  components: {
    InputText,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    appendInnerIcon: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    error_messages: {
      type: String,
      default: "",
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>
