import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import User from '../views/User'
import Main from '../views/Main'
Vue.use(VueRouter)

//1.创建路由组件
//2.将路由与组件进行映射
//3.创建router实例
const routes = [
    {
        path: '/',
        component: Main,
        children: [
            {path:'home', component: Home},
            {path:'user', component: User}
        ]
    },
    {path:'/home', component: Home},
    {path:'/user', component: User}
]

const router = new VueRouter({
    routes
})

export default router
