<template>
  <div class="hello">
    <div id="app">
    <button
      v-if="showChoices"
      @click="hide"
    >Hide</button>
    <button
      v-if="!showChoices"
      @click="show"
    >Show</button>
    <div v-if="showChoices">
    <select id="choices-single-default"></select>
  </div>
</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      showChoices: true,
      choicesSelect: null
    }
  },
   mounted: function () {
    this.initializeChoices()
  },
  methods: {
    initializeChoices: function () {
      let list = []
      // 我们来为选择框载入很多选项
      // 这样的话它会占用大量的内存
      for (let i = 0; i < 1000; i++) {
        list.push({
          label: "Item " + i,
          value: i
        })
      }
      this.choicesSelect = new Choices("#choices-single-default", {
        searchEnabled: true,
        removeItemButton: true,
        choices: list
      })
    },
    show: function () {
      this.showChoices = true
      this.$nextTick(() => {
        this.initializeChoices()
      })
    },
    hide: function () {
      this.choicesSelect.destroy()
      this.showChoices = false
    }
  },
  components: {
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
