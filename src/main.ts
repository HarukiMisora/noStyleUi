import { createApp } from 'vue'
import './style.css'
import App from './App.vue'



import noStyleUi from './index'
import './noStyleUi/div/style/css.scss'



createApp(App).use(noStyleUi).mount('#app')

