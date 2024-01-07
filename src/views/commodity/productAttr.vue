<template>
  <div>
    <el-card class="box-card1">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" @click="showForm" class="add-button">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table
          :data="tableData"
          border
          style="width: 100%"
          cell-class-name="table-center" header-cell-class-name="table-center">
        <el-table-column
            prop="id"
            label="编号"
            width="120">
        </el-table-column>
        <el-table-column
            prop="companyName"
            label="类型名称"
            width="160">
        </el-table-column>
        <el-table-column
            prop="quantity"
            label="属性数量"
            width="160">
        </el-table-column>
        <el-table-column
            prop="parameter"
            label="参数数量"
            width="160">
        </el-table-column>
        <el-table-column
            prop="fit"
            label="设置"
            width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="redirectToAttrList(scope.row.number, scope.row.name, scope.row.quantity)">
              属性列表
            </el-button>
            <el-button size="mini" @click="redirectToAttrList2(scope.row.number, scope.row.name, scope.row.parameter)">
              参数列表
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.row)">编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 编辑对话框 -->
    <el-dialog title="编辑类型" :visible.sync="editDialogVisible" width="30%" @close="handleEditDialogClose">
      <el-form :model="editForm" ref="editForm" label-width="80px">
        <el-form-item label="类型名称">
          <el-input v-model="editForm.name" clearable></el-input>
        </el-form-item>
        <!-- 其他编辑项根据需要添加 -->
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleEditDialogClose">取消</el-button>
        <el-button type="primary" @click="handleEditConfirm">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加类型" :visible.sync="addDialogVisible" width="30%" @close="handleAddDialogClose">
      <el-form :model="addForm" ref="addForm" label-width="80px">
        <el-form-item label="类型名称">
          <el-input v-model="addForm.name" clearable></el-input>
        </el-form-item>
        <!-- 其他添加项根据需要添加 -->
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleAddDialogClose">取消</el-button>
        <el-button type="primary" @click="handleAddConfirm">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {BusinessList} from '@/utils/api.js'

export default {
  data() {
    return {
      tableData: [{
        id: '1',
        companyName: '服装-T恤',
        quantity: '2',
        parameter: '5',
        fit: '',
        operate: '',
      }, {
        id: '2',
        companyName: '服装-裤装',
        quantity: '2',
        parameter: '4',
        fit: '',
        operate: '',
      }, {
        id: '3',
        companyName: '手机数码-手机通讯',
        quantity: '2',
        parameter: '4',
        fit: '',
        operate: '',
      }, {
        id: '4',
        companyName: '配件',
        quantity: '0',
        parameter: '0',
        fit: '',
        operate: '',
      }, {
        id: '5',
        companyName: '居家',
        quantity: '0',
        parameter: '0',
        fit: '',
        operate: '',
      }],
      editDialogVisible: false,
      editForm: {
        name: "", // 初始化编辑表单的数据结构，根据需要添加其他字段
      },
      addDialogVisible: false,
      addForm: {
        name: "", // 初始化添加表单的数据结构，类型名称为空
      },
    }
  },
  methods: {
    redirectToAttrList(number, name, quantity) {
      // 构建目标路由，并使用 router.push 进行路由导航
      const cname = encodeURIComponent(name);
      this.$router.push({path: '/pms/productAttr/:id', query: {cid: number, cname: name, cquantity: quantity}});
    },
    redirectToAttrList2(number, name, parameter) {
      const cname = encodeURIComponent(name);
      this.$router.push({path: `/pms/productAttrList/:id`, query: {cid: number, cname: name, cparameter: parameter}});
    },

    async handleEdit(row) {
      // 设置编辑表单的初始值为当前行的数据
      this.editForm = {...row};

      // 打开编辑对话框
      this.editDialogVisible = true;
      let arr = {
        page: "1",
        pageSize: "10",
      }
      const t = await BusinessList(
          arr
      )
      let list = t.data.data.list
      this.tableData = []
      this.Handle(list)
      console.log("获取后端接口数据", this.tableData)
    },

    Handle(list) {
      for (let i = 0; i < list.length; i++) {
        this.tableData.push(list[i])
      }
    },

    handleEditDialogClose() {
      // 关闭编辑对话框
      this.editDialogVisible = false;

      // 重置编辑表单
      this.$nextTick(() => {
        this.$refs.editForm.resetFields();
      });
    },
    handleEditConfirm() {
      // 编辑确认按钮的点击事件
      // 在这里可以进行编辑的确认逻辑，如更新数据等

      // 关闭编辑对话框
      this.editDialogVisible = false;

      // 重置编辑表单
      this.$nextTick(() => {
        this.$refs.editForm.resetFields();
      });
    },
    handleDelete(row) {
      // 删除按钮的点击事件
      const index = this.tableData.indexOf(row);
      if (index !== -1) {
        this.tableData.splice(index, 1);
      }
    },
    showForm() {
      // 添加按钮的点击事件，打开添加对话框
      this.addDialogVisible = true;
    },
    handleAddDialogClose() {
      // 关闭添加对话框
      this.addDialogVisible = false;

      // 重置添加表单
      this.$nextTick(() => {
        this.$refs.addForm.resetFields();
      });
    },
    handleAddConfirm() {
      // 添加确认按钮的点击事件
      // 在这里可以进行添加的确认逻辑，如将 addForm 中的数据添加到表格数据中

      // 关闭添加对话框
      this.addDialogVisible = false;

      // 重置添加表单
      this.$nextTick(() => {
        this.$refs.addForm.resetFields();
      });
    },
  }
}
</script>

<style scoped>

</style>

<style scoped>
.add-button {
  float: right;
}

.box-card1 {
  margin-top: 20px;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch
}

/deep/ .table-center {
  text-align: center;
}

.table-container {
  margin-top: 30px;
  height: 100%;
  width: 100%;
}
</style>