import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Main from '../views/Main'
import Login from '../views/Login/Login.vue';


Vue.use(VueRouter)

//1.创建路由组件
//2.将路由与组件进行映射
//3.创建router实例
const routes = [
    {
        path: '',
        component: Main,
        //路由元信息
        meta: {
            isLogin:true
        },
        redirect:"/home",
        children: [
            //子路由
            {   path:'home',
                component: Home
            },
            {
                path: '/pms/product',
                name: 'product',
                component: () => import('../views/commodity/product'),
            },
            {
                path: '/pms/product1',
                name: 'product1',
                props: route => ({ id: route.query.id }),
                component: () => import('../views/commodity/product1'),
            },
            {
                path: '/pms/addProduct',
                name: 'addProduct',
                component: () => import('../views/commodity/addProduct'),

            },
            {
                path: '/pms/productCate',
                name: 'productCate',
                component: () => import('../views/commodity/productCate'),
            },
            {
                path: '/pms/productCate/:id',
                name: 'productCate1',
                component:() => import('../views/commodity/productCate1'),
                props: true,
            },
            {
                path: '/pms/productAttr',
                name: 'productAttr',
                component: () => import('../views/commodity/productAttr'),
            },
            {
                path: '/pms/productAttrList/:id',
                name: 'productAttr2',
                component: () => import('../views/commodity/productAttr2'),
            },
            {
                path: '/pms/productAttr/:id',
                name: 'productAttr2',
                component: () => import('../views/commodity/productAttr2'),
            },
            {
                path: '/pms/brand',
                name: 'brand',
                component: () => import('../views/commodity/brand'),
            },
            {
                path: '/pms/addBrand',
                name: 'brand1',
                component: () => import('../views/commodity/addBrand'),
            },
        ]
    },
    {
        path: '/',
        component: Main,
        redirect:"/home",
        children: [
            //子路由
            {   path:'home',
                component: Home
            },
            {
                path: '/oms/order',
                name: 'order',
                component: () => import('../views/order/orderList'),
            },
            {
                path: '/oms/orderDetail',
                name: 'orderDetail',
                component: () => import('../views/order/orderDetail'),
            },
            {
                path: '/oms/deliverOrderList',
                name: 'orderDetail',
                component: () => import('../views/order/deliverOrderList'),
            },
            {
                path: '/oms/orderSetting',
                name: 'orderSetting',
                component: () => import('../views/order/orderSettings'),
            },
            {
                path: '/oms/returnApply',
                name: 'returnApply',
                component: () => import('../views/order/returnRequest'),
            },
            {
                path: '/oms/returnApplyDetail:id',
                name: 'returnApplyDetail',
                component: () => import('../views/order/returnApplyDetail'),
                props: route => ({ id: route.query.id }),
            },
            {
                path: '/oms/returnReason',
                name: 'returnReason',
                component: () => import('../views/order/returnReason'),
            },
        ]
    },
    {
        path: '/',
        component: Main,
        redirect:"/home",
        children: [
            //子路由
            {   path:'home',
                component: Home
            },
            {
                path: '/sms/flash',
                name: 'flash',
                component: () => import('../views/sms/flash'),
            },
            {
                path: '/sms/flashSession',
                name: 'flashSession',
                component: () => import('../views/sms/flashSession'),
            },
            {
                path: '/sms/selectSession',
                name: 'selectSession',
                component: () => import('../views/sms/selectSessionList'),
                props: route => ({ id: route.query.id }),
            },
            {
                path: '/sms/flashProductRelation',
                name: 'flashProductRelation',
                component: () => import('../views/sms/productRelationList'),
                props: route => ({ id: route.query.id }),
            },
            {
                path: '/sms/coupon',
                name: 'coupon',
                component: () => import('../views/sms/coupon'),
            },
            {
                path: '/sms/addCoupon',
                name: 'addCoupon',
                component: () => import('../views/sms/addCoupon'),
            },
            {
                path: '/sms/couponHistory',
                name: 'couponHistory',
                component: () => import('../views/sms/couponHistory'),
                props: route => ({ id: route.query.id }),
            },
            {
                path: '/sms/brand',
                name: 'homeBrand',
                component: () => import('../views/sms/brand'),
            },
            {
                path: '/sms/new',
                name: 'homeNew',
                component: () => import('../views/sms/new'),
            },
            {
                path: '/sms/hot',
                name: 'homeHot',
                component: () => import('../views/sms/hot'),
            },
            {
                path: '/sms/subject',
                name: 'homeSubject',
                component: () => import('../views/sms/subject'),
            },
            {
                path: '/sms/advertise',
                name: 'homeAdvertise',
                component: () => import('../views/sms/advertise'),
            },
        ]
    },
    {
        path: '/',
        component: Main,
        redirect:"/home",
        children: [
            //子路由
            {   path:'home',
                component: Home
            },
            {
                path: '/ums/admin',
                name: 'admin',
                component: () => import('../views/permission/admin'),
            },
            {
                path: '/ums/role',
                name: 'role',
                component: () => import('../views/permission/role'),
            },
            {
                path: '/ums/menu',
                name: 'menu',
                component: () => import('../views/permission/menu'),
            },
            {
                path: '/ums/resource',
                name: 'resource',
                component: () => import('../views/permission/resource'),
            },
        ]
    },{
        path: '/login',
        name: 'Login',
        component: Login,
    }
]

const router = new VueRouter({
    routes
})

//路由拦截
// router.beforeEach((to,from,next)=> {
//     console.log('---to---', to);
//     //1.判断是否需要登入
//     if(to.matched.some(ele=>ele.meta.isLogin)) {
//         //2.判断当前的用户是否已经登录
//         let token ='';
//         if(token) {
//             next()
//         }else {
//             next('/Login')
//         }
//
//     }else{//不需要登入
//         next();
//     }
// })
export default router
