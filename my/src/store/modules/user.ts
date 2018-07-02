
// export default {
//   state: {
//     idd : 12
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   getters: {
//   }
// }

let state = {
  info: {
    data: 'store data from user'
  },
  auth: '88888888888'
}

const mutations = {}
const actions = {}

const getters = {
  // info: state => state.info
  info: (state: any) => state.info
}

export default {
  state,
  mutations,
  actions,
  getters
}