1 mutations的方法名称必须与sessionStorage的key值一致  

2 使用  

npm install vsesfj --save-dev  

const store = new Vuex.Store({  

  modules: {  

    user  

  },  

  plugins: [vsesfj]  

})  

3 默认sessionStorage存储  

