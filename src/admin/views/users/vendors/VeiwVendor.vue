<template>
    <div class="tw-px-5">
        <v-row>
            <v-col cols="12" md="4" sm="12">
                <VendorDetails />
                <div class="tw-text-dark-800 text-center my-4">Last edited 9 minutes ogo</div>
            </v-col>
            <v-col cols="12" md="8" sm="12">
                <v-row>
                    <v-col cols="6">
                        <h4 class="font-weight-bold tw-text-gray-500">VENDOR ANALYTICS</h4>
                    </v-col>
                    <v-col cols="6" class="d-flex justify-end">
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
                    </v-col>
                </v-row>
                <v-card class="mt-3 tw-px-4 tw-py-4">
                    <VendorAnalytics />
                </v-card>
                <RecentCollections />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { useGlobalsStore } from '@/stores/globals';
import VendorDetails from './details/VendorDetails.vue'
import VendorAnalytics from './details/VendorAnalytics.vue'
import RecentCollections from './details/RecentCollections.vue'

export default {
    data: () => ({

    }),
    created() {
        useGlobalsStore().updateSubPageName("Veiw Vendor")
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