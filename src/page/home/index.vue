<script setup lang="ts">

import {Search, ArrowLeftBold, ArrowRightBold} from '@element-plus/icons-vue'
import {onMounted, onUnmounted, reactive, ref, watch} from 'vue'
import type {Ref} from 'vue'
import {getComingTimeApi, getHistoryApi, getLatestHistoryApi, getLatestPictureApi} from "@/api/history";
import type {TableDataInterface} from "@/page/home/interface";
import {host} from "@/utils/service";
import type {OptionsInterface} from "@/page/history/interface";
import type {GetHistoryInterface} from "@/api/interface";


const timeRange = ref<[Date, Date]>([
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0),
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59)
])
const optionValue = ref("")
const options: Ref<OptionsInterface[]> = ref([]);
const curCount = ref(0)
const curTrainId = ref("")
const curImgUrl = ref("")

const getHistory = async () => {
  const res = await getComingTimeApi({
    startTime: timeRange.value[0],
    endTime: timeRange.value[1]
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

const queryParams: GetHistoryInterface = reactive({
  trainId: "",
  pageSize: 200,
  pageIndex: 1
});
const updateHistory = async () => {
  tempTableData1.value.length = 0
  queryParams.trainId = curTrainId.value
  const res = await getHistoryApi(queryParams)
  if (res.data.history) {
    tempTableData1.value = res.data.history
    tempTableData1.value.map((obj) => {
      let imgUrl_ = obj.imgUrl.replace(/\\/g, '/')
      obj.imgUrl = host + '/' + imgUrl_
    })
    tempTableData2.value[0] = tempTableData1.value[curIndex.value]
    curImgUrl.value = tempTableData1.value[curIndex.value].imgUrl
  } else {
    tempTableData1.value.length = 0
  }
}
const changeItem = async (value: any) => {
  const selectedIndex = options.value.findIndex(item => item.value === value);
  curCount.value = options.value[selectedIndex].count
  curTrainId.value = options.value[selectedIndex].trainId
  await updateHistory()
}


const tableData: Ref<TableDataInterface[]> = ref([{
  trainMode: "-",
  trainNum: "-",
  deadWeight: 0,
  roughWeight: 0,
  volume: 0,
  length: 0,
  imgUrl: "-"
}])

const tempTableData1: Ref<TableDataInterface[]> = ref([])
const tempTableData2: Ref<TableDataInterface[]> = ref([])

const latestPictureImage = ref("")
const latestHistoryImage = ref("")

const timer: Ref<number> = ref(0);
const startTimer = async () => {
  timer.value = window.setTimeout(async () => {
    await latestImageHandler()
    await latestHistoryInfo()
    await startTimer();
  }, 1000)
}

const stopTimer = async () => {
  await clearInterval(timer.value)
}
onMounted(async () => {
  await latestImageHandler()
  await latestHistoryInfo()
  await initBtn()
  await startTimer()
})
onUnmounted(() => {
  stopTimer()
})

const latestHistoryInfo = async () => {
  let res = await getLatestHistoryApi()
  if (res.data) {
    tableData.value[0] = res.data
    let imgUrl_ = res.data.imgUrl.replace(/\\/g, '/')
    latestHistoryImage.value = host + '/' + imgUrl_
  }
}

const latestImageHandler = async () => {
  const res = await getLatestPictureApi()
  if (res.data) {
    let imgUrl_ = res.data.imgUrl.replace(/\\/g, '/')
    latestPictureImage.value = host + '/' + imgUrl_
  }
}
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

watch(tempTableData1, (newValue, oldValue) => {
  curIndex.value = 0;
  prevIndex.value = 0;
  if (newValue.length > 0) {
    prevDisabled.value = true
    nextDisabled.value = false
    nextIndex.value = newValue.length - 1
  } else {
    prevDisabled.value = true
    nextDisabled.value = true
    nextIndex.value = 0
  }
}, {deep: true})

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
  tempTableData2.value[0] = tempTableData1.value[curIndex.value]
  curImgUrl.value = tempTableData1.value[curIndex.value].imgUrl
}, {deep: true})

</script>

<template>
  <el-card class="content-card">
    <el-card style="height: 300px" :body-style="{ padding: '0px' }">
      <el-row :gutter="8">
        <el-col :span="12">
          <el-image style="width: 100%; height: 300px" :src="latestPictureImage" :fit="'cover'"/>
        </el-col>
        <el-col :span="12">
          <el-image style="width: 100%; height: 72%" :src="latestHistoryImage" :fit="'cover'"/>
          <el-table
              :data="tableData"
              style="width: 100%">
            <el-table-column prop="trainMode" label="车型"/>
            <el-table-column prop="trainNum" label="车号"/>
            <el-table-column prop="deadWeight" label="自重(t)"/>
            <el-table-column prop="roughWeight" label="载重(t)"/>
            <el-table-column prop="volume" label="容积(m³)"/>
            <el-table-column prop="length" label="换长(m)"/>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
    <el-divider/>
    <el-card>
      <div style="display: flex">
        <div style="width: 360px; display: flex; padding-right: 10px;">
          <el-date-picker
              :default-time="timeRange"
              v-model="timeRange"
              type="datetimerange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              range-separator="-"
          />
        </div>
        <div>
          <el-button type="primary" :icon="Search" @click="getHistory">搜索</el-button>
        </div>
        <div style="display: flex; padding-left: 180px">
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
          <el-text class="mx-1">{{ curCount }}</el-text>
        </div>
      </div>
      <el-divider/>
      <div style="padding-bottom: 20px">
        <el-row :gutter="20" :justify="'center'">
          <el-col :span="8" class="el-col_text center">
            <div class="text_container center">剩余{{ prevIndex }}节</div>
          </el-col>
          <el-col :span="8" class="el-col_text center">
            <div class="text_container center">当前第{{ curIndex + 1 }}节</div>
          </el-col>
          <el-col :span="8" class="el-col_text center">
            <div class="text_container center">剩余{{ nextIndex }}节</div>
          </el-col>
        </el-row>
      </div>

      <div style="display: flex; width: 100%; height: 300px">
        <div class="pre_next_btn_container center">
          <el-button circle :disabled="prevDisabled" @click="prev_">
            <el-icon>
              <ArrowLeftBold/>
            </el-icon>
          </el-button>
        </div>
        <div style="width: 90%;height: 100% ;padding-right: 5px">
          <el-image style="height: inherit; width: 100%" :src="curImgUrl"
                    :fit="'cover'"></el-image>
        </div>
        <div class="pre_next_btn_container center">
          <el-button circle :disabled="nextDisabled" @click="next_">
            <el-icon>
              <ArrowRightBold/>
            </el-icon>
          </el-button>
        </div>
      </div>
      <el-table
          :data="tempTableData2"
          style="width: 100%">
        <el-table-column prop="trainMode" label="车型"/>
        <el-table-column prop="trainNum" label="车号"/>
        <el-table-column prop="deadWeight" label="自重(t)"/>
        <el-table-column prop="roughWeight" label="载重(t)"/>
        <el-table-column prop="volume" label="容积(m³)"/>
        <el-table-column prop="length" label="换长(m)"/>
      </el-table>
    </el-card>
  </el-card>
</template>
<style scoped>

body {
  margin: 0;
}

.pre_next_btn_container {
  width: 5%;
  height: 100%;
}

.text_container {
  border-radius: 8px;
  background: rgba(200, 200, 200, 0.4);
  height: 100%;
  width: 60%;
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

