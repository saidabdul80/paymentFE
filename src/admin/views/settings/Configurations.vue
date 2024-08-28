<template>
    <div>
        <div class="tw-relative  tw-overflow-y-auto">
        <div v-for="config in configurations" :key="config.id" class="tw-my-6 tw-hover:bg-sky-100">
            <p class="tw-m-0 tw-w-full tw-grid tw-grid-cols-4">
                <h2 class="tw-font-semibold tw-mb-2 tw-text-lg" style="text-transform: capitalize;">Set {{ config.key.replaceAll('_',' ') }}:</h2>            
                <input v-if="config.field_type=='text'" v-model="config.value" 
                    class="gTextField tw-border tw-h-[56px] tw-border-gray-400 tw-border-r-0 tw-rounded-r-none tw-rounded tw-h-[40px] tw-px-3 tw-w-full"
                    type="text" placeholder="Remark" style="border-style:solid" 
                    :class="`tw-bg-[${$constants.input_background}]`" 
                />                
                <div v-if="config.field_type=='select'" class="tw-w-full">                                                         
                    <SelectFilter :options="config.data" v-model="config.value"  optionValue="id" optionLabel="name" class="w-full" />
                </div>
                
                <div v-if="config.field_type=='checkbox'">  
                    <div v-if="config.model.includes('Session') || config.model.includes('AdmissionBatch') || config.model.includes('State') || config.model.includes('Semester') || config.model.includes('ProgrammeType')">                        
                        <MultiSelect  
                        optionValue="id" optionLabel="name" 
                        :options="updateConfigData(config)"  v-model="config.value" display="chip" />
                    </div>
                    <MultiSelect v-else-if="config.model.includes('Level') || config.model.includes('Course')" 
                        :options="updateIdToString(config.data)" optionValue="id" optionLabel="title" v-model="config.value" 
                        display="chip"
                        />
                    <MultiSelect v-else :options="config.data" v-model="config.value"
                        display="chip"
                     />
                </div>
                
                <div v-if="config.field_type == 'textarea'" class="flex flex-wrap gap-3" >
                    <Inplace :active="config.closeInline" :closable="true">
                        <template #display>
                            <span v-tooltip.top="'Click to Edit'" > 
                                <span v-if="config.value == ''">Click here to edit</span>
                                <span v-else> {{ stripAndTruncateHtml(config.value) }} ...</span>
                            </span>
                        </template>
                        <template #content>                            
                              <Editor  v-model="config.value"  editorStyle="height: 320px" />
                        </template>
                    </Inplace>
                </div>
                <div v-if="config.field_type == 'radio'" class="flex flex-wrap gap-3">                    
                    <div class="flex items-center" v-for="radio in config.data" :key="radio.name">  
                        <input type="radio" v-model="config.value" :name="config.name" :value="radio.name" />                        
                        <label :for="`${config.name}`" class="ml-2 capitalize">{{ radio.name }}</label>
                    </div>
                </div>
                <div v-if="config.field_type == 'arrange'" class="flex flex-wrap gap-3" >
                    <Inplace  :active="config.closeInline" :closable="true">
                        <template #display>
                            <span v-tooltip.top="'Click to Edit'">{{config.value}} </span></template>
                        <template #content>
                            <SelectFilter  v-model="config.value"  SelectFilter :suggestions="config.data"  optionLabel="name2"  optionValue="name"  @complete="searchComplete($event, config)"  />
                        </template>
                    </Inplace>
                </div>
                
                <v-btn 
                    class="tw-rounded tw-h-[56px] tw-max-w-[65px]  -tw-ml-[1px]"
                     variant="outlined"
                      :class="` tw-border-l-0 tw-rounded-l-none tw-text-[${$constants.primary}] tw-bg-[${$constants.primary}]/${$constants.transparent_level}`"
                    flat
                    :prepend-icon="config?.saving ? 'tw-animate-spin tw-spin ph-spinner' : ''" 
                    @click="updateConfiguration(config)"
                >Save</v-btn>
            </p>            
        </div>
        <div v-if="configurations.length == 0" class=" tw-justify-center tw-items-center tw-flex-col tw-flex">
            <CustomSkeletonLoader :height="'100px'" :width="'90%'" />
            <hr class=" tw-my-6">
            <CustomSkeletonLoader :height="'100px'" :width="'90%'" />
        </div>
        </div>
    </div>
