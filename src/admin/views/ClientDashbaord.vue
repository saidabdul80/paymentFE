<template>
    <div class="tw-px-4">
        <div class="">
            <!-- <v-btn color="black" @click="transferDialog=true" class="tw-w-[150px] tw-capitalize !tw-p-0" size="small" variant="outlined" >Make transfer</v-btn> -->
            <!-- <hr class="tw-my-4 tw-border-2 tw-shadow-2xl"/> -->
             <!-- <FormsHeader :title=""  /> -->
            <Teleport v-if="!globals.loadingClient" defer to="#breadcrubs-right">
                <h4 :class="`tw-text-[${$constants.primary}] ${$constants.text_size.s5}`"
                     class="tw-font-visby md:tw-text-right tw-font-black tw-text-2xl tw-uppercase">
                     {{ globals.client?.client?.company_name || "Admin" }}
                    </h4>
            </Teleport> 
            <div class="tw-grid md:tw-grid-cols-4 tw-mb-4 tw-items-center tw-place-items-center">                  
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
            <div class="tw-mb-5 tw-rounded-md tw-shadow-md">
                <h1 class="tw-text-2xl tw-font-semibold tw-text-gray-700 tw-bg-white tw-p-3 tw-shadow-md">Recent Transactions</h1>
                <Tab :tabs="tabs" v-model="tabIndex" :withBorder="true" :config="tabConfig" refresh  @change="handleTabDrupdwonButton">
                    <template v-slot:Sent>
                        <DataTable :value="globals.transactions?.data?.slice(0,5)" :loading="globals.loadingTransactions" class="tw-tracking-wider" :rowClass="applyRowClass">
                            <Column v-for="(col, index) in theader" :key="col.field" :field="col.field"
                                :header="col.header" :bodyClass="index === 0 ? 'tw-font-semibold' : ''">
                            </Column>
                        </DataTable>
                    </template>
                    <template v-slot:Received>
                        <DataTable :value="globals.transactions?.data?.slice(0,5)" :loading="globals.loadingTransactions" class="tw-tracking-wider" :rowClass="applyRowClass">
                            <Column v-for="(col, index) in theader" :key="col.field" :field="col.field"
                                :header="col.header" :bodyClass="index === 0 ? 'tw-font-semibold' : ''">
                            </Column>
                        </DataTable>
                    </template>
                </Tab>

               
            </div>
        </div>
    </div>

    <Dialog v-model:visible="transferDialog" modal :closable="false" :draggable="false" style="width: 300px;" class="tw-float-left" header="Internal Transfer">
        
        <!-- Loop through messages and match with the id -->
        <div>
            <TextField v-model="transfer.amount" label="Amount" :error-messages="errors.amount" class="tw-mb-3" />
            <TextField v-model="transfer.email" label="Recipient Email" :error-messages="errors.client_id" class="tw-mb-3" />
            <TextField v-model="transfer.notes" label="Notes" :error-messages="errors.notes" class="tw-mb-3" />
            <br />
            <div class="tw-flex tw-gap-4">
                <v-btn @click="transferDialog = false"
                    class="tw-rounded-md tw-bg-white tw-px-3 tw-py-2 tw-font-semibold tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 hover:tw-bg-gray-50 tw-mr-2">
                    Cancel
                </v-btn>
                <v-btn @click="handleTranser()" :loading="isLoadingOpen"
                    class="tw-bg-[black]/90 hover:tw-bg-black tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
                    Continue
                </v-btn>
            </div>
        </div>
        </Dialog>
</template>

<script>
import { useGlobalsStore } from '@/stores/globals';
import Tab from '@/components/tab.vue';

