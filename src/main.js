import "./assets/main.css";

import { createApp } from "vue";
//import { createPinia } from "pinia";
import * as pinia from 'pinia'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import './assets/tailwind.css';

import App from "./App.vue";
import router from "./router";
import { constants } from "./helpers/constants";
window.pinia = pinia
const app = createApp(App);

const { createPinia } = window.pinia
app.config.globalProperties.$constants = constants

app.use(createPinia());
app.use(router);
const vuetify = createVuetify({
    components,
    directives
  })

app.use(vuetify)
app.mount("#main");
