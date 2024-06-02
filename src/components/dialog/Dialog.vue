<template>
  <v-dialog v-model="showDialog" max-width="450">
    <v-card class="text-center tw-py-8">
      <v-card-text class="text-center">
        <v-icon size="96px" :class="`tw-text-[${$constants.primary}]`" :icon="icon" ></v-icon>
        <v-card-title class="headline">
            <slot name="title" ><span :class="`${$constants.text_size.s5} tw-text-[${$constants.primary}]`">{{ title }}</span></slot>
        </v-card-title>
        <div :class="`tw-text-[${$constants.dark}] ${$constants.text_size.s1}`" class="tw-text-[11px] tw-mt-[-10px]">{{ message }}</div>
        <!-- button goes here -->
        <div :class="{ 'tw-mt-6': !!$slots.buttons }">
          <slot name="buttons" />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: 'Message content goes here.',
    },
    icon: {
      type: String,
      default: 'mdi-alert-circle',
    },
  },
  data() {
    return {
      showDialog: this.dialog,
    };
  },
  watch: {
    dialog(val) {
      this.showDialog = val;
    },
    showDialog(val) {
      this.$emit('update:dialog', val);
    },
  },
  methods: {
    handleButtonClick(buttonType) {
      this.$emit('buttonClick', buttonType); // emit button click event with buttonType as argument
    },
  },
};
</script>

<style scoped>
</style>
