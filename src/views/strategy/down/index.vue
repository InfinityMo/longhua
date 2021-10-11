<template>
  <div class="page">
    <div class="search-wrap">
      <el-form class="search-form-inline"
               :model="queryFrom"
               ref="searchForm"
               label-width="70px">
        <el-col :span="8">
          <el-form-item label="选择品牌：">
            <el-select v-model="queryFrom.brandId"
                       clearable
                       placeholder="请选择品牌">
              <el-option v-for="item in selectOption"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="选择日期：">
            <el-date-picker v-model="queryFrom.dateRange"
                            :editable="false"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            type="daterange"
                            align="right"
                            range-separator="~"
                            :picker-options="pickerNowOption"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="人群名称：">
            <el-input v-model="queryFrom.word"
                      clearable
                      placeholder="请输入人群名称"
                      autocomplete="off">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拉取状态：">
            <el-select v-model="queryFrom.status"
                       placeholder="请选择拉取状态">
              <el-option v-for="item in statusOption"
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
                       @click="queryHandel">查询</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div class="table-wrap">
      <div class="flex-between-center table-info">
        <h4>人群数据</h4>
        <el-button type="primary"
                   @click="queryHandel">
          <Icon type="icon-refresh-14"
                :padding="[0,5,0,0]" />刷新
        </el-button>
      </div>
      <Table ref="table"
             :data="tableData"
             :columns="columns"
             :pagination="PAGING"
             @filter-change="filterChange"
             @selection-change="selectionChange"
             @tableChange="tableChange" />
    </div>
    <BottomCheck :bottomShow="bottomShow"
                 :selectDataNum="selectDataNum">
      <div slot="btn"
           class="bottom-btn-group">
        <el-popconfirm @confirm="batchDelete"
                       placement="top"
                       title="确定删除吗？">
          <el-button slot="reference">批量删除</el-button>
        </el-popconfirm>
        <el-button v-if="selectType==='1'&&hasCluster&&batchsArr.length>1"
                   @click="toCluster">聚类画图</el-button>
        <el-button type="primary"
                   v-if="selectType==='1'"
                   @click="batchDownload">批量下载</el-button>

        <!-- <el-button type="primary"
                   v-if="selectType==='-1'">批量重新拉取</el-button> -->
      </div>
    </BottomCheck>
  </div>
</template>
<script>
import tableMixin from '@/mixins/dealTable'
import { columnsData } from './columnsData.js'
import { queryForm } from './searchForm'
import BottomCheck from '@/components/checkBottom'
import { statusOption } from '@/common/commonData/baseData'
import { downLoadFile } from '@/common/utils/funcStore'
export default {
  mixins: [tableMixin],
  components: { BottomCheck },
  data () {
    return {
      queryFrom: JSON.parse(JSON.stringify(queryForm)),
      columns: columnsData(this.$createElement, this),
      tableData: [],
      bottomShow: false,
      selectDataNum: 0,
      batchsArr: [],
      selectOption: [], // 搜索候选数据源
      statusOption: statusOption,
      selectType: ''
    }
  },
  computed: {
    userName () {
      return (JSON.parse(sessionStorage.getItem(`${this.$store.getters.getTrackId}userData`)) ? JSON.parse(sessionStorage.getItem(`${this.$store.getters.getTrackId}userData`)).staffId : '') || ''
    },
    hasCluster () {
      const target = this.$store.getters.menus.filter(item => item.name === 'Cluster')[0]
      return !!target
    }
  },
  created () {
    this.getSelectData()
    this.getTableData() // 获取列表数据
  },

  methods: {
    getSelectData () {
      this._fetchSelectData('1').then(res => {
        this.selectOption = res
      })
    },
    getTableData () {
      const searchForm = {
        ...this.queryFrom,
        pageNum: this.PAGING.pageNum,
        pageSize: this.PAGING.pageSize,
        start: this.queryFrom.dateRange[0] || '',
        end: this.queryFrom.dateRange[1] || ''
      }
      delete searchForm.dateRange
      this.$request.post('tacticalcenterdownload/downloadlist', searchForm).then(res => {
        const resData = res.data.result || []
        this.tableData = resData
        this.PAGING.total = res.data.total
      })
    },
    queryHandel () {
      this._resetPageNum()
      this.getTableData()
    },
    filterChange (filters) {
      this.queryFrom.status = filters.status.join()
      this.getTableData()
    },
    batchDelete () {
      this.deleteHandle(this.batchsArr.join())
    },
    batchDownload (id) {
      this.downLoadHandle(this.batchsArr.join())
    },
    deleteHandle (id) {
      this.$request.post('/tacticalcenterdownload/delete', { id: String(id) }).then(res => {
        if (res) {
          this.bottomShow = false
          this.$refs.table.clearSelection()
          this.batchsArr = []
          this.$message.success('删除成功')
          this._isLastPage()
          this.getTableData()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    downLoadHandle (id) {
      this.$refs.table.clearSelection()
      this.batchsArr = []
      this.bottomShow = false
      downLoadFile('/tacticalcenterdownload/download', { id: String(id) })
    },
    selectionChange (selection) {
      this.selectDataNum = selection.length
      this.bottomShow = this.selectDataNum > 0
      this.selectType = this.queryFrom.status
      this.batchsArr = []
      selection.forEach(item => {
        this.batchsArr.push(item.id)
      })
    },
    toCluster () {
      this.$request.post('/cluster/directanalyze', { id: this.batchsArr.join() || '' }).then(res => {
        if (res.errorCode === 1) {
          this.$router.push({ name: 'Cluster' })
        }
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
</style>
