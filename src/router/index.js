import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/backend/login'
import Index from '@/components/backend'
import Edit from '@/components/backend/edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit
    }
  ]
})
