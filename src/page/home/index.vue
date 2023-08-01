<script setup lang="ts">

import {Search,} from '@element-plus/icons-vue'
import {onMounted, reactive, ref, watch} from 'vue'
import {getComingTimeApi, getHistoryApi, getLatestHistoryApi, getLatestPictureApi} from "@/api/history";
import type {TableDataInterface} from "@/page/home/interface";
import {host} from "@/utils/service";
import {OptionsInterface} from "@/page/history/interface";
import {GetHistoryInterface} from "@/api/interface";


const imgSrcList = ref([])
const cur_case = ref("0")
const tableData1: ref<TableDataInterface[]> = ref([]);
const timeRange = ref<[Date, Date]>([
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0),
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59)
])
const optionValue = ref("")
const options: ref<OptionsInterface[]> = ref([]);
const curCount = ref(0)
const curTrainId = ref("")

const getHistory = () => {
  options.value.length = 0
  getComingTimeApi({
    startTime: timeRange.value[0],
    endTime: timeRange.value[1]
  }).then(res => {
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
      updateHistory()
    } else {
      curCount.value = 0
      options.value.length = 0
      optionValue.value = ""
      curTrainId.value = ""
      updateHistory()
    }
  })
}

const queryParams: GetHistoryInterface = reactive({
  trainId: "",
  pageSize: 200,
  pageIndex: 1
});
const updateHistory = () => {
  imgSrcList.value.length = 0
  queryParams.trainId = curTrainId.value
  getHistoryApi(queryParams).then(res => {
    if (res.data.history) {
      for (let i = 0; i < res.data.history.length; i++) {
        let imgUrl_ = res.data.history[i].imgUrl.replace(/\\/g, '/')
        imgSrcList.value.push(host + '/' + imgUrl_)
      }
    } else {
      imgSrcList.value.length = 0
    }
  })
}
const changeItem = (value: any) => {
  const selectedIndex = options.value.findIndex(item => item.value === value);
  curCount.value = options.value[selectedIndex].count
  curTrainId.value = options.value[selectedIndex].trainId
  updateHistory()
}


const tableData: ref<TableDataInterface[]> = ref([{
  trainMode: "-",
  trainNum: "-",
  deadWeight: 0,
  roughWeight: 0,
  volume: 0,
  length: 0
}])
const latestPictureImage = ref("")
const latestHistoryImage = ref("")

const startTimer = () => {
  setInterval(() => {
    latestImageHandler()
    latestHistoryInfo()
  }, 5000)
}

onMounted(() => {
  latestImageHandler()
  latestHistoryInfo()
  initBtn()
  // startTimer()
})


const latestHistoryInfo = () => {
  getLatestHistoryApi().then(res => {
    if (res.data) {
      tableData.value = res.data
      let imgUrl_ = res.data.imgUrl.replace(/\\/g, '/')
      latestHistoryImage.value = host + '/' + imgUrl_
    }
  })
}

watch([latestHistoryImage, latestPictureImage], () => {

})

const latestImageHandler = () => {
  getLatestPictureApi().then(res => {
    if (res.data) {
      let imgUrl_ = res.data.imgUrl.replace(/\\/g, '/')
      latestPictureImage.value = host + '/' + imgUrl_
    }
  })
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
  if (curIndex.value == imgSrcList.value.length - 1) {
    nextDisabled.value = true
    return
  }
  curIndex.value++;
}

const btnPrev = ref("")
const btnNext = ref("")
const prevDisabled = ref(false)
const nextDisabled = ref(false)

const initBtn = () => {
  if (imgSrcList.value.length == 0) {
    prevDisabled.value = true;
    nextDisabled.value = true;
  } else {
    prevDisabled.value = false;
    nextDisabled.value = false;
  }
}

watch(imgSrcList, (newValue, oldValue) => {
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
  if (imgSrcList.value.length == 0) {
    return
  }
  if (newValue == 0) {
    prevIndex.value = 0
    nextIndex.value = imgSrcList.value.length - 1
    prevDisabled.value = true
    nextDisabled.value = false
  } else if (newValue == imgSrcList.value.length - 1) {
    prevIndex.value = imgSrcList.value.length
    nextIndex.value = 0
    prevDisabled.value = false
    nextDisabled.value = true
  } else {
    prevIndex.value = newValue
    nextIndex.value = imgSrcList.value.length - newValue - 1
    prevDisabled.value = false
    nextDisabled.value = false
  }

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
          <el-image style="width: 100%;height: 72%" :src="latestHistoryImage" :fit="'cover'"/>
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

      <div>
        <el-row :gutter="20" :justify="'center'">
          <el-col :span="8" class="el-col_text center">
            <div class="text_container center">剩余{{ prevIndex }}节</div>
          </el-col>
          <el-col :span="8" class="el-col_text center">
            <div class="text_container center">当前{{ curIndex + 1 }}节</div>
          </el-col>
          <el-col :span="8" class="el-col_text center">
            <div class="text_container center">剩余{{ nextIndex }}节</div>
          </el-col>
        </el-row>
      </div>

      <div style="display: flex;width: 100%; height: 300px">
        <div style="width: 5%; height: 100%;">
          <el-button class="pre_next_btn" ref="btnPrev" type="primary" :disabled="prevDisabled" @click="prev_">
            <el-icon>
              <ArrowLeftBold/>
            </el-icon>
          </el-button>
        </div>
        <div style="width: 90%;height: 100% ;padding-right: 5px">
          <el-image style="height: inherit; width: 100%" :src="imgSrcList[curIndex]" :fit="'cover'"></el-image>
        </div>
        <div style="width: 5%;height: 100%;">
          <el-button class="pre_next_btn" ref="btnNext" type="primary" :disabled="nextDisabled" @click="next_">
            <el-icon>
              <ArrowRightBold/>
            </el-icon>
          </el-button>
        </div>
      </div>
    </el-card>
  </el-card>
</template>

<style scoped>
body {
  margin: 0;
}

.pre_next_btn {
  height: 100%;
}

.text_container {
  border-radius: 8px;
  background: rgba(200, 200, 200, 0.4);
  height: 100%;
  width: 60%;
}

.el-col_text {
  height: 40px;
  text-align: center;
}

.grid-container1 {
  height: 60px;
  display: grid;
  margin: 12px;
  grid-template-columns: repeat(6, 1fr); /* 每行六列 */
  gap: 12px; /* 相邻元素的间隔 */
}

.grid-item {
  display: flex;
  flex-direction: column;
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

el-carousel {
  position: relative;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__arrow--right {
  pointer-events: none;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-carousel__arrow {
  background-color: transparent;
  color: #fff;
}

.el-carousel__arrow:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.el-carousel__arrow:hover::before {
  background-color: transparent;
}

.el-carousel__arrow.is-disabled {
  cursor: not-allowed;
  background-color: transparent;
  color: #ccc;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

</style>

