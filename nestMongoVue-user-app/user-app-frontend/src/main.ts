import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App).use(store).use(router)

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// app.config.errorHandler = function (err: any, vm: any, info: any) {
//   console.log(`Error: ${err.toString()}\nInfo: ${info}`)
// }

// app.config.warnHandler = function (msg, vm, trace) {
//   console.log(`Warn: ${msg}\nTrace: ${trace}`)
// }

// roles
// testavimas: unit, e2e, automated
// fileupload: gallery(foto uploads <-- on user update)

app.mount('#app')
