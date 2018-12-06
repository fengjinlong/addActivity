let fun = function () {
  debugger
  let args = Array.from(arguments)
  let aa = function () {
    let a = Array.from(arguments)
    console.log(a)
    if (a.length === 0) {
      debugger
      console.log(args)
    } else {
      debugger
      args = args.concat(a)
      return aa
    }
  }
  return aa
}
fun(1)(2,5)(4,6)(8)()



// add 函数柯里化
function add(){
  //建立args,利用闭包特性，不断保存arguments
  var args = [].slice.call(arguments);
     //方法一，新建_add函数实现柯里化
  var _add = function(){
      if(arguments.length === 0){
          //参数为空，对args执行加法
          return args.reduce(function(a,b){return a+b});
      }else {
          //否则，保存参数到args，返回一个函数
          [].push.apply(args,arguments);
          return _add;
      }
  }
  //返回_add函数
  return _add;
  
  // //方法二，使用arguments.callee实现柯里化
  // return function () {
//       if (arguments.length === 0) {
//           return args.reduce(function(a,b){return a+b});
//       }
//       Array.prototype.push.apply(args, arguments);
//       return arguments.callee;
//   }
}
console.log(add(1,2,3)(1)(2)(3)(4,5,6)(7,8)());//42

//  通用的函数柯里化构造方法
function curry(func){
  //新建args保存参数，注意，第一个参数应该是要柯里化的函数，所以args里面去掉第一个
  var args = [].slice.call(arguments,1);
  //新建_func函数作为返回值
  var _func =  function(){
      //参数长度为0，执行func函数，完成该函数的功能
      if(arguments.length === 0){
          return func.apply(this,args);
      }else {
          //否则，存储参数到闭包中，返回本函数
          [].push.apply(args,arguments);
          return _func;
      }
  }
  return _func;
}

function add(){
  return [].reduce.call(arguments,function(a,b){return a+b});
}
console.log(curry(add,1,2,3)(1)(2)(3,4,5,5)(5,6,6,7,8,8)(1)(1)(1)());//69
