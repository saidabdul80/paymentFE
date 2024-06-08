<template>
    <div class="rounded-lg tw-p-0 tw-border">
        <div class="tw-mt-1">
            <v-img
                src="https://media.licdn.com/dms/image/D4D03AQFOpAZB0-Dd3w/profile-displayphoto-shrink_800_800/0/1683719645012?e=2147483647&v=beta&t=Ue-M4NltA8ASpxm9rekvp9lkKquGw4X0YtP38vpVmgY"
                alt="image_description" width="111" height="111" class="rounded-circle tw-mx-auto tw-d-block" />
        </div>
        <div class="text-center">
            <div :class="`tw-text-[${$constants.primary}]`"  class=" text-h5 text-center mb-4">SANI & SONS.</div>
            <v-btn v-if="!vendorStore?.isEditing" type="submit" variant="outlined" prepend-icon="mdi-pencil" :color="$constants.primary"
                :class="`tw-bg-${$constants.primary}-900 tw-mr-2 text-capitalize`"
                @click="vendorStore.isEditing = true">
                Edit Vendor Details
            </v-btn>
            <v-btn v-else type="submit" variant="outlined" prepend-icon="mdi-pencil" :color="$constants.primary"
                :class="`tw-bg-${$constants.primary}-900 tw-mr-2 text-capitalize`"
                @click="vendorStore.isEditing = false">Save</v-btn>
        </div>
        <v-divider class="tw-my-3"></v-divider>        
        <div class="tw-text-lg" v-if="vendorStore.currentVendor">
            <v-card-text>
                <v-list-item>
                    <div v-if="!vendorStore.isEditing" class="tw-flex">
                        <div :class="`tw-text-[${$constants.primary}]`" class="tw-pr-2"><strong>G-TIN: </strong></div>
                        <div :class="`tw-text-[${$constants.dark}]`" class="">{{ vendorStore.currentVendor?.g_tin }}</div>
                    </div>
                    <text-field label="G-TIN" v-else v-model="vendorStore.currentVendor.g_tin"></text-field>
                </v-list-item>
                <v-list-item>
                    <div v-if="!vendorStore.isEditing" class="tw-flex">
                        <div :class="`tw-text-[${$constants.primary}]`" class="tw-pr-2"><strong>NIN: </strong></div>
                        <div :class="`tw-text-[${$constants.dark}]`" class="">{{ vendorStore.currentVendor?.nin }}</div>
                    </div>
                    <text-field label="NIN" v-else v-model="vendorStore.currentVendor.nin"></text-field>
                </v-list-item>
                <v-list-item>
                    <div v-if="!vendorStore.isEditing" class="tw-flex">
                        <div :class="`tw-text-[${$constants.primary}]`" class="tw-pr-2"><strong>BVN: </strong></div>
                        <div :class="`tw-text-[${$constants.dark}]`" class="">{{ vendorStore.currentVendor?.bvn }}</div>
                    </div>
                    <text-field label="BVN" v-else v-model="vendorStore.currentVendor.bvn"></text-field>
                </v-list-item>
                <v-list-item>
                    <div v-if="!vendorStore.isEditing" class="tw-flex">
                        <div :class="`tw-text-[${$constants.primary}]`" class="tw-pr-2"><strong>PHONE NUMBER: </strong></div>
                        <div :class="`tw-text-[${$constants.dark}]`" class="">{{ vendorStore.currentVendor?.phone_number }}</div>
                    </div>
                    <text-field label="PHONE NUMBER" v-else
                        v-model="vendorStore.currentVendor.phone_number"></text-field>
                </v-list-item>
                <v-list-item>
                    <div v-if="!vendorStore.isEditing" class="tw-flex">
                        <div :class="`tw-text-[${$constants.primary}]`" class="tw-pr-2"><strong>EMAIL: </strong></div>
                        <div :class="`tw-text-[${$constants.dark}]`" class="">{{ vendorStore.currentVendor?.email }}</div>
                    </div>
                    <text-field label="EMAIL" v-else v-model="vendorStore.currentVendor.email"></text-field>
                </v-list-item>
                <v-list-item>

                    <div v-if="!vendorStore.isEditing" class="tw-flex tw-items-center">
                        <div :class="`tw-text-[${$constants.primary}]`" class="tw-pr-2"><strong>ADDRESS: </strong></div>
                        <div :class="`tw-text-[${$constants.dark}]`" class="tw-flex tw-items-center">
                            {{ vendorStore.currentVendor?.address.slice(0, 20) }}...
                            <copy-button :text="vendorStore.currentVendor?.address"></copy-button>
                        </div>
                    </div>
                    <text-field label="Address" v-else
                        v-model="vendorStore.currentVendor.address"></text-field>
                </v-list-item>
                <v-list-item>
                    <div v-if="!vendorStore.isEditing" class="tw-flex">
                        <div :class="`tw-text-[${$constants.primary}]`" class="tw-pr-2"><strong>CONTACT: </strong></div>
                        <div :class="`tw-text-[${$constants.dark}]`" class="">{{ vendorStore.currentVendor?.contact }} </div>
                    </div>
                    <text-field label="CONTACT" v-else v-model="vendorStore.currentVendor.contact"></text-field>
                </v-list-item>
                <v-list-item>
                    <div v-if="!vendorStore.isEditing" class="tw-flex">
                        <div :class="`tw-text-[${$constants.primary}]`" class="tw-pr-2"><strong>ACCOUNT NAME: </strong></div>
                        <div :class="`tw-text-[${$constants.dark}]`" class="">{{ vendorStore.currentVendor?.account_name }}</div>
                    </div>
                    <text-field label="ACCOUNT NAME" v-else
                        v-model="vendorStore.currentVendor.account_name"></text-field>
                </v-list-item>
                <v-list-item>
                    <div v-if="!vendorStore.isEditing" class="tw-flex">
                        <div :class="`tw-text-[${$constants.primary}]`" class="tw-pr-2"><strong>ACCOUNT NUMBER: </strong></div>
                        <div :class="`tw-text-[${$constants.dark}]`" class="">{{ vendorStore.currentVendor?.account_number }}</div>
                    </div>
                    <text-field label="ACCOUNT NUMBER" v-else
                        v-model="vendorStore.currentVendor.account_number"></text-field>
                </v-list-item>
                <v-list-item>
                    <div v-if="!vendorStore.isEditing" class="tw-flex">
                        <div :class="`tw-text-[${$constants.primary}]`" class="tw-pr-2"><strong>BANK NAME: </strong></div>
                        <div :class="`tw-text-[${$constants.dark}]`" class="">{{ vendorStore.currentVendor?.bank_name }}</div>
                    </div>
                    <text-field label="BANK NAME" v-else v-model="vendorStore.currentVendor.bank_name"></text-field>
                </v-list-item>
                <v-list-item>
                    <div v-if="!vendorStore.isEditing" class="tw-flex">
                        <div :class="`tw-text-[${$constants.primary}]`" class="tw-pr-2"><strong>STATUS: </strong></div>
                        <div :class="`tw-text-[${$constants.dark}]`" class="">{{ vendorStore.currentVendor?.status }}</div>
                    </div>
                    <text-field label="STATUS" v-else v-model="vendorStore.currentVendor.status"></text-field>
                </v-list-item>
                <v-list-item v-for="item in items" :key="item.title" class="tw-p-0">
                    <div v-if="!vendorStore.isEditing" class="tw-flex">
                        <div :class="`tw-text-[${$constants.primary}]`" class="tw-pr-2"><strong>{{ item.title }}: </strong></div>
                        <div :class="`tw-text-[${$constants.dark}]`" class="">{{ item.value }}</div>
                    </div>
                    <text-field label="{{ item.title }}" v-else v-model="vendorStore.currentVendor"></text-field>

                </v-list-item>
            </v-card-text>
        </div>
    </div>
</template>

<script>
import useVendorStore from '@/admin/stores/vendor';
import TextField from "@/components/TextField.vue"
import CopyButton from "@/components/CopyButton.vue"
export default {
    data: () => ({
        vendorStore: useVendorStore(),
        name: "VendorDetails",
    }),
    components: {
        TextField,
        CopyButton
    }
}
</script>