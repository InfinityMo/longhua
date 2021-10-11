<template>
  <div class="page">
    <div class="search-wrap dialog-search-wrap">
      <el-form class="search-form-inline"
               ref="searchForm"
               label-width="70px">
        <el-col :span="8">
          <el-form-item label="降维类型：">
            <el-select popper-class="dialog-upper"
                       v-model="queryFrom.reductionType"
                       placeholder="请选择降维类型">
              <el-option v-for="item in reductionType"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="K值选择：">
            <el-select popper-class="dialog-upper"
                       clearable
                       placeholder="若不选K值则只降维"
                       v-model="queryFrom.kValue">
              <el-option v-for="item in kValues"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8"
                class="search-btn">
          <el-form-item>
            <el-button type="primary"
                       @click="calcCluster">计算聚类</el-button>
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
    <Dialog v-if="dialogShow"
            class="inner-dialog"
            dialogTitle="特征贡献度"
            dialogWidth="550px"
            :appendToBody="dialogShow"
            :isShowFooter="false"
            :dialogShow="dialogShow"
            @dialogCancel="dialogCancel">
      <Contribution v-if="dialogShow"
                    slot="content"
                    :calcId="calcId"
                    ref="addContent" />
    </Dialog>
  </div>
</template>
<script>
import { queryForm } from './searchForm'
import tableMixin from '@/mixins/dealTable'
import { reductionType, kValues } from '@/common/commonData/baseData'
import { downLoadFile } from '@/common/utils/funcStore'
import { columnsData } from './columnsData.js'
import Chart from '@/components/chart/chart'
import Contribution from './contribution/index'
export default {
  mixins: [tableMixin],
  components: { Chart, Contribution },
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
      reductionType,
      kValues,
      chart: {},
      chartType: '1',
      calcId: '',
      dialogShow: false
    }
  },
  watch: {
    dialogShow () {
      if (this.dialogShow) {
        this.$emit('dialogToBody', true)
      }
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    downLoad (id) {
      downLoadFile('/cluster/downloadresult', { id })
    },
    calcCluster () {
      this.$request.post('/cluster/analyze', {
        ...this.queryFrom,
        id: this.dialogId
      }).then(res => {
        this.getTableData()
      })
    },
    showChart (row) {
      this.chart = { ...row }
      this.$nextTick(() => {
        this.$refs.chart.chartShow = true
      })
    },
    showContribution (id) {
      this.calcId = id
      this.dialogShow = true
    },
    dialogCancel () {
      this.dialogShow = false
      this.$emit('dialogToBody', false)
    },
    deleteHandle (id) {
      this.$request.post('cluster/resultdelete', { id }).then(res => {
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
      this.$request.post('/cluster/resultlist', searchForm).then(res => {
        const resData = res.data.result || []
        this.tableData = resData
        this.PAGING.total = res.data.total
      })
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
