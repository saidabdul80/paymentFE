<template>
        
        <v-col cols="12" :lg="lg" :md="md" :sm="sm" v-if="nationality_id == null">            
            <SelectFilter
                label="Nationality"
                v-model="internalModel.nationality_id"
                :key="selectKey + '_nationality'"
                :error-messages="globalStore.nameRules?.nationality_id"
                :options="nationality"
                option-label="name"
                option-value="id"
                :loading="nationalityLoading"
                :required="true"
                clearable
                hide-details="auto"
                :bg-color="$constants.input_background"            
                :fixed="fixed"
                :width="width"

            />
        </v-col>

        <v-col cols="12" :lg="lg" :md="md" :sm="sm" v-if="state_id == null">            
            <SelectFilter
                label="State of Origin"
                v-model="internalModel.state_id"
                :key="selectKey + '_state'"
                :error-messages="globalStore.nameRules?.state_id"
                :options="states"
                option-label="name"
                option-value="id"
                :loading="statesLoading"
                :required="true"
                clearable
                hide-details="auto"
                :bg-color="$constants.input_background"
                :fixed="fixed"
                :width="width"
            />
        </v-col>

        <v-col cols="12" :lg="lg" :md="md" :sm="sm">            
            <SelectFilter
                label="L.G.A"
                v-model="internalModel.lga_id"
                :key="selectKey + '_lga'"
                :error-messages="globalStore.nameRules?.lga_id"
                :options="lgas"
                option-label="name"
                option-value="id"
                :loading="lgasLoading"
                :required="true"
                clearable
                hide-details="auto"
                :bg-color="$constants.input_background"
                :fixed="fixed"
                :width="width"
            />
        </v-col>

        <v-col cols="12" :lg="lg" :md="md" :sm="sm">            
            <SelectFilter
                label="Ward"
                v-model="internalModel.ward_id"
                :key="selectKey + '_ward'"
                :error-messages="globalStore.nameRules?.ward_id"
                :options="wards"
                option-label="name"
                option-value="id"
                :loading="wardsLoading"
                :required="true"
                clearable
                hide-details="auto"
                :bg-color="$constants.input_background"                
                :fixed="fixed"
                :width="width"
            />
        </v-col>
  
</template>

<script>
import { useGlobalsStore } from '@/stores/globals';
import SelectFilter from '@/components/SelectFilter.vue';

export default {
    props: {
        modelValue: {
            type: Object,
            default: () => ({
                nationality_id: null,
                state_id: null,
                lga_id: null,
                ward_id: null,
            })
        },
        nationality: {
            type: Array,
            default: () => []
        },
        nationalityLoading: {
            type: Boolean,
            default: false
        },
        md:{
            type:String,
            default:"4"
        },
        lg:{
            type:String,
            default:"4"
        },
        sm:{
            type:String,
            default:"12"
        },
        nationality_id:{
            type:Number,
            default:null
        },
        state_id:{
            type:Number,
            default:null
        },
        fixed:{
            type:String,
            default:false
        },
        width:{
            type:String,
            default:false
        }
    },
    components: {
        SelectFilter
    },
    data() {
        return {
            internalModel: { ...this.modelValue },
            states: [],
            lgas: [],
            wards: [],
            selectKey: 0,
            statesLoading: false,
            lgasLoading: false,
            wardsLoading: false,
            globalStore: useGlobalsStore()
        };
    },
    watch: {
        modelValue: {
            deep: true,
            handler(newVal) {
                this.internalModel = { ...newVal };
            }
        },
        'internalModel.nationality_id': {
           
            handler(newVal) {
                if (newVal) {
                    this.resetStateLgaWard();
                    this.fetchStates(newVal);
                }
            }
        },
        'internalModel.state_id': {
           
            handler(newVal) {
                if (newVal) {
                    this.resetLgaWard();
                    this.fetchLgas(newVal);
                }
            }
        },
        'internalModel.lga_id': {
           
            handler(newVal) {
                if (newVal) {
                    this.resetWard();
                    this.fetchWards(newVal);
                }
            }
        },
        'internalModel.ward_id': {
            handler(newVal) {
                if (newVal) {
                    this.updateModelValue(); 
                }
            }
        }
    },
    methods: {
        resetStateLgaWard() {
            this.internalModel.state_id = null;
            this.internalModel.lga_id = null;
            this.internalModel.ward_id = null;
            this.selectKey++;
            this.updateModelValue();
        },
        resetLgaWard() {
            this.internalModel.lga_id = null;
            this.internalModel.ward_id = null;
            this.selectKey++;
            this.updateModelValue();
        },
        resetWard() {
            this.internalModel.ward_id = null;
            this.selectKey++;
            this.updateModelValue();
        },
        updateModelValue() {
            this.$emit('update:modelValue', this.internalModel);
        },
        async fetchStates(nationalityId) {
            this.statesLoading = true;
            this.states = await this.globalStore.fetchStates(nationalityId);
            this.statesLoading = false;
        },
        async fetchLgas(stateId) {
            this.lgasLoading = true;
            this.lgas = await this.globalStore.fetchLgas(stateId);
            this.lgasLoading = false;
        },
        async fetchWards(lgaId) {
            this.wardsLoading = true;
            this.wards = await this.globalStore.fetchWards(lgaId);
            this.wardsLoading = false;
        }
    },
    async created() {
        if(this.nationality_id){
            await this.fetchStates(this.nationality_id);
        }else{
            if (this.modelValue.nationality_id) {
                await this.fetchStates(this.modelValue.nationality_id);
            }
        }
        
        if(this.state_id){
            await this.fetchLgas(this.state_id);
        }else{
            if (this.modelValue.state_id) {
                await this.fetchLgas(this.modelValue.state_id);
            }
        }
        if (this.modelValue.lga_id) {
            await this.fetchWards(this.modelValue.lga_id);
        }

        this.selectKey++;
    }
};
</script>

<style scoped>

</style>
