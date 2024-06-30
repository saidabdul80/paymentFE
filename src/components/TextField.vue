<template>
    <label :class="`tw-text-[${$constants.neutral}] tw-font-semibold`" v-if="label !== ''">
        {{ label }}
        <span v-if="isRequired" :class="`tw-text-red-600`">*</span>
    </label>
    <v-text-field 
        v-model="inputValue" 
        :type="type"
        @click:append-inner="$emit('click:append-inner')"
        :placeholder="placeholder"
        :bg-color="$constants.input_background"
        :append-inner-icon="appendInnerIcon"
        :error-messages="error_messages"
        variant="outlined"
        flat
        class="gTextField"
        :color="`tw-border-[${$constants.secondary_light}]`"
        :rules="rules"
        :disabled="disabled"
    ></v-text-field>
</template>

<script>
export default {
    name: 'TextField',
    props: {
        modelValue: {
            type: String,            
        },
        label: {
            type: String,            
            default: ''
        },
        rules: {
            type: Array,
            default: []
        },
        placeholder: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
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

<style>

</style>
