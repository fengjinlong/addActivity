<template>
  <div class="hello">
    <h1>{{ str }}</h1>
    <h2>ttttt</h2>
    <button @click="send">btn1</button>
  </div>
</template>

<script>
import eventBus from '../eventBus.js'
export default {
  data () {
    return {
      str: '11111111111111111111111'
    }
  },
  created () {
    let str = '★★★★★☆☆☆☆☆'
    console.log(str)
  },
  methods: {
    send () {
      eventBus.$emit('reset-component')
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
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
