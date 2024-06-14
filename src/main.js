import "./assets/main.css";

import { createApp, reactive } from "vue";
//import { createPinia } from "pinia";
import * as pinia from 'pinia'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { useConstantsStore } from './stores/constants';
import './assets/tailwind.css';

import App from "./App.vue";
import router from "./router";
import ls from "./services/ls";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import DataTable from '@/components/Table.vue';
window.pinia = pinia
const app = createApp(App);

const { createPinia } = window.pinia

app.component('VueDatePicker', VueDatePicker);
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
window.baseUrl = 'https://pay.kudeeexpress.com/api'

