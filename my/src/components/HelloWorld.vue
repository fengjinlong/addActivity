<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{num}}</h1>
    <h2>Essential Links</h2>
    <!-- <router-link to="/h">mm</router-link> -->
    <H></H>
    <!-- <H @childd="childp" :pro="4554"></H> -->
    <button @click="fun">btn</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import H from "./h.vue"
import { Watch } from 'vue-property-decorator'

@Component({
  // 引用组件
  components: {
    H
  },
  props: {
    h: {
      type: String,
      default: () => {
        return '1'
      }
    }
  }
})
export default class HelloWorld extends Vue {
  // data
  msg : string = 'Welcome to Your Vue.js App'
  num : number = 0
  // computed
  get computedMsg () {
    return 'computed ' + this.msg
  }
  childp (n:number) {
    console.log(n)
  }
  // methods
  greet () {
    alert('greeting: ' + this.msg)
  }
  @Watch('num')
  onNumChanged (newVal: number, oldVal: number) {
    console.log(`new: ${newVal}; old: ${oldVal}`)
  }
  fun () {
    this.num++
  }
  beforeRouteLeave () {
    console.log('beforeRouteLeave')
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
