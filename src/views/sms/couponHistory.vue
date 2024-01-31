<template>
  <div class="app-container">
    <div class="table-layout">
      <el-row>
        <el-col :span="4" class="table-cell-title">名称</el-col>
        <el-col :span="4" class="table-cell-title">优惠券类型</el-col>
        <el-col :span="4" class="table-cell-title">可使用商品</el-col>
        <el-col :span="4" class="table-cell-title">使用门槛</el-col>
        <el-col :span="4" class="table-cell-title">面值</el-col>
        <el-col :span="4" class="table-cell-title">状态</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="table-cell">{{coupon.name}}</el-col>
        <el-col :span="4" class="table-cell">{{coupon.type | formatType}}</el-col>
        <el-col :span="4" class="table-cell">{{coupon.useType | formatUseType}}</el-col>
        <el-col :span="4" class="table-cell">满{{coupon.minPoint}}元可用</el-col>
        <el-col :span="4" class="table-cell">{{coupon.amount}}元</el-col>
        <el-col :span="4" class="table-cell">{{coupon.endTime | formatStatus}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="table-cell-title">有效期</el-col>
        <el-col :span="4" class="table-cell-title">总发行量</el-col>
        <el-col :span="4" class="table-cell-title">已领取</el-col>
        <el-col :span="4" class="table-cell-title">待领取</el-col>
        <el-col :span="4" class="table-cell-title">已使用</el-col>
        <el-col :span="4" class="table-cell-title">未使用</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="table-cell" style="font-size: 13px">
          {{coupon.startTime|formatDate}}至{{coupon.endTime|formatDate}}
        </el-col>
        <el-col :span="4" class="table-cell">{{coupon.publishCount}}</el-col>
        <el-col :span="4" class="table-cell">{{coupon.receiveCount}}</el-col>
        <el-col :span="4" class="table-cell">{{coupon.publishCount-coupon.receiveCount}}</el-col>
        <el-col :span="4" class="table-cell">{{coupon.useCount}}</el-col>
        <el-col :span="4" class="table-cell">{{coupon.publishCount-coupon.useCount}}</el-col>
      </el-row>
    </div>
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
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="formLabelAlign" size="small" label-width="140px">
          <el-form-item label="使用状态：">
            <el-select v-model="formLabelAlign.useStatus" placeholder="全部">
              <el-option
                  v-for="item in useTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单编号：">
            <el-input v-model="formLabelAlign.orderSn" class="input-width" placeholder="订单编号"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div class="table-container">
      <el-table ref="couponHistoryTable"
                :data="tableData"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="优惠码" width="160" align="center">
          <template slot-scope="scope">{{scope.row.couponCode}}</template>
        </el-table-column>
        <el-table-column label="领取会员" width="140" align="center">
          <template slot-scope="scope">{{scope.row.memberNickname}}</template>
        </el-table-column>
        <el-table-column label="领取方式" width="100" align="center">
          <template slot-scope="scope">{{scope.row.getType | formatGetType}}</template>
        </el-table-column>
        <el-table-column label="领取时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="当前状态" width="140" align="center">
          <template slot-scope="scope">{{scope.row.useStatus | formatCouponHistoryUseType}}</template>
        </el-table-column>
        <el-table-column label="使用时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.useTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="订单编号" align="center">
          <template slot-scope="scope">{{scope.row.orderSn===null?'N/A':scope.row.orderSn}}</template>
        </el-table-column>
      </el-table>
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
import {formatDate} from '@/utils/date';
import {couponHistoryList, couponList} from "@/utils/api";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  useStatus: null,
  orderSn: null,
  couponId: null
};
const defaultUseTypeOptions= [
  {
    label: "未使用",
    value: 0
  },
  {
    label: "已使用",
    value: 1
  },
  {
    label: "已过期",
    value: 2
  }
];
const defaultTypeOptions = [
  {
    label: '全场赠券',
    value: 0
  },
  {
    label: '会员赠券',
    value: 1
  },
  {
    label: '购物赠券',
    value: 2
  },
  {
    label: '注册赠券',
    value: 3
  }
];
export default {
  name: "couponHistory",
  data() {
    return {
      coupon: {},
      formLabelAlign: Object.assign({}, defaultListQuery),
      listQuery: Object.assign({}, defaultListQuery),
      useTypeOptions:Object.assign({},defaultUseTypeOptions),
      list:null,
      total:null,
      listLoading:false
    }
  },
  created() {
    this.getList();
    this.HistoryList();
  },
  filters: {
    formatTime(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    formatType(type) {
      for (let i = 0; i < defaultTypeOptions.length; i++) {
        if (type === defaultTypeOptions[i].value) {
          return defaultTypeOptions[i].label;
        }
      }
      return '';
    },
    formatUseType(useType) {
      if (useType === 0) {
        return '全场通用';
      } else if (useType === 1) {
        return '指定分类';
      } else {
        return '指定商品';
      }
    },
    formatStatus(endTime) {
      let now = new Date().getTime();
      if (endTime > now) {
        return '未过期'
      } else {
        return '已过期';
      }
    },
    formatDate(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd')
    },
    formatGetType(type) {
      if(type===1){
        return '主动获取';
      }else{
        return '后台赠送';
      }
    },
    formatCouponHistoryUseType(useType) {
      if (useType === 0) {
        return '未使用';
      } else if (useType === 1) {
        return '已使用';
      } else {
        return '已过期';
      }
    },
  },
  methods: {
    async handleSearchList() {
      try {
        let queryParams = {
          pageNum: 1,
          pageSize: 10,
          couponId: 27
        };
        // 发起请求
        const response = await couponHistoryList(queryParams);

        // 更新表格数据
        this.tableData = response.data.data.list;

        // 更新total
        this.total = response.data.data.total;

        console.log("请求数据成功", this.tableData);
      } catch (error) {
        console.error("请求数据失败", error);
      }
    },
    handleResetSearch() {
      // 将 formLabelAlign 重置为默认初始状态
      this.formLabelAlign = Object.assign({}, defaultListQuery);

      // 重新调用数据请求方法
      this.getList();
    },
    async getList() {
      try {
        let arr = {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        const response = await couponList(arr);
        let data = response.data.data.list;

        if (data.length > 0) {
          // Assuming you want to display the details of the first coupon in the list
          const item = data[0];

          // Update the coupon object
          this.coupon = {
            name: item.name,
            type: item.type,
            useType: item.type,
            minPoint: item.minPoint,
            amount: item.amount,
            platform: item.platform,
            startTime: item.startTime,
            publishCount: item.publishCount,
            receiveCount: item.receiveCount,
            count: item.count,
            useCount: item.useCount,
            endTime: item.endTime,
          };
        }

        // Update the total
        this.total = response.data.data.total;

        console.log("请求数据成功", data);
      } catch (error) {
        console.error("请求数据失败", error);
      }
    },
    async HistoryList() {
      try {
        let arr = {
          pageNum: 1,
          pageSize: 10,
          couponId: 27
        };
        const t = await couponHistoryList(arr);
        let data = t.data.data.list;
        //
        // // 清空tableData数组中的现有数据
        this.tableData = [];

        // 遍历数组并填充tableData
        data.forEach(item => {
          this.tableData.push({
            couponCode: item.couponCode,
            memberNickname: item.memberNickname,
            getType: item.getType,
            createTime: item.createTime,
            useStatus: item.useStatus,
            useTime: item.useTime,
            orderSn: item.orderSn,
          });
        });

        // 更新total
        this.total = t.data.data.total;

        console.log("请求数据成功", data);
      } catch (error) {
        console.error("请求数据失败", error);
      }
    },
  },
};
</script>

<style scoped>
.app-container {
  width: 80%;
  margin: 20px auto;
}

.table-layout {
  margin-top: 20px;
  border-left: 1px solid #DCDFE6;
  border-top: 1px solid #DCDFE6;
}

.table-cell {
  height: 60px;
  line-height: 40px;
  border-right: 1px solid #DCDFE6;
  border-bottom: 1px solid #DCDFE6;
  padding: 10px;
  font-size: 14px;
  color: #606266;
  text-align: center;
  overflow: hidden;
}


.table-cell-title {
  border-right: 1px solid #DCDFE6;
  border-bottom: 1px solid #DCDFE6;
  padding: 10px;
  background: #F2F6FC;
  text-align: center;
  font-size: 14px;
  color: #303133;
}
.filter-container {
  margin-top: 20px;
}
.pagination-container {
  display: inline-block;
  float: right;
  margin-top: 20px;
}
.table-container{
  margin-top: 20px;
}
</style>