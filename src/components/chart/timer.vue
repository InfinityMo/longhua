<template>
  <div :key="randomKey">
    <div class="cluster"
         ref="charts"
         v-if="chart.id"></div>
  </div>
</template>
<script>
import { colorDisk, colorSplit } from './chartBase'
import * as echarts from 'echarts'
import { createUUID, setTousandNum } from '@/common/utils/funcStore'
export default {
  props: {
    chart: {
      type: Object,
      default: () => { },
      required: true
    }
  },
  data () {
    return {
      seriesData: [],
      xAxisData: [],
      legendData: [],
      visualSplitData: [],
      randomKey: createUUID()
    }
  },
  watch: {
    'chart.id' () {
      Object.assign(this.$data, this.$options.data())
      this.randomKey = createUUID()
      this.getChartData()
    }
  },
  computed: {
    chartTitle () {
      return Object.keys(this.chart).length > 0 ? `时间序列图—${this.chart.forecastLength}/${this.chart.modelType}/${this.chart.seasonCycle}${this.chart.boxCox === '1' ? '/使用了bocxox' : '/未使用bocxox'}` : '时间序列图'
    }
  },
  created () {
    this.getChartData()
  },
  methods: {
    getChartData () {
      this.$request.post('/timeseries/analyzeresult', { id: this.chart.id }).then(res => {
        const timersOrder = res.data.timersOrder || []
        const timeDate = res.data.timeDate
        const visualSplit = Number(res.data.visualSplit) || 0
        this.xAxisData = [...timeDate]
        timersOrder.forEach((item, index) => {
          this.visualSplitData.push({
            type: 'piecewise',
            show: false,
            dimension: 0,
            seriesIndex: index,
            pieces: [{
              gte: 0,
              lte: visualSplit,
              color: colorSplit[index]
            }, {
              gte: visualSplit,
              color: colorDisk[index]
            }]
          })
          this.seriesData.push({
            name: item.name,
            type: 'line',
            symbolSize: 8, // 标记的大小
            itemStyle: {
              // 折线拐点标志的样式
              color: colorDisk[index],
              borderColor: colorDisk[index],
              width: 2
            },
            // lineStyle: {
            //   color: colorDisk[index],
            //   width: 2
            // },
            data: item.data
          })
          this.legendData.push(item.name)
        })
        this.$nextTick(() => {
          this.createChart()
        })
      })
    },
    createChart () {
      const initChart = echarts.init(this.$refs.charts)
      const option = {
        title: {
          text: this.chartTitle,
          textStyle: {
            color: '#333',
            fontWeight: 'normal',
            fontSize: 18
          }
        },
        tooltip: {
          formatter: (params) => {
            return `<div>
            <p>${params.seriesName}</p>
            <ul>
            <li>${params.marker}<span style="padding:0 10px 0 5px">${params.name}</span><span>${setTousandNum(params.value)}</span></li>
            </ul>
            </div>`
          }
        },
        toolbox: {
          show: true,
          right: 10,
          top: 4,
          // iconStyle: {
          //   // color: '#2BB8BD',
          //   // borderColor: '#2BB8BD'
          // },
          feature: {
            itemSize: 16,
            saveAsImage: {
              type: 'png',
              icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACpSURBVHgB7ZRLCsIwFEXvExfgEnSqCG5BIqQ40h3pitphBYuL8DfUJXRcStKkUAj9JaWdtQcyeZ+bS94jgIVNGEl9bHUzDMQkNGohakqsw+inkkszprby//HYCl0cCZns1TWxKZLHmhwV6//2WMXd9nY/CUl+LizS8/fIg3JN0d/6Rk9+CIhwkerUiZjMYeHF2RUODD/+nf9YoCNmD7n8NU6O9FjRE62RASPDNv+D0HhiAAAAAElFTkSuQmCC',
              title: '保存图片'
            }
          }
        },
        legend: {
          data: this.legendData,
          top: 5,
          right: 40,
          textStyle: {
            fontSize: 16
          }
        },
        grid: {
          left: '8%',
          right: '5%',
          top: '15%',
          bottom: '12%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxisData,
          axisLabel: {
            show: true,
            // interval: 0,
            margin: 15,
            rotate: 20
            // textStyle: {
            //   color: '#333', // X轴文字颜色
            //   fontSize: 12
            // }
          }
        },
        yAxis: {
          type: 'value'
        },
        visualMap: this.visualSplitData,
        series: this.seriesData,
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 100
          // zoomLock: true,
          // startValue: 0,
          // endValue: 20
        }
        ]
      }
      initChart.setOption(option)
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/common/styles/chart";
</style>
