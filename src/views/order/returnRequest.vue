<template>
  <div class="app-container">
    <el-card class="filter-container">
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
          <el-form-item label="输入搜索：">
            <el-input v-model="formLabelAlign.id" class="input-width" placeholder="服务单号"></el-input>
          </el-form-item>
          <el-form-item label="处理状态：">
            <el-select v-model="formLabelAlign.status" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in statusOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请时间：">
            <el-date-picker
                class="input-width"
                v-model="formLabelAlign.createTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="操作人员：">
            <el-input v-model="formLabelAlign.handleMan" class="input-width" placeholder="全部"></el-input>
          </el-form-item>
          <el-form-item label="处理时间：">
            <el-date-picker
                class="input-width"
                v-model="formLabelAlign.handleTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间">
            </el-date-picker>
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
        :border="true"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange" cell-class-name="table-center" header-cell-class-name="table-center" class="table-center">
      <el-table-column type="selection" width="60" align="center"></el-table-column>
      <el-table-column label="服务单号" width="180" align="center">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="申请时间" width="180" align="center">
        <template slot-scope="scope">{{scope.row.createTime | formatTime}}</template>
      </el-table-column>
      <el-table-column label="用户账号" align="center">
        <template slot-scope="scope">{{scope.row.memberUsername}}</template>
      </el-table-column>
      <el-table-column label="退款金额" width="180" align="center">
        <template slot-scope="scope">￥{{scope.row.productRealPrice}}</template>
      </el-table-column>
      <el-table-column label="申请状态" width="180" align="center">
        <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
      </el-table-column>
      <el-table-column label="处理时间" width="180" align="center">
        <template slot-scope="scope">{{scope.row.handleTime | formatTime}}</template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleViewDetail(scope.$index, scope.row)"
          >查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="batch-operate-container">
      <el-select v-model="operateType" placeholder="请选择">
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
import { returnApply, deleteApply } from "@/utils/api";
import {formatDate} from '@/utils/date';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  id: null,
  receiverKeyword: null,
  status: null,
  createTime: null,
  handleMan: null,
  handleTime: null,
};
const defaultStatusOptions=[
  {
    label: '待处理',
    value: 0
  },
  {
    label: '退货中',
    value: 1
  },
  {
    label: '已完成',
    value: 2
  },
  {
    label: '已拒绝',
    value: 3
  }
];
export default {
  data() {
    return {
      list:null,
      pageNum: 1,
      pageSize: 10,
      total: null,
      listLoading:false,
      operateType:1,
      operateOptions: [
        {
          label: "批量删除",
          value: 1
        }
      ],
      value1: '',
      formLabelAlign:Object.assign({},defaultListQuery),
      statusOptions: Object.assign({},defaultStatusOptions),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      tableData: [{
        id: null,
        createTime: null,
        memberUsername: null,
        productRealPrice: null,
        status: null,
        handleTime: null,
      }],
      multipleSelection: [],
      selectedRows: [],
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.selectedRows = val;
    },
    handleBatchOperate() {
      // 处理确定按钮点击事件
      if (this.selectedRows.length === 0) {
        this.$message.warning("请先选择要删除的行");
        return;
      }

      // 弹出确认对话框
      this.$confirm("是否要进行该删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            // 用户点击确定按钮时，删除选中行
            this.deleteSelectedRows();
          })
          .catch(() => {
            // 用户点击取消按钮时的处理逻辑
            this.$message.info("取消删除操作");
          });
    },

    deleteSelectedRows() {
      // 遍历选中的行，从 tableData 中删除相应行
      this.selectedRows.forEach(selectedRow => {
        const index = this.tableData.indexOf(selectedRow);
        if (index !== -1) {
          this.tableData.splice(index, 1);
        }
      });

      // 清空选中的行
      this.selectedRows = [];

      // 关闭确定按钮后的其他逻辑...
    },
    async ShowRequest() {
      try {
        let arr = {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        const t = await returnApply(arr);
        let data = t.data.data.list;

        // 清空tableData数组中的现有数据
        this.tableData = [];

        // 遍历数组并填充tableData
        data.forEach(item => {
          this.tableData.push({
            id: item.id,
            createTime: item.createTime,
            memberUsername: item.memberUsername,
            productRealPrice: item.productRealPrice,
            status: item.status,
            handleTime: item.handleTime,
          });
        });

        // 更新total
        this.total = t.data.data.total;

        console.log("请求数据成功", data);
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
          id: this.formLabelAlign.id,
          status: this.formLabelAlign.status,
          createTime: this.formLabelAlign.createTime,
          handleMan: this.formLabelAlign.handleMan,
          handleTime: this.formLabelAlign.handleTime,
        };

        // 发起请求
        const response = await returnApply(queryParams);

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
      this.ShowRequest();
    },

    handleCurrentChange(val) {
      this.pageNum = val;
      this.ShowRequest();
    },
    handleViewDetail(index,row){
      this.$router.push({path:'/oms/returnApplyDetail',query:{id:row.id}})
    },
    handleResetSearch() {
      // 将 formLabelAlign 重置为默认初始状态
      this.formLabelAlign = Object.assign({}, defaultListQuery);

      // 重新调用数据请求方法
      this.ShowRequest();
    },
  },
  created() {
    // 页面加载时加载数据
    this.ShowRequest();
  },
  filters:{
    formatTime(time) {
      if(time==null||time===''){
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    formatStatus(status){
      for(let i=0;i<defaultStatusOptions.length;i++){
        if(status===defaultStatusOptions[i].value){
          return defaultStatusOptions[i].label;
        }
      }
    },
  }
};
</script>

<style scoped>
.pagination-container {
  display: inline-block;
  float: right;
  margin-top: 20px;
}


.box-card1 {
  margin-top: 20px;
  margin-bottom: 20px;
}


>>> .table-center {
  text-align: center;
}
.batch-operate-container {
  display: inline-block;
  margin-top: 20px;
}


.filter-container {
  margin-top: 20px;
}

.app-container {
  width: 80%;
  margin: 20px auto;
}

.filter-container {
  margin-top: 20px;
}

.pagination-container {
    display: inline-block;
    float: right;
    margin-top: 20px;
}

</style>