<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>{{ computed }}</h2>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  // @Component({})
  export default class App extends Vue {
    msg: 'Welcome to Your Vue.js App'
    created () {
      let a = 1
      console.log(a)
      this.fun()
    }
    mounted () {
      let fun = (a) => {
        console.log(a+1)
      }
      let a = 2
    }
    fun () {
      console.log('methods')
    }
    get computed () {
      return 'computed'
    }
  }

// export default {
  // name: 'HelloWorld',
  // data () {
  //   return {
  //     msg: 'Welcome to Your Vue.js App'
  //   }
  // },
  // created () {
  //   let a = 1
  //   console.log(a)
  // },
  // mounted () {
  //   let fun = (a) => {
  //     console.log(a+1)
  //   }
  //   let a = 2
  //   fun(a)
  // }
  
// }
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
