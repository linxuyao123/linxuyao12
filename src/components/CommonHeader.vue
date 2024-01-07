<template>
  <div class="header-container">
    <div class="content-1">
      <el-button @click='handleMenu' class="actionButton" icon="el-icon-menu" size="mini" plain></el-button>
      <!--面包屑-->
      <!--      <span class="text">首页</span>-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
      <span class="el-dropdown-link">
          <img class="user" src="../assets/logo.png" alt="">
          <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleMenu() {
      this.$store.commit('collapseMenu')
    }
  }
};
</script>

<style lang="less" scoped>
.header-container {
  margin: 0;
  padding: 0 20px;
  background-color: #fff;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;


  .text {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 9px;
    color: #000;
    font-weight: 700;
    cursor: pointer;
  }

  .r-content {
    .user {
      width: 35px;
      height: 35px;
      position: relative;
      display: block;
      cursor: pointer;
    }
  }

  /* 设置按钮的大小为 20px */

  .content-1 {
    display: flex;
    align-items: center;

    .actionButton {
      display: inline-block;
      cursor: pointer;
      font-size: 20px; /* 或者调整为适当的大小 */
      border: none;
    }
  }

}
</style>