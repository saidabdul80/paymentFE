<template>
  <div class="tw-h-full tw-w-full">
    <Tab :tabs="tabs" v-model="tabIndex" bg-color="LIGHT" :withBorder="true" :config="tabConfig" refresh>
      <template v-slot:Fee>
        <FeeConfiguration update="admin/fees" fetch="admin/fees" reset="admin/clients/reset-fees" :clientId="clientId" />
    
      </template>
    </Tab>
  </div>
</template>

<script>
import Tab from "@/components/tab.vue";
import NumberField from "@/components/NumberField.vue";
import TextField from "@/components/TextField.vue";
import { useClient } from "@/stores/client";
import { useGlobalsStore } from "@/stores/globals";
import Divider from "primevue/divider";
import SelectField from "@/components/SelectField.vue";
import { useNotificationStore } from "@/stores/notification";
import FeeConfiguration from "@/components/FeeConfiguration.vue";


export default {
  components: {
    Tab,
    NumberField,
    TextField,
    Divider,
    SelectField,
    FeeConfiguration
  },
  data() {
    return {
      tabIndex: 0,
      fees: [],
      newFee: { name: "", value: 0 },
      isLoadingOpen: false,
      global: useGlobalsStore(),
      tabs: [{ name: "Fee Configuration", key: "Fee" }],
      loading2:false
    };
  },
  methods: {
    async fetchDetails() {
      const res = await useClient().http({
        method: "get",
        path: "admin/fees"
      });

      if (res) {
        this.fees = res.fees.map(fee => ({
          id: fee.id,
          name: fee.name,
          type: fee.type,
          value: parseFloat(fee.value),
          is_active: fee.is_active
        }));
      }
    },
    async resetFee(){
      this.loading2 = true
      const res = await useClient().http({
        method: "GET",
        path: `admin/clients/reset-fees`,
      })
      this.loading2 = false
      if(res){
              const notificationStore = useNotificationStore();
              notificationStore.showNotification({
                  type: 'success',
                  message: 'Fees reset successfully!',
              });
      }
    },
    async saveFees(fee) {
      fee.loading = true
     const res = await useClient().http({
        method: "put",
        path: `admin/fees/${fee.id}`,
        data:fee 
      })
      fee.loading = false
      if(res){
              const notificationStore = useNotificationStore();
              notificationStore.showNotification({
                  type: 'success',
                  message: 'Fees updated successfully!',
              });
      }
   
    },



    formatLabel(name) {
      return name.replace(/_/g, " ").toUpperCase();
    }
  },
  created() {
    this.fetchDetails();
  }
};
</script>

<style lang="scss" scoped>
/* Add any additional styles if necessary */
</style>
