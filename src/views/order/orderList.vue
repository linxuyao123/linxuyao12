<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
            style="float:right"
            type="primary"
            @click="handleSearchList()"
            size="small">
          查询搜索
        </el-button>
        <el-button
            style="float:right;margin-right: 15px"
            @click="handleResetSearch()"
            size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px;">
        <el-form :inline="true" :model="formLabelAlign" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input v-model="formLabelAlign.orderSn" class="input-width" placeholder="订单编号"></el-input>
          </el-form-item>
          <el-form-item label="收货人：">
            <el-input v-model="formLabelAlign.receiverKeyword" class="input-width" placeholder="收货人姓名/手机号码"></el-input>
          </el-form-item>
          <el-form-item label="提交时间：">
            <el-date-picker
                class="input-width"
                v-model="formLabelAlign.createTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="订单状态：">
            <el-select v-model="formLabelAlign.status" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in statusOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单分类：">
            <el-select v-model="formLabelAlign.orderType" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in orderTypeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单来源：">
            <el-select v-model="formLabelAlign.sourceType" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in sourceTypeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card1">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="60" align="center"></el-table-column>
      <el-table-column label="编号" width="80" align="center">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="订单编号" width="180" align="center">
        <template slot-scope="scope">{{scope.row.orderSn}}</template>
      </el-table-column>
      <el-table-column label="提交时间" width="180" align="center">
        <template slot-scope="scope">{{scope.row.createTime | formatCreateTime}}</template>
      </el-table-column>
      <el-table-column label="用户账号"  width="120" align="center">
        <template slot-scope="scope">{{scope.row.memberUsername}}</template>
      </el-table-column>
      <el-table-column label="订单金额" width="120" align="center">
        <template slot-scope="scope">￥{{scope.row.totalAmount}}</template>
      </el-table-column>
      <el-table-column label="支付方式" width="120" align="center">
        <template slot-scope="scope">{{scope.row.payType | formatPayType}}</template>
      </el-table-column>
      <el-table-column label="订单来源" width="120" align="center">
        <template slot-scope="scope">{{scope.row.sourceType | formatSourceType}}</template>
      </el-table-column>
      <el-table-column label="订单状态" width="120" align="center">
        <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleViewOrder(scope.$index, scope.row)"
          >查看订单</el-button>
          <el-button
              size="mini"
              @click="handleCloseOrder(scope.$index, scope.row)"
              v-show="scope.row.status===0">关闭订单</el-button>
          <el-button
              size="mini"
              @click="handleDeliveryOrder(scope.$index, scope.row)"
              v-show="scope.row.status===1">订单发货</el-button>
          <el-button
              size="mini"
              @click="handleViewLogistics(scope.$index, scope.row)"
              v-show="scope.row.status===2||scope.row.status===3">订单跟踪</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDeleteOrder(scope.$index, scope.row)"
              v-show="scope.row.status===4">删除订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="batch-operate-container">
      <el-select v-model="operateType" placeholder='批量操作'>
        <el-option
            v-for="item in operateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-button
          style="margin-left: 20px"
          class="search-button"
          @click="handleBatchOperate()"
          type="primary"
          size="small">
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes,prev, pager, next,jumper"
          :current-page.sync="pageNum"
          :page-size="pageSize"
          :page-sizes="[5, 10, 15]"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {orderList, deleteOrder, orderSetting, returnApply} from "@/utils/api";
