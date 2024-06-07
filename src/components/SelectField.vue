<template>
    <label :class="`tw-text-[${$constants.dark}]`">
        {{ label }}
        <span v-if="isRequired" class="text-red">*</span>
    </label>
    <v-select :items="items" variant="outlined" v-bind="$attrs" v-on="$listeners"
        :bg-color="$constants.input_background"></v-select>
</template>

<script>
export default {
    name: 'SelectField',
    props: {
        label: {
            type: String,
            required: true,
        },
        items: {
            type: Array,
            required: true,
        },
        isRequired: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
