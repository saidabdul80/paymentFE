<template>
  <div class="tw-h-full tw-w-full" color="light">
    <Tab :tabs="tabs" v-model="tabIndex" :withBorder="true" :config="tabConfig" refresh @change="handleTabDropdownButton">
      <template v-slot:Bussiness>
        <div class="tw-p-3">
          <Information v-model="info" />
        </div>
      </template>
      <template v-slot:Payment>
        <div class="tw-p-3">
          <PaymentInfo />
        </div>
      </template>
      <template v-slot:API>
        <div class="tw-p-3">
          <h2 class="tw-text-2xl tw-font-bold tw-mb-2">API Key Management</h2>
          <p class="tw-mb-6">Manage your API keys below:</p>
          <div class="tw-mb-4">
            <v-btn @click="generateApiKey" :loading="isGenerating" class="tw-max-w-md tw-bg-black tw-text-white tw-py-2 tw-rounded">
              Generate New API Key
            </v-btn>
          </div>
          <div v-if="apiKeys" class="tw-mt-4">
            <h3 class="tw-text-xl tw-font-semibold tw-mb-2">Your API Keys</h3>
            <p></p>
            <ul class="tw-list-disc tw-ml-6 tw-flex tw-items-center">
              {{ apiKeys}}
              <CopyButton :text="apiKeys" />
            </ul>
          </div>
          <div v-else class="tw-mt-4">
            <p>No API keys available. Click the button above to generate a new API key.</p>
          </div>
        </div>
      </template>
    </Tab>
  </div>
</template>

<script>
import Tab from "@/components/tab.vue";
import TextField from "@/components/TextField.vue";
import { useClient } from "@/stores/client";
import { useGlobalsStore } from "@/stores/globals";
import { PhCaretLeft } from "@phosphor-icons/vue";
import Dialog from "primevue/dialog";
import Drawer from "primevue/drawer";
import Bussiness from "./foms/Bussiness.vue";
import Information from "./foms/Information.vue";
import PaymentInfo from "./foms/PaymentInfo.vue";
import { useNotificationStore } from "@/stores/notification";
import CopyButton from "@/components/CopyButton.vue";

export default {
  components: {
    Bussiness,
    Information,
    Drawer,
    Tab,
    PhCaretLeft,
    Dialog,
    TextField,
    PaymentInfo,
    CopyButton
  },
  data() {
    return {
      tabIndex: 0,
      info:{},
      tabs: [
        { name: "Bussiness Information", key: "Bussiness" },
        { name: "Payment Information", key: "Payment" },
        { name: "API Key", key: "API" },
      ],
      global: useGlobalsStore(),
      isGenerating: false,
      apiKeys: null,
    };
  },
  watch: {
    tabIndex: function (newV) {
      if (newV === 2) {
        this.fetchApiKeys();
      }
    },
  },
  methods: {
    async generateApiKey() {
      this.isGenerating = true;
        const res = await useClient().http({
          method: 'get',
          path: 'clients/generate-key',
        });
        if (res) {
          const notificationStore = useNotificationStore();
          notificationStore.showNotification({
            type: 'success',
            message: 'API Key generated successfully',
          });
          this.fetchApiKeys(); // Refresh the API keys list
        }
        this.isGenerating = false
    },
    async fetchApiKeys() {
        const res = await useClient().http({
          method: 'get',
          path: 'clients/keys',
        });
        if (res) {
          this.apiKeys = res.keys?.key; // Assuming the API returns a list of keys in `data`
        }
    },
    async fetchDetails() {
        const res = await useClient().http({
          method: 'get',
          path: 'clients/details',
        });
        if (res) {
          console.log(res,3223)
          this.info = res.client; // Assuming the API returns a list of keys in `data`
        }
    },
  },
  created() {
    // Fetch API keys when component is created
    if (this.tabIndex === 2) {
      this.fetchApiKeys();
    }
    this.fetchDetails()
  },
};
</script>

<style lang="scss" scoped>
/* Add any additional styles if necessary */
</style>
