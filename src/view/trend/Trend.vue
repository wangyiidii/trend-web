<template>
  <div>

    <el-row :gutter="20"
            class="row-content">
      <el-col :span="6"
              :offset="6">
        <span>请选择指数:</span>
        <el-select v-model="currentIndex"
                   placeholder="请选择指数">
          <el-option v-for="item in indexs"
                     :key="item.code"
                     :label="item.name"
                     :value="item.code">
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row :gutter="20"
            class="row-content">
      <el-col :span="6"
              :offset="6">
        <span>MA(均线) :</span>
        <el-select v-model="ma"
                   placeholder="请选择MA(均线)">
          <el-option v-for="item in mas"
                     :key="item.value"
                     :label="item.key"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row :gutter="20"
            class="row-content">
      <el-col :span="6"
              :offset="6">
        <span>购买阈值:</span>
        <el-select v-model="buyThreshold"
                   placeholder="购买阈值">
          <el-option v-for="item in buyThresholds"
                     :key="item.value"
                     :label="item.key"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span>出售阈值:</span>
        <el-select v-model="sellThreshold"
                   placeholder="出售阈值">
          <el-option v-for="item in sellThresholds"
                     :key="item.value"
                     :label="item.key"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row :gutter="20"
            class="row-content">
      <el-col :span="6"
              :offset="6">
        <span>手续费:</span>
        <el-select v-model="serviceCharge"
                   placeholder="手续费">
          <el-option v-for="item in serviceCharges"
                     :key="item.value"
                     :label="item.key"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row :gutter="20"
            class="row-content">
      <el-col :span="6"
              :offset="6">
        <span>开始日期</span>
        <el-date-picker v-model="startDate"
                        align="right"
                        type="date"
                        placeholder="请选择开始日期"
                        :picker-options="pickerOptions">
        </el-date-picker>
      </el-col>
      <el-col :span="6">
        <span>结束日期</span>
        <el-date-picker v-model="endDate"
                        align="right"
                        type="date"
                        placeholder="请选择开始日期"
                        :picker-options="pickerOptions">
        </el-date-picker>
      </el-col>
    </el-row>

    <!-- <el-row :gutter="20"
            class="row-content">
      <el-col :span="6"></el-col>
    </el-row> -->

    <div id="trendChart"
         :style="{width: '100%', height: '480px',margin:' auto'}">
    </div>
  </div>

</template>
<script>
import { getIndexs, getIndexData } from '@/api/trend/trend.js'
export default {
  name: 'trend',
  data () {
    return {
      // 指数
      indexs: [],
      // 当前指数
      currentIndex: '000300',
      //
      ma: 10,
      //购买阈值
      buyThreshold: 1.01,
      //出售阈值
      sellThreshold: 0.99,
      //手续费
      serviceCharge: 0,
      //开始日期
      startDate: null,
      //结束日期
      endDate: null,

      mas: [
        { 'key': '5日', 'value': 5 },
        { 'key': '10日', 'value': 10 },
        { 'key': '20日', 'value': 20 },
        { 'key': '60日', 'value': 60 }],
      buyThresholds: [
        { 'key': '1.01', 'value': 1.01 },
        { 'key': '1.02', 'value': 1.02 },
        { 'key': '1.03', 'value': 1.03 },
        { 'key': '1.04', 'value': 1.04 },
        { 'key': '1.05', 'value': 1.05 }
      ],
      sellThresholds: [
        { 'key': '0.99', 'value': 0.99 },
        { 'key': '0.98', 'value': 0.98 },
        { 'key': '0.97', 'value': 0.97 },
        { 'key': '0.96', 'value': 0.96 },
        { 'key': '0.12', 'value': 0.12 }
      ],
      serviceCharges: [
        { 'key': '无', 'value': 0 },
        { 'key': '0.1%', 'value': 0.1 },
        { 'key': '0.15%', 'value': 0.15 },
        { 'key': '0.2%', 'value': 0.2 },
      ],
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },


      //指数数据
      indexDatas: [],
      //收益
      profits: [],
      //日期横轴
      dateXaxis: [],
    }
  },
  mounted () {
    this._getIndexs();
    this.getSimulatedIndexData();
  },
  methods: {
    _getIndexs () {
      getIndexs().then(resp => {
        this.indexs = resp.data
      }).catch()
    },
    getSimulatedIndexData () {

      var url = '/trend/simulate/' + this.currentIndex + '/' + this.ma + '/' + this.buyThreshold + '/' + this.sellThreshold + '/' + this.serviceCharge + '/null/null/';
      console.log(url)
      getIndexData(url, '').then(
        resp => {
          var respData = resp.data
          var indexDatas = respData.indexDatas
          for (var i in indexDatas) {
            this.indexDatas.push(indexDatas[i].closePoint)
            this.dateXaxis.push(indexDatas[i].date)
          }
          var profits = respData.profits
          for (var i in profits) {
            this.profits.push(profits[i].value)
          }
          this.draw();
        }
      ).catch(
        err => console.log(err)
      )


    },
    draw () {
      let myChart = this.$echarts.init(document.getElementById('trendChart'))
      myChart.setOption({
        title: {
          text: '指数趋势投资收益对比图',
          textStyle: {
            color: 'black',
          },
          left: 'center'
        },
        tooltip: {},
        legend: {
          show: true,
          y: "top",
          x: "center",
          type: "scroll",
          top: "5%"
        },
        xAxis: {
          data: this.dateXaxis,
          axisLabel: {
            interval: 30,
            rotate: 400
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['lightgray'],
              width: 1,
              type: 'solid'
            }
          }
        },
        yAxis: [{
          name: '',//坐标单位
          type: 'value',
        }],
        series: [{
          name: '399975',
          symbol: "none",
          type: 'line',
          data: this.indexDatas,
          lineStyle: {
            normal: { width: 1 }//线条的颜色及宽度
          },
          smooth: false,//线条平滑
        },
        {
          name: '趋势投资',
          symbol: "none",
          type: 'line',
          data: this.profits,
          smooth: true,//线条平滑
        }]
      });
    }
  },
  watch: {
    currentIndex: function (value) {
      this.getSimulatedIndexData();
    },
    ma: function (value) {
      this.getSimulatedIndexData();
    },
    buyThreshold: function (value) {
      this.getSimulatedIndexData();
    },
    sellThreshold: function (value) {
      this.getSimulatedIndexData();
    },
    serviceCharge: function (value) {
      this.getSimulatedIndexData();
    },
    startDate: function (value) {
      this.getSimulatedIndexData();
    },
    endDate: function (value) {
      this.getSimulatedIndexData();
    }
  },
  beforeCreate: function () {
    this.$emit('public_header', false);
  },
}
</script>
<style>
.row-content {
  padding: 5px 5px;
}
</style>