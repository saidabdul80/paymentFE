<template>
    <div class="tw-relative tw-w-full gTextField">
        <label :class="`tw-font-bold tw-truncate tw-text-[${$constants.neutral}]`" v-if="label !== ''">
            {{ label }}
            <span v-if="isRequired" :class="`tw-text-red-600`">*</span>
        </label>
        
        <Multiselect :class="!errorMessages || !errorMessages?.length > 0 ? '': 'tw-border-red-900 tw-border-spacing-1.5'"  :style="{ borderColor: borderColor, '--input-background': $constants.input_background}" 
            v-model="internalValue" :loading="loading" :options="options" :placeholder="placeholder"
              :searchable="filterable"
            @update:modelValue="$emit('change', true)" :taggable="true">         
        </Multiselect>
        <div class="v-input__details" v-if="errorMessages || errorMessages?.length > 0">
            <p class="tw-text-red-900 tw-mt-0" style="color: #c00000 !important;font-weight: 400;">{{
                formattedErrorMessages }}</p>
        </div>
    </div>
</template>
<script>
import Multiselect from 'vue-multiselect';

export default {
    props: {
        errorMessages: {
            type: [String, Boolean, Array],
            default: []
        },
        options: {
            type: Array,
            required: true
        },
        modelValue: {
            type: [Object, String, Number],
            default: null
        },
        placeholder: {
            type: String,
            default: 'Filter options'
        },
        label: {
            default: ""
        },
        loading: {
            default: false
        },
        isRequired: {
            type: Boolean,
            default: false,
        },
        filterable: {
            type: Boolean,
            default: true
        },
        width: {
            type: [String, Boolean],
            default: false
        },
        height: {
            type: String,
            default: '56px'
        },
        rules: {
            type: [String, Number, Object, Array, null],
            default: []
        },
        bgClass: {
            type: [String, Boolean],
            default: false
        },
        appendInnerIcon: {
            type: String,
            default: ''
        },
        appendId: {
            type: String,
            default: ''
        },
        optionText:{
            type:String,
            default:null
        }
    },
    data() {
        return {
            id: 'id',
            placement: 'top',
            filterText: '',
            filterTextInDropdown: '',
            dropdownVisible: false,
            selectedOption: this.value,
            filteredOptions: [],
            dropdownDirection: 'down',
            value: null,
            dropdownStyle: {}
        };
    },
    components: {
        Multiselect,
    },
    watch: {
        
        
    },
    computed: {
        border() {
            const container = document.querySelector(".multiselect__tags");
            let color = "#8d8d8d";            
            if (container) {
                if (Array.isArray(this.errorMessages) && this.errorMessages.length > 0) {
                    color = "#c00000";
                } else if (typeof this.errorMessages === 'string' && this.errorMessages !== '') {
                    color = "#c00000";
                }
                window.container = container
                container.style.borderColor = color;
            }

            return color;
        },
        internalValue: {
            get() {           
                return  this.modelValue;
            },
            set(val) {
                this.$emit('update:modelValue', val);
            }
        },
        formattedErrorMessages() {
            if (Array.isArray(this.errorMessages)) {
                return this.errorMessages.join(',').replace('id', ' ');
            } else if (typeof this.errorMessages === 'string' && this.errorMessages.trim() !== '') {
                return this.errorMessages;
            }
            return '';
        },
    },
    created() {
        this.id = this.appendId + this.generateRandomId();
    },
    methods: {
        generateRandomId(length = 16) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        },
    },
};
</script>

<style>

@import "vue-multiselect/dist/vue-multiselect.css";

.tw-animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

:root,
:host {
    --vs-dropdown-bg: #fff;
    --vs-dropdown-color: inherit;
    --vs-dropdown-z-index: 3000;
    --vs-dropdown-min-width: 360px;
    --vs-dropdown-box-shadow: 0px 3px 6px 0px var(--vs-colors--darkest);
    --vs-border-color: #8d8d8d;
    /* Options */
    --vs-dropdown-option-color: var(--vs-dropdown-color);
    --vs-dropdown-option-padding: 11px 20px;
    --input-background: v-bind($constants.input_background)
}

.vs__search {
    height: v-bind(height);
}

.multiselect__tags {
    max-height: v-bind(height) !important;    
    border-color: inherit !important;
    background-color: var(--input-background) !important; 
}

 .multiselect__single,
.multiselect__spinner,
.multiselect__input {
    background-color: var(--input-background) !important;
   

} 

</style>
