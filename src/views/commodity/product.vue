<template>
  <div class="app-container">
    <el-card class="box-card">
      <i class="el-icon-search"></i>
      <span>筛选搜索</span>
      <button type="button" class="el-button el-button--primary el-button--small" style="float: right;" @click="QueryResults">
        <span>查询</span>
      </button>
      <button type="button" class="el-button el-button--default el-button--small"
              style="float: right; margin-right: 15px;" @click="onreturn">
        <span>重置</span>
      </button>
      <div style="margin-top: 15px;"></div>
      <el-form :inline="true" :model="formLabelAlign">
        <el-row :gutter="24" class="mallBox">

          <el-col :span="12">
            <el-form-item label="输入搜索:" label-width="140px">
              <el-input v-model="formLabelAlign.name" size="small" placeholder="商品名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品货号:" label-width="140px">
              <el-input v-model="formLabelAlign.number" size="small" placeholder="商品货号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品分类:" label-width="140px">
              <el-input v-model="formLabelAlign.type" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品品牌:" label-width="140px">
              <el-input v-model="formLabelAlign.brand" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上架状态:" label-width="140px">
              <el-input v-model="formLabelAlign.sale" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审核状态:" label-width="140px">
              <el-input v-model="formLabelAlign.audit" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="box-card2">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" @click="showForm" class="add-button">添加</el-button>
    </el-card>
    <el-card class="box-card3">
      <el-table
          ref="multipleTable"
          :data="currentPageData"
          tooltip-effect="dark"
          style="width: 100%"
          :row-height="181"
          @selection-change="handleSelectionChange"
          @row-click="handleRowClick"
          class="custom-table" cell-class-name="table-center" header-cell-class-name="table-center">
        <el-table-column
            fixed
            type="selection"
            width="60">
        </el-table-column>
        <el-table-column
            prop="number"
            label="编号"
            width="100">
        </el-table-column>
        <el-table-column
            prop="picture"
            label="商品图片"
            width="120">
          <template slot-scope="scope">
            <img :src="scope.row.picture" alt="商品图片" style="width: 80px; height: 80px;">
          </template>
        </el-table-column>
        <el-table-column
            prop="name"
            label="商品名称"
            width="80">
          <template slot-scope="scope">
            <div v-html="scope.row.name"></div>
          </template>
        </el-table-column>
        <el-table-column
            prop="price"
            label="价格/货号"
            width="120">
          <template slot-scope="scope">
            <div v-html="scope.row.price"></div>
          </template>
        </el-table-column>
        <el-table-column
            prop="pag"
            label="标签"
            width="140">
          <p>上架:
            <el-switch
                v-model="value1">
            </el-switch></p>
          <p>新品:
            <el-switch
                v-model="value2">
            </el-switch></p>
          <p>推荐:
            <el-switch
                v-model="value3">
            </el-switch></p>
        </el-table-column>
        <el-table-column
            prop="sort"
            label="排序"
            width="100">
        </el-table-column>
        <el-table-column
            prop="stock"
            label="SKU库存"
            width="100">
          <el-button type="primary" icon="el-icon-edit" circle @click="PopFrame('click')"></el-button>
        </el-table-column>
        <el-table-column
            prop="sales"
            label="销量"
            width="100">
        </el-table-column>
        <el-table-column
            prop="Auditing"
            label="审核状态"
            width="100">
          <p>未审核</p>
          <button type="button" class="el-button el-button--text">
            <span>审核详情</span></button>
        </el-table-column>
        <el-table-column prop="manipulation" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini">查看</el-button>
            <el-button size="mini" @click="showForm2(scope.row)">编辑</el-button>
            <div>
              <el-button size="mini">日志</el-button>
              <el-button size="mini" type="danger" @click="deleteSelected">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="batch-operate-container">
      <el-select v-model="value" placeholder="批量操作" size="small">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" size="mini" class="btn">确定</el-button>
      <div class="block">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[5, 10, 15]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="20">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="编辑货品信息" :visible.sync="dialogTableVisible">
      <span>商品货号：6946605 </span><el-input placeholder="按SKU编码搜索" class="bt2"></el-input>
      <el-button icon="el-icon-edit" ></el-button>
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
            prop="identifier"
            label="SKU编号"
            width="80">
          <template slot-scope="scope">
            <span v-if="!scope.row.editing1" @click="startEditing(scope.row)">{{ scope.row.identifier }}</span>
            <el-input
                v-else
                v-model="scope.row.identifier"
                ref="editInput"
                @blur="saveRow(scope.row)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
            prop="color"
            label="颜色"
            width="80">
        </el-table-column>
        <el-table-column
            prop="load"
            label="容量"
            width="80">
        </el-table-column>
        <el-table-column
            prop="rate1"
            label="销售价格"
            width="80">
          <template slot-scope="scope">
            <span v-if="!scope.row.editing4" @click="startEditing(scope.row)">{{ scope.row.rate1 }}</span>
            <el-input
                v-else
                v-model="scope.row.rate1"
                ref="editInput"
                @blur="saveRow(scope.row)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
            prop="bank"
            label="商品库存"
            width="80">
          <template slot-scope="scope">
            <span v-if="!scope.row.editing2" @click="startEditing(scope.row)">{{ scope.row.bank }}</span>
            <el-input
                v-else
                v-model="scope.row.bank"
                ref="editInput"
                @blur="saveRow(scope.row)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
            prop="warning"
            label="库存预警值"
            width="120">
          <template slot-scope="scope">
            <span v-if="!scope.row.editing3" @click="startEditing(scope.row)">{{ scope.row.warning }}</span>
            <el-input
                v-else
                v-model="scope.row.warning"
                ref="editInput"
                @blur="saveRow(scope.row)"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      value1: true,
      value2: true,
      value3: true,
      input1:'',
      formLabelAlign: {
        name: '',
        region: '',
        type: '',
        brand:'',
        sale:'',
        audit:''
      },
      originalTableData: [{
        number:'26',
        picture: 'https://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf58Ndefaac16.jpg',
        name: '<p>华为 HUAWEI P20</p> <p>品牌：华为</p>',
        price: '<p>价格：￥3788</p> <p>货号：6946605</p>',
        Article: '6946605',
        pag:'',
        sort:'0',
        stock:'',
        sales:'0',
        Auditing:'',
        manipulation:'',
      }, {
        number:'27',
        picture: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/xiaomi.jpg',
        name: '<p>小米8 全面屏游戏智能手机 6GB+64GB 黑色 全网通4G 双卡双待</p> <p>品牌：小米</p>',
        price: '<p>价格：￥2699</p> <p>货号：7437788</p>',
        Article: '7437788',
        pag:'',
        sort:'0',
        stock:'',
        sales:'0',
        Auditing:'',
        manipulation:'',
      }, {
        number:'28',
        picture: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg',
        name: '<p>小米 红米5A 全网通版 3GB+32GB 香槟金 移动联通电信4G手机 双卡双待</p> <p>品牌：小米</p>',
        price: '<p>价格：￥649</p> <p>货号：7437789</p>',
        Article: '7437789',
        pag:'',
        sort:'0',
        stock:'',
        sales:'0',
        Auditing:'',
        manipulation:'',
      }, {
        number:'29',
        picture: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5acc5248N6a5f81cd.jpg',
        name: '<p>Apple iPhone 8 Plus 64GB 红色特别版 移动联通电信4G手机</p> <p>品牌：苹果</p>',
        price: '<p>价格：￥5499</p> <p>货号：7437799</p>',
        Article: '7437799',
        pag:'',
        sort:'0',
        stock:'',
        sales:'0',
        Auditing:'',
        manipulation:'',
      }, {
        number:'30',
        picture: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5ac98b64N70acd82f.jpg!cc_350x449.jpg',
        name: '<p>HLA海澜之家简约动物印花短袖T恤</p> <p>品牌：海澜之家</p>',
        price: '<p>价格：98</p> <p>货号：HNTBJ2E042A</p>',
        Article: 'HNTBJ2E042A',
        pag:'',
        sort:'0',
        stock:'',
        sales:'0',
        Auditing:'',
        manipulation:'',
      }, {
        number:'31',
        picture: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5ac98b64N70acd82f.jpg!cc_350x449.jpg',
        name: '<p>HLA海澜之家蓝灰花纹圆领针织布短袖T恤</p> <p>品牌：海澜之家</p>',
        price: '<p>价格：98</p> <p>货号：HNTBJ2E080A</p>',
        Article: 'HNTBJ2E080A',
        pag:'',
        sort:'0',
        stock:'',
        sales:'0',
        Auditing:'',
        manipulation:'',
      }, {
        number:'32',
        picture: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a51eb88Na4797877.jpg',
        name: '<p>HLA海澜之家短袖T恤男基础款</p> <p>品牌：海澜之家</p>',
        price: '<p>价格：68</p> <p>货号：HNTBJ2E153A</p>',
        Article: 'HNTBJ2E153A',
        pag:'',
        sort:'0',
        stock:'',
        sales:'0',
        Auditing:'',
        manipulation:'',
      }, {
        number:'33',
        picture: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5b02804dN66004d73.jpg',
        name: '<p>小米（MI）小米电视4A</p> <p>品牌：小米</p>',
        price: '<p>价格：2499</p> <p>货号：4609652</p>',
        Article: '4609652',
        pag:'',
        sort:'0',
        stock:'',
        sales:'0',
        Auditing:'',
        manipulation:'',
      }, {
        number:'34',
        picture: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5b028530N51eee7d4.jpg',
        name: '<p>小米（MI）小米电视4A 65英寸</p> <p>品牌：小米</p>',
        price: '<p>价格：3999</p> <p>货号：4609660</p>',
        Article: '4609660',
        pag:'',
        sort:'0',
        stock:'',
        sales:'0',
        Auditing:'',
        manipulation:'',
      }, {
        number:'35',
        picture: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5b235bb9Nf606460b.jpg',
        name: '<p>耐克NIKE 男子 休闲鞋 ROSHE RUN 运动鞋 511881-010黑色41码</p> <p>品牌：NIKE</p>',
        price: '<p>价格：369</p> <p>货号：6799342</p>',
        Article: '6799342',
        pag:'',
        sort:'0',
        stock:'',
        sales:'0',
        Auditing:'',
        manipulation:'',
      }, {
        number:'36',
        picture: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5b19403eN9f0b3cb8.jpg',
        name: '<p>耐克NIKE 男子 气垫 休闲鞋 AIR MAX 90 ESSENTIAL 运动鞋 AJ1285-101白色41码</p> <p>品牌：NIKE</p>',
        price: '<p>价格：499</p> <p>货号：6799345</p>',
        Article: '6799345',
        pag:'',
        sort:'0',
        stock:'',
        sales:'0',
        Auditing:'',
        manipulation:'',
      }, {
        number:'37',
        picture: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20221028/iphone14_001.jpg',
        name: '<p>Apple iPhone 14 (A2884) 128GB 支持移动联通电信5G 双卡双待手机</p> <p>品牌：苹果</p>',
        price: '<p>价格：499</p> <p>货号：100038005189</p>',
        Article: '100038005189',
        pag:'',
        sort:'0',
        stock:'',
        sales:'0',
        Auditing:'',
        manipulation:'',
      }, {
        number:'38',
        picture: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20221028/ipad_001.jpg',
        name: '<p>Apple iPhone 14 (A2884) 128GB 支持移动联通电信5G 双卡双待手机</p> <p>品牌：苹果</p>',
        price: '<p>价格：3599</p> <p>货号：100044025833</p>',
        Article: '100044025833',
        pag:'',
        sort:'0',
        stock:'',
        sales:'0',
        Auditing:'',
        manipulation:'',
      }, {
        number:'39',
        picture: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20221028/xiaomi_computer_001.jpg',
        name: '<p>小米 Xiaomi Book Pro 14 2022 锐龙版 2.8K超清大师屏 高端轻薄笔记本电脑</p> <p>品牌：小米</p>',
        price: '<p>价格：5599</p> <p>货号：100023207945</p>',
        Article: '100023207945',
        pag:'',
        sort:'0',
        stock:'',
        sales:'0',
        Auditing:'',
        manipulation:'',
      }, {
        number: '40',
        picture: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20221104/xiaomi_12_pro_01.jpg',
        name: '<p>小米12 Pro 天玑版 天玑9000+处理器 5000万疾速影像 2K超视感屏 120Hz高刷 67W快充</p> <p>品牌：小米</p>',
        price: '<p>价格：2999</p> <p>货号：100027789721</p>',
        Article: '100027789721',
        pag: '',
        sort: '0',
        stock: '',
        sales: '0',
        Auditing: '',
        manipulation:'',
      }, {
        number: '41',
        picture: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20221104/redmi_k50_01.jpg',
        name: '<p>Redmi K50 天玑8100 2K柔性直屏 OIS光学防抖 67W快充 5500mAh大电量</p> <p>品牌：小米</p>',
        price: '<p>价格：2099</p> <p>货号：100035246702</p>',
        Article: '100035246702',
        pag: '',
        sort: '0',
        stock: '',
        sales: '0',
        Auditing: '',
        manipulation:'',
      }, {
        number: '42',
        picture: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20221104/huawei_mate50_01.jpg',
        name: '<p>RHUAWEI Mate 50 直屏旗舰 超光变XMAGE影像 北斗卫星消息</p> <p>品牌：华为</p>',
        price: '<p>价格：4999</p> <p>货号：100035295081</p>',
        Article: '100035295081',
        pag: '',
        sort: '0',
        stock: '',
        sales: '0',
        Auditing: '',
        manipulation:'',
      }, {
        number: '43',
        picture: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20221104/wanhe_13L_01.png',
        name: '<p>RHUAWEI Mate 50 直屏旗舰 超光变XMAGE影像 北斗卫星消息</p> <p>品牌：华为</p>',
        price: '<p>价格：1799</p> <p>货号：10044060351752</p>',
        Article: '10044060351752',
        pag: '',
        sort: '0',
        stock: '',
        sales: '0',
        Auditing: '',
        manipulation:'',
      }, {
        number: '44',
        picture: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20221108/sanxing_ssd_02.jpg',
        name: '<p>三星（SAMSUNG）500GB SSD固态硬盘 M.2接口(NVMe协议)</p> <p>品牌：三星</p>',
        price: '<p>价格：369</p> <p>货号：100018768480</p>',
        Article: '100018768480',
        pag: '',
        sort: '0',
        stock: '',
        sales: '0',
        Auditing: '',
        manipulation:'',
      }, {
        number: '45',
        picture: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20221108/oppo_r8_01.jpg',
        name: '<p>OPPO Reno8 8GB+128GB 鸢尾紫 新配色上市 80W超级闪充 5000万水光人像三摄</p> <p>品牌：OPPO</p>',
        price: '<p>价格：2299</p> <p>货号：10052147850350</p>',
        Article: '10052147850350',
        pag: '',
        sort: '0',
        stock: '',
        sales: '0',
        Auditing: '',
        manipulation:'',
      }],
      currentPage4: 1,
      pageSize: 5,
      multipleSelection: [],
      options: [{
        value: '选项1',
        label: '商品上架'
      }, {
        value: '选项2',
        label: '商品下架'
      }, {
        value: '选项3',
        label: '设为推荐'
      }, {
        value: '选项4',
        label: '取消推荐'
      }, {
        value: '选项5',
        label: '设为新品'
      }],
      value: '',
      whole: null,
      tableData: [{
        identifier:'230004',
        editing1: true,
        color: '金色',
        load: '16G',
        rate1:'99',
        editing4: true,
        bank:'78',
        editing2: true,
        warning:'',
        editing3: true,
      }, {
        identifier:'2300024',
        editing1: true,
        color: '金色',
        load: '16G',
        rate1:'98',
        editing4: true,
        bank:'33',
        editing2: true,
        warning:'',
        editing3: true,
      }, {
        identifier:'780004',
        editing1: true,
        color: '金色',
        load: '16G',
        rate1:'90',
        editing4: true,
        bank:'78',
        editing2: true,
        warning:'',
        editing3: true,
      }, {
        identifier:'23022004',
        editing1: true,
        color: '粉色',
        load: '16G',
        rate1:'99',
        editing4: true,
        bank:'22',
        editing2: true,
        warning:'',
        editing3: true,
      }],
      dialogTableVisible: false,
    };
  },
  computed: {
    currentPageData() {
      const startIndex = (this.currentPage4 - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      // console.log("curren", this.originalTableData)
      // return this.originalTableData
      return this.originalTableData.slice(startIndex, endIndex);
    },
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage4 = val;
    },
    showForm2(row) {
      console.log("id", this.id)
      this.$router.push({
        path: '/pms/product1',
        query: {id: row.number}
      });
    },
    QueryResults() {
      // console.log('QueryResults 拿到货号', this.formLabelAlign.number);
      let arr = this.originalTableData
      // console.log("获取数据", this.originalTableData)
      let number = this.formLabelAlign.number
      let name = this.formLabelAlign.name
      this.whole = arr
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].Article === number) {
          this.originalTableData = []
          this.originalTableData.push(arr[i])
          // console.log("获取数组", arr)
        }
        console.log('arr', arr[i].name.includes(name))
        if (arr[i].name.includes(name)) {

          if (this.originalTableData.length === 20) {
            this.originalTableData = []
          }
          this.originalTableData.push(arr[i])
        }
      }
    },
    onreturn() {
      this.originalTableData = this.whole
      this.formLabelAlign.name = ''
      this.formLabelAlign.number = ''
    },
    showForm() {
      this.$router.push('/pms/addProduct')
    },
    PopFrame(s) {
      if (s === 'click') {
        this.dialogTableVisible = true
      }
    },
    handleRowClick(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },

    deleteSelected() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请先选择要删除的数据');
        return;
      }

      // 遍历 multipleSelection 数组，将选中的行从 originalTableData 中删除
      this.multipleSelection.forEach(selectedRow => {
        const index = this.originalTableData.findIndex(row => row.number === selectedRow.number);
        if (index !== -1) {
          this.originalTableData.splice(index, 1);
        }
      });

      // 清空多选
      this.$refs.multipleTable.clearSelection();

      this.$message.success('删除成功');
    },
    startEditing(row) {
      // 设置编辑状态为 true
      row.editing1 = true;
      row.editing2 = true;
      row.editing3 = true;
      row.editing4 = true;

      // 使用 $nextTick 确保 el-input 已经被渲染
      this.$nextTick(() => {
        // 获取 el-input 的实例，并调用 focus 方法
        this.$refs.editInput.$refs.input.focus();
      });
    },
    saveRow(row) {
      // 保存完成后，设置编辑状态为 false
      row.editing = false;
    },
  }
}
</script>

<style scoped>
.bt2 {
  width: 190px;
  height: 100%;
  margin-left: 30px;
}
.el-form-item__label {
  line-height: 32px;
}
/deep/ .el-card__body {
  width: 100%;
}
.text {
  font-size: 14px;
}

.item {
  padding: 20px;
}

.box-card {
  width: 100%;
  height: 223px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.box-card2 {
  margin-top: 20px;
  width: 100%;
  height: 60px;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.box-card3 {
  margin-top: 20px;
  width: 100%;
  height: 100%;
}

.el-form-item {
  margin-bottom: 0;
}

.mallBox {
  width: 79%;
  margin: 0 auto;
}

.add-button {
  float: right; /* Adjust as needed for spacing */
}

.custom-table /deep/ .el-table__row {
  height: 181px !important;
}

.batch-operate-container {
  margin-top: 20px;
}
.btn {
  margin-left: 20px;
}
.block {
  float: right; /* Adjust as needed for spacing */
}
/deep/ .table-center {
  text-align: center;
}

</style>
