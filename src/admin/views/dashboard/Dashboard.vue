<template>
    <div class="tw-px-4">

        <div class="md:tw-p-5">
            <div>
                <v-select v-model="selectedCurrency" :items="currencyOptions" label="Select Currency" variant="solo"
                    height="20px" width="200px" class="tw-mb-0"></v-select>
            </div>
            <div class="tw-font-bold tw-mb-8 tw-text-gray-500/80 tw-text-[25px]">
                Received Stats
            </div>
            <div class="tw-grid md:tw-grid-cols-2 tw-grid-cols-1 lg:tw-grid-cols-3 xl:tw-grid-cols-5 tw-gap-4 tw-mb-4" v-if="loading">
                <v-skeleton-loader type="card" v-for="x in 5" ></v-skeleton-loader>                
            </div>
            <div v-else>             
                <div  class="tw-grid md:tw-grid-cols-2 tw-grid-cols-1 lg:tw-grid-cols-3 xl:tw-grid-cols-5 tw-gap-4 tw-mb-4">
                    <statistic-card v-for="card in receivedCards" :key="card.label" :icon="card.icon"
                    icon-color="#444" :value="card.value" :label="card.label" :percentage="card.percentage"
                    :percentage-icon="card.percentageIcon" :button-color="card.buttonColor" :card="card" />
                </div>
            </div>
        </div>
        <v-divider class="tw-border-gray-400"></v-divider>
        <div class="md:tw-p-5">
            <div class="tw-font-bold tw-mb-8 tw-text-gray-500/80 tw-text-[25px]">
                Sent Stats
            </div>
            <div class="tw-grid md:tw-grid-cols-2 tw-grid-cols-1 lg:tw-grid-cols-3 xl:tw-grid-cols-5 tw-gap-4 tw-mb-4" v-if="loading">
                <v-skeleton-loader type="card" v-for="x in 5" ></v-skeleton-loader>                
            </div>
            <div v-else class="tw-grid md:tw-grid-cols-2 tw-grid-cols-1 lg:tw-grid-cols-3 xl:tw-grid-cols-5 tw-gap-4">
                <statistic-card v-for="card in sentCards" :key="card.label" :icon="card.icon"
                    icon-color="#444" :value="card.value" :label="card.label" :percentage="card.percentage"
                    :percentage-icon="card.percentageIcon" :button-color="card.buttonColor" :card="card"/>
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
            currencyOptions: ['CAD', 'USD', 'EUR', 'NGN'],
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
            return this.receivedData.today.find(transaction => transaction.currency === this.selectedCurrency);
        },
        weekReceivedData() {
            return this.receivedData.thisWeek.find(transaction => transaction.currency === this.selectedCurrency);
        },
        monthReceivedData() {
            return this.receivedData.thisMonth.find(transaction => transaction.currency === this.selectedCurrency);
        },
        yearReceivedData() {
            return this.receivedData.thisYear.find(transaction => transaction.currency === this.selectedCurrency);
        },
        overallReceivedData() {
            return this.receivedData.overall.find(transaction => transaction.currency === this.selectedCurrency);
        },
        todaySentData() {
            return this.sentData.today.find(transaction => transaction.currency === this.selectedCurrency);
        },
        weekSentData() {
            return this.sentData.thisWeek.find(transaction => transaction.currency === this.selectedCurrency);
        },
        monthSentData() {
            return this.sentData.thisMonth.find(transaction => transaction.currency === this.selectedCurrency);
        },
        yearSentData() {
            return this.sentData.thisYear.find(transaction => transaction.currency === this.selectedCurrency);
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
                    buttonColor: 'primary',
                    completedTransactions:this.todayReceivedData?this.todayReceivedData?.completed_transactions:0,
                    failedTransactions:this.todayReceivedData? this.todayReceivedData?.failed_transactions:0,
                    totalTransactions:this.todayReceivedData? this.todayReceivedData?.total_transactions:0,
                },
                {
                    icon: 'mdi-calendar-week',
                    iconColor: 'green',
                    value: this.weekReceivedData ? this.weekReceivedData.current : '0.00',
                    label: 'This Week',
                    percentage: this.weekReceivedData ? this.weekReceivedData.increase : 0,
                    percentageIcon: this.weekReceivedData && this.weekReceivedData.increase > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down',
                    buttonColor: 'success',
                    completedTransactions:this.weekReceivedData?this.weekReceivedData?.completed_transactions:0,
                    failedTransactions:this.weekReceivedData? this.weekReceivedData?.failed_transactions:0,
                    totalTransactions:this.weekReceivedData? this.weekReceivedData?.total_transactions:0,
                },
                {
                    icon: 'mdi-calendar-month',
                    iconColor: 'purple',
                    value: this.monthReceivedData ? this.monthReceivedData.current : '0.00',
                    label: 'This Month',
                    percentage: this.monthReceivedData ? this.monthReceivedData.increase : 0,
                    percentageIcon: this.monthReceivedData && this.monthReceivedData.increase > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down',
                    buttonColor: 'primary',
                    completedTransactions:this.monthReceivedData?this.monthReceivedData?.completed_transactions:0,
                    failedTransactions:this.monthReceivedData? this.monthReceivedData?.failed_transactions:0,
                    totalTransactions:this.monthReceivedData? this.monthReceivedData?.total_transactions:0,
                },
                {
                    icon: 'mdi-calendar-year',
                    iconColor: 'orange',
                    value: this.yearReceivedData ? this.yearReceivedData.current : '0.00',
                    label: 'This Year',
                    percentage: this.yearReceivedData ? this.yearReceivedData.increase : 0,
                    percentageIcon: this.yearReceivedData && this.yearReceivedData.increase > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down',
                    buttonColor: 'warning',
                    completedTransactions:this.yearReceivedData?this.yearReceivedData?.completed_transactions:0,
                    failedTransactions:this.yearReceivedData? this.yearReceivedData?.failed_transactions:0,
                    totalTransactions:this.yearReceivedData? this.yearReceivedData?.total_transactions:0,
                },
                {
                    icon: 'mdi-chart-bar',
                    iconColor: 'red',
                    value: this.overallReceivedData ? this.overallReceivedData.total_received : '0.00',
                    label: 'Overall',
                    percentage: 0, // No percentage for overall
                    percentageIcon: 'mdi-arrow-up',
                    buttonColor: 'error',
                    completedTransactions:this.overallReceivedData?this.overallReceivedData?.completed_transactions:0,
                    failedTransactions:this.overallReceivedData? this.overallReceivedData?.failed_transactions:0,
                    totalTransactions:this.overallReceivedData? this.overallReceivedData?.total_transactions:0,
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
                    buttonColor: 'primary',
                    completedTransactions:this.todaySentData? this.todaySentData?.completed_transactions:0,
                    failedTransactions:this.todaySentData? this.todaySentData?.failed_transactions:0,
                    totalTransactions:this.todaySentData? this.todaySentData?.total_transactions:0,
                },
                {
                    icon: 'mdi-calendar-week',
                    iconColor: 'green',
                    value: this.weekSentData ? this.weekSentData.current : '0.00',
                    label: 'This Week',
                    percentage: this.weekSentData ? this.weekSentData.increase : 0,
                    percentageIcon: this.weekSentData && this.weekSentData.increase > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down',
                    buttonColor: 'success',
                    completedTransactions:this.weekSentData? this.weekSentData?.completed_transactions:0,
                    failedTransactions:this.weekSentData? this.weekSentData?.failed_transactions:0,
                    totalTransactions:this.weekSentData? this.weekSentData?.total_transactions:0,
                },
                {
                    icon: 'mdi-calendar-month',
                    iconColor: 'purple',
                    value: this.monthSentData ? this.monthSentData.current : '0.00',
                    label: 'This Month',
                    percentage: this.monthSentData ? this.monthSentData.increase : 0,
                    percentageIcon: this.monthSentData && this.monthSentData.increase > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down',
                    buttonColor: 'primary',
                    completedTransactions:this.monthSentData? this.monthSentData?.completed_transactions:0,
                    failedTransactions:this.monthSentData? this.monthSentData?.failed_transactions:0,
                    totalTransactions:this.monthSentData? this.monthSentData?.total_transactions:0,
                },
                {
                    icon: 'mdi-calendar-year',
                    iconColor: 'orange',
                    value: this.yearSentData ? this.yearSentData.current : '0.00',
                    label: 'This Year',
                    percentage: this.yearSentData ? this.yearSentData.increase : 0,
                    percentageIcon: this.yearSentData && this.yearSentData.increase > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down',
                    buttonColor: 'warning',
                    completedTransactions:this.yearSentData? this.yearSentData?.completed_transactions:0,
                    failedTransactions:this.yearSentData? this.yearSentData?.failed_transactions:0,
                    totalTransactions:this.yearSentData? this.yearSentData?.total_transactions:0,
                },
                {
                    icon: 'mdi-chart-bar',
                    iconColor: 'red',
                    value: this.overallSentData ? this.overallSentData.total_received : '0.00',
                    label: 'Overall',
                    percentage: 0, // No percentage for overall
                    percentageIcon: 'mdi-arrow-up',
                    buttonColor: 'error',
                    completedTransactions:this.overallSentData? this.overallSentData?.completed_transactions:0,
                    failedTransactions:this.overallSentData? this.overallSentData?.failed_transactions:0,
                    totalTransactions:this.overallSentData? this.overallSentData?.total_transactions:0,
                }
            ];
        },
        async fetchData(){
            this.loading = true
            this.receivedData = await this.adminStore.dashboard('receive');
            this.sentData = await this.adminStore.dashboard('sent');
            console.log(this.receivedData)
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