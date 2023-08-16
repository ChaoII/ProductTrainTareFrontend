import {createApp} from 'vue'
import App from '@/App.vue'
import router from './router'
import {createPinia} from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'dayjs/locale/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import vue3videoPlay from "vue3-video-play"; // 引入组件
import "vue3-video-play/dist/style.css"; // 引入css


const app = createApp(App)
const pina = createPinia()
pina.use(piniaPluginPersistedstate)
// element icon 注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(vue3videoPlay)
app.use(ElementPlus, {locale: zhCn})
app.use(router)
app.use(pina)
app.mount('#app')


