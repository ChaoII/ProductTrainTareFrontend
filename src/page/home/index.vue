<script setup lang="ts">

import {Search, ArrowLeftBold, ArrowRightBold} from '@element-plus/icons-vue'
import {nextTick, onMounted, reactive, ref, watch} from 'vue'
import type {Ref} from 'vue'
import {getComingTimeApi, getHistoryApi, updateHistoryApi} from "@/api/history";
import type {OptionsInterface, TableDataInterface} from "@/page/home/interface";
import {host} from "@/utils/service";
import type {GetHistoryInterface, UpdateHistoryInterface} from "@/api/interface";
import {ElMessage} from "element-plus";
import type {FormInstance, FormRules} from "element-plus";

const currentDate = new Date()
const currentDay = currentDate.getDate();
const previousDay = currentDay + 1
currentDate.setDate(previousDay)
const totalPage = ref(0)
const dateTimeStart = ref<Date>(new Date())
const dateTimeEnd = ref<Date>(currentDate)

const optionValue = ref("")
const options: Ref<OptionsInterface[]> = ref([]);
const curCount = ref(0)
const curTrainId = ref("")
const curImgUrl = ref("")
const trainDataDetail: Ref<UpdateHistoryInterface> = ref({
  id:"",
  trainMode: "-",
  trainNum: "-",
  deadWeight: 0.0,
  roughWeight: 0.0,
  volume: 0.0,
  length: 0.0,
});
const myElement = ref<HTMLElement | null>(null);
const tableHeight = ref(0); // 默认最大高度为200px
const trainFormRef = ref<FormInstance>();
// 动态设置表格最大高度
const setTableHeight = async () => {
  const ele = myElement.value as HTMLElement;
  if (ele) {
    tableHeight.value = ele.offsetHeight - 200;
  }
};
window.addEventListener('resize', setTableHeight);
const getHistory = async () => {
  const res = await getComingTimeApi({
    startTime: dateTimeStart.value,
    endTime: dateTimeEnd.value
  })
  if (res.data.history) {
    for (const r of res.data.history) {
      options.value.push({
        trainId: r.trainId,
        label: r.comingTime,
        value: r.comingTime,
        count: r.count
      })
    }
    optionValue.value = options.value[0].value
    curCount.value = options.value[0].count
    curTrainId.value = options.value[0].trainId
    await updateHistory()
  } else {
    curCount.value = 0
    options.value.length = 0
    optionValue.value = ""
    curTrainId.value = ""
    await updateHistory()
  }
}

const previewImage = (row: any) => {
  window.open(row.imgUrl, "_blank")
}

const queryParams: GetHistoryInterface = reactive({
  trainId: "",
  pageSize: 5,
  pageIndex: 1
});
const updateHistory = async () => {
  tempTableData1.value.length = 0
  queryParams.trainId = curTrainId.value
  const res = await getHistoryApi(queryParams)
  if (res.data.history) {
    tableData.value = res.data.history
    totalPage.value = res.data.total
    tempTableData1.value = res.data.history
    tempTableData1.value.map((obj) => {
      let imgUrl_ = obj.imgUrl.replace(/\\/g, '/')
      obj.imgUrl = host + '/' + imgUrl_
    })
    trainDataDetail.value = tempTableData1.value[curIndex.value]
    curImgUrl.value = tempTableData1.value[curIndex.value].imgUrl
  } else {
    tempTableData1.value.length = 0
  }
  await updateIndex()
}
const changeItem = async (value: any) => {
  const selectedIndex = options.value.findIndex(item => item.value === value);
  curCount.value = options.value[selectedIndex].count
  curTrainId.value = options.value[selectedIndex].trainId
  await updateHistory()
}

const updateTrainDetail = async () => {
  console.log(trainDataDetail.value)
  const res = await updateHistoryApi(trainDataDetail.value)
  if (res.data && res.data > 0) {
    ElMessage.success("数据更新成功")
  } else {
    ElMessage.error("数据更新失败")
  }
}

