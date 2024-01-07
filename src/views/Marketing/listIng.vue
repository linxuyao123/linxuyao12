<template>
  <div class="bigBox">
    <h3 class="small-1">商家列表</h3>
    <el-card class="box-card">
      <el-form ref="form" :model="Form1" label-width="80px" size="mini">
        <el-row>
          <el-col :span="8" class="Bank-box">
            <el-form-item label="企业名称">
              <el-input v-model="Form1.name" placeholder="请输入" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="Bank-box">
            <el-form-item label="统一编码">
              <el-input v-model="Form1.code" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="Bank-box">
            <el-form-item label="联系人">
              <el-input v-model="Form1.contacts" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="Bank-box">
            <el-form-item label="联系方式">
              <el-input v-model="Form1.information" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="Bank-box">
            <el-form-item label="店铺名称">
              <el-input v-model="Form1.shop" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="Bank-box">
            <el-form-item label="店铺状态">
              <el-select v-model="Form1.ment" placeholder="请选择">
                <el-option label="审核通过" value="shanghai"></el-option>
                <el-option label="待审核" value="beijing"></el-option>
                <el-option label="审核拒绝" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary" size="small">查询</el-button>
      <el-button size="small"  @click="handleReset">重置</el-button>
    </el-card>
    <div class="small-2">
      <el-button @click="batchBan">批量封禁</el-button>
      <el-button @click="batchUnseal">批量解封</el-button>
      <el-button @click="openDialog2">手动新增</el-button>
    </div>
    <el-card class="small-3">
      <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="id"
            label="序号"
            width="120">
        </el-table-column>
        <el-table-column
            prop="companyName"
            label="企业名称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="organizationCode"
            label="统一编码"
            width="180">
        </el-table-column>
        <el-table-column
            prop="linkName"
            label="联系人"
            width="180">
        </el-table-column>
        <el-table-column
            prop="linkPhone"
            label="联系方式"
            width="180">
        </el-table-column>
        <el-table-column
            prop="licenceImg"
            label="营业执照"
            width="180">
        </el-table-column>
        <el-table-column
            prop="shopName"
            label="店铺名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="shopDisable"
            label="店铺状态"
            width="180">
          <template #default="scope">
            <span v-if="scope.row.shopDisable=='WAIT_AUDIT'" style="color:warning">
            待审核
            </span>
            <span v-else-if="scope.row.shopDisable=='PASS_AUDIT'" style="color:sussess">
            正常营业
            </span>
            <span v-else style="color:red">
            平台禁止
            </span>
            <!-- <span :style="{ 'color': scope.row.shopDisable=='WAIT_AUDIT' ? 'green' : 'red' }" >
               {{ scope.row.shopDisable=='WAIT_AUDIT'?'待审核':scope.row.shopDisable=='PASS_AUDIT'?'正常营业':'平台禁止' }}
            </span> -->

          </template>
        </el-table-column>
        <el-table-column
            prop="attachOrganizationName"
            label="归属挂靠"
            width="180">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="220">
          <template #default="scope">
            <el-button
                type="text"
                size="small"
                link
                v-if="scope.row.shopDisable === 'PASS_AUDIT'"
                @click="setStatusFn(scope.row, 'REFUSE_AUDIT')" :style="{ color: 'red' }"
            >
              封禁
            </el-button>
            <el-button
                type="text"
                size="small"
                link
                v-else-if="scope.row.shopDisable === 'REFUSE_AUDIT'"
                @click="setStatusFn(scope.row, 'PASS_AUDIT')" :style="{ color: 'green' }"
            >
              解封
            </el-button>
            <el-button type="danger" size="small" link @click="openDialog(scope.row)">
              归属设置
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            background
            layout="prev, pager, next"
            :total="1">
        </el-pagination>
      </div>
    </el-card>
    <el-dialog :visible.sync="showDialog" title="新增">
      <!-- 弹框内容，根据需要添加 -->
      <h4 class="dialog-subtitle">当前归属：</h4>
      <el-row>
        <el-col :span="24">
          <el-radio v-model="radio" label="1">附属机构一</el-radio>
        </el-col>
        <el-col :span="24">
          <el-radio v-model="radio" label="2">附属机构二</el-radio>
        </el-col>
      </el-row>
      <!-- 确定和取消按钮 -->
      <div class="dialog-footer">
        <span slot="footer">
           <el-button @click="showDialog = false">取消</el-button>
            <el-button type="primary" @click="handleConfirm">确定</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showDialog2" title="新增">
      <!-- 弹框内容，根据需要添加 -->
      <el-form ref="form2" :model="form2" label-width="120px">
        <el-form-item label="店铺名称">
          <el-input v-model="form2.shopName"></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="form2.companyName"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名">
          <el-input v-model="form2.linkName"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话">
          <el-input v-model="form2.linkPhone"></el-input>
        </el-form-item>
        <el-form-item label="法人姓名">
          <el-input v-model="form2.name2"></el-input>
        </el-form-item>
        <el-form-item label="组织机构代码">
          <el-input v-model="form2.organizationCode"></el-input>
        </el-form-item>
        <el-form-item label="营业执照电子版">
          <el-input v-model="form2.licenceImg"></el-input>
        </el-form-item>
        <el-form-item label="经营许可证">
          <el-input v-model="form2.BusinessLicense"></el-input>
        </el-form-item>
        <el-form-item label="其他材料">
          <el-input v-model="form2.another"></el-input>
        </el-form-item>
      </el-form>
      <!-- 确定和取消按钮 -->
      <div class="dialog-footer">
        <span slot="footer">
          <el-button @click="showDialog2 = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </span>
      </div>

    </el-dialog>
    >
  </div>
