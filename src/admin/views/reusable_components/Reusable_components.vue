<template>
    <div>
        <Tab :tabs="tabs">
            <!-- Dialog Tab -->
            <template v-slot:Dialogs>
                <v-container>
                    <v-btn @click="showDialog = true">Verification Dialog</v-btn>
                    <Dialog
                        :dialog="showDialog"
                        @update:dialog="showDialog = $event"
                        icon="mdi-check-decagram-outline"
                        title="Verifying Vendor Details"
                        message="Please hold on as we verify your BVN and NIN"
                        >
                    <template #buttons>
                        <Button title="Cancel" variant="outlined" 
                        :class="`tw-text-[${$constants.primary}]`" @click="handleButtonClick('cancel')"/>
                        <Button title="Proceed"
                        :class="`tw-text-[${$constants.light}] tw-bg-[${$constants.primary}]`" />
                    </template>
                </Dialog>
                </v-container>
            </template>

            <!-- Buttons Tab -->
            <template v-slot:Buttons>
                <Button 
                    title="Cancel"
                    variant="outlined"
                    :class="`tw-text-[${$constants.primary}]`"
                />
                <Button 
                    title="Proceed"
                    :class="`tw-text-[${$constants.light}] tw-bg-[${$constants.primary}]`"
                />
            </template>

            <!-- Table Tab -->
            <template v-slot:Tables>
                <DataTable show-select :items="users" ></DataTable>
            </template>
        </Tab>
    </div>
</template>

<script>
import Dialog from '@/components/dialog/Dialog.vue'
import { useGlobalsStore } from '@/stores/globals';
import Tab from '@/components/tab.vue';
import Button from '@/components/button/Button.vue';
import DataTable  from '@/components/dataTable/DataTable.vue';
import {
    PhSquaresFour,
    PhUsersThree,
    PhCardholder,
    PhReceipt,
    PhStorefront,
    PhChartPieSlice ,
    PhChatDots,
    PhGear,
    PhSignOut,
} from "@phosphor-icons/vue";
export default {
    data(){
        return {    
            tabs:[
                { name: 'Dialogs', key:'Dialogs'},
                { name: 'Buttons', key:'Buttons'},
                { name: 'Tables', key:'Tables'},
            ],
            globals: useGlobalsStore(),
            dialog: false,
            showDialog: false,
            users: [
                {
                    photo: '1.png',
                    name: 'Muhammad Adam',
                    gtin: 'GIRS1234',
                    phone: '08012345678',
                    email: 'muhammadadam@mai.com',
                    status: 'Active',
                },
                {
                    photo: '1.png',
                    name: 'Muhammad Adam',
                    gtin: 'GIRS1234',
                    phone: '08012345678',
                    email: 'muhammadadam@mai.com',
                    status: 'Pending',
                },
                {
                    photo: '1.png',
                    name: 'Muhammad Adam',
                    gtin: 'GIRS1234',
                    phone: '08012345678',
                    email: 'muhammadadam@mai.com',
                    status: 'Inactive',
                },
                {
                    photo: '1.png',
                    name: 'Muhammad Adam',
                    gtin: 'GIRS1234',
                    phone: '08012345678',
                    email: 'muhammadadam@mai.com',
                    status: 'Active',
                },
                {
                    photo: '1.png',
                    name: 'Muhammad Adam',
                    gtin: 'GIRS1234',
                    phone: '08012345678',
                    email: 'muhammadadam@mai.com',
                    status: 'Active',
                },
                {
                    photo: '1.png',
                    name: 'Muhammad Adam',
                    gtin: 'GIRS1234',
                    phone: '08012345678',
                    email: 'muhammadadam@mai.com',
                    status: 'Active',
                },
                {
                    photo: '1.png',
                    name: 'Muhammad Adam',
                    gtin: 'GIRS1234',
                    phone: '08012345678',
                    email: 'muhammadadam@mai.com',
                    status: 'Active',
                },
                {
                    photo: '1.png',
                    name: 'Muhammad Adam',
                    gtin: 'GIRS1234',
                    phone: '08012345678',
                    email: 'muhammadadam@mai.com',
                    status: 'Active',
                },
                {
                    photo: '1.png',
                    name: 'Muhammad Adam',
                    gtin: 'GIRS1234',
                    phone: '08012345678',
                    email: 'muhammadadam@mai.com',
                    status: 'Active',
                },
                {
                    photo: '1.png',
                    name: 'Muhammad Adam',
                    gtin: 'GIRS1234',
                    phone: '08012345678',
                    email: 'muhammadadam@mai.com',
                    status: 'Active',
                },
                {
                    photo: '1.png',
                    name: 'Muhammad Adam',
                    gtin: 'GIRS1234',
                    phone: '08012345678',
                    email: 'muhammadadam@mai.com',
                    status: 'Active',
                },
                {
                    photo: '1.png',
                    name: 'Muhammad Adam',
                    gtin: 'GIRS1234',
                    phone: '08012345678',
                    email: 'muhammadadam@mai.com',
                    status: 'Active',
                },
                {
                    photo: '1.png',
                    name: 'Muhammad Adam',
                    gtin: 'GIRS1234',
                    phone: '08012345678',
                    email: 'muhammadadam@mai.com',
                    status: 'Active',
                },
                {
                    photo: '1.png',
                    name: 'Muhammad Adam',
                    gtin: 'GIRS1234',
                    phone: '08012345678',
                    email: 'muhammadadam@mai.com',
                    status: 'Active',
                },
                {
                    photo: '1.png',
                    name: 'Muhammad Adam',
                    gtin: 'GIRS1234',
                    phone: '08012345678',
                    email: 'muhammadadam@mai.com',
                    status: 'Active',
                },
                {
                    photo: '1.png',
                    name: 'Muhammad Adam',
                    gtin: 'GIRS1234',
                    phone: '08012345678',
                    email: 'muhammadadam@mai.com',
                    status: 'Active',
                },
                {
                    photo: '1.png',
                    name: 'Muhammad Adam',
                    gtin: 'GIRS1234',
                    phone: '08012345678',
                    email: 'muhammadadam@mai.com',
                    status: 'Active',
                },
                {
                    photo: '1.png',
                    name: 'Muhammad Adam',
                    gtin: 'GIRS1234',
                    phone: '08012345678',
                    email: 'muhammadadam@mai.com',
                    status: 'Active',
                },
                {
                    photo: '1.png',
                    name: 'Muhammad Adam',
                    gtin: 'GIRS1234',
                    phone: '08012345678',
                    email: 'muhammadadam@mai.com',
                    status: 'Active',
                },
                {
                    photo: '1.png',
                    name: 'Muhammad Adam',
                    gtin: 'GIRS1234',
                    phone: '08012345678',
                    email: 'muhammadadam@mai.com',
                    status: 'Active',
                },
            ],
        }
    },

    components: {
        Tab,
        Button,
        Dialog,
        DataTable,
        PhSquaresFour,
        PhUsersThree,
        PhCardholder,
        PhReceipt,
        PhStorefront,
        PhChartPieSlice,
        PhChatDots,
        PhGear,
        PhSignOut,
    },
    
    methods: {
        created(){
            useGlobalsStore().updateSubPageName("ADD INDIVIDUAL TAXPAYER3")
        },
        handleButtonClick(buttonType) {
            if (buttonType === 'cancel') {
                this.showDialog = false;
            }
        },
    }
}

</script>