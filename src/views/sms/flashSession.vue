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
      <el-table ref="flashSessionTable"
                :data="tableData"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="秒杀时间段名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="每日开始时间" align="center">
          <template slot-scope="scope">{{scope.row.startTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="每日结束时间" align="center">
          <template slot-scope="scope">{{scope.row.endTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="启用" align="center">
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
                       @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
        title="添加时间段"
        :visible.sync="dialogVisible" width="40%"
    >
      <el-form :model="returnReason" ref="reasonForm" label-width="150px">
        <el-form-item label="秒杀时间段名称：">
          <el-input v-model="returnReason.name" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="每日开始时间：">
          <el-time-picker
              v-model="returnReason.startTime"
              placeholder="请选择时间">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="每日结束时间：">
          <el-time-picker
              v-model="returnReason.endTime"
              placeholder="请选择时间">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="returnReason.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">不启用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleDialogConfirm">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import {flashSession} from "@/utils/api";
import {formatDate} from '@/utils/date';
const defaultFlashSession={
  name:null,
  startTime:null,
  endTime:null,
  status:0
};
const defaultReturnReason = {
  name:null,
  startTime:null,
  endTime:null,
  status:0,
};
export default {
  name: 'flashPromotionSessionList',
  data() {
    return {
      dialogVisible:false,
      list: null,
      listLoading: false,
      isEdit:false,
      tableData: Object.assign({}, defaultFlashSession),
      returnReason:Object.assign({},defaultReturnReason),

    }
  },
  methods: {
    handleAdd() {
      this.dialogVisible = true;
      this.operateReasonId = null;
      this.returnReason = Object.assign({}, defaultReturnReason);
    },
    handleUpdate(index,row){
      this.dialogVisible = true;
      this.isEdit = true;
      this.returnReason = Object.assign({},row);
      this.returnReason.startTime=new Date(row.startTime);
      this.returnReason.endTime=new Date(row.endTime);
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该时间段?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 用户点击确定后执行的操作
        this.deleteSession(row.id, index);
      }).catch(() => {
        // 用户点击取消后的操作，可不做任何处理
      });
    },
    handleDialogConfirm() {
      // 根据是否处于编辑状态执行不同的操作
      if (this.isEdit) {
        // 编辑状态下执行更新操作
        this.updateSession();
      } else {
        // 添加状态下执行添加操作
        this.addSession();
      }
    },
    // 编写更新数据的逻辑
    updateSession() {
      // 在这里添加更新数据的逻辑，例如：
      // updateSession(this.returnReason).then(response => {
      //   this.$message({
      //     type: 'success',
      //     message: '更新成功!'
      //   });
      //   this.getList();
      //   this.dialogVisible = false;
      // });
      // 假设更新成功，更新表格中的数据
      const updatedIndex = this.tableData.findIndex(item => item.id === this.returnReason.id);
      if (updatedIndex !== -1) {
        // 更新表格中的数据
        this.$set(this.tableData, updatedIndex, {...this.returnReason});
        this.$message({
          type: 'success',
          message: '更新成功!'
        });
        this.dialogVisible = false;
      }
    },
    deleteSession(sessionId, rowIndex) {
      // 执行删除操作，例如：
      // deleteSession(sessionId).then(response => {
      //   this.$message({
      //     type: 'success',
      //     message: '删除成功!'
      //   });
      //   this.getList();
      // });
      // 在这里添加删除操作的逻辑

      // 假设删除成功后，直接从tableData中删除对应行
      this.tableData.splice(rowIndex, 1);
    },
    async getList() {
      try {
        const t = await flashSession();
        let data = t.data.data;
        this.tableData = [];
        // 遍历数组并填充tableData
        data.forEach(item => {
          this.tableData.push({
            id: item.id,
            name: item.name,
            startTime: item.startTime,
            endTime: item.endTime,
            status: item.status,
          });
        });

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
    formatTime(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'hh:mm:ss')
    }
  },
}
</script>

<style scoped>
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
</style>