const rules = reactive<FormRules<UpdateHistoryInterface>>({
  trainMode: [
    {required: true, message: 'Please input old password', trigger: 'blur'},
    {min: 3, max: 4, message: 'Length should be 6 to 16', trigger: 'blur'},
  ],
  trainNum: [
    {required: true, message: 'Please input old password', trigger: 'blur'},
    {len: 7, message: 'Length should be 6', trigger: 'blur'},
  ],
  deadWeight: [
    {required: true, message: 'Please input old password', trigger: 'blur'},
    {min: 6, max: 16, message: 'Length should be 6 to 16', trigger: 'blur'},
  ],
  roughWeight: [
    {required: true, message: 'Please input old password', trigger: 'blur'},
    {min: 6, max: 16, message: 'Length should be 6 to 16', trigger: 'blur'},

  ],
  volume: [
    {required: true, message: 'Please input old password', trigger: 'blur'},
    {min: 6, max: 16, message: 'Length should be 6 to 16', trigger: 'blur'},

  ],
  length: [
    {required: true, message: 'Please input old password', trigger: 'blur'},
    {min: 6, max: 16, message: 'Length should be 6 to 16', trigger: 'blur'},

  ],
});

const submitTrainDetailForm = async (formEl: FormInstance | undefined) => {
  const isValid = await formEl?.validate()
  if (!isValid) {
    return
  }
  await updateTrainDetail()
}


const tableData: Ref<TableDataInterface[]> = ref([])

const tempTableData1: Ref<TableDataInterface[]> = ref([])
const timer: Ref<number> = ref(0);
onMounted(async () => {
  await setTableHeight();
  await initBtn()
})


const curIndex = ref(0)
const prevIndex = ref(0)
const nextIndex = ref(0)

const prev_ = () => {
  if (curIndex.value == 0) {
    prevDisabled.value = true
    return
  }
  curIndex.value--;
}

const next_ = () => {
  if (curIndex.value == tempTableData1.value.length - 1) {
    nextDisabled.value = true
    return
  }
  curIndex.value++;
}

const prevDisabled = ref(false)
const nextDisabled = ref(false)

const initBtn = async () => {
  if (tempTableData1.value.length == 0) {
    prevDisabled.value = true;
    nextDisabled.value = true;
  } else {
    prevDisabled.value = false;
    nextDisabled.value = false;
  }
}

const updateIndex = async () => {
  if (tempTableData1.value.length > 0) {
    prevDisabled.value = true
    nextDisabled.value = false
    nextIndex.value = tempTableData1.value.length - 1
  } else {
    prevDisabled.value = true
    nextDisabled.value = true
    nextIndex.value = 0
  }
}


watch(curIndex, (newValue, oldValue) => {
  if (tempTableData1.value.length == 0) {
    return
  }
  if (newValue == 0) {
    prevIndex.value = 0
    nextIndex.value = tempTableData1.value.length - 1
    prevDisabled.value = true
    nextDisabled.value = false
  } else if (newValue == tempTableData1.value.length - 1) {
    prevIndex.value = tempTableData1.value.length - 1
    nextIndex.value = 0
    prevDisabled.value = false
    nextDisabled.value = true
  } else {
    prevIndex.value = newValue
    nextIndex.value = tempTableData1.value.length - newValue - 1
    prevDisabled.value = false
    nextDisabled.value = false
  }
  trainDataDetail.value = tempTableData1.value[curIndex.value]
  curImgUrl.value = tempTableData1.value[curIndex.value].imgUrl
}, {deep: true})

