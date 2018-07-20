import Vue from 'vue'
import App from './App'
import router from './router'
import layer from './static/js/layer.js'
// Vue.layer = Vue.prototype.$layer = layer
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
