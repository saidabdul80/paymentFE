<template>
    <div class="tw-px-4">

        <div class="md:tw-p-5">
            <div
                class="md:tw-flex tw-justify-between tw-bg-white tw-p-3 tw-rounded tw-font-bold tw-mb-8 tw-text-gray-500/80 tw-text-[25px]">
                <div>
                    Received Stats
                </div>
                <div>
                    <v-select v-model="selectedCurrency" :items="currencyOptions" label="Select Currency" variant="solo"
                        height="20px" width="200px" class="tw-mb-0"></v-select>
                </div>
            </div>
            <div class="tw-grid md:tw-grid-cols-2 tw-grid-cols-1 lg:tw-grid-cols-3 xl:tw-grid-cols-5 tw-gap-4 tw-mb-4" v-if="loading">
                <v-skeleton-loader type="card" v-for="x in 5" ></v-skeleton-loader>                
            </div>
            <div v-else class="tw-grid md:tw-grid-cols-2 tw-grid-cols-1 lg:tw-grid-cols-3 xl:tw-grid-cols-5 tw-gap-4 tw-mb-4">
                <statistic-card v-for="card in receivedCards" :key="card.label" :icon="card.icon"
                    icon-color="#444" :value="card.value" :label="card.label" :percentage="card.percentage"
                    :percentage-icon="card.percentageIcon" :button-color="card.buttonColor" />
            </div>
        </div>
        <div class="md:tw-p-5">
            <p class="tw-bg-white tw-p-3 tw-rounded tw-font-bold tw-mb-8 tw-text-gray-500/80 tw-text-[25px]">Sent Stats
            </p>
            <div class="tw-grid md:tw-grid-cols-2 tw-grid-cols-1 lg:tw-grid-cols-3 xl:tw-grid-cols-5 tw-gap-4 tw-mb-4" v-if="loading">
                <v-skeleton-loader type="card" v-for="x in 5" ></v-skeleton-loader>                
            </div>
            <div v-else class="tw-grid md:tw-grid-cols-2 tw-grid-cols-1 lg:tw-grid-cols-3 xl:tw-grid-cols-5 tw-gap-4">
                <statistic-card v-for="card in sentCards" :key="card.label" :icon="card.icon"
                    icon-color="#444" :value="card.value" :label="card.label" :percentage="card.percentage"
                    :percentage-icon="card.percentageIcon" :button-color="card.buttonColor" />
            </div>
        </div>
    </div>
</template>

<script>
import { useGlobalsStore } from '@/stores/globals';
import Tab from '@/components/tab.vue';
import StatisticCard from '@/components/StatisticCard.vue';
import useAdminStore from '@/admin/stores/admin';