import {formatDate} from '@/utils/date';
import { MessageBox } from 'element-ui';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  orderSn: null,
  receiverKeyword: null,
  status: null,
  orderType: null,
  sourceType: null,
  createTime: null,
};
export default {
  data() {
    return {
      list:null,
      pageNum: 1,
      pageSize: 10,
      listLoading:false,
      total: null,
      operateType: 1,
      formLabelAlign: Object.assign({}, defaultListQuery),
      operateOptions: [
        {
          label: "批量发货",
          value: 1
        },
        {
          label: "关闭订单",
          value: 2
        },
        {
          label: "删除订单",
          value: 3
        }
      ],
      orderTypeOptions: [
        {
          label: '正常订单',
          value: 0
        },
        {
          label: '秒杀订单',
          value: 1
        }
      ],
      statusOptions: [
        {
          label: '待付款',
          value: 0
        },
        {
          label: '待发货',
          value: 1
        },
        {
          label: '已发货',
          value: 2
        },
        {
          label: '已完成',
          value: 3
        },
        {
          label: '已关闭',
          value: 4
        }
      ],
      sourceTypeOptions: [
        {
          label: 'PC订单',
          value: 0
        },
        {
          label: 'APP订单',
          value: 1
        }
      ],

      // formLabelAlign: {
      //   orderSn: '',
      //   receiverKeyword: '',
      //   createTime: '', // Add this line
      //   status: '',
      //   orderType: '',
      //   sourceType: '',
      // },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      tableData: [{
        id: null,
        orderSn: null,
        createTime:null,
        memberUsername: null,
        totalAmount:null,
        payType:null,
        sourceType:null,
        status:null,
        operate:null,
      }],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleViewOrder(index, row){
      this.$router.push({path:'/oms/orderDetail',query:{id:row.id}})
    },
    handleDeliveryOrder(){
      this.$router.push({path:'/oms/deliverOrderList'})
    },
    async showOrder() {
      try {
        let arr = {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        const t = await orderList(arr);
        let data = t.data.data.list;

        // 清空tableData数组中的现有数据
        this.tableData = [];

        // 遍历数组并填充tableData
        data.forEach(item => {
          this.tableData.push({
            id: item.id,
            orderSn: item.orderSn,
            createTime: item.createTime,
            memberUsername: item.memberUsername,
            totalAmount: item.totalAmount,
            payType: item.payType,
            sourceType: item.sourceType,
            status: item.status,
            operate: '', // 你可能需要定义这个属性或者移除它
          });
        });

        this.total = t.data.data.total;
        console.log("请求数据成功", this.tableData);
      } catch (error) {
        console.error("请求数据失败", error);
      }
    },
    async handleSearchList() {
      try {
        // 将表单中的搜索条件应用到请求参数中
        const queryParams = {
          pageNum: 1,
          pageSize: this.pageSize,
          orderSn: this.formLabelAlign.orderSn,
          receiverKeyword: this.formLabelAlign.receiverKeyword,
          status: this.formLabelAlign.status,
          orderType: this.formLabelAlign.orderType,
          sourceType: this.formLabelAlign.sourceType,
          createTime: this.formLabelAlign.createTime,
        };

        // 发起请求
        const response = await orderList(queryParams);

        // 更新表格数据
        this.tableData = response.data.data.list;

        // 更新total
        this.total = response.data.data.total;

        console.log("请求数据成功", this.tableData);
      } catch (error) {
        console.error("请求数据失败", error);
      }
    },
    // 在el-pagination组件的相关事件中更新pageNum和pageSize的值，并重新调用获取数据的方法
    handleSizeChange(val) {
      this.pageSize = val;
      this.showOrder();
    },

    handleCurrentChange(val) {
      this.pageNum = val;
      this.showOrder();
    },
    handleResetSearch() {
      // 将 formLabelAlign 重置为默认初始状态
      this.formLabelAlign = Object.assign({}, defaultListQuery);

      // 重新调用数据请求方法
      this.showOrder();
    },
    async handleDeleteOrder(index, row) {
      try {
        this.$confirm('确定要删除该订单吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });


          //要传入一个参数
          // 修改 deleteOrder 调用方式，使用 POST 请求，将订单 id 放入请求体
          const delet = await deleteOrder({ ids: [row.id] });
          console.log("用户点击了确认删除", delet);
          // 删除成功后重新获取订单列表数据
          // await this.showOrder();
          let show = await this.showOrder();
          console.log('show log你是一点都不记得 服了 牛逼的 杨姐', show);
          // 确保在成功删除后将 multipleSelection 设置为空数组
          this.multipleSelection = [];

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } catch (error) {
        console.error('弹出确认框时出错', error);
      }
    },
  },
  created() {
    // 页面加载时加载数据
    this.showOrder();
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
    formatSourceType(value) {
      if (value === 1) {
        return 'APP订单';
      } else {
        return 'PC订单';
      }
    },
    formatPayType(value) {
      if (value === 1) {
        return '支付宝';
      } else if (value === 2) {
        return '微信';
      } else {
        return '未支付';
      }
    },
    formatCreateTime(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
  }
}
</script>

<style scoped>
.box-card1 {
  margin-top: 20px;
  margin-bottom: 20px;
}

.batch-operate-container {
  display: inline-block;
  margin-top: 20px;
}
.pagination-container {
  display: inline-block;
  float: right;
  margin-top: 20px;
}
.input-width {
  width: 203px;
}

.filter-container {
  margin-top: 20px;
}
.app-container {
  width: 80%;
  margin: 20px auto;
}
</style>