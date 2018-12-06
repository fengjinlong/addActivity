let fun = function () {
  debugger
  let args = Array.from(arguments)
  return  function () {
    let a = Array.from(arguments)
    console.log(a)
    if (a.length === 0) {
      console.log(1)
      console.log(args)
    } else {
      console.log(2)
      debugger
      args = args.concat(a)
      console.log(args)
    }
  }
}
fun(1)(2)(3)(4)