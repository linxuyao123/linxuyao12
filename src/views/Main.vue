<template>
  <div class="BigBox">
    <el-container>
      <el-aside>
        <CommonAside/>
      </el-aside>
      <el-container>
        <el-header class="custom-header">
          <common-header/>
          <div class="underline"></div>
        </el-header>
        <el-main>
          <!-- 这里是路由组件的渲染位置 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import CommonAside from "../components/CommonAside";
import CommonHeader from "../components/CommonHeader";

export default {
  data() {
    return {}
  },
  components: {
    CommonAside,
    CommonHeader,
  }
}
</script>

<style scoped>
.el-header {
  width: 100%; /* 设置宽度为 1035px */
  padding: 0;
  height: 50px !important;
  /*line-height: 50px;*/
  border-radius: 0 !important;
  /*text-align: right;*/
  font-size: 12px;
  position: relative; /* 设置相对定位 */
  margin-left: 180px;
}


/* 添加下划线的样式 */
.underline {
  position: absolute; /* 设置绝对定位 */
  bottom: 0; /* 距离底部的距离 */
  left: 0; /* 距离左边的距离，可以根据需要调整 */
  width: 100%; /* 宽度为100%，即占满整个 el-header 的宽度 */
  height: 1px; /* 下划线的高度 */
  background-color: #ccc; /* 下划线的颜色 */
}

.el-aside {
  transition: width .28s;
  width: 180px !important;
  height: 100%;
  /*position: fixed;*/
  font-size: 0;
  z-index: 1001;
  overflow: hidden;
  display: flex;
  position: fixed;
}

/deep/ .el-icon--right {
  position: relative !important;
  left: 5px !important;
}

.el-main {
  margin-left: 180px;
  width: 100%;
  height: 100%;
}
</style>