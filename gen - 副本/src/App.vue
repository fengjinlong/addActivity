<template>
  <div id="app">
    <transition name="fade">  //fade 自定义名称
      <router-view/>
    </transition>

    <router-link to="/" tag="a">a</router-link>
    <router-link to="/a" tag="a">aa</router-link>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter-active{
  transition: opacity .5s;
}
.fade-enter {
  opacity: 0;
}
</style>
