import { createApp } from 'vue'
import './style.css'
import App from './App.vue'



import {propStyle} from './index'
import './noStyleUi/div/style/css.scss'



createApp(App).use(propStyle).mount('#app')

