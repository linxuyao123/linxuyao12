<template>
  <div class="app-container">
    <el-card class="box-card">
      <i class="el-icon-search"></i>
      <span>筛选搜索</span>
      <el-button  type="primary" size="mini" class="bt1" @click="filterByName">查询结果</el-button>
      <el-form ref="form" :model="form1" label-width="80px" class="bt2">
      <el-form-item label="输入搜索:">
        <el-input  v-model="productName" placeholder="品牌名称/关键字" class="input1"></el-input>
      </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card1">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" @click="navigateToOtherPage" class="add-button">添加</el-button>
    </el-card>
    <el-card class="box-card2">
      <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          class="custom-table"
          cell-class-name="table-center"
          header-cell-class-name="table-center">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="number"
            label="编号"
            width="80">
        </el-table-column>
        <el-table-column
            prop="name"
            label="品牌名称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="initial"
            label="品牌首字母"
            width="120">
        </el-table-column>
        <el-table-column
            prop="sort"
            label="排序"
            width="120">
        </el-table-column>
        <el-table-column
            prop="manufacturer"
            label="品牌制造商"
            width="120">
          <template slot-scope="scope">
            <!-- 使用 v-model 绑定每一行的开关状态 -->
            <el-switch v-model="scope.row.switchStatus" active-color="#409eff" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
            prop="flash"
            label="是否显示"
            width="120">
          <template slot-scope="scope">
            <!-- 使用 v-model 绑定每一行的开关状态 -->
            <el-switch v-model="scope.row.switchStatus2" active-color="#409eff" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
            prop="correlation"
            label="相关"
            width="200">
          <span>商品：</span><el-button size="mini" type="text"><span>100</span></el-button>
          <span class="bt4">评价：</span><el-button size="mini" type="text"><span>1000</span></el-button>
        </el-table-column>
        <el-table-column
            prop="operate"
            label="操作"
            width="200">
          <template slot-scope="scope">
            <el-button size="mini">编辑
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete1(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-select v-model="value" placeholder="批量操作">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="small" class="bt3" @click="handleBatchOperation">确定</el-button>
      </div>
    </el-card>

    <el-dialog
        title="提示"
        :visible.sync="showDialog"
        width="30%"
        center
    >
      <span>确定删除该品牌吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmDelete">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      showDialog: false,
      selectedAction: '', // 保存用户选择的操作（显示或隐藏）
      currentPage4: 1,
      form1: {
        name: '',
      },
      tableData: [{
        number: '6',
        name: '小米',
        initial: 'M',
        sort:'500',
        manufacturer:'',
        switchStatus: true,
        flash:'',
        switchStatus2: true,
        correlation:'',
        operate:'',
      }, {
        number: '49',
        name: '七匹狼',
        initial: 'S',
        sort:'200',
        manufacturer:'',
        switchStatus: true,
        flash:'',
        switchStatus2: true,
        correlation:'',
        operate:'',
      }, {
        number: '50',
        name: '海澜之家',
        initial: 'H',
        sort:'200',
        manufacturer:'',
        switchStatus: true,
        flash:'',
        switchStatus2: true,
        correlation:'',
        operate:'',
      }, {
        number: '51',
        name: '苹果',
        initial: 'A',
        sort:'200',
        manufacturer:'',
        switchStatus: true,
        flash:'',
        switchStatus2: true,
        correlation:'',
        operate:'',
      }, {
        number: '2',
        name: '三星',
        initial: 'S',
        sort:'100',
        manufacturer:'',
        switchStatus: true,
        flash:'',
        switchStatus2: true,
        correlation:'',
        operate:'',
      }, {
        number: '3',
        name: '华为',
        initial: 'H',
        sort:'100',
        manufacturer:'',
        switchStatus: true,
        flash:'',
        switchStatus2: true,
        correlation:'',
        operate:'',
      }, {
        number: '4',
        name: '格力',
        initial: 'G',
        sort:'30',
        manufacturer:'',
        switchStatus: true,
        flash:'',
        switchStatus2: true,
        correlation:'',
        operate:'',
      }],
      productName: '',
      multipleSelection: [],
      options: [{
        value: '选项1',
        label: '显示品牌'
      }, {
        value: '选项2',
        label: '隐藏品牌'
      }],
      value: ''
    }
  },
  methods: {
    handleDelete1(index) {
      // 设置 showDialog 为 true，显示弹窗
      this.showDialog = true;
      // 在这里记录要删除的索引或其他信息
      // this.selectedIndex = index;
    },
    confirmDelete() {
      // 获取选中行的索引
      const selectedIndex = this.tableData.findIndex(item => item === this.multipleSelection[0]);

      // 在这里执行实际的删除操作
      this.tableData.splice(selectedIndex, 1);

      // 隐藏弹窗
      this.showDialog = false;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    filterByName() {
      const filteredData = this.tableData.filter(item => {
        return item.name.includes(this.productName);
      });

      // 更新表格数据
      this.tableData = filteredData;
    },
    navigateToOtherPage() {
      this.$router.push('/pms/addBrand');
    },
    handleBatchOperation() {
      // 更新 this.multipleSelection
      this.multipleSelection = this.$refs.multipleTable.selection;

      if (this.multipleSelection.length === 0) {
        console.log('请选择要操作的行');
        return;
      }

      // 判断用户选择的操作
      if (this.value === '选项1') {
        this.showSelectedBrands();
      } else if (this.value === '选项2') {
        this.hideSelectedBrands();
      } else {
        console.log('请选择批量操作');
      }
    },

    showSelectedBrands() {
      this.multipleSelection.forEach(row => {
        // 将对应行的数据中的 switchStatus2 设置为 true
        row.switchStatus2 = true;
      });
    },

    hideSelectedBrands() {
      this.multipleSelection.forEach(row => {
        // 将对应行的数据中的 switchStatus2 设置为 false
        row.switchStatus2 = false;
      });
    },
  }
}
</script>

<style scoped>
.bt1 {
  float: right;
}
/deep/ .el-input__inner {
  height: 34px;
  width: 204px;
}
.bt2 {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  margin-left: 50px;
}
.box-card1 {
  margin-top: 20px;
  margin-bottom: 20px;
}
.add-button {
  float: right;
}
.bt3 {
  margin-left: 20px;
}
.bt4 {
  margin-left: 3px;
  margin-left: 5px;
}

/deep/ .table-center {
  text-align: center;
}

.bt6 {
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: nowrap;
  align-content: space-around;
  justify-content: flex-start;
  align-items: center
}
</style>