<template>
    <label class="tw-block tw-text-left tw-text-sm tw-font-medium tw-mb-1">
        {{ label }}
        <span v-if="isRequired" class="text-red">*</span>
    </label>
    <Select :filter="filter" :option-label="optionLabel" :option-value="optionValue" @change="$emit('change', true)"  class="tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-px-3 " :options="options" variant="outlined" v-bind="$attrs" v-on="$listeners" ></Select>
    <small v-if="errorMessages !== ''" class="tw-text-[#d13333]" id="username-help">{{ errorMessages }}</small>
</template>

<script>
import Select from 'primevue/select';


export default {
    name: 'SelectField',
    components: {
        Select,
    },
    props: {
        label: {
            type: String,
            required: true,
        },
        options: {
            type: Array,
            required: true,
        },
        optionLabel: {
            type: String,
            default: null,
        },
        optionValue: {
            type: String,
            default: null,
        },
        isRequired: {
            type: Boolean,
            default: false,
        },
        filter: {
            type: Boolean,
            default: false,
        },
        disabled: {
        type: Boolean,
        default: false,
        },
        errorMessages: {
        type: String,
        default: "",
        },
    },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
