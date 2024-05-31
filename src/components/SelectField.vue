<template>
    <div>
        <label :for="id" class="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
            {{ label }}
            <span v-if="isRequired" class="text-red">*</span>
        </label>
        <div class="tw-mt-2">
            <v-select variant="outlined" bg-color="#f5f6fa" color="green" :items="items" :required="isRequired" :id="id"
                :name="name" :autocomplete="autoComplete" :rules="rules" :search-input.sync="search" :value="value"
                @input="onInput">
            </v-select>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SelectField',
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
        items: {
            type: Array,
            required: true,
        },
        isRequired: {
            type: Boolean,
            default: false,
        },
        value: {
            type: [String, Number],
            default: '',
        },
        rules: {
            type: Array,
            default: () => [],
        }
    },
    methods: {
        onInput(newVal) {
            this.$emit('input', newVal);
        }
    }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
