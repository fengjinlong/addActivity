<template>
  <div class="hello">
        <keep-alive>
      <!-- <router-view v-if="!$route.meta.noKeepAlive"> -->
      <router-view>
        <!-- 这里是会被缓存的视图组件 -->
      </router-view>
    </keep-alive>

  </div>
</template>

<script>
export default {
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
