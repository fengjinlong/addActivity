  import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

Function.prototype.bind = function(){
  var fn = this;
  var args = Array.prototye.slice.call(arguments);
  var context = args.shift();

  return function(){
      return fn.apply(context,
          args.concat(Array.prototype.slice.call(arguments)));
  };
};

function plus(num) {
  var adder = function () {
      var _args = [];
      var _adder = function _adder() {
          [].push.apply(_args, [].slice.call(arguments));
          return _adder;
      };
      _adder.toString = function () {
          return _args.reduce(function (a, b) {
              return a + b;
          });
      }
      return _adder;
  }
  return adder()(num);
}
module.exports = plus;