<template>
  <div :key="randomKey">
    <div class="cluster"
         ref="charts"
         v-if="chart.id">
    </div>
  </div>
</template>
<script>
import { colorDisk } from './chartBase'
import { createUUID } from '@/common/utils/funcStore'
import * as echarts from 'echarts'
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
      centerOrginData: [],
      scatterOrginData: [],
      centerData: [],
      scatterData: [],
      seriesData: [],
      legendData: [],
      randomKey: createUUID(),
      showLabelIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAF/SURBVHgBpZRNVsIwEMcz0eeaG8hSKIseQSyPD93oCagnEE8gnkA8gXAC3WiRZ6ieQDZ87MAbsAcyZhrQUGiLz9kkeTP5ZWbyT4AlmOV1mwywGh8FE/g/RNt+lCPniToSBNh0AXA+Kp58hGOOPC+9BwfjIKdoCLuhuZTzi+Fp6SnqQKstkEYeB1FluSaEfFa7O868iFp4Hw/RayuIGuv9UqH1W4af1j5M89VB20BZT7hquFtBBiXn1gwcVfITBtDTmbJmGBT0yO749kzKzyiIaRkhDoeO82VUEfQICDJH9BExpdaNftm5ZjuamQCfSXzUEHj/C4RaQQkslw3OUGp9INrZ5469KwSAPSyraFICvF8puArSUt1KAd/zk2AkAYIEZ9PNlp1Lmv8I0vLe1HOAKkM2RbnID86KvW0QUx7mpawpOw4WB9kARcFybdFQd3xFfsmwNiwX7sP7tr41E6ZFiMc6Gl1T7YmgNZiOivwBEkEB7FXQk3ERVInFzeab9g1kidpL5PPN/QAAAABJRU5ErkJggg==',
      isShowLabel: true // 是否展示聚类图散点的label
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
      return this.chart.kValue && this.chart.kValue !== '-' ? `聚类图—${this.chart.kValue}/${this.chart.reductionType}` : `人群聚类图—${this.chart.reductionType}`
    }
  },
  created () {
    this.getChartData()
  },
  methods: {
    putCenterData () {
      this.centerData = []
      this.seriesData = []
      this.legendData = []
      Object.keys(this.centerOrginData).forEach(item => {
        this.centerOrginData[item].forEach(innerItem => {
          innerItem.label = item // 簇的标签
          this.centerData.push(innerItem)
        })
      })
      this.centerData.forEach((item, index) => {
        this.seriesData.push({
          type: 'scatter',
          symbol: 'diamond',
          symbolSize: 10,
          name: item.label,
          itemStyle: {
            color: (seriesIndex) => {
              return colorDisk[index]
            },
            borderWidth: 0
          },
          data: [{ name: item.name, value: item.value }]
        })
        this.legendData.push({ name: item.label, itemStyle: { color: colorDisk[index] } })
      })
    },
    putScatterData () {
      this.scatterData = []
      Object.keys(this.scatterOrginData).forEach((item, index) => {
        this.scatterOrginData[item].forEach(innerItem => {
          innerItem.label = item // 簇的标签
          innerItem.color = colorDisk[index]
          this.scatterData.push(innerItem)
        })
      })
      this.scatterData.forEach((item, index) => {
        this.seriesData.push({
          type: 'scatter',
          symbolSize: 10,
          name: item.label,
          label: {
            show: this.isShowLabel,
            position: 'bottom',
            fontSize: 10,
            formatter: (params) => {
              return params.data.name
            }
          },
          itemStyle: {
            color: (seriesIndex) => {
              return item.color
            },
            borderWidth: 0
          },
          data: [{ name: item.name, value: item.value }]
        })
        this.legendData.push({ name: item.label, itemStyle: { color: item.color } })
      })
    },
    getChartData () {
      this.$request.post('/cluster/analyzeresult', { id: this.chart.id }).then(res => {
        this.centerOrginData = res.data.centerData
        this.scatterOrginData = res.data.scatterData
        this.putCenterData()
        this.putScatterData()
        this.$nextTick(() => {
          this.createChart()
        })
      })
    },
    createChart () {
      const initChart = echarts.init(this.$refs.charts)
      initChart.setOption({}, true)
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
            <p>${params.data.name || ''}</p>
            <ul>
            <li>${params.marker}<span>X：${params.value[0]}</span></li>
            <li>${params.marker}<span>Y：${params.value[1]}</span></li>
            </ul>
            </div>`
          }
        },
        toolbox: {
          show: true,
          right: 15,
          itemGap: 15,
          top: 5,
          emphasis: {
            iconStyle: {
              textPosition: 'bottom',
              textPadding: 10
            }
          },
          feature: {
            itemSize: 16,
            myLabelShow: {
              show: true,
              title: '显示隐藏标签',
              icon: this.showLabelIcon,
              onclick: () => {
                this.isShowLabel = !this.isShowLabel
                this.showLabelIcon = this.isShowLabel
                  ? 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAF/SURBVHgBpZRNVsIwEMcz0eeaG8hSKIseQSyPD93oCagnEE8gnkA8gXAC3WiRZ6ieQDZ87MAbsAcyZhrQUGiLz9kkeTP5ZWbyT4AlmOV1mwywGh8FE/g/RNt+lCPniToSBNh0AXA+Kp58hGOOPC+9BwfjIKdoCLuhuZTzi+Fp6SnqQKstkEYeB1FluSaEfFa7O868iFp4Hw/RayuIGuv9UqH1W4af1j5M89VB20BZT7hquFtBBiXn1gwcVfITBtDTmbJmGBT0yO749kzKzyiIaRkhDoeO82VUEfQICDJH9BExpdaNftm5ZjuamQCfSXzUEHj/C4RaQQkslw3OUGp9INrZ5469KwSAPSyraFICvF8puArSUt1KAd/zk2AkAYIEZ9PNlp1Lmv8I0vLe1HOAKkM2RbnID86KvW0QUx7mpawpOw4WB9kARcFybdFQd3xFfsmwNiwX7sP7tr41E6ZFiMc6Gl1T7YmgNZiOivwBEkEB7FXQk3ERVInFzeab9g1kidpL5PPN/QAAAABJRU5ErkJggg=='
                  : 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFPSURBVHgBrZTdbYNADMe5UyVes0F55UMoI7QbtBOETlA6QdMJQicomaDdIM0E8MDHY9IJmgEQ5O/okKwLF4gUS5bN2fc74zMIa0SqqkphFiNpe3EDyEnuTIGyLJcKcoA+eZ631XOyLHNs296RL0wQIcQ7+U3TPIdh+GOZq+7IykuQtm0jDqFYXde7oihifZ/U6HEP6bpuGQTBuo8B4FAM606fMwjCKRHMqof4vv/BE13X3cPk5AOU6iChIHMpZWaCaFXfo/F/7PnUI6EgG/gzaIKkN2ui8AJg5beC/F4JiVQBJInEzWzVK83phCsgX1QA9qVUgMTNRICt0cAZdDMGoxFQkL6fL+QLdkqKhAWCB+gjDsiHIHw8+KUIrWQj7BLkDGSCYS3B2qtKidGTT33f4LfGYbA57AOt0yfDp30UxGHq0fgHmCSY2hX0f8pYHAGoLOBdUiAdjwAAAABJRU5ErkJggg=='
                this.randomKey = createUUID()
                this.putCenterData()
                this.putScatterData()
                this.$nextTick(() => {
                  this.createChart()
                })
              }
            },
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
          right: 75,
          itemGap: 15,
          textStyle: {
            fontSize: 16
          },
          formatter: (params) => {
            return params
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          top: '15%',
          bottom: '5%'
        },
        xAxis: {
          scale: true
        },
        yAxis: {
          scale: true
        },
        series: this.seriesData,
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0],
            start: 0,
            end: 100
          },
          {
            type: 'inside',
            yAxisIndex: [0],
            start: 0,
            end: 100
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
