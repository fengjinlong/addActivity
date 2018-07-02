// import Vue from 'vue';
// import Vuex from 'vuex';
// import createsteps from './modules/createsteps.ts';
// import createLogger from 'vuex/dist/logger'
// const debug = process.env.NODE_ENV !== 'production'

// Vue.use(Vuex);

// const store = new Vuex.Store({
//     modules: {
//         createsteps
//     }
//     // plugins: debug ? [createLogger()] : []
// });

// export default store;

import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user
  }
})

export default store