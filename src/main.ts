import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import MyTest from './noStyleUi/test/MyTest.vue'

import noStyleUi from './noStyleUi/install.ts'
createApp(App).use(noStyleUi).mount('#app')

