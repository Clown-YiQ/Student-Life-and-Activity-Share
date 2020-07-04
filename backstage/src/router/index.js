import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login.vue'
import index from '../pages/index.vue'
import home from '../pages/home.vue'
import activity from '../pages/activity.vue'
import second from '../pages/second.vue'
import share from '../pages/share.vue'
import user from '../pages/user.vue'
import permission from '../pages/permission.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    }, {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      redirect: '/home',
      meta:{
        id:'1',
        name:'首页'
      },
      children: [{
        path: '/home',
        component: home,
        name: 'home',
        meta:{
          id:'1'
        }
      },
      {
        path: '/activity',
        component:activity,
        name:'activity',
        meta:{
          id:'2-1'
        }
      },
      {
        path: '/second',
        component:second,
        name:'second',
        meta:{
          id:'2-2'
        }
      },
      {
        path: '/share',
        component:share,
        name:'share',
        meta:{
          id:'2-3'
        }
      },
      {
        path: '/user',
        component:user,
        name:'user',
        meta:{
          id:'3'
        }
      },
      {
        path: '/permission',
        component:permission,
        name:'permission',
        meta:{
          id:'4'
        }
      }
    ]
    },
  ]
})