</script>
<template>
  <el-card class="content-card">
    <el-card style="height: 300px" :body-style="{ padding: '0px' }">
      <el-row :gutter="8">
        <el-col :span="12">
          <el-image style="width: 100%; height: 300px" :src="''" :fit="'cover'"/>
        </el-col>
        <el-col :span="12">
          <div style="display: flex ;height: 300px">
            <div style="position:relative; width: 75%">
              <div class="next_btn_container center">
                <el-button circle :disabled="nextDisabled" @click="next_">
                  <el-icon>
                    <ArrowRightBold/>
                  </el-icon>
                </el-button>
              </div>
              <div class="pre_btn_container center">
                <el-button circle :disabled="prevDisabled" @click="prev_">
                  <el-icon>
                    <ArrowLeftBold/>
                  </el-icon>
                </el-button>
              </div>
              <div class="text_pre_next_container">
                <el-text class="text_container center">剩余{{ prevIndex }}节</el-text>
                <el-text class="text_container center">当前第{{ curIndex + 1 }}节</el-text>
                <el-text class="text_container center">剩余{{ nextIndex }}节</el-text>
              </div>
              <el-image :preview-src-list="[curImgUrl]" :initial-index="0" style="width: 100%;height: 300px"
                        :src="curImgUrl" :fit="'cover'"/>
            </div>

            <el-form
                style="padding-top: 15px"
                ref="trainFormRef"
                :model="trainDataDetail"
                label-width="80px"
                status-icon
                size="small"
            >
              <el-form-item label="车型：" prop="trainMode">
                <el-input style="padding-right: 20px;" v-model="trainDataDetail.trainMode"/>
              </el-form-item>
              <el-form-item label="车号：" prop="trainNum">
                <el-input style="padding-right: 20px" v-model="trainDataDetail.trainNum"/>
              </el-form-item>
              <el-form-item label="自重：" prop="deadWeight">
                <el-input style="padding-right: 20px" v-model="trainDataDetail.deadWeight">
                  <template #append>吨</template>
                </el-input>
              </el-form-item>
              <el-form-item label="载重：" prop="roughWeight">
                <el-input style="padding-right: 20px" v-model="trainDataDetail.roughWeight">
                  <template #append>吨</template>
                </el-input>
              </el-form-item>
              <el-form-item label="容积：" prop="volume">
                <el-input style="padding-right: 20px" v-model="trainDataDetail.volume">
                  <template #append>立方米</template>
                </el-input>
              </el-form-item>
              <el-form-item label="换长：" prop="length">
                <el-input style="padding-right: 20px" v-model="trainDataDetail.length">
                  <template #append>米</template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitTrainDetailForm(trainFormRef)">修改</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-divider/>
    <div style="position: relative; height: calc(100vh - 440px)" ref="myElement">
      <el-card>
        <div style="display: flex;justify-content: space-between;">
          <div style="   display: flex;">
            <div style="width: 400px; display: flex; padding-right: 10px;">
              <el-date-picker
                  v-model="dateTimeStart"
                  type="datetime"
                  format="YYYY-MM-DD HH:mm:ss"
              />
              <el-text style="padding: 0 5px 0 5px">到</el-text>
              <el-date-picker
                  v-model="dateTimeEnd"
                  type="datetime"
                  format="YYYY-MM-DD HH:mm:ss"
              />
            </div>
            <div>
              <el-button type="primary" :icon="Search" @click="getHistory">搜索</el-button>
            </div>
          </div>
          <div style=" display: flex;">
            <el-text class="mx-1" type="primary">火车进站时间:</el-text>
            <div style="width: 200px;display: flex;padding: 0 10px 0 10px;">
              <el-select v-model="optionValue" class="m-2" placeholder="请选择火车进站时间" @change="changeItem">
                <el-option
                    v-for="(item, index) in options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :default-first-option="true"
                />
              </el-select>
            </div>
            <el-text class="mx-1">车厢数量：</el-text>
            <el-text class="mx-1" type="primary" style="width: 30px">{{ curCount }}</el-text>
          </div>
        </div>
        <el-divider/>
        <el-table
            :height="tableHeight"
            :max-height="tableHeight"
            :stripe="true"
            :data="tableData"
            style="width: 100%"
        >
          <el-table-column type="index" width="50"/>
          <el-table-column prop="dateTime" label="时间" width="180"/>
          <el-table-column prop="trainMode" label="车型" width="100"/>
          <el-table-column prop="trainNum" label="车号" width="100"/>
          <el-table-column prop="deadWeight" label="自重(t)" width="100"/>
          <el-table-column prop="roughWeight" label="载重(t)" width="100"/>
          <el-table-column prop="volume" label="容积(m³)" width="100"/>
          <el-table-column prop="length" label="换长(m)" width="100"/>
          <el-table-column prop="imgUrl" label="图片地址">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="previewImage(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="position: absolute; right: 20px; bottom: 20px; display: flex;justify-content:flex-end">
          <el-pagination
              v-model:current-page="queryParams.pageIndex"
              v-model:page-size="queryParams.pageSize"
              :page-sizes="[10,15]"
              :small="true"
              layout="total, sizes, prev, pager, next, jumper"
              :background="true"
              :total="totalPage"
              @size-change="updateHistory"
              @current-change="updateHistory"
          />
        </div>
      </el-card>
    </div>
  </el-card>
</template>
<style scoped>

body {
  margin: 0;
}

.pre_btn_container {
  position: absolute;
  z-index: 4;
  left: 10px;
  width: 5%;
  height: 100%;
}

.next_btn_container {

  position: absolute;
  height: 100%;
  width: 5%;
  right: 5px;
  z-index: 4;
}

.text_pre_next_container {
  position: absolute;
  width: 95%;
  left: 5px;
  top: 5px;
  z-index: 4;
  display: flex;
  justify-content: space-between
}

.text_container {
  color: #ffffff;
}

.el-col_text {
  height: 30px;
  text-align: center;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-card {
  width: 60%;
  height: calc(100vh - 52px);
}

</style>

