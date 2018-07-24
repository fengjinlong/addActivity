<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    this.asyncReadFile()
  },
  methods: {
    async asyncReadFile () {
      console.log(f1.toString())
      console.log(f2.toString())
      const f2 = await this.fun2()
      const f1 = await this.fun1()
    },
    fun1 () {
      console.log('fun1+++++')
      return 'fun1'
    },
    fun2 () {
      console.log('fun2+++++')
      return 'fun2'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
