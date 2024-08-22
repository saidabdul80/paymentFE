<template>
    <div class="tw-relative tw-w-full">
        <label :class="`tw-text-[${$constants.neutral}] tw-font-semibold`" v-if="label !== ''">
            {{ label }}
            <span v-if="isRequired" class="tw-text-red-600">*</span>
        </label>
        <InputText
            v-model="inputValue"
            :type="type"
            :placeholder="placeholder"
            :disabled="disabled"
            :class="`tw-w-full tw-border tw-h-[56px]`"
            :style="{ 'padding-right': appendInnerIcon ? '2.5rem' : '' }"
        />
        <i v-if="appendInnerIcon" :class="`pi ${appendInnerIcon} tw-absolute tw-right-3 tw-top-1/2 tw-transform tw--translate-y-1/2`" @click="$emit('click:append-inner')"></i>
        <small v-if="error_messages" class="tw-text-red-600">{{ error_messages }}</small>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext';

export default {
    name: 'TextField',
    components: {
        InputText
    },
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        isRequired: {
            type: Boolean,
            default: false
        },
        appendInnerIcon: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        error_messages: {
            type: String,
            default: ''
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