</template>

<script>
import { BusinessListings, setStatusFn, batchUnseal } from "@/utils/api";
export default {
  data(){
    return {
      showDialog2: false,
      showDialog: false,
      radio: '1',
      Form1: {
        name:'',
        code:'',
        contacts:'',
        information:'',
        shop:'',
        ment:'',
      },
      form2: {
        shopName:'',
        companyName:'',
        linkName:'',
        linkPhone:'',
        name2:'',
        organizationCode:'',
        licenceImg:'',
        BusinessLicense:'',
        another:'',
      },
      tableData: null,
      multipleSelection: []
    }
  },
  mounted() {
    // 页面加载时请求数据
    this.BusinessListings();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async BusinessListings() {
      try {
        let arr = {
          page: '1',
          pageSize: '10',
        };
        const t = await BusinessListings(arr);  // 这里的 BusinessListings 应该是一个异步请求的函数
        this.tableData = t.data.data.list.map(item => ({
          ...item,
          status: item.shopStatus, // 这里要根据实际数据属性名修改
        }));
        console.log("获取数据成功", this.tableData);
      } catch (error) {
        // 请求失败的处理逻辑
        console.error("请求数据失败", error);
        // 可以根据实际情况进行进一步的错误处理，比如提示用户或记录错误日志等
      }
    },
    async setStatusFn(row, action) {
      try {
        // 调用后端API更新店铺状态
        await setStatusFn(row.id, action);

        // 更新本地数据，反映状态的改变
        if (action === 'REFUSE_AUDIT') {
          row.shopDisable = 'REFUSE_AUDIT'; // 封禁
        } else if (action === 'PASS_AUDIT') {
          row.shopDisable = 'PASS_AUDIT'; // 解封
        }

        // 提示用户操作成功等
        this.$message.success('操作成功');

      } catch (error) {
        // 处理错误，比如提示用户或记录错误日志
        console.error('操作失败', error);
        this.$message.error('操作失败，请重试');
      }
    },
    openDialog(row) {
      // 其他逻辑...
      this.showDialog = true;
    },
    openDialog2(row) {
      // 其他逻辑...
      this.showDialog2 = true;
    },
    async batchUnseal() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请先选择要解封的行');
        return;
      }

      // 遍历选中的行
      for (const row of this.multipleSelection) {
        try {
          // 调用后端API更新店铺状态
          console.log(`解封中，行ID：${row.id}`);
          await setStatusFn(row.id, 'PASS_AUDIT');

          // 更新本地数据，反映状态的改变
          row.shopDisable = 'PASS_AUDIT'; // 解封
          console.log(`解封成功，行ID：${row.id}`);
        } catch (error) {
          // 处理错误，比如提示用户或记录错误日志
          console.error(`解封失败，行ID：${row.id}`, error);
          this.$message.error('解封失败，请重试');
        }
      }

      // 更新本地数据，触发视图更新
      this.tableData = [...this.tableData];

      // 提示用户操作成功等
      this.$message.success('批量解封成功');
    },
    async batchBan() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请先选择要封禁的行');
        return;
      }

      // 遍历选中的行
      for (const row of this.multipleSelection) {
        try {
          // 调用后端API更新店铺状态
          console.log(`封禁中，行ID：${row.id}`);
          await setStatusFn(row.id, 'REFUSE_AUDIT');

          // 更新本地数据，反映状态的改变
          row.shopDisable = 'REFUSE_AUDIT'; // 封禁
          console.log(`封禁成功，行ID：${row.id}`);
        } catch (error) {
          // 处理错误，比如提示用户或记录错误日志
          console.error(`封禁失败，行ID：${row.id}`, error);
          this.$message.error('封禁失败，请重试');
        }
      }

      // 更新本地数据，触发视图更新
      this.tableData = [...this.tableData];

      // 提示用户操作成功等
      this.$message.success('批量封禁成功');
    },
  }
}
</script>

<style scoped>
.small-1 {
  margin-top: 0;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 20px;
}
.box-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
  padding: 15px 0px;
  margin-top: 20px;
}
.Bank-box{
  margin-bottom: 15px !important;
  padding: 0;
}
.small-2{
  margin-top: 20px;
}
/deep/ .pagination{
  float: right;
}
.small-3 {
  margin-top: 20px;
}

.dialog-subtitle {
  margin: 0;
  margin-bottom: 10px;
}
.dialog-footer {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-around
}
</style>