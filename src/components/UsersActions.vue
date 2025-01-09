<template>
    <v-menu v-model="isMenuOpen" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <button :id="'menu-activator-corporate' + row.id" @click.stop="toggleMenu(row.id)"
                class="tw-flex tw-items-center tw-font-semibold tw-text-black" v-bind="props">
                <v-icon>mdi-dots-vertical</v-icon>
            </button>
        </template>
        <v-list>
            <v-list-item @click.stop="viewClient(row.id)">
                View Client
            </v-list-item>
            <v-list-item @click.stop="handleView">
                View Customers
            </v-list-item>
            <v-list-item @click.stop="handleViewTransaction">
                View Transactions
            </v-list-item>
            <v-list-item @click.stop="handleDeactivate">
                {{ row.is_suspended === false ? 'Suspend' : 'Activate' }}  Account
            </v-list-item>
            <v-list-item @click.stop="updateDialog = true">
                Update Account
            </v-list-item>
            <v-list-item :loading="true" @click.stop="debitDialog = true">
               Debit
            </v-list-item>
        </v-list>
    </v-menu>

    <Dialog v-model:visible="dialog" modal :draggable="false"  :closable="true" class="tw-float-left">
        <div class="checkmark-container tw-mb-5 tw-text-center">
            <i class="ph-circle-wavy-warning tw-text-6xl"></i>
        </div>

        <!-- Loop through messages and match with the id -->
        <div class="text-center">
            <h1 class="tw-text-4xl tw-font-semibold tw-text-green-700 tw-mb-4">
                Confirmation
            </h1>
            <p class="tw-text-lg tw-text-gray-500 tw-text-center tw-mb-6">
                Are you sure you want to {{ row.is_suspended === false ? 'Suspend' : 'Activate' }}?
            </p>
            <button @click="closeDialog"
                class="tw-rounded-md tw-bg-white tw-px-3 tw-py-2 tw-font-semibold tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 hover:tw-bg-gray-50 tw-mr-2">
                Cancel
            </button>
            <button @click="handleDeactivateActivate(row)" :loading="isLoading"
                class="tw-bg-[black]/90 hover:tw-bg-black tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
                Yes
            </button>
        </div>
    </Dialog>
    
    <Dialog v-model:visible="updateDialog" modal :closable="true" :draggable="false" style="width: 300px;" class="tw-float-left" header="Update Client">
        
        <!-- Loop through messages and match with the id -->
        <SelectField v-model="clientData.kyc_status" label="KYC Status" :options="['pending','rejected','approved']" :error-messages="errors.kyc_status" class="tw-mb-3" />
        <SelectField v-model="clientData.can_send_money" :options="[true, false]" label="Can Send Money" :error-messages="errors.can_send_money"  class="tw-mb-3" />
        
        <div class="tw-flex tw-gap-4">
            <v-btn @click="updateDialog = false"
                class="tw-rounded-md tw-bg-white tw-px-3 tw-py-2 tw-font-semibold tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 hover:tw-bg-gray-50 tw-mr-2">
                Cancel
            </v-btn>
            <v-btn @click="handleEditDetails(row)" :loading="isLoadingOpen"
                class="tw-bg-[black]/90 hover:tw-bg-black tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
                Continue
            </v-btn>
        </div>
    </Dialog>
    <Dialog v-model:visible="debitDialog" modal :closable="true" :draggable="false" style="width: 300px;" class="tw-float-left" header="Debit Client">
 
        <!-- Loop through messages and match with the id -->
        <div>
            <NumberField v-model="debit.amount" label="Amount" :error-messages="errors.amount" class="tw-mb-3" />
            <TextField v-model="debit.notes" label="Notes" :error-messages="errors.notes" class="tw-mb-3" />
            <br />
            <div class="tw-flex tw-gap-4">
                <v-btn @click="debitDialog = false"
                    class="tw-rounded-md tw-bg-white tw-px-3 tw-py-2 tw-font-semibold tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 hover:tw-bg-gray-50 tw-mr-2">
                    Cancel
                </v-btn>
                <v-btn @click="handleDebit(row)" :loading="isLoadingOpen"
                    class="tw-bg-[black]/90 hover:tw-bg-black tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
                    Continue
                </v-btn>
            </div>
        </div>
    </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog';