</template>
  
<script>
//import MultiSelect from 'primevue/multiselect';
import { useSettingsStore } from '@/admin/stores/settings';
import CustomSkeletonLoader from '@/components/CustomSkeletonLoader.vue';
import SelectFilter from '@/components/SelectFilter.vue';
import TextField from '@/components/TextField.vue';
import Dialog from '@/components/dialog/Dialog.vue';
//import Editor from 'primevue/editor';

//import Inplace from 'primevue/inplace';


export default {
    data() {
        return {
            configurations: [],
            configuration: {},
            newConfigurationDialog: false,
            editConfigurationDialog: false,
            tableloading: true,
            validation: {},
            dataTableloading: false,
            editingRows:null,
            settingStore:useSettingsStore()
        }
    },
    components: {         
        TextField,    
        SelectFilter,
        CustomSkeletonLoader            
        //Inplace,
        ///Editor
        
    },
    methods: {
        stripAndTruncateHtml(html, maxLength = 100) {
            // Remove HTML tags
            const strippedString = html.replace(/<[^>]+>/g, '');
            // Truncate the stripped string
            if (strippedString.length > maxLength) {
                return strippedString.substring(0, maxLength) + '...';
            }
            return strippedString;
        },
        updateConfigData(config) {
            try{

                const updatedData = config.data.map(item => ({
                    ...item,
                    id: item.id.toString(),
                }));           
                if(!Array.isArray(config.value)){
                    config.value = config.value.split(',')
                }         
                return updatedData;            
            }catch(e){
                console.log(e, config.value)
            }
        },
        searchComplete(event,config){
            config.data = config.data.map((item) =>{
                item.name2 = event.query + item.name
                return item;
                });
        },
        updateIdToString(data){
            return data.map(item=> {
               item.id = item.id.toString()
               return item;
            })
        },
        async fetchRecords() {
            this.tableloading = true;
            const res = await this.settingStore.fetchConfigurations();
            this.configurations = res;
            this.tableloading = false;
        },
        async updateConfiguration(config) {            
            config.saving = true;            
            const res =  await this.settingStore.saveConfiguration({
                id:config.id,
                key: config.key,
                value: config.value
            }, config.id);
            config.saving = false;    
            config.closeInline = false                       
        },

        async deactivateConfiguration(configuration) {
           /*  const confirm = await showModal({ title: 'Confirm Deactivation', text: 'Are you sure you want to deactivate this configuration?', confirmText: 'Yes', cancelText: 'No' });
            if (!confirm) return;
            const res = await post(this.$endpoints.staff.deactivateConfiguration.url, { id: configuration.id });
            if (res) {
                this.fetchRecords();
                this.$globals.showMessage('configuration deactivated successfully', 'success');
            } else {
                const err = localStorage.getItem('error');
                this.$globals.showMessage(err, 'error');
            } */
        },
        async activateConfiguration(configuration) {
           /*  const confirm = await showModal({ title: 'Confirm Activation', text: 'Are you sure you want to activate this configuration?', confirmText: 'Yes', cancelText: 'No' });
            if (!confirm) return;
            const res = await post(this.$endpoints.staff.activateConfiguration.url, { id: configuration.id });
            if (res) {
                this.fetchRecords();
                this.$globals.showMessage('configuration activated successfully', 'success');
            } else {
                const err = localStorage.getItem('error');
                this.$globals.showMessage(err, 'error');
            } */
        },
        openNewConfigurationDialog() {
            this.configuration = {}; // Reset configuration object
            this.newConfigurationDialog = true;
        },
        duplicateRecord(configuration) {
            this.configuration = Object.assign({}, configuration); // Clone configuration object
            this.newConfigurationDialog = true;
        },
        exportCSV() {
            this.$refs.dtable.exportCSV();
        },        
        refresh(){            
            this.fetchRecords()
        },
    },
    created() {
        this.fetchRecords();
    }
}
</script>
  
<style scoped>
/* Add your styles here */
</style>