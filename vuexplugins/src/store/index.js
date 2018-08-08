import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import user from './modules/pl.js'

import vsesfj from 'vsesfj'
const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user
  },
  plugins: debug ? [createLogger({}), vsesfj] : [vsesfj]
})

export default store
