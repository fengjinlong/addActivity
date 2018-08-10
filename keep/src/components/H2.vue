<template>
  <div class="hello2">
    <input type="text" v-model="msg1">
    <input type="text"  v-model="msg2">
    <button @click="save1">保存内容1</button>
    <button @click="save2">保存内容2</button>
    <router-link tag="button" to="/h3">下一个h3</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg1: '',
      msg2: ''
    }
  },
  methods: {
    save1 () {
      let str = this.msg1
      this.$router.push(`/?k=${str}`)
    },
    save2 () {
      let str = this.msg2
      this.$router.push(`/?kk=${str}`)
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
