  <div class="hello">
    <h2>Essential Links</h2>
    <ul>
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
  </div>

export default {
  name: 'HelloWorld',
  created () {
    let fun = (a:number) => {
      console.log(a + '123')
    }
    fun('a')
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
