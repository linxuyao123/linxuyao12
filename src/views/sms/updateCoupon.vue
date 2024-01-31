<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
      <el-form-item label="优惠券类型:">
        <el-select v-model="ruleForm.type">
          <el-option
              v-for="type in typeOptions"
              :key="type.value"
              :label="type.label"
              :value="type.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优惠券名称:" prop="name">
        <el-input v-model="ruleForm.name" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="适用平台:" required>
        <el-select v-model="ruleForm.platform">
          <el-option
              v-for="type in platformOptions"
              :key="type.value"
              :label="type.label"
              :value="type.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="总发行量：" prop="publishCount">
        <el-input v-model.number="ruleForm.publishCount" placeholder="只能输入正整数" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="面额：" prop="amount">
        <el-input v-model.number="ruleForm.amount" placeholder="面值只能是数值，限2位小数" class="input-width">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="每人限领:" prop="perLimit">
        <el-input v-model.number="ruleForm.perLimit" placeholder="只能输入正整数" class="input-width">
          <template slot="append">张</template>
        </el-input>
      </el-form-item>
      <el-form-item label="使用门槛：" prop="minPoint">
        <el-input v-model.number="ruleForm.minPoint" placeholder="只能输入正整数" class="input-width">
          <template slot="prepend">满</template>
          <template slot="append">元可用</template>
        </el-input>
      </el-form-item>
      <el-form-item label="领取日期：" prop="enableTime">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.enableTime" class="input-width"></el-date-picker>
      </el-form-item>
      <el-form-item label="有效期：" prop="desc">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.startTime" style="width: 150px"></el-date-picker>
        <span style="margin-left: 20px;margin-right: 20px">至</span>
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.endTime" style="width: 150px"></el-date-picker>
      </el-form-item>
      <el-form-item label="可使用商品：" prop="desc">
        <el-radio-group v-model="ruleForm.useType">
          <el-radio-button :label="0">全场通用</el-radio-button>
          <el-radio-button :label="1">指定分类</el-radio-button>
          <el-radio-button :label="2">指定商品</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注：" prop="desc">
        <el-input
            class="input-width"
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="ruleForm.note">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
const defaultCoupon = {
  type: 0,
  name: null,
  platform: 0,
  amount: null,
  perLimit: 1,
  minPoint: null,
  startTime: null,
  endTime: null,
  useType: 0,
  note: null,
  publishCount: null,
  productRelationList: [],
  productCategoryRelationList: []
};
const defaultPlatformOptions = [
  {
    label: '全平台',
    value: 0
  },
  {
    label: '移动平台',
    value: 1
  },
  {
    label: 'PC平台',
    value: 2
  }
];
const defaultTypeOptions = [
  {
    label: '全场赠券',
    value: 0
  },
  {
    label: '会员赠券',
    value: 1
  },
  {
    label: '购物赠券',
    value: 2
  },
  {
    label: '注册赠券',
    value: 3
  }
];
export default {
  data() {
    return {
      ruleForm: Object.assign({}, defaultCoupon),
      typeOptions: Object.assign({}, defaultTypeOptions),
      platformOptions: Object.assign({}, defaultPlatformOptions),
      rules: {
        name: [
          {required: true, message: '请输入优惠券名称', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
        publishCount: [
          {type: 'number',required: true, message: '只能输入正整数', trigger: 'blur'}
        ],
        amount: [
          {type: 'number',required: true,message: '面值只能是数值，0.01-10000，限2位小数',trigger: 'blur'}
        ],
        minPoint: [
          {type: 'number',required: true,message: '只能输入正整数',trigger: 'blur'}
        ]
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm = Object.assign({},defaultCoupon);
    },
  }
}
</script>

<style scoped>
.input-width {
  width: 60%;
}
.form-container {
  position: absolute;
  left: 0;
  right: 0;
  width: 720px;
  padding: 35px 35px 15px 35px;
  margin: 20px auto;
}
</style>