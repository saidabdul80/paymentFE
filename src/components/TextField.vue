<template>
    <label :class="`tw-text-[${$constants.dark}]`">
        {{ label }}
        <span v-if="isRequired" :class="`tw-text-red-600`">*</span>
    </label>
    <v-text-field v-model="modelValue" @click:append-inner="$emit('click:append-inner')"
        @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder"
        :bg-color="$constants.input_background" variant="outlined"></v-text-field>
</template>

<script>
export default {
    name: 'TextField',
    emits: ['update:modelValue'],
    props: {
        label: {
            type: String,
            required: true,
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


<!-- <template>
    <label :class="`tw-text-[${$constants.dark}]`">
        {{ label }}
        <span v-if="isRequired" :class="`tw-text-red-600`">*</span>
    </label>
    <v-text-field :placeholder="placeholder" variant="outlined" :bg-color="$constants.input_background"></v-text-field>
</template>

<script>
export default {
    name: 'TextField',
    props: {
        label: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            default: '',
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
</style> -->
