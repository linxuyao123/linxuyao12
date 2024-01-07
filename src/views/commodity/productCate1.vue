<template>
  <div class="bigcontainer">
    <el-card class="box-card">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="上级分类" prop="classification">
          <el-select v-model="selectedOption" placeholder="请选择活动区域">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量单位" prop="unit">
          <el-input v-model="ruleForm.unit"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="recorder">
          <el-input v-model="ruleForm.recorder"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="flash">
          <el-radio v-model="radio" label="1">是</el-radio>
          <el-radio v-model="radio" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否显示在导航栏" prop="bar">
          <el-radio v-model="radio2" label="1">是</el-radio>
          <el-radio v-model="radio2" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="分类图标" prop="logo">
          <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="筛选属性" prop="Properties">
          <span class="demonstration"></span>
          <el-cascader
              v-model="ruleForm.Properties"
              :options="options1"
              @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="关键词" prop="keywords">
          <el-input v-model="ruleForm.keywords"></el-input>
        </el-form-item>
        <el-form-item label="分类描述" prop="description">
          <el-input v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item>
          <button type="button" onclick="saveAndSubmit()">确定</button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {

      fileList: [
        { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
      ],
      radio: '1',
      radio2: '1',
      ruleForm: {
        name: '',
        classification: '',
        unit: '',
        recorder: '',
        flash: '',
        bar: '',
        logo:'',
        Properties:'',
        keywords:'',
        description:'',
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
      },
      options: [
        { value: '选项1', label: '无上级分类' },
        { value: '选项2', label: '服装' },
        { value: '选项3', label: '手机数码' },
        { value: '选项4', label: '家用电器' },
        { value: '选项5', label: '家具家装' },
        { value: '选项6', label: '汽车用品' },
        { value: '选项7', label: '电脑办公' }
      ],
      selectedOption: '无上级分类',
      options1:[{
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
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleChange(Properties) {
      console.log(Properties);
    },
  }
};
</script>


<style scoped>

</style>