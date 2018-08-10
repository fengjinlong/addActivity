<template>

  <div class="hello1">
    <div>信息1：{{msg1}}</div>
    <div>信息2：{{msg2}}</div>
    <input type="text">
    <router-link tag="button" to="/add">去添加内容</router-link>
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
  created () {
    let r = this.$route.query
    if (JSON.stringify(r) !== '{}') {
      console.log(Object.keys(r).join())
      if (Object.keys(r).join() === 'k') {
        this.msg1 = r['k']
      } else {
        this.msg2 = r['kk']
      }
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
