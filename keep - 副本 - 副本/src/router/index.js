import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import H1 from '@/components/H1'
import H2 from '@/components/H2'
import H3 from '@/components/H3'
import H4 from '@/components/H4'

Vue.use(Router)

const router = new Router({
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
            rank: 2.5
          }
        },
        {
          path: '/h2',
          component: H2,
          meta: {
            rank: 1.5
          }
        },
        {
          path: '/h3',
          component: H3,
          meta: {
            rank: 3.5
          }
        },
        {
          path: '/h4',
          component: H4,
          meta: {
            rank: 3.5
          }
        }
      ]
    }
  ]
})

export default router
