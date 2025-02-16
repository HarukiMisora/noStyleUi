import { createApp } from 'vue'
import './style.css'
import App from './App.vue'



import noStyleUi from '../index'
console.log(noStyleUi);

createApp(App).use(noStyleUi).mount('#app')

