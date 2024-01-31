<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="dialogTableVisible = true" style="margin-left: 20px">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productRelationTable"
                :data="tableData"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">{{scope.row.product.name}}</template>
        </el-table-column>
        <el-table-column label="货号" width="140" align="center">
          <template slot-scope="scope">NO.{{scope.row.product.productSn}}</template>
        </el-table-column>
        <el-table-column label="商品价格" width="100" align="center">
          <template slot-scope="scope">￥{{scope.row.product.price}}</template>
        </el-table-column>
        <el-table-column label="剩余数量" width="100" align="center">
          <template slot-scope="scope">{{scope.row.product.stock}}</template>
        </el-table-column>
        <el-table-column label="秒杀价格" width="100" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.flashPromotionPrice!==null">
              {{scope.row.flashPromotionPrice}}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="秒杀数量" width="100" align="center">
          <template slot-scope="scope">{{scope.row.flashPromotionCount}}</template>
        </el-table-column>
        <el-table-column label="限购数量" width="100" align="center">
          <template slot-scope="scope">{{scope.row.flashPromotionLimit}}</template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="openEditDialog(scope.row)">编辑</el-button>
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
          :current-page.sync="listQuery.pageNum"
          :page-size="listQuery.pageSize"
          :page-sizes="[5,10,15]"
          :total="total">
      </el-pagination>
    </div>
    <el-dialog title="选择商品" :visible.sync="dialogTableVisible">
      <el-input v-model="dialogData.listQuery.keyword"
                style="width: 250px;margin-bottom: 20px"
                size="small"
                placeholder="商品名称搜索">
        <el-button slot="append" icon="el-icon-search" @click="handleSelectSearch()"></el-button>
      </el-input>
      <el-table
          ref="multipleTable"
          :data="gridData"
          :border="true"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange" cell-class-name="table-center" header-cell-class-name="table-center" class="table-center">
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="商品名称" width="180" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="货号" width="180" align="center">
          <template slot-scope="scope">NO.{{scope.row.product.productSn}}</template>
        </el-table-column>
        <el-table-column label="价格" align="center">
          <template slot-scope="scope">￥{{scope.row.product.price}}</template>
        </el-table-column>
      </el-table>
      <div class="pagination-container2">
        <el-pagination
            background
            @size-change="handleDialogSizeChange"
            @current-change="handleDialogCurrentChange"
            layout="total, sizes, prev, pager, next, jumper"
            :current-page.sync="dialogListQuery.pageNum"
            :page-size="dialogListQuery.pageSize"
            :page-sizes="dialogPageSizeOptions"
            :total="gridTotal"
        >
        </el-pagination>
      </div>
      <div style="clear: both;"></div>
      <div slot="footer">
        <el-button  size="small" @click="dialogTableVisible = false">取 消</el-button>
        <el-button  size="small" type="primary" @click="handleSelectDialogConfirm()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑秒杀商品信息" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="flashProductRelation"
               ref="flashProductRelationForm"
               label-width="150px" size="small">
        <el-form-item label="商品名称：">
          <span>{{flashProductRelation.product.name}}</span>
        </el-form-item>
        <el-form-item label="货号：">
          <span>NO.{{flashProductRelation.product.productSn}}</span>
        </el-form-item>
        <el-form-item label="商品价格：">
          <span>￥{{flashProductRelation.product.price}}</span>
        </el-form-item>
        <el-form-item label="秒杀价格：">
          <el-input v-model="flashProductRelation.flashPromotionPrice" class="input-width">
            <template slot="prepend">￥</template>
          </el-input>
        </el-form-item>
        <el-form-item label="剩余数量：">
          <span>{{flashProductRelation.product.stock}}</span>
        </el-form-item>
        <el-form-item label="秒杀数量：">
          <template slot-scope="scope">
            <el-form-item v-if="scope.row.flashPromotionCount !== null">
              <el-input v-model="scope.row.flashPromotionCount" class="input-width"></el-input>
            </el-form-item>
          </template>
        </el-form-item>
        <el-form-item label="限购数量：">
          <el-input v-model="flashProductRelation.flashPromotionLimit" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="flashProductRelation.sort" class="input-width"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {productRelationList} from "@/utils/api";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  flashPromotionId: null,
  flashPromotionSessionId: null
};
export default {
  name: "productRelationList",
  data() {
    return {
      flashProductRelation:{
        product:{}
      },
      form: [],

      dialogFormVisible: false,
      searchedGridData: [],
      dialogData:{
        list: null,
        total: null,
        multipleSelection:[],
        listQuery:{
          keyword: null,
          pageNum: 1,
          pageSize: 5
        }
      },
      selectDialogVisible:false,
      gridData:[],
      listQuery: Object.assign({}, defaultListQuery),
      tableData: [], // 新增这一行
      list: null,
      total: null,
      listLoading: false,
      dialogTableVisible: false,
      gridTableData: [],
      gridTotal: 0,
      gridListLoading: false, // 弹框表格加载状态
      dialogListQuery: Object.assign({}, defaultListQuery), // 弹框表格查询条件
      dialogPageSizeOptions: [5, 10, 15], // 弹框表格每页显示条数选项
    }
  },
  created(){
    this.listQuery.flashPromotionId=this.$route.query.flashPromotionId;
    this.listQuery.flashPromotionSessionId=this.$route.query.flashPromotionSessionId;
    this.getList();
    this.getDialogList();
  },
  methods:{
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
          (item) => item.product.productSn === row.product.productSn
      );

      if (index !== -1) {
        this.tableData.splice(index, 1);
        this.$message.success("删除成功");
      } else {
        this.$message.error("删除失败，未找到该行数据");
      }
    },
    openEditDialog(row) {
      this.flashProductRelation = {
        product: row.product,
        flashPromotionPrice: row.flashPromotionPrice || '', // 根据需要设置其他属性
        flashPromotionCount: row.flashPromotionCount || '',
        flashPromotionLimit: row.flashPromotionLimit || '',
        sort: row.sort || '',
      };
      this.dialogFormVisible = true;
    },
    handleEditConfirm() {
      console.log("handleEditConfirm triggered");

      // 找到被编辑行的索引
      const editedRowIndex = this.tableData.findIndex(
          (item) => item.product.productSn === this.flashProductRelation.product.productSn
      );

      if (editedRowIndex !== -1) {
        // 更新当前行的 flashPromotionCount
        this.tableData[editedRowIndex].flashPromotionCount = this.flashProductRelation.flashPromotionCount;
        console.log("Updated flashPromotionCount in tableData:", this.tableData[editedRowIndex].flashPromotionCount);
      }

      // 关闭编辑对话框
      this.dialogFormVisible = false;
    },
    handleSelectSearch() {
      const keyword = this.dialogData.listQuery.keyword.toLowerCase();
      this.gridData = this.gridData.filter(item =>
          item.name.toLowerCase().includes(keyword)
      );
    },
    handleDialogSizeChange(val) {
      this.dialogListQuery.pageSize = val;
      this.getDialogList();
    },

    handleDialogCurrentChange(val) {
      this.dialogListQuery.pageNum = val;
      this.getDialogList();
    },
    async getDialogList() {
      try {
        // 使用弹框分页参数
        const params = {
          pageNum: this.dialogListQuery.pageNum,
          pageSize: this.dialogListQuery.pageSize,
          flashPromotionId: 14,
          flashPromotionSessionId: 1,
        };

        const result = await productRelationList(params);
        const data = result.data.data.list;

        // 清空弹框表格数据
        this.gridTableData = [];

        // 遍历数组并填充弹框表格数据
        data.forEach(item => {
          const row = {
            name: item.product.name,
            product: {
              productSn: item.product.productSn,
              price: item.product.price,
            },
          };
          this.gridTableData.push(row);
        });

        // 更新弹框表格数据总条数
        this.gridTotal = result.data.data.total;
        console.log("弹框表格数据请求成功", this.gridTableData);
      } catch (error) {
        console.error("弹框表格数据请求失败", error);
      }
    },
    async getList() {
      try {
        let arr = {
          pageNum: 1,
          pageSize: 15,
          flashPromotionId: 14,
          flashPromotionSessionId: 1,
        };
        const t = await productRelationList(arr);
        let data = t.data.data.list;
        this.tableData = [];
        this.gridData = [];

        //遍历数组并填充tableData
        data.forEach(item => {
          const tableRow = {
            id: item.id,
            product: {
              name: item.product.name,
              productSn: item.product.productSn,
              price: item.product.price,
              stock: item.product.stock,
            },
          };
          const gridRow = {
            name: item.product.name,
            product: {
              name: item.product.name,
              productSn: item.product.productSn,
              price: item.product.price,
            },
          };
          // 将构建好的行数据添加到 tableData 数组中
          this.tableData.push(tableRow);
          this.gridData.push(gridRow);
        });

        // 更新 total
        this.total = t.data.data.total;
        console.log("请求数据成功", this.tableData);
      } catch (error) {
        console.error("请求数据失败", error);
      }
    },
  }
}
</script>

<style scoped>
.operate-container {
  margin-top: 20px;
}

.operate-container .btn-add {
  float: right;
}
.app-container {
  width: 80%;
  margin: 20px auto;
}
.operate-container {
  margin-top: 20px;
}
.table-container {
  margin-top: 20px;
}
.pagination-container {
  display: inline-block;
  float: right;
  margin-top: 20px;
}
.pagination-container2 {
  display: inline-block;
  float: right;
}
</style>