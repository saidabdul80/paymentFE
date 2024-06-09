<template>
    
    <div class="tw-px-5">        
        <swiper :slides-per-view="1" :space-between="50" @swiper="onSwiper" @slideChange="onSlideChange">
            <swiper-slide>
                <div class="tw-flex tw-items-center tw-justify-between" title="goto corporate tax payer">
                    <h4 class="tw-text-md tw-font-bold">Individual Tax Payers</h4>
                    <v-btn icon @click="swiper.slideNext()" class="ml-0" size="small" variant="flat">
                            <v-icon class="tw-text-sm">mdi-arrow-right</v-icon>
                    </v-btn>
                </div>
                <DataTable
                    :loading="individualTaxPayerStore.taxpayersLoading"
                    :headers="headers"
                    :paginationData="individualTaxPayerStore.taxpayers"
                    @row-click="handleRowClick"
                    @page-change="handlePageChange">       
                    <template v-slot:td-photo="{ row }">
                        <img :src="row.photo" alt="Image" class="tw-w-10 tw-h-10 tw-rounded-full">
                    </template>
                </DataTable>             
            </swiper-slide>
            <swiper-slide> 
                <div class="tw-flex tw-items-center tw-justify-between" title="goto Individual Tax Payer">
                    <h4 class="tw-text-md tw-font-bold">Corporate Tax Payers</h4>                    
                    <v-btn icon @click="swiper.slidePrev()" class="ml-0" size="small" variant="flat">
                            <v-icon class="tw-text-sm">mdi-arrow-left</v-icon>
                    </v-btn>
                </div>
                <DataTable
                    :loading="corporateTaxPayerStore.taxpayersLoading"
                    :headers="headers"
                    :paginationData="corporateTaxPayerStore.taxpayers"
                    @row-click="handleRowClick"
                    @page-change="handlePageChange">       
                    <template v-slot:td-photo="{ row }">
                        <img :src="row.photo" alt="Image" class="tw-w-10 tw-h-10 tw-rounded-full">
                    </template>
                </DataTable>  
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import { useGlobalsStore } from '@/stores/globals';
import { taxpayers } from '@/services/taxpayers';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

import { useCorporateTaxPayerStore } from '@/admin/stores/corporateTaxPayerStore';
import { useIndividualTaxPayerStore } from '@/admin/stores/individualTaxPayer';

import DataTable from '@/components/Table.vue';
export default {
    data() {
        return {
            name: "TaxPayers",
            globals: useGlobalsStore(),
            individualTaxPayerStore:useIndividualTaxPayerStore(),
            corporateTaxPayerStore :useCorporateTaxPayerStore(),     
            currentSlideKey:0,       
            searchInput: '',
            swiper:null,
            headers: [
                { title: 'S/N', key: 'serialNo' },
                { title: 'Image', key: 'image' },
                { title: 'Full Name', key: 'name' },
                { title: 'G-TIN', key: 'gtin' },
                { title: 'Gender', key: 'gender' },
                { title: 'Taxpayer Type', key: 'taxpayerType' },
                { title: 'Phone Number', key: 'phoneNumber' },
                { title: 'Email', key: 'email' },
            ],
            items: taxpayers,
        }
    },    
    watch:{
        'globals.filters': {
            handler: function(newFilters) {
                if(this.globals.activeTab =="Taxpayers"){
                    if(this.currentSlideKey ===0){
                        this.individualTaxPayerStore.fetchTaxPayers(path);
                    }
                    if(this.currentSlideKey ===1){
                        this.corporateTaxPayerStore.fetchTaxPayers(path);    
                    }
                }
            },
            deep: true
        }
    },
    components: {        
        Swiper,
        SwiperSlide,
        DataTable

    },
    created(){    
        this.individualTaxPayerStore.fetchTaxPayers();
        this.corporateTaxPayerStore.fetchTaxPayers();
    },
    methods: {
        onSlideChange(data) {
            this.currentSlideKey =this.swiper.activeIndex
        },
        onSwiper(swiper) {
            this.swiper = swiper            
        },         
        handleRowClick(row) {
        console.log('Row clicked:', row);
        },
        handlePageChange(path) {               
            if(this.currentSlideKey ===0){
                this.individualTaxPayerStore.fetchTaxPayers(this.globals.filters,path);
            }
            if(this.currentSlideKey ===1){
                this.corporateTaxPayerStore.fetchTaxPayers(this.globals.filters,path);    
            }
        },      
    },
}
</script>

<style>
.my-custom-text-field {
    font-size: 12px;
    /* Adjust the font size */
    padding: -2px 4px;
    /* Adjust the padding */
}

.clickable-rows .v-data-table__row {
    cursor: pointer;
}

.v-data-table__tr--clickable:hover {
    background-color: #f0f0f0;
}
</style>
