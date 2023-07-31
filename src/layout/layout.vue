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
    </div>
    <div class="main center">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>

</script>
<style>
body {
  margin: 0;
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