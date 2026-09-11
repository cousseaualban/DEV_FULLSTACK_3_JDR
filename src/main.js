import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import { initialiserDonneesDemo } from './data/initialiserDonneesDemo';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

initialiserDonneesDemo();

app.use(router);
app.mount('#app');
