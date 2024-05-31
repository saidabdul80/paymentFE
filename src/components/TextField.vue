<template>
    <label :for="id" class="tw-block tw-text-sm tw-font-medium tw-leading-6"
        :class="`tw-text-[${$constants.secondary_dark}]`">
        {{ label }}
        <span v-if="isRequired" :class="`tw-text-[${$constants.danger}]`">*</span>
    </label>
    <div class="tw-mt-2">
        <v-text-field variant="outlined" :color="$constants.secondary" :placeholder="placeholder" :id="id" :name="name"
            :autocomplete="autoComplete" :type="type" :bg-color="$constants.secondary"
            :border="$constants.secondary_dark" shadow='false'></v-text-field>
    </div>
</template>

<script>
export default {
    name: 'TextField',
    props: {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
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
