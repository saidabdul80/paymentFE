<template>
    <label :for="id" class="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
        {{ label }}
        <span v-if="isRequired" class="text-red">*</span>
    </label>
    <div class="tw-mt-2">
        <!-- <v-select variant="outlined" :items="items"></v-select> -->
        <v-select :items="items" variant="outlined" v-bind="$attrs" v-on="$listeners"></v-select>
    </div>
    <!-- <v-select :items="items" v-model="individualTaxPayerStore.individualTaxPayerData.personalGender"
        :error_messages="globalStore.nameRules?.personalGender" variant="outlined"></v-select> -->
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
