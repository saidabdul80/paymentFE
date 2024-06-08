<template>
  <div>
    <label :class="`tw-text-[${$constants.dark}]`">
      {{ outerLabel }}
    </label>
    <v-text-field v-model="inputValue" :placeholder="placeholder" variant="outlined" prepend-icon=""
      @input="$emit('update:modelValue', $event.target.value)" :bg-color="$constants.input_background">
      <template v-slot:append>
        <span
          class="tw-p-4 tw-rounded-r-md tw-border tw-border-gray-400 tw-ml-[-18px]  tw-bg-[#CCDFD6] tw-text-green-900 cursor-pointer"
          @click="handleClick">
          {{ title }}
        </span>
      </template>
    </v-text-field>
  </div>
</template>

<script>
export default {
  name: "VerifyInput",
  emits: ['update:modelValue'],
  props: {
    outerLabel: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: '',
    },
  },
  watch: {
    value(newVal) {
      this.$emit('input', newVal);
    },
    vModel(newVal) {
      this.$emit('input', newVal);
    }
  },



  methods: {
    handleClick() {
      // Emit the inputValue along with the event
      this.$emit('handleClick', this.inputValue)
    }
  }
}
</script>
