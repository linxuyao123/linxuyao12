<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
          size="mini"
          @click="handleAdd"
          class="btn-add">添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
          ref="multipleTable"
          :data="tableData"
          :border="true"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange" cell-class-name="table-center" header-cell-class-name="table-center" class="table-center">
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="80" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="原因类型" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column label="是否可用" align="center">
          <template slot-scope="scope">
            <el-switch
                v-model="scope.row.status"
                @change="handleStatusChange(scope.$index,scope.row)"
                :active-value="1"
                :inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="添加时间" width="180" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
            <el-button
                size="mini"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
          size="small"
          v-model="operateType" placeholder="批量操作">
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
          @click="handleBatchOperate"
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
    <el-dialog
        title="添加退货原因"
        :visible.sync="dialogVisible" width="30%"
    >
      <el-form :model="returnReason" ref="reasonForm" label-width="150px">
        <el-form-item label="原因类型：">
          <el-input v-model="returnReason.name" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="returnReason.sort" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-switch
              v-model="returnReason.status"
              :active-value="1"
              :inactive-value="0"
          ></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import {fetchList, getReasonDetail, returnApply} from "@/utils/api";
import {formatDate} from '@/utils/date';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 5
};
const defaultReturnReason = {
  name:null,
  sort:0,
  status:1,
  createTime:null
};
export default {
  name: 'returnReasonList',
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: null,
      listLoading:false,
      operateType:null,
      operateOptions: [
        {
          label: "删除",
          value: 1
        }
      ],
      operateReasonId:null,
      returnReason:Object.assign({},defaultReturnReason),
      dialogVisible:false,
      tableData: [{
        id: null,
        name: null,
        sort: null,
        status: null,
        createTime: null,
      }],
      multipleSelection: [],
      selectedRows: [],
    }
  },
  methods: {
    handleSelectionChange(val) {
      // 更新选中的行
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
    handleAdd() {
      this.dialogVisible = true;
      this.operateReasonId = null;
      this.returnReason = Object.assign({}, defaultReturnReason);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.ShowRequest();
    },

    handleCurrentChange(val) {
      this.pageNum = val;
      this.ShowRequest();
    },
    async handleUpdate(index, row) {
      try {
        // 将returnReason直接设置为相应行的值
        this.returnReason = {
          name: row.name,
          sort: row.sort,
          status: row.status,
        };

        // 打开对话框
        this.dialogVisible = true;

        // 用于调试的日志
        console.log("打开编辑对话框", row);
      } catch (error) {
        console.error("处理编辑失败", error);
      }
    },

    async ShowRequest() {
      try {
        let arr = {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        const t = await fetchList(arr);
        let data = t.data.data.list;

        // 清空tableData数组中的现有数据
        this.tableData = [];

        // 遍历数组并填充tableData
        data.forEach(item => {
          this.tableData.push({
            id: item.id,
            name: item.name,
            sort: item.sort,
            status: item.status,
            createTime: item.createTime,
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
    this.ShowRequest();
  },
  filters:{
    formatCreateTime(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
}
</script>

<style scoped>
.app-container {
  padding: 20px;
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
.batch-operate-container {
  display: inline-block;
  margin-top: 20px;
}
.pagination-container {
  display: inline-block;
  float: right;
  margin-top: 20px;
}
</style>