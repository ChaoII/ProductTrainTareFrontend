<template>
  <el-card class="content-card">
    <el-card style="height: 300px" :body-style="{ padding: '0px' }">
      <el-row :gutter="8">
        <el-col :span="12">
          <el-image style="width: 100%; height: 300px" :src="srcList[0]" :fit="'cover'"/>
        </el-col>
        <el-col :span="12">
          <el-image style="width: 100%;height: 240px" :src="srcList[1]" :fit="'cover'"/>
          <div class="grid-container1">
            <div v-for="(item, index) in items" :key="index" class="grid-item">
              <span style="font-weight: bold" class="key">{{ item.key }}</span>
              <span class="value">{{ item.value }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-divider/>
    <el-card>
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

      <div style="background: rgba(200,200,200,0.2)">
        <el-row :gutter="20" :justify="'center'">
          <el-col :span="8" class="el-col_text center">
            <div class="text_container center">剩余{{ cur_case-1 }}节</div>
          </el-col>
          <el-col :span="8" class="el-col_text center">
            <div class = "text_container center">当前{{ cur_case }}节</div>
          </el-col >
          <el-col :span="8" class="el-col_text center">
            <div class="text_container center">剩余{{ srcList.length -cur_case}}节</div>
          </el-col>
        </el-row>
      </div>
      <el-carousel :interval="80000000" style="padding-top: 25px" type="card" height="300px" :loop="false">
        <el-carousel-item v-for="(url, index) in srcList" :key="index">
          <div v-show="false">{{ cur_case = index}}</div>
          <el-image style="width: 100%;height: 100%" :src="url" :fit="'cover'"/>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </el-card>
</template>
<script>

import {useRouter} from 'vue-router'
import {Delete, Edit, Search, Share, Upload} from '@element-plus/icons-vue'
import {ref} from 'vue'
export default {
  name: "layout",
  setup() {
    const router = useRouter()
    const cur_case = ref("0")
    const srcList = [
      'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
      'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
      'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
      'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
      'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
      'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
    ]
    const items = [
      {"key": "车型", "value": "C64K"},
      {"key": "车号", "value": "1234567"},
      {"key": "自重", "value": "21.3t"},
      {"key": "载重", "value": "70.4t"},
      {"key": "容积", "value": "73m³"},
      {"key": "换长", "value": "13m"}
    ]

    return {
      srcList,
      Search,
      items,
      cur_case
    }
  }
}

</script>
<style scoped>
body {
  margin: 0;
}

.text_container{
  border-radius: 8px;
  background: rgba(200,200,200,0.4);
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

