<script setup lang="ts">

import {Search} from '@element-plus/icons-vue'
import {computed, onActivated, onMounted, reactive, ref} from 'vue'
import {getComingTimeApi, getHistoryApi} from "@/api/history";
import type {GetHistoryInterface} from "@/api/interface";
import type {OptionsInterface, TableDataInterface} from "@/page/history/interface";


const timeRange = ref<[Date, Date]>([
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0),
  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59)
])

const totalPage = ref(0)
const curCount = ref(0)
const curTrainId = ref("")
const optionValue = ref("")
const options: ref<OptionsInterface[]> = ref([]);
const tableData: ref<TableDataInterface[]> = ref([]);

const queryParams: GetHistoryInterface = reactive({
  trainId: "",
  pageSize: 5,
  pageIndex: 1
});

const tableHeight = ref("600px"); // 默认最大高度为200px

// 动态设置表格最大高度
const setTableHeight = () => {
  const windowHeight = document.body.clientHeight;
  tableHeight.value = `${windowHeight - 240}px`; // 设置最大高度为窗口高度减去100px
};

const changeItem = (value: any) => {
  const selectedIndex = options.value.findIndex(item => item.value === value);
  console.log(selectedIndex)
  curCount.value = options.value[selectedIndex].count
  curTrainId.value = options.value[selectedIndex].trainId
  updateHistory()
}

const updateHistory = () => {
  queryParams.trainId = curTrainId.value
  getHistoryApi(queryParams).then(res => {
    if (res.data) {
      tableData.value = res.data.history
      totalPage.value = res.data.total
    }
  })
}

const getHistory = () => {
  options.value.length = 0
  getComingTimeApi({
    startTime: timeRange.value[0],
    endTime: timeRange.value[1]
  }).then(res => {
    if (res.data.history) {
      console.log(res);
      for (const r of res.data.history) {
        console.log(r)
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
    }
  })
}

onMounted(() => {
  setTableHeight()
  getHistory()
})
// 监听窗口大小变化
window.addEventListener('resize', setTableHeight);

</script>
<template>
  <el-card class="content-card">
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
          <el-select v-model="optionValue" class="m-2" placeholder="Select" @change="changeItem">
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

    <el-table
        :max-height="tableHeight"
        :stripe="true"
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
    >
      <el-table-column type="index" width="50"/>
      <el-table-column prop="dateTime" label="时间" width="180"/>
      <el-table-column prop="trainMode" label="车型" width="100"/>
      <el-table-column prop="trainNum" label="车号" width="100"/>
      <el-table-column prop="deadWeight" label="自重(t)" width="100"/>
      <el-table-column prop="roughWeight" label="载重(t)" width="100"/>
      <el-table-column prop="volume" label="容积(m³)" width="100"/>
      <el-table-column prop="length" label="换长(m)" width="100"/>
      <el-table-column prop="imgUrl" label="图片地址"/>
    </el-table>
    <div style="position: absolute; right: 20px;bottom: 20px; display: flex;justify-content:flex-end">
      <el-pagination
          v-model:current-page="queryParams.pageIndex"
          v-model:page-size="queryParams.pageSize"
          :page-sizes="[5,10]"
          :small="true"
          layout="total, sizes, prev, pager, next, jumper"
          :background="true"
          :total="totalPage"
          @size-change="searchList"
          @current-change="searchList"
      />
    </div>
  </el-card>
</template>

<style scoped>
.content-card {
  position: relative;
  width: 60%;
  height: calc(100vh - 52px);
}
</style>