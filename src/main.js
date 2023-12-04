import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import VueCookies from 'vue-cookies'


const miapp=createApp(App);

miapp.use(VueCookies, { expires: '1d'})
miapp.use(router)


miapp.mount('#app')
