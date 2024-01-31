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
          <el-form-item label="活动名称：">
            <el-input v-model="formLabelAlign.keyword" class="input-width" placeholder="活动名称"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd1()" style="margin-left: 20px">添加活动</el-button>
      <el-button size="mini" class="btn-add" @click="handleShowSessionList()">秒杀时间段列表</el-button>
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
        <el-table-column label="活动标题" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="活动状态" width="140" align="center">
          <template slot-scope="scope">{{scope.row |formatActiveStatus}}</template>
        </el-table-column>
        <el-table-column label="开始时间" width="140" align="center">
          <template slot-scope="scope">{{scope.row.startDate | formatDate}}</template>
        </el-table-column>
        <el-table-column label="结束时间" width="140" align="center">
          <template slot-scope="scope">{{scope.row.endDate | formatDate}}</template>
        </el-table-column>
        <el-table-column label="上线/下线" width="200" align="center">
          <template slot-scope="scope">
            <el-switch
                @change="handleStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleSelectSession(scope.$index, scope.row)">设置商品
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
    <el-dialog
        title="添加活动"
        :visible.sync="dialogVisible"
        width="40%">
      <el-form v-if="editIndex < 0" :model="flashPromotion" ref="flashPromotionForm" label-width="150px" size="small">
        <el-form-item label="活动标题：">
          <el-input v-model="flashPromotion.title" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="开始时间：">
          <el-date-picker
              v-model="flashPromotion.startDate"
              type="date"
              placeholder="请选择时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：">
          <el-date-picker
              v-model="flashPromotion.endDate"
              type="date"
              placeholder="请选择时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上线/下线">
          <el-radio-group v-model="flashPromotion.status">
            <el-radio :label="1">上线</el-radio>
            <el-radio :label="0">下线</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-form v-else :model="flashPromotion" ref="flashPromotionForm" label-width="150px" size="small">
        <el-form-item label="活动标题：">
          <el-input v-model="flashPromotion.title" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="开始时间：">
          <el-date-picker
              v-model="flashPromotion.startDate"
              type="date"
              placeholder="请选择时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：">
          <el-date-picker
              v-model="flashPromotion.endDate"
              type="date"
              placeholder="请选择时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上线/下线">
          <el-radio-group v-model="flashPromotion.status">
            <el-radio :label="1">上线</el-radio>
            <el-radio :label="0">下线</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {flashList} from "@/utils/api";
import {formatDate} from '@/utils/date';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null,
};
const defaultFlashPromotion = {
  id: null,
  title: null,       // Change 'name' to 'title'
  startDate: null,   // Change 'startTime' to 'startDate'
  endDate: null,     // Change 'endTime' to 'endDate'
  status: 0
};
const defaultReturnReason = {
  name:null,
  startTime:null,
  endTime:null,
  status:0,
};
export default {
  name: 'flashPromotionList',
  data() {
    return {
      editIndex: -1,
      dialogVisible:false,
      formLabelAlign: Object.assign({}, defaultListQuery),
      tableData: [{
        id: null,
        title: null,
        startDate: null,
        endDate: null,
        status: 0
      }],
      total: null,
      listLoading: false,
      flashPromotion: Object.assign({}, defaultReturnReason),
    }
  },
  methods: {
    handleUpdate(index,row){
      this.dialogVisible = true;
      this.isEdit = true;
      this.flashPromotion = Object.assign({},row);
      this.flashPromotion.startDate=new Date(row.startDate);
      this.flashPromotion.endDate=new Date(row.endDate);
    },
    showDeleteConfirm(row) {
      this.$confirm("是否要删除该商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            this.deleteTableRow(row);
          })
          .catch(() => {
            // 用户点击取消时的处理
          });
    },

    deleteTableRow(row) {
      const index = this.tableData.findIndex(
          (item) => item.id === row.id
      );

      console.log("Deleting row with id:", row.id);
      console.log("Index:", index);

      if (index !== -1) {
        this.tableData.splice(index, 1);
        this.$message.success("删除成功");
      } else {
        this.$message.error("删除失败，未找到该行数据");
      }
    },
    handleAdd1() {
      this.dialogVisible = true;
      this.isEdit = false;
      // 重置 flashPromotion 为空对象
      this.flashPromotion = {};
    },
    handleShowSessionList() {
      this.$router.push({path: '/sms/flashSession'})
    },
    handleSelectSession(index,row){
      this.$router.push({path:'/sms/selectSession', query:{flashPromotionId:row.id}})
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    },
    async handleSearchList() {
      try {
        // 将表单中的搜索条件应用到请求参数中
        const queryParams = {
          pageNum: 1,
          pageSize: this.pageSize,
          title: this.formLabelAlign.keyword,
        };

        // 发起请求
        const response = await flashList(queryParams);

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
        const t = await flashList(arr);
        let data = t.data.data.list;

        // 清空tableData数组中的现有数据
        this.tableData = [];

        // 遍历数组并填充tableData
        data.forEach(item => {
          this.tableData.push({
            id: item.id,
            title: item.title,
            startDate: item.startDate,
            endDate: item.endDate,
            status: item.status,
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
  filters: {
    formatActiveStatus(row) {
      let nowTime = new Date().getTime();
      if (nowTime >= row.startDate && nowTime <= row.endDate) {
        return '活动进行中';
      } else if (nowTime > row.endDate) {
        return '活动已结束';
      } else {
        return '活动未开始';
      }
    },
    formatDate(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd')
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