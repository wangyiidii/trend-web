import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/security/Login'
import LoginSuccess from '@/view/security/LoginSuccess'
import Reg from '@/view/security/Reg'
import Trend from '@/view/trend/Trend'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'sdfs',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/loginsuccess',
      name: 'LoginSuccess',
      component: LoginSuccess
    }, {
      path: '/reg',
      name: 'Reg',
      component: Reg
    }, {
      path: '/trend',
      name: 'Trend',
      component: Trend
    },
  ]
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');

    if (token === null || token === '') {
      next();
    } else {
      next({});
    }
  }
});

export default router;


