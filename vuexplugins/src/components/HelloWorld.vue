<template>
  <div class="hello">
    <div>{{getNavActiveIndex}}</div>
    <div>{{getNav}}</div>
    <div>{{getMessgage}}</div>
    <button @click="click">btn</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'getNavActiveIndex',
      'getNav',
      'getMessgage'
    ])
  },
  methods: {
    ...mapMutations([
      'navActiveIndex',
      'saveNav',
      'saveMessage'
    ]),
    click () {
      this.navActiveIndex(true)
      this.saveNav(!this.getNav)
      // this.saveMessage([123, 'adasd', 13, {'qw': 123}])
      this.saveMessage({'qw': 123, 'qw1': 12312})
    }
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
