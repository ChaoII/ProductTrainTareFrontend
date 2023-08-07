<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue'
import type {FormInstance} from 'element-plus'
import type {SettingFormInterface} from "@/api/interface";
import {getSettingsApi, updateSettingApi} from "@/api/settings";
import {ElMessage} from "element-plus";

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<SettingFormInterface>({
  distanceSteel: 10,
  distanceCamera: 12,
  deviceName:"umf32-1",
  cameraAddress: "http://127.0.0.1:64"
})

onMounted(async () => {
  await getSettings();
})

const getSettings = async () => {
  const result = await getSettingsApi()
  if (result.data) {
    ruleForm.distanceSteel = result.data.distanceSteel
    ruleForm.distanceCamera = result.data.distanceCamera
    ruleForm.deviceName = result.data.deviceName
    ruleForm.cameraAddress = result.data.cameraAddress
  }
}

const jumpLink = async () => {
  window.open(ruleForm.cameraAddress, "_blank")
}

const updateSettings = async () => {
  await updateSettingApi(ruleForm)
  await getSettings()
  ElMessage.success("更新成功")
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await updateSettings()
}

</script>
<template>
  <el-card class="content-card">
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        label-width="180px"
        status-icon
    >
      <el-form-item label="设备名称：" prop="deviceName">
        <el-input v-model="ruleForm.deviceName"/>
      </el-form-item>
      <el-form-item label="磁钢-磁钢间距：" prop="distanceSteel">
        <el-input v-model="ruleForm.distanceSteel"/>
      </el-form-item>
      <el-form-item label="磁钢-摄像头间距：" prop="distanceCamera">
        <el-input v-model="ruleForm.distanceCamera"/>
      </el-form-item>
      <el-form-item label="摄像头访问地址：" prop="cameraAddress">
        <div style="width: 100%; display: flex">
          <el-input style="padding-right: 20px" v-model="ruleForm.cameraAddress"/>
          <el-button type="primary" @click="jumpLink">跳转</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          更新配置
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<style scoped>
.content-card {
  position: relative;
  width: 60%;
  height: calc(100vh - 52px);
}
</style>