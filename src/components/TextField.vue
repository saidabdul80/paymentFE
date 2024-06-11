<template>
    <label :class="`tw-text-[${$constants.dark}]`" v-if="label !== ''">
        {{ label }}
        <span v-if="isRequired" :class="`tw-text-red-600`">*</span>
    </label>
    <v-text-field 
        height="10px"
        v-model="inputValue" 
        :type="type"
        @click:append-inner="$emit('click:append-inner')"
        :placeholder="placeholder"
        :bg-color="$constants.input_background"
        :append-inner-icon="appendInnerIcon"
        :error-messages="error_messages"
        variant="outlined"
    ></v-text-field>
</template>

<script>
export default {
    name: 'TextField',
    props: {
        modelValue: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: false,
            default: ''
        },
        placeholder: {
            type: String,
            default: '',
        },
        isRequired: {
            type: Boolean,
            default: false,
        },
        appendInnerIcon:{
            default:''
        },
        type:{
            default:'text'
        },
        error_messages:{
            default:''
        }
    },
    computed: {
        inputValue: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            }
        }
    }
};
</script>

<style scoped>
</style>
