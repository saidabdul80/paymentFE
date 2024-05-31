<template>
    <div>
        <Tab :tabs="tabs">
            <template v-slot:Dialogs>
                <v-container>
                    <v-btn @click="showDialog = true">Verification Dialog</v-btn>

                    <Dialog
                        :dialog="showDialog"
                        @update:dialog="showDialog = $event"
                        title="Verifying Vendor Details"
                        message="Please hold on as we verify your BVN and NIN"
                        icon="mdi-check-decagram-outline"
                        @cancel="handleCancel"
                        @proceed="handleProceed"
                    ></Dialog>
                </v-container>
            </template>
        </Tab>
    </div>
</template>

<script>
import Dialog from '@/admin/components/Dialog.vue';
import { useGlobalsStore } from '@/stores/globals';
import Tab from '@/components/tab.vue';
export default {
   
    data(){
        return {    
            tabs:[
                { name: 'Dialogs', key:'Dialogs'},
                { name: 'Tables', key:'Tables'},
            ],
            globals: useGlobalsStore(),
            dialog: false,
            showDialog: false
        }
    },

    components: {
        Tab,
        Dialog,
    },
    
    methods: {
      created(){
          useGlobalsStore().updateSubPageName("ADD INDIVIDUAL TAXPAYER3")
      },
      handleCancel() {
        console.log('Cancelled');
        },
        handleProceed() {
        console.log('Proceeded');
        },
    }
}

</script>