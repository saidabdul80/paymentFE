<template>
    <div>
        <v-breadcrumbs :items="items" class="tw-mx-5">
            <template v-slot:divider color="red">
                <v-icon icon="mdi-chevron-right"></v-icon>
            </template>
        </v-breadcrumbs>

        <div class="container mx-auto">
            <IndividualTaxpayerRegistration />
        </div>

    </div>
</template>

<script>
import IndividualTaxpayerRegistration from '@/admin/components/IndividualTaxpayerRegistration.vue';

export default {
    data: () => ({
        items: [
            {
                title: 'USERS',
                disabled: false,
                href: '#',
                class: 'tw-text-gray-500 tw-font-bold'
            },
            {
                title: 'ADD INDIVIDUAL TAXPAYER',
                disabled: false,
                href: '#',
                class: 'tw-text-green-700 tw-font-bold'
            }
        ],
    }),
    components: {
        IndividualTaxpayerRegistration,
    },
}
</script>