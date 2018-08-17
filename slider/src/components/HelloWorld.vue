<template>
  <div id="app">
    <ul :style="style" ref="ul">
      <li v-for="(item,index) in actualArr" :key="index"><a :href="item.url"><img :src="item.src" alt=""></a></li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'app',
  data () {
    return {
      arr: [
        {
          'url': '',
          'src': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534417479243&di=c8bcc2a2c3162547b9758549b57fd4f0&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0117e2571b8b246ac72538120dd8a4.jpg%401280w_1l_2o_100sh.jpg'
        },
        {
          'url': '',
          'src': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534417479243&di=c8bcc2a2c3162547b9758549b57fd4f0&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0117e2571b8b246ac72538120dd8a4.jpg%401280w_1l_2o_100sh.jpg'
        },
        {
          'url': '',
          'src': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534417479243&di=c8bcc2a2c3162547b9758549b57fd4f0&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0117e2571b8b246ac72538120dd8a4.jpg%401280w_1l_2o_100sh.jpg'
        }
      ],
      actualArr: [],
      boxWidth: 500,
      ulWidth: '',
      style: ''
    }
  },
  created () {
    // 初始化
    this.init()
  },
  mounted () {
    this.loop(2)
  },
  methods: {
    loop (num) {
      console.log(6)
      let t = setTimeout(() => {
        this.trans(num)
        num++
        if (t) {
          t = null
        }
        if (num <= 5) {
          this.loop(num)
        }
      }, 1500)
    },
    // 初始化
    init () {
      // 修改数组
      this.changeArr()
      // 修改尺寸
      this.changeSize()
    },
    // 修改数组
    changeArr () {
      let arr = this.arr
      let len = arr.length
      if (len > 1) {
        let first = arr[0]
        let last = arr[arr.length - 1]
        this.actualArr = arr.slice(0)
        this.actualArr.push(first)
        this.actualArr.unshift(last)
      }
    },
    // 修改ul尺寸
    changeSize () {
      let len = this.actualArr.length
      this.ulWidth = 'width:' + (len + 2) * this.boxWidth + 'px'
      this.trans()
    },
    // 偏移
    trans (n) {
      let p = -500 * n
      let str = `transform:translate3d(${p}px,0,0);`
      // let str = 'transform:translate3d(-500px,0,0);'
      this.style = str + this.ulWidth
      // this.$refs.ul.style.left = p + 'px'
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
*
  padding 0
  margin 0
  list-style none
  box-sizing border-box
  #app
    width 500px
    height 280px
    overflow hidden
    position relative
    ul
      transition transform 1s ease
      transform translate3d(-500px,0,0)
      height 280px
      position absolute
      li
        border 1px solid red
        width 500px
        float left
        a
          width 100%
          font-size 0
          display block
          img
            width 100%
</style>
