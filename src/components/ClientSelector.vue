<template>
    <div class="tw-w-full ">
        <label :class="[` tw-block tw-capitalize tw-text-gray-700 tw-text-sm tw-font-semibold`,labelClass]" v-if="label !== ''">
            {{ label }}
            <span v-if="isRequired" class="tw-text-red-600">*</span>
        </label>
  
        <Select 
            class="tw-w-full"
            ref="listSelect"
            v-model="internalValue"
            :pt="{
                root: { style: 'background:' + $constants.input_background },
                overlay: { style: { width: listSelectWidth + 'px' } },
                option: { style: { overflowX: 'none' } },
            }"
            :options="options"
            :class="getInputClass"
            :placeholder="placeholder"
            optionLabel="full_name"
            
            :option-value="optionValue"
            :disabled="isLoading"
            :panelStyle="{ maxHeight: maxHeight + 'px' }"
            @change="$emit('change', true)"
            
            @show="opened"
            @hide="closed"
        >
        <template #header>
            <div class="tw-flex tw-justify-center">
                <InputText placeholder="Search for Vendor: ID/Email/NAME" label="" class="tw-w-[80%] tw-mt-2" size="small" @input="asyncFind" v-model="searchInput" />
            </div>
        </template>
            <template #selectedItemLabel="slotProps">
                <div class="option__desc tw-flex tw-flex-col tw-uppercase tw-font-semibold">
                    <span class="option__title">
                        <b>({{ slotProps.value?.code ? slotProps.value?.code : slotProps.value?.payer_id }})</b> 
                        {{ slotProps.value?.full_name?.slice(0, 20) }}...
                    </span>
                    <span class="option__small">{{ slotProps.value.user_type }}</span>
                </div>
            </template>
            <template #option="slotProps">
                <div class="tw-flex tw-items-center tw-overflow-x-auto">
                    <div class="tw-block tw-w-10" style="min-width:2.5rem !important">
                        <img @error="imageError"
                            class="option__image tw-w-10 tw-h-10 tw-mr-2 tw-rounded-[50%] tw-bg-gray-300"
                            :src="slotProps.option.picture_url" />
                    </div>
                    <div class="option__desc tw-flex tw-flex-col tw-uppercase tw-font-semibold">
                        <span class="option__title">
                            <b>({{ slotProps.option.code }})</b> 
                            {{ slotProps.option.full_name }}
                        </span>
                        <span class="option__small">{{ slotProps.option.user_type }}</span>
                    </div>
                </div>
            </template>
        </Select>
        <div v-if="error_messages && error_messages.length > 0" class="v-input__details">
            <p class="tw-text-red-900 tw-mt-0" style="color: #c00000 !important; font-weight: 400;">
                {{ formattedErrorMessages }}
            </p>
        </div>
    </div>
</template>

<script>
import RadioButton from 'primevue/radiobutton';

import Individual from "@/admin/views/users/taxpayers/forms/IndividualTaxpayerRegistration.vue";
import Corporate from "@/admin/views/users/taxpayers/forms/CorporateTaxpayerRegistration.vue";
import Taxpayer from './Taxpayer.vue';
import { useClient } from '@/stores/client';
import { useGlobalsStore } from '@/stores/globals';
import { useIndividualTaxPayer } from '@/stores/individual';
import { useCorporateTaxPayer } from '@/stores/corporate';
import Select from 'primevue/select';
import InputText from 'primevue/inputtext';

export default {
    components: {
        Select,
        RadioButton,
        Individual,
        Corporate,
        Taxpayer,InputText
    },
    props: {
        error_messages: { type: Array, default: () => [] },
        modelValue: { type: [Object, String, Number], default: null },
        optionLabel: { type: String, default: 'full_name' },
        optionValue: { type: String, default: null },
        placeholder: { type: String, default: 'Search for Vendor: ID/Email/NAME' },
        label: { type: String, default: 'Filter options' },
        isRequired: { type: Boolean, default: false },
        width: { type: [String, Boolean], default: false },
        height: { type: String, default: '48px' },
        rules: { type: [String, Number, Object, Array, null], default: () => [] },
        bgClass: { type: [String, null], default: null },
        filterable: { type: Boolean, default: true },
        appendInnerIcon: { type: String, default: '' },
        maxHeight: { type: Number, default: 350 },
        type: { type: String, default: "both" },
        allowAddBtn: { type: Boolean, default: true },
        height: { type: String, default: '56px' },
        path: { type: String, default: 'vendors' },
    },
    data() {
        return {
            searchInput:null,
            dialog: false,
            isOpen: false,
            typingTimer: null,
            isLoading: false,
            options: [],
            uniqueKey:0,
            listSelectWidth: null,
           // internalValue: Array.isArray(this.modelValue) ? this.modelValue : (this.modelValue ? [this.modelValue] : []),
        };
    },
    computed: {
        getInputClass() {
            return [
                this.error_messages && this.error_messages.length > 0 ? 'tw-border-red-900 tw-z-50 tw-border-spacing-1.5' : '',
                this.error_messages && this.error_messages.length > 0 ? 'p-invalid' : '',
                'tw-h-['+this.height+']'
            ];
        },
        formattedErrorMessages() {
            return this.error_messages;
        },
        internalValue: {
            get() {
                if (this.optionValue && this.modelValue) {
                    return this.options.find(option => option[this.optionValue] === this.modelValue);
                } else {
                    return this.modelValue;
                }
            },
            set(val) {
                if (this.optionValue && val) {
                    this.$emit("update:modelValue", val[this.optionValue]);
                } else {
                    this.$emit("update:modelValue", val);
                }
            },
        },
    },
    methods: {
        updateSelectWidth() {
            if (this.$refs.listSelect) {
                this.listSelectWidth = this.$refs.listSelect.$el.offsetWidth;
            }
            },
        async asyncFind(event) {
            clearTimeout(this.typingTimer);
            if (this.searchInput === '') return;

            this.typingTimer = setTimeout(async () => {
                this.isLoading = true;
                try {
                    const response = await useClient().http({
                        method: 'get',
                        path: '/'+this.path,
                        data: { search: this.searchInput, withoutPagination: 1 }
                    });
                    this.options = response ? response.data : [];
                    this.uniqueKey++
                    // if (this.options.length > 0 && event.originalEvent.select) {
                    //     this.internalValue = this.options[0];
                    // }
                } finally {
                    this.isLoading = false;
                }
            }, 500);
        },
        opened() {
            this.isOpen = true;
        },
        closed() {
            this.isOpen = false;
        },
        imageError(event) {
            event.target.src = '/user.png'; // Placeholder image
        },
        getUser(data) {
            this.internalValue = data;
            this.dialog = false;
            this.$emit('input', data);
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

<style scoped>
.gTextField label {
    margin-bottom: 5px;
    display: block;
    font-size: 14px;
}
</style>
