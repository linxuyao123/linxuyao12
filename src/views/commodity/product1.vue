<template>
  <div class="bigcontainer">
    <el-card class="box-card">
      <el-steps :active="active" finish-status="success" class="card1" align-center>
        <el-step title="填写商品信息"></el-step>
        <el-step title="填写商品促销"></el-step>
        <el-step title="填写商品属性"></el-step>
        <el-step title="选择商品关联"></el-step>
      </el-steps>
      <el-form v-show="active === 0"  :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm"
               cell-class-name="table-center" header-cell-class-name="table-center">
        <el-form-item label="商品分类" prop="classify">
          <span class="demonstration"></span>
          <el-cascader
              v-model="ruleForm.classify"
              :options="options"
              @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="副标题" prop="subtitle">
          <el-input v-model="ruleForm.subtitle"></el-input>
        </el-form-item>
        <el-form-item label="商品品牌" prop="brand">
          <el-select v-model="ruleForm.brand" placeholder="请选择商品品牌">
            <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品介绍" prop="introduce">
          <el-input type="textarea" v-model="ruleForm.introduce"></el-input>
        </el-form-item>
        <el-form-item label="商品货号" prop="cord">
          <el-input v-model="ruleForm.cord"></el-input>
        </el-form-item>
        <el-form-item label="商品售价" prop="selling">
          <el-input v-model="ruleForm.selling"></el-input>
        </el-form-item>
        <el-form-item label="市场价" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" prop="inventory">
          <el-input v-model="ruleForm.inventory"></el-input>
        </el-form-item>
        <el-form-item label="计量单位" prop="measurement">
          <el-input v-model="ruleForm.measurement"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="heft">
          <el-input v-model="ruleForm.heft" class="poundage"></el-input><span>克</span>
        </el-form-item>
        <el-form-item label="排序" prop="reorder">
          <el-input v-model="ruleForm.reorder"></el-input>
        </el-form-item>
        <el-button type="primary" @click="nextStep('ruleForm')" class="market" size="small">下一步，填写商品促销</el-button>
      </el-form>

      <el-form v-show="active === 1" :model="Form2"  ref="Form2" label-width="100px" class="form">
        <!-- 表单项内容 -->
        <el-form-item label="赠送积分" prop="integral">
          <el-input v-model="Form2.integral"></el-input>
        </el-form-item>
        <el-form-item label="赠送成长值" prop="growth">
          <el-input v-model="Form2.growth"></el-input>
        </el-form-item>
        <el-form-item label="积分购买限制" prop="limit">
          <el-input v-model="Form2.limit"></el-input>
        </el-form-item>
        <el-form-item label="预告商品" prop="advance">
          <el-switch v-model="Form2.advance" active-text="" inactive-text=""></el-switch>
        </el-form-item>
        <el-form-item label="商品上架" prop="grounding">
          <el-switch v-model="Form2.grounding" active-text="" inactive-text=""></el-switch>
        </el-form-item>
        <el-form-item label="商品推荐" prop="recommend">
          <span>新品</span><el-switch v-model="switch1" class="kaiguan1"></el-switch>
          <span>推荐</span><el-switch v-model="switch2" class="kaiguan2"></el-switch>
        </el-form-item>
        <el-form-item label="服务保证" prop="guarantee">
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="详细页标题" prop="headline">
          <el-input v-model="Form2.headline"></el-input>
        </el-form-item>
        <el-form-item label="详细页描述" prop="depict">
          <el-input v-model="Form2.depict"></el-input>
        </el-form-item>
        <el-form-item label="商品关键字" prop="keywords">
          <el-input v-model="Form2.keywords"></el-input>
        </el-form-item>
        <el-form-item label="商品备注" prop="notes">
          <el-input type="textarea" v-model="Form2.notes"></el-input>
        </el-form-item>
        <el-form-item label="选择优惠方式" prop="ways">
          <el-radio-group v-model="selectedOption">
            <el-radio-button label="无优惠"></el-radio-button>
            <el-radio-button label="特惠促销" ></el-radio-button>
            <el-radio-button label="会员价格"></el-radio-button>
            <el-radio-button label="阶梯价格"></el-radio-button>
            <el-radio-button label="满减价格"></el-radio-button>
          </el-radio-group>
          <el-form v-show="selectedOption === '特惠促销'" >
            <el-form-item label="开始时间" class="MallBox2">
              <el-date-picker
                  v-model="startDate"
                  type="datetime"
                  placeholder="选择开始时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" class="MallBox1">
              <el-date-picker
                  v-model="endDate"
                  type="datetime"
                  placeholder="选择结束时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="促销价格" class="MallBox1">
              <el-input v-model="specialOfferPrice" placeholder="请输入促销价格" class="promo-input"></el-input>
            </el-form-item>
          </el-form>
        </el-form-item>
        <el-form v-show="selectedOption === '会员价格'">
          <div >
            <el-form-item label="黄金会员" class="MallBox">
              <el-input
                  v-model="gold"
                  placeholder="请输入促销价格"
                  class="promo-input2"
              ></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="白金会员" class="MallBox">
              <el-input
                  v-model="platinum"
                  placeholder="请输入促销价格"
                  class="promo-input3"
              ></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="钻石会员" class="MallBox">
              <el-input
                  v-model="diamond"
                  placeholder="请输入促销价格"
                  class="promo-input4"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>

        <el-form v-show="selectedOption === '阶梯价格'">
          <el-table
              :data="tableData2"
              style="width: 100%" class="MallBox4">
            <el-table-column
                prop="fund"
                label="数量"
                width="80">
              <template slot-scope="scope">
                <span v-if="!scope.row.editing1" @click="startEditing(scope.row)">{{ scope.row.fund }}</span>
                <el-input
                    v-else
                    v-model="scope.row.fund"
                    ref="editInput"
                    @blur="saveRow(scope.row)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
                prop="rebate"
                label="折扣"
                width="80">
              <template slot-scope="scope">
                <span v-if="!scope.row.editing2" @click="startEditing(scope.row)">{{ scope.row.rebate }}</span>
                <el-input
                    v-else
                    v-model="scope.row.rebate"
                    ref="editInput"
                    @blur="saveRow(scope.row)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="rebate" label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="text" @click="deleteRow(scope.row)">删除</el-button>
                <el-button type="text" @click="addRow(scope.row)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>

        <el-form v-show="selectedOption === '满减价格'">
          <el-table
              :data="tableData3"
              style="width: 100%" class="MallBox4">
            <el-table-column
                prop="full"
                label="满"
                width="80">
              <template slot-scope="scope">
                <span v-if="!scope.row.editing3" @click="startEditing(scope.row)">{{ scope.row.full }}</span>
                <el-input
                    v-else
                    v-model="scope.row.full"
                    ref="editInput"
                    @blur="saveRow(scope.row)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
                prop="minus"
                label="减"
                width="80">
              <template slot-scope="scope">
                <span v-if="!scope.row.editing4" @click="startEditing(scope.row)">{{ scope.row.minus }}</span>
                <el-input
                    v-else
                    v-model="scope.row.minus"
                    ref="editInput"
                    @blur="saveRow(scope.row)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="rebate" label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="text" @click="deleteRow2(scope.row)">删除</el-button>
                <el-button type="text" @click="addRow2(scope.row)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>

        <!-- 下一步按钮 -->
        <div>
          <el-form-item class="bt1">
            <el-button type="primary" @click="prevStep" size="small" class="bt2">上一步,填写商品信息</el-button>
            <el-button type="primary" @click="nextStep('Form2')" size="small" class="bt3">下一步，填写商品属性</el-button>
          </el-form-item>
        </div>
      </el-form>

      <el-form v-show="active === 2" :model="Form3"  ref="Form3" label-width="100px" class="form">
        <!-- 表单项内容 -->
        <el-form-item label="属性类型：" prop="attribute">
          <el-select v-model="Form3.attribute" placeholder="请选择属性类型">
            <el-option
                v-for="item in option3"
                :key="item.value1"
                :label="item.label"
                :value="item.value1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品规格：" prop="specifications1">
          <el-input v-model="Form3.specifications1" placeholder=""  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="商品参数：" prop="parameter">
          <el-card class="box-card">
          </el-card>
        </el-form-item>
        <el-form-item label="商品相册：" prop="album">
          <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品详情：" prop="details">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="电脑端详情" name="computer">
              <el-input
                  v-model="computerDetails"
                  type="textarea"
                  :rows="6"
              ></el-input>
            </el-tab-pane>
            <el-tab-pane label="手机端详情" name="mobile">
              <el-input
                  v-model="mobileDetails"
                  type="textarea"
                  :rows="6"
              ></el-input>
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
        <div>
          <el-form-item class="bt1">
            <el-button type="primary" @click="prevStep" size="small" class="bt2">上一步,填写商品促销</el-button>
            <el-button type="primary" @click="nextStep('Form2')" size="small" class="bt3">下一步，选择商品关联</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-form v-show="active === 3" :model="Form4"  ref="Form4" label-width="100px" class="form">
        <!-- 表单项内容 -->
        <el-form-item label="关联专题：" prop="subject" class="guanlian">
          <div style="text-align: center">
            <el-transfer
                style="text-align: left; display: inline-block"
                v-model="value2"
                filterable
                :filter-method="filterMethod1"
                filter-placeholder="请输入专题名称"
                :left-default-checked="[]"
                :right-default-checked="[]"
                :titles="['待选择', '已选择']"
                :button-texts="['', '']"
                :format="{noChecked: '${total}',
                          hasChecked: '${checked}/${total}'}"
                @change="handleChange1"
                :data="data">
              <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
              <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
            </el-transfer>
          </div>
        </el-form-item>
        <el-form-item label="关联优选：" prop="Preferred" class="guanlian">
          <el-transfer
              filterable
              :filter-method="filterMethod2"
              filter-placeholder="请输入优选名称"
              :titles="['待选择', '已选择']"
              v-model="value4"
              :data="data2">
            <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
            <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
          </el-transfer>
        </el-form-item>
        <div>
          <el-form-item class="bt1">
            <el-button type="primary" @click="prevStep" size="small" class="bt2">上一步,填写商品属性</el-button>
            <el-button type="primary"  size="small"  @click="submitProductForm" class="bt3">完成，提交商品</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
