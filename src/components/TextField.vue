<template>
    <label :class="`tw-text-[${$constants.dark}]`">
        {{ label }}
        <span v-if="isRequired" :class="`tw-text-red-600`">*</span>
    </label>
    <v-text-field v-model="modelValue" @click:append-inner="$emit('click:append-inner')"
        @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder"
        :bg-color="$constants.input_background" variant="outlined"></v-text-field>

    <!-- <div class="tw-mt-2">
        <v-text-field v-model="modelValue" :color="$constants.secondary_light" :rules="rules"
            @click:append-inner="$emit('click:append-inner')" @input="$emit('update:modelValue', $event.target.value)"
            :append-inner-icon="append_inner_icon" :placeholder="placeholder" :id="id" :name="name"
            :autocomplete="autoComplete" :error-messages="error_messages" :type="type"
            :bg-color="$constants.secondary_light" :border="$constants.secondary" shadow='false'
            variant="outlined"></v-text-field>
    </div> -->
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
