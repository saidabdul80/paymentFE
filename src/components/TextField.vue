<template>
    <div>
        <label :for="id" class="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900">
            {{ label }}
            <span v-if="isRequired" class="text-red">*</span>
        </label>
        <div class="tw-mt-2">
            <v-text-field variant="outlined" color="green" :placeholder="placeholder" :required="isRequired" :id="id"
                :name="name" :autocomplete="autoComplete" :rules="rules" :type="type" bg-color="#f5f6fa"
                border="#d5d5d5" shadow='false'></v-text-field>
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
