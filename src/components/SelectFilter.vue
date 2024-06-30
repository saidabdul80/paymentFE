<template>
    <div class="tw-relative tw-w-full gTextField">
        
        <label :class="`tw-text-[${$constants.neutral}]`" v-if="label !== ''">
            {{ label }}
            <span v-if="isRequired" :class="`tw-text-red-600`">*</span>
        </label>
        <div @click="toggleDropdown" style="cursor: pointer;" class="tw-w-full tw-flex tw-items-center v-field__input2 tw-border tw-rounded" :class="`tw-bg-[${$constants.input_background}]`">
            <input v-model="filterText"
                style="cursor: pointer;"
                readonly
                :placeholder="placeholder"
                class="tw-m-0 tw-p-3 tw-w-full tw-h-[55px] tw-ring-0 tw-border-none tw-outline-none focus:tw-border-none"
                :append-inner-icon="appendInnerIcon" :error-messages="error_messages"
                flat :rules="rules">
            <div class="tw-flex tw-items-center">
                <v-icon>mdi-chevron-down</v-icon>
                <span v-if="loading" class="loader tw-border-2 tw-border-gray-500 tw-border-t-gray-100 tw-h-5 tw-w-5"></span>
            </div>
        </div>

        <div :class="dropdownClass" :style="dropdownStyle" ref="dropdown" v-show="dropdownVisible">
            <!-- Filter input within dropdown -->
            <v-text-field v-model="filterTextInDropdown" class="tw-w-full tw-mb-2" variant="flat" flat
                :placeholder="'Search ' + placeholder.toLowerCase()" outlined dense></v-text-field>

            <!-- Options list with filtering -->
            <div v-for="option in filteredOptions" :key="getOptionKey(option)"
                class="tw-px-4 tw-py-3 tw-cursor-pointer tw-transition-colors tw-duration-100 tw-hover:tw-bg-blue-100 hover:tw-bg-gray-100"
                @click="selectOption(option)">
                {{ getOptionLabel(option) }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        error_messages: {
            default: ''
        },
        options: {
            type: [Array, Object], // Can be either an array or an object
            required: true
        },
        modelValue: {
            type: [Object, String, Number],
            default: null
        },
        optionLabel: {
            type: String,
            default: 'name'
        },
        optionValue: {
            type: String,
            default: null,
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
        fixed:{
            type:Boolean,
            default:false
        },
        width:{
            type:String,
            default:false
        },
        rules:{
            type: [String, Number, Object, Array, null],
            default:[]
        },
        appendInnerIcon:{
            type: String,
            default:''
        },
    },
    data() {
        return {
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
    computed: {
        dropdownClass() {            
            return {
                'dropdown tw-rounded tw-border tw-bg-white tw-shadow-lg tw-w-full  tw-z-[3000]  tw-max-h-[300px] tw-overflow-auto': true,
                'tw-absolute': !this.fixed,
                'tw-fixed': this.fixed,                
                'tw-h-[300px]': this.options?.length > 0,
                'tw-h-[100px]': this.options?.length < 1,
                'tw-top-full': this.dropdownDirection === 'down',
                'tw-bottom-full': this.dropdownDirection === 'up'
            };
        },
        computedOptions() {
            if (Array.isArray(this.options)) {
                return this.options;
            } else if (typeof this.options === 'object') {
                return Object.keys(this.options).map(key => ({ key, value: this.options[key] }));
            }
            return [];
        }
    },
    created() {
        this.initializeFilterText();
    },
    mounted() {
        this.filteredOptions = this.computedOptions;
        document.addEventListener('click', this.handleClickOutside);
        window.addEventListener('resize', this.updateDropdownDirection);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside);
        window.removeEventListener('resize', this.updateDropdownDirection);
    },
    watch: {
        modelValue(newVal) {
            const opt = this.options.filter(item => this.getOptionKey(item) === newVal);
            if (opt?.length > 0) {
                this.filterText = this.getOptionLabel(opt[0]);
            }
        },
        options(newOptions) {
            this.filteredOptions = this.computeFilteredOptions();
        },
        filterTextInDropdown(newVal) {
            this.filterOptions(newVal);
        }
    },
    methods: {
        toggleDropdown() {
            this.dropdownVisible = !this.dropdownVisible;            
            if (this.dropdownVisible) {
                this.updateDropdownDirection();
            }
        },
        updateDropdownDirection() {
            this.$nextTick(() => {
                if(this.fixed){
                const dropdown = this.$refs.dropdown;
                const parent = this.$el.querySelector('.v-field__input2');
                if (dropdown && parent) {
                    const parentRect = parent.getBoundingClientRect();
                    const dropdownRect = dropdown.getBoundingClientRect();
                    const spaceBelow = window.innerHeight - parentRect.bottom;
                    const spaceAbove = parentRect.top;
                    const dropdownHeight = Math.min(dropdownRect.height, 300); // assuming max height of 300px

                    this.dropdownDirection = spaceBelow > spaceAbove ? 'down' : 'up';
                        this.dropdownStyle = {
                            top: this.dropdownDirection === 'down' ? `${parentRect.bottom}px !important` : `${parentRect.top - dropdownHeight -170}px !important`,
                            left: `${parentRect.left-50}px !important`,
                            width: this.width+' !important' || `${parentRect.width}px !important`
                        };
                    }           
                }
            });
        },
        initializeFilterText() {
            const initialOption = this.findOptionByKey(this.modelValue);
            if (initialOption) {
                this.filterText = this.getOptionLabel(initialOption);
            }
        },
        updateFilterTextFromModel(value) {
            const option = this.findOptionByKey(value);
            if (option) {
                this.filterText = this.getOptionLabel(option);
            }
        },
        findOptionByKey(key) {
            return this.computedOptions.find(option => this.getOptionKey(option) === key);
        },
        filterOptions(filterValue) {
            this.filteredOptions = this.computeFilteredOptions(filterValue);
            this.dropdownVisible = this.filteredOptions.length > 0;
        },
        computeFilteredOptions(filterValue = '') {
            return this.computedOptions.filter(option =>
                this.getOptionLabel(option)?.toLowerCase()?.includes(filterValue?.toLowerCase())
            );
        },
        selectOption(option) {
            if (this.optionValue) {
                this.selectedOption = option[this.optionValue];
            } else {
                this.selectedOption = option;
            }
            this.filterText = this.getOptionLabel(option); // Update filter text to selected option
            this.filterTextInDropdown = ''; // Clear dropdown filter input
            this.filteredOptions = this.options; // Update filteredOptions to show only selected option
            this.dropdownVisible = false;
            this.$emit('update:modelValue', this.getOptionKey(option)); // Emit selected option
            this.$emit('change', this.getOptionKey(option)); // Emit selected option
        },
        getOptionLabel(option) {
            if (typeof option === 'object' && this.optionLabel in option) {
                return option[this.optionLabel];
            }
            return option;
        },
        getOptionKey(option) {
            if (typeof option === 'object' && this.optionValue in option) {
                return option[this.optionValue];
            }
            return option;
        },
        handleClickOutside(event) {
            const path = event.path || (event.composedPath && event.composedPath());
            if (!path.some(element => element === this.$el)) {
                this.dropdownVisible = false;
            }
        }
    }
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
</style>
