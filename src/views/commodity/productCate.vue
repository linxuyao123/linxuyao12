<template>
  <div class="classic">
    <el-card class="box-card1">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" @click="showForm" class="add-button">添加</el-button>
    </el-card>
    <el-table
        v-if="!showSubTable"
        :data="mainTableData"
        border
        style="width: 100%"
        class="custom-table"
        cell-class-name="table-center"
        header-cell-class-name="table-center"
    >
      <el-table-column
          prop="number"
          label="编号"
          width="90">
      </el-table-column>
      <el-table-column
          prop="category"
          label="分类名称"
          width="100">
      </el-table-column>
      <el-table-column
          prop="rank"
          label="级别">
      </el-table-column>
      <el-table-column
          prop="quantity"
          label="商品数量"
          width="90">
      </el-table-column>
      <el-table-column
          prop="unit"
          label="数量单位"
          width="90">
      </el-table-column>
      <el-table-column label="导航栏" prop="bar" label-width="160">
        <template slot-scope="scope">
          <!-- 使用 v-model 绑定每一行的开关状态 -->
          <el-switch v-model="scope.row.switchStatus" active-color="#409eff" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
          prop="flash"
          label="是否显示"
          width="160">
        <template slot-scope="scope">
          <!-- 使用 v-model 绑定每一行的开关状态 -->
          <el-switch v-model="scope.row.switchStatus2" active-color="#409eff" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
          prop="recorder"
          label="排序"
          width="90">
      </el-table-column>
      <el-table-column
          prop="fit"
          label="设置"
          width="200">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="switchToSubTable" class="add-button" :disabled="showSubTable">
            查看下级
          </el-button>
          <el-button size="mini">转移商品</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="showForm2(scope.row)">编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        v-if="!showSubTable"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        class="bottom"
    ></el-pagination>

    <el-table
        v-else
        :data="subTableData"
        border
        style="width: 100%"
        class="custom-table"
        cell-class-name="table-center"
        header-cell-class-name="table-center"
    >
      <el-table-column
          prop="number"
          label="编号"
          width="90">
      </el-table-column>
      <el-table-column
          prop="category"
          label="分类名称"
          width="100">
      </el-table-column>
      <el-table-column
          prop="rank"
          label="级别">
      </el-table-column>
      <el-table-column
          prop="quantity"
          label="商品数量"
          width="90">
      </el-table-column>
      <el-table-column
          prop="unit"
          label="数量单位"
          width="90">
      </el-table-column>
      <el-table-column label="导航栏" prop="bar" label-width="160">
        <template slot-scope="scope">
          <!-- 使用 v-model 绑定每一行的开关状态 -->
          <el-switch v-model="scope.row.switchStatus" active-color="#409eff" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
          prop="flash"
          label="是否显示"
          width="160">
        <template slot-scope="scope">
          <!-- 使用 v-model 绑定每一行的开关状态 -->
          <el-switch v-model="scope.row.switchStatus2" active-color="#409eff" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
          prop="recorder"
          label="排序"
          width="90">
      </el-table-column>
      <el-table-column
          prop="fit"
          label="设置"
          width="200">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="switchToSubTable(scope.row)"
              :disabled="scope.row.buttonDisabled"
          >查看上级
          </el-button>
          <el-button size="mini">转移商品</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete1(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { productCategory } from "@/utils/api";
export default {
  data() {
    return {
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示条数
      total: 0, // 数据总条数
      value: true,
      switch1: true,
      mainTableData: [{
        number: '1',
        category: '服装',
        rank: '一级',
        quantity: '100',
        unit: '件',
        bar: '',
        switchStatus: true,
        flash: '',
        switchStatus2: true,
        recorder: '1',
        fit: '',
        operate: ''
      }, {
        number: '2',
        category: '手机数码',
        rank: '一级',
        quantity: '100',
        unit: '件',
        bar: '',
        switchStatus: true,
        flash: '',
        switchStatus2: true,
        recorder: '1',
        fit: '',
        operate: ''
      }, {
        number: '3',
        category: '家用电器',
        rank: '一级',
        quantity: '100',
        unit: '件',
        bar: '',
        switchStatus: true,
        flash: '',
        switchStatus2: true,
        recorder: '1',
        fit: '',
        operate: ''
      }, {
        number: '4',
        category: '家具安装',
        rank: '一级',
        quantity: '100',
        unit: '件',
        bar: '',
        switchStatus: true,
        flash: '',
        switchStatus2: true,
        recorder: '1',
        fit: '',
        operate: ''
      }, {
        number: '5',
        category: '汽车用品',
        rank: '一级',
        quantity: '100',
        unit: '件',
        bar: '',
        switchStatus: true,
        flash: '',
        switchStatus2: true,
        recorder: '1',
        fit: '',
        operate: ''
      }],
      subTableData: [{
        number: '7',
        category: '外套',
        rank: '二级',
        quantity: '100',
        unit: '件',
        bar: '',
        switchStatus: true,
        flash: '',
        switchStatus2: true,
        recorder: '0',
        fit: '',
        operate: ''
      }, {
        number: '8',
        category: 'T恤',
        rank: '二级',
        quantity: '100',
        unit: '件',
        bar: '',
        switchStatus: true,
        flash: '',
        switchStatus2: true,
        recorder: '0',
        fit: '',
        operate: ''
      }, {
        number: '9',
        category: '休闲裤',
        rank: '二级',
        quantity: '100',
        unit: '件',
        bar: '',
        switchStatus: true,
        flash: '',
        switchStatus2: true,
        recorder: '0',
        fit: '',
        operate: ''
      }, {
        number: '10',
        category: '牛仔裤',
        rank: '二级',
        quantity: '100',
        unit: '件',
        bar: '',
        switchStatus: true,
        flash: '',
        switchStatus2: true,
        recorder: '0',
        fit: '',
        operate: ''
      }, {
        number: '11',
        category: '衬衫',
        rank: '一级',
        quantity: '100',
        unit: '件',
        bar: '',
        switchStatus: true,
        flash: '',
        switchStatus2: true,
        recorder: '0',
        fit: '',
        operate: ''
      }, {
        number: '12',
        category: '男鞋',
        rank: '一级',
        quantity: '100',
        unit: '件',
        bar: '',
        switchStatus: true,
        flash: '',
        switchStatus2: true,
        recorder: '0',
        fit: '',
        operate: ''
      }],
      showSubTable: false,
    }
  },
  methods: {
    showForm() {
      this.$router.push('/pms/productAttr')
    },
    switchToSubTable() {
      // 切换显示下级表格
      this.showSubTable = !this.showSubTable;
    },
    handleDelete(index) {
      // 在这里执行删除操作，可以使用 index 或 row 来确定要删除的行
      // 示例中直接从数据数组中删除对应索引的行
      this.mainTableData.splice(index, 1);
    },
    handleDelete1(index) {
      // 在这里执行删除操作，可以使用 index 或 row 来确定要删除的行
      // 示例中直接从数据数组中删除对应索引的行
      this.subTableData.splice(index, 1);
    },
    showForm2(s) {
      this.$router.push('/pms/productCate/' + s.number)
    },
    handleSizeChange(size) {
      // 切换每页条数时更新数据
      this.pageSize = size;
      this.loadData();
    },
    handlePageChange(page) {
      // 切换页码时更新数据
      this.currentPage = page;
      this.loadData();
    },
    loadData() {
      // 根据分页条件加载数据
      // 示例：假设这里发送一个GET请求
      this.$axios.get('/api/getData', {
        params: {
          page: this.currentPage,
          size: this.pageSize,
          // 其他条件...
        },
      })
          .then(response => {
            // 更新表格数据和总条数
            this.mainTableData = response.data.list;
            this.total = response.data.total;
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    },
    async loadder() {
      try {
        let arr = {
          pageNum: 1,
          pageSize: 5
        }
        const t = await productCategory(arr);
        console.error("请求数据成功", t);
      } catch (error) {
        // 请求失败的处理逻辑
        console.error("请求数据失败", error);
        // 可以根据实际情况进行进一步的错误处理，比如提示用户或记录错误日志等
      }
    },
  },
  created() {
    // 页面加载时加载数据
    this.loadder();
  },
}
</script>

<style scoped>
.add-button {
  float: right;
}

/deep/ .table-center {
  text-align: center;
}

.bottom {
  float: right;
}
</style>