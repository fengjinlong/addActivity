<<<<<<< HEAD
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

=======
// 单例模式
// let Ob = function () {
//   console.log(1)
// }
// Ob.getfun = (function () {
//   let a = null

//   return function () {
//     if (!a) {
//       a = new Ob()
//     }
//     return a
//   }
  
// })()
// let a = Ob.getfun()
// let b = Ob.getfun()
// console.log(a === b)
// Ob.getfun = function () {
//   let a = null

//   return function () {
//     if (!a) {
//       a = new Ob()
//     }
//     return a
//   }
  
// }
// let t = Ob.getfun()
// let a = t()
// let b = t()
// console.log(a === b)


// 例子
function ifn () {
  return 111
}
let FUN = function () {
  let a = ifn()
  var div = document.createElement('div');
  div.innerHTML = a;
  document.body.appendChild(div);
}

// FUN.div = function () {
//   let h = null
//   return function () {
//     if (!h) {
//       h = new FUN()
//     }
//     console.log(h)
//     return h
//   }
// }
// let m = FUN.div()
// m()
// m()
// m()



let f = function () {
  console.log(Array.prototype.shift.apply(arguments))
}
f(1,2,3,4,5)
>>>>>>> 03a3c5b15f511d280c04a7de9612877b97bc465a
