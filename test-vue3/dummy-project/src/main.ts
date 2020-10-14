import { createApp, DirectiveBinding } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// https://logaretm.com/blog/2019-05-03-html-aided-vuejs-form-validation/
// https://v3.vuejs.org/guide/migration/custom-directives.html#edge-case-accessing-the-component-instance
createApp(App).use(store).use(router).mount('#app')
// .directive('validate', {
//   // directive definition
//   mounted (el: any, binding: any, vnode: any) {
//     // We don't care about binding here.
//     el.addEventListener('input', (e: any) => {
//       const vm = binding.instance// this is the Vue instance.
//       // We use Object.assign to make sure everything is reactive.
//       // And because we used an object for our error storage, since a key-value data structure
//       // is better than a lookup array in our case.
//       //   console.log(e.target.validationMessage)
//       console.log(JSON.stringify(vm.errors))
//       vm.errors = Object.assign({}, vm.errors, {
//         [el.name]: e.target.validationMessage
//       })
//     })
//   }
// }).mount('#app')
