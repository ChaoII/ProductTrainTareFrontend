<template>
  <div class="login_wrap">
    <div class="form_wrap">
      <el-form
          ref="formRef" :model="loginData" label-width="80px" class="demo-dynamic" :rules="rules" style="width: 300px">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="loginData.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon class="el-input__icon">
                <User/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="loginData.password" placeholder="请输入密码">
            <template #prefix>
              <el-icon class="el-input__icon">
                <Key/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="login_btn">
        <el-button type="primary" class="login_btn" @click="handleLogin">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {reactive, toRefs} from 'vue'
import {loginApi} from "@/api/users"
import {useRouter} from "vue-router";
import useUserInfo from "@/stores/userInfo";
import {Key, User} from '@element-plus/icons-vue'


export default {
  name: "login",
  setup() {
    const store = useUserInfo()
    const router = useRouter()
    const data = reactive({
      loginData: {
        username: "",
        password: ""
      },
      rules: {
        "username": [{required: true, message: "用户名不能为空", trigger: "blur"}],
        "password": [{required: true, message: "密码不能为空", trigger: "blur"}]
      }
    })
    const handleLogin = () => {
      // 请求后台接口
      loginApi(data.loginData).then(res => {
        if (res) {
          store.setUserInfo(res.data);
          console.log(store.getToken())
          // 跳转/user
          router.push({
            path: "/index"
          })
        }
      })
    }

    return {
      Key,
      ...toRefs(data),
      handleLogin
    }
  }
}
</script>
<style scoped>
.login_wrap {
  width: 100%;
  height: 100vh;
  background: rgb(56, 86, 139);
  position: relative;
}

.form_wrap {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px 20px;
  border-radius: 5px;
}

.login_btn {
  float: right;

}
</style>