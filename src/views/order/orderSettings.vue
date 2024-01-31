<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="orderSetting" ref="orderSetting" :rules="rules" label-width="150px">
      <el-form-item label="秒杀订单超过:" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.flashOrderOvertime" class="input-width">
          <template slot="append">分</template>
        </el-input>
        <span class="note-margin">未付款，订单自动完成</span>
      </el-form-item>
      <el-form-item label="正常订单超过:" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.normalOrderOvertime" class="input-width">
          <template slot="append">分</template>
        </el-input>
        <span class="note-margin">未付款，订单自动完成</span>
      </el-form-item>
      <el-form-item label="发货超过:" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.confirmOvertime" class="input-width">
          <template slot="append">天</template>
        </el-input>
        <span class="note-margin">未收货，订单自动完成</span>
      </el-form-item>
      <el-form-item label="订单完成超过:" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.finishOvertime" class="input-width">
          <template slot="append">天</template>
        </el-input>
        <span class="note-margin">自动结束交易，不能申请售后</span>
      </el-form-item>
      <el-form-item label="订单完成超过:" prop="flashOrderOvertime">
        <el-input v-model="orderSetting.commentOvertime" class="input-width">
          <template slot="append">天</template>
        </el-input>
        <span class="note-margin">自动五星好评</span>
      </el-form-item>
      <el-form-item>
        <el-button @click="showConfirmDialog" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {orderSetting} from "@/utils/api";
export default {
  name: 'orderSetting',
  data() {
    return {
      orderSetting: {
        flashOrderOvertime:'',
        normalOrderOvertime:'',
        confirmOvertime:'',
        finishOvertime:'',
        commentOvertime:'',
        rules: {
          flashOrderOvertime: [
            { required: true,  trigger: 'blur' },
          ],
          normalOrderOvertime: [
            { required: true,  trigger: 'blur' },
          ],
          confirmOvertime: [
            { required: true,  trigger: 'blur' },
          ],
          finishOvertime: [
            { required: true,  trigger: 'blur' },
          ],
          commentOvertime: [
            { required: true,  trigger: 'blur' },
          ],
        }
      }
    }
  },
  methods: {
    showConfirmDialog() {
      this.$confirm('是否要提交修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 用户点击确定，执行提交操作
        this.submitForm('orderSetting');
      }).catch(() => {
        // 用户点击取消，无需执行任何操作
      });
    },
    async showSetting() {
      try {
        let arr = {
        }
        const t = await orderSetting(arr);
        let data = t.data.data
        this.orderSetting.flashOrderOvertime = data.flashOrderOvertime
        this.orderSetting.normalOrderOvertime = data.normalOrderOvertime
        this.orderSetting.confirmOvertime = data.confirmOvertime
        this.orderSetting.finishOvertime = data.finishOvertime
        this.orderSetting.commentOvertime = data.commentOvertime
        console.log("请求数据成功", data);
      } catch (error) {
        // 请求失败的处理逻辑
        console.error("请求数据失败", error);
        // 可以根据实际情况进行进一步的错误处理，比如提示用户或记录错误日志等
      }
    },
  },
  created() {
    // 页面加载时加载数据
    this.showSetting();
  },
}
</script>

<style scoped>
.form-container {
  width: 960px;
}
.input-width {
  width: 50%
}
.note-margin {
  margin-left: 15px;
}
</style>