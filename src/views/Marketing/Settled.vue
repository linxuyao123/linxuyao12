<template>
  <div class="login-big">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="login-box">
      <div class="login-title">
        <span>登录</span>
      </div>
      <el-form-item>
        <el-input
            placeholder="用户名"
            prefix-icon="el-icon-user"
            v-model="ruleForm.user"  autocomplete="off">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
            placeholder="密码"
            prefix-icon="el-icon-lock"
            v-model="ruleForm.pass"  autocomplete="off">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="button" @click="submitForm('ruleForm')" class="login-button"><span class="login-content">登录</span></el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        if (this.ruleForm.user !== '') {
          this.$refs.ruleForm.validateField('user');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.pass !== '') {
          this.$refs.ruleForm.validateField('pass');
        }
        callback();
      }
    };
    return {
      ruleForm: {
        user: '',
        pass: '',
      },
      rules: {
        user: [
          { validator: validatePass, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
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
  }
}
</script>

<style lang="less" scoped>
.login-big {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100vh;
  flex-direction: column-reverse;
  flex-wrap: nowrap;
  margin-right: 80px;
}

.login-box {
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #eee;
  background: #fff;
  box-shadow: 1px 1px 8px #aaa6a6;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: space-evenly;
  align-items: stretc
}

.login-title {
  display: flex;
  justify-content: center;
  margin-bottom: 35px;
  font-size: 24px;
  color: #444;
  letter-spacing: 4px;
}

.login-button {
  width: 100%;
}
</style>