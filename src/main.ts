import { createApp } from 'vue'
import './style.css'
import App from './App.vue'



import {propStyle} from './index'
import '/dist/noStyleUi.css'


 
createApp(App).use(propStyle).mount('#app')



