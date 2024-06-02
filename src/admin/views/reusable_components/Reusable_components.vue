<template>
    <div>
        <Tab :tabs="tabs">
            <!-- Dialog Tab -->
            <template v-slot:Dialogs>
                <v-container>
                    <Button 
                        title="Verification Dialog"
                        variant="outlined"
                        :class="`tw-text-[${$constants.primary}]`"
                        @click="showDialog = true"
                    />
                    <Dialog
                        :dialog="showDialog"
                        @update:dialog="showDialog = $event"
                        icon="mdi-check-decagram-outline"
                        title="Verifying Vendor Details"
                        message="Please hold on as we verify your BVN and NIN"
                    >
                        <template #buttons>
                            <v-checkbox
                                v-model="terms"
                                color="secondary"
                                label="I agree to site terms and conditions"
                            ></v-checkbox>
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
                <DataTable title="USERS" :headers="headers" :items="users" >
                    <template #action_button>
                        <Button 
                            title="Add New Taxpayer" 
                            prepend-icon="mdi-plus"
                            rounded="lg"
                            size="large"
                            :class="`tw-text-[${$constants.light}] tw-bg-[${$constants.primary}]`"
                            id="menu-activator"
                        />
                        <v-menu activator="#menu-activator">
                            <v-list>
                                <v-list-item class="tw-ml-3">CHOOSE TAXPAYER TYPE</v-list-item>
                                <v-list-item
                                    v-for="(item, index) in taxpayers"
                                    :key="index"
                                    :value="index"
                                    :to="item.link"
                                >
                                <div class="tw-flex">
                                    <v-list-item-title class="tw-my-auto tw-ml-3 tw-mr-14">{{ item.title }}</v-list-item-title>
                                    <v-radio :value="item" />
                                </div>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </template>
                </DataTable>
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
                { name: 'Tables', key:'Tables'},
                { name: 'Dialogs', key:'Dialogs'},
                { name: 'Buttons', key:'Buttons'},
            ],
            globals: useGlobalsStore(),
            dialog: false,
            showDialog: false,
            terms: false,
            headers: [
                { key: 'id', title: 'ID' },
                { key: 'photo', title: 'PHOTO' },
                { key: 'name', title: 'NAME' },
                { key: 'gtin', title: 'G-TIN' },
                { key: 'phone', title: 'PHONE NUMBER' },
                { key: 'email', title: 'EMAIL' },
                { key: 'status', title: 'STATUS' },
            ],
            users: [
                {
                    id: 1,
                    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                    name: 'Muhammad Adam 1',
                    gtin: 'GIRS1234',
                    phone: '08012345678',
                    email: 'muhammadadam1@mai.com',
                    status: 'Active',
                },
                {
                    id: 2,
                    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                    name: 'Muhammad Adam 2',
                    gtin: 'GIRS1235',
                    phone: '08012345679',
                    email: 'muhammadadam2@mai.com',
                    status: 'Pending',
                },
                {
                    id: 3,
                    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                    name: 'Muhammad Adam 3',
                    gtin: 'GIRS1236',
                    phone: '08012345670',
                    email: 'muhammadadam3@mai.com',
                    status: 'Inactive',
                },
                {
                    id: 4,
                    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                    name: 'Muhammad Adam 4',
                    gtin: 'GIRS1237',
                    phone: '08012345671',
                    email: 'muhammadadam4@mai.com',
                    status: 'Active',
                },
                {
                    id: 5,
                    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                    name: 'Muhammad Adam 5',
                    gtin: 'GIRS1238',
                    phone: '08012345672',
                    email: 'muhammadadam5@mai.com',
                    status: 'Active',
                },
                {
                    id: 6,
                    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                    name: 'Muhammad Adam 6',
                    gtin: 'GIRS1239',
                    phone: '08012345673',
                    email: 'muhammadadam6@mai.com',
                    status: 'Pending',
                },
                {
                    id: 7,
                    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                    name: 'Muhammad Adam 7',
                    gtin: 'GIRS1240',
                    phone: '08012345674',
                    email: 'muhammadadam7@mai.com',
                    status: 'Inactive',
                },
                {
                    id: 8,
                    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                    name: 'Muhammad Adam 8',
                    gtin: 'GIRS1241',
                    phone: '08012345675',
                    email: 'muhammadadam8@mai.com',
                    status: 'Active',
                },
                {
                    id: 9,
                    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                    name: 'Muhammad Adam 9',
                    gtin: 'GIRS1242',
                    phone: '08012345676',
                    email: 'muhammadadam9@mai.com',
                    status: 'Active',
                },
                {
                    id: 10,
                    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                    name: 'Muhammad Adam 10',
                    gtin: 'GIRS1243',
                    phone: '08012345677',
                    email: 'muhammadadam10@mai.com',
                    status: 'Pending',
                },
                {
                    id: 11,
                    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                    name: 'Muhammad Adam 11',
                    gtin: 'GIRS1244',
                    phone: '08012345678',
                    email: 'muhammadadam11@mai.com',
                    status: 'Inactive',
                },
                {
                    id: 12,
                    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                    name: 'Muhammad Adam 12',
                    gtin: 'GIRS1245',
                    phone: '08012345679',
                    email: 'muhammadadam12@mai.com',
                    status: 'Active',
                },
                {
                    id: 13,
                    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                    name: 'Muhammad Adam 12',
                    gtin: 'GIRS1245',
                    phone: '08012345679',
                    email: 'muhammadadam12@mai.com',
                    status: 'Active',
                },
                {
                    id: 14,
                    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                    name: 'Muhammad Adam 12',
                    gtin: 'GIRS1245',
                    phone: '08012345679',
                    email: 'muhammadadam12@mai.com',
                    status: 'Active',
                },
                {
                    id: 15,
                    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s',
                    name: 'Muhammad Adam 12',
                    gtin: 'GIRS1245',
                    phone: '08012345679',
                    email: 'muhammadadam12@mai.com',
                    status: 'Active',
                },
            ],
            taxpayers: [
                {
                    title: 'Individual Taxpayer',
                    link: '/admin/users'
                },
                {
                    title: 'Corporate Taxpayer',
                    link: '/admin/dashboard'
                }
            ]
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