<template>
  <div class="hello">
    <h1>{{ str }}</h1>
    <h2>Essential Links</h2>
    <H1></H1>
    <H2></H2>
  </div>
</template>

<script>
import H1 from './HelloWorld1'
import H2 from './HelloWorld2'
export default {
  data () {
    return {
      str: '111111111111'
    }
  },
  created () {
    let str = '★★★★★☆☆☆☆☆'
    console.log(str)
  },
  components: {
    H1,
    H2
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  color: #000;
  height: 200px;
  background-color: rgba(25,25,55,.5)
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
