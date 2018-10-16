<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div ref="div">
      <ul v-if="aa">
        <li>123123</li>
        <li>123123</li>
        <li>123123</li>
        <li>123123</li>
        <li>123123</li>
      </ul>
    </div>
    <button @click="back">back</button>
    <button @click="del">del</button>
  </div>
</template>

<script>
export default {
  name: 'H',
  data () {
    return {
      aa:1,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    del () {
      this.aa = 0
    },
    back () {
      this.$refs.div.innerHTML = ""
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