import DashboardCard from '@/components/DashboardCard.vue';
import useAdminStore from '@/admin/stores/admin';
import { useClient } from '@/stores/client';
import Highcharts from 'highcharts';
import ls from '@/services/ls';
import Dialog from 'primevue/dialog';
import TextField from '@/components/TextField.vue';
import FormsHeader from '@/components/FormsHeader.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
export default {
    data() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.toLocaleString('default', { month: 'short' });

        return {
            transactions: [],
            theader: 
            [
                { field: "customer_detail.full_name", header: "Customer name" },
                { field: "transaction_number", header: "Trx Number",copy:true },
                { field: "start_balance", header: "Start Balance" },
                { field: "type", header: "Trx type" },
                { field: "amount", header: "Amount" },
                { field: "end_balance", header: "End Balance" },
                { field: "created_at", header: "Date" },
                { field: "status", header: "Status" },
                { field: "action", header: "#" },
                
            ],
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
            type: 'credit',
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

         
            },
            transferDialog:false,
            transfer:{},
            isLoadingOpen:false,
            errors:{},
            user: ls.get('auth.user'),
            client_id:null,
            tabs: [
                    { name: "Received", key: "Received" },
                    { name: "Sent", key: "Sent" },
            ],
            tabIndex: 0,
            type:'credit',
        };
    },
    watch: {
        selectedCurrency: 'fetchDashboards2',
        //type: 'fetchDashboards',
        // date_type: 'fetchDashboards',
        // year: 'fetchDashboards',
        // month: 'fetchDashboards',
        all_transaction_date_type:'fetchDashboards2',
        all_transaction_year:'fetchDashboards2',
        tabIndex: function (newV) {
            if (newV == 0) {
                this.type = "credit";
                //this.filters.transaction_type = this.type
                this.globals.getTrasactionsForAdmin({
                    transaction_type: this.type,
                });
            } else {
                this.type = "debit";
            //    this.filters.transaction_type = this.type
                this.globals.getTrasactionsForAdmin({
                    transaction_type: this.type,
                });
            }
        },
    },
    computed: {
        // Same computed properties as before
    },
    methods: {
        async handleTranser() {
            
            this.transfer.amount = Number(this.transfer.amount)

            if(this.transfer.amount < 1 || this.transfer.amount == '' || isNaN(this.transfer.amount)){
                this.errors.amount ='a valid amount is required'
                return;
            }
            if(this.transfer?.email == '' || this.transfer?.email  == undefined){
                this.errors.email ='a valid email is required'
                return;
            }
            
            this.isLoadingOpen = true
            const res = await useClient().http({ method: 'post', path: 'transactions/internal-transfer', data:{
                ...this.transfer
            }});
            this.transferDialog = false;
            this.isLoadingOpen = false
            if (res) {
                this.transfer.amount = {}
                const notificationStore = useNotificationStore();
                notificationStore.showNotification({
                    type: 'success',
                    message: 'Acccount transfered successfully.',
                })
            }
        },
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
                currency: this.selectedCurrency,
            };
            if(this.client_id != null){
                payload.client_id = this.client_id
            }

            this.loading = true;
            const response = await useClient().http({ method: 'get', path: 'admin/transactions/stats', data: payload });
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
            this.chartOptions.title.text = this.type == 'credit' ? 'Received Stats' : 'Debit Stats'
            this.chartOptions.xAxis.categories = labels;
            this.chartOptions.series[0].data = totalReceived;
            this.chartOptions.series[0].name = this.type == 'credit' ? 'Total Received' : 'Total Debit'
            this.chartOptions.series[1].data = totalTransactions;
            this.chartOptions.series[2].data = completedTransactions;
            this.chartOptions.series[3].data = failedTransactions;
            this.chartOptions.series[4].data = averageTransactionValue;

        },
        async fetchDashboards2() {

            this.all_transaction_key = true;
            const payload = {
                transaction_type: 'debit',
                date_type: this.all_transaction_date_type,
                year: this.all_transaction_date_type === 'year' ? null : this.all_transaction_year,
                month: null,
                currency: this.selectedCurrency,
            };
            if(this.client_id != null){
                payload.client_id = this.client_id
            }
            //alert(this.all_transaction_date_type)

            const debit = await useClient().http({ method: 'get', path: 'admin/transactions/stats', data: payload });

            const received = await useClient().http({ method: 'get', path: 'admin/transactions/stats', data:{...payload,transaction_type: 'credit' }});

            this.loading = false;

            const totalReceived = [];
            const totalSent = [];
            const labels = [];

            // Combine the dates from both datasets to ensure all dates are covered
            const allDates = Array.from(new Set([...Object.keys(received), ...Object.keys(debit)])).sort();

            allDates.forEach(date => {
                labels.push(date);

                if (received[date] && received[date][this.selectedCurrency]) {
                    totalReceived.push(parseFloat(received[date][this.selectedCurrency].total_amount));
                } else {
                    totalReceived.push(0);  // Add 0 if no data for the date
                }

                if (debit[date] && debit[date][this.selectedCurrency]) {
                    totalSent.push(parseFloat(debit[date][this.selectedCurrency].total_amount));
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
                type: 'credit',
                date_type: this.date_type,
                year: this.year,
                month: this.month,
                currency: this.selectedCurrency,
            };
            if(this.client_id != null){
                payload1.client_id = this.client_id
            }
            const payload2 = {
                type: 'debit',
                date_type: this.date_type,
                year: this.year,
                month: this.month,
                currency: this.selectedCurrency,
            };
            
            if(this.client_id != null){
                payload2.client_id = this.client_id
            }
            this.loading = true;

            // Fetch data for 'credit'
            const response1 = await useClient().http({ method: 'get', path: 'admin/transactions/count-stats', data: payload1 });
            // Fetch data for 'debit'
            const response2 = await useClient().http({ method: 'get', path: 'admin/transactions/count-stats', data: payload2 });

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

                // Add debit data if available, else add 0
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
        // if(this.$route.params?.id == ''){
        //     this.$router.push('/admin/clients')
        // }
        this.client_id = this.$route.params?.id
        this.globals.client = {}
        this.fetchDashboards2();
        this.globals.getBalance(this.client_id)
        this.globals.getClient(this.client_id)
        this.globals.getTrasactionsForAdmin({
                    transaction_type: this.type,
                });
    },
   
    components: {
        Tab,
        DashboardCard,
        Dialog,
        TextField,
        FormsHeader,
        DataTable,
        Column
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