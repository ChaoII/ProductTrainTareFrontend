<template>
  <el-card class="content-card">

    <el-form :label-position="'right'" :inline="true" :model="formInline" class="demo-form-inline">
      <div>
        <el-form-item label="磁钢间距">
          <el-input v-model="formInline.user" placeholder="磁钢间距" clearable/>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="磁钢与摄像头间距">
          <el-input v-model="formInline.user" placeholder="磁钢与摄像头间距" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Query</el-button>
        </el-form-item>
      </div>

    </el-form>


    <div style="display: flex">
      <el-text style="padding-right: 20px" class="mx-1" type="primary">摄像头地址:</el-text>
      <div style="padding-right: 20px">
        <el-input
            v-model="input1"
            class="w-50 m-2"
            placeholder="Pick a date"
            :suffix-icon="Calendar"
        />
      </div>

      <el-button type="primary" @click="onSubmit">打开摄像头</el-button>
    </div>


  </el-card>
</template>

<script>


export default {
  name: "setting",
  setup() {
    const formInline = {
      user: "1231",
      name: "asda",
      age: 123
    }
    return {
      formInline
    }
  }
}

</script>

<style scoped>
.content-card {
  position: relative;
  width: 60%;
  height: calc(100vh - 52px);
}
</style>