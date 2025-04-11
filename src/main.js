import "./assets/main.css";

import { createApp } from "vue";
//import { createPinia } from "pinia";
import * as pinia from 'pinia'
import '@mdi/font/css/materialdesignicons.css'

import "driver.js/dist/driver.css";

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { useConstantsStore } from './stores/constants';
import './assets/tailwind.css';

import App from "./App.vue";
import router from "./router";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";
import ExportData from "highcharts/modules/export-data";

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { driver } from "driver.js";
import DataTable from "@/components/Table/Table.vue";
import { definePreset } from "@primevue/themes";
import 'primeicons/primeicons.css'
window.pinia = pinia
const app = createApp(App);
ExportData(Highcharts);

app.use(HighchartsVue);

const { createPinia } = window.pinia
app.use(PrimeVue, { 
  theme: {
    preset: definePreset(Aura, {
      semantic: {
        primary: {
            50: "#f5f5f5",
            100: "#e0e0e0",
            200: "#c2c2c2",
            300: "#a3a3a3",
            400: "#858585",
            500: "#1a1a1a", // Main color
            600: "#4d4d4d",
            700: "#333333",
            800: "#1a1a1a",
            900: "#0a0a0a",
            950: "#000000",

        }
      },
    }),
    options: {
        prefix: 'prime',
        darkModeSelector: 'none',
        cssLayer: false
    }
}
});
app.component('VueDatePicker', VueDatePicker);
app.component('DataTable', DataTable);
app.use(createPinia());
app.use(router);
const vuetify = createVuetify({
  components,
  directives
})

app.use(vuetify)
app.mount("#main");
const constantsStore = useConstantsStore();
app.config.globalProperties.$constants = constantsStore.values;
window.baseUrl = import.meta.env.VITE_API_URL
window.driver = driver
//window.baseUrl = 'https://optimum-fun-bobcat.ngrok-free.app/api'
