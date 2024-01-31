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
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="formLabelAlign" size="small" label-width="140px">
          <el-form-item label="优惠券名称：">
            <el-input v-model="formLabelAlign.name" class="input-width" placeholder="优惠券名称"></el-input>
          </el-form-item>
          <el-form-item label="优惠券类型：">
            <el-select v-model="formLabelAlign.type" placeholder="全部">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加活动</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="flashTable"
                :data="tableData"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="优惠券名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="优惠券类型" width="100" align="center">
          <template slot-scope="scope">{{scope.row.type | formatType}}</template>
        </el-table-column>
        <el-table-column label="可使用商品" width="100" align="center">
          <template slot-scope="scope">{{scope.row.useType | formatUseType}}</template>
        </el-table-column>
        <el-table-column label="使用门槛" width="140" align="center">
          <template slot-scope="scope">{{scope.row.minPoint}}</template>
        </el-table-column>
        <el-table-column label="面值" width="100" align="center">
          <template slot-scope="scope">{{scope.row.amount}}</template>
        </el-table-column>
        <el-table-column label="适用平台" width="100" align="center">
          <template slot-scope="scope">{{scope.row.platform | formatPlatform}}</template>
        </el-table-column>
        <el-table-column label="有效期" width="180" align="center">
          <template slot-scope="scope">{{scope.row.startTime | formatDate}}</template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">{{scope.row.endTime | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleView(scope.$index, scope.row)">查看
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="showDeleteConfirm(scope.row)">删除
            </el-button>
          </template>
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
import {couponList} from "@/utils/api";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  name: null,
  type: null,
};
const defaultTypeOptions=[
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
  data() {
    return {
      total: null,
      listLoading: false,
      tableData:null,
      options: [{
        value: '选项1',
        label: '全场赠券'
      }, {
        value: '选项2',
        label: '会员赠券'
      }, {
        value: '选项3',
        label: '购物赠券'
      }, {
        value: '选项4',
        label: '注册赠券'
      }],
      formLabelAlign: Object.assign({}, defaultListQuery),
    }
  },
  methods: {
    handleAdd(){
      this.$router.push({path: '/sms/addCoupon'})
    },
    async handleSearchList() {
      try {
        // 将表单中的搜索条件应用到请求参数中
        const queryParams = {
          pageNum: 1,
          pageSize: this.pageSize,
          name: this.formLabelAlign.name,
          type: this.formLabelAlign.type,
        };

        // 发起请求
        const response = await couponList(queryParams);

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
    handleView(index, row) {
      this.$router.push({path: '/sms/couponHistory', query: {id: row.id}})
    },
    async getList() {
      try {
        let arr = {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        const t = await couponList(arr);
        let data = t.data.data.list;
        //
        // // 清空tableData数组中的现有数据
        this.tableData = [];

        // 遍历数组并填充tableData
        data.forEach(item => {
          this.tableData.push({
            id: item.id,
            name: item.name,
            type: item.type,
            useType: item.useType,
            minPoint: item.minPoint,
            amount: item.amount,
            platform: item.platform,
            startTime: item.startTime,
            endTime: item.endTime,
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
  created() {
    this.getList();
  },
  filters:{
    formatType(type){
      for(let i=0;i<defaultTypeOptions.length;i++){
        if(type===defaultTypeOptions[i].value){
          return defaultTypeOptions[i].label;
        }
      }
      return '';
    },
    formatUseType(useType){
      if(useType===0){
        return '全场通用';
      }else if(useType===1){
        return '指定分类';
      }else{
        return '指定商品';
      }
    },
    formatPlatform(platform){
      if(platform===1){
        return '移动平台';
      }else if(platform===2){
        return 'PC平台';
      }else{
        return '全平台';
      }
    },
    formatDate(time){
      if(time==null||time===''){
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd')
    },
    formatStatus(endTime){
      let now = new Date().getTime();
      let endDate = new Date(endTime);
      if(endDate>now){
        return '未过期'
      }else{
        return '已过期';
      }
    }
  },
}
</script>

<style scoped>
.filter-container {
  margin-top: 20px;
}

.app-container {
  width: 80%;
  margin: 20px auto;
}
.operate-container {
  margin-top: 20px;
}

.operate-container .btn-add {
  float: right;
}
.table-container {
  margin-top: 20px;
}

.pagination-container {
  display: inline-block;
  float: right;
  margin-top: 20px;
}
</style>