<template>
  <div class="hello">
    <h1>{{ str }}</h1>
    <h2>ttttt</h2>
    <button>btn2</button>
  </div>
</template>

<script>
import {eventBus} from '../eventBus.js'
export default {
  data () {
    return {
      str: '222222222222222222'
    }
  },
  created () {
    let str = '★★★★★☆☆☆☆☆'
    console.log(str)
  },
  mounted () {
    eventBus.$on('reset-component', () => {
      console.log(6666666666666)
    })
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
