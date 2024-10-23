<template>
    <div class="tw-px-4">
        <div class="md:tw-p-5">
            <div class="tw-grid md:tw-grid-cols-5 tw-grid-cols-1 lg:tw-grid-cols-4 tw-gap-4 ">
                <!-- <v-select v-model="selectedCurrency" :items="currencyOptions" label="Select Currency" variant="flat"
                    height="20px" width="200px" class="tw-mb-0 tw-border tw-h-[50px] tw-py-0 tw-mt-0"></v-select> -->
                <!-- <v-select  v-model="type" :items="['receive', 'sent']" label="Dashboard Type" variant="flat"
                    height="20px" width="100%" class="tw-mb-0 tw-border  tw-h-[40px]  tw-py-0 tw-mt-0"></v-select>
                <v-select v-model="date_type" :items="['days', 'week', 'month', 'year']" label="Date Type" variant="flat"
                    height="20px" width="100%" class="tw-mb-0 tw-border  tw-h-[40px] tw-py-0 tw-mt-0"></v-select>
                <v-select v-model="year" :items="years" label="Year" variant="flat" height="20px" width="100%"
                    class="tw-mb-0 tw-border tw-h-[40px] tw-py-0 tw-mt-0"></v-select>
                <v-select v-model="month" :items="months" label="Month" variant="flat" height="20px" width="100%"
                    class="tw-mb-0 tw-border tw-h-[40px] tw-py-0 tw-mt-0"></v-select> -->
            </div>
            <!-- <hr class="tw-my-4 tw-border-2 tw-shadow-2xl"/> -->
            <div class="tw-grid md:tw-grid-cols-2 tw-mb-4 tw-items-center tw-place-items-center">
                <!-- {{ this.globals.balance }} -->
                <DashboardCard 
                    v-for="key in Object.keys(globals.balance)"
                    :name="key.replace('_', ' ')"
                    :balance="globals.balance[key]"
                    previousBalance="-"
                    percentageChange="-"
                    />
                    </div>
            <div class="tw-grid md:tw-grid-cols-2 tw-grid-cols-1 lg:tw-grid-cols-3 xl:tw-grid-cols-5 tw-gap-4 tw-mb-4"
                v-if="loading">
                <v-skeleton-loader type="card" v-for="x in 5" :key="x"></v-skeleton-loader>
            </div>
            <div v-else>
                <div class="tw-my-4 tw-bg-white ">
                    <div class="tw-flex tw-w-full tw-py-6 tw-px-4 tw-justify-between tw-items-center">
                        <p class="tw-m-0 tw-text-md">All Transactions</p>
                        <div class="tw-flex  tw-items-center">
                            <v-btn @click="all_transaction_date_type='month'" :flat="all_transaction_date_type=='month'" :class="all_transaction_date_type=='month'?'':'tw-bg-black tw-text-white'" size="small" class=" ">Month</v-btn>
                            <v-btn @click="all_transaction_date_type='year'" :flat="all_transaction_date_type=='year'" :class="all_transaction_date_type=='year'?'':'tw-bg-black tw-text-white'"  size="small" class="tw-mx-2">Year</v-btn>
                            <v-select :disabled="all_transaction_date_type=='year'" v-model="all_transaction_year" :items="years" label="Year" variant="flat" width="100px"
                            class="tw-mb-0 tw-border tw-h-[37px] tw-py-0 tw-bg-white tw-mt-0"></v-select>
                        </div>
                    </div>
                    <v-skeleton-loader   v-if="all_transaction_key" type="card" v-for="x in 2" :key="x"></v-skeleton-loader>
                    <highcharts v-else  class="hc" :options="chartOptions2" ref="chart2"></highcharts>
                </div>
                <!-- <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts> -->

                <!-- Comparison Chart -->
                <!-- <highcharts class="hc" :options="chartOptionsComparison" ref="chartComparison"></highcharts> -->
            </div>
        </div>
    </div>
</template>

<script>
import { useGlobalsStore } from '@/stores/globals';
import Tab from '@/components/tab.vue';

