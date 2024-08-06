<template>

    <div class="tw-relative tw-w-full ">
        <label :class="`tw-font-bold tw-text-[${$constants.neutral}]`" v-if="label !== ''">
            {{ label }}
            <span v-if="isRequired" :class="`tw-text-red-600`">*</span>
        </label>
        <Multiselect  ref="payeeSelector" :class="!errorMessages || !errorMessages?.length > 0 ? '': 'tw-border-red-900 tw-z-50 tw-border-spacing-1.5'" :style="{ borderColor: border, '--input-background': $constants.input_background}" v-model="internalValue" :loading="isLoading"
            :options="options" :placeholder="placeholder" :track-by="optionValue" label="full_name"
            :searchable="filterable" :internal-search="false" :clear-on-select="false" selectLabel=""
             @update:modelValue="$emit('change', true)" @search-change="asyncFind" :max-height="maxHeight">            
            <template #singleLabel="props" >
                <div class="option__desc tw-flex tw-flex-col tw-uppercase tw-font-semibold  ">
                    <span class="option__title">{{props.option.name }}</span>
                </div>
            </template>
            <template #option="props">
                <div class="tw-flex tw-items-center">
                    <span class=" tw-block">
                        <img @error="imageError"
                            class="option__image tw-w-10 tw-h-10 tw-mr-2 tw-rounded-[50%] tw-bg-gray-300"
                            :src="props.option.picture_url" />
                    </span>
                    <div class="option__desc tw-flex tw-flex-col tw-uppercase tw-font-semibold  ">
                        <span class="option__title">{{props.option.name }}</span>
                    </div>
                </div>
            </template>
            <template #tag="{ option, remove }">
                <span class="custom__tag">
                    <span>{{ option.name }}</span>
                    <span class="custom__remove" @click="remove(option)">❌</span>
                </span>
            </template>
            <template #clear="props">
                <div class="multiselect__clear" v-if="options?.length" @mousedown.prevent.stop="clearAll(props.search)">
                </div>
            </template>
            <template #noResult>
                <span>Oops! No User found.</span>
            </template>          
        </Multiselect>
        <div class="v-input__details" v-if="errorMessages || errorMessages?.length > 0">
            <p class="tw-text-red-900 tw-mt-0" style="color: #c00000 !important;font-weight: 400;">{{
                formattedErrorMessages }}</p>
        </div>       
    </div>
</template>
<script>
import Multiselect from 'vue-multiselect';
import { useClient } from '@/stores/client';
export default {
    props: {
        error_messages: {
            default: null
        },
        modelValue: {
            type: [Object, String, Number],
            default: null
        },
        optionLabel: {
            type: String,
            default: 'full_name'
        },
        optionValue: {
            type: String,
            default: null,
        },
        placeholder: {
            type: String,
            default: 'Search for payee: NAME'
        },
        label: {
            type: String,
            default: 'Filter options'
        },
        isRequired: {
            type: Boolean,
            default: false,
        },
        width: {
            type: [String, Boolean],
            default: false
        },
        height: {
            type: String,
            default: '48px'
        },
        rules: {
            type: [String, Number, Object, Array, null],
            default: []
        },
        bgClass: {
            type: [String, null],
            default: null
        },        
        filterable: {
            type: Boolean,
            default: true
        },
        appendInnerIcon: {
            type: String,
            default: ''
        },
        maxHeight: {
            default:350
        },
        type: {
            type: String,
            default: "both"
        },
        payeeLink: {
            type: String,
            default: '/vendor/payee'
        },
        btnText:{default:'Add New payee'},
        maxHeight:{
            default:350
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
            isLoading: false,
            dropdownStyle: {},
            options: [],
            dialog:false,
            payee_type:'payee',
            typingTimer:null,
        };
    },
    components: {
        Multiselect        
    },
    watch: {
        error_messages: function (newVal, oldVal) {
            try {
                const elt = document.querySelector(`#${this.id} .vs__dropdown-toggle`);
                if (elt) {
                    elt.style.borderColor = this.error_messages ? 'rgb(176, 0, 32)' : '#8d8d8d';
                } else {
                    console.warn('.vs__dropdown-menu element not found within the specified ID');
                }
            } catch (e) {
                console.error(e);
            }
        }
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
        formattedErrorMessages() {
            if (Array.isArray(this.errorMessages)) {
                return this.errorMessages.join(',').replace('id', ' ');
            } else if (typeof this.errorMessages === 'string' && this.errorMessages.trim() !== '') {
                return this.errorMessages;
            }
            return '';
        },
        internalValue: {
            get() {
                if (this.optionValue) {
                    return this.options.find(option => option[this.optionValue] === this.modelValue);
                }
                return this.modelValue;
            },
            set(val) {
                if (this.optionValue) {
                    this.$emit('update:modelValue', val ? val[this.optionValue] : null);
                } else {
                    this.$emit('update:modelValue', val);
                }
            }
        }
    },
    created() {
        this.id = this.generateRandomId();
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
        limitText(count) {
            return `and ${count} other countries`
        },
        async asyncFind(query) {
            clearTimeout(this.typingTimer);
            if(query == ''){return false;}
            this.typingTimer = setTimeout(async () => {
                this.isLoading = true
                const response = await useClient().http({ method: 'get', path: '/transaction/payee?name='+query })
                this.isLoading = false
                if (response) {
                    this.options = response;
                } else {
                    this.options = [];
                }
                
            },2000)
        },
        getUser(user){            
            this.dialog = !this.dialog 
            this.$refs.payeeSelector.activate()
            this.asyncFind(user);
        },
        clearAll() {
            this.selectedCountries = []
        },
        imageError(e) {
            e.target.src = '/no_image.png'
        }
    },
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
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
    --vs-dropdown-bg: #8d8d8d;
    --vs-dropdown-color: inherit;
    --vs-dropdown-z-index: 3000;
    --vs-dropdown-min-width: 360px;
    --vs-dropdown-box-shadow: 0px 3px 6px 0px var(--vs-colors--darkest);
    --vs-border-color: #8d8d8d;
    /* Options */
    --vs-dropdown-option-color: var(--vs-dropdown-color);
    --vs-dropdown-option-padding: 11px 20px;
}

.vs__search {
    height: v-bind(height);
}

.multiselect__tags {
    height: 56px !important;
    border-color: inherit !important;
    background-color: var(--input-background) !important; 
}

.multiselect__option--highlight {
    background-color: #006033cc !important;
}

.multiselect__content-wrapper {
    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
    border-bottom: 2px solid #ccc;
    border-left: 2px solid #ccc;
    border-right: 2px solid #ccc;
}
</style>
