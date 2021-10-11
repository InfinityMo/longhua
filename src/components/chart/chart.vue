<template>
  <div>
    <el-collapse-transition>
      <div class="chart"
           v-if="chartShow">
        <Cluster :chart="chart"
                 v-if="chartType==='1'" />
        <Timer :chart="chart"
               v-if="chartType==='2'" />
      </div>
    </el-collapse-transition>
    <div class="is-show flex">
      <div class="line"></div>
      <span class="arrow"
            @click="chartShow = !chartShow">
        <i :class="arrowClass"></i>
      </span>
      <div class="line"></div>
    </div>
  </div>
</template>
<script>
import Cluster from './cluster'
import Timer from './timer'
export default {
  components: { Cluster, Timer },
  props: {
    chartType: {
      type: String,
      default: '',
      required: true
    },
    chart: {
      type: Object,
      default: () => { },
      required: true
    }
  },
  data () {
    return {
      chartShow: true
    }
  },
  computed: {
    arrowClass () {
      return this.chartShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
    }
  },
  mounted () {

  }
}
</script>
<style lang="less" scoped>
@import "~@/common/styles/chart";
</style>
