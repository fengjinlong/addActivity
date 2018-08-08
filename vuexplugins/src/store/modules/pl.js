export default {
  state: {
    // nav是否显示
    nav: sessionStorage.getItem('saveNav') || true,
    navActiveIndex: sessionStorage.getItem('navActiveIndex') || '0',
    // message: sessionStorage.getItem('saveMessage')
    // 名字项目级别
    message: JSON.parse(sessionStorage.getItem('saveMessage')) || {}
  },
  mutations: {
    navActiveIndex (state, str) {
      state.navActiveIndex = str
    },
    saveNav (state, bool) {
      state.nav = bool
    },
    saveMessage (state, obj) {
      state.message = obj
    }
  },
  getters: {
    getNavActiveIndex (state) {
      return state.navActiveIndex
    },
    getNav (state) {
      return state.nav
    },
    getMessgage (state) {
      return state.message
    }
  }
}
