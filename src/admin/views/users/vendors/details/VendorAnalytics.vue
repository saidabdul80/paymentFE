<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-row>
                    <v-col cols="12" md="8" class="tw-py-3">
                        <v-container>
                            <v-icon color="yellow" icon="mdi-wallet-bifold" size="large"
                                class="tw-bg-yellow-100 tw-p-6 rounded-lg tw-mr-2"></v-icon>
                            <span class="font-weight-bold tw-text-gray-500">REVENUE ANALYSIS</span>
                        </v-container>
                        <v-divider class="my-3"></v-divider>
                        <v-row>
                            <v-col cols="6">
                                <p class="tw-text-green-800 font-weight-bold">Monthly Revenue</p>
                                <h6 class="text-h6 tw-text-gray-500">₦ 3,456,890.00</h6>
                            </v-col>
                            <v-col cols="6">
                                <TextField prepend-inner-icon="mdi-calendar-blank-outline"
                                    placeholder="G-TIN or phone number" variant="outlined" density="compact" type="date"
                                    dense :density="compact" />
                                <p class="text-caption tw-text-gray-500">128,4400 in annual commission
                                </p>
                            </v-col>
                        </v-row>
                        <hr class="tw-mx-2 tw-my-3" />
                        <v-row>
                            <v-col cols="6">
                                <p class="tw-text-green-800 font-weight-bold">Annual Revenue</p>
                                <h6 class="text-h6 tw-text-gray-500">₦ 69,456,080.00</h6>
                            </v-col>
                            <v-col cols="6">
                                <TextField prepend-inner-icon="mdi-calendar-blank-outline"
                                    placeholder="G-TIN or phone number" variant="outlined" density="compact" type="date"
                                    dense />
                                <p class="text-caption tw-text-gray-500">1,456,000 in annual commission
                                </p>
                            </v-col>
                        </v-row>
                        <hr class="tw-mx-2 tw-my-3" />
                        <v-row>
                            <v-col cols="6">
                                <p class="tw-text-green-800 font-weight-bold">Total Revenue (for all
                                    time)</p>
                                <h6 class="text-h6 tw-text-gray-500">₦ 909,456,080.00</h6>
                            </v-col>
                            <v-col cols="6">
                                <h6 class="text-subtitle-1 tw-text-green-700">Total Commission</h6>
                                <p class="text-caption tw-text-gray-500">₦ 5,095,320
                                </p>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-card class="pa-5 rounded-xl">
                            <v-row>
                                <v-col cols="8">
                                    <h5>Taxpayers Enrolled</h5>
                                    <h6>53</h6>
                                </v-col>
                                <v-col cols="4">
                                    <v-icon color="blue" icon="mdi-account-multiple" size="x-large"
                                        class="tw-bg-blue-100 tw-p-8 rounded-xl tw-mr-2 tw-mx-auto tw-d-block"></v-icon>
                                </v-col>
                            </v-row>
                        </v-card>
                        <v-card class="pa-5 mt-5 rounded-xl">
                            <v-row>
                                <v-col cols="8">
                                    <h5>Compliance Rate</h5>
                                    <h6>53</h6>
                                </v-col>
                                <v-col cols="4">
                                    <v-icon color="blue" icon="mdi-account-multiple" size="x-large"
                                        class="tw-bg-blue-100 tw-p-8 rounded-xl tw-mr-2 tw-mx-auto tw-d-block"></v-icon>
                                </v-col>
                            </v-row>
                        </v-card>
                        <v-container>
                            <v-row>
                                <v-col cols="7">
                                    <h4 class="font-weight-bold tw-text-gray-500">VENDOR AGENTS</h4>
                                </v-col>
                                <v-col cols="5" class="d-flex justify-end">
                                    <v-btn outlined color="success" class="ml-2" variant="outlined">See
                                        More</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-avatar-group>
                                    <v-avatar v-for="(agent, index) in agents" :key="index" :color="agent.color"
                                        size="48" class="v-avatar">
                                        <v-img :src="agent.img" />
                                    </v-avatar>
                                    <v-avatar size="48" class="v-avatar" color="blue">
                                        <span>324</span>
                                    </v-avatar>
                                </v-avatar-group>
                            </v-row>
                        </v-container>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import TextField from '@/components/TextField.vue'

export default {
    data: () => ({
        name: 'VendorAnalytics',
        months: [
            'January, 2024',
            'February, 2024',
            'March, 2024',
            'April, 2024',
            'May, 2024',
            'June, 2024',
            'July, 2024',
            'August, 2024',
            'September, 2024',
            'October, 2024',
            'November, 2024',
            'December, 2024',
        ],
        agents: [
            { img: 'https://media.licdn.com/dms/image/C5103AQFdPygRjsCnLw/profile-displayphoto-shrink_800_800/0/1516928625754?e=2147483647&v=beta&t=qbWrORQQFe9diTzGpgjkhVKHTwiC8scseTX5ASdin_M', color: 'blue' },
            { img: 'https://media.licdn.com/dms/image/C4D03AQGnPfduNv0Qqw/profile-displayphoto-shrink_800_800/0/1658058915952?e=2147483647&v=beta&t=MpmguhOptlOHiNt8uSY3G0ZHG1gYQRHv9QPneyyG-so', color: 'green' },
            { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1rNuFRQJ0m9EkNrwaJtyxCSEfY7Rz35rC_g&s', color: 'orange' },
            { img: 'https://media.licdn.com/dms/image/D4D03AQFOpAZB0-Dd3w/profile-displayphoto-shrink_800_800/0/1683719645012?e=2147483647&v=beta&t=Ue-M4NltA8ASpxm9rekvp9lkKquGw4X0YtP38vpVmgY', color: 'purple' },
            { img: 'https://womenofrubies.com/wp-content/uploads/2017/01/ty-bello-women-of-rubies.jpg', color: 'red' },
        ],
        totalAgents: 456,
        desserts: [
            {
                source: 'Other Taxes',
                amount: 567.04,
                commission: 32.06,
                date: '02 June 2024',
                time: '11:35 AM',
            },
            {
                source: 'Private PAYE TAX',
                amount: 567.04,
                commission: 32.06,
                date: '02 June 2024',
                time: '12:35 AM',
            },
            {
                source: 'LEA PAYE Tax',
                amount: 567.04,
                commission: 74.71,
                date: '02 June 2024',
                time: '12:47 AM'
            },
            {
                source: 'Tax Agent',
                amount: 567.04,
                commission: 80.71,
                date: '02 June 2024',
                time: '12:50 AM'
            },
            {
                source: 'Other Taxes',
                amount: 567.04,
                commission: 76.71,
                date: '02 June 2024',
                time: '12:57 AM'
            },
            {
                source: 'Tax Agent',
                amount: 567.04,
                commission: 14.71,
                date: '02 June 2024',
                time: '12:59 AM'
            }
        ],
        computed: {
            remainingCount() {
                return this.totalAgents - this.agents.length;
            }
        },
    }),
    components: {
        TextField
    }
}
</script>