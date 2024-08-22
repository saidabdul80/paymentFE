<template>
    <div class="tw-relative tw-w-full gTextField">
        <label :class="`tw-font-bold tw-text-[${$constants.neutral}]`" v-if="label !== ''">
            {{ label }}
            <span v-if="isRequired" :class="`tw-text-red-600`">*</span>
        </label>

        <Select 
            filter
            ref="listSelect"
            @filter="asyncFind"
            optionLabel="Full_Name"
            v-model="internalValue" :loading="isLoading" placeholder="select option" :options="options" 
                class="tw-w-full" :pt="{root:{style:'height:56px !important'}, overlay:{style:{width:listSelectWidth+'px'}}, option:{style: {overflowX:'auto'}}}">
            <template #value="slotProps">
                <div v-if="slotProps.value" class="">
                    <div>{{ slotProps.value?.Full_Name }}</div>
                    <div class="tw-text-xs">{{ slotProps.value?.Email }}</div>
                </div>
                <span v-else>
                  
                </span>
            </template>
            <template #option="slotProps">
                <div class="tw-flex tw-items-center">
                    <div>{{ slotProps.option?.Full_Name }}</div>
                </div>
            </template>
            <template #footer>
                <div class="tw-flex tw-justify-center tw-w-[90%] tw-mx-auto">
                        <v-btn flat @click="dialog = true" size="small"
                            class="tw-w-full  tw-mx-auto  tw-h-8 tw-my-5 tw-text-lg tw-border-b-0 tw-rounded-0 tw-text-white"
                            color="#006033cc">Add New Contacts</v-btn>
                    </div>
            </template>
        </Select>
        <Teleport to="body" v-if="dialog">
            <Dialog modal v-model:visible="dialog" header="" :style="{ width: '25rem' }" >
                <template v-slot:default="{ isActive }">
                    <AddContact @done="asyncFind" />
                </template>
            </Dialog>
        </Teleport>
    </div>
</template>

<script>
import { useGlobalsStore } from '@/stores/globals';
import AddContact from './AddContact.vue';
import Select from 'primevue/select';
import Dialog from 'primevue/dialog';
import { useZohoStore } from '@/stores/zohoStore';

export default {
    props: {
        error_messages: { default: null },
        modelValue: { type: [Object, String, Number], default: null },
        optionLabel: { type: String, default: 'full_name' },
        optionValue: { type: String, default: null },
        label: { type: String, default: 'Recipient' },
        isRequired: { type: Boolean, default: false },
        width: { type: [String, Boolean], default: false },
        height: { type: String, default: '48px' },
        rules: { type: [String, Number, Object, Array, null], default: [] },
        bgClass: { type: [String, null], default: null },
        filterable: { type: Boolean, default: true },
        appendInnerIcon: { type: String, default: '' },
        maxHeight: { default: 350 },
        btnText: { default: 'Add New Contacts' },
        maxHeight: { default: 350 },
        allowAddBtn: { type: Boolean, default: true },
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
            dialog: false,
            taxpayer_type: 'taxpayer',
            typingTimer: null,
            globals: useGlobalsStore(),
            isOpen: false,
            zohoStore: useZohoStore()
        };
    },
    components: {
        AddContact,
        Select,
        Dialog
    },
    watch: {
        error_messages(newVal) {
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
                if (Array.isArray(this.error_messages) && this.error_messages.length > 0) {
                    color = "#c00000";
                } else if (typeof this.error_messages === 'string' && this.error_messages !== '') {
                    color = "#c00000";
                }
                container.style.borderColor = color;
            }

            return color;
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
        this.options = this.zohoStore.contacts;
        this.id = this.generateRandomId();
    },
    watch: {
        'zohoStore.contacts': {
            handler(newContacts) {
                this.options = newContacts;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        opened() {
            this.isOpen = true;
        },
        closed() {
            this.isOpen = false;
        },
        generateRandomId(length = 16) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        },
        async asyncFind(query) {
            clearTimeout(this.typingTimer);
            if (query.value.length < 5) {
                return;
            }
            this.typingTimer = setTimeout(async () => {
                this.isLoading = true;
                await this.zohoStore.fetchContact(query.value);
                this.options = this.zohoStore.contacts
                this.isLoading = false;
            }, 2000);
        },
        imageError(e) {
            e.target.src = '/no_image.png';
        }
    },
};
</script>

<style scoped>
</style>
