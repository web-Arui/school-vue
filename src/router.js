import Vue from 'vue'
import Router from 'vue-router'


import Talk from './views/Talk.vue'
import Release from './views/Release.vue'
import User from './views/User.vue'
import TalkInfo from './components/talk/TalkInfo.vue'
import Personal from './components/user/Personal'
import PersonalProfile from './components/user/PersonalProfile'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Cart from './views/Cart'
import Shopping from './views/Shopping'
import Sohome from './views/Sohome'
import Cominfo from './views/Cominfo'
import Fenlist from './views/Fenlist'
Vue.use(Router)

const router= new Router({

  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/talk',
      name: 'talk',
      component: Talk,
    },
    {
      path: '/release',
      name: 'release',
      component: Release
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/talkinfo',
      name: 'talkinfo',
      component: TalkInfo,
    },
    {
      path: '/personal',
      name: 'personal',
      component: Personal
    },
    {
      path: '/personalprofile',
      name: 'personalprofile',
      component: PersonalProfile
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    ,
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path:'/cart',
      name:'cart',
      component:Cart
    },{
      path:'/shopping',
      name:'shopping',
      component:Shopping
    },
    {
      path:'/sohome',
      name:'sohome',
      component:Sohome
    },
    {
      path:'/cominfo',
      name:'cominfo',
      component: Cominfo
    },
    {
      path:'/fenlist',
      name:'fenlist',
      component:Fenlist
    }
  ]
})
router.beforeEach((to, from, next) => {
 let token = localStorage.getItem('token')
 if(to.name=='login'||to.name=='register'){
   next()
 }else{
   if(token){
     next()
   }else{
     next({name:'login'})
   }
 }
})

// 解决路由重复点击x
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router