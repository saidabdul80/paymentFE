<template>
    <div class="sm:tw-col-span-2 sm:tw-col-start-1">
        <label :for="id" class="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
            {{ label }}
            <span v-if="isRequired" class="text-red">*</span>
        </label>
        <div class="tw-mt-2">
            <input type="text" :name="name" :id="id" :autocomplete="autoComplete" :placeholder="placeholder"
                class="tw-block tw-w-full tw-rounded-md tw-border-0 tw-py-1.5 tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 tw-placeholder:text-gray-400 tw-focus:ring-2 tw-focus:ring-inset tw-focus:ring-indigo-600 sm:tw-text-sm sm:tw-leading-6" />
        </div>
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
            default: false
        },
    },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>