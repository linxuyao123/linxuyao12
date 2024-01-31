<template>
  <div class="app-container">
    <el-card shadow="never" class="operate-container">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="selectSessionTable"
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
        <el-table-column label="商品数量" align="center">
          <template slot-scope="scope">{{scope.row.productCount}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleShowRelation(scope.$index, scope.row)">商品列表
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {formatDate} from '@/utils/date';
import {fetchSelectList} from "@/utils/api";
export default {
  name: "selectSessionList",
  data() {
    return {
      tableData: null,
      listLoading: false
    }
  },
  filters:{
    formatTime(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'hh:mm:ss')
    }
  },
  methods: {
    handleShowRelation(index,row){
      this.$router.push({path:'/sms/flashProductRelation',query:{
          flashPromotionId:this.$route.query.flashPromotionId, flashPromotionSessionId:row.id}})
    },
    async getList() {
      try {
        let arr = {
          flashPromotionId: 14
        };
        const t = await fetchSelectList(arr);
        let data = t.data.data;

        // 清空tableData数组中的现有数据
        this.tableData = [];

        // 遍历数组并填充tableData
        data.forEach(item => {
          this.tableData.push({
            id: item.id,
            name: item.name,
            startTime: item.startTime,
            endTime: item.endTime,
            productCount: item.productCount,
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
}
</script>

<style scoped>
.app-container {
  width: 80%;
  margin: 20px auto;
}
.operate-container {
  margin-top: 0;
}
.table-container {
  margin-top: 20px;
}

</style>