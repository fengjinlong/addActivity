import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import H1 from '@/components/H1'
import H2 from '@/components/H2'
import H3 from '@/components/H3'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect: '/h1',
      children: [
        {
          path: '/h1',
          component: H1,
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: '/add',
          component: H2,
          beforeEnter: (to, from, next) => {
            console.log(to)
            to.meta.keepAlive = false
            next()
          }
        },
        {
          path: '/h3',
          component: H3
        }
      ]
    }
  ]
})
