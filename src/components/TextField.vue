<template>
    <!-- <label :class="`tw-text-[${$constants.dark}] tw-pb-[10px] font-bold`" v-if="label !== ''">
        {{ label }}
        <span v-if="isRequired" :class="`tw-text-red-600`">*</span>
    </label> -->
    <v-text-field 
        class="tw-h-[64px]"
        v-model="inputValue" 
        :label="label"
        :type="type"
        @click:append-inner="$emit('click:append-inner')"
        :placeholder="placeholder"        
        :append-inner-icon="appendInnerIcon"
        :error-messages="error_messages"
        
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
