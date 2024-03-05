import '@styles/__common.scss';
import '@styles/__variables.scss';
import '@styles/style.scss';

import App from './App.vue';
import { createApp } from 'vue';

import routes from '@routes/index.ts';

/* Vuetify */
import 'vuetify/styles';
import { createVuetify } from "vuetify";
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import stores from "@stores/index.ts";

const vuetify = createVuetify({
    components,
    directives,
});

createApp(App)
    .use(stores)
    .use(routes)
    .use(vuetify)
    .mount('#app');
