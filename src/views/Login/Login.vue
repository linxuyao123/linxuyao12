<template>
  <div class="login-container1">
    <div class="login-intro"></div>
    <div class="login-form">
      <div class="login-title">
        <span>登录</span>
      </div>
      <div class="login-big">
        <el-form v-if="loginMode === 'username'" :model="usernameForm" :rules="usernameRules" ref="usernameForm"
                 label-width="100px" class="login-box">
          <el-form-item prop="name" class="login-input">
            <span prefix-icon="el-icon-user"></span>
            <el-input
                placeholder="用户名"
                prefix-icon="el-icon-user"
                v-model="usernameForm.name"
                autocomplete="off"
                class="custom-input"
            ></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
                class="custom-input"
                placeholder="密码"
                prefix-icon="el-icon-lock"
                v-model="usernameForm.pass"
                autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm" class="login-button">
              <span class="login-content">登录</span>
            </el-button>
          </el-form-item>
        </el-form>
        <el-form v-else-if="loginMode === 'phone'" :model="phoneForm" :rules="phoneRules" ref="phoneForm"
                 label-width="100px" class="login-box">
          <el-form-item prop="cellphone" class="login-input">
            <span prefix-icon="el-icon-user"></span>
            <el-input
                placeholder="手机号码"
                prefix-icon="el-icon-user"
                v-model="phoneForm.cellPhone"
                autocomplete="off"
            ></el-input>
          </el-form-item>
          <div class="flex-container" >
            <el-form-item prop="code" class="custom-input">
              <el-input
                  placeholder="验证码"
                  prefix-icon="el-icon-lock"
                  v-model="phoneForm.code"
                  autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="custom-input2"><span>发送验证码</span></el-button>
            </el-form-item>
          </div>
          <div class="flex-container">
            <el-form-item>
              <el-button type="primary" @click="submitForm" class="custom-input">
                <span class="login-content">登录</span>
              </el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="login-more">
        <el-button type="text" @click="switchMode('username')"><span class="info-color">账号密码登录</span></el-button>
        <el-button type="text" @click="switchMode('phone')"><span class="info-color">手机号验证码登录</span></el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginMode: 'username',
      usernameForm: {
        user: '',
        pass: '',
      },
      usernameRules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        pass: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, message: '长度在6个字符', trigger: 'blur'}
        ],
      },
      phoneForm: {
        cellPhone: '',
        code: '',
      },
      phoneRules: {
        cellPhone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {max: 11, message: '长度在11个字符', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
          {max: 4, message: '长度在4个字符', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    submitForm() {
      // 执行用户验证和后端接口调用
      // 模拟登录成功后跳转到首页
      this.$router.push('/');
    },
    sendVerificationCode() {
      // 实际发送验证码的逻辑
      console.log('Sending verification code...');
    },
    switchMode(mode) {
      this.loginMode = mode;
    }
  },
};
</script>

<style lang="less" scoped>
.login-container1 {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;

}

.flex-container2 {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
}

.login-intro {
  display: flex;
  flex-direction: column;
  width: 520px;
  flex: 0 1 auto
}

.login-form {
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #eee;
  background: #fff;
  box-shadow: 1px 1px 8px #aaa6a6;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;

}


.login-title {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  font-size: 24px;
  color: #444;
  letter-spacing: 4px;
}

.login-button {
  width: 320px;
  height: 45px;
  font-size: 18px;
  letter-spacing: 8px;
  margin-bottom: 10px;
}

.login-big {
  margin-right: 100px;
}

/* 添加此样式以设置custom-input和custom-button类的宽度 */
.custom-input {
  width: 320px;
}

.login-more {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: stretch;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 20px;
}

.info-color {
  color: #909399;
}

.flex-container {
  display: flex;
  margin-bottom: 10px; /* 可根据需要调整行之间的间距 */
}

.custom-input {
  flex: 1;
  margin-right: 3px; /* 可根据需要调整输入框之间的间距 */
}
</style>