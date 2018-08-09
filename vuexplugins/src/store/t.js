const myPlugin = (store) => {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    let key = mutation.type
    let value = mutation.payload
    if (typeof value === 'object') {
      console.log('obj')
      sessionStorage.setItem(key, JSON.stringify(value))
    } else {
      sessionStorage.setItem(key, value)
    }
  })
}
export default myPlugin
