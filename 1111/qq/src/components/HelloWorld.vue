<template>
  <div class="hello">{{myArray}}
    <draggable v-model="myArray">
        <transition-group>
            <div class="div" v-for="element in myArray" :key="element.id">
                {{element.name}}
                <draggable v-model="element.my">
                  <p v-for="(e,i) in element.my" :key="i">{{e}}</p>
                </draggable>
            </div>
        </transition-group>
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
        {id: 1, name: 'qqqqq', my: [1, 2, 3, 4, 5]},
        {id: 14, name: 'wwwwww', my: [1, 2, 3, 4, 5]},
        {id: 12, name: 'eeeeee', my: [1, 2, 3, 4, 5]},
        {id: 13, name: 'rrrrrr', my: [1, 2, 3, 4, 5]}
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