import { useClient } from '@/stores/client';
import { useNotificationStore } from '@/stores/notification';
import { useGlobalsStore } from "@/stores/globals";
import TextField from './TextField.vue';
import NumberField from './NumberField.vue';
import SelectField from './SelectField.vue';

export default {
    name: "UsersActions",
    props: {
        row: {
            type: Object,
            required: true,
        },
        primaryColor: {
            type: String,
            default: '#007BFF', // Default color if not provided
        },
    },
    data() {
        return {
            dialog: false,
            openRowId: null,
            globals: useGlobalsStore(),
            isMenuOpen: false,
            debitDialog:false,
            isLoadingOpen:false,
            isLoading:false,
            debit:{},
            errors:{
                amount:''
            },
            updateDialog:false,
            clientData:{}
        }
    },
    components: {
        Dialog,
        TextField,
        SelectField,
        NumberField
    },
    computed:{
       
    },
    methods: {
        toggleMenu(rowId) {
            this.openRowId = this.openRowId === rowId ? null : rowId;
            this.isMenuOpen = true
        },
        async handleEditDetails() {
            this.isLoadingOpen = true
            const res = await useClient().http({ method: 'put', path: 'admin/clients/'+this.row.id, data:{
                can_send_money:this.clientData?.can_send_money,
                kyc_status: this.clientData?.kyc_status
            }});
            this.updateDialog = false
            this.isMenuOpen=false
            this.isLoadingOpen = false
            if(res){
                const notificationStore = useNotificationStore();
                notificationStore.showNotification({
                    type: 'success',
                    message: 'Updated successfully.',
                })
            }
        },
        viewClient(id){
            this.isMenuOpen = false
            this.$emit('viewClient', id)
        },
        handleDeactivate() {
            this.isMenuOpen = false
            this.dialog = true;
        },
        async handleResetPassword() {
            this.globals.pageLoading = true;
            const user_type = this.row.user_type.replace("TaxPayer", "");
            
            const res = await useClient().http({ method: 'post', path: '/password/reset', data: { id: this.row.id, user_type } });
            this.globals.pageLoading = false;
            this.resetPasswordLoading = false
            this.isMenuOpen = false

            if (res) {
                const notificationStore = useNotificationStore();
                notificationStore.showNotification({
                    type: 'success',
                    message: 'Reset Password successfully.',
                })
            }
        },
        handleView(){
            this.$router.push('/admin/customers/'+this.row.id)
        },
        handleViewTransaction(){
            this.$router.push('/admin/transactions/'+this.row.id)
        },
        async handleDebit(row) {
            this.isMenuOpen = false
            this.debit.amount = Number(this.debit.amount)

            if(this.debit.amount <= 0 || this.debit.amount == '' || isNaN(this.debit.amount)){
                this.errors.amount ='a valid amount is required'
                return;
            }
            this.isLoadingOpen = true
            const res = await useClient().http({ method: 'post', path: 'admin/clients/'+row.id+'/debit', data:{
                ...this.debit
            }});
            this.debitDialog = false;
            this.isLoadingOpen = false
            if (res) {
                this.debit.amount = {}
                const notificationStore = useNotificationStore();
                notificationStore.showNotification({
                    type: 'success',
                    message: 'Acccount debited successfully.',
                })
                this.globals.getBalance(row.id)
            }
        },
        async handleDeactivateActivate(row) {
            this.isMenuOpen = false
            this.isLoading= true
            const type = row?.is_suspended? 'unsuspend':'suspend'
            const method = row?.is_suspended? 'get':'post'
            const res = await useClient().http({ method: method, path: 'admin/clients/'+row.id+'/'+type});
            this.isLoading= false
            this.dialog = false;
            this.isMenuOpen = false
            this.$emit('reload', true)
            if (res) {
                const notificationStore = useNotificationStore();
                notificationStore.showNotification({
                    type: 'success',
                    message: 'Acccount '+type+' successfully.',
                })
            }
        },
        closeDialog() {
            this.dialog = false;
        },
    },
    created(){
        this.clientData = this.row
    }
};
</script>

<style scoped>
/* Add component-specific styles here if needed */
</style>
