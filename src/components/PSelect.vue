<template>
    <div :class="[label !== ''?'tw-relative tw-w-full gTextField' : 'tw-block']">
        <label :class="`tw-font-semibold tw-block tw-truncate tw-text-sm tw-text-gray-700`" v-if="label !== ''">
            {{ label }}
            <span v-if="isRequired" :class="`tw-text-red-600`">*</span>
        </label>
        <MultiSelect v-if="multiple" class="tw-w-full tw-h-[56px]" ref="multiselect1"
        :class="!errorMessages || !errorMessages?.length > 0 ?
                'tw-bg-[' + $constants.input_background + '] ' + 'tw-h-[' + xheight + ']' + 'tw-border-red-900 tw-border-spacing-1.5'
                :
                'tw-bg-[' + $constants.input_background + '] ' + 'tw-h-[' + xheight + ']' + 'tw-border-[#ccc]'"
            :style="{ borderColor: borderColor, '--input-background': $constants.input_background, }"
            v-model="internalValue" :loading="loading" :options="options" :placeholder="placeholder"
            :option-value="optionValue" :option-label="optionLabel" :filter="filterable"
            @update:modelValue="$emit('change', true)" :taggable="true" :disabled="disabled" @open="opened"
            @close="closed" :pt="{root:{style:'height:'+xheight+' !important'}}">
        </MultiSelect>
        
        <Select v-else v-bind="$props" :filter="selectFilterable"
            v-model="internalValue" ref="listSelect" :pt="{
                root: { style: 'background:' + $constants.input_background },
                overlay: { style: { width: listSelectWidth + 'px' } },
                option: { style: { overflowX: 'none' } },
            }" :class="[!errorMessages || !errorMessages?.length > 0 ?
                'tw-bg-[' + $constants.input_background + '] ' + 'tw-h-[' + xheight + '] ' + 'tw-border-spacing-1.5'
                :
                'tw-bg-[' + $constants.input_background + '] ' + 'tw-h-[' + xheight + '] ' + '',
                selectType === 'big' ? 'tw-border-[#D5DAE1] tw-w-full' : 'tw-border-[#D5DAE1] tw-w-full',
                roundedBorder?'tw-border-[#ccc]':' tw-border-1 tw-rounded-e-none tw-border-r-0 tw-border-[#374737] ']"
            @update:modelValue="$emit('change', true)" >
            <!-- <template #option="opt">
                <span >{{getOption(opt.option) }}</span>
            </template>
            <template #value="opt">
                <span >{{getOption(opt.value, true) }}</span>
            </template> -->
        </Select>

        <div class="v-input__details" v-if="errorMessages && errorMessages?.length > 0">
            <p class="tw-text-red-900 tw-mt-0" style="color: #c00000 !important; font-weight: 400">
                {{ formattedErrorMessages }}
            </p>
        </div>
    </div>
</template>
<script>
import { useGlobalsStore } from "@/stores/globals";
import MultiSelect from "primevue/multiselect";
import Select from "primevue/select";

export default {
    props: {
        errorMessages: {
            type: [String, Boolean, Array],
            default: [],
        },
        options: {
            type: Array,
            required: true,
        },
        modelValue: {
            type: [Object, String, Number],
            default: null,
        },
        optionLabel: {
            type: String,
            default: "name",
        },
        selectType: {
            type: String,
            default: "big",
            validator(value) {
                return ["big", "slim"].includes(value);
            }
        },
        optionValue: {
            type: String,
            default: "id",
        },
        placeholder: {
            type: String,
            default: "Select Options",
        },
        label: {
            default: "",
        },
        loading: {
            default: false,
        },
        disabled: {
            default: false,
        },
        isRequired: {
            type: Boolean,
            default: false,
        },
        filterable: {
            type: Boolean,
            default: true,
        },
        selectFilterable: {
            type: Boolean,
            default: false,
        },
        roundedBorder: {
            type: Boolean,
            default: true,
        },
        width: {
            type: [String, Boolean],
            default: false,
        },
        height: {
            type: String,
            default: "56px",
        },
        rules: {
            type: [String, Number, Object, Array, null],
            default: [],
        },
        bgClass: {
            type: [String, Boolean],
            default: false,
        },
        appendInnerIcon: {
            type: String,
            default: "",
        },
        appendId: {
            type: String,
            default: "",
        },
        optionText: {
            type: String,
            default: null,
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        caseSensitive: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            id: "id",
            placement: "top",
            filterText: "",
            filterTextInDropdown: "",
            dropdownVisible: false,
            selectedOption: this.value,
            filteredOptions: [],
            dropdownDirection: "down",
            value: null,
            dropdownStyle: {},
            isOpen: false,
            borderColor: "",
            listSelectWidth: null,
            xheight: '56px',
            global:useGlobalsStore()
        };
    },
    components: {
        MultiSelect,
        Select
    },
    watch: {

    },
    computed: {
        border() {
            const container = document.querySelector(".multiselect__tags");
            let color = "#8d8d8d";
            if (container) {
                if (
                    Array.isArray(this.errorMessages) &&
                    this.errorMessages.length > 0
                ) {
                    color = "#c00000";
                } else if (
                    typeof this.errorMessages === "string" &&
                    this.errorMessages !== ""
                ) {
                    color = "#c00000";
                }
                window.container = container;
                container.style.borderColor = color;
            }

            return color;
        },
        internalValue: {
            get() {
                return this.modelValue

            },
            set(value) {
                this.$emit('update:modelValue', value);
            },
        },
        formattedErrorMessages() {
            if (Array.isArray(this.errorMessages)) {
                return this.errorMessages.join(",").replace("id", " ");
            } else if (
                typeof this.errorMessages === "string" &&
                this.errorMessages.trim() !== ""
            ) {
                return this.errorMessages;
            }
            return "";
        },
    },
    created() {
        this.id = this.appendId + this.generateRandomId();
        if(this.selectType === 'big'){
            this.xheight = this.height
        }else{
           this.xheight = '38px'
        }
       
    },
    methods: {
        getOption(opt, value=false) {
            if(value == true && (this.internalValue == '' || this.internalValue == null)){
                return ''
            }
            if (this.optionLabel  != null) {
                try {
             
                    const label = opt[this.optionLabel]?.replace('_', ' ');
                    if (label) {
                        const formattedLabel = this.caseSensitive ? label : label.toLowerCase();
                        return this.global.toTitleCase(formattedLabel);
                    } else {
                        throw new Error('Label not found');
                    }
                } catch (e) {
                    console.error('PSelect option-label is undefined:', e.message);
                    return opt;
                }
            }
            return opt;
        },

        validate() {
            this.errorMessages = [];
            for (let rule of this.rules) {
                const errorMessage = rule(this.internalValue);
                if (errorMessage !== true) {
                    this.errorMessages.push(errorMessage);
                }
            }
        },
        updateSelectWidth() {
            if (this.$refs.listSelect) {
                this.listSelectWidth = this.$refs.listSelect.$el.offsetWidth;
            }
        },
        opened(val) {
            this.isOpen = true;
        },
        closed(val) {
            this.isOpen = false;
        },
        generateRandomId(length = 16) {
            const characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let result = "";
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * charactersLength)
                );
            }
            return result;
        },
    },

    mounted() {
        this.updateSelectWidth();
        window.addEventListener("resize", this.updateSelectWidth);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.updateSelectWidth);
    },
};
</script>

<style>

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
    --input-background: v-bind($constants.input_background);
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