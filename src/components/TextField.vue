<template>
  <div>
    <label class="tw-block tw-text-sm tw-font-medium tw-text-left tw-mb-1">{{ label }}</label>
    <InputText
    @keyup="$emit('keyup')"
      @update:modelValue="$emit('change')"
      :disabled="disabled"
      :invalid="errorMessages !== ''"
      v-model="inputValue"
      :placeholder="placeholder"
      class="tw-block tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-px-3 tw-py-2"
    />
    <small v-if="errorMessages !== ''" class="tw-text-[#d13333]" id="username-help">{{ errorMessages }}</small>
  </div>
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
    errorMessages: {
      type: String,
      default: "",
    }
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
