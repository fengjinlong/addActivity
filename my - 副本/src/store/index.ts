import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
const debug = process.env.NODE_ENV !== 'production'

import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user
  },
  plugins: debug ? [createLogger({})] : []
})

export default store