interface Shape {
  id: number
  quantity: number
}

export interface State {
  added: Shape[]
  checkoutStatus: 'successful' | 'failed' | null
}

// initial state
// shape: [{ id, quantity }]
const state: State = {
  added: [],
  checkoutStatus: null
}

// 需引用state的地方举例：

const getters = {
  checkoutStatus: (state: State) => state.checkoutStatus
}