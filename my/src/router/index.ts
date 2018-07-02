import Vue, { AsyncComponent } from 'vue'
import Router, { RouteConfig, Route, NavigationGuard } from 'vue-router'

const HelloWorld: AsyncComponent = (): any => import('@/components/HelloWorld.vue')
const Hi: AsyncComponent = (): any => import('@/components/h.vue')

Vue.use(Router)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/h',
    name: 'Hi',
    component: Hi
  }
]

const router: Router = new Router({
  mode: 'history',
  base: '/',
  routes
})

// class-component-hooks.js
import Component from 'vue-class-component'

// Register the router hooks with their names
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' // for vue-router 2.2+
])

export default router
