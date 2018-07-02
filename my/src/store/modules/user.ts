import { ActionTree } from 'vuex'
const state = {
  auth: '88888888888',
  auth2: '66666662'
}
const actions: ActionTree<any, any> = {
  aa({ commit }, val: any) {
    commit('ch', val)
  }
}
const mutations = {
  ch: (state: any, n:any) => {
    state.auth2 = n
  }
}
const getters = {
  info: (state: any) => state.auth2
}
export default {
  state,
  mutations,
  actions,
  getters
}
