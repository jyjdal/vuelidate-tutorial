import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.min.css";
import { createVuetify } from "vuetify";
// Vuetify Components
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
const vuetify = createVuetify({ components, directives });

createApp(App)
  .use(vuetify)
  .mount('#app')
