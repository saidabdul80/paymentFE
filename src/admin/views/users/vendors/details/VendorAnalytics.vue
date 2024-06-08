<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-row>
                    <v-col cols="12" md="8" class="tw-py-3">
                        <v-container>
                            <v-icon color="yellow" icon="mdi-wallet-bifold" size="large"
                                class="tw-bg-yellow-100 tw-p-6 rounded-lg tw-mr-2"></v-icon>
                            <span class="font-weight-bold" :class="`tw-text-[${$constants.secondary}]`">REVENUE ANALYSIS</span>
                        </v-container>
                        <v-divider class="my-3"></v-divider>
                        <v-row>
                            <v-col cols="6">
                                <p :class="`tw-text-[${$constants.primary}]`" class="font-weight-bold">Monthly Revenue</p>
                                <h6 class="text-h6" :class="`tw-text-[${$constants.secondary}]`">₦ 3,456,890.00</h6>
                            </v-col>
                            <v-col cols="6">
                                <v-col prepend-inner-icon="mdi-calendar-blank-outline"
                                    placeholder="G-TIN or phone number" variant="outlined" density="compact" type="date"
                                    dense :density="compact" />
                                    <DatePicker v-model="monthly_date" clearable />                                
                                    <p class="text-caption" :class="`tw-text-[${$constants.secondary}]`">128,4400 in annual commission
                                </p>
                            </v-col>
                        </v-row>
                        
                        <v-divider class="tw-mx-2 tw-my-3"></v-divider>
                        <v-row>
                            <v-col cols="6">
                                <p :class="`tw-text-[${$constants.primary}]`" class="font-weight-bold">Annual Revenue</p>
                                <h6 class="text-h6" :class="`tw-text-[${$constants.secondary}]`">₦ 69,456,080.00</h6>
                            </v-col>
                            <v-col cols="6">
                                <DatePicker v-model="annual_date" clearable />                               
                                <p class="text-caption" :class="`tw-text-[${$constants.secondary}]`">1,456,000 in annual commission
                                </p>
                            </v-col>
                        </v-row>
                        <v-divider class="tw-mx-2 tw-my-3"></v-divider>
                        <v-row>
                            <v-col cols="6">
                                <p :class="`tw-text-[${$constants.primary}]`" class="font-weight-bold">Total Revenue (for all
                                    time)</p>
                                <h6 class="text-h6" :class="`tw-text-[${$constants.secondary}]`">₦ 909,456,080.00</h6>
                            </v-col>
                            <v-col cols="6">
                                <h6 class="text-subtitle-1 tw-text-green-700">Total Commission</h6>
                                <p class="text-caption" :class="`tw-text-[${$constants.secondary}]`">₦ 5,095,320
                                </p>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" md="4">
                        <div class="pa-5 tw-shadow-lg rounded-xl tw-grid tw-grid-cols-3">                            
                                <div class="tw-col-span-2">
                                    <h5 :class="`tw-text-[${$constants.dark}]`">Taxpayers Enrolled</h5>
                                    <b :class="`tw-text-[${$constants.dark}]`">53</b>
                                </div>
                                <div class="tw-place-self-end">
                                    <v-icon color="blue" icon="mdi-account-multiple" size="x-large"
                                        class="tw-bg-blue-100 tw-p-8 rounded-xl  tw-mx-auto tw-d-block"></v-icon>
                                </div>                            
                        </div>
                        <div class="pa-5 tw-shadow-lg mt-5 rounded-xl tw-grid tw-grid-cols-3">                            
                                <div class="tw-col-span-2">
                                    <h5 :class="`tw-text-[${$constants.dark}]`">Compliance Rate</h5>
                                    <b :class="`tw-text-[${$constants.dark}]`">53</b>
                                </div>
                                <div class="tw-place-self-end">
                                    <v-icon color="blue" icon="mdi-account-multiple" size="x-large"
                                        class="tw-bg-blue-100 tw-p-8 rounded-xl  tw-mx-auto tw-d-block"></v-icon>
                                </div>                            
                        </div>                        
                        <div class="tw-flex mt-10 tw-items-center tw-justify-between">                                                            
                            <h4 class="font-weight-bold" :class="`tw-text-[${$constants.secondary}]`">VENDOR AGENTS</h4>                                
                            <div cols="5" class="d-flex justify-end">
                                <v-btn outlined color="success" class="ml-2" variant="outlined">See
                                    More</v-btn>
                                </div>
                        </div>
                        <div class="pa-5 mt-5 rounded-xl tw-grid tw-grid-cols-1">
                            <v-avatar-group>
                                <v-avatar v-for="(agent, index) in agents" :key="index" :color="agent.color"
                                    size="48" class="v-avatar">
                                    <v-img :src="agent.img" />
                                </v-avatar>
                                <v-avatar size="48" class="v-avatar" color="blue">
                                    <span>324</span>
                                </v-avatar>
                            </v-avatar-group>
                        </div>                        
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import DatePicker  from '@/components/DatePicker.vue'

export default {
    data: () => ({
        monthly_date:null,
        annual_date:null,
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
        DatePicker
    }
}
</script>