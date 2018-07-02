<template>
  <div class="">
      <h3>auth</h3>
      <!-- <h3>{{pro}}</h3> -->
      <!-- <button @click="child(5)">emit</button> -->
      <button @click="ch">emit2</button>
  </div>
</template>

<script lang="ts">
import { State } from "vuex-class"
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class HelloWorld extends Vue {
  // @Prop({default: 'props'}) pro!:string
  // @Emit('childd')
  // child(n:number) {
  //   console.log(n)
  // }
  @State auth:any
  ch(){
    console.log(456)
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
