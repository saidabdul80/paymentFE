<template>
    <div class="tw-px-4">
        <div class="md:tw-p-5">
            <div class="tw-grid md:tw-grid-cols-2 tw-grid-cols-1 lg:tw-grid-cols-3 xl:tw-grid-cols-5 tw-gap-4 tw-mb-4">
                <v-select v-model="selectedCurrency" :items="currencyOptions" label="Select Currency" variant="solo"
                    height="20px" width="200px" class="tw-mb-0"></v-select>
                <v-select v-model="type" :items="['receive','sent']" label="Dashboard Type" variant="solo"
                    height="20px" width="200px" class="tw-mb-0"></v-select>
                <v-select v-model="period" :items="['days','week','month', 'year']" label="Period" variant="solo"
                    height="20px" width="200px" class="tw-mb-0"></v-select>
                <v-select v-model="year" :items="years" label="Year" variant="solo"
                height="20px" width="200px" class="tw-mb-0"></v-select>
                <v-select v-model="month" :items="months" label="Month" variant="solo"
                    height="20px" width="200px" class="tw-mb-0"></v-select>
            </div>            
            <div class="tw-grid md:tw-grid-cols-2 tw-grid-cols-1 lg:tw-grid-cols-3 xl:tw-grid-cols-5 tw-gap-4 tw-mb-4"
                v-if="loading">
                <v-skeleton-loader type="card" v-for="x in 5" :key="x"></v-skeleton-loader>
            </div>
            <div v-else>
                <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>                                
            </div>
        </div>
    </div>
</template>

<script>
import { useGlobalsStore } from '@/stores/globals';
import Tab from '@/components/tab.vue';
import StatisticCard from '@/components/StatisticCard.vue';
import useAdminStore from '@/admin/stores/admin';
import { useClient } from '@/stores/client';

export default {
    data() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.toLocaleString('default', { month: 'short' });

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
            loading: true,
            sentData: {
                today: {},
                thisWeek: {},
                thisMonth: {},
                thisYear: {},
                overall: []
            },
            type: 'receive',
            period: 'days',
            year: currentYear,
            month: currentMonth,
            months: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            years: [
                2023,
                2024,
                2025
            ],
            globals: useGlobalsStore(),
            chartOptions: {
                chart: {
                    type: "column"
                },
                title: {
                    text: 'Received Stats'
                },
                xAxis: {
                    categories: []
                },
                yAxis: {
                    title: {
                        text: 'Amount'
                    }
                },
                series: [
                    { name: 'Total Received', data: [] },
                    { name: 'Total Transactions', data: [] },
                    { name: 'Completed Transactions', data: [] },
                    { name: 'Failed Transactions', data: [] },
                    { name: 'Average Transaction Value', data: [] }
                ]
            }
        };
    },
    watch: {
        selectedCurrency: 'fetchDashboards',
        type: 'fetchDashboards',
        period: 'fetchDashboards',
        year: 'fetchDashboards',
        month: 'fetchDashboards'
    },
    computed: {
        // Same computed properties as before
    },
    methods: {
        updateCards() {
            // Same updateCards method as before
        },
        async fetchDashboards() {
            const payload = {
                type: this.type,
                period: this.period,
                year: this.year,
                month: this.month,
                currency: this.selectedCurrency
            };
            this.loading = true;
            const response = await useClient().http({ method: 'get', path: '/transaction/new-stat', data: payload });
            this.loading = false;
            const data = response;
            const labels = [];
            const totalReceived = [];
            const totalTransactions = [];
            const completedTransactions = [];
            const failedTransactions = [];
            const averageTransactionValue = [];

            Object.keys(data).forEach(date => {
                if (data[date][this.selectedCurrency]) {
                    labels.push(date);
                    totalReceived.push(parseFloat(data[date][this.selectedCurrency].total_received));
                    totalTransactions.push(parseInt(data[date][this.selectedCurrency].total_transactions));
                    completedTransactions.push(parseInt(data[date][this.selectedCurrency].completed_transactions));
                    failedTransactions.push(parseInt(data[date][this.selectedCurrency].failed_transactions));
                    averageTransactionValue.push(parseFloat(data[date][this.selectedCurrency].average_transaction_value));
                }
            });
            this.chartOptions.title.text = this.type == 'receive'?'Received Stats':'Sent Stats'
            this.chartOptions.xAxis.categories = labels;
            this.chartOptions.series[0].data = totalReceived;
            this.chartOptions.series[0].name =  this.type == 'receive'?'Total Received':'Total Sent'            
            this.chartOptions.series[1].data = totalTransactions;
            this.chartOptions.series[2].data = completedTransactions;
            this.chartOptions.series[3].data = failedTransactions;
            this.chartOptions.series[4].data = averageTransactionValue;
        }
    },
    created() {
        this.fetchDashboards();
    },
    components: {
        Tab,
        StatisticCard,
    }
};
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
