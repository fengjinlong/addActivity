// // 节流函数
// export function debounce (func:any, delay:number) {
//   let timer:number
//   return function (args:any) {
//     if (timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(() => {
//       func.apply(this, args)
//     }, delay)
//   }
// }
