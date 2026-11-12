import { createApp } from 'vue'
import { createPinia } from 'pinia'
import AdminApp from './AdminApp.vue'
import './admin.css'

createApp(AdminApp).use(createPinia()).mount('#app')
