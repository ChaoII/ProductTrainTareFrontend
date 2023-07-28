<template>
  <el-card class="content-card">
    <div style="display: flex">
      <div style="width: 300px;display: flex;padding-right: 10px;">
        <el-date-picker
            v-model="value2"
            type="datetimerange"
            :shortcuts="shortcuts"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
        />
      </div>
      <div>
        <el-button type="primary" :icon="Search">搜索</el-button>
      </div>
      <div style="display: flex; padding-left: 200px">
        <el-text class="mx-1" type="primary">火车进站时间:</el-text>
        <div style="width: 200px;display: flex;padding: 0 10px 0 10px;">
          <el-select v-model="value" class="m-2" placeholder="Select">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </div>
        <el-text class="mx-1">车厢数量：</el-text>
        <el-text class="mx-1">12314</el-text>
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
      <el-table-column prop="date" label="时间" width="180"/>
      <el-table-column prop="name" label="车型" width="100"/>
      <el-table-column prop="train_num" label="车号" width="100"/>
      <el-table-column prop="dead_weight" label="自重(t)" width="100"/>
      <el-table-column prop="rough_weight" label="载重(t)" width="100"/>
      <el-table-column prop="volume" label="容积(m³)" width="100"/>
      <el-table-column prop="length" label="换长(m)" width="100"/>
      <el-table-column prop="img_url" label="图片地址"/>
    </el-table>
    <div style="position: absolute; right: 20px;bottom: 20px; display: flex;justify-content:flex-end">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="3000"
          class="mt-4"
      />
    </div>
  </el-card>
</template>

<script>

import {useRouter} from 'vue-router'
import {Delete, Edit, Search, Share, Upload} from '@element-plus/icons-vue'
import {ref} from 'vue'

