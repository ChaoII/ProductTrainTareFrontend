<script setup lang="ts">
import {Avatar, SwitchButton, Key} from '@element-plus/icons-vue'
import {ref} from "vue";
import useUserInfo from "@/stores/userInfo";
import router from "@/router";

const store = useUserInfo()
const logout = async () => {
  store.removeToken()
  await router.push("/login")
}

</script>

<template>
  <div class="outer">
    <div class="header">
      <el-menu class="menu center"
               :default-active="$route.path"
               :router="true"
               mode="horizontal"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
      >
        <el-menu-item index="/index">
          <el-icon>
            <Platform/>
          </el-icon>
          实时展示
        </el-menu-item>
        <el-menu-item index="/history">
          <el-icon>
            <Histogram/>
          </el-icon>
          历史数据
        </el-menu-item>
        <el-menu-item index="/users">
          <el-icon>
            <User/>
          </el-icon>
          用户管理
        </el-menu-item>
        <el-menu-item index="/setting">
          <el-icon>
            <Tools/>
          </el-icon>
          参数设置
        </el-menu-item>
      </el-menu>

      <el-popover placement="bottom" trigger="click" :width="100" popper-style="padding: 0px;"
                  popper-class="customPopper">
        <template #default>
          <div class="center btn-content">
            <div class="popper_btn">
              <el-button type="primary" link icon="Key">修改密码</el-button>
            </div>
            <div class="popper_btn">
              <el-button type="primary" link icon="SwitchButton" @click="logout">退出登录</el-button>
            </div>
          </div>
        </template>
        <template #reference>
          <el-button type="primary" icon="Avatar" link>{{ store.$state.username}}</el-button>
        </template>
      </el-popover>
    </div>
    <div class="main center">
      <router-view></router-view>
    </div>
  </div>
</template>


<style lang="scss">
body {
  margin: 0;
}

.el-popper.customPopper {
  min-width: 60px !important;
}

.popper_btn {
  padding: 5px 0 5px 0;
}

.btn-content {
  padding: 10px 0 10px 0;
  flex-direction: column;
}

.header {
  background: #545c64;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.outer {
  height: 100vh;
  padding: 0;
  margin: 0;
}

.menu {
  width: 60%;
  height: 52px;
}
</style>