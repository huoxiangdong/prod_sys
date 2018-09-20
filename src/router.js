import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
       path: '/',
       redirect: '/Design',
       component: Main,
       children: [{
         name: '项目',
         path: '/Design',
          component: () => import('@/views/Design/Design.vue')
        //  component: () => import('@/views/Bom/Bom.vue')
        //  component: () => import('@/views/Drawing/Drawing.vue')
        //  component: () =>  import('@/views/BomList/bomlist.vue')
       },
      {
        name: '设计',
        path: 'DesignCard',
        component: () => import('@/views/DesignCard/DesignCard.vue')
      },
      {
        path: 'Drawing',
        component: () => import('@/views/Drawing/Drawing.vue')
      },
    {
      path:'test',
      component: () => import('@/views/TEST.vue')
    },
    {
      path: 'configure',
      component: () => import('@/views/Configure/main.vue')
    }
  ]
    }
  ]
})
