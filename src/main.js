import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@element-plus/icons-vue'
import axios from 'axios';
import { createI18n } from 'vue-i18n'


import App from './App.vue'
import router from './router'

const app = createApp(App)

const messages = {
  en: {

  },
  vi: {

  }
}

const i18n = createI18n({
  locale: localStorage.getItem('LANG') || 'vi',
  fallbackLocale: 'en',
  messages,
})

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(axios)
app.use(i18n)
app.mount('#app')
