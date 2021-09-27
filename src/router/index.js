import Vue from 'vue'
import Router from 'vue-router'
import Index from "../views/index/index.vue";
//import List from "../components/user/List";
import layout from "../views/layout.vue"
import routes from '../comoon/config/router.js';


Vue.use(Router)
/*
const router = new VueRouter({
  routes: [
    {
      path: '/user',//指定网址
      component: './views/user/index.vue',//指定文件路径
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'user/add',
           component: './views/user/add.vue',//指定文件路径
        },
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'user/del',
           component: './views/user/del.vue',//指定文件路径
        },
    },
    {
      path: '/layout',//user/1
      name:Layout,
      component: layout,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'user',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'Index',
          component: Index
        }
      ]
    },
      {
           path:'/login',
           name:'login',
           component:'login/index'
      },
      {
           path:'*',
           redirect:{name:'index'},
      }

  ]
})
*/

console.log({routes});
//引用/comoon/config/router.js方法
export default new Router({ routes})
