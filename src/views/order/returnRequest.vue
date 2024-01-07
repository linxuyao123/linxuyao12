<template>
  <div class="app-container">
    <el-card class="box-card">
      <i class="el-icon-search"></i>
      <span>筛选搜索</span>
      <button type="button" class="el-button el-button--primary el-button--small" style="float: right;">
        <span>查询搜索</span>
      </button>
      <button type="button" class="el-button el-button--default el-button--small"
              style="float: right; margin-right: 15px;">
        <span>重置</span>
      </button>
      <div class="bt2" style="margin-top: 20px;">
        <el-form :inline="true" :model="formLabelAlign">
          <el-row :gutter="36" class="mallBox">

            <el-col :span="8">
              <el-form-item label="输入搜索:" label-width="140px">
                <el-input v-model="formLabelAlign.name" size="small" placeholder="订单编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="处理状态:" label-width="140px">
                <el-input v-model="formLabelAlign.cope" size="small" placeholder="收货人姓名/手机号码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请时间:" label-width="95px">
                <el-date-picker type="date" placeholder="选择日期" v-model="formLabelAlign.date1" style="width: 100%;" size="mini"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="操作人员:" label-width="140px">
                <el-input v-model="formLabelAlign.manage" size="small" placeholder="全部"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="bt3">
              <el-form-item label="处理时间:" label-width="98px">
                <el-date-picker type="date" placeholder="选择日期" v-model="formLabelAlign.date2" style="width: 100%;" size="mini"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card1">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini"  class="add-button">添加</el-button>
    </el-card>
    <el-table
        ref="multipleTable"
        :data="tableData"
        :border="true"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange" cell-class-name="table-center" header-cell-class-name="table-center" class="table-center">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          prop="number"
          label="服务单号"
          width="160">
      </el-table-column>
      <el-table-column
          prop="apply"
          label="申请时间"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="用户账号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="refund"
          label="退款金额"
          width="120">
      </el-table-column>
      <el-table-column
          prop="condition"
          label="申请状态"
          width="120">
      </el-table-column>
      <el-table-column
          prop="handle"
          label="处理时间"
          width="180">
      </el-table-column>
      <el-table-column
          prop="operate"
          label="操作"
          width="180">
        <el-button size="mini">查看详情</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: '',
      formLabelAlign: {
        name: '',
        cope: '', // Add this line
        date1: '',
        manage: '',
        date2: '',
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      tableData: [{
        number: '3',
        apply: '2018-10-17 14:34:57',
        name: 'test', // Add this line
        refund: '￥3585.98',
        condition: '已完成',
        handle:'2022-11-11 10:16:18',
        operate: '',
      }, {
        number: '4',
        apply: '2018-10-17 14:40:21',
        name: 'test', // Add this line
        refund: '￥2022.81',
        condition: '退货中',
        handle:'2018-10-18 13:54:10',
        operate: '',
      }, {
        number: '5',
        apply: '2018-10-17 14:44:18',
        name: 'test', // Add this line
        refund: '￥591.05',
        condition: '已完成',
        handle:'2018-10-18 13:55:28',
        operate: '',
      }, {
        number: '8',
        apply: '2018-10-17 14:44:18',
        name: 'test', // Add this line
        refund: '￥591.05',
        condition: '已拒绝',
        handle:'2018-10-18 13:54:10',
        operate: '',
      }, {
        number: '9',
        apply: '2018-10-17 14:34:57',
        name: 'test', // Add this line
        refund: '￥3585.98',
        condition: '已完成',
        handle:'2018-10-24 15:44:56',
        operate: '',
      }, {
        number: '10',
        apply: '2018-10-17 16:50:21',
        name: 'test', // Add this line
        refund: '￥591.05',
        condition: '退货中',
        handle:'2018-10-18 13:54:10',
        operate: '',
      }, {
        number: '11',
        apply: '2018-10-17 14:44:18',
        name: 'test', // Add this line
        refund: '￥2022.81',
        condition: '已拒绝',
        handle:'2018-10-18 13:54:10',
        operate: '',
      }],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style scoped>
.bt2 {
  margin-top: 20px;
}
.add-button {
  float: right;
}
.box-card1 {
  margin-top: 20px;
  margin-bottom: 20px;
}

.bt3{
  margin-left: 40px;
}

>>> .table-center {
  text-align: center;
}
</style>