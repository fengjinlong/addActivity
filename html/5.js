function once (fn) {
  let a = false
  return function () {
    if (!a) {
      a = true
      console.log(this)
      fn.apply(this, arguments)
      // fn.apply(null,arguments)  均可 
    }
  }
}

function a () {
  console.log(1)
}

let fun = once(a)
fun()
fun()
fun()

