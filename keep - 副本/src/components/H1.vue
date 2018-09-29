<template>

  <div class="hello1">
    <input type="text">
    <router-link tag="button" to="/h2">h2</router-link>
    <router-link tag="button" to="/h3">h3</router-link>
    <router-link tag="button" to="/h4">h4</router-link>
  </div>

</template>

<script>
export default {
  data () {
    return {
      parms: ''
    }
  },
  activated () {
    this.parms = this.$route.query.k
  },
  watch: {
    parms () {
      console.log('加载数据')
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
