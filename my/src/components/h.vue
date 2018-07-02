<template>
  <div class="">
      <h3>{{aauth}}</h3>
      <h3>{{info}}</h3>
      <!-- <h3>{{pro}}</h3> -->
      <!-- <button @click="child(5)">emit</button> -->
      <button @click="ch">emit2</button>
  </div>
</template>

<script lang="ts">
import { State, Getter, Mutation, Action} from "vuex-class"
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { symlink } from "fs";
import { setTimeout } from "timers";
import { constants } from "http2";

@Component
export default class HelloWorld extends Vue {
  // dd:any = 12
  // @Prop({default: 'props'}) pro!:string
  // @Emit('childd')
  // child(n:number) {
  //   console.log(n)
  // }
  @State('auth') gt:any
  @Action('aa') acfun:any
  @Mutation('ch') mutationFoo:any
  @Getter info:any

  get aauth(){
    return this.$store.state.user.auth
  }
  ch(){
    this.acfun(20)
    console.log(this.gt)
  }
  created() {
    this.mutationFoo( 1000000000000 )
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
