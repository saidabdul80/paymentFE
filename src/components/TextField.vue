<template>
    <label :for="id" class="tw-block tw-text-sm tw-font-medium tw-leading-6"
        :class="`tw-text-[${$constants.secondary}] tw-bg-[${$constants.danger}]/20`">
        {{ label }}
        <span v-if="isRequired" :class="`tw-text-red-600`">*</span>
    </label>
    <div class="tw-mt-2">
        <v-text-field v-model="modelValue" :color="$constants.secondary_light" :rules="rules"
            @click:append-inner="$emit('click:append-inner')" @input="$emit('update:modelValue', $event.target.value)"
            :append-inner-icon="append_inner_icon" :placeholder="placeholder" :id="id" :name="name"
            :autocomplete="autoComplete" :error-messages="error_messages" :type="type"
            :bg-color="$constants.secondary_light" :border="$constants.secondary" shadow='false'
            variant="outlined"></v-text-field>
    </div>
</template>

<script>
export default {
    name: 'TextField',
    emits: ['update:modelValue'],
    props: {
        append_inner_icon: {
            type: String,
        },
        error_messages: {
            type: String,
        },
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        density: {
            type: String,
        },
        label: {
            type: String,
            required: true,
        },
        autoComplete: {
            type: String,
            default: 'off',
        },
        placeholder: {
            type: String,
            default: '',
        },
        isRequired: {
            type: Boolean,
            default: false,
        },
        value: {
            type: String,
            default: '',
        },
        rules: {
            type: Array,
            default: () => [],
        },
        type: {
            type: String,
            default: '',
        }
    },
    watch: {
        value(newVal) {
            this.$emit('input', newVal);
        },
        vModel(newVal) {
            this.$emit('input', newVal);
        }
    }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
