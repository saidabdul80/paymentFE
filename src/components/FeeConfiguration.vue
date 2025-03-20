
<template>
  <div class="tw-grid tw-grid-cols-1 tw-gap-4 fee tw-mb-4">
    <template v-for="(fee, index) in fees" :key="fee.id">
      <div class="tw-flex tw-items-end tw-space-x-2 tw-bottom-1">
        <div class="tw-w-[100px]">
          <NumberField 
            v-model="fee.value" 
            :label="formatLabel(fee.name)" 
            :error-messages="errors?.[fee.name]" 
          />
        </div>
        <div class="tw-min-w-[100px] tw-max-w-[130px]">
          <SelectField v-model="fee.type" :options="['fixed','percentage']" :label="'Type'" />
        </div>
        <div class="tw-flex tw-items-center tw-gap-4 tw-space-x-2">
          <v-btn :loading="fee?.loading" class="tw-w-[70px] tw-bg-black" outlined color="red" @click="saveFees(fee)" small>
            Save
          </v-btn>
        </div>
      </div>
    </template>
    <Divider />
    <div class="tw-flex tw-items-center tw-gap-4 tw-space-x-2">
      <h2 class="tw-text-2xl tw-font-semibold">Reset Fees to Default</h2>
      <v-btn :loading="loading2" class="tw-w-[70px] tw-bg-black" color="red" @click="resetFee" small>
        Reset
      </v-btn>
    </div>
  </div>
</template>

<script>
import NumberField from "@/components/NumberField.vue";
import SelectField from "@/components/SelectField.vue";
import Divider from "primevue/divider";
import { useClient } from "@/stores/client";
import { useNotificationStore } from "@/stores/notification";

export default {
  props: {
    update: {
      type: String,
      required: true
    },
    clientId: {
        type: String,
        default: null
    },
    fetch: {
      type: String,
      required: true
    },
    reset: {
      type: String,
      required: true
    }
  },
  components: {
    NumberField,
    SelectField,
    Divider
  },
  data() {
    return {
      fees: [],
      loading2: false
    };
  },
  methods: {
    // async fetchFees() {
    //   const res = await useClient().http({ method: "get", path: this.fetch });
    //   if (res) {
    //     this.fees = res.fees.map(fee => ({
    //       id: fee.id,
    //       name: fee.name,
    //       type: fee.type,
    //       value: parseFloat(fee.value),
    //       is_active: fee.is_active
    //     }));
    //   }
    // },
    async fetchFees() {
      const res = await useClient().http({
        method: "get",
        path: this.fetch,
      });

      if (res) {
        if(this.clientId){
            this.fees = Object.keys(res.fees.fees).map(key=>{
              return  {
               id: null,
               name:key,
               type: res.fees.fees[key].type,
               value: res.fees.fees[key].value,
             }
            })
        }else{
            this.fees = res.fees
        }
      }
    },
    async saveFees(fee) {
      fee.loading = true;
      let payload = fee;
      let path =`${this.update}/${fee.id}`;
      if(this.clientId){
        path = this.update
        payload = {
            [fee.name]:{
                value:fee.value,
                type:fee.type,
            }
        }
      }
      const res = await useClient().http({ method: "put", path:path , data:payload });
      fee.loading = false;
      if (res) {
        useNotificationStore().showNotification({ type: 'success', message: 'Fees updated successfully!' });
      }
    },
    async resetFee() {
      this.loading2 = true;
      const res = await useClient().http({ method: "GET", path: this.reset });
      this.loading2 = false;
      if (res) {
        useNotificationStore().showNotification({ type: 'success', message: 'Fees reset successfully!' });
      }
    },
    formatLabel(name) {
      return name.replace(/_/g, " ").toUpperCase();
    }
  },
  created() {
    this.fetchFees();
  }
};
</script>
