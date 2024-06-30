<template>
  <v-dialog v-model="internalShowModal" @update:modelValue="updateModal" max-width="550px">
    <v-card class="tw-p-6">
      <v-card-title class="tw-font-visby tw-font-bold tw-text-4xl">Role Management</v-card-title>
      <v-card-subtitle class="tw-font-visby tw-font-medium tw-text-[13px] tw-leading-5">
        Set a name and define responsibilities for staff members assigned this role.
        <hr class="tw-my-5">
      </v-card-subtitle>

      <v-card-text>
        <v-form class="tw-w-full">
          <TextField 
            v-model="role_name" :disabled="isEditing" 
            label="Name of Role" id="roleName"
            class="tw-w-full"
            :rules="emptyRules" name="roleName"/>
          <div class="tw-max-h-64 tw-overflow-auto">
            <v-checkbox class="tw-font-visby tw-font-medium tw-text-base" v-for="(action, index) in actions"
              :key="index" :color="$constants.primary" v-model="action.selected" :label="action.name"></v-checkbox>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions class="tw-flex tw-justify-center tw-gap-x-5Ÿ">
         <v-btn size="large" @click="cancel" 
          class="tw-bg-[#CCDFD6] tw-border-gray-700 tw-border tw-text-gray-900 tw-font-visby tw-font-semibold tw-text-base tw-normal-case tw-px-16">
          Cancel
        </v-btn>
        <v-btn type="submit" size="large" @click="saveRole" :loading="isLoading"
          class="tw-bg-gray-700 tw-font-visby tw-font-semibold tw-text-base tw-normal-case tw-text-white tw-px-9 tw-mr-4">
          Save this Role
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import TextField from '@/components/TextField.vue';

export default {
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    actions: {
      type: Array,
      required: true,
    },
    roleName: {
      type: String,
      required: true,
    },
    roleId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      internalShowModal: this.showModal,
      role_name: this.roleName,
      emptyRules: [
        value => !!value || 'This field is required.',
      ],
      isLoading: false,
      isEditing: false,
    };
  },
  watch: {
    showModal(newVal) {
      this.internalShowModal = newVal;
      if (newVal) {
        this.role_name = this.roleName; // Ensure role_name is updated when modal is shown
        this.isEditing = this.roleId !== null; // Determine if editing based on roleId presence
      }
    },
    internalShowModal(newVal) {
      this.$emit('update:showModal', newVal);
    },
    roleName(newVal) {
      this.role_name = newVal; // Ensure role_name is updated when roleName prop changes
    }
  },
  computed: {
    isValidForm() {
      return this.emptyRules.every(rule => rule(this.role_name) === true);
    }
  },
  methods: {
    updateModal(value) {
      this.internalShowModal = value;
    },
    async saveRole() {
      if (!this.isValidForm) return;

      this.isLoading = true;
      const payload = { roleId: this.roleId, roleName: this.role_name, actions: this.actions };
      if (this.roleId) {
        this.$emit('update-role', payload); // Emit update-role event
      } else {
        this.$emit('create-role', payload); // Emit create-role event
      }
      this.isLoading = false;
      this.$emit('update:showModal', false);
    },
    cancel() {
      this.$emit('update:showModal', false); // Emit event to close modal without saving
    }
  },
  components: {
    TextField
  }
};
</script>

<style scoped>

</style>
