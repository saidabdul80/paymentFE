<template>
    <div>
        <label :class="[` tw-block tw-capitalize tw-text-gray-700 tw-text-sm tw-font-semibold`,labelClass]" v-if="label !== ''">
            {{ label }}
            <span v-if="isRequired" class="tw-text-red-600">*</span>
        </label>
        <div class="tw-relative tw-w-full">
        <InputText :pt="{root:{style:'height:'+height}}" v-bind="$attrs" v-model="internalInputValue" :placeholder="placeholder" :disabled="disabled"
            :readonly="readonly" :type="type" :style="style" class="tw-w-full"
            :class="'tw-bg-['+$constants.input_background+ '] ' + ' tw-border-[#ccc]'" @input="validate" @blur="validate"
            />
            <!-- @focus="$emit('focus', $event)"  -->
       <!-- Append Inner Icon -->
       <span 
        v-if="appendInnerIcon" 
        class="tw-absolute tw-right-3 tw-top-1/2 tw-transform tw--translate-y-1/2 tw-cursor-pointer"
        @click="$emit('click:append-inner')"
      >
      <v-icon v-if="icon != ''" :class="`tw-text-[${$constants.gray}]`" :icon="appendInnerIcon"></v-icon>
      </span>
    </div>
        <p v-if="errorMessage !== '' || errorMessage != null || errorMessage != undefined" class="tw-text-red-700 tw-text-xs tw-m-1">{{ errorMessage }}</p>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import { constants } from '@/helpers/constants';

export default {
    name: 'CustomInputText',
    components: {
        InputText,
    },
    props: {
        modelValue: {
            type: [String,Number, Array, Object],
        },
        label: {
            type: String,
            default: 'text',
        },
        labelClass: {
            type: String,
            default: `tw-text-[${constants.neutral}]`,
        },
        placeholder: {
            type: String,
            default: '',
        },
        isRequired: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'text',
        },
        height: {
            type: String,
            default: '56px',
        },
        style: {
            type: Object,
            default: () => ({}),
        },
        rules: {
            type: Array,
            default: () => [],
        },
        errorMessage:{
            type:[Array,String]
        },
        appendInnerIcon: {
      type: String,
      default: '',
    },
    },
    data() {
        return {
            errorMessages:null,
        };
    },
    computed: {
        internalInputValue: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
                this.validate();
            },
        },
    },
    methods: {
        validate() {
            this.errorMessages = null; 

            for (const rule of this.rules) {
                const result = rule(this.internalInputValue);
                if (result !== true) {
                    this.errorMessages = result;
                    break;
                }
            }

            this.$emit('input', this.internalInputValue);
        },
    },
    emits: ['update:modelValue', 'input'],
};
</script>

<style scoped>
.tw-text-red-600 {
    color: #e3342f;
}

.tw-text-sm {
    font-size: 0.875rem;
}

.tw-mt-1 {
    margin-top: 0.25rem;
}
</style>