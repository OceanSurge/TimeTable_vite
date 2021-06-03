import {createApp, ref, Ref} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import axios from 'axios'
import store from "./store"
import "./assets/css/global.css"
import {User} from "./datasource";


axios.defaults.baseURL = "http://localhost:8080/"
createApp(App)
    .use(router)
    .use(store)
    .use(ElementPlus)
    .mount('#app')
