<template>
        <div class="tw-h-full tw-w-full" color="light">
            <DataTable :paginationData="transactions" :headers="headers" />
        </div>
        <Drawer v-model:visible="showdrawer" header="Drawer"  position="right">
            <div class="tw-text-center tw-mb-4">
                <h1 class="tw-text-2xl tw-font-semibold">$4,000 USD</h1>
                <p class="tw-text-gray-500">CAD &gt; USD</p>
                <div class="tw-mt-2">
                    <span class="tw-bg-gray-100 tw-text-gray-600 tw-py-1 tw-px-3 tw-rounded-lg tw-text-sm">
                    CWR93768Y43
                    </span>
                </div>
                </div>

                <!-- Company Details -->
                <div class="tw-flex tw-items-center tw-mb-4 tw-border-b tw-pb-4">
               <CompanyCard />
                </div>

                <!-- Transaction Details -->
                <div class="tw-mb-4">
                <div class="tw-grid tw-grid-cols-2 tw-gap-y-2">
                    <div class="tw-text-gray-500 tw-text-sm">Customer name</div>
                    <div class="tw-text-sm">Rhoda Ogunesan</div>

                    <div class="tw-text-gray-500 tw-text-sm">Customer email</div>
                    <div class="tw-text-sm tw-w-[150px] tw-truncate">ogunesanrhoda@gmail.com</div>

                    <div class="tw-text-gray-500 tw-text-sm">Receiver amount</div>
                    <div class="tw-text-sm">$4,000 USD</div>

                    <div class="tw-text-gray-500 tw-text-sm">Sender amount</div>
                    <div class="tw-text-sm">$2,938.54 CAD</div>

                    <div class="tw-text-gray-500 tw-text-sm">Exchange rate</div>
                    <div class="tw-text-sm">$1 = $0.71</div>

                    <div class="tw-text-gray-500 tw-text-sm">Description</div>
                    <div class="tw-text-sm">The payment was for service subscription continuation.</div>

                    <div class="tw-text-gray-500 tw-text-sm">Date</div>
                    <div class="tw-text-sm">Nov 4, 08:06 PM</div>

                    <div class="tw-text-gray-500 tw-text-sm">Status</div>
                    <div class="tw-text-sm">
                    <span class="tw-inline-block tw-px-2 tw-py-1 tw-rounded-full tw-bg-yellow-100 tw-text-yellow-600">
                        Pending
                    </span>
                    </div>
                </div>
                </div>

                <!-- Actions -->
                <div class="tw-mt-6 tw-flex tw-flex-col tw-items-center">
                <button
                    class="tw-bg-black tw-text-white tw-py-2 tw-px-4 tw-rounded-lg tw-mb-2 hover:tw-bg-gray-800"
                >
                    Download receipt
                </button>
                <a href="#" class="tw-text-sm tw-text-gray-500 hover:tw-underline">
                    Report an issue
                </a>
                </div>

        </Drawer>
</template>

<script>
import CompanyCard from "@/components/CompanyCard.vue";
import DataTable from "@/components/Table/Table.vue"
import Drawer from 'primevue/drawer';
    export default {
        components: {
            DataTable,
            CompanyCard,
            Drawer

        },
        data() {
            return {
                showdrawer:true,
                transactions: {
                    data: [
                        { account: "Account 1", date: "2024-10-01", transactionId: "TXN1", transactionType: "Credit", amount: "$100.00", status: "Completed" },
                        { account: "Account 2", date: "2024-10-01", transactionId: "TXN2", transactionType: "Debit", amount: "$200.00", status: "Pending" },
                        { account: "Account 3", date: "2024-10-01", transactionId: "TXN3", transactionType: "Credit", amount: "$300.00", status: "Completed" },
                        { account: "Account 4", date: "2024-10-01", transactionId: "TXN4", transactionType: "Debit", amount: "$400.00", status: "Pending" },
                        { account: "Account 5", date: "2024-10-01", transactionId: "TXN5", transactionType: "Credit", amount: "$500.00", status: "Completed" },
                        { account: "Account 6", date: "2024-10-01", transactionId: "TXN6", transactionType: "Debit", amount: "$600.00", status: "Pending" },
                        { account: "Account 7", date: "2024-10-01", transactionId: "TXN7", transactionType: "Credit", amount: "$700.00", status: "Completed" },
                        { account: "Account 8", date: "2024-10-01", transactionId: "TXN8", transactionType: "Debit", amount: "$800.00", status: "Pending" },
                        { account: "Account 9", date: "2024-10-01", transactionId: "TXN9", transactionType: "Credit", amount: "$900.00", status: "Completed" },
                        { account: "Account 10", date: "2024-10-01", transactionId: "TXN10", transactionType: "Debit", amount: "$1000.00", status: "Pending" },
                    ],
                    meta: {
                        current_page: 1,
                        from: 1,
                        last_page: 5,
                        path: "/transactions",
                        links:{
                            prev:null,
                            next: "/transactions?page=2"
                        },
                        per_page: 10,
                        to: 10,
                        total: 50
                    }
                },
                headers: [   
                {key:"account", title:"Account name"},
                {key:"date", title:"Date"},
                {key:"transactionId", title:"Transaction ID"},
                {key:"transactionType", title:"Transaction type"},
                {key:"amount", title:"Amount"},
                {key:"status", title:"Status"},
            ]
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>