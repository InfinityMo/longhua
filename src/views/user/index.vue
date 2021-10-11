<template>
  <div class="page">
    <div class="search-wrap">
      <el-form class="demo-form-inline"
               ref="searchForm">
        <el-col :span="9">
          <el-form-item label="店铺名称：">
            <el-tooltip class="tooltip-reset"
                        effect="dark"
                        :disabled="tipContent ? false:true"
                        :content="tipContent"
                        placement="top-start">
              <el-cascader v-model="searchForm.RowGuid"
                           placeholder="请选择店铺名称"
                           popper-class="reset-casc"
                           :options="selectOption"
                           filterable
                           clearable>
                <span slot-scope="{ data }">
                  <el-tooltip effect="dark"
                              :content="data.label"
                              placement="left">
                    <span>{{data.label}}</span>
                  </el-tooltip>
                </span>
              </el-cascader>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item class="search-btn">
            <el-button type="primary"
                       @click="queryHandel">查询</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div class="table-wrap">
      <div class="flex-between-center table-info">
        <h4>店铺信息列表</h4>
        <el-button type="primary"
                   @click="addHandle">新增</el-button>
      </div>
      <standard-table :dataSource="tableData"
                      :columns="columns"
                      :pagination="PAGING"
                      @tableChange="tableChange" />
    </div>
    <Dialog :modalTitle="modalTitle"
            :addEditId="addEditId"
            :brandArr="brandArr"
            v-if="modalShow"
            :modalShow="modalShow"
            @modalCancel="modalCancel"
            @modalConfirm="modalConfirm" />
  </div>
</template>
<script>
import tableMixin from '@/mixins/dealTable'
import { columnsData } from './columnsData.js'
import Dialog from './dialog'
import { tableSearchForm } from './searchForm'

export default {
  mixins: [tableMixin],
  components: { Dialog },
  data () {
    return {
      tipContent: '',
      searchForm: JSON.parse(JSON.stringify(tableSearchForm)),
      queryFrom: { RowGuid: '' },
      columns: columnsData(this.$createElement, this),
      tableData: [],
      selectOption: [],
      modalTitle: '', // 弹窗的名称
      modalShow: false,
      addEditId: '', // 编辑时存在id，新增时id为空
      brandArr: [] // 弹窗品牌穿梭框数据
    }
  },
  watch: {
    'searchForm.RowGuid' (newVal, oldVal) {
      if (newVal.length && newVal.length > 0) {
        this.tipContent = this.selectOption.filter(item => item.value === this.searchForm.RowGuid[0])[0].label
      } else {
        this.tipContent = ''
      }
    }
  },
  created () {
    // this.getSelects()
  },
  mounted () {
    // this.getTableData() // 获取列表数据
  },
  methods: {
    getTableData () {
      this.$request.post('./')
    },
    getSelects () {
      this._getSelectData(1).then(res => {
        this.selectOption = res
      }) // 获取下拉框数据
    },

    // 新增
    addHandle () {
      this._getSelectData(6).then(res => {
        res.map(item => {
          this.brandArr.push({
            label: item.label,
            key: item.value
          })
        })
        this.addEditId = ''
        this.modalTitle = '新增店铺'
        this.modalShow = true
      })
    },
    editMoadl (scoped) {
      this._getSelectData(6).then(res => {
        res.map(item => {
          this.brandArr.push({
            label: item.label,
            key: item.value
          })
        })
        this.modalShow = true
        const { row } = scoped
        this.addEditId = row.RowGuid
        this.modalTitle = '编辑店铺'
      })
    },
    // modal确认
    modalConfirm () {
      this.modalShow = false
      this.brandArr = []
      this.selectOption = []
      this.getTableData()
      this.getSelects()
    },
    // moadl关闭
    modalCancel () {
      this.brandArr = []
      this.modalShow = false
    },
    deleteHandle (scoped) {
      const { row } = scoped
      this.$request.post('/shopDelete', {
        RowGuid: row.RowGuid
      }).then(res => {
        if (res.errorCode === 1) {
          this.$message.success('删除成功')
          // 删除时需判断是不是最后一页
          this._isLastPage()
          this.getTableData()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    queryHandel () {
      this.queryFrom = {
        RowGuid: this.searchForm.RowGuid[0] || ''
      }
      this.getTableData()
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
