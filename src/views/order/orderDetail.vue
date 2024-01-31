<template>
  <div class="detail-container">
    <div>
      <el-steps :space="200" :active="formatStepStatus(order.status)" finish-status="success" align-center>
        <el-step title="提交订单"></el-step>
        <el-step title="支付订单"></el-step>
        <el-step title="平台发货"></el-step>
        <el-step title="确认收货"></el-step>
        <el-step title="完成评价"></el-step>
      </el-steps>
    </div>
    <el-card shadow="never" style="margin-top: 15px">
      <div class="operate-container">
        <i class="el-icon-warning color-danger" style="margin-left: 20px"></i>
        <span class="color-danger">当前订单状态：{{order.status | formatStatus}}</span>
        <div class="operate-button-container" v-show="order.status===0">
          <el-button size="mini">修改收货人信息</el-button>
          <el-button size="mini">修改费用信息</el-button>
          <el-button size="mini">发送站内信</el-button>
          <el-button size="mini">关闭订单</el-button>
          <el-button size="mini">备注订单</el-button>
        </div>
        <div class="operate-button-container" v-show="order.status===1">
          <el-button size="mini">修改收货人信息</el-button>
          <el-button size="mini">发送站内信</el-button>
          <el-button size="mini">取消订单</el-button>
          <el-button size="mini">备注订单</el-button>
        </div>
        <div class="operate-button-container" v-show="order.status===2||order.status===3">
          <el-button size="mini">订单跟踪</el-button>
          <el-button size="mini">发送站内信</el-button>
          <el-button size="mini">备注订单</el-button>
        </div>
        <div class="operate-button-container" v-show="order.status===4">
          <el-button size="mini">删除订单</el-button>
          <el-button size="mini">备注订单</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { formatDate}  from '@/utils/date';


export default {
  data() {
    return {
      order: {},
    }
  },
  methods: {
    formatTime(time) {
      if (time == null || time === '') {
        return '';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    formatStepStatus(value) {
      if (value === 1) {
        //待发货
        return 2;
      } else if (value === 2) {
        //已发货
        return 3;
      } else if (value === 3) {
        //已完成
        return 4;
      }else {
        //待付款、已关闭、无限订单
        return 1;
      }
    },
    formatStatus(value) {
      if (value === 1) {
        return '待发货';
      } else if (value === 2) {
        return '已发货';
      } else if (value === 3) {
        return '已完成';
      } else if (value === 4) {
        return '已关闭';
      } else if (value === 5) {
        return '无效订单';
      } else {
        return '待付款';
      }
    },
  },
  filters: {
    formatStatus(value) {
      if (value === 1) {
        return '待发货';
      } else if (value === 2) {
        return '已发货';
      } else if (value === 3) {
        return '已完成';
      } else if (value === 4) {
        return '已关闭';
      } else if (value === 5) {
        return '无效订单';
      } else {
        return '待付款';
      }
    },
  }
}
</script>

<style scoped>
.detail-container {
  width: 80%;
  padding: 20px 20px 20px 20px;
  margin: 20px auto;
}
</style>