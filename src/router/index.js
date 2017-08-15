import Vue from 'vue'
import Router from 'vue-router'
import Render from '../render/index.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Render',
      component: Render
    }
  ]
})
