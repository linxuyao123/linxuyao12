<template>
  <div class="info">
    <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#ffd04b"
    >

      <el-menu-item @click='clickMenu(item)' v-for="item in noChildren" :key="item.name" :index="item.name">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
          <el-menu-item @click='clickMenu(subItem)' :index="subItem.path">{{ subItem.label }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>


<script>

export default {
  name: "CommonAside",
  data() {
    return {
      menuData: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          label: '商品',
          icon: "s-goods",
          children: [
            {
              path: "/pms/product",
              name: "product",
              label: "商品列表",
              icon: "setting",
              // url: "Pms/Product",
            },
            {
              path: "/pms/addProduct",
              name: "addProduct",
              label: "添加商品",
              icon: "setting",
              // url: "Pms/addProduct",
            },
            {
              path: "/pms/productCate",
              name: "productCate",
              label: "商品分类",
              icon: "setting",
              // url: "Pms/addProduct",
            },
            {
              path: "/pms/productAttr",
              name: "productAttr",
              label: "商品类型",
              icon: "setting",
              // url: "Pms/addProduct",
            },
            {
              path: "/pms/brand",
              name: "brand",
              label: "品牌类型",
              icon: "setting",
              // url: "Pms/addProduct",
            },
          ],
        },
        {
          label: '订单',
          icon: "s-order",
          children: [
            {
              path: '/oms/order',
              name: 'order',
              label: "订单列表",
              icon: "setting",
              // url: "Pms/Product",
            },
            {
              path: '/oms/orderSetting',
              name: 'orderSetting',
              label: "订单设置",
              icon: "setting",
              // url: "Pms/addProduct",
            },
            {
              path: '/oms/returnApply',
              name: 'returnApply',
              label: "退货申请处理",
              icon: "setting",
              // url: "Pms/addProduct",
            },
            {
              path: '/oms/returnReason',
              name: 'returnReason',
              label: "退货原因设置",
              icon: "setting",
              // url: "Pms/addProduct",
            },
          ],
        },
        {
          label: '营销',
          icon: "collection",
          children: [
            {
              path: '/sms/flash',
              name: 'flash',
              label: "秒杀活动列表",
              icon: "setting",
              // url: "Pms/Product",
            },
            {
              path: '/sms/coupon',
              name: 'coupon',
              label: "优惠券列表",
              icon: "setting",
              // url: "Pms/Product",
            },
            {
              path: '/sms/brand',
              name: 'homeBrand',
              label: "品牌推荐",
              icon: "setting",
              // url: "Pms/Product",
            },
            {
              path: '/sms/new',
              name: 'homeNew',
              label: "新品推荐",
              icon: "setting",
              // url: "Pms/Product",
            },
            {
              path: '/sms/hot',
              name: 'homeHot',
              label: "人气推荐",
              icon: "setting",
              // url: "Pms/Product",
            },
            {
              path: '/sms/subject',
              name: 'homeSubject',
              label: "专题推荐",
              icon: "setting",
              // url: "Pms/Product",
            },
            {
              path: '/sms/advertise',
              name: 'homeAdvertise',
              label: "广告列表",
              icon: "setting",
              // url: "Pms/Product",
            },
          ],
        },
        {
          label: '权限',
          icon: "key",
          children: [
            {
              path: '/ums/admin',
              name: 'admin',
              label: "用户列表",
              icon: "setting",
              // url: "Pms/Product",
            },
            {
              path: '/ums/role',
              name: 'role',
              label: "角色列表",
              icon: "setting",
              // url: "Pms/Product",
            },
            {
              path: '/ums/menu',
              name: 'menu',
              label: "菜单列表",
              icon: "setting",
              // url: "Pms/Product",
            },
            {
              path: '/ums/resource',
              name: 'resource',
              label: "资源列表",
              icon: "setting",
              // url: "Pms/Product",
            },
          ],
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      console.log(item)
      // 当页面的路由与跳转的路由不一致才允许跳转
      if (this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))) {
        this.$router.push(item.path)
      }
    }
  },
  computed: {
    //没有子菜单
    noChildren() {
      return this.menuData.filter(item => !item.children)
    },
    //有子菜单
    hasChildren() {
      return this.menuData.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  height: 1080px;
  min-height: 400px;
}

.el-menu {
  height: 100vh;
  text-align: left;

  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;

  }
}
</style>