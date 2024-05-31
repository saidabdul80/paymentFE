<template>
  <v-dialog v-model="localDialog" max-width="400">
    <v-card class="text-center tw-py-10">
      <v-card-text class="text-center">
        <v-icon size="96px">{{ icon }}</v-icon>
        <v-card-title class="headline">
            <slot name="title" ><span class="tw-text-2xl tw-text-green-800">{{ title }}</span></slot>
        </v-card-title>
        <div class="tw-text-gray-500 tw-text-[11px] tw-mt-[-10px]">{{ message }}</div>
      </v-card-text>
      <!-- button slot -->
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
      localDialog: this.dialog,
    };
  },
  watch: {
    dialog(val) {
      this.localDialog = val;
    },
    localDialog(val) {
      this.$emit('update:dialog', val);
    },
  },
  methods: {
    cancel() {
      this.localDialog = false;
      this.$emit('cancel');
    },
    proceed() {
      this.localDialog = false;
      this.$emit('proceed');
    },
  },
};
</script>

<style scoped>
.v-icon {
  font-size: 48px;
  margin-bottom: 16px;
}
</style>
