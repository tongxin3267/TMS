import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/backend'
import Edit from '@/components/backend/edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/Edit',
      name: 'Edit',
      component: Edit
    }
  ]
})