import DashboardCard from '@/components/DashboardCard.vue';
import useAdminStore from '@/admin/stores/admin';
import { useClient } from '@/stores/client';
import Highcharts from 'highcharts';
export default {
    data() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.toLocaleString('default', { month: 'short' });

        return {
            all_transaction_date_type:'month',
            all_transaction_year:currentYear,
            all_transaction_key:false,
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
            date_type: 'days',
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
            chartOptions2: {
                chart: {
                    type: "column"
                },
                title: {
                    text: 'Received Stats'
                },
                xAxis: {
                    lineWidth: 1,
                    tickWidth: 1,
                     lineColor: '#ccc',
                    tickColor: '#ccc',
                    categories: []
                },
                yAxis: {
                    title: {
                        text: 'Amount'
                    }
                },
                plotOptions: {
                    series: {
                    groupPadding: 0,
                    pointPadding: 0
                    },
                },

                // series: [
                //     { name: 'Total Received', data: [] },
                //     { name: 'Total Transactions', data: [] },
                //     { name: 'Completed Transactions', data: [] },
                //     { name: 'Failed Transactions', data: [] },
                //     { name: 'Average Transaction Value', data: [] }
                // ]
            },
            chartOptionsComparison: {
                chart: {
                    type: "spline",
                },
                title: {
                    text: 'Comparison of Total Received vs Total Sent'
                },
                xAxis: {
                    categories: []
                },
                yAxis: { // Only one yAxis (left)
                    title: {
                        text: 'Amount',
                    },
                    labels: {
                        format: '{value} ',
                        style: {
                            color: "#000"
                        }
                    },
                    stackLabels: {
                        enabled: true
                    }
                },
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
                    series: {
                        animation: {
                            duration: 1000
                        },
                        marker: {
                            enabled: false
                        },
                        lineWidth: 2
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
                        yAxis: 0, // Also bind this series to the left yAxis
                        color: Highcharts.getOptions().colors[1]
                    }
                ]
            },
            balances:{
                Ledger:{name:"Ledger Balance",balance:40000000,previousBalance:30000000,percentageChange:4},
                Available:{name:"Available Balance",balance:40000000,previousBalance:30000000,percentageChange:4},
                Send:{name:"Send ",balance:40000000,previousBalance:30000000,percentageChange:4},
                Receive:{name:"Receive",balance:40000000,previousBalance:30000000,percentageChange:4},
            }

        };
    },
    watch: {
        selectedCurrency: 'fetchDashboards',
        type: 'fetchDashboards',
        date_type: 'fetchDashboards',
        year: 'fetchDashboards',
        month: 'fetchDashboards',
        all_transaction_date_type:'fetchDashboards2',
        all_transaction_year:'fetchDashboards2',
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
            this.fetchDashboards2()
            const payload = {
                type: this.type,
                date_type: this.date_type,
                year: this.year,
                month: this.month,
                currency: this.selectedCurrency
            };
            this.loading = true;
            const response = await useClient().http({ method: 'get', path: 'transactions/stats', data: payload });
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
        async fetchDashboards2() {
            this.all_transaction_key = true;
            const payload = {
                type: 'sent',
                date_type: this.all_transaction_date_type,
                year: this.all_transaction_date_type === 'year' ? null : this.all_transaction_year,
                month: null,
                currency: this.selectedCurrency
            };

            const sent = await useClient().http({ method: 'get', path: 'transactions/stats', data: payload });
            const received = await useClient().http({ method: 'get', path: 'transactions/stats', data: { ...payload, type: 'receive' } });

            this.loading = false;

            const totalReceived = [];
            const totalSent = [];
            const labels = [];

            // Combine the dates from both datasets to ensure all dates are covered
            const allDates = Array.from(new Set([...Object.keys(received), ...Object.keys(sent)])).sort();

            allDates.forEach(date => {
                labels.push(date);

                if (received[date] && received[date][this.selectedCurrency]) {
                    totalReceived.push(parseFloat(received[date][this.selectedCurrency].total_amount));
                } else {
                    totalReceived.push(0);  // Add 0 if no data for the date
                }

                if (sent[date] && sent[date][this.selectedCurrency]) {
                    totalSent.push(parseFloat(sent[date][this.selectedCurrency].total_amount));
                } else {
                    totalSent.push(0);  // Add 0 if no data for the date
                }
            });

            this.chartOptions2.title.text = '';
            this.chartOptions2.xAxis.categories = labels;
            this.chartOptions2.series = [
                {
                    name: 'Received',
                    data: totalReceived,
                    color: '#92CFDC'
                },
                {
                    name: 'Sent',
                    data: totalSent,
                    color: '#FFBF75'
                }
            ];
            this.all_transaction_key = false;
        },


        async comparison() {
            const payload1 = {
                type: 'receive',
                date_type: this.date_type,
                year: this.year,
                month: this.month,
                currency: this.selectedCurrency
            };
            const payload2 = {
                type: 'sent',
                date_type: this.date_type,
                year: this.year,
                month: this.month,
                currency: this.selectedCurrency
            };

            this.loading = true;

            // Fetch data for 'receive'
            const response1 = await useClient().http({ method: 'get', path: 'transactions/stats', data: payload1 });
            // Fetch data for 'sent'
            const response2 = await useClient().http({ method: 'get', path: 'transactions/stats', data: payload2 });

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
                    console.log(date,response2[date][this.selectedCurrency].total_received)
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
        this.globals.getBalance()
    },
   
    components: {
        Tab,
        DashboardCard,
    }
};
</script>

<style >
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

.v-text-field--box .v-input__slot,.v-field__input,.v-field__field,.v-field , .v-text-field--outline .v-input__slot{
    min-height: auto !important;
    display: flex !important;
    align-items: center !important
   }
  
</style>


<!-- <template>
    <div>
     
        <div class="tw-grid md:tw-grid-cols-3 ">
        <DashboardCard 
            v-for="x in 3"
            :balance="7820000"
            :previousBalance="3910000"
            :percentageChange="50"
            />
            </div>
    </div>
</template>

<script>
import DashboardCard from '@/components/DashboardCard.vue';

    export default {
        components: {
            DashboardCard,
        },
    }
</script>

<style lang="scss" scoped>

</style> -->