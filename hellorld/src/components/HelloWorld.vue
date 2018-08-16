<template>
  <div class="hello">
   HelloWorld
   <H :mm="mm"></H>
  </div>
</template>

<script>
import H from 'hellovuefj'
export default {
  name: 'HelloWorld',
  data () {
    return {
      mm: 'adsafdasf33333333'
    }
  },
  components: {
    H
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
