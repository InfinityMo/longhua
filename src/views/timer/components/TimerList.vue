<template>
  <div class="page">
    <div class="search-wrap dialog-search-wrap timer-search-wrap">
      <el-form class="search-form-inline"
               ref="searchForm"
               label-width="70px">
        <el-col :span="5">
          <el-form-item label="预测长度：">
            <el-input placeholder="请输入1-100的整数"
                      v-model="queryFrom.forecastLength"
                      @keyup.native="changeAmount"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="模型类型：">
            <el-select popper-class="dialog-upper"
                       placeholder="请选择模型类型"
                       v-model="queryFrom.modelType">
              <el-option v-for="item in modelType"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="季节周期：">
            <el-select popper-class="dialog-upper"
                       placeholder="请选择季节周期"
                       v-model="queryFrom.seasonCycle">
              <el-option v-for="item in seasonCycle"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="使用boxcox："
                        label-width="90px">
            <el-select popper-class="dialog-upper"
                       placeholder="请选择是否使用boxcox"
                       v-model="queryFrom.boxCox">
              <el-option v-for="item in boxCox"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4"
                class="search-btn">
          <el-form-item>
            <el-button type="primary"
                       :disabled="btnDisabled"
                       @click="createChart">生成图表</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <Chart v-if="chart.id"
           ref="chart"
           :chartType="chartType"
           :chart="chart" />
    <div class="table-wrap">
      <div class="flex-between-center table-info">
        <h4>结果列表</h4>
        <el-button type="primary"
                   @click="getTableData">
          <Icon type="icon-refresh-14"
                :padding="[0,5,0,0]" />刷新
        </el-button>
      </div>
      <Table ref="table"
             :data="tableData"
             :columns="columns"
             popper-class="dialog-upper"
             :pagination="PAGING"
             :pageSizes="[5,10,20]"
             @tableChange="tableChange" />
    </div>
  </div>
</template>
<script>
import { queryForm } from './searchForm'
import tableMixin from '@/mixins/dealTable'
import { downLoadFile } from '@/common/utils/funcStore'
import { modelType, seasonCycle, boxCox } from '@/common/commonData/baseData'
import { columnsData } from './columnsData.js'
import Chart from '@/components/chart/chart'
export default {
  mixins: [tableMixin],
  components: { Chart },
  props: {
    // fileId
    dialogId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      queryFrom: JSON.parse(JSON.stringify(queryForm)),
      columns: columnsData(this.$createElement, this),
      tableData: [],
      modelType,
      seasonCycle,
      chart: {},
      chartType: '2',
      boxCox
    }
  },
  computed: {
    btnDisabled () {
      return !this.queryFrom.forecastLength
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    createChart () {
      this.$request.post('/timeseries/analyze', {
        ...this.queryFrom,
        id: this.dialogId
      }).then(res => {
        this.getTableData()
      })
    },
    downLoad (id) {
      downLoadFile('/timeseries/downloadresult', { id })
    },
    showChart (row) {
      this.chart = { ...row }
      this.$nextTick(() => {
        this.$refs.chart.chartShow = true
      })
    },
    deleteHandle (id) {
      this.$request.post('/timeseries/resultdelete', { id }).then(res => {
        if (res) {
          this.$message.success('删除成功')
          this._isLastPage()
          this.getTableData()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    getTableData () {
      const searchForm = {
        id: this.dialogId,
        pageNum: this.PAGING.pageNum,
        pageSize: this.PAGING.pageSize
      }
      this.$request.post('/timeseries/resultlist', searchForm).then(res => {
        const resData = res.data.result || []
        this.tableData = resData
        this.PAGING.total = res.data.total
      })
    },
    changeAmount () {
      if (!(/^([1-9]|[1-9]\d|100)$/).test(this.queryFrom.forecastLength)) {
        this.queryFrom.forecastLength = ''
      }
    },
    // 表格分页的变化
    tableChange (changeParams) {
      this.PAGING.pageSize = changeParams.pageSize
      this.PAGING.pageNum = changeParams.pageNum
      this.getTableData()
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/common/styles/page-table";
@import "~@/common/styles/cluster";
</style>
