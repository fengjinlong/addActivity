<template>
  <div class="hello">{{myArray}}
    <draggable v-model="myArray">
      <div class="div" v-for="element in myArray" :key="element.id">

          <p>{{element.name}}</p>
          <draggable v-model="element.my">
            <div v-for="(e,i) in element.my" :key="i">
              <p>{{e.name}}</p>
              <draggable v-model="e.y">
                <div v-for="(e,i) in e.y" :key="i">
                  <p>{{e}}</p>
                </div>
              </draggable>
            </div>

          </draggable>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'HelloWorld',
  data () {
    return {
      myArray: [
        {id: 1, name: 'qqqqq1', my: [{id: 12, name: 'qqqqq6', y: [1, 2, 3]}, {id: 12, name: 'qqqqq6111'}]},
        {id: 11, name: 'qqqqq2', my: [{id: 13, name: 'qqqqq7', y: [1, 2, 3]}]},
        {id: 111, name: 'qqqqq3', my: [{id: 14, name: 'qqqqq8', y: [1, 2, 3]}]},
        {id: 1111, name: 'qqqqq4', my: [{id: 15, name: 'qqqqq9', y: [1, 2, 3]}]}
      ]
    }
  },
  components: {
    draggable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .div {
    width: 100px;
    border: 1px solid red;
    margin-bottom: 10px;
    cursor: pointer;
  }
  p {
    padding: 10px;
    border: 1px solid orange;
  }
</style>
