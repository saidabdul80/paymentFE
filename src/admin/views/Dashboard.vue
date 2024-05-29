<template>
    <div>
        <Tab :tabs="tabs">
            <template v-slot:Identification>
                <IndividualTaxpayerRegistration />
            </template>
        </Tab>
    </div>
</template>

<script>
import IndividualTaxpayerRegistration from '@/admin/components/IndividualTaxpayerRegistration.vue';
import { useGlobalsStore } from '@/stores/globals';
import { storeToRefs } from 'pinia';
import Tab from '../components/tab.vue';
export default {
   
    data(){
        return {    
            tabs:[
                { name: 'Identification Details', key:'Identification'},
                { name: 'Personal Details', key:'Personal'},
                { name: 'Contact Information', key:'Contact'},
                { name: 'Business / Employer Details', key:'Business'},
            ],
            globals: useGlobalsStore()
        }
    },
    created(){
        useGlobalsStore().updateSubPageName("ADD INDIVIDUAL TAXPAYER")
    },
    components: {
        Tab,
        IndividualTaxpayerRegistration,
    },
}
</script>