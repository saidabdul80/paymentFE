<template>
    <div class="tw-px-4">
        <div class="md:tw-p-5">
            <div class="tw-grid md:tw-grid-cols-2 tw-grid-cols-1 lg:tw-grid-cols-3 xl:tw-grid-cols-5 tw-gap-4 tw-mb-4">
                <v-select v-model="selectedCurrency" :items="currencyOptions" label="Select Currency" variant="solo"
                    height="20px" width="200px" class="tw-mb-0"></v-select>
                <v-select v-model="type" :items="['receive', 'sent']" label="Dashboard Type" variant="solo"
                    height="20px" width="200px" class="tw-mb-0"></v-select>
                <v-select v-model="period" :items="['days', 'week', 'month', 'year']" label="Period" variant="solo"
                    height="20px" width="200px" class="tw-mb-0"></v-select>
                <v-select v-model="year" :items="years" label="Year" variant="solo" height="20px" width="200px"
                    class="tw-mb-0"></v-select>
                <v-select v-model="month" :items="months" label="Month" variant="solo" height="20px" width="200px"
                    class="tw-mb-0"></v-select>
            </div>
            <div class="tw-grid md:tw-grid-cols-2 tw-grid-cols-1 lg:tw-grid-cols-3 xl:tw-grid-cols-5 tw-gap-4 tw-mb-4"
                v-if="loading">
                <v-skeleton-loader type="card" v-for="x in 5" :key="x"></v-skeleton-loader>
            </div>
            <div v-else>
                <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>

                <!-- Comparison Chart -->
                <highcharts class="hc" :options="chartOptionsComparison" ref="chartComparison"></highcharts>
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
import Highcharts from 'highcharts';
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
            },
            chartOptionsComparison: {
                chart: {
                    type: "column",
                },
                title: {
                    text: 'Comparison of Total Received vs Total Sent'
                },
                xAxis: {
                    categories: []
                },
                yAxis: [
                    { // Primary yAxis (left)
                        title: {
                            text: 'Total Received',
                        },
                        labels: {
                            format: '{value} ',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        stackLabels: {
                            enabled: true
                        }
                    },
                    { // Secondary yAxis (right)
                        title: {
                            text: 'Total Sent',
                        },
                        opposite: true, // Position on the right
                        labels: {
                            format: '{value} ',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        stackLabels: {
                            enabled: true
                        }
                    }
                ],
                legend: {
                    align: 'right',
                    x: -30,
                    verticalAlign: 'top',
                    y: 25,
                    floating: true,
                    backgroundColor: 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                plotOptions: {
                    bar: {
                        stacking: null, // Turn off stacking for dual-axis
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                series: [
                    {
                        name: 'Total Received',
                        data: [],
                        yAxis: 0, // Bind this series to the left yAxis
                        color: Highcharts.getOptions().colors[0]
                    },
                    {
                        name: 'Total Sent',
                        data: [],
                        yAxis: 1, // Bind this series to the right yAxis
                        color: Highcharts.getOptions().colors[1]
                    }
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
            this.comparison()
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
            this.chartOptions.title.text = this.type == 'receive' ? 'Received Stats' : 'Sent Stats'
            this.chartOptions.xAxis.categories = labels;
            this.chartOptions.series[0].data = totalReceived;
            this.chartOptions.series[0].name = this.type == 'receive' ? 'Total Received' : 'Total Sent'
            this.chartOptions.series[1].data = totalTransactions;
            this.chartOptions.series[2].data = completedTransactions;
            this.chartOptions.series[3].data = failedTransactions;
            this.chartOptions.series[4].data = averageTransactionValue;

        },
        async comparison() {
            const payload1 = {
                type: 'receive',
                period: this.period,
                year: this.year,
                month: this.month,
                currency: this.selectedCurrency
            };
            const payload2 = {
                type: 'sent',
                period: this.period,
                year: this.year,
                month: this.month,
                currency: this.selectedCurrency
            };

            this.loading = true;

            // Fetch data for 'receive'
            const response1 = await useClient().http({ method: 'get', path: '/transaction/new-stat', data: payload1 });
            // Fetch data for 'sent'
            const response2 = await useClient().http({ method: 'get', path: '/transaction/new-stat', data: payload2 });

            this.loading = false;

            const labels = [];
            const totalReceived = [];
            const totalSent = [];

            // Collect all unique dates from both responses
            const allDates = new Set([...Object.keys(response1), ...Object.keys(response2)]);

            allDates.forEach(date => {
                labels.push(date);

                // Add received data if available, else add 0
                if (response1[date] && response1[date][this.selectedCurrency]) {
                    totalReceived.push(parseFloat(response1[date][this.selectedCurrency].total_received));
                } else {
                    //totalReceived.push(0);
                }

                // Add sent data if available, else add 0
                if (response2[date] && response2[date][this.selectedCurrency]) {
                    totalSent.push(parseFloat(response2[date][this.selectedCurrency].total_received));
                } else {
                    //totalSent.push(0);
                }
            });

            // Update chart data
            this.chartOptionsComparison.xAxis.categories = labels;
            this.chartOptionsComparison.series[0].data = totalReceived;
            this.chartOptionsComparison.series[1].data = totalSent;
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