export default {
    data() {
        return {
            adminStore: useAdminStore(),
            selectedCurrency: 'CAD',
            currencyOptions: ['CAD', 'USD', 'EUR'],
            receivedCards: [],
            sentCards: [],
            receivedData: {
                today: {},
                thisWeek: {},
                thisMonth: {},
                thisYear: {},
                overall: []
            },
            loading:true,
            sentData: {
                today: {},
                thisWeek: {},
                thisMonth: {},
                thisYear: {},
                overall: []
            },
            globals: useGlobalsStore()
        }
    },
    watch: {
        selectedCurrency: 'updateCards'
    },
    computed: {
        todayReceivedData() {
            return this.receivedData.today[this.selectedCurrency];
        },
        weekReceivedData() {
            return this.receivedData.thisWeek[this.selectedCurrency];
        },
        monthReceivedData() {
            return this.receivedData.thisMonth[this.selectedCurrency];
        },
        yearReceivedData() {
            return this.receivedData.thisYear[this.selectedCurrency];
        },
        overallReceivedData() {
            return this.receivedData.overall.find(transaction => transaction.currency === this.selectedCurrency);
        },
        todaySentData() {
            return this.sentData.today[this.selectedCurrency];
        },
        weekSentData() {
            return this.sentData.thisWeek[this.selectedCurrency];
        },
        monthSentData() {
            return this.sentData.thisMonth[this.selectedCurrency];
        },
        yearSentData() {
            return this.sentData.thisYear[this.selectedCurrency];
        },
        overallSentData() {
            return this.sentData.overall.find(transaction => transaction.currency === this.selectedCurrency);
        }
    },
    methods: {
        updateCards() {
            this.receivedCards = [
                {
                    icon: 'mdi-calendar-today',
                    iconColor: 'blue',
                    value: this.todayReceivedData ? this.todayReceivedData.current : '0.00',
                    label: 'Today',
                    percentage: this.todayReceivedData ? this.todayReceivedData.increase : 0,
                    percentageIcon: this.todayReceivedData && this.todayReceivedData.increase > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down',
                    buttonColor: 'primary'
                },
                {
                    icon: 'mdi-calendar-week',
                    iconColor: 'green',
                    value: this.weekReceivedData ? this.weekReceivedData.current : '0.00',
                    label: 'This Week',
                    percentage: this.weekReceivedData ? this.weekReceivedData.increase : 0,
                    percentageIcon: this.weekReceivedData && this.weekReceivedData.increase > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down',
                    buttonColor: 'success'
                },
                {
                    icon: 'mdi-calendar-month',
                    iconColor: 'purple',
                    value: this.monthReceivedData ? this.monthReceivedData.current : '0.00',
                    label: 'This Month',
                    percentage: this.monthReceivedData ? this.monthReceivedData.increase : 0,
                    percentageIcon: this.monthReceivedData && this.monthReceivedData.increase > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down',
                    buttonColor: 'primary'
                },
                {
                    icon: 'mdi-calendar-year',
                    iconColor: 'orange',
                    value: this.yearReceivedData ? this.yearReceivedData.current : '0.00',
                    label: 'This Year',
                    percentage: this.yearReceivedData ? this.yearReceivedData.increase : 0,
                    percentageIcon: this.yearReceivedData && this.yearReceivedData.increase > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down',
                    buttonColor: 'warning'
                },
                {
                    icon: 'mdi-chart-bar',
                    iconColor: 'red',
                    value: this.overallReceivedData ? this.overallReceivedData.total_received : '0.00',
                    label: 'Overall',
                    percentage: 0, // No percentage for overall
                    percentageIcon: 'mdi-arrow-up',
                    buttonColor: 'error'
                }
            ];

            this.sentCards = [
                {
                    icon: 'mdi-calendar-today',
                    iconColor: 'blue',
                    value: this.todaySentData ? this.todaySentData.current : '0.00',
                    label: 'Today',
                    percentage: this.todaySentData ? this.todaySentData.increase : 0,
                    percentageIcon: this.todaySentData && this.todaySentData.increase > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down',
                    buttonColor: 'primary'
                },
                {
                    icon: 'mdi-calendar-week',
                    iconColor: 'green',
                    value: this.weekSentData ? this.weekSentData.current : '0.00',
                    label: 'This Week',
                    percentage: this.weekSentData ? this.weekSentData.increase : 0,
                    percentageIcon: this.weekSentData && this.weekSentData.increase > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down',
                    buttonColor: 'success'
                },
                {
                    icon: 'mdi-calendar-month',
                    iconColor: 'purple',
                    value: this.monthSentData ? this.monthSentData.current : '0.00',
                    label: 'This Month',
                    percentage: this.monthSentData ? this.monthSentData.increase : 0,
                    percentageIcon: this.monthSentData && this.monthSentData.increase > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down',
                    buttonColor: 'primary'
                },
                {
                    icon: 'mdi-calendar-year',
                    iconColor: 'orange',
                    value: this.yearSentData ? this.yearSentData.current : '0.00',
                    label: 'This Year',
                    percentage: this.yearSentData ? this.yearSentData.increase : 0,
                    percentageIcon: this.yearSentData && this.yearSentData.increase > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down',
                    buttonColor: 'warning'
                },
                {
                    icon: 'mdi-chart-bar',
                    iconColor: 'red',
                    value: this.overallSentData ? this.overallSentData.total_received : '0.00',
                    label: 'Overall',
                    percentage: 0, // No percentage for overall
                    percentageIcon: 'mdi-arrow-up',
                    buttonColor: 'error'
                }
            ];
        },
        async fetchData(){
            this.loading = true
            this.receivedData = await this.adminStore.dashboard('receive');
            this.sentData = await this.adminStore.dashboard('sent');
            this.loading = false
            this.updateCards();
        }
    },
    created() {
        this.fetchData()
   
    },
    components: {
        Tab,
        StatisticCard
    }
}
</script>

<style scoped>
.text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
}

.font-bold {
    font-weight: 700;
}

.mb-4 {
    margin-bottom: 1rem;
}
</style>