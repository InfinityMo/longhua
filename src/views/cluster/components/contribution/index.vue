<template>
  <div class="page">
    <div class="table-wrap">
      <Table ref="table"
             :data="tableData"
             :columns="columns"
             :pagination="PAGING"
             :pager-count="5"
             layout="prev,pager,next"
             @tableChange="tableChange" />
    </div>
  </div>
</template>
<script>

import tableMixin from '@/mixins/dealTable'
import { columnsData } from './columnsData.js'
export default {
  mixins: [tableMixin],
  props: {
    calcId: {
      type: [String, Number],
      default: '',
      required: true
    }
  },
  data () {
    return {
      columns: columnsData(this.$createElement, this),
      tableData: []
    }
  },
  created () {
    this.PAGING.pageSize = 5
    this.getTableData()
  },
  methods: {
    getTableData () {
      const searchForm = {
        id: this.calcId,
        pageNum: this.PAGING.pageNum,
        pageSize: 5
      }
      this.$request.post('cluster/contribution', searchForm).then(res => {
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