export default {
  name: "history",
  setup() {

    const tableData = [
      {
        date: '2023-07-27 ',
        name: 'C64K',
        train_num: '1234567',
        dead_weight: 21.3,
        rough_weight: 70.6,
        volume: 73,
        length: 13,
        img_url: "./dst/12321312312/result/1231231123123_64.jpg"
      },
      {
        date: '2023-07-27 ',
        name: 'C64K',
        train_num: '1234567',
        dead_weight: 21.3,
        rough_weight: 70.6,
        volume: 73,
        length: 13,
        img_url: "./dst/12321312312/result/1231231123123_64.jpg"
      },
      {
        date: '2023-07-27 ',
        name: 'C64K',
        train_num: '1234567',
        dead_weight: 21.3,
        rough_weight: 70.6,
        volume: 73,
        length: 13,
        img_url: "./dst/12321312312/result/1231231123123_64.jpg"
      },
      {
        date: '2023-07-27 ',
        name: 'C64K',
        train_num: '1234567',
        dead_weight: 21.3,
        rough_weight: 70.6,
        volume: 73,
        length: 13,
        img_url: "./dst/12321312312/result/1231231123123_64.jpg"
      }, {
        date: '2023-07-27 ',
        name: 'C64K',
        train_num: '1234567',
        dead_weight: 21.3,
        rough_weight: 70.6,
        volume: 73,
        length: 13,
        img_url: "./dst/12321312312/result/1231231123123_64.jpg"
      },
      {
        date: '2023-07-27 ',
        name: 'C64K',
        train_num: '1234567',
        dead_weight: 21.3,
        rough_weight: 70.6,
        volume: 73,
        length: 13,
        img_url: "./dst/12321312312/result/1231231123123_64.jpg"
      },
      {
        date: '2023-07-27 ',
        name: 'C64K',
        train_num: '1234567',
        dead_weight: 21.3,
        rough_weight: 70.6,
        volume: 73,
        length: 13,
        img_url: "./dst/12321312312/result/1231231123123_64.jpg"
      },
      {
        date: '2023-07-27 ',
        name: 'C64K',
        train_num: '1234567',
        dead_weight: 21.3,
        rough_weight: 70.6,
        volume: 73,
        length: 13,
        img_url: "./dst/12321312312/result/1231231123123_64.jpg"
      }, {
        date: '2023-07-27 ',
        name: 'C64K',
        train_num: '1234567',
        dead_weight: 21.3,
        rough_weight: 70.6,
        volume: 73,
        length: 13,
        img_url: "./dst/12321312312/result/1231231123123_64.jpg"
      },
      {
        date: '2023-07-27 ',
        name: 'C64K',
        train_num: '1234567',
        dead_weight: 21.3,
        rough_weight: 70.6,
        volume: 73,
        length: 13,
        img_url: "./dst/12321312312/result/1231231123123_64.jpg"
      },
      {
        date: '2023-07-27 ',
        name: 'C64K',
        train_num: '1234567',
        dead_weight: 21.3,
        rough_weight: 70.6,
        volume: 73,
        length: 13,
        img_url: "./dst/12321312312/result/1231231123123_64.jpg"
      },
      {
        date: '2023-07-27 ',
        name: 'C64K',
        train_num: '1234567',
        dead_weight: 21.3,
        rough_weight: 70.6,
        volume: 73,
        length: 13,
        img_url: "./dst/12321312312/result/1231231123123_64.jpg"
      }, {
        date: '2023-07-27 ',
        name: 'C64K',
        train_num: '1234567',
        dead_weight: 21.3,
        rough_weight: 70.6,
        volume: 73,
        length: 13,
        img_url: "./dst/12321312312/result/1231231123123_64.jpg"
      },
      {
        date: '2023-07-27 ',
        name: 'C64K',
        train_num: '1234567',
        dead_weight: 21.3,
        rough_weight: 70.6,
        volume: 73,
        length: 13,
        img_url: "./dst/12321312312/result/1231231123123_64.jpg"
      },
      {
        date: '2023-07-27 ',
        name: 'C64K',
        train_num: '1234567',
        dead_weight: 21.3,
        rough_weight: 70.6,
        volume: 73,
        length: 13,
        img_url: "./dst/12321312312/result/1231231123123_64.jpg"
      },
      {
        date: '2023-07-27 ',
        name: 'C64K',
        train_num: '1234567',
        dead_weight: 21.3,
        rough_weight: 70.6,
        volume: 73,
        length: 13,
        img_url: "./dst/12321312312/result/1231231123123_64.jpg"
      }, {
        date: '2023-07-27 ',
        name: 'C64K',
        train_num: '1234567',
        dead_weight: 21.3,
        rough_weight: 70.6,
        volume: 73,
        length: 13,
        img_url: "./dst/12321312312/result/1231231123123_64.jpg"
      },
      {
        date: '2023-07-27 ',
        name: 'C64K',
        train_num: '1234567',
        dead_weight: 21.3,
        rough_weight: 70.6,
        volume: 73,
        length: 13,
        img_url: "./dst/12321312312/result/1231231123123_64.jpg"
      },
      {
        date: '2023-07-27 ',
        name: 'C64K',
        train_num: '1234567',
        dead_weight: 21.3,
        rough_weight: 70.6,
        volume: 73,
        length: 13,
        img_url: "./dst/12321312312/result/1231231123123_64.jpg"
      },
      {
        date: '2023-07-27 ',
        name: 'C64K',
        train_num: '1234567',
        dead_weight: 21.3,
        rough_weight: 70.6,
        volume: 73,
        length: 13,
        img_url: "./dst/12321312312/result/1231231123123_64.jpg"
      },
    ]


    const tableHeight = ref("600px"); // 默认最大高度为200px

    // 动态设置表格最大高度
    const setTableHeight = () => {
      const windowHeight = document.body.clientHeight;
      tableHeight.value = `${windowHeight - 240}px`; // 设置最大高度为窗口高度减去100px
    };

    // 监听窗口大小变化
    window.addEventListener('resize', setTableHeight);

    return {
      Search,
      tableData,
      tableHeight
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