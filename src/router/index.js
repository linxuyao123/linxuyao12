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
                path: '/pms/another',
                name: 'another',
                component: () => import('../views/commodity/another'),
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
                path: '/store/listing',
                name: 'listing',
                component: () => import('../views/Marketing/listIng'),
            },
            {
                path: '/store/settled',
                name: 'infoModify',
                component: () => import('../views/Marketing/Settled'),
            },
            {
                path: '/store/infoModify',
                name: 'infoModify',
                component: () => import('../views/Marketing/infoModify'),
            },
            {
                path: '/store/ReportReview',
                name: 'ReportReview',
                component: () => import('../views/Marketing/ReportReview'),
            },
            {
                path: '/store/CommentDelet',
                name: 'CommentDelet',
                component: () => import('../views/Marketing/CommentDelet'),
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
router.beforeEach((to,from,next)=> {
    console.log('---to---', to);
    //1.判断是否需要登入
    if(to.matched.some(ele=>ele.meta.isLogin)) {
        //2.判断当前的用户是否已经登录
        let token ='';
        if(token) {
            next()
        }else {
            next('/Login')
        }

    }else{//不需要登入
        next();
    }
})
export default router
