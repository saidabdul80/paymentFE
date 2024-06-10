<template>
    <div class="tw-px-5">
        <div class="tw-grid tw-grid-cols-7 tw-gap-4">
            <div class="tw-col-span-2">
                <VendorDetails />
                <div :class="`tw-text-[${$constants.dark}]`" class=" text-center my-4">Last edited 9 minutes ogo</div>
            </div>
            <div class="tw-col-span-5">
                <div>
                    <div cols="6">
                        <h4 class="font-weight-bold tw-text-gray-500">VENDOR ANALYTICS</h4>
                    </div>
                    <div cols="6" class="d-flex justify-end">
                        <v-icon color="error" icon="mdi-delete-outline" size="small"
                            class="tw-rounded tw-bg-red-200 tw-p-4 mr-2 tw-border tw-border-red-800"></v-icon>

                        <v-btn type="submit" variant="outlined" prepend-icon="mdi-close-box-outline" color="green"
                            :class="`tw-bg-${$constants.primary}-900 tw-mr-2 text-capitalize`">
                            Deactivate Vendor
                        </v-btn>

                        <v-btn type="submit" color="green" prepend-icon="mdi-export-variant"
                            :class="`tw-bg-${$constants.primary}-900 text-capitalize`">
                            Print Vendor Profile
                        </v-btn>
                    </div>
                </div>
                <div class="mt-3 tw-px-4 tw-py-4 tw-border tw-rounded-md">
                    <VendorAnalytics />
                </div>
                <RecentCollections />
            </div>
        </div>
    </div>
</template>

<script>
import { useGlobalsStore } from '@/stores/globals';
import VendorDetails from './details/VendorDetails.vue'
import VendorAnalytics from './details/VendorAnalytics.vue'
import RecentCollections from './details/RecentCollections.vue'
import useVendorStore from '@/admin/stores/vendor';
export default {
    data: () => ({
        vendorSore:useVendorStore(),
    }),
    created() {            
        this.vendorSore.fetchCurrentvendor(this.$route.params.id)
    },
    components: {
        VendorDetails,
        VendorAnalytics,
        RecentCollections
    },

}
</script>

<style>
.v-avatar {
    margin-right: -15px;
}
</style>