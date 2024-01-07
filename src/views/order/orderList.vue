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
              <el-form-item label="收货人:" label-width="140px">
                <el-input v-model="formLabelAlign.consignee" size="small" placeholder="收货人姓名/手机号码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提交时间:" label-width="140px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="formLabelAlign.date1" style="width: 100%;" size="mini"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="订单状态:" label-width="140px">
                <el-input v-model="formLabelAlign.condition" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="订单分类:" label-width="140px">
                <el-input v-model="formLabelAlign.classification" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="订单来源:" label-width="140px">
                <el-input v-model="formLabelAlign.source" size="small"></el-input>
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
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          prop="number"
          label="编号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="order"
          label="订单编号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="time"
          label="提交时间"
          width="120">
      </el-table-column>
      <el-table-column
          prop="name"
          label="用户账号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="amount"
          label="订单金额"
          width="120">
      </el-table-column>
      <el-table-column
          prop="payment"
          label="支付方式"
          width="120">
      </el-table-column>
      <el-table-column
          prop="base"
          label="订单来源"
          width="120">
      </el-table-column>
      <el-table-column
          prop="condition"
          label="订单状态"
          width="120">
      </el-table-column>
      <el-table-column
          prop="operate"
          label="操作"
          width="120">
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
        consignee: '',
        date1: '', // Add this line
        condition: '',
        classification: '',
        source: '',
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      tableData: [{
        number: '12',
        order: '201809150101000001',
        time:'2018-09-15 12:24:27',
        name: 'test',
        amount:'￥18732',
        payment:'未支付',
        base:'APP订单',
        condition:'已关闭',
        operate:'',
      }, {
        number: '2',
        order: '201809150102000002',
        time:'2018-09-15 14:24:29',
        name: 'test',
        amount:'￥18732',
        payment:'支付宝',
        base:'APP订单',
        condition:'待发货',
        operate:'',
      }, {
        number: '3',
        order: '201809130101000001',
        time:'2018-09-13 16:57:40',
        name: 'test',
        amount:'￥18732',
        payment:'微信',
        base:'APP订单',
        condition:'已完成',
        operate:'',
      }, {
        number: '4',
        order: '202002250100000003',
        time:'2020-02-25 16:07:58',
        name: 'test',
        amount:'￥540',
        payment:'未支付',
        base:'APP订单',
        condition:'已关闭',
        operate:'',
      }, {
        number: '5',
        order: '202002250100000004',
        time:'2020-02-25 16:50:13',
        name: 'test',
        amount:'￥240',
        payment:'未支付',
        base:'APP订单',
        condition:'已完成',
        operate:'',
      }, {
        number: '6',
        order: '202005160100000001',
        time:'2020-05-16 15:16:54',
        name: 'test',
        amount:'￥13623',
        payment:'未支付',
        base:'APP订单',
        condition:'已关闭',
        operate:'',
      }, {
        number: '7',
        order: '202005170100000001',
        time:'2020-05-17 15:00:38',
        name: 'test',
        amount:'￥6487',
        payment:'支付宝',
        base:'APP订单',
        condition:'待发货',
        operate:'',
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
</style>