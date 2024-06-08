<template>
       <VueDatePicker v-model="inputValue"  :format="format"   @date-update="$emit('change', inputValue)" />
</template>

<script>
export default {
    props:{
        modelValue: {
            type: String,
            required: true,
        },
        format:{
            type:String,
            default:'yyyy-mm-dd'
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
}
</script>