<template>
  <div class="classic">
    <el-card class="box-card1">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="add-button">添加</el-button>
    </el-card>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          prop="orderId"
          label="序号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="orderSn"
          label="订单编号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="goodsNameList"
          label="商品信息"
          width="120">
      </el-table-column>
      <el-table-column
          prop="shipName"
          label="收货人信息"
          width="120">
      </el-table-column>
      <el-table-column
          prop="shippingType"
          label="物流类型"
          width="120">
      </el-table-column>
      <el-table-column
          prop="orderPrice"
          label="订单金额"
          width="120">
      </el-table-column>
      <el-table-column
          prop="time"
          label="下单时间"
          width="120">
      </el-table-column>
      <el-table-column
          prop="orderStatus"
          label="订单状态"
          width="120">
        <el-button type="success" plain size="mini">已完成</el-button>
      </el-table-column>
      <el-table-column
          prop="operate"
          label="操作"
          width="120">
        <el-button type="text" size="mini">上传记录</el-button>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button>批量筛选</el-button>
      <el-button>确定</el-button>
    </div>
  </div>
</template>

<script>
import { OfflineDeal } from "@/utils/api";

export default {
  data() {
    return {
      tableData: null,
      multipleSelection: [],
    }
  },
  created() {
    this.OfflineTrade()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    async OfflineTrade() {
      try {
        let arr = {
          page: '1',
          pageSize: '10',
        }
        const t = await OfflineDeal(arr)
        this.tableData = t.data.data.list
        console.log("获取线下交易数据成功",  this.tableData)
      } catch (error) {
        // 请求失败的处理逻辑
        console.error("请求线下交易数据失败", error);

        // 可以根据实际情况进行进一步的错误处理，比如提示用户或记录错误日志等
      }
    },
  },
};
</script>

<style scoped>
.add-button {
  float: right;
}
</style>