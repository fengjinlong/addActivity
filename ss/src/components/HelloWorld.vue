<template>
  <div class="hello" @mouseover="clearInv" @mouseout="mouseout">
    <transition-group tag="ul" class='slide-ul' :name="name">
      <li v-for="(item , index ) in slides" :key="index" v-show="index===nowIndex">
          <img :src="item.src" alt="">
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      slides: [
        {
          src: 'http://i3.mifile.cn/a4/xmad_14913974588712_tsRvc.jpg'
        },
        {
          src: 'http://i3.mifile.cn/a4/xmad_14915894814419_zNYsr.jpg'
        },
        {
          src: 'http://i3.mifile.cn/a4/xmad_14913784864515_mkpqH.jpg'
        },
        {
          src: 'http://i3.mifile.cn/a4/xmad_14908694250786_fObqa.jpg'
        },
        {
          src: 'http://i3.mifile.cn/a4/xmad_14913755624659_gRtNH.jpg'
        }
      ],
      name: 'name',
      nowIndex: 0,
      time: null
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.time = setInterval(() => {
        if (this.nowIndex > 3) {
          this.nowIndex = 0
        } else {
          this.nowIndex++
        }
        console.log(this.nowIndex)
      }, 1000)
    },
    clearInv () {
      clearInterval(this.time)
    },
    mouseout () {
      this.init()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
