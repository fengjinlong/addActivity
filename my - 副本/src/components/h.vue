<template>
  <div class="div">
      <h3>{{aauth}}</h3>
      <h3>{{info}}</h3>
      <!-- <h3>{{pro}}</h3> -->
      <!-- <button @click="child(5)">emit</button> -->
      <button @click="ch">emit2</button>

  </div>
</template>

<script lang="ts">
import { State, Getter, Mutation, Action} from "vuex-class"
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'

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
    function fun (...arg:any[]) {
      let arr:IArguments = arguments
      console.log(arr)
    }
    let a = 5
    fun(123,12,13)
    console.log(4564)
  }
  created() {
    this.mutationFoo( 1000000000000 )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.div{
  display: flex;
  justify-content: space-around
}
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
