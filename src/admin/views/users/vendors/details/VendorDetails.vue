<template>
    <v-card class="rounded-lg">
        <v-container class="tw-mt-10">
            <v-img
                src="https://media.licdn.com/dms/image/D4D03AQFOpAZB0-Dd3w/profile-displayphoto-shrink_800_800/0/1683719645012?e=2147483647&v=beta&t=Ue-M4NltA8ASpxm9rekvp9lkKquGw4X0YtP38vpVmgY"
                alt="image_description" width="111" height="111" class="rounded-circle tw-mx-auto tw-d-block" />
        </v-container>
        <v-container class="text-center">
            <div class="tw-text-green-800 text-h5 text-center mb-4">SANI & SONS.</div>
            <v-btn type="submit" variant="outlined" prepend-icon="mdi-pencil" color="green"
                :class="`tw-bg-${$constants.primary}-900 tw-mr-2 text-capitalize`">
                Edit Vendor Details
            </v-btn>
        </v-container>
        <hr class="tw-mx-10" />
        <v-container class="">
            <v-card-text>
                <v-list-item v-for="item in items" :key="item.title">
                    <strong>{{ item.title }}: </strong>
                    <template v-if="item.value === 'Active'">
                        <span class="tw-rounded tw-text-xs tw-bg-green-200 tw-px-2 ">
                            {{ item.value }}
                        </span>
                    </template>
                    <template v-else>
                        {{ item.value }}
                    </template>
                </v-list-item>
            </v-card-text>
        </v-container>
    </v-card>
</template>

<script>

export default {
    data: () => ({
        name: "VendorDetails",
        items: [
            { title: 'G-TIN', value: 'G-TI772388', },
            { title: 'NIN', value: '4457899003323', },
            { title: 'BNV', value: '45875687899', },
            { title: 'PHONE NUMBER', value: '08198456789', },
            { title: 'EMAIL', value: 'saninsonslll@gmail.com', },
            { title: 'ADDRESS', value: 'NO. 32 B, Alkali Road, Sabo, Kumbiya', },
            { title: 'CONTACT', value: 'Dauda Umar Isah', },
            { title: 'ACCOUNT NAME', value: 'Dauda Umar Isah', },
            { title: 'ACCOUNT NUMBER', value: '3444578934', },
            { title: 'BANK NAME', value: 'Stanbic Bank', },
            { title: 'STATUS', value: 'Active', }
        ],
    })
}
</script>