const cityOptions = ['无忧退货', '快速退款', '免费包邮'];
export default {
  data() {
    const generateData = () => {
      const data = [];
      const cities = ['polo衬衫的也时尚', '大牌手机低价秒', '晓龙845新品上市', '夏天应该穿什么', '夏季精选', '品牌手机降价', '测试用专题'];
      const pinyin = ['polo衬衫的也时尚', '大牌手机低价秒', '晓龙845新品上市', '夏天应该穿什么', '夏季精选', '品牌手机降价', '测试用专题'];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        });
      });
      return data;
    };
    const generateData2 = () => {
      const data2 = [];
      const cities = ['让音质更出众', '让音质更出众22', '让音质更出众33', '让音质更出众44'];
      const pinyin = ['让音质更出众', '让音质更出众22', '让音质更出众33', '让音质更出众44'];
      cities.forEach((city, index) => {
        data2.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        });
      });
      return data2;
    };
    return {
      activeName: 'computer',
      computerDetails: '',
      mobileDetails: '',
      tableData2:[{
        fund:'0',
        editing1:true,
        rebate:'0',
        editing2:true,
        manage:'',
      }],
      tableData3:[{
        full:'0',
        editing3:true,
        minus:'0',
        editing4:true,
        manage:'',
      }],
      dialogImageUrl: '',
      dialogVisible: false,
      isAddingRow: false,
      isAddingRow1:false,
      gold:'',
      diamond:'',
      platinum:'',
      input1:'',
      specialOfferPrice:'',
      selectedOption: '无优惠',
      startDate: '',
      endDate: '',
      radio1:'无优惠',
      checkAll: false,
      checkedCities: ['', ''],
      cities: cityOptions,
      isIndeterminate: true,
      switch1:false,
      switch2:false,
      classify1:[],
      active:0,
      value:'',
      value1:'',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      ruleForm: {
        classify:'',
        name: '',
        subtitle: '',
        introduce: '',
        cord: '',
        selling:'',
        inventory: '',
        measurement: '',
        heft: '',
        reorder:'',

      },
      Form2: {
        integral:'',
        growth:'',
        limit:'',
        advance:'',
        grounding:'',
        recommend:'',
        guarantee:'',
        headline:'',
        depict:'',
        keywords:'',
        notes:'',
        ways:'',
      },
      Form3: {
        attribute:'',
        specifications1:'',
        album:'',
        parameter:'',
        details:'',
      },
      Form4: {
        subject:'',
        Preferred:'',
      },
      rules: {
        classify: [
          { required: true, message: '请选择商品分类', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        subtitle: [
          { required: true, message: '请输入商品副标题', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        brand: [
          { required: true, message: '请选择商品品牌', trigger: 'change' }
        ],
      },
      options:[{
        value: 'clothing',
        label: '服装',
        children: [{
          value: 'waitao',
          label: '外套'
        }]
      },{
        value:'shoujishuma',
        label:'手机数码',
        children: [{
          value:'tongxun',
          label:'手机通讯'
        },{
          value:'peijiang',
          label: '手机配件',
        },{
          value:'sheying',
          label:'摄影摄像'
        }]
      }],
      options2: [{
        value: '选项1',
        label: '小米'
      }, {
        value: '选项2',
        label: '七匹狼'
      }, {
        value: '选项3',
        label: '海澜之家'
      }, {
        value: '选项4',
        label: '苹果'
      }, {
        value: '选项5',
        label: '三星'
      }, {
        value: '选项6',
        label: '格力'
      }],
      option3: [{
        value: '选项1',
        label: '服装-T恤'
      }, {
        value: '选项2',
        label: '服装-裤装'
      }, {
        value: '选项3',
        label: '手机数码-手机通讯'
      }, {
        value: '选项4',
        label: '配件'
      }, {
        value: '选项5',
        label: '居家'
      }, {
        value: '选项6',
        label: '洗护'
      }],
      data: generateData(),
      value2: [1],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
      data2: generateData2(),
      value4: [],
      filterMethod2(query, item) {
        return item.pinyin.indexOf(query) > -1;
      }
    }
  },
  methods: {
    nextStep(formRef) {
      console.log('点击下一步');
      const currentForm = this.$refs[formRef];
      if (currentForm) {
        currentForm.validate((valid) => {
          if (valid) {
            console.log('表单有效。进行下一步。');
            this.active++;
          } else {
            console.log('表单验证失败。');
          }
        });
      }
    },
    prevStep() {
      if (this.active > 0) {
        this.active--;
      }
    },
    handleChange(classify1) {
      console.log(classify1);
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    startEditing(row) {
      // 设置编辑状态为 true
      row.editing1 = true;
      row.editing2 = true;
      row.editing3 = true;

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
    deleteRow(row) {
      // 清空当前行的输入框值
      row.fund = '0';
      row.rebate = '0';
    },
    addRow(row) {
      // 如果不是处于添加行状态，则保存第一行的数据
      if (!this.isAddingRow) {
        // 保存第一行的数据
        const firstRowData = { ...this.tableData2[0] };
        console.log('Saved first row data:', firstRowData);
      }

      // 创建新的行数据，这里可以根据需求自定义
      const newRow = { fund: '0', rebate: '0', editing1: true, editing2: true };
      // 在当前行的下方插入新的行数据
      const index = this.tableData2.indexOf(row);
      this.tableData2.splice(index + 1, 0, newRow);
      // 设置标志位为 true，表示当前处于添加行状态
      this.isAddingRow = true;
    },
    deleteRow2(row) {
      // 清空当前行的输入框值
      row.full = '0';
      row.minus = '0';
    },
    addRow2(row) {
      // 如果不是处于添加行状态，则保存第一行的数据
      if (!this.isAddingRow1) {
        // 保存第一行的数据
        const firstRowData1 = {...this.tableData3[0]};
        console.log('Saved first row data:', firstRowData1);
      }

      // 创建新的行数据，这里可以根据需求自定义
      const newRow = {full: '0', minus: '0', editing3: true, editing4: true};
      // 在当前行的下方插入新的行数据
      const index = this.tableData3.indexOf(row);
      this.tableData3.splice(index + 1, 0, newRow);
      // 设置标志位为 true，表示当前处于添加行状态
      this.isAddingRow1 = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleChange1(value2, direction, movedKeys) {
      console.log(value2, direction, movedKeys);
    },
    submitAllForms() {
      // 验证所有表单
      const forms = [this.$refs.ruleForm, this.$refs.Form2, this.$refs.Form3, this.$refs.Form4];

      let isValid = true;

      forms.forEach((form) => {
        form.validate((valid) => {
          isValid = isValid && valid;
        });
      });

      if (isValid) {
        // 所有表单验证通过，可以保存数据或者执行其他操作
        console.log('所有表单验证通过');

        // 获取所有表单数据
        const formData = {
          ruleForm: this.ruleForm,
          Form2: this.Form2,
          Form3: this.Form3,
          Form4: this.Form4,
        };

        // 在这里执行保存数据的逻辑，可以发送到服务器或在前端存储
        // 示例：保存到本地存储
        localStorage.setItem('allFormData', JSON.stringify(formData));

        // 在这里执行提交商品的逻辑，可以调用后端接口
        // 示例：调用提交商品接口
        this.submitProductToServer();
      } else {
        console.log('表单验证失败');
      }
    },

    // 示例：提交商品到服务器的方法
    submitProductToServer() {
      // 在这里调用后端接口，将商品数据提交到服务器
      console.log('调用后端接口，提交商品到服务器');
      // 这里只是一个示例，实际项目中需要根据后端接口进行相应的处理
    },

    filterMethod1() {

    },
  }
}
</script>

<style scoped>

.transfer-footer {
  margin-left: 20px;
  padding: 6px 5px;
}

.bigcontainer {
  width: 83%;
  position: absolute;
  margin: 2px auto;


}
.box-card {
  width: 100%;
  height: 100%;

}
.card1 {
  display: flex;
  padding: 20px;
}
.el-steps {
  /* 设置步骤容器的字体大小和图标大小 */
  font-size: 16px;
}

/* 设置 el-step 的样式，改变步骤的大小 */
.el-step {
  /* 设置步骤的宽度和高度 */
  width: 40px;
  height: 40px;
}
.demo-ruleForm {
  margin-top: 50px;
}
.poundage {
  width: 250px;
  margin-right: 20px;
}
/deep/ .table-center {
  text-align: center;
}

.market {
  margin-left: 50%;
}
.kaiguan1 {
  margin-left: 10px;
  margin-right: 10px;
}
.kaiguan2 {
  margin-left: 10px;
}

.promo-input{
  height: 40px;
  width: 220px;
}

.MallBox {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  margin-top: 0;
  left: 100px;
}
.MallBox2 {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}

.MallBox1 {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  margin-top: 0;
}
.bt1{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-end;
}
.MallBox4 {
  margin-left: 100px;
  margin-top: 0;
}
.guanlian {
  margin-top: 70px;
  display: flex;
}

</